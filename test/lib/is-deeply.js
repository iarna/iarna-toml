'use strict'
module.exports = isDeeply

function kindOf (aa) {
  const aaType = typeof aa
  if (aaType === 'number' || aaType === 'bigint') return 'numberish'
  if (aa instanceof Date) return 'date'
  if (Array.isArray(aa)) return 'array'
  if (Buffer.isBuffer(aa)) return 'buffer'
  return aaType
}

function isDeeply (aa, bb) {
  if (kindOf(aa) !== kindOf(bb)) return false
  if (Object.is(aa, bb)) return true
  const kind = kindOf(aa)
  if (kind === 'numberish') {
    /* NOTE: This allows numbers to be compared to bigints.  They only count
       as == if they represent the exact same value, so if a bigint was
       needed to represent this number the check will fail, but if it can be
       safely either, then either is allowed.  */
    /* eslint-disable eqeqeq */
    return aa == bb
  }
  if (kind === 'date') {
    if (aa.toISOString().replace(/[.]0+$/, '') === bb.toISOString().replace(/[.]0+$/, '')) return true
    if (Number(aa) === Number(bb)) return true
    if (Number(new Date(aa.toISOString())) === Number(new Date(bb.toISOString()))) return true
    return false
  }
  if (kind === 'array') {
    if (aa.length !== bb.length) return false
    for (let ii = 0; ii < aa.length; ++ii) {
      if (!isDeeply(aa[ii], bb[ii])) return false
    }
    return true
  }

  if (kind !== 'object') return false
  let aaKeys = Object.keys(aa)
  let bbKeys = Object.keys(bb)
  if (aaKeys.length !== bbKeys.length) return false
  for (let key of aaKeys) {
    if (bbKeys.indexOf(key) === -1) return false
    if (!isDeeply(aa[key], bb[key])) return false
  }
  return true
}
