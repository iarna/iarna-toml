const qx = require('@perl/qx').sync
const data = JSON.parse(qx`npx tap ${__dirname}/burntsushi-toml-test.js ${__dirname}/local-spec-test.js -R json`)

const labels = {
  'local-spec-test spec-asserts': 'iarna 0.5.0',
  'local-spec-test spec-error-asserts': 'iarna 0.5.0',
  'burntsushi-toml-test spec-asserts': 'BurntSushi 0.4.0',
  'burntsushi-toml-test spec-error-asserts': 'BurntSushi 0.4.0'
}
const result = {}

data.tests.forEach(t => {
  const [, suitea, parser, suiteb] = /^.*?[/]([^/]+)[.]js (\S+) (\S+)/.exec(t.fullTitle)
  const title = labels[suitea + ' ' + suiteb] + ': ' + t.title
  if (!result[title]) result[title] = {}
  result[title][parser] = !t.err.message
})
console.log(JSON.stringify(result, null, 2))
