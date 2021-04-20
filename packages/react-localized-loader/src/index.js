const fs = require('fs')
const gettextParser = require('gettext-parser')

module.exports = () => {}

module.exports.pitch = function (remainingRequest) { // eslint-disable-line
  if (this.cacheable) {
    this.cacheable()
  }

  this.addDependency(remainingRequest)
  const callback = this.async()

  fs.readFile(remainingRequest, (err, content) => {
    if (err) {
      callback(err)
    } else {
      const po = gettextParser.po.parse(content)
      po.translations = po.translations || {}

      // Remove headers except Plural-Forms
      Object.keys(po.headers).forEach((header) => {
        if (header.toLowerCase() !== 'plural-forms') {
          delete po.headers[header]
        }
      })

      // Remove uneccesary fields
      Object.keys(po.translations).forEach((context) => {
        const messages = po.translations[context]
        Object.keys(messages).forEach((messageId) => {
          if (!messageId) {
            delete messages[messageId]
          } else {
            const message = messages[messageId]
            delete message.msgid
            delete message.msgid_plural
            delete message.comments
          }
        })
      })

      callback(null, `module.exports = ${JSON.stringify(po)};`)
    }
  })
}
