'use strict'
const test = require('tap').test
const TOML = require('../toml.js')

const tests = {
  spacedDots: {toml: `[[ a . b ]]`, data: {a: {b: [{}]}}},
  multiPsychout: {toml: `a = '''abc''def'''`, data: {a: "abc''def"}},
  exponentUnderscore: {toml: `a = 1e1_0`, data: {a: 10000000000}},
  multiTrimCR: {toml: `a = """\r\nabc"""`, data: {a: 'abc'}},
  multiLiteralTrimCR: {toml: `a = '''\r\nabc'''`, data: {a: 'abc'}},
  'empty single-quoted string': {toml: "a = ''", data: {a: ''}},
  multiBasicPartialEnd1: {toml: 'a = """abc"def"""', data: {a: 'abc"def'}},
  multiBasicPartialEnd2: {toml: 'a = """abc""def"""', data: {a: 'abc""def'}},
  timeNonZero: {toml: 'a = 10:11:00', data: {a: new Date('0000-01-01T10:11:00Z')}},
  dateTrailingSpaces: {toml: 'a = 2012-01-01  ', data: {a: new Date('2012-01-01')}},
  bitsWithUnders: {toml: 'a = 0b1_0', data: {a: 2}},
  octWithUnders: {toml: 'a = 0o1_2', data: {a: 10}},
  lessThanOne: {toml: 'a = 0.1', data: {a: 0.1}},
  endOfManyQuotes: {toml: 'a = """test"""""', data: {a: 'test""'}}
}

test('coverage', t => {
  Object.keys(tests).forEach(name => {
    t.doesNotThrow(() => {
      t.isDeeply(TOML.parse(tests[name].toml), tests[name].data, name + ' parsed correctly')
    }, name + 'parse did not throw')
    t.doesNotThrow(() => {
      t.isDeeply(TOML.parse(TOML.stringify(tests[name].data)), tests[name].data, name + ' roundtrip')
    }, name + ' roundtrip did not throw')
  })
  t.end()
})
