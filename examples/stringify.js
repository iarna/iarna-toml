'use strict'
const TOML = require('..')
const util = require('util')
const dump = d => util.inspect(d, {colors: true, depth: Infinity})

let testobj = {a: [1, 2], b: { c: true, d: false }}

console.log('Data:\n' + dump(testobj) + '\n')
console.log('TOML:\n' + TOML.stringify(testobj))

testobj = {a: [1.1, 2]}

console.log('Data:\n' + dump(testobj) + '\n')
console.log('TOML:\n' + TOML.stringify(testobj))

testobj = {a: [1.1, true]}
console.log('Data:\n' + dump(testobj) + '\n')
try {
  console.log('TOML:\n' + TOML.stringify(testobj))
} catch (err) {
  console.log('Error:\n' + err.message)
}
