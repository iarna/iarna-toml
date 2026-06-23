'use strict'
const test = require('tap').test
const TOML = require('..')

const cases = {
  'exponent float 1e-7': {obj: {a: 1e-7}, toml: 'a = 1e-7\n'},
  'exponent float 5e-7': {obj: {a: 5e-7}, toml: 'a = 5e-7\n'},
  'exponent float 1e-10': {obj: {a: 1e-10}, toml: 'a = 1e-10\n'},
  'positive exponent float 1e21': {obj: {a: 1e21}, toml: 'a = 1e+21\n'}
}

test('stringify exponent float', t => {
  Object.keys(cases).forEach(msg => {
    const result = TOML.stringify(cases[msg].obj)
    t.is(result, cases[msg].toml, msg)
    t.isDeeply(TOML.parse(result), cases[msg].obj, msg + ' roundtrip')
  })
  t.done()
})
