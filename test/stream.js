'use strict'
const test = require('tap').test
const TOML = require('../toml.js')
const fun = require('funstream')

test('stream into', t => {
  t.plan(3)
  // funstream can make most anything a stream, including a string, but
  // let's split this first one up. Passing an array of chars will result in each
  // character being emitted separately
  TOML.parse.stream(fun('a = 230'.split(''))).then(result => {
    t.isDeeply(result, {a: 230}, 'async with large blocksize')
    return TOML.parse.stream(fun('a = error')).catch(() => {
      t.pass('captured early error')
      return TOML.parse.stream(fun('a = ['))
    }).catch(() => {
      t.pass('captured late error')
    })
  })
})

test('stream through', t => {
  t.plan(3)
  // Again, using funstream to kick us off, and it's list method to get back
  // all the results.  We only ever emit one result, but funstream doesn't
  // know that, so we get an array with one item in it.
  fun('a = 230').pipe(TOML.parse.stream()).list().then(result => {
    t.isDeeply(result, [{a: 230}], 'async with large blocksize')
    // we don't call list here because we don't care about the result, just
    // the success/fail status of the stream, which funstream's default
    // promise mode will give us nicely.
    return fun('a = error').pipe(TOML.parse.stream()).catch(() => {
      t.pass('captured early error')
      return fun('a = [').pipe(TOML.parse.stream())
    }).catch(() => {
      t.pass('captured late error')
    })
  })
})
