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

// these test are not valid for TOML v1.0RC1
const SKIP = [
  'array-mixed-types-strings-and-ints',
  'array-mixed-types-arrays-and-ints',
  'array-mixed-types-ints-and-floats'
]

testParser([toTest], `${__dirname}/burntsushi-toml-test/tests/valid`, `${__dirname}/burntsushi-toml-test/tests/invalid`, SKIP)
testStringifier([toTest], `${__dirname}/burntsushi-toml-test/tests/valid`, SKIP)
