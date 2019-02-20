'use strict'
const TOML = require('..')
const util = require('util')
const dump = d => util.inspect(d, {colors: true, depth: Infinity})

success()
failure()

function success () {
  let testtoml = `a = [1.0,1e0]`

  console.log('Parsing:', testtoml)
  try {
    console.log('Result:', dump(TOML.parse(testtoml)))
  } catch (err) {
    console.error('Error:', err.message)
  }
}

function failure () {
  let testtoml = `a = [1.0,1e0`

  console.log('Parsing:', testtoml)
  try {
    console.log('Result:', dump(TOML.parse(testtoml)))
  } catch (err) {
    console.error('Error:', err.message)
  }
}
