'use strict'
const test = require('tap').test
const execFileSync = require('child_process').execFileSync // eslint-disable-line security/detect-child-process
const parse = require('../parse-string.js')
const inspect = require('util').inspect

test('parse without Node globals', t => {
  t.doesNotThrow(() => execFileSync(process.execPath, [`${__dirname}/lib/parse-no-global.js`], {encoding: 'utf8'}), 'without global or Buffer')
  t.doesNotThrow(() => execFileSync(process.execPath, [`${__dirname}/lib/parse-no-global.js`, 'no-bigint'], {encoding: 'utf8'}), 'without global, Buffer or BigInt')
  t.end()
})

test('preserve local date inspection', t => {
  const date = parse('date = 1979-05-27').date
  const expected = new Date('1979-05-27')
  expected.isDate = true
  t.is(date.constructor.name, 'Date', 'keeps the Date class name')
  t.is(inspect(date), inspect(expected), 'inspects like a native Date with the local-date flag')
  t.end()
})

test('parse a Node Buffer', t => {
  const result = parse(Buffer.from('title = "café"\nport = 8020\n'))
  t.is(result.title, 'café', 'decodes UTF-8')
  t.is(result.port, 8020, 'parses an integer')
  t.end()
})
