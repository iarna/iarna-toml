'use strict'
module.exports = runTests

const path = require('path')
const t = require('./tap-is-deeply.js')
const glob = require('glob').sync
const TOML = require('../..')
const getExpected = require('./get-expected.js')

function runTests (parsers, valid, skip) {
  /* eslint-disable security/detect-non-literal-regexp */
  const skipre = skip && new RegExp(skip.join('|'))
  const tests = glob(`${valid}/*toml`)
    .filter(_ => !skipre || !skipre.test(_))

  parsers.forEach(parser => {
    t.test(parser.name, t => {
      t.test('stringify-asserts', t => {
        t.plan(tests.length)
        for (let spec of tests) {
          const expected = getExpected(spec)
          const name = path.basename(spec, '.toml')
          try {
            t.deeplyObjectIs(TOML.parse(parser.stringify(expected)), expected, name)
          } catch (err) {
            t.error(err, name)
          }
        }
      })
      t.done()
    })
  })
}
