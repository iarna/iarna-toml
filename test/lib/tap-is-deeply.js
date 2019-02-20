'use strict'
const tap = require('tap')
module.exports = tap

const isDeeply = require('./is-deeply.js')

if (!tap.deeplyObjectIs) {
  tap.Test.prototype.addAssert('deeplyObjectIs', 2, function (found, wanted, message, extra) {
    const equiv = isDeeply(found, wanted)
    if (!equiv) tap.comment(found, wanted)
    return this.ok(equiv, message, extra)
  })
}
