var test = require('tap').test
var toml = require('toml-j0.4')
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
      t.same(toml.parse(output), input, 'round trip test worked')
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
      t.same(toml.parse(output), input, 'round trip test worked')
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
      t.same(toml.parse(output), input, 'round trip test worked')
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
      t.same(toml.parse(output), input, 'round trip test worked')
      t.end()
    })
  })

  t.end()
})
