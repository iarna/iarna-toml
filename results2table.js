'use strict'
const results = require('./benchmark-results.json')
const TOML = require('.')
const toml = function (args) {
  return TOML.parse(args.raw[0])
}

const testName = {
  "overall": "Overall",
  "01-spec-example-v0.4.0": "Spec Example",
  "02-spec-example-hard-unicode": "Spec Example: Hard Unicode",
  "03-1000-keys": "1000 Keys",
  "04-array-1000": "Array With 1000 Tables With 1 Key",
  "05-array-1000-tables-of-tables": "Array With 1000 Tables of Tables of 1 Key",
  "06-inline-array-nested-1000-deep": "1000 Element Inline Array",
  "07-inline-table-nested-1000-deep": "1000 Key Inline Table",
  "08-40kb-multiline-single": "40kb Multiline Single Quoted String",
  "09-40kb-multiline-double": "40kb Multiline Double Quoted String",
  "long-inline-array": "Inline Array Nested 1000 deep",
  "long-inline-object": "Inline Tables Nested 1000 deep",
  "long-line-double": "40kb Single Quoted String",
  "long-line-single": "40kb Single Quoted String"
}

for (let nodev in results) {
  console.log(`### ${nodev}`)
  console.log('')
  console.log('|   | @iarna/toml |   | toml-j0.4 |   | toml |   | @sgarciac/bombadil |   |')
  console.log('| - | ----------- | - | --------- | - | ---- | - | -------------------| - |')
  
  for (let name in results[nodev]) {
    const bench = results[nodev][name]
    let line = `| ${testName[name] || name} |`
    for (let lib in bench) {
      if (bench[lib].crashed) {
        line += ` crashed | |`
      } else {
        line += ` ${bench[lib].opsec} | ${bench[lib].errmargin}% |`
      } 
    }
    console.log(line)
  }
  console.log('')
}