var test = require('tap').test
var toml = require('toml-j0.4')
var toTOMLString = require('./to-toml-string.js')

test('composite objects to TOML', function (t) {
  t.test('with a very basic nested object', function (t) {
    var input = {object: {value: true}}

    toTOMLString(input, function (er, output) {
      t.ifError(er, 'composite object successfully converted')

      if (!er) {
        t.equals(output, '[object]\nvalue = true\n')
        t.same(toml.parse(output), input, 'round trip test worked')
      }
      t.end()
    })
  })

  t.test('with a less basic nested object', function (t) {
    var input = {
      object: {
        boolean: true,
        integer: 9,
        child1: {
          value1: 1,
          value2: 2
        },
        float: 1.41421,
        string: 'herro',
        child2: {
          hello: 'there'
        }
      }
    }

    var expected = [
      '[object]',
      'boolean = true',
      'integer = 9',
      'float = 1.41421',
      'string = "herro"',
      '',
      '  [object.child1]',
      '  value1 = 1',
      '  value2 = 2',
      '',
      '  [object.child2]',
      '  hello = "there"'
    ].join('\n') + '\n'

    toTOMLString(input, function (er, output) {
      t.ifError(er, 'composite object successfully converted')

      if (!er) {
        t.equals(output, expected)
        t.same(toml.parse(output), input, 'round trip test worked')
      }
      t.end()
    })
  })

  t.test('with a deeply nested object', function (t) {
    var input = { 'with': { a: { deeply: { nested: { object: true } } } } }

    var expected = '[with.a.deeply.nested]\nobject = true\n'

    toTOMLString(input, function (er, output) {
      t.ifError(er, 'composite object successfully converted')

      if (!er) {
        t.equals(output, expected)
        t.same(toml.parse(output), input, 'round trip test worked')
      }
      t.end()
    })
  })

  t.test('with a deeply nested object with stuff in the middle', function (t) {
    var input = {
      'with': {
        a: {
          thing: 'here',
          and: 'there',
          deeply: {
            nested: {
              object: true
            }
          }
        }
      }
    }

    var expected = [
      '[with.a]',
      'thing = "here"',
      'and = "there"',
      '',
      '[with.a.deeply.nested]',
      'object = true'
    ].join('\n') + '\n'

    toTOMLString(input, function (er, output) {
      t.ifError(er, 'composite object successfully converted')

      if (!er) {
        t.equals(output, expected)
        t.same(toml.parse(output), input, 'round trip test worked')
      }
      t.end()
    })
  })
  t.end()
})
