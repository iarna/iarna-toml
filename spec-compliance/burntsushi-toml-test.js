'use strict'
const TomlError = require('../lib/toml-parser.js').TomlError
const testParser = require('../test/lib/test-parser.js')

const iarnaToml = require('../parse-string.js')
const TomlSyntaxError = require('toml').SyntaxError
const parseToml = require('toml').parse
const Tomlj04SyntaxError = require('toml-j0.4').SyntaxError
const parseTomlj04 = require('toml-j0.4').parse
const bombadil = require('@sgarciac/bombadil')
const ltdToml = require('@ltd/j-toml')
function parseLtdToml (str) {
  return ltdToml.parse(str, 0.5, '\n', Number.MAX_SAFE_INTEGER)
}

class BombadilError extends Error {}

const toTest = [
  {
    name: '@iarna/toml@2.2.2',
    parse: iarnaToml,
    ErrorClass: TomlError
  },
  {
    name: 'toml@3.0.0',
    ErrorClass: TomlSyntaxError,
    parse: parseToml
  },
  {
    name: 'toml-j0.4@1.1.1',
    ErrorClass: Tomlj04SyntaxError,
    parse: parseTomlj04
  },
  {
    name: '@sgarciac/bombadil@2.1.0',
    ErrorClass: BombadilError,
    parse: str => {
      // this is assuming that readToml should never throw
      const reader = new bombadil.TomlReader()
      reader.readToml(str)
      if (reader.result == null) throw new BombadilError(reader.errors)
      return reader.result
    }
  },
  {
    name: '@ltd/j-toml@0.5.45',
    parse: parseLtdToml
  }
]

testParser(toTest, `${__dirname}/../test/burntsushi-toml-test/tests/valid`, `${__dirname}/../test/burntsushi-toml-test/tests/invalid`)
