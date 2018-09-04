'use strict'
const tap = require('tap')
module.exports = tap

if (!tap.deeplyObjectIs) {
  tap.Test.prototype.addAssert('deeplyObjectIs', 2, function (found, wanted, message, extra) {
    const isDeeply = isObjectDeeply(found, wanted)
    if (!isDeeply) tap.comment(found, wanted)
    return this.ok(isDeeply, message, extra)
  })
}

function isObjectDeeply (aa, bb) {
  if (typeof aa !== typeof bb) return false
  if (aa == null || bb == null || typeof aa !== 'object') return Object.is(aa, bb)
  if (Array.isArray(aa) && Array.isArray(bb)) return isArrayDeeply(aa, bb)
  if (Array.isArray(aa) || Array.isArray(bb)) return false
  if (aa instanceof Date && bb instanceof Date) return aa.toISOString() === bb.toISOString()
  let aaKeys = Object.keys(aa)
  let bbKeys = Object.keys(bb)
  if (aaKeys.length !== bbKeys.length) return false
  for (let key of aaKeys) {
    if (bbKeys.indexOf(key) === -1) return false
    if (!isObjectDeeply(aa[key], bb[key])) return false
  }
  return true
}

function isArrayDeeply (aa, bb) {
  if (aa.length !== bb.length) return false
  for (let ii = 0; ii < aa.length; ++ii) {
    if (!isObjectDeeply(aa[ii], bb[ii])) return false
  }
  return true
}
