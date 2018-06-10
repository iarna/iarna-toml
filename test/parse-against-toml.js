'use strict'
const fs = require('fs')
const path = require('path')
const test = require('tap').test
const TOML = require('../toml.js')
const toml = require('toml')
const tomlj = require('toml-j0.4')
const files = ['example-v0.3.0.toml', 'example-v0.4.0.toml', 'example.toml', 'hard_example.toml', 'hard_example_unicode.toml']

test('spec-examples', function (t) {
  t.plan(files.length * 2)
  files.forEach(function (file) {
    const ourValue = TOML.parse(fs.readFileSync(path.join(__dirname, 'fromspec', file), 'utf8'))
    const tomlValue = toml.parse(fs.readFileSync(path.join(__dirname, 'fromspec', file), 'utf8'))
    const tomljValue = tomlj.parse(fs.readFileSync(path.join(__dirname, 'fromspec', file), 'utf8'))
    t.isDeeply(ourValue, tomlValue, file + ' using toml')
    t.isDeeply(ourValue, tomljValue, file + ' using toml-j0.4')
  })
  t.done()
})
