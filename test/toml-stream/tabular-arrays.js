var test = require('tap').test
var TOML = require('../..')
var toTOMLString = require('./to-toml-string.js')

test('arrays of tables to TOML', function (t) {
  t.test('single-value array of object with single property', function (t) {
    var input = {section: [{key: 'value'}]}

    toTOMLString(input, function (er, output) {
      t.ifError(er, 'tabular array successfully converted')

      if (!er) {
        t.equals(output, '[[section]]\nkey = "value"\n')
        t.same(TOML.parse(output), input, 'round trip test worked')
      }
      t.end()
    })
  })

  t.test('multi-value array of objects with single property', function (t) {
    var input = {
      section: [
        {key: 'value1'},
        {key: 'value2'},
        {key: 'value3'}
      ]
    }

    var expected = [
      '[[section]]',
      'key = "value1"',
      '',
      '[[section]]',
      'key = "value2"',
      '',
      '[[section]]',
      'key = "value3"'
    ].join('\n') + '\n'

    toTOMLString(input, function (er, output) {
      t.ifError(er, 'tabular array successfully converted')

      if (!er) {
        t.equals(output, expected, 'multi-object values generated correctly')
        t.same(TOML.parse(output), input, 'round trip test worked')
      }
      t.end()
    })
  })

  t.test('multi-value array of objects with different property types', function (t) {
    var input = {
      section: [
        {key: 'value1'},
        {key: 4},
        {key: true}
      ]
    }

    var expected = [
      '[[section]]',
      'key = "value1"',
      '',
      '[[section]]',
      'key = 4',
      '',
      '[[section]]',
      'key = true'
    ].join('\n') + '\n'

    toTOMLString(input, function (er, output) {
      t.ifError(er, 'tabular array successfully converted')

      if (!er) {
        t.equals(output, expected, 'multi-object values generated correctly')
        t.same(TOML.parse(output), input, 'round trip test worked')
      }
      t.end()
    })
  })

  t.test('multiple arrays of objects with single properties', function (t) {
    var input = {
      section1: [{key: 'value1'}],
      section2: [{key: 'value2'}],
      section3: [{key: 'value3'}]
    }

    var expected = [
      '[[section1]]',
      'key = "value1"',
      '',
      '[[section2]]',
      'key = "value2"',
      '',
      '[[section3]]',
      'key = "value3"'
    ].join('\n') + '\n'

    toTOMLString(input, function (er, output) {
      t.ifError(er, 'tabular array successfully converted')

      t.comment(output)
      if (!er) {
        t.equals(output, expected, 'multi-object values generated correctly')
        t.same(TOML.parse(output), input, 'round trip test worked')
      }
      t.end()
    })
  })

  t.end()
})
