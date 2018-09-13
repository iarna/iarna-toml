'use strict'
const TomlError = require('../lib/toml-parser.js').TomlError
const testParser = require('../test/lib/test-parser.js')

const iarnaToml = require('../parse-string.js')
const parseToml = require('toml').parse
const parseTomlj04 = require('toml-j0.4').parse
const bombadil = require('@sgarciac/bombadil')

class BombadilError extends Error {}

const toTest = [
  {
    name: '@iarna/toml@2.1.1',
    parse: iarnaToml,
    ErrorClass: TomlError
  },
  {
    name: 'toml@2.3.3',
    parse: parseToml
  },
  {
    name: 'toml-j0.4@1.1.1',
    parse: parseTomlj04
  },
  {
    name: '@sgarciac/bombadil@2.0.0-0',
    ErrorClass: BombadilError,
    parse: str => {
      // this is assuming that readToml should never throw
      const reader = new bombadil.TomlReader()
      reader.readToml(str)
      if (reader.result === null) throw new BombadilError(reader.errors)
      return reader.result
    }
  }
]

testParser(toTest, `${__dirname}/../test/spec-test/values`, `${__dirname}/../test/spec-test/errors`)
