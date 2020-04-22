'use strict'
const test = require('tap').test
const TOML = require('../toml.js')
const TomlError = require('../lib/toml-parser.js').TomlError

const errors = {
  'text after table name': "[error]   if you didn't catch this, your parser is broken",
  'table redefines key in middle': `[a]\nb = 3\n[a.b.c]`,
  'table with invalid key': `[a!.b]`,
  'list with invalid key': `[[a!.b]]`,
  'invalid list end': `[[a.b] ]`,
  'list redefines key in middle': `[a]\nb = 3\n[[a.b.c]]`,
  'list redefines key in end': `[a]\nb = 3\n[[a.b]]`,
  'list redefines inline list in middle': `[a.b]\nc = []\n[[a.b.c.d]]`,
  'extend an inline table': 'a = {abc= [{}]}\n [[a.abc]]',
  'unterminated key': `ab`,
  'unterminated literal string': `a = 'abc`,
  'unterminated basic string': `a = "abc`,
  'unterminated literal multi': `a = '''abc`,
  'unterminated basic multi': `a = """abc`,
  'non-hex codepoint long': 'a = "\\UZZZZZZZZ"',
  'non-hex codepoint short': 'a = "\\uZZZZ"',
  'sign without number': 'a = -',
  'incomplete exponent': 'a = 1e',
  'incomplete datetime': 'a = 2013-',
  'short-years invalid': 'a = 201-12-01T00:00:00Z',
  'incomplete datetime fraction': 'a = 2013-12-01T00:00:00.',
  'invalid tz part': 'a = 2013-12-01T00:00:00M',
  'invalid datetime w/ underscores': 'a = 2013-12-01T00:00:0_0.0_0_0Z',
  'incomplete tz hour': 'a = 2013-12-01T00:00:00+1',
  'incomplete tz min': 'a = 2013-12-01T00:00:00+10',
  'incomplete tz min2': 'a = 2013-12-01T00:00:00+10:',
  'incomplete list': 'a = [',
  'incomplete list2': 'a = [ 2 ',
  'incomplete table': 'a = {',
  'incomplete table2': 'a = { a=1 ',
  'invalid table': 'a = { a=1 A',
  'signed leading underscores': `a = -__12`,
  'invalid unicode': 'a = "\\uD800"',
  'empty pre-dot': '[.abc]',
  'partial month': 'a = 2013-1-12T00:00:00Z',
  'partial day': 'a = 2013-01-1T00:00:00Z',
  'partial hour': 'a = 2013-01-01T0:00:00Z',
  'partial min': 'a = 2013-01-01T00:0:00Z',
  'lone date with more': 'a = 2013-01-01n',
  'lone date and hour': ' a = 2013-01-01T00 ',
  'lone date and hms.frac with more': ' a = 2013-01-01T00:00:00.00n',
  'partial true 1': 'a = t',
  'partial true 2': 'a = tr',
  'partial true 3': 'a = tru',
  'partial false 1': 'a = f',
  'partial false 2': 'a = fa',
  'partial false 3': 'a = fal',
  'partial false 4': 'a = fals',
  'partial inf 1': 'a = i',
  'partial inf 2': 'a = in',
  'parital nan 1': 'a = n',
  'parital nan 2': 'a = na',
  'no backslash space': 'a = """abc\\   def"""',
  '0 leading numbers 1': 'a = 01',
  'signed 0 leading numbers 1': 'a = -01',
  'signed 0 leading numbers 2': 'a = +01',
  'float under before point': 'a = 1_.2',
  'time short hour': 'a = 1:22:33',
  'time incomplete 1': 'a = 11:',
  'time incomplete 3': 'a = 11:33:0',
  'time fract 1': 'a = 11:22:00.',
  'time fract 2': 'a = 11:22:00.1n',
  'dotted inline tables 1': 'a = {b.c = 23, b.c = 42}',
  'dotted inline tables 2': 'a = {b.c = 23, b.c.d = 42}',
  'empty-inline-table-element': 'a = {a = 1,,b = 2}'
}

test('should be errors', t => {
  Object.keys(errors).forEach(msg => {
    try {
      t.comment(TOML.parse(errors[msg]))
      t.fail(msg)
    } catch (err) {
      t.comment(err.message)
      t.ok(err instanceof TomlError, msg)
    }
  })
  t.end()
})
