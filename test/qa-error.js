'use strict'
const test = require('tap').test
const TOML = require('../toml.js')
const TomlError = require('../lib/toml-parser.js').TomlError

const errors = {
  'text after property set': 'string = "Anything other than tabs, spaces and newline after a keygroup or key value pair has ended should produce an error unless it is a comment"   like this',
  'text after inline list': `array = [
"This might most likely happen in multiline arrays",
Like here,
"or here,
and here"
]     End of array comment, forgot the #`,
  'text after numeric property set': `number = 3.14  pi <--again forgot the #         `,
  'invalid starting char': `@invalid = 23`,
  'non-equal after keyname': `this is = 'invalid'`,
  "don't redefine keys": `a = 1\na = 2`,
  'declare same table': `[a]\n[a]`,
  "don't extend inline lists": `a = []\n[[a]]`,
  "don't extend inline lists2": `[a]\nb = [{}]\n[[a.b]]`,
  "don't extend inline lists (with existing content)": `a = [{}]\n[[a]]`,
  'list redefines inline list at end': `[a.b]\nb = []\n[[a.b]]`,
  'table then list': `[a]\n[[a]]`,
  'key without value': `a =`,
  'invalid escape': 'a = "\\N"',
  'invalid codepoint long': 'a = "\\UD8D8D8D8"',
  'non-hex codepoint long mid': 'a = "\\U0ZZZZZZZ"',
  'non-hex codepoint short mid': 'a = "\\u0ZZZ"',
  'non-hex codepoint long end': 'a = "\\U0000000Z"',
  'non-hex codepoint short end': 'a = "\\u000Z"',
  'float without decimal': 'a = 1.',
  'float with non-numeric decimal': 'a = 1.a',
  'incomplete exponent2': 'a = 1e+',
  'leading underscores': `a = __1`,
  'char in exponent': 'a = 1e3a',
  'char in exponent2': 'a = 1ea',
  'number with letters': 'a = +3abc',
  'still invalid': 'a = 2013a',
  'invalid datetime': 'a = 2013-a',
  'invalid datetime2': 'a = 2013-TT-00T--T--T--Z',
  'incomplete datetime fraction w/tz': 'a = 2013-12-01T00:00:00.Z',
  'invalid char in miliseconds': 'a = 2013-12-01T00:00:00.M',
  'invalid tz hour': 'a = 2013-12-01T00:00:00+1a:00',
  'incomplete tz min3': 'a = 2013-12-01T00:00:00+10a',
  'incomplete tz min4': 'a = 2013-12-01T00:00:00+10:0',
  'invalid tz min': 'a = 2013-12-01T00:00:00+10:0a',
  'invalid true': 'a = troo',
  'invalid false': 'a = fool',
  'invalid list': 'a = [ 2 A',
  'incomplete list3': 'a = [ 2,',
  'incomplete table3': 'a = { a=1,',
  'trailing underscores': `a = 12_`,
  'many middle underscores': `a = 1__2`,
  'decimal prefix underscores': 'a = 0._12',
  'decimal mid underscores': 'a = 0.1__2',
  'decimal post underscores': 'a = 0.12_',
  'exponent prefix': 'a = 1e+_2',
  'exponent mid': 'a = 1e1__2',
  'exponent post': 'a = 1e2_',
  'multiline str as keyname': '"""a""" = 1',
  'empty post-dot': '[abc.]',
  'empty mid-dot': '[abc..def]',
  'empty obj name': '[]',
  'unterminated name': '["abc\n"]',
  'no control chars': 'a = "\u001F"',
  'no control chars2': 'a = "\u0000"',
  'no multi control chars': 'a = """\u0000"""',
  'no literal multi control chars': "a = '''\u0000'''",
  'no literal control chars': "a = '\u0000'",
  'no control in keys': '"a\u0000" = 1',
  'partial sec': 'a = 2013-01-01T00:00:0Z',
  'lone date and hour with more': ' a = 2013-01-01T00n',
  'lone date and min': ' a = 2013-01-01T00:00 ',
  'lone date and min with more': ' a = 2013-01-01T00:00n',
  'multi-line sstrs can only start at start': "a = 'abc''defghi'''",
  'multi-line dstrs can only start at start': 'a = "abc""defghi"""',
  'abort single-quoted string': "a = '",
  'no delete strs': 'a = "\u007F"',
  'no delete in keys': '"\u007F" = 1',
  '0 leading numbers 2': 'a = 001',
  'time incomplete 2': 'a = 11:22',
  'hex leading under': 'a = 0x_a',
  'hex leading period': 'a= 0x.23',
  'hex decimal point': 'a=0x0.23',
  'hex under end': 'a=0xa_',
  'octal leading under': 'a = 0o_4',
  'octal leading period': 'a= 0o.4',
  'octal decimal point': 'a=0o0.4',
  'octal under end': 'a=0o4_',
  'binary leading under': 'a = 0b_1',
  'binary leading period': 'a= 0b.1',
  'binary decimal point': 'a=0b0.1',
  'binary under end': 'a=0b1_'
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
