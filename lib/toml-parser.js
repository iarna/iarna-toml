'use strict'
/* eslint-disable no-new-wrappers, no-eval */
module.exports = makeParserClass(require('./parser.js'))
module.exports.makeParserClass = makeParserClass

const createDateTime = require('./create-datetime.js')

const escapes = {
  'b': '\x08',
  't': '\x09',
  'n': '\x0a',
  'f': '\x0c',
  'r': '\x0d',
  '"': '\x22',
  '\\': '\x5c'
}

function isDigit (char) {
  return char === '0' || char === '1' || char === '2' || char === '3' ||
       char === '4' || char === '5' || char === '6' || char === '7' ||
       char === '8' || char === '9'
}
function isHexit (char) {
  /* istanbul ignore next */
  if (typeof char !== 'string') return false
  const cp = char.codePointAt(0)
  return (cp >= 65 && cp <= 70) || (cp >= 97 && cp <= 102) || (cp >= 48 && cp <= 57)
}
function isAlphaNumQuoteHyphen (char) {
  /* istanbul ignore next */
  if (typeof char !== 'string') return false
  const cp = char.codePointAt(0)
  // A-Za-z0-9'"_-
  return (cp >= 65 && cp <= 90) || (cp >= 97 && cp <= 122) || (cp >= 48 && cp <= 57) || cp === 39 || cp === 34 || cp === 95 || cp === 45
}
function isAlphaNumHyphen (char) {
  /* istanbul ignore next */
  if (typeof char !== 'string') return false
  const cp = char.codePointAt(0)
  // A-Za-z0-9_-
  return (cp >= 65 && cp <= 90) || (cp >= 97 && cp <= 122) || (cp >= 48 && cp <= 57) || cp === 95 || cp === 45
}
const _type = Symbol('type')
const _declared = Symbol('declared')

const INLINE_TABLE = Symbol('inline-table')
function InlineTable () {
  return Object.defineProperties({}, {
    [_type]: {value: INLINE_TABLE}
  })
}
function isInlineTable (obj) {
  if (obj === null || typeof (obj) !== 'object') return false
  return obj[_type] === INLINE_TABLE
}

const TABLE = Symbol('table')
function Table () {
  return Object.defineProperties({}, {
    [_type]: {value: TABLE},
    [_declared]: {value: false, writable: true}
  })
}
function isTable (obj) {
  if (obj === null || typeof (obj) !== 'object') return false
  return obj[_type] === TABLE
}

const _contentType = Symbol('content-type')
const INLINE_LIST = Symbol('inline-list')
function InlineList (type) {
  return Object.defineProperties([], {
    [_type]: {value: INLINE_LIST},
    [_contentType]: {value: type}
  })
}
function isInlineList (obj) {
  if (obj === null || typeof (obj) !== 'object') return false
  return obj[_type] === INLINE_LIST
}

const LIST = Symbol('list')
function List () {
  return Object.defineProperties([], {
    [_type]: {value: LIST}
  })
}
function isList (obj) {
  if (obj === null || typeof (obj) !== 'object') return false
  return obj[_type] === LIST
}

// in an eval, to let bundlers not slurp in a util proxy
const utilInspect = eval(`require('util').inspect`)
/* istanbul ignore next */
const _inspect = (utilInspect && utilInspect.custom) || 'inspect'

const INTEGER = Symbol('integer')
function Integer (value) {
  return Object.defineProperties(new Number(value), {
    [_type]: {value: INTEGER},
    [_inspect]: {value: () => `[Integer: ${value}]`}
  })
}
function isInteger (obj) {
  if (obj === null || typeof (obj) !== 'object') return false
  return obj[_type] === INTEGER
}

const FLOAT = Symbol('float')
function Float (value) {
  return Object.defineProperties(new Number(value), {
    [_type]: {value: FLOAT},
    [_inspect]: {value: () => `[Float: ${value}]`}
  })
}
function isFloat (obj) {
  if (obj === null || typeof (obj) !== 'object') return false
  return obj[_type] === FLOAT
}

function tomlType (value) {
  const type = typeof value
  if (type === 'object') {
    /* istanbul ignore if */
    if (value === null) return 'null'
    if (value instanceof Date) return 'datetime'
    /* istanbul ignore else */
    if (_type in value) {
      switch (value[_type]) {
        case INLINE_TABLE: return 'inline-table'
        case INLINE_LIST: return 'inline-list'
        /* istanbul ignore next */
        case TABLE: return 'table'
        /* istanbul ignore next */
        case LIST: return 'list'
        case FLOAT: return 'float'
        case INTEGER: return 'integer'
      }
    }
  }
  return type
}

function makeParserClass (Parser) {
  class TOMLParser extends Parser {
    constructor () {
      super()
      this.ctx = this.obj = Table()
    }

    /* MATCH HELPER */
    atEndOfWord () {
      return this.char === '#' || this.char === '\t' || this.char === ' ' || this.atEndOfLine()
    }
    atEndOfLine () {
      return this.char === Parser.END || this.char === '\n' || this.char === '\r'
    }

    parseStart () {
      if (this.char === Parser.END) {
        return null
      } else if (this.char === '[') {
        return this.call(this.parseTableOrList)
      } else if (this.char === '#') {
        return this.call(this.parseComment)
      } else if (this.char === '\n' || this.char === ' ' || this.char === '\t' || this.char === '\r') {
        return null
      } else if (isAlphaNumQuoteHyphen(this.char)) {
        return this.callNow(this.parseAssignStatement)
      } else {
        throw this.error(new Error(`Unknown character "${this.char}"`))
      }
    }

    // HELPER, this strips any whitespace and comments to the end of the line
    // then RETURNS. Last state in a production.
    parseWhitespaceToEOL () {
      if (this.char === ' ' || this.char === '\t' || this.char === '\r') {
        return null
      } else if (this.char === '#') {
        return this.goto(this.parseComment)
      } else if (this.char === Parser.END || this.char === '\n') {
        return this.return()
      } else {
        throw this.error(new Error('Unexpected character, expected only whitespace or comments till end of line'))
      }
    }

    /* ASSIGNMENT: key = value */
    parseAssignStatement () {
      return this.callNow(this.parseAssign, this.recordAssignStatement)
    }
    recordAssignStatement (kv) {
      if (kv.key in this.ctx) {
        throw this.error(new Error("Can't redefine existing key"))
      }
      // unbox our numbers
      if (isInteger(kv.value) || isFloat(kv.value)) {
        this.ctx[kv.key] = kv.value.valueOf()
      } else {
        this.ctx[kv.key] = kv.value
      }
      return this.goto(this.parseWhitespaceToEOL)
    }

    /* ASSSIGNMENT expression, key = value possibly inside an inline table */
    parseAssign () {
      return this.callNow(this.parseKeyword, this.recordAssignKeyword)
    }
    recordAssignKeyword (key) {
      this.state.result = key
      return this.goto(this.parseAssignEqual)
    }
    parseAssignEqual () {
      if (this.char === ' ' || this.char === '\t') {
        return null
      } else if (this.char === '=') {
        return this.next(this.parseAssignPreValue)
      } else {
        throw this.error(new Error('Invalid character, expected "="'))
      }
    }
    parseAssignPreValue () {
      if (this.char === ' ' || this.char === '\t') {
        return null
      } else {
        return this.callNow(this.parseValue, this.recordAssignValue)
      }
    }
    recordAssignValue (value) {
      return this.returnNow({key: this.state.result, value: value})
    }

    /* COMMENTS: #...eol */
    parseComment () {
      do {
        if (this.char === Parser.END || this.char === '\n') {
          return this.return()
        }
      } while (this.nextChar())
    }

    /* TABLES AND LISTS, [foo] and [[foo]] */
    parseTableOrList () {
      if (this.char === '[') {
        this.next(this.parseList)
      } else {
        return this.goto(this.parseTable)
      }
    }

    /* TABLE [foo.bar.baz] */
    parseTable () {
      this.ctx = this.obj
      return this.goto(this.parseTableNext)
    }
    parseTableNext () {
      if (this.char === ' ' || this.char === '\t') {
        return null
      } else {
        return this.callNow(this.parseKeyword, this.parseTableMore)
      }
    }
    parseTableMore (keyword) {
      if (this.char === ' ' || this.char === '\t') {
        return null
      } else if (this.char === ']') {
        if (keyword in this.ctx && isTable(this.ctx[keyword]) && this.ctx[keyword][_declared]) {
          throw this.error(new Error("Can't redefine existing key"))
        } else {
          this.ctx = this.ctx[keyword] = this.ctx[keyword] || Table()
          this.ctx[_declared] = true
        }
        return this.next(this.parseWhitespaceToEOL)
      } else if (this.char === '.') {
        if (!(keyword in this.ctx)) {
          this.ctx = this.ctx[keyword] = Table()
        } else if (isTable(this.ctx[keyword])) {
          this.ctx = this.ctx[keyword]
        } else if (isList(this.ctx[keyword])) {
          this.ctx = this.ctx[keyword][this.ctx[keyword].length - 1]
        } else {
          throw this.error(new Error("Can't redefine existing key"))
        }
        return this.next(this.parseTableNext)
      } else {
        throw this.error(new Error('Unexpected character, expected whitespace, . or ]'))
      }
    }

    /* LIST [[a.b.c]] */
    parseList () {
      this.ctx = this.obj
      return this.goto(this.parseListNext)
    }
    parseListNext () {
      if (this.char === ' ' || this.char === '\t') {
        return null
      } else {
        return this.callNow(this.parseKeyword, this.parseListMore)
      }
    }
    parseListMore (keyword) {
      if (this.char === ' ' || this.char === '\t') {
        return null
      } else if (this.char === ']') {
        if (!(keyword in this.ctx)) {
          this.ctx[keyword] = List()
        }
        if (isInlineList(this.ctx[keyword])) {
          throw this.error(new Error("Can't extend an inline array"))
        } else if (isList(this.ctx[keyword])) {
          const next = Table()
          this.ctx[keyword].push(next)
          this.ctx = next
        } else {
          throw this.error(new Error("Can't redefine an existing key"))
        }
        return this.next(this.parseListEnd)
      } else if (this.char === '.') {
        if (!(keyword in this.ctx)) {
          this.ctx = this.ctx[keyword] = Table()
        } else if (isInlineList(this.ctx[keyword])) {
          throw this.error(new Error("Can't extend an inline array"))
        } else if (isInlineTable(this.ctx[keyword])) {
          throw this.error(new Error("Can't extend an inline table"))
        } else if (isList(this.ctx[keyword])) {
          this.ctx = this.ctx[keyword][this.ctx[keyword].length - 1]
        } else if (isTable(this.ctx[keyword])) {
          this.ctx = this.ctx[keyword]
        } else {
          throw this.error(new Error("Can't redefine an existing key"))
        }
        return this.next(this.parseListNext)
      } else {
        throw this.error(new Error('Unexpected character, expected whitespace, . or ]'))
      }
    }
    parseListEnd (keyword) {
      if (this.char === ']') {
        return this.next(this.parseWhitespaceToEOL)
      } else {
        throw this.error(new Error('Unexpected character, expected whitespace, . or ]'))
      }
    }

    /* VALUE string, number, boolean, inline list, inline object */
    parseValue () {
      if (this.char === Parser.END) {
        throw this.error(new Error('Key without value'))
      } else if (this.char === '"') {
        return this.next(this.parseBasicString)
      } if (this.char === "'") {
        return this.next(this.parseLiteralString)
      } else if (this.char === '-' || this.char === '+') {
        return this.goto(this.parseNumberSign)
      } else if (isDigit(this.char)) {
        return this.goto(this.parseNumberOrDateTime)
      } else if (this.char === 't' || this.char === 'f') {
        return this.goto(this.parseBoolean)
      } else if (this.char === '[') {
        return this.call(this.parseInlineList, this.recordValue)
      } else if (this.char === '{') {
        return this.call(this.parseInlineTable, this.recordValue)
      } else {
        throw this.error(new Error('Unexpected character, expecting string, number, datetime, boolean, inline array or inline table'))
      }
    }
    recordValue (value) {
      return this.returnNow(value)
    }

    /* KEYS, barewords or double quoted single line strings */
    parseKeyword () {
      if (this.char === '"') {
        return this.next(this.parseBasicOnlyString)
      } else {
        return this.goto(this.parseBareKey)
      }
    }

    /* KEYS: barewords */
    parseBareKey () {
      do {
        if (this.char === Parser.END) {
          throw this.error(new Error('Key ended without value'))
        } else if (isAlphaNumHyphen(this.char)) {
          this.consume()
        } else if (this.state.buf.length === 0) {
          throw this.error(new Error('Empty bare keys are not allowed'))
        } else {
          return this.returnNow()
        }
      } while (this.nextChar())
    }

    /* STRINGS, single quoted (literal) */
    parseLiteralString () {
      do {
        if (this.char === "'") {
          // FIXME: this allows '' anywhere, should only be at start
          return this.next(this.parseLiteralMultiStringMaybe)
        } else if (this.atEndOfLine()) {
          throw this.error(new Error('Unterminated string'))
        } else {
          this.consume()
        }
      } while (this.nextChar())
    }
    parseLiteralMultiStringMaybe () {
      if (this.char === "'") {
        return this.next(this.parseLiteralMultiString)
      } else {
        return this.returnNow()
      }
    }
    parseLiteralMultiString () {
      if (this.char === '\r') {
        return null
      } else if (this.char === '\n') {
        return this.next(this.parseLiteralMultiStringContent)
      } else {
        return this.goto(this.parseLiteralMultiStringContent)
      }
    }
    parseLiteralMultiStringContent () {
      do {
        if (this.char === "'") {
          return this.next(this.parseLiteralMultiEnd)
        } else if (this.char === Parser.END) {
          throw this.error(new Error('Unterminated multi-line string'))
        } else {
          this.consume()
        }
      } while (this.nextChar())
    }
    parseLiteralMultiEnd () {
      if (this.char === "'") {
        return this.next(this.parseLiteralMultiEnd2)
      } else {
        this.state.buf += "'"
        return this.goto(this.parseLiteralMultiStringContent)
      }
    }
    parseLiteralMultiEnd2 () {
      if (this.char === "'") {
        return this.return()
      } else {
        this.state.buf += "''"
        return this.goto(this.parseLiteralMultiStringContent)
      }
    }

    /* STRINGS double quoted */
    parseBasicString () {
      do {
        if (this.char === '\\') {
          return this.call(this.parseEscape, this.recordEscapeReplacement)
        } else if (this.char === '"') {
          if (this.state.buf === '') {
            return this.next(this.parseMultiStringMaybe)
          } else {
            return this.return()
          }
        } else if (this.atEndOfLine()) {
          throw this.error(new Error('Unterminated string'))
        } else if (this.char.codePointAt(0) <= 0x1f && this.char !== '\t') {
          throw this.errorControlCharInString()
        } else {
          this.consume()
        }
      } while (this.nextChar())
    }
    // used for keys
    parseBasicOnlyString () {
      do {
        if (this.char === '\\') {
          return this.call(this.parseEscape, this.recordEscapeReplacement)
        } else if (this.char === '"') {
          return this.return()
        } else if (this.atEndOfLine()) {
          throw this.error(new Error('Unterminated string'))
        } else if (this.char.codePointAt(0) <= 0x1f && this.char !== '\t') {
          throw this.errorControlCharInString()
        } else {
          this.consume()
        }
      } while (this.nextChar())
    }
    recordEscapeReplacement (replacement) {
      this.state.buf += replacement
      return this.goto(this.parseBasicString)
    }
    parseMultiStringMaybe () {
      if (this.char === '"') {
        return this.next(this.parseMultiString)
      } else {
        return this.returnNow()
      }
    }
    parseMultiString () {
      if (this.char === '\r') {
        return null
      } else if (this.char === '\n') {
        return this.next(this.parseMultiStringContent)
      } else {
        return this.goto(this.parseMultiStringContent)
      }
    }
    parseMultiStringContent () {
      do {
        if (this.char === '\\') {
          return this.call(this.parseMultiEscape, this.recordMultiEscapeReplacement)
        } else if (this.char === '"') {
          return this.next(this.parseMultiEnd)
        } else if (this.char === Parser.END) {
          throw this.error(new Error('Unterminated multi-line string'))
        } else if (this.char.codePointAt(0) <= 0x1f && this.char !== '\t' && this.char !== '\n' && this.char !== '\r') {
          throw this.errorControlCharInString()
        } else {
          this.consume()
        }
      } while (this.nextChar())
    }
    errorControlCharInString () {
      const codePoint = this.char.codePointAt(0)
      let displayCode = '\\u00'
      if (codePoint < 16) {
        displayCode += '0'
      }
      displayCode += codePoint.toString(16)

      return this.error(new Error(`Control characters (codes < 0x1f) are not allowed in strings, pass it in with ${displayCode}`))
    }
    recordMultiEscapeReplacement (replacement) {
      this.state.buf += replacement
      return this.goto(this.parseMultiStringContent)
    }
    parseMultiEnd () {
      if (this.char === '"') {
        return this.next(this.parseMultiEnd2)
      } else {
        this.state.buf += '"'
        return this.goto(this.parseMultiStringContent)
      }
    }
    parseMultiEnd2 () {
      if (this.char === '"') {
        return this.return()
      } else {
        this.state.buf += '""'
        return this.goto(this.parseMultiStringContent)
      }
    }
    parseMultiEscape () {
      if (this.char === '\r' || this.char === '\n') {
        return this.next(this.parseMultiTrim)
      } else {
        return this.goto(this.parseEscape)
      }
    }
    parseMultiTrim () {
      // explicitly whitespace here, END should follow the same path as chars
      if (this.char === '\n' || this.char === ' ' || this.char === '\t' || this.char === '\r') {
        return null
      } else {
        return this.returnNow()
      }
    }
    parseEscape () {
      if (this.char in escapes) {
        return this.return(escapes[this.char])
      } else if (this.char === 'u') {
        return this.call(this.parseSmallUnicode, this.parseUnicodeReturn)
      } else if (this.char === 'U') {
        return this.call(this.parseLargeUnicode, this.parseUnicodeReturn)
      } else {
        throw this.error(new Error('Unknown escape character: ' + this.char))
      }
    }
    parseUnicodeReturn (char) {
      try {
        const codePoint = parseInt(char, 16)
        if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
          throw this.error(new Error('Invalid unicode, character in range 0xD800 - 0xDFFF is reserved'))
        }
        return this.returnNow(String.fromCodePoint(codePoint))
      } catch (ex) {
        throw this.error(ex)
      }
    }
    parseSmallUnicode () {
      if (!isHexit(this.char)) {
        throw this.error(new Error('Invalid character in unicode sequence, expected hex'))
      } else {
        this.consume()
        if (this.state.buf.length >= 4) return this.return()
      }
    }
    parseLargeUnicode () {
      if (!isHexit(this.char)) {
        throw this.error(new Error('Invalid character in unicode sequence, expected hex'))
      } else {
        this.consume()
        if (this.state.buf.length >= 8) return this.return()
      }
    }

    /* NUMBERS */
    parseNumberSign () {
      this.consume()
      return this.next(this.parseNumberIntegerNoUnder)
    }
    parseNumberIntegerNoUnder () {
      if (this.char === '_') {
        throw this.error(new Error('Unexpected character, expected digit, period (.), exponent marker(e) or whitespace'))
      } else if (this.atEndOfWord() || (this.char === 'E' || this.char === 'e' || this.char === '.')) {
        throw this.error(new Error('Underscores can only appear between digits'))
      }
      return this.goto(this.parseNumberInteger)
    }
    parseNumberInteger () {
      if (isDigit(this.char)) {
        this.consume()
      } else if (this.char === '_') {
        return this.next(this.parseNumberIntegerNoUnder)
      } else if (this.char === 'E' || this.char === 'e') {
        this.consume()
        return this.next(this.parseNumberExponentSign)
      } else if (this.char === '.') {
        this.consume()
        return this.next(this.parseNumberFloatNoUnder)
      } else {
        const result = Integer(this.state.buf)
        /* istanbul ignore if */
        if (isNaN(result)) {
          throw this.error(new Error('Invalid number'))
        } else {
          return this.returnNow(result)
        }
      }
    }
    parseNumberFloatNoUnder () {
      if (this.char === '_') {
        throw this.error(new Error('Unexpected character, expected digit, exponent marker(e) or whitespace'))
      } else if (this.atEndOfWord() || this.char === 'E' || this.char === 'e') {
        throw this.error(new Error('Incomplete number'))
      }
      return this.goto(this.parseNumberFloat)
    }
    parseNumberFloat () {
      if (this.char === '_') {
        return this.next(this.parseNumberFloatNoUnder)
      } else if (isDigit(this.char)) {
        this.consume()
      } else if (this.char === 'E' || this.char === 'e') {
        this.consume()
        return this.next(this.parseNumberExponentSign)
      } else {
        return this.returnNow(Float(this.state.buf))
      }
    }
    parseNumberExponentSign () {
      if (isDigit(this.char)) {
        return this.goto(this.parseNumberExponent)
      } else if (this.char === '-' || this.char === '+') {
        this.consume()
        this.next(this.parseNumberExponentNoUnder)
      } else {
        throw this.error(new Error('Unexpected character, expected -, + or digit'))
      }
    }
    parseNumberExponentNoUnder () {
      if (this.char === '_') {
        throw this.error(new Error('Unexpected character, expected digit or whitespace'))
      } else if (this.atEndOfWord()) {
        throw this.error(new Error('Incomplete number'))
      }
      return this.goto(this.parseNumberExponent)
    }
    parseNumberExponent () {
      if (isDigit(this.char)) {
        this.consume()
      } else if (this.char === '_') {
        return this.next(this.parseNumberExponentNoUnder)
      } else {
        return this.returnNow(Float(this.state.buf))
      }
    }

    /* NUMBERS or DATETIMES  */
    parseNumberOrDateTime () {
      if (this.char === '_') {
        this.next(this.parseNumberIntegerNoUnder)
      } else if (isDigit(this.char)) {
        this.consume()
        if (this.state.buf.length > 4) this.next(this.parseNumberInteger)
      } else if (this.char === 'E' || this.char === 'e') {
        this.consume()
        return this.next(this.parseNumberExponentSign)
      } else if (this.char === '.') {
        this.consume()
        return this.next(this.parseNumberFloatNoUnder)
      } else if (this.char === '-') {
        return this.goto(this.parseDateTime)
      } else {
        return this.returnNow(Integer(this.state.buf))
      }
    }

    /* DATETIME */
    parseDateTime () {
      // we enter here having just consumed the year and about to consume the hyphen
      if (this.state.buf.length < 4) {
        throw this.error(new Error('Years less than 1000 must be zero padded to four characters'))
      }
      this.state.result = this.state.buf
      this.state.buf = ''
      return this.next(this.parseDateMonth)
    }
    parseDateMonth () {
      if (this.char === '-') {
        if (this.state.buf.length < 2) {
          throw this.error(new Error('Months less than 10 must be zero padded to two characters'))
        }
        this.state.result += '-' + this.state.buf
        this.state.buf = ''
        return this.next(this.parseDateDay)
      } else if (isDigit(this.char)) {
        this.consume()
      } else {
        throw this.error(new Error('Incomplete datetime'))
      }
    }
    parseDateDay () {
      if (this.char === 'T') {
        if (this.state.buf.length < 2) {
          throw this.error(new Error('Days less than 10 must be zero padded to two characters'))
        }
        this.state.result += '-' + this.state.buf
        this.state.buf = ''
        return this.next(this.parseTimeHour)
      } else if (isDigit(this.char)) {
        this.consume()
      } else {
        throw this.error(new Error('Incomplete datetime'))
      }
    }
    parseTimeHour () {
      if (this.char === ':') {
        if (this.state.buf.length < 2) {
          throw this.error(new Error('Hours less than 10 must be zero padded to two characters'))
        }
        this.state.result += 'T' + this.state.buf
        this.state.buf = ''
        return this.next(this.parseTimeMin)
      } else if (isDigit(this.char)) {
        this.consume()
      } else {
        throw this.error(new Error('Incomplete datetime'))
      }
    }
    parseTimeMin () {
      if (this.state.buf.length < 2 && isDigit(this.char)) {
        this.consume()
      } else if (this.state.buf.length === 2 && this.char === ':') {
        this.state.result += ':' + this.state.buf
        this.state.buf = ''
        return this.next(this.parseTimeSec)
      } else {
        throw this.error(new Error('Incomplete datetime'))
      }
    }
    parseTimeSec () {
      if (isDigit(this.char)) {
        this.consume()
        if (this.state.buf.length === 2) {
          this.state.result += ':' + this.state.buf
          this.state.buf = ''
          return this.next(this.parseTimeZoneOrFraction)
        }
      } else {
        throw this.error(new Error('Incomplete datetime'))
      }
    }

    parseTimeZoneOrFraction () {
      if (this.char === '.') {
        this.consume()
        this.next(this.parseDateTimeFraction)
      } else if (this.char === '-' || this.char === '+') {
        this.consume()
        this.next(this.parseTimeZoneHour)
      } else if (this.char === 'Z') {
        this.consume()
        return this.return(createDateTime(this.state.result + this.state.buf))
      } else {
        throw this.error(new Error('Unexpected character in datetime, expected period (.), minus (-), plus (+) or Z'))
      }
    }
    parseDateTimeFraction () {
      if (isDigit(this.char)) {
        this.consume()
      } else if (this.state.buf.length === 1) {
        throw this.error(new Error('Expected digit in milliseconds'))
      } else if (this.char === '-' || this.char === '+') {
        this.consume()
        this.next(this.parseTimeZoneHour)
      } else if (this.char === 'Z') {
        this.consume()
        return this.return(createDateTime(this.state.result + this.state.buf))
      } else {
        throw this.error(new Error('Unexpected character in datetime, expected period (.), minus (-), plus (+) or Z'))
      }
    }
    parseTimeZoneHour () {
      if (isDigit(this.char)) {
        this.consume()
        // FIXME: No more regexps
        if (/\d\d$/.test(this.state.buf)) return this.next(this.parseTimeZoneSep)
      } else {
        throw this.error(new Error('Unexpected character in datetime, expected digit'))
      }
    }
    parseTimeZoneSep () {
      if (this.char === ':') {
        this.consume()
        this.next(this.parseTimeZoneMin)
      } else {
        throw this.error(new Error('Unexpected character in datetime, expected colon'))
      }
    }
    parseTimeZoneMin () {
      if (isDigit(this.char)) {
        this.consume()
        if (/\d\d$/.test(this.state.buf)) return this.return(createDateTime(this.state.result + this.state.buf))
      } else {
        throw this.error(new Error('Unexpected character in datetime, expected digit'))
      }
    }

    /* BOOLEAN */
    parseBoolean () {
      /* istanbul ignore else */
      if (this.char === 't') {
        return this.goto(this.parseTrue)
      } else if (this.char === 'f') {
        return this.goto(this.parseFalse)
      }
    }
    parseTrue () {
      if (this.atEndOfWord()) {
        throw this.error(new Error('Incomplete boolean'))
      } else if ('true'.indexOf(this.state.buf + this.char) !== 0) {
        throw this.error(new Error('Invalid boolean, expected true or false'))
      } else if (this.state.buf.length === 3) {
        return this.return(true)
      } else {
        this.consume()
      }
    }
    parseFalse () {
      if (this.atEndOfWord()) {
        throw this.error(new Error('Incomplete boolean'))
      } else if ('false'.indexOf(this.state.buf + this.char) !== 0) {
        throw this.error(new Error('Invalid boolean, expected true or false'))
      } else if (this.state.buf.length === 4) {
        return this.return(false)
      } else {
        this.consume()
      }
    }

    /* INLINE LISTS */
    parseInlineList () {
      if (this.char === ' ' || this.char === '\t' || this.char === '\r' || this.char === '\n') {
        return null
      } else if (this.char === Parser.END) {
        throw this.error(new Error('Unterminated inline array'))
      } else if (this.char === '#') {
        return this.call(this.parseComment)
      } else if (this.char === ']') {
        return this.return(this.state.resultArr || InlineList())
      } else {
        return this.callNow(this.parseValue, this.recordInlineListValue)
      }
    }
    recordInlineListValue (value) {
      if (this.state.resultArr) {
        const listType = this.state.resultArr[_contentType]
        const valueType = tomlType(value)
        if (listType !== valueType) {
          throw this.error(new Error(`Inline lists must be a single type, not a mix of ${listType} and ${valueType}`))
        }
      } else {
        this.state.resultArr = InlineList(tomlType(value))
      }
      if (isFloat(value) || isInteger(value)) {
        // unbox now that we've verified they're ok
        this.state.resultArr.push(value.valueOf())
      } else {
        this.state.resultArr.push(value)
      }
      return this.goto(this.parseInlineListNext)
    }
    parseInlineListNext () {
      if (this.char === ' ' || this.char === '\t' || this.char === '\r' || this.char === '\n') {
        return null
      } else if (this.char === '#') {
        return this.call(this.parseComment)
      } else if (this.char === ',') {
        return this.next(this.parseInlineList)
      } else if (this.char === ']') {
        return this.goto(this.parseInlineList)
      } else {
        throw this.error(new Error('Invalid character, expected whitespace, comma (,) or close bracket (])'))
      }
    }

    /* INLINE TABLE */
    parseInlineTable () {
      if (this.char === ' ' || this.char === '\t') {
        return null
      } else if (this.char === Parser.END || this.char === '#' || this.char === '\n' || this.char === '\r') {
        throw this.error(new Error('Unterminated inline array'))
      } else if (this.char === '}') {
        return this.return(this.state.resultTable || InlineTable())
      } else {
        if (!this.state.resultTable) this.state.resultTable = InlineTable()
        return this.callNow(this.parseAssign, this.recordInlineTableValue)
      }
    }
    recordInlineTableValue (kv) {
      if (isInteger(kv.value) || isFloat(kv.value)) {
        this.state.resultTable[kv.key] = kv.value.valueOf()
      } else {
        this.state.resultTable[kv.key] = kv.value
      }
      return this.goto(this.parseInlineTableNext)
    }
    parseInlineTableNext () {
      if (this.char === ' ' || this.char === '\t') {
        return null
      } else if (this.char === Parser.END || this.char === '#' || this.char === '\n' || this.char === '\r') {
        throw this.error(new Error('Unterminated inline array'))
      } else if (this.char === ',') {
        return this.next(this.parseInlineTable)
      } else if (this.char === '}') {
        return this.goto(this.parseInlineTable)
      } else {
        throw this.error(new Error('Invalid character, expected whitespace, comma (,) or close bracket (])'))
      }
    }
  }
  return TOMLParser
}
