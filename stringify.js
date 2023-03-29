'use strict'
module.exports = stringify
module.exports.value = stringifyInline

function stringify (value, opts) {
  const stringifier = new Stringifier(opts)
  return stringifier.stringify(value)
}

function stringifyInline (value, opts) {
  const stringifier = new Stringifier(opts)
  return stringifier.stringifyInline(value)
}

class Stringifier {
  constructor (opts) {
    if (!opts) opts = {}
    this.opts = opts
  }

  stringify (obj) {
    if (obj === null) throw this.typeError('null')
    if (obj === void (0)) throw this.typeError('undefined')
    if (typeof obj !== 'object') throw this.typeError(typeof obj)

    if (typeof obj.toJSON === 'function') obj = obj.toJSON()
    if (obj == null) return null
    const type = this.tomlType(obj)
    if (type !== 'table') throw this.typeError(type)
    return this.stringifyObject('', '', obj)
  }

  typeError (type) {
    return new Error('Can only stringify objects, not ' + type)
  }

  getInlineKeys (obj) {
    return Object.keys(obj).filter(key => this.isInline(obj[key]))
  }
  getComplexKeys (obj) {
    return Object.keys(obj).filter(key => !this.isInline(obj[key]))
  }

  _toJSON (obj) {
    let nobj = Array.isArray(obj) ? [] : Object.prototype.hasOwnProperty.call(obj, '__proto__') ? {['__proto__']: undefined} : {}
    for (let prop of Object.keys(obj)) {
      if (obj[prop] && typeof obj[prop].toJSON === 'function' && !('toISOString' in obj[prop])) {
        nobj[prop] = obj[prop].toJSON()
      } else {
        nobj[prop] = obj[prop]
      }
    }
    return nobj
  }

  stringifyObject (prefix, indent, obj) {
    obj = this._toJSON(obj)
    let inlineKeys
    let complexKeys
    inlineKeys = this.getInlineKeys(obj)
    complexKeys = this.getComplexKeys(obj)
    const result = []
    const inlineIndent = indent || ''
    inlineKeys.forEach(key => {
      var type = this.tomlType(obj[key])
      if (type !== 'undefined' && type !== 'null') {
        result.push(inlineIndent + this.stringifyKey(key) + ' = ' + this.stringifyAnyInline(obj[key], true))
      }
    })
    if (result.length > 0) result.push('')
    const complexIndent = prefix && inlineKeys.length > 0 ? indent + '  ' : ''
    complexKeys.forEach(key => {
      result.push(this.stringifyComplex(prefix, complexIndent, key, obj[key]))
    })
    return result.join('\n')
  }

  isInline (value) {
    switch (this.tomlType(value)) {
      case 'undefined':
      case 'null':
      case 'integer':
      case 'nan':
      case 'float':
      case 'boolean':
      case 'string':
      case 'datetime':
        return true
      case 'array':
        return value.length === 0 || this.tomlType(value[0]) !== 'table'
      case 'table':
        return Object.keys(value).length === 0
      /* istanbul ignore next */
      default:
        return false
    }
  }

  tomlType (value) {
    if (value === undefined) {
      return 'undefined'
    } else if (value === null) {
      return 'null'
    /* eslint-disable valid-typeof */
    } else if (typeof value === 'bigint' || (Number.isInteger(value) && !Object.is(value, -0))) {
      return 'integer'
    } else if (typeof value === 'number') {
      return 'float'
    } else if (typeof value === 'boolean') {
      return 'boolean'
    } else if (typeof value === 'string') {
      return 'string'
    } else if ('toISOString' in value) {
      return isNaN(value) ? 'undefined' : 'datetime'
    } else if (Array.isArray(value)) {
      return 'array'
    } else {
      return 'table'
    }
  }

  stringifyKey (key) {
    const keyStr = String(key)
    if (/^[-A-Za-z0-9_]+$/.test(keyStr)) {
      return keyStr
    } else {
      return this.stringifyBasicString(keyStr)
    }
  }

  stringifyBasicString (str) {
    return '"' + this.escapeString(str).replace(/"/g, '\\"') + '"'
  }

  stringifyLiteralString (str) {
    return "'" + str + "'"
  }

  numpad (num, str) {
    while (str.length < num) str = '0' + str
    return str
  }

  escapeString (str) {
    return str.replace(/\\/g, '\\\\')
      .replace(/[\b]/g, '\\b')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\f/g, '\\f')
      .replace(/\r/g, '\\r')
      /* eslint-disable no-control-regex */
      .replace(/([\u0000-\u001f\u007f])/, c => '\\u' + this.numpad(4, c.codePointAt(0).toString(16)))
      /* eslint-enable no-control-regex */
  }

  stringifyMultilineString (str) {
    let escaped = str.split(/\n/).map(str => {
      return this.escapeString(str).replace(/"(?="")/g, '\\"')
    }).join('\n')
    if (escaped.slice(-1) === '"') escaped += '\\\n'
    return '"""\n' + escaped + '"""'
  }

  stringifyAnyInline (value, multilineOk) {
    let type = this.tomlType(value)
    if (type === 'string') {
      if (multilineOk && /\n/.test(value)) {
        type = 'string-multiline'
      } else if (!/[\b\t\n\f\r']/.test(value) && /"/.test(value)) {
        type = 'string-literal'
      }
    }
    return this.stringifyInline(value, type)
  }

  stringifyInline (value, type) {
    /* istanbul ignore if */
    if (!type) type = this.tomlType(value)
    switch (type) {
      case 'string-multiline':
        return this.stringifyMultilineString(value)
      case 'string':
        return this.stringifyBasicString(value)
      case 'string-literal':
        return this.stringifyLiteralString(value)
      case 'integer':
        return this.stringifyInteger(value)
      case 'float':
        return this.stringifyFloat(value)
      case 'boolean':
        return this.stringifyBoolean(value)
      case 'datetime':
        return this.stringifyDatetime(value)
      case 'array':
        return this.stringifyInlineArray(value.filter(_ => this.tomlType(_) !== 'null' && this.tomlType(_) !== 'undefined' && this.tomlType(_) !== 'nan'))
      case 'table':
        return this.stringifyInlineTable(value)
      /* istanbul ignore next */
      default:
        throw this.typeError(type)
    }
  }

  stringifyInteger (value) {
    if (this.opts.skipThousandsSeparator) {
      return String(value)
    }

    /* eslint-disable security/detect-unsafe-regex */
    return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '_')
  }

  stringifyFloat (value) {
    if (value === Infinity) {
      return 'inf'
    } else if (value === -Infinity) {
      return '-inf'
    } else if (Object.is(value, NaN)) {
      return 'nan'
    } else if (Object.is(value, -0)) {
      return '-0.0'
    }
    const [int, dec] = String(value).split('.')
    return this.stringifyInteger(int) + '.' + dec
  }

  stringifyBoolean (value) {
    return String(value)
  }

  stringifyDatetime (value) {
    return value.toISOString()
  }

  stringifyInlineArray (values) {
    values = this._toJSON(values)
    let result = '['
    const stringified = values.map(_ => this.stringifyInline(_))
    if (stringified.join(', ').length > 60 || /\n/.test(stringified)) {
      result += '\n  ' + stringified.join(',\n  ') + '\n'
    } else {
      result += ' ' + stringified.join(', ') + (stringified.length > 0 ? ' ' : '')
    }
    return result + ']'
  }

  stringifyInlineTable (value) {
    value = this._toJSON(value)
    const result = []
    Object.keys(value).forEach(key => {
      result.push(this.stringifyKey(key) + ' = ' + this.stringifyAnyInline(value[key], false))
    })
    return '{ ' + result.join(', ') + (result.length > 0 ? ' ' : '') + '}'
  }

  stringifyComplex (prefix, indent, key, value) {
    const valueType = this.tomlType(value)
    /* istanbul ignore else */
    if (valueType === 'array') {
      return this.stringifyArrayOfTables(prefix, indent, key, value)
    } else if (valueType === 'table') {
      return this.stringifyComplexTable(prefix, indent, key, value)
    } else {
      throw this.typeError(valueType)
    }
  }

  stringifyArrayOfTables (prefix, indent, key, values) {
    values = this._toJSON(values)
    const firstValueType = this.tomlType(values[0])
    /* istanbul ignore if */
    if (firstValueType !== 'table') throw this.typeError(firstValueType)
    const fullKey = prefix + this.stringifyKey(key)
    let result = ''
    values.forEach(table => {
      if (result.length > 0) result += '\n'
      result += indent + '[[' + fullKey + ']]\n'
      result += this.stringifyObject(fullKey + '.', indent, table)
    })
    return result
  }

  stringifyComplexTable (prefix, indent, key, value) {
    const fullKey = prefix + this.stringifyKey(key)
    let result = ''
    if (this.getInlineKeys(value).length > 0) {
      result += indent + '[' + fullKey + ']\n'
    }
    return result + this.stringifyObject(fullKey + '.', indent, value)
  }
}
