var test = require('tap').test
var TOML = require('../..')
var stringify = require('../../stringify.js')

test('integer TOML values', function (t) {
  t.test('with one value', function (t) {
    var input = {number: 314}
    var output = stringify(input)
    t.equals(output, 'number = 314\n', 'got expected output')
    t.same(TOML.parse(output), input, 'round trip test worked')
    t.end()
  })

  t.test('with threeve values', function (t) {
    var input = {number1: 314, number2: 415, number3: 303, number4: 808}
    var output = stringify(input)

    t.equals(
      output,
      'number1 = 314\nnumber2 = 415\nnumber3 = 303\nnumber4 = 808\n',
      'got expected output'
    )
    t.same(TOML.parse(output), input, 'round trip test worked')
    t.end()
  })

  t.end()
})

test('long integer TOML values', function (t) {
  t.test('with one value', function (t) {
    var input = {number: 3140}

    var output = stringify(input)
    t.equals(output, 'number = 3_140\n', 'got expected output')
    t.same(TOML.parse(output), input, 'round trip test worked')
    t.end()
  })

  t.test('with threeve values', function (t) {
    var input = {number1: 3140, number2: 41500, number3: 303000, number4: 8080000}
    var output = stringify(input)
    t.equals(
      output,
      'number1 = 3_140\nnumber2 = 41_500\nnumber3 = 303_000\nnumber4 = 8_080_000\n',
      'got expected output'
    )
    t.same(TOML.parse(output), input, 'round trip test worked')
    t.end()
  })

  t.end()
})

test('floating-point TOML values', function (t) {
  t.test('with one value', function (t) {
    var input = {number: 3.14}
    var output = stringify(input)
    t.equals(output, 'number = 3.14\n', 'got expected output')
    t.same(TOML.parse(output), input, 'round trip test worked')
    t.end()
  })

  t.test('with threeve values', function (t) {
    var input = {number1: 3.14, number2: 4.15, number3: 30.3, number4: 0.808}
    var output = stringify(input)
    t.equals(
      output,
      'number1 = 3.14\nnumber2 = 4.15\nnumber3 = 30.3\nnumber4 = 0.808\n',
      'got expected output'
    )
    t.same(TOML.parse(output), input, 'round trip test worked')
    t.end()
  })

  t.end()
})

test('long floating-point TOML values', function (t) {
  t.test('with one value', function (t) {
    var input = {number: 3140.12345}
    var output = stringify(input)
    t.equals(output, 'number = 3_140.12345\n', 'got expected output')
    t.same(TOML.parse(output), input, 'round trip test worked')
    t.end()
  })

  t.test('with threeve values', function (t) {
    var input = {
      number1: 3140.1259,
      number2: 41500.763,
      number3: 303000.03,
      number4: 8080000.1
    }
    var output = stringify(input)
    t.equals(
      output,
      'number1 = 3_140.1259\n' +
        'number2 = 41_500.763\n' +
        'number3 = 303_000.03\n' +
        'number4 = 8_080_000.1\n',
      'got expected output'
    )
    t.same(TOML.parse(output), input, 'round trip test worked')
    t.end()
  })

  t.end()
})
