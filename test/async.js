'use strict'
const test = require('tap').test
const TOML = require('../toml.js')

test('async', t => {
  t.plan(4)
  return TOML.parse.async('a = 230', {blocksize: 2}).then(result => {
    t.isDeeply(result, {a: 230}, 'async with small blocksize')
    return TOML.parse.async('a = 230')
  }).then(result => {
    t.isDeeply(result, {a: 230}, 'async with large blocksize')
    return TOML.parse.async('a = error').catch(() => {
      t.pass('captured early error')
      return TOML.parse.async('a = [')
    }).catch(() => {
      t.pass('captured late error')
    })
  })
})
