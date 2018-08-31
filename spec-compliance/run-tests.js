const qx = require('@perl/qx').sync
const data = JSON.parse(qx`npx tap ${__dirname}/burntsushi-toml-test.js ${__dirname}/local-spec-test.js -R json`)

const labels = {
  'spec-asserts': 'iarna 0.5.0',
  'spec-error-asserts': 'iarna 0.5.0',
  'burnt-sushi-toml-tests-valid': 'BurntSushi 0.4.0',
  'burnt-sushi-toml-tests-invalid': 'BurntSushi 0.4.0'
}
const result = {}

data.tests.forEach(t => {
  const [, parser, suite] = /^\S+ (\S+) (\S+)/.exec(t.fullTitle)
  const title = labels[suite] + ': ' + t.title
  if (!result[title]) result[title] = {}
  result[title][parser] = !t.err.message
})
console.log(JSON.stringify(result, null, 2))
