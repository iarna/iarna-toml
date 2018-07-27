'use strict'
const assert = require('assert')
module.exports = (a, b) => assert(isObjectDeeply(a, b))

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
