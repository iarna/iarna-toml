'use strict'
var stringify = require('../../stringify.js')
module.exports = function (input, cb) {
  try {
    cb(null, stringify(input))
  } catch (ex) {
    cb(ex)
  }
}
