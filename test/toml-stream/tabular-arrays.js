/*
This is based on on the file test/tabular-arrays.js in the toml-stream package. That file has the following license:

The MIT License (MIT)

Copyright (c) 2015 Forrest L Norvell ogd@aoaioxxysz.net

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
var test = require('tap').test
var TOML = require('../..')
var toTOMLString = require('./to-toml-string.js')

test('arrays of tables to TOML', function (t) {
  t.test('single-value array of object with single property', function (t) {
    var input = {section: [{key: 'value'}]}

    toTOMLString(input, function (er, output) {
      t.ifError(er, 'tabular array successfully converted')

      if (!er) {
        t.equals(output, '[[section]]\nkey = "value"\n')
        t.same(TOML.parse(output), input, 'round trip test worked')
      }
      t.end()
    })
  })

  t.test('multi-value array of objects with single property', function (t) {
    var input = {
      section: [
        {key: 'value1'},
        {key: 'value2'},
        {key: 'value3'}
      ]
    }

    var expected = [
      '[[section]]',
      'key = "value1"',
      '',
      '[[section]]',
      'key = "value2"',
      '',
      '[[section]]',
      'key = "value3"'
    ].join('\n') + '\n'

    toTOMLString(input, function (er, output) {
      t.ifError(er, 'tabular array successfully converted')

      if (!er) {
        t.equals(output, expected, 'multi-object values generated correctly')
        t.same(TOML.parse(output), input, 'round trip test worked')
      }
      t.end()
    })
  })

  t.test('multi-value array of objects with different property types', function (t) {
    var input = {
      section: [
        {key: 'value1'},
        {key: 4},
        {key: true}
      ]
    }

    var expected = [
      '[[section]]',
      'key = "value1"',
      '',
      '[[section]]',
      'key = 4',
      '',
      '[[section]]',
      'key = true'
    ].join('\n') + '\n'

    toTOMLString(input, function (er, output) {
      t.ifError(er, 'tabular array successfully converted')

      if (!er) {
        t.equals(output, expected, 'multi-object values generated correctly')
        t.same(TOML.parse(output), input, 'round trip test worked')
      }
      t.end()
    })
  })

  t.test('multiple arrays of objects with single properties', function (t) {
    var input = {
      section1: [{key: 'value1'}],
      section2: [{key: 'value2'}],
      section3: [{key: 'value3'}]
    }

    var expected = [
      '[[section1]]',
      'key = "value1"',
      '',
      '[[section2]]',
      'key = "value2"',
      '',
      '[[section3]]',
      'key = "value3"'
    ].join('\n') + '\n'

    toTOMLString(input, function (er, output) {
      t.ifError(er, 'tabular array successfully converted')

      t.comment(output)
      if (!er) {
        t.equals(output, expected, 'multi-object values generated correctly')
        t.same(TOML.parse(output), input, 'round trip test worked')
      }
      t.end()
    })
  })

  t.end()
})
