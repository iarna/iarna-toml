'use strict'
module.exports = makeParserClass(require('./parser.js'))
module.exports.makeParserClass = makeParserClass

const escapes = {
  'b': '\x08',
  't': '\x09',
  'n': '\x0a',
  'f': '\x0c',
  'r': '\x0d',
  '"': '\x22',
  '\\': '\x5c'
}

const _type = Symbol('type')

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
    [_type]: {value: TABLE}
  })
}
function isTable (obj) {
  if (obj === null || typeof (obj) !== 'object') return false
  return obj[_type] === TABLE
}

const INLINE_LIST = Symbol('inline-list')
function InlineList (type) {
  return Object.defineProperties([], {
    [_type]: {value: INLINE_LIST},
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

function makeParserClass (Parser) {
  class TOMLParser extends Parser {
    constructor () {
      super()
      this.ctx = this.obj = Table()
    }

    // Create dates, override to use a different date class, value is an RFC5013 date
    createDate (value) {
      return new Date(value)
    }

    /* MATCH HELPER */
    atEndOfExpression () {
      return this.char === ',' || this.atEndOfWord()
    }
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
      } else if (/['"A-Za-z0-9_-]/.test(this.char)) {
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
      this.ctx[kv.key] = kv.value
      return this.goto(this.parseWhitespaceToEOL)
    }

    /* ASSSIGNMENT expression, key = value possibly inside an inline table */
    parseAssign () {
      return this.callNow(this.parseKeyword, this.recordAssignKeyword)
    }
    recordAssignKeyword (key) {
      this.state.key = key
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
      return this.returnNow({key: this.state.key, value: value})
    }

    /* COMMENTS: #...eol */
    parseComment () {
      if (this.char === Parser.END || this.char === '\n') {
        return this.return()
      } else {
        return null
      }
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
      if (/^[ \t]$/.test(this.char)) {
        return null
      } else {
        return this.callNow(this.parseKeyword, this.parseTableMore)
      }
    }
    parseTableMore (keyword) {
      if (/^[ \t]$/.test(this.char)) {
        return null
      } else if (this.char === ']') {
        if (keyword in this.ctx) {
          throw this.error(new Error("Can't redefine existing key"))
        } else {
          this.ctx = this.ctx[keyword] = Table()
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
      if (/^[ \t]$/.test(this.char)) {
        return null
      } else {
        return this.callNow(this.parseKeyword, this.parseListMore)
      }
    }
    parseListMore (keyword) {
      if (/^[ \t]$/.test(this.char)) {
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
        return this.next(this.parseDoubleString)
      } if (this.char === "'") {
        return this.next(this.parseSingleString)
      } else if (/^[-+]$/.test(this.char)) {
        return this.goto(this.parseNumberSign)
      } else if (/^[0-9]$/.test(this.char)) {
        return this.goto(this.parseNumberOrDateTime)
      } else if (/^[tf]$/.test(this.char)) {
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

    /* KEYS, barewords or single or double quoted single line strings */
    parseKeyword () {
      // FIXME: These should skip the multi-string detection
      if (this.char === "'") {
        return this.next(this.parseSingleString)
      } else if (this.char === '"') {
        return this.next(this.parseDoubleString)
      } else {
        return this.goto(this.parseBareKey)
      }
    }

    /* KEYS: barewords */
    parseBareKey () {
      if (this.char === Parser.END) {
        throw this.error(new Error('Key ended without value'))
      } else if (/^[A-Za-z0-9_-]$/.test(this.char)) {
        return this.consume()
      } else {
        return this.returnNow()
      }
    }

    /* STRINGS, single quoted (literal) */
    parseSingleString () {
      if (this.char === "'") {
        // FIXME: this allows '' anywhere, should only be at start
        return this.next(this.parseSingleMultiStringMaybe)
      } else if (this.atEndOfLine()) {
        throw this.error(new Error('Unterminated string'))
      } else {
        return this.consume()
      }
    }
    parseSingleMultiStringMaybe () {
      if (this.char === "'") {
        return this.next(this.parseSingleMultiString)
      } else {
        return this.returnNow()
      }
    }
    parseSingleMultiString () {
      if (this.char === '\n') {
        return this.next(this.parseSingleMultiStringContent)
      } else {
        return this.goto(this.parseSingleMultiStringContent)
      }
    }
    parseSingleMultiStringContent () {
      if (this.char === "'") {
        return this.next(this.parseSingleMultiEnd)
      } else if (this.char === Parser.END) {
        throw this.error(new Error('Unterminated multi-line string'))
      } else {
        this.consume()
      }
    }
    parseSingleMultiEnd () {
      if (this.char === "'") {
        return this.next(this.parseSingleMultiEnd2)
      } else {
        this.state.buf += "'"
        return this.goto(this.parseSingleMultiStringContent)
      }
    }
    parseSingleMultiEnd2 () {
      if (this.char === "'") {
        return this.return()
      } else {
        this.state.buf += "''"
        return this.goto(this.parseSingleMultiStringContent)
      }
    }

    /* STRINGS double quoted */
    parseDoubleString () {
      if (this.char === '\\') {
        return this.call(this.parseEscape, this.recordEscapeReplacement)
      } else if (this.char === '"') {
        if (this.state.buf === '') {
          return this.next(this.parseDoubleMultiStringMaybe)
        } else {
          return this.return()
        }
      } else if (this.atEndOfLine()) {
        throw this.error(new Error('Unterminated string'))
      } else {
        return this.consume()
      }
    }
    recordEscapeReplacement (replacement) {
      this.state.buf += replacement
      return this.goto(this.parseDoubleString)
    }
    parseDoubleMultiStringMaybe () {
      if (this.char === '"') {
        return this.next(this.parseDoubleMultiString)
      } else {
        return this.returnNow()
      }
    }
    parseDoubleMultiString () {
      if (this.char === '\n') {
        return this.next(this.parseDoubleMultiStringContent)
      } else {
        return this.goto(this.parseDoubleMultiStringContent)
      }
    }
    parseDoubleMultiStringContent () {
      if (this.char === '\\') {
        return this.call(this.parseMultiEscape, this.recordMultiEscapeReplacement)
      } else if (this.char === '"') {
        return this.next(this.parseDoubleMultiEnd)
      } else if (this.char === Parser.END) {
        throw this.error(new Error('Unterminated multi-line string'))
      } else {
        this.consume()
      }
    }
    recordMultiEscapeReplacement (replacement) {
      this.state.buf += replacement
      return this.goto(this.parseDoubleMultiStringContent)
    }
    parseDoubleMultiEnd () {
      if (this.char === '"') {
        return this.next(this.parseDoubleMultiEnd2)
      } else {
        this.state.buf += '"'
        return this.goto(this.parseDoubleMultiStringContent)
      }
    }
    parseDoubleMultiEnd2 () {
      if (this.char === '"') {
        return this.return()
      } else {
        this.state.buf += '""'
        return this.goto(this.parseDoubleMultiStringContent)
      }
    }
    parseMultiEscape () {
      if (this.char === '\n') {
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
        return this.call(this.parseSmallUnicode, this.parseEscapeReturn)
      } else if (this.char === 'U') {
        return this.call(this.parseLargeUnicode, this.parseEscapeReturn)
      } else {
        throw this.error(new Error('Unknown escape character: ' + this.char))
      }
    }
    parseEscapeReturn (char) {
      try {
        return this.returnNow(String.fromCodePoint(parseInt(char, 16)))
      } catch (ex) {
        throw this.error(ex)
      }
    }
    parseSmallUnicode () {
      if (!/^[0-9a-fA-F]$/.test(this.char)) {
        throw this.error(new Error('Invalid character in unicode sequence, expected hex'))
      } else {
        this.consume()
        if (this.state.buf.length >= 4) return this.return()
      }
    }
    parseLargeUnicode () {
      if (!/^[0-9a-fA-F]$/.test(this.char)) {
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
      } else if (this.atEndOfExpression() || /^[Ee.]$/.test(this.char)) {
        throw this.error(new Error('Underscores can only appear between digits'))
      }
      return this.goto(this.parseNumberInteger)
    }
    parseNumberInteger () {
      if (this.atEndOfExpression()) {
        const result = Number(this.state.buf)
        /* istanbul ignore if */
        if (isNaN(result)) {
          throw this.error(new Error('Invalid number'))
        } else {
          return this.returnNow(result)
        }
      } else if (/^\d$/.test(this.char)) {
        this.consume()
      } else if (this.char === '_') {
        return this.next(this.parseNumberIntegerNoUnder)
      } else if (/^[Ee]$/.test(this.char)) {
        this.consume()
        return this.next(this.parseNumberExponentSign)
      } else if (this.char === '.') {
        this.consume()
        return this.next(this.parseNumberFloatNoUnder)
      } else {
        throw this.error(new Error('Unexpected character, expected digit, period (.), exponent marker (e) or whitespace'))
      }
    }
    parseNumberFloatNoUnder () {
      if (this.char === '_') {
        throw this.error(new Error('Unexpected character, expected digit, exponent marker(e) or whitespace'))
      } else if (this.atEndOfExpression() || /^[Ee]$/.test(this.char)) {
        throw this.error(new Error('Incomplete number'))
      }
      return this.goto(this.parseNumberFloat)
    }
    parseNumberFloat () {
      if (this.atEndOfExpression()) {
        return this.returnNow(Number(this.state.buf))
      } else if (this.char === '_') {
        return this.next(this.parseNumberFloatNoUnder)
      } else if (/^\d$/.test(this.char)) {
        this.consume()
      } else if (/^[Ee]$/.test(this.char)) {
        this.consume()
        return this.next(this.parseNumberExponentSign)
      } else {
        throw this.error(new Error('Unexpected character, expected digit, period (.), exponent marker (e) or whitespace'))
      }
    }
    parseNumberExponentSign () {
      if (this.atEndOfExpression()) {
        throw this.error(new Error('Incomplete exponent'))
      } else if (/^\d$/.test(this.char)) {
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
      } else if (this.atEndOfExpression()) {
        throw this.error(new Error('Incomplete number'))
      }
      return this.goto(this.parseNumberExponent)
    }
    parseNumberExponent () {
      if (this.atEndOfExpression()) {
        return this.returnNow(Number(this.state.buf))
      } else if (/^\d$/.test(this.char)) {
        this.consume()
      } else if (this.char === '_') {
        return this.next(this.parseNumberExponentNoUnder)
      } else {
        throw this.error(new Error('Unexpected character, digit'))
      }
    }

    /* NUMBERS or DATETIMES  */
    parseNumberOrDateTime () {
      if (this.atEndOfExpression()) {
        return this.returnNow(Number(this.state.buf))
      } else if (this.char === '_') {
        this.next(this.parseNumberIntegerNoUnder)
      } else if (/^\d$/.test(this.char)) {
        this.consume()
        if (this.state.buf.length > 4) this.next(this.parseNumberInteger)
      } else if (/^[Ee]$/.test(this.char)) {
        this.consume()
        return this.next(this.parseNumberExponentSign)
      } else if (this.char === '.') {
        this.consume()
        return this.next(this.parseNumberFloatNoUnder)
      } else if (this.char === '-') {
        this.consume()
        return this.next(this.parseDateTime)
      } else {
        return this.returnNow(Number(this.state.buf))
      }
    }

    /* DATETIME */
    parseDateTime () {
      if (this.atEndOfExpression()) {
        throw this.error(new Error('Incomplete datetime'))
      } else if (!/^[-\dT:]/.test(this.char)) {
        throw this.error(new Error('Unexpected character in datetime'))
      } else {
        const matchBuf = (this.state.buf + this.char).replace(/\d/g, 'd')
        const matchPattern = 'dddd-dd-ddTdd:dd:dd'
        if (matchPattern.indexOf(matchBuf) === 0) {
          this.consume()
          if (this.state.buf.length === 19) {
            return this.next(this.parseTimeZoneOrFraction)
          }
        } else {
          throw this.error(new Error('Unexpected character in datetime'))
        }
      }
    }
    parseTimeZoneOrFraction () {
      if (this.atEndOfExpression()) {
        throw this.error(new Error('Incomplete datetime'))
      } else if (this.char === '.') {
        this.consume()
        this.next(this.parseDateTimeFraction)
      } else if (this.char === '-' || this.char === '+') {
        this.consume()
        this.next(this.parseTimeZoneHour)
      } else if (this.char === 'Z') {
        this.consume()
        return this.return(this.createDate(this.state.buf))
      } else {
        throw this.error(new Error('Unexpected character in datetime, expected period (.), minus (-), plus (+) or Z'))
      }
    }
    parseDateTimeFraction () {
      if (this.atEndOfExpression()) {
        throw this.error(new Error('Incomplete datetime'))
      } else if (/^\d$/.test(this.char)) {
        this.consume()
      } else if (/^[-+Z]$/.test(this.char) && this.state.buf.length === 20) {
        throw this.error(new Error('Incomplete datetime'))
      } else if (this.char === '-' || this.char === '+') {
        this.consume()
        this.next(this.parseTimeZoneHour)
      } else if (this.char === 'Z') {
        this.consume()
        return this.return(this.createDate(this.state.buf))
      } else {
        throw this.error(new Error('Unexpected character in datetime, expected period (.), minus (-), plus (+) or Z'))
      }
    }
    parseTimeZoneHour () {
      if (this.atEndOfExpression()) {
        throw this.error(new Error('Incomplete datetime'))
      } else if (/^\d$/.test(this.char)) {
        this.consume()
        if (/\d\d$/.test(this.state.buf)) return this.next(this.parseTimeZoneSep)
      } else {
        throw this.error(new Error('Unexpected character in datetime, expected digit'))
      }
    }
    parseTimeZoneSep () {
      if (this.atEndOfExpression()) {
        throw this.error(new Error('Incomplete datetime'))
      } else if (this.char === ':') {
        this.consume()
        this.next(this.parseTimeZoneMin)
      } else {
        throw this.error(new Error('Unexpected character in datetime, expected colon'))
      }
    }
    parseTimeZoneMin () {
      if (this.atEndOfExpression()) {
        throw this.error(new Error('Incomplete datetime'))
      } else if (/^\d$/.test(this.char)) {
        this.consume()
        if (/\d\d$/.test(this.state.buf)) return this.return(this.createDate(this.state.buf))
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
      if (this.atEndOfExpression()) {
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
      if (this.atEndOfExpression()) {
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
        return this.return(this.state.values || InlineList())
      } else {
        if (!this.state.values) this.state.values = InlineList()
        return this.callNow(this.parseValue, this.recordInlineListValue)
      }
    }
    recordInlineListValue (value) {
      this.state.values.push(value)
      return this.goto(this.parseInlineListNext)
    }
    parseInlineListNext () {
      if (this.char === ' ' || this.char === '\t' || this.char === '\r' || this.char === '\n') {
        return null
      } else if (this.char === '#') {
        return this.call(this.parseComment)
      } else if (this.char === Parser.END) {
        throw this.error(new Error('Unterminated inline array'))
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
        return this.return(this.state.values || InlineTable())
      } else {
        if (!this.state.values) this.state.values = InlineTable()
        return this.callNow(this.parseAssign, this.recordInlineTableValue)
      }
    }
    recordInlineTableValue (kv) {
      this.state.values[kv.key] = kv.value
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
