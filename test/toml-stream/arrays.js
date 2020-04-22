/*
This is based on on the file test/arrays.js in the toml-stream package. That file has the following license:

The MIT License (MIT)

Copyright (c) 2015 Forrest L Norvell ogd@aoaioxxysz.net

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var test = require('tap').test
var TOML = require('../..')
var toTOMLString = require('./to-toml-string.js')

test('arrays to TOML', function (t) {
  t.test('with an empty array', function (t) {
    var input = { irie: [] }

    toTOMLString(input, function (er, output) {
      t.ifError(er, 'empty array successfully converted')

      if (!er) {
        t.equals(output, 'irie = [ ]\n')
        t.same(TOML.parse(output), input, 'round trip test worked')
      }
      t.end()
    })
  })
  t.test('with a type-consistent array of primitive values', function (t) {
    var input = {irate: [0, 1, 2]}

    toTOMLString(input, function (er, output) {
      t.ifError(er, 'integer array successfully converted')

      if (!er) {
        t.equals(output, 'irate = [ 0, 1, 2 ]\n')
        t.same(TOML.parse(output), input, 'round trip test worked')
      }
      t.end()
    })
  })

  t.test('with an array of arrays of primitive values', function (t) {
    var input = {
      airy: [
        [ 1, 2 ],
        [ 'buckle', 'my', 'shoe' ],
        [ 3, 4 ],
        [ 'open', 'the', 'door' ]
      ]
    }

    var expected = [
      'airy = [',
      '  [ 1, 2 ],',
      '  [ "buckle", "my", "shoe" ],',
      '  [ 3, 4 ],',
      '  [ "open", "the", "door" ]',
      ']'
    ].join('\n') + '\n'

    toTOMLString(input, function (er, output) {
      t.ifError(er, 'array of arrays successfully converted')

      if (!er) {
        t.equals(output, expected, 'serialized array properly')
        t.same(TOML.parse(output), input, 'round trip test worked')
      }
      t.end()
    })
  })

  t.test('with an array of arrays of dates', function (t) {
    var input = {
      airy: [
        [ new Date('2017-08-10T08:34:12.666Z') ],
        [ new Date('2012-09-06T12:34:00Z') ],
        [ new Date('1999-04-16T18:11:58.123Z') ]
      ]
    }

    var expected = [
      'airy = [',
      '  [ 2017-08-10T08:34:12.666Z ],',
      '  [ 2012-09-06T12:34:00.000Z ],',
      '  [ 1999-04-16T18:11:58.123Z ]',
      ']'
    ].join('\n') + '\n'

    toTOMLString(input, function (er, output) {
      t.ifError(er, 'array of arrays successfully converted')

      if (!er) {
        t.equals(output, expected, 'serialized array properly')
        t.same(TOML.parse(output), input, 'round trip test worked')
      }
      t.end()
    })
  })

  t.test('with an array of arrays of arrays', function (t) {
    var input = {
      aerie: [
        [
          [ 1, 2 ],
          [ 3, 4 ]
        ],
        [
          [ 5, 6 ],
          [ 7, 8 ]
        ],
        [
          [ 'a', 'b', 'c' ],
          [ 'd', 'e', 'f' ],
          [ 'g', 'h', 'i', 'j' ]
        ]
      ]
    }

    var expected = [
      'aerie = [',
      '  [ [ 1, 2 ], [ 3, 4 ] ],',
      '  [ [ 5, 6 ], [ 7, 8 ] ],',
      '  [ [ "a", "b", "c" ], [ "d", "e", "f" ], [ "g", "h", "i", "j" ] ]',
      ']'
    ].join('\n') + '\n'

    toTOMLString(input, function (er, output) {
      t.ifError(er, 'array of arrays of arrays successfully converted')

      if (!er) {
        t.equals(output, expected, 'serialized array properly')
        t.same(TOML.parse(output), input, 'round trip test worked')
      }
      t.end()
    })
  })
  t.end()
})
