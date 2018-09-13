'use strict'
const TOML = require('..')
const TomlError = require('../lib/toml-parser.js').TomlError
const testParser = require('./lib/test-parser.js')
const testStringifier = require('./lib/test-stringifier.js')

const toTest = {
  name: '@iarna/toml',
  parse: TOML.parse,
  stringify: TOML.stringify,
  ErrorClass: TomlError
}

testParser([toTest], `${__dirname}/burntsushi-toml-test/tests/valid`, `${__dirname}/burntsushi-toml-test/tests/invalid`)
testStringifier([toTest], `${__dirname}/burntsushi-toml-test/tests/valid`)
