'use strict'
module.exports = getExpected
const fs = require('fs')
const YAML = require('js-yaml')
const expand = require('./expand-json.js')

function getExpected (spec) {
  /* eslint-disable security/detect-non-literal-fs-filename */
  const yamlName = spec.replace(/[.]toml$/, '.yaml')
  const jsonName = spec.replace(/[.]toml$/, '.json')
  if (fs.existsSync(yamlName)) {
    return YAML.safeLoad(fs.readFileSync(yamlName))
  } else if (fs.existsSync(jsonName)) {
    const expected = JSON.parse(fs.readFileSync(jsonName))
    return expand(expected)
  } else {
    return {}
  }
}
