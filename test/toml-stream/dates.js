var test = require('tap').test
var toml = require('toml')
var toTOMLString = require('./to-toml-string.js')

test('date TOML values', function (t) {
  t.test('with one value', function (t) {
    var date = new Date('2017-08-10T08:34:12.666Z')
    var input = {date: date}

    toTOMLString(input, function (er, output) {
      t.ifError(er, "shouldn't have failed to convert a value this simple")

      t.equals(output, 'date = 2017-08-10T08:34:12.666Z\n')
      t.same(toml.parse(output), input, 'round trip test worked')
      t.end()
    })
  })

  t.end()
})
