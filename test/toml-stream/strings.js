/*
This is based on on the file test/strings.js in the toml-stream package. That file has the following license:

The MIT License (MIT)

Copyright (c) 2015 Forrest L Norvell ogd@aoaioxxysz.net

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
var test = require('tap').test
var TOML = require('../..')
var toTOMLString = require('./to-toml-string.js')

test('string TOML values', function (t) {
  t.test('with one value', function (t) {
    var string = '"a very \'simple\' string," he said.'
    var input = {string: string}

    toTOMLString(input, function (er, output) {
      t.ifError(er, "shouldn't have failed to convert a value this simple")

      t.equals(
        output,
        'string = "\\"a very \'simple\' string,\\" he said."\n',
        'string encoded'
      )
      t.same(TOML.parse(output), input, 'round trip test worked')
      t.end()
    })
  })

  t.test('with threeve values', function (t) {
    var input = {str1: 'one', str2: 'two', str3: 'three', str4: 'threeve'}

    toTOMLString(input, function (er, output) {
      t.ifError(er, "shouldn't have failed to write a stream this simple")

      t.equals(
        output,
        'str1 = "one"\nstr2 = "two"\nstr3 = "three"\nstr4 = "threeve"\n',
        'got expected output'
      )
      t.same(TOML.parse(output), input, 'round trip test worked')
      t.end()
    })
  })

  t.test('with a multiline string', function (t) {
    var input = { multiline: ' a "simple"\n test of\n  multiline\n  strings' }

    toTOMLString(input, function (er, output) {
      t.ifError(er, "shouldn't have failed to write a stream this simple")

      t.equals(
        output,
        'multiline = """\n a "simple"\n test of\n  multiline\n  strings"""\n',
        'got expected output'
      )
      t.same(TOML.parse(output), input, 'round trip test worked')
      t.end()
    })
  })

  t.test('with a multiline string with a quoting problem', function (t) {
    var input = { whoops: ' this:\n"""\n is going to cause problems' }

    toTOMLString(input, function (er, output) {
      t.ifError(er, "shouldn't have failed to write a stream this simple")

      t.equals(
        output,
        'whoops = """\n this:\n\\"""\n is going to cause problems"""\n',
        'got expected output'
      )
      t.same(TOML.parse(output), input, 'round trip test worked')
      t.end()
    })
  })

  t.end()
})
