import { getFormula, getNPlurals } from 'plural-forms'

const PLURAL_FORMS_HEADER = 'Plural-Forms'
const LANGUAGE_HEADER = 'Language'

const addMissingHeader = (headers, header, getValue) => {
  const hasHeader = !!Object.keys(headers).find((h) => (
    h.toLowerCase() === header.toLowerCase()
  ))
  if (!hasHeader) {
    headers[header] = getValue() // eslint-disable-line
  }
}

export default (locale, origin, catalog) => {
  const headers = { ...catalog.headers, ...origin.headers }

  addMissingHeader(headers, PLURAL_FORMS_HEADER, () => (
    `nplurals=${getNPlurals(locale)}; plural=${getFormula(locale)};`
  ))

  addMissingHeader(headers, LANGUAGE_HEADER, () => (
    locale
  ))

  const translations = {}

  Object.keys(catalog.translations).forEach((context) => {
    const catalogMessages = catalog.translations[context]
    const originMessages = origin.translations[context]

    if (!originMessages) {
      translations[context] = catalogMessages
      return
    }

    translations[context] = {}

    Object.keys(catalogMessages).forEach((messageId) => {
      const catalogMessage = catalogMessages[messageId]
      const originMessage = originMessages[messageId]

      if (!originMessage) {
        translations[context][messageId] = catalogMessage
        return
      }

      translations[context][messageId] = {
        ...catalogMessage,
        msgstr: originMessage.msgstr || catalogMessage.msgstr,
      }
    })
  })

  return { ...catalog, headers, translations }
}
