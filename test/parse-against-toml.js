'use strict'
const fs = require('fs')
const path = require('path')
const test = require('tap').test
const TOML = require('../toml.js')
const toml = require('toml')
const tomlj = require('toml-j0.4')
const YAML = require('js-yaml')
const files = ['example-v0.3.0.toml', 'example-v0.4.0.toml', 'example.toml', 'hard_example.toml', 'hard_example_unicode.toml']
const yamlPairs = {
  'example.toml': 'example.yaml',
  'hard_example.toml': 'hard_example.yaml'
}

function readFile (file) {
  return fs.readFileSync(path.join(__dirname, 'fromspec', file), 'utf8')
}

test('spec-examples', function (t) {
  t.plan((files.length * 2) + Object.keys(yamlPairs).length)
  files.forEach(function (file) {
    const ourValue = TOML.parse(readFile(file))
    const tomlValue = toml.parse(readFile(file))
    const tomljValue = tomlj.parse(readFile(file))
    const yamlValue = yamlPairs[file] && YAML.safeLoad(readFile(yamlPairs[file]))
    if (yamlValue) t.isDeeply(ourValue, yamlValue, file + " spec's YAML representation")
    t.isDeeply(ourValue, tomlValue, file + ' using toml')
    t.isDeeply(ourValue, tomljValue, file + ' using toml-j0.4')
  })
  t.done()
})
