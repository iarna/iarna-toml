'use strict'
const test = require('tap').test
const TOML = require('../toml.js')
const TomlError = require('../lib/toml-parser.js').TomlError

// TOML 1.0.0: 64-bit signed integers should be handled losslessly, and an
// integer that cannot be represented losslessly must raise an error.
const outOfRange = {
  'one past int64 max': 'a = 9223372036854775808',
  'two past int64 max': 'a = 9223372036854775809',
  'one below int64 min': 'a = -9223372036854775809',
  'uint64 max': 'a = 18446744073709551615',
  '2^64': 'a = 18446744073709551616',
  '2^70': 'a = 1180591620717411303424',
  'far past max with underscores': 'a = 18_446_744_073_709_551_616',
  'hex past int64 max': 'a = 0xFFFFFFFFFFFFFFFFF',
  'octal past int64 max': 'a = 0o7777777777777777777777'
}

test('integers outside the 64-bit range are an error, not a wrapped value', t => {
  Object.keys(outOfRange).forEach(name => {
    let result
    try {
      result = TOML.parse(outOfRange[name])
    } catch (err) {
      t.ok(err instanceof TomlError, name)
      return
    }
    t.fail(`${name}: parsed as ${result.a} instead of raising`)
  })
  t.end()
})

test('the 64-bit boundaries themselves still parse', t => {
  t.equal(String(TOML.parse('a = 9223372036854775807').a), '9223372036854775807', 'int64 max')
  t.equal(String(TOML.parse('a = -9223372036854775808').a), '-9223372036854775808', 'int64 min')
  t.equal(String(TOML.parse('a = 9_223_372_036_854_775_807').a), '9223372036854775807', 'int64 max with underscores')
  t.equal(String(TOML.parse('a = 0x7FFFFFFFFFFFFFFF').a), '9223372036854775807', 'int64 max as hex')
  t.equal(Number(TOML.parse('a = 0').a), 0, 'zero')
  t.equal(Number(TOML.parse('a = -1').a), -1, 'negative')
  t.end()
})
