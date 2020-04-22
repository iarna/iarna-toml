'use strict'
const TomlError = require('../lib/toml-parser.js').TomlError
const testParser = require('../test/lib/test-parser.js')

const iarnaToml = require('../parse-string.js')
const iarnaTomlVersion = require('../package.json').version
const parseToml = require('toml').parse
const tomlVersion = require('toml/package.json').version
const parseTomlj04 = require('toml-j0.4').parse
const tomlj04Version = require('toml-j0.4/package.json').version
const bombadil = require('@sgarciac/bombadil')
const bombadilVersion = require('@sgarciac/bombadil/package.json').version
const ltdToml = require('@ltd/j-toml')
const ltdTomlVersion = require('@ltd/j-toml/package.json').version
const parseFastToml = require('fast-toml').parse
const fastTomlVersion = require('fast-toml/package.json').version
function parseLtdToml (str) {
  return ltdToml.parse(str, 0.5, '\n', Number.MAX_SAFE_INTEGER)
}

class BombadilError extends Error {
  constructor () {
    super()
    this.name = 'BombadilError'
  }
}

const toTest = [
  {
    name: `@iarna/toml@${iarnaTomlVersion}`,
    parse: iarnaToml,
    ErrorClass: TomlError
  },
  {
    name: `toml@${tomlVersion}`,
    parse: parseToml
  },
  {
    name: `toml-j0.4@${tomlj04Version}`,
    parse: parseTomlj04
  },
  {
    name: `@sgarciac/bombadil@${bombadilVersion}`,
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
    name: `@ltd/j-toml@${ltdTomlVersion}`,
    parse: parseLtdToml
  },
  {
    name: `fast-toml@${fastTomlVersion}`,
    parse: parseFastToml
  }
]

testParser(toTest, `${__dirname}/../test/spec-test/values`, `${__dirname}/../test/spec-test/errors`)
