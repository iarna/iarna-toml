'use strict'
module.exports = runTests

const fs = require('fs')
const path = require('path')
const t = require('./tap-is-deeply.js')
const glob = require('glob').sync
const getExpected = require('./get-expected.js')

function runTests (parsers, valid, error) {
  const tests = glob(`${valid}/*toml`)
  const errorAsserts = glob(`${error}/*toml`)
  parsers.forEach(parser => {
    t.test(parser.name, t => {
      t.test('spec-asserts', t => {
        t.plan(tests.length)
        for (let spec of tests) {
          const rawToml = fs.readFileSync(spec, 'utf8')
          const expected = getExpected(spec)
          const name = path.basename(spec, '.toml')
          try {
            t.deeplyObjectIs(parser.parse(rawToml), expected, name)
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
          t.throws(() => t.comment(parser.parse(rawToml)), parser.ErrorClass, name)
        }
      })
      t.done()
    })
  })
}
