'use strict'
const parsej = require('toml-j0.4').parse
let parset
exports.parse = data => {
  try {
    return parsej(data.toString())
  } catch (ex) {
    if (!parset) require('toml').parse
    try {
      return parset(data)
    } catch (_) {
      throw ex
    }
  }
}
exports.stringify = require('./toml-stringify.js')
