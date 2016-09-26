'use strict'
var stringify = require('../../toml-stringify.js')
module.exports = function (input, cb) {
  try {
    cb(null, stringify(input))
  } catch (ex) {
    cb(ex)
  }
}
