'use strict'
module.exports = runTests

const fs = require('fs')
const path = require('path')
const t = require('./tap-is-deeply.js')
const glob = require('glob').sync
const getExpected = require('./get-expected.js')

function runTests (parsers, valid, error, skip) {
  /* eslint-disable security/detect-non-literal-regexp */
  const skipre = skip && new RegExp(skip.join('|'))
  /* eslint-disable security/detect-non-literal-fs-filename */
  const tests = glob(`${valid}/*toml`)
    .filter(_ => !skipre || !skipre.test(_))
  const errorAsserts = glob(`${error}/*toml`)
    .filter(_ => !skipre || !skipre.test(_))
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
          } catch (err) {
            t.error(err, name)
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
