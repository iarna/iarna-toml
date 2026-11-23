'use strict'
const test = require('tap').test
const path = require('path')
const ts = require('typescript')
const TOML = require('..')

test('parse input types', t => {
  const program = ts.createProgram([path.join(__dirname, 'types', 'parse.ts')], {
    strict: true,
    noEmit: true
  })
  const errors = ts.getPreEmitDiagnostics(program).map(diagnostic => {
    return ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')
  })
  t.is(errors.length, 0, 'parse declarations type-check', {errors})
  t.end()
})

test('UTF-8 Buffer input', t => {
  const text = 'title = "café 日本語"'
  const parsed = TOML.parse(Buffer.from(text, 'utf8'))
  t.isDeeply(parsed, {title: 'café 日本語'}, 'decodes UTF-8')
  t.isDeeply(parsed, TOML.parse(text), 'matches string input')
  t.end()
})
