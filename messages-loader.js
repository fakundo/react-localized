var po2json = require('po2json');

module.exports = function () {};

module.exports.pitch = function (remainingRequest) {
  if (this.cacheable) this.cacheable();
  this.addDependency(remainingRequest);
  var callback = this.async();

  po2json.parseFile(remainingRequest, { format: 'jed1.x' }, function (err, content) {
    if (err) {
      callback(err);
    } else {
      var messages = content.locale_data.messages;
      callback(null, 'module.exports = ' + JSON.stringify(messages) + ';');
    }
  });
};
