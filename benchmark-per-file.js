/*
This file modified from benchmark.js in toml-j0.4 and that file has the following license:

The MIT License (MIT)

Copyright (c) 2015 Jak Wings

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

const assertIsDeeply = require('./assert-is-deeply.js')
const fs = require('fs')
const path = require('path')
const glob = require('glob').sync
const cursor = require('ansi')(process.stdout)
const Benchmark = require('benchmark')
const parseIarnaToml = require('./parse-string.js')
const parseToml = require('toml').parse
const parseTomlj04 = require('toml-j0.4').parse
const bombadil = require('@sgarciac/bombadil')
const jTOML = require('@ltd/j-toml')
function parseBombadil (str) {
  const reader = new bombadil.TomlReader()
  reader.readToml(str)
  if (reader.result === null) throw reader.errors
  return reader.result
}
function parsejTOML (str) {
  return jTOML.parse(str, 0.5, '\n')
}

let results

try {
  results = require('./benchmark-results.json')
} catch (_) {
  results = {}
}

const fixtures = glob(`${__dirname}/benchmark/*.toml`)
  .map(_ => ({name: _, data: fs.readFileSync(_, {encoding: 'utf8'})}))
fixtures.forEach(_ => { _.answer = parseIarnaToml(_.data) })

fixtures.forEach(fixture => {
  const name = path.basename(fixture.name, '.toml')
  const suite = new Benchmark.Suite({
    onStart: function () {
      console.log(`${name} Benchmarking...`)
    },
    onComplete: function () {
      console.log(`${name} Successful:\n\t` +
          this.filter('successful').map('name').join(', '))
      console.log(`${name} Fastest:\n\t` +
          this.filter('fastest').map('name').join(', '))
      if (!results[process.version]) results[process.version] = {}
      const data = results[process.version][name] = {}
      this.forEach(_ => {
        const name = _.name || (_.isNaN(_.id) ? _.id : '<Test #' + _.id + '>')
        if (_.error) {
          data[name] = { crashed: true }
        } else {
          data[name] = {
            opsec: _.hz.toFixed(_.hz < 100 ? 2 : 0),
            errmargin: _.stats.rme.toFixed(2),
            samples: _.stats.sample.length
          }
        }
      })
      fs.writeFileSync('benchmark-results.json', JSON.stringify(results, null, 2))
    },
    onError: function (event) {
      console.error(event.target.error)
    }
  })

  const onCycle = event => {
    cursor.horizontalAbsolute()
    cursor.eraseLine()
    cursor.write('\t' + event.target)
  }
  const onComplete = () => cursor.write('\n')

  suite.add('@iarna/toml', {
    fn: function () {
      assertIsDeeply(parseIarnaToml(fixture.data), fixture.answer)
    },
    onCycle: onCycle,
    onComplete: onComplete
  })

  suite.add('toml-j0.4', {
    fn: function () {
      assertIsDeeply(parseTomlj04(fixture.data), fixture.answer)
    },
    onCycle: onCycle,
    onComplete: onComplete
  })

  suite.add('toml', {
    fn: function () {
      assertIsDeeply(parseToml(fixture.data), fixture.answer)
    },
    onCycle: onCycle,
    onComplete: onComplete
  })
  suite.add('bombadil', {
    fn: function () {
      assertIsDeeply(parseBombadil(fixture.data), fixture.answer)
    },
    onCycle: onCycle,
    onComplete: onComplete
  })

  suite.add('@ltd/j-toml', {
    fn: function () {
      assertIsDeeply(parsejTOML(fixture.data), fixture.answer)
    },
    maxTime: 15,
    onCycle: onCycle,
    onComplete: onComplete
  })
  suite.run()
  console.log('\n')
})
