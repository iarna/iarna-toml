const qx = require('@perl/qx').sync
const data = JSON.parse(qx`npx tap ${__dirname}/local-spec-test.js -R json`)

const labels = {
  'local-spec-test spec-asserts': 'TOML 1.0.0-rc.1',
  'local-spec-test spec-error-asserts': 'TOML 1.0.0-rc.1'
}
const result = {}

data.tests.forEach(t => {
  const [, suitea, parser, suiteb] = /^.*?[/]([^/]+)[.]js (\S+) (\S+)/.exec(t.fullTitle)
  const title = labels[suitea + ' ' + suiteb] + ': ' + t.title
  if (!result[title]) result[title] = {}
  result[title][parser] = !t.err.message
})
console.log(JSON.stringify(result, null, 2))
