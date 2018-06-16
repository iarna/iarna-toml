/*
This is based on on the file test/unsafe-keys.js in the toml-stream package. That file has the following license:

The MIT License (MIT)

Copyright (c) 2015 Forrest L Norvell ogd@aoaioxxysz.net

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
var test = require('tap').test
var TOML = require('../..')
var toTOMLString = require('./to-toml-string.js')

test('weird keys', function (t) {
  t.test('dot in key', function (t) {
    var input = { 'key.name': 'name' }

    toTOMLString(input, function (er, output) {
      t.ifError(er, "shouldn't have failed to convert a value this simple")

      t.equals(output, '"key.name" = "name"\n')
      t.same(TOML.parse(output), input, 'round trip test worked')
      t.end()
    })
  })

  t.test('dot in key in object tag', function (t) {
    var input = { 'this': { 'key.name': { is: 'key.name' } } }

    toTOMLString(input, function (er, output) {
      t.ifError(er, "shouldn't have failed to convert a value this simple")

      t.equals(output, '[this."key.name"]\nis = "key.name"\n')
      t.same(TOML.parse(output), input, 'round trip test worked')
      t.end()
    })
  })

  t.test('dash in key', function (t) {
    var input = { 'key-name': 'name' }

    toTOMLString(input, function (er, output) {
      t.ifError(er, "shouldn't have failed to convert a value this simple")

      t.equals(output, 'key-name = "name"\n')
      t.same(TOML.parse(output), input, 'round trip test worked')
      t.end()
    })
  })

  t.test('dash in key in object tag', function (t) {
    var input = { 'this': { 'key-name': { is: 'key-name' } } }

    toTOMLString(input, function (er, output) {
      t.ifError(er, "shouldn't have failed to convert a value this simple")

      t.equals(output, '[this.key-name]\nis = "key-name"\n')
      t.same(TOML.parse(output), input, 'round trip test worked')
      t.end()
    })
  })

  t.test('slash in key', function (t) {
    var input = { 'key/name': 'name' }

    toTOMLString(input, function (er, output) {
      t.ifError(er, "shouldn't have failed to convert a value this simple")

      t.equals(output, '"key/name" = "name"\n')
      t.same(TOML.parse(output), input, 'round trip test worked')
      t.end()
    })
  })

  t.test('slash in key in object tag', function (t) {
    var input = { 'this': { 'key/name': { is: 'key/name' } } }

    toTOMLString(input, function (er, output) {
      t.ifError(er, "shouldn't have failed to convert a value this simple")

      t.equals(output, '[this."key/name"]\nis = "key/name"\n')
      t.same(TOML.parse(output), input, 'round trip test worked')
      t.end()
    })
  })

  t.test('underscore in key', function (t) {
    var input = { 'key_name': 'name' }

    toTOMLString(input, function (er, output) {
      t.ifError(er, "shouldn't have failed to convert a value this simple")

      t.equals(output, 'key_name = "name"\n')
      t.same(TOML.parse(output), input, 'round trip test worked')
      t.end()
    })
  })

  t.test('slash in key in object tag', function (t) {
    var input = { 'this': { 'key_name': { is: 'key_name' } } }

    toTOMLString(input, function (er, output) {
      t.ifError(er, "shouldn't have failed to convert a value this simple")

      t.equals(output, '[this.key_name]\nis = "key_name"\n')
      t.same(TOML.parse(output), input, 'round trip test worked')
      t.end()
    })
  })

  t.test('space in key', function (t) {
    var input = { 'key name': 'name' }

    toTOMLString(input, function (er, output) {
      t.ifError(er, "shouldn't have failed to convert a value this simple")

      t.equals(output, '"key name" = "name"\n')
      t.same(TOML.parse(output), input, 'round trip test worked')
      t.end()
    })
  })

  t.test('space in key in object tag', function (t) {
    var input = { 'this': { 'key name': { is: 'key name' } } }

    toTOMLString(input, function (er, output) {
      t.ifError(er, "shouldn't have failed to convert a value this simple")

      t.equals(output, '[this."key name"]\nis = "key name"\n')
      t.same(TOML.parse(output), input, 'round trip test worked')
      t.end()
    })
  })

  t.test('newline in key', function (t) {
    var input = { 'key\nname': 'name' }

    toTOMLString(input, function (er, output) {
      t.ifError(er, "shouldn't have failed to convert a value this simple")

      t.equals(output, '"key\\nname" = "name"\n')
      t.same(TOML.parse(output), input, 'round trip test worked')
      t.end()
    })
  })

  t.test('space in key in object tag', function (t) {
    var input = { 'this': { 'key\nname': { is: 'key\nname' } } }

    toTOMLString(input, function (er, output) {
      t.ifError(er, "shouldn't have failed to convert a value this simple")

      t.equals(output, '[this."key\\nname"]\nis = """\nkey\nname"""\n')
      t.same(TOML.parse(output), input, 'round trip test worked')
      t.end()
    })
  })
  t.end()
})
