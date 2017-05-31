var test = require('tap').test
var toml = require('toml-j0.4')
var toTOMLString = require('./to-toml-string.js')

test('weird keys', function (t) {
  t.test('dot in key', function (t) {
    var input = { 'key.name': 'name' }

    toTOMLString(input, function (er, output) {
      t.ifError(er, "shouldn't have failed to convert a value this simple")

      t.equals(output, '"key.name" = "name"\n')
      t.same(toml.parse(output), input, 'round trip test worked')
      t.end()
    })
  })

  t.test('dot in key in object tag', function (t) {
    var input = { 'this': { 'key.name': { is: 'key.name' } } }

    toTOMLString(input, function (er, output) {
      t.ifError(er, "shouldn't have failed to convert a value this simple")

      t.equals(output, '[this."key.name"]\nis = "key.name"\n')
      t.same(toml.parse(output), input, 'round trip test worked')
      t.end()
    })
  })

  t.test('dash in key', function (t) {
    var input = { 'key-name': 'name' }

    toTOMLString(input, function (er, output) {
      t.ifError(er, "shouldn't have failed to convert a value this simple")

      t.equals(output, 'key-name = "name"\n')
      t.same(toml.parse(output), input, 'round trip test worked')
      t.end()
    })
  })

  t.test('dash in key in object tag', function (t) {
    var input = { 'this': { 'key-name': { is: 'key-name' } } }

    toTOMLString(input, function (er, output) {
      t.ifError(er, "shouldn't have failed to convert a value this simple")

      t.equals(output, '[this.key-name]\nis = "key-name"\n')
      t.same(toml.parse(output), input, 'round trip test worked')
      t.end()
    })
  })

  t.test('slash in key', function (t) {
    var input = { 'key/name': 'name' }

    toTOMLString(input, function (er, output) {
      t.ifError(er, "shouldn't have failed to convert a value this simple")

      t.equals(output, '"key/name" = "name"\n')
      t.same(toml.parse(output), input, 'round trip test worked')
      t.end()
    })
  })

  t.test('slash in key in object tag', function (t) {
    var input = { 'this': { 'key/name': { is: 'key/name' } } }

    toTOMLString(input, function (er, output) {
      t.ifError(er, "shouldn't have failed to convert a value this simple")

      t.equals(output, '[this."key/name"]\nis = "key/name"\n')
      t.same(toml.parse(output), input, 'round trip test worked')
      t.end()
    })
  })

  t.test('underscore in key', function (t) {
    var input = { 'key_name': 'name' }

    toTOMLString(input, function (er, output) {
      t.ifError(er, "shouldn't have failed to convert a value this simple")

      t.equals(output, 'key_name = "name"\n')
      t.same(toml.parse(output), input, 'round trip test worked')
      t.end()
    })
  })

  t.test('slash in key in object tag', function (t) {
    var input = { 'this': { 'key_name': { is: 'key_name' } } }

    toTOMLString(input, function (er, output) {
      t.ifError(er, "shouldn't have failed to convert a value this simple")

      t.equals(output, '[this.key_name]\nis = "key_name"\n')
      t.same(toml.parse(output), input, 'round trip test worked')
      t.end()
    })
  })

  t.test('space in key', function (t) {
    var input = { 'key name': 'name' }

    toTOMLString(input, function (er, output) {
      t.ifError(er, "shouldn't have failed to convert a value this simple")

      t.equals(output, '"key name" = "name"\n')
      t.same(toml.parse(output), input, 'round trip test worked')
      t.end()
    })
  })

  t.test('space in key in object tag', function (t) {
    var input = { 'this': { 'key name': { is: 'key name' } } }

    toTOMLString(input, function (er, output) {
      t.ifError(er, "shouldn't have failed to convert a value this simple")

      t.equals(output, '[this."key name"]\nis = "key name"\n')
      t.same(toml.parse(output), input, 'round trip test worked')
      t.end()
    })
  })

  t.test('newline in key', function (t) {
    var input = { 'key\nname': 'name' }

    toTOMLString(input, function (er, output) {
      t.ifError(er, "shouldn't have failed to convert a value this simple")

      t.equals(output, '"key\\nname" = "name"\n')
      t.same(toml.parse(output), input, 'round trip test worked')
      t.end()
    })
  })

  t.test('space in key in object tag', function (t) {
    var input = { 'this': { 'key\nname': { is: 'key\nname' } } }

    toTOMLString(input, function (er, output) {
      t.ifError(er, "shouldn't have failed to convert a value this simple")

      t.equals(output, '[this."key\\nname"]\nis = """\nkey\nname"""\n')
      t.same(toml.parse(output), input, 'round trip test worked')
      t.end()
    })
  })
  t.end()
})
