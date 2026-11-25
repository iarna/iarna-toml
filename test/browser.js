'use strict'
const test = require('tap').test
const execFileSync = require('child_process').execFileSync // eslint-disable-line security/detect-child-process
const parse = require('../parse-string.js')

test('parse without Node globals', t => {
  t.doesNotThrow(() => execFileSync(process.execPath, [`${__dirname}/lib/parse-no-global.js`], {encoding: 'utf8'}), 'without global or Buffer')
  t.doesNotThrow(() => execFileSync(process.execPath, [`${__dirname}/lib/parse-no-global.js`, 'no-bigint'], {encoding: 'utf8'}), 'without global, Buffer or BigInt')
  t.end()
})

test('parse a Node Buffer', t => {
  const result = parse(Buffer.from('title = "café"\nport = 8020\n'))
  t.is(result.title, 'café', 'decodes UTF-8')
  t.is(result.port, 8020, 'parses an integer')
  t.end()
})
