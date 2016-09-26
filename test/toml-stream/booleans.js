var test = require('tap').test
var toml = require('toml')
var toTOMLString = require('./to-toml-string.js')

test('boolean TOML values', function (t) {
  t.test('with true', function (t) {
    var input = {zuul: true}

    toTOMLString(input, function (er, output) {
      t.ifError(er, "shouldn't have failed to convert a value this simple")

      t.equals(output, 'zuul = true\n')
      t.same(toml.parse(output), input, 'round trip test worked')
      t.end()
    })
  })

  t.test('with false', function (t) {
    var input = {slor: false}

    toTOMLString(input, function (er, output) {
      t.ifError(er, "shouldn't have failed to convert a value this simple")

      t.equals(output, 'slor = false\n')
      t.same(toml.parse(output), input, 'round trip test worked')
      t.end()
    })
  })

  t.end()
})
