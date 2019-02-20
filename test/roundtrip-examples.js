'use strict'
const fs = require('fs')
const path = require('path')
const test = require('tap').test
const TOML = require('../toml.js')
const files = ['example-v0.3.0.toml', 'example-v0.4.0.toml', 'example.toml', 'hard_example.toml', 'hard_example_unicode.toml', 'fruit.toml']

test('spec-examples', function (t) {
  /* eslint-disable security/detect-non-literal-fs-filename */
  t.plan(files.length)
  files.forEach(function (file) {
    const value = TOML.parse(fs.readFileSync(path.join(__dirname, 'examples', file)), 'utf8')
    const str = TOML.stringify(value)
    let roundtrip
    try {
      roundtrip = TOML.parse(str)
    } catch (err) {
      t.is(err, undefined, file)
      t.comment(str)
      return
    }
    t.isDeeply(value, roundtrip, file)
  })
  t.done()
})
