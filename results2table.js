'use strict'
const results = require('./benchmark-results.json')
const approx = require('approximate-number')
const fs = require('fs')

const size = {
  'overall': 1124628
}
const testName = {
  'overall': 'Overall',
  '0A-spec-01-example-v0.4.0': 'Spec Example: v0.4.0',
  '0A-spec-02-example-hard-unicode': 'Spec Example: Hard Unicode',
  '0B-types-array-inline-empty': 'Types: Array, Inline',
  '0B-types-array': 'Types: Array',
  '0B-types-scalar-bools': 'Types: Boolean,',
  '0B-types-scalar-datetimes': 'Types: Datetime',
  '0B-types-scalar-floats': 'Types: Float',
  '0B-types-scalar-ints': 'Types: Int',
  '0B-types-scalar-literal-7-char': 'Types: Literal String, 7 char',
  '0B-types-scalar-literal-92-char': 'Types: Literal String, 92 char',
  '0B-types-scalar-literal-multiline-1079-chars': 'Types: Literal String, Multiline, 1079 char',
  '0B-types-scalar-string-7-char': 'Types: Basic String, 7 char',
  '0B-types-scalar-string-92-char': 'Types: Basic String, 92 char',
  '0B-types-scalar-string-multiline-1079-chars': 'Types: Basic String, 1079 char',
  '0B-types-table-inline-empty': 'Types: Table, Inline',
  '0B-types-table': 'Types: Table',
  '0C-scaling-array-inline-1000': 'Scaling: Array, Inline, 1000 elements',
  '0C-scaling-array-inline-nested-1000': 'Scaling: Array, Nested, 1000 deep',
  '0C-scaling-literal-40kb': 'Scaling: Literal String, 40kb',
  '0C-scaling-scalar-literal-multiline-40kb': 'Scaling: Literal String, Multiline, 40kb',
  '0C-scaling-scalar-string-multiline-40kb': 'Scaling: Basic String, Multiline, 40kb',
  '0C-scaling-string-40kb': 'Scaling: Basic String, 40kb',
  '0C-scaling-table-inline-1000': 'Scaling: Table, Inline, 1000 elements',
  '0C-scaling-table-inline-nested-1000': 'Scaling: Table, Inline, Nested, 1000 deep'
}

function fileSize (name) {
  /* eslint-disable security/detect-non-literal-fs-filename */
  try {
    return fs.readFileSync('benchmark/' + name + '.toml').length
  } catch (_) {
    return fs.readFileSync('test/spec-test/' + name + '.toml').length
  }
}

for (let nodev in results) {
  console.log(`### ${nodev}`)
  console.log('')
  console.log('|   | @iarna/toml |   | toml-j0.4 |   | toml |   | @sgarciac/bombadil |   | @ltd/j-toml |   |')
  console.log('| - | ----------- | - | --------- | - | ---- | - | -------------------| - | ----------- | - |')

  for (let name in results[nodev]) {
    if (!size[name]) {
      try {
        size[name] = fileSize(name)
      } catch (_) {
        continue
      }
    }
    const bench = results[nodev][name]
    let line = `| ${testName[name] || name} |`
    for (let lib in bench) {
      if (bench[lib].crashed) {
        line += ` crashed | |`
      } else {
        const speed = bench[lib].opsec * size[name]
        const mb = speed / 1000000
        line += ` ${approx(mb)}MB/sec | ${bench[lib].errmargin}% |`
      }
    }
    console.log(line)
  }
  console.log('')
}
