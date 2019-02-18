const qx = require('@perl/qx').sync
const result = JSON.parse(qx`node ${__dirname}/run-tests.js`)
const testNames = Object.keys(result)
const parsers = Object.keys(result[testNames[0]])

console.log(`
BurntSushi tests are for TOML 0.4.0 and are from <a href="https://github.com/BurntSushi/toml-test">here</a>.<br>
<br>
iarna tests are for TOML 0.5.0 and are from <a href="https://github.com/iarna/toml-spec-tests">here</a>.<br>
<br>
<table>
<tr><th>Test</th><th>${parsers.map(_ => _.replace(/(.)@/, '$1 @')).join('</th><th>')}</th></tr>
`)
testNames.forEach(name => {
  console.log(`<tr><td>${name}</td>`)
  console.log(parsers.map(parser => `<td class="${result[name][parser] ? 'pass' : 'fail'}">${result[name][parser] ? 'pass' : '<b>FAIL</b>'}</td>`).join(''))
  console.log(`</tr>`)
})
console.log(`</table>`)
