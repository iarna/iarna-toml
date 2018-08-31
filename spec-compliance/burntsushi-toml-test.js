'use strict'
const path = require('path')
const t = require('tap')
const glob = require('glob').sync
const fs = require('fs')
const tests = glob(`${__dirname}/../test/burntsushi-toml-test/tests/valid/*toml`)
const errorAsserts = glob(`${__dirname}/../test/burntsushi-toml-test/tests/invalid/*toml`)
const createDatetime = require('../lib/create-datetime.js')
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

function expand (obj) {
  const result = {}
  Object.keys(obj).forEach(key => {
    result[key] = expandValue(obj[key])
  })
  return result
}
function expandValue (val) {
  if (Array.isArray(val)) {
    return val.map(_ => expandValue(_))
  } else if (val.type === 'array') {
    return val.value.map(_ => expandValue(_))
  } else if (val.type === 'datetime') {
    return createDatetime(val.value)
  } else if (val.type === 'string') {
    return val.value
  } else if (val.type === 'float') {
    return Number(val.value)
  } else if (val.type === 'integer') {
    if (global.BigInt && !Number.isSafeInteger(Number(val.value))) {
      return global.BigInt(val.value)
    } else {
      return Number(val.value)
    }
  } else if (val.type === 'bool') {
    return val.value === 'true'
  } else if (!('type' in val)) {
    return expand(val)
  } else {
    throw new Error('Unknown type: ' + val.type)
  }
}

function getExpected (spec) {
  const jsonName = spec.replace(/[.]toml$/, '.json')
  if (fs.existsSync(jsonName)) {
    const expected = JSON.parse(fs.readFileSync(jsonName))
    return expand(expected)
  } else {
    return {}
  }
}

Object.keys(parsers).forEach(name => {
  const parse = parsers[name]

  t.test(name, t => {
    t.test('burnt-sushi-toml-tests-valid', t => {
      t.plan(tests.length)
      for (let spec of tests) {
        const rawToml = fs.readFileSync(spec, 'utf8')
        const expected = getExpected(spec)
        const name = path.basename(spec, '.toml')
        try {
          t.deeplyObjectIs(parse(rawToml), expected, name)
        } catch (ex) {
          t.error(ex, name)
        }
      }
    })

    t.test('burnt-sushi-toml-tests-invalid', t => {
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
