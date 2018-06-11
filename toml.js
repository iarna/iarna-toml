'use strict'
const parse = require('toml-j0.4').parse
exports.parse = data => parse(data.toString())
exports.stringify = require('./toml-stringify.js')
