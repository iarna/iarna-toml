/*
This is based on on the file test/dates.js in the toml-stream package. That file has the following license:

The MIT License (MIT)

Copyright (c) 2015 Forrest L Norvell ogd@aoaioxxysz.net

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
var test = require('tap').test
var TOML = require('../..')
var toTOMLString = require('./to-toml-string.js')

test('date TOML values', function (t) {
  t.test('with one value', function (t) {
    var date = new Date('2017-08-10T08:34:12.666Z')
    var input = {date: date}

    toTOMLString(input, function (er, output) {
      t.ifError(er, "shouldn't have failed to convert a value this simple")

      t.equals(output, 'date = 2017-08-10T08:34:12.666Z\n')
      t.same(TOML.parse(output), input, 'round trip test worked')
      t.end()
    })
  })

  t.end()
})
