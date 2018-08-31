'use strict'
const path = require('path')
const t = require('tap')
const glob = require('glob').sync
const fs = require('fs')
const tests = glob(`${__dirname}/../test/spec-test/*toml`)
const errorAsserts = glob(`${__dirname}/../test/spec-test/errors/*toml`)
const YAML = require('js-yaml')

const iarnaToml = require('../parse-string.js')
const parseToml = require('toml').parse
const parseTomlj04 = require('toml-j0.4').parse
const bombadil = require('@sgarciac/bombadil')
function parseBombadil (str) {
  const reader = new bombadil.TomlReader()
  reader.readToml(str)
  return reader.result
}

const parsers = {
  '@iarna/toml@2.0.1': iarnaToml,
  'toml@2.3.3': parseToml,
  'toml-j0.4@1.1.1': parseTomlj04,
  '@sgarciac/bombadil@2.0.0-0': parseBombadil
}

function isObjectDeeply (aa, bb) {
  if (typeof aa !== typeof bb) return false
  if (aa == null || bb == null || typeof aa !== 'object') return Object.is(aa, bb)
  if (Array.isArray(aa) && Array.isArray(bb)) return isArrayDeeply(aa, bb)
  if (Array.isArray(aa) || Array.isArray(bb)) return false
  if (aa instanceof Date && bb instanceof Date) return aa.toISOString() === bb.toISOString()
  let aaKeys = Object.keys(aa)
  let bbKeys = Object.keys(bb)
  if (aaKeys.length !== bbKeys.length) return false
  for (let key of aaKeys) {
    if (bbKeys.indexOf(key) === -1) return false
    if (!isObjectDeeply(aa[key], bb[key])) return false
  }
  return true
}

function isArrayDeeply (aa, bb) {
  if (aa.length !== bb.length) return false
  for (let ii = 0; ii < aa.length; ++ii) {
    if (!isObjectDeeply(aa[ii], bb[ii])) return false
  }
  return true
}

t.Test.prototype.addAssert('deeplyObjectIs', 2, function (found, wanted, message, extra) {
  return this.ok(isObjectDeeply(found, wanted), message, extra)
})

function getExpected (spec) {
  const yamlName = spec.replace(/[.]toml$/, '.yaml')
  const jsName = spec.replace(/[.]toml$/, '.js')
  if (fs.existsSync(yamlName)) {
    return YAML.safeLoad(fs.readFileSync(yamlName))
  } else if (fs.existsSync(jsName)) {
    return require(jsName)
  } else {
    return {}
  }
}

Object.keys(parsers).forEach(name => {
  const parse = parsers[name]

  t.test(name, t => {
    t.test('spec-asserts', t => {
      t.plan(tests.length)
      for (let spec of tests) {
        const rawToml = fs.readFileSync(spec, 'utf8')
        const expected = getExpected(spec)
        const name = path.basename(spec, '.toml')
        try {
          if (expected.type === 'date-time') {
            t.is(parse(rawToml)[expected.property].toISOString(), expected.value, name)
          } else {
            t.deeplyObjectIs(parse(rawToml), expected, name)
          }
        } catch (ex) {
          t.error(ex, name)
        }
      }
    })
    t.test('spec-error-asserts', t => {
      t.plan(errorAsserts.length)
      for (let spec of errorAsserts) {
        const rawToml = fs.readFileSync(spec, 'utf8')
        const name = 'should throw: ' + path.basename(spec, '.toml')
        t.throws(() => t.comment(parse(rawToml)), name)
      }
    })
    t.done()
  })
})
