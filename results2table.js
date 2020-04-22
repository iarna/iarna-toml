'use strict'
const approx = require('approximate-number')
const fs = require('fs')
const results = JSON.parse(fs.readFileSync('./benchmark-results.json'))

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

function repeat (str, count) {
  let result = ''
  for (let ii = 0; ii < count; ++ii) result += str
  return result
}

for (let nodev in results) {
  console.log(`### ${nodev}`)
  const tests = Object.keys(results[nodev])
  const libs = Object.keys(results[nodev][tests[0]])
  console.log('')
  console.log('|   |' + libs.map(_ => ` ${_.replace(/[/]/, '/<wbr>')} |`).join(''))
  console.log('| - |' + libs.map(_ => ` :${repeat('-', _.length - 2)}: |`).join(''))

  for (let name of tests) {
    if (!size[name]) {
      try {
        size[name] = fileSize(name)
      } catch (_) {
        continue
      }
    }
    const bench = results[nodev][name]
    let line = `| **${testName[name] || name}** |`
    for (let lib of libs) {
      if (!bench[lib] || bench[lib].crashed) {
        line += ` - |`
      } else {
        const speed = bench[lib].opsec * size[name]
        const mb = speed / 1000000
        line += ` ${approx(mb)}MB/sec<br><small>${bench[lib].errmargin}%</small> |`
      }
    }
    console.log(line)
  }
  console.log('')
}
