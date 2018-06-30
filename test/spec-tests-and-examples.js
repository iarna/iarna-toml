'use strict'
const fs = require('fs')
const path = require('path')
const test = require('tap').test
const TOML = require('../toml.js')
const toml = require('toml')
const tomlj = require('toml-j0.4')
const bombadil = require('@sgarciac/bombadil')
const YAML = require('js-yaml')
const files = ['example-v0.3.0.toml', 'example-v0.4.0.toml', 'example.toml', 'hard_example.toml', 'hard_example_unicode.toml', 'fruit.toml']

const otherParsers = {
  toml: _ => toml.parse(_),
  'toml-j0.4': _ => tomlj.parse(_),
  bombadil: _ => {
    const reader = new bombadil.TomlReader()
    reader.readToml(_)
    return reader.result
  }
}

const todo = {
  'bombadil': { 'example-v0.4.0.toml': true }
}

function readFile (file) {
  return fs.readFileSync(path.join(__dirname, 'spec-tests-and-examples', file), 'utf8')
}

test('spec-tests-and-examples', function (t) {
  t.plan(files.length * (Object.keys(otherParsers).length + 2))
  files.forEach(function (file) {
    const rawTOML = readFile(file)
    let ourValue
    let yamlValue
    t.doesNotThrow(() => {
      ourValue = TOML.parse(rawTOML)
      yamlValue = YAML.safeLoad(readFile(file.replace(/toml$/, 'yaml')))
      t.isDeeply(ourValue, yamlValue, file + " spec's YAML representation")
    }, file + ' parsed without crashes')

    Object.keys(otherParsers).forEach(label => {
      const parse = otherParsers[label]
      try {
        if (todo[label] && todo[label][file]) {
          t.isDeeply(parse(rawTOML), yamlValue, `${file} using ${label}`, {todo: true})
        } else {
          t.isDeeply(parse(rawTOML), yamlValue, `${file} using ${label}`)
        }
      } catch (ex) {
        t.comment(ex)
        t.skip(label)
      }
    })
  })
  t.done()
})
