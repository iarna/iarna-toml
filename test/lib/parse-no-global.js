'use strict'
const assert = require('assert')
const globals = global
const savedBuffer = Buffer
const savedBigInt = global.BigInt
const hasBigInt = process.argv[2] !== 'no-bigint' && typeof savedBigInt === 'function'

try {
  delete globals.global
  // The coverage loader needs Buffer while requiring modules.
  const parse = require('../../parse-string.js')
  delete globals.Buffer
  if (!hasBigInt) delete globals.BigInt

  const result = parse('title = "example"\nport = 8020\ndate = 1979-05-27\nlarge = 9223372036854775807\n')
  assert.strictEqual(typeof global, 'undefined')
  assert.strictEqual(typeof Buffer, 'undefined')
  assert.strictEqual(result.title, 'example')
  assert.strictEqual(result.port, 8020)
  assert.ok(result.date instanceof Date)
  assert.strictEqual(result.date.constructor.name, 'Date')
  assert.strictEqual(result.date.isDate, true)
  assert.strictEqual(result.date.toISOString(), '1979-05-27')
  assert.strictEqual(typeof result.large, hasBigInt ? 'bigint' : 'number')
  assert.strictEqual(String(result.large), hasBigInt ? '9223372036854775807' : '9223372036854776000')
} finally {
  globals.global = globals
  globals.Buffer = savedBuffer
  globals.BigInt = savedBigInt
}
