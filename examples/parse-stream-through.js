'use strict'
const Readable = require('stream').Readable
const TOML = require('..')
const util = require('util')
const dump = d => util.inspect(d, {colors: true, depth: Infinity})

success().then(() => failure())

function streamString (str) {
  // creates a readable stream from a string that just emits the stream as a
  // single block.
  let streamed = false
  return new Readable({
    read () {
      if (streamed) return this.push(null)
      streamed = true
      this.push(str)
    }
  })
}

function success () {
  return new Promise(resolve => {
    let testtoml = `a = [1.0,1e0]`

    console.log('Parsing:', testtoml)
    streamString(testtoml).pipe(TOML.parse.stream())
      .on('data', o => console.log('Result', dump(o)))
      .on('end', resolve)
      .on('error', _ => {
        console.error('Error:', _.message)
        resolve()
      })
  })
}

function failure () {
  return new Promise(resolve => {
    let testtoml = `a = [1.0,1e0`

    console.log('Parsing:', testtoml)
    streamString(testtoml).pipe(TOML.parse.stream())
      .on('data', o => console.log('Result', dump(o)))
      .on('end', resolve)
      .on('error', _ => {
        console.error('Error:', _.message)
        resolve()
      })
  })
}
