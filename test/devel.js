'use strict'
const test = require('tap').test
const TOMLParser = require('../lib/toml-parser').makeParserClass(require('../lib/parser-debug.js'))

let testtoml = `a = [[1.0], [1], [{}], ['abc']]\n[[b]]\n[c]\n`

test('devel', t => {
  t.plan(1)
  console.log('Parsing:', testtoml)
  const parser = new TOMLParser()
  try {
    parser.parse(testtoml)
    t.isDeeply(parser.finish(), {a: [[1], [1], [{}], ['abc']], b: [{}], c: {}}, 'parsed with debugging')
  } catch (err) {
    t.comment(err)
    t.fail('parsed with debugging')
  }
})
