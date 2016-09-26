'use strict'
var fs = require('fs')
var path = require('path')
var test = require('tap').test
var TOML = require('../toml.js')
var files = ['example-v0.3.0.toml', 'example-v0.4.0.toml', 'example.toml', 'hard_example.toml', 'hard_example_unicode.toml']

test('spec-examples', function (t) {
  t.plan(files.length)
  files.forEach(function (file) {
    var value = TOML.parse(fs.readFileSync(path.join(__dirname, 'fromspec', file)))
    var str = TOML.stringify(value)
    try {
      var roundtrip = TOML.parse(str)
    } catch (ex) {
      t.is(ex, undefined, file)
      t.comment(str)
      return
    }
    t.isDeeply(value, roundtrip, file)
  })
  t.done()
})
