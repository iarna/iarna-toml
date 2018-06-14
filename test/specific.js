'use strict'
'use strict'
const test = require('tap').test
const TOML = require('../toml.js')

const tests = {
  stringEmpty: {toml: `key = ""`, data: {key: ''}},
  stringSingle: {toml: `'key"test' = 'hi'`, data: {'key"test': 'hi'}},
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
  expListNoSpace: {toml: `a = [1e1,2e1]`, data: {a: [10, 20]}}
}

test('spec', t => {
  Object.keys(tests).forEach(name => {
    t.isDeeply(TOML.parse(tests[name].toml), tests[name].data, name)
    t.isDeeply(TOML.parse(TOML.stringify(tests[name].data)), tests[name].data, name + ' roundtrip')
  })
  t.end()
})
