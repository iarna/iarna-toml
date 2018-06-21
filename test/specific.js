'use strict'
'use strict'
const test = require('tap').test
const TOML = require('../toml.js')

const tests = {
  stringEmpty: {toml: `key = ""`, data: {key: ''}},
  tableLeadingSpaces: {toml: `[   hi]`, data: {hi: {}}},
  tableInArray: {toml: `[[a]]\n[[a.b.c.d]]\nx=3`, data: {a: [{b: {c: {d: [{x: 3}]}}}]}},
  arrayTrailingSpace: {toml: `[a  ]`, data: {a: {}}},
  spacedDots: {toml: `[[ a . b ]]`, data: {a: {b: [{}]}}},
  doubleDeepArray: {toml: `[[ a . b ]]\n[[ a . b . c ]]`, data: {a: {b: [{c: [{}]}]}}},
  doubleArray: {toml: `[[ a . b ]]\n[[ a . b ]]`, data: {a: {b: [{}, {}]}}},
  multiPsychout: {toml: `a = '''abc''def'''`, data: {a: "abc''def"}},
  longUnicode: {toml: `a = "\\U0001D306"`, data: {a: '𝌆'}},
  singleDigit: {toml: `a = 1`, data: {a: 1}},
  singleDigitSigned: {toml: `a = +1`, data: {a: 1}},
  exponentUnderscore: {toml: `a = 1e1_0`, data: {a: 10000000000}},
  splitlistwithcomment: {toml: `a = [ 123 #test\n,456]`, data: {a: [123, 456]}},
  decimalListNoSpace: {toml: `a = [1.0,3.2]`, data: {a: [1, 3.2]}},
  expListNoSpace: {toml: `a = [1e1,2e1]`, data: {a: [10, 20]}},
  emptyQuotedPre: {toml: `["".abc]`, data: {'': {abc: {}}}},
  emptyQuotedPost: {toml: `[abc.""]`, data: {'abc': {'': {}}}},
  emptyQuotedMid: {toml: `[abc."".def]`, data: {'abc': {'': {def: {}}}}},
  emptyKey: {toml: `[""]`, data: {'': {}}},
  multiTrimCR: {toml: `a = """\r\nabc"""`, data: {a: 'abc'}},
  multiLiteralTrimCR: {toml: `a = '''\r\nabc'''`, data: {a: 'abc'}},
  multiSlashTrimCR: {toml: `a = """\r\nzed\\\r\n   abc"""`, data: {a: 'zedabc'}},
  deepThenShallow: {toml: `[a.b]\nc=1\n[a]\nd=2`, data: {a: {b: {c: 1}, d: 2}}},
  charcodes: {toml: `a = "\\u004a\\u004A"`, data: {a: 'JJ'}},
  'empty single-quoted string': {toml: "a = ''", data: {a: ''}},
  literalKeys: {toml: `'a' = 1`, data: {a: 1}},
  dottedKeys: {toml: `a.b = 1`, data: {a: {b: 1}}},
  dottedInlineKeys: {toml: `e = { a.b = 23 }`, data: {e: {a: {b: 23}}}},
  hexLiterals: {toml: 'a = 0xA', data: {a: 10}},
  octLiterals: {toml: 'a = 0o10', data: {a: 8}},
  binLiterals: {toml: 'a = 0b11', data: {a: 3}},
  plusZero: {toml: 'a = +0', data: {a: 0}},
  minusZero: {toml: 'a = -0', data: {a: 0}},
  infinity: {toml: 'a = inf', data: {a: Infinity}},
  nan: {toml: 'a = nan', data: {a: NaN}},
  datetimeWithoutT: {toml: 'a = 2017-12-01 11:00:17Z', data: new Date('2017-12-01T11:00:17Z')},
// probably the answer to these is to return strings, unless you're using a
// custom date class that supports these constructs (eg moment)
//  localtime: {toml: 'a = 2017-12-01 11:00:17', data: …}, // javascript doesn't support times w/o timezones
//  dateOnly: {toml: 'a = 2017-12-01', data: …}, // javascript doesn't support bare dates
//  timeOnly: {toml: 'a = 11:00:17', data: …}, // javascript doesn't support bare times
  trimContinuationBackslash: {toml: 'a = """abc\   \ndef"""', data: {a: 'abcdef'}},
  trailingCommas: {toml: 'a = [ 1, 2, 3, ]', data: {a: [1, 2, 3]}}
}

test('spec', t => {
  Object.keys(tests).forEach(name => {
    t.doesNotThrow(() => {
      t.isDeeply(TOML.parse(tests[name].toml), tests[name].data, name + ' parsed correctly')
    }, name + 'parse did not throw')
    t.doesNotThrow(() => {
      t.isDeeply(TOML.parse(TOML.stringify(tests[name].data)), tests[name].data, name + ' roundtrip')
    }, name + ' roundtrip did not throw')
  })
  t.end()
})
