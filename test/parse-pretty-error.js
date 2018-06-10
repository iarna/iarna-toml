'use strict'
const test = require('tap').test
const parsePrettyError = require('../parse-pretty-error.js')

test('parse-pretty-error', t => {
  const buf = []
  for (let ii = 0; ii < 105; ++ii) buf.push('this is a test')
  t.like(parsePrettyError({pos: 10, line: 98, col: 0, message: 'test'}, buf.join('\n')), {
    message: 'test at row 99, col 1, pos 10:\n 98: this is a test\n 99> this is a test\n     ^\n100: this is a test\n\n'
  })
  t.done()
})
