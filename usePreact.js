var preact = require('preact')
var config = require('react-localized/lib/config')

config.setConfig({
  Component: preact.Component,
  createElement: preact.createElement
})
