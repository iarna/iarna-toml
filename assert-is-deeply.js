'use strict'
const assert = require('assert')
const isDeeply = require('./test/lib/is-deeply.js')
module.exports = (a, b) => assert(isDeeply(a, b))
