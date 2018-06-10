# @iarna/toml

Better TOML parsing and stringifying all in that familiar JSON interface.

[![Coverage Status](https://coveralls.io/repos/github/iarna/iarna-toml/badge.svg?branch=master)](https://coveralls.io/github/iarna/iarna-toml?branch=master)

### TOML Spec Support

The most recent version as of 2018-06-14: [v0.4.0](https://github.com/mojombo/toml/blob/master/versions/en/toml-v0.4.0.md)

### Example

```
var TOML = require('@iarna/toml')
var obj = TOML.parse(`[abc]
foo = 123
bar = [1,2,3]`)
/* obj =
   {abc: {foo: 123, bar: [1,2,3]}}
*/
var str = TOML.stringify(obj)
/* str =
   [abc]
   foo = 123
   bar = [ 1, 2, 3 ]
*/
```

## Why @iarna/toml

* 100% test coverage.
* Faster parser. (The `toml` is quite slow on larger texts. `toml-j0.4` is prone to stack overflow issues.)
* More correct parser. (Behavior carefully drawn from the spec and tested to within an inch of its life.)
* Smallest parser bundle (if you use `@iarna/toml/parse-string`), 20kb.
* No deps.
* Detailed and easy to read error messages‼

```
> TOML.parse(src)
Error: Unexpected character, expecting string, number, datetime, boolean, inline array or inline table at row 6, col 5, pos 87:
5: "abc\"" = { abc=123,def="abc" }
6> foo=sdkfj
       ^
7:
```

## TOML.parse(str) → Object

Also available with: `require('@iarna/toml/parse-string')`

Syncronously parse a TOML string and return an object.

## TOML.stringify(obj) → String

Also available with: `require('@iarna/toml/stringify)`

Serialize an object as TOML.

## readable.pipe(TOML.parse.stream()) → Transform

Also available with: `require('@iarna/toml/parse-stream')`

Returns a transform stream in object mode.  When it completes, emit the
resulting object. Only one object will ever be emitted.

## [your-object].toJSON

If an object `TOML.stringify` is serializing has a `toJSON` method then it
will call it to transform the object before serializing it.  This matches
the beahvior of `JSON.stringify`.

The one exception to this is that `toJSON` is not called for `Date` objects
because `JSON` represents dates as strings and TOML can represent them natively.

[`moment`](https://www.npmjs.com/package/moment) objects are treated the
same as native `Date` objects, in this respect.

## Promises and Streaming

The parser provides alternative async and streaming interfaces, for times
that you're working with really absurdly big TOML files and don't want to
tie-up the event loop while it parses.

### TOML.parse.async(str[, opts]) → Promise(Object)

Also available with: `require('@iarna/toml/parse-async')`

`opts.blocksize` is the amount text to parser per pass through the event loop. Defaults to 40kb.

Asynchronously parse a TOML string and return a promise of the resulting object.

### TOML.parse.stream(readable) → Promise(Object)

Also available with: `require('@iarna/toml/parse-stream')`

Given a readable stream, parse it as it feeds us data. Return a promise of the resulting object.

## Lowlevel Interface

You construct a parser object, per TOML file you want to process:

```
const TOMLParser = require('@iarna/toml/lib/toml-parser.js')
const parser = new TOMLParser()
```

Then you call the `parse` method for each chunk as you read them, or in a
single call:

```
parser.parse(`hello = 'world'`)
```

And finally, you call the `finish` method to complete parsing and retrieve
the resulting object.

```
const data = parser.finish()
```

Both the `parse` method and `finish` method will throw if they find a
problem with the string they were given.  Error objects thrown from the
parser have `pos`, `line` and `col` attributes.  `TOML.parse` adds a visual
summary of where in the source string there were issues using
`parse-pretty-error` and you can too:

```
const prettyError = require('./parse-pretty-error.js')
const newErr = prettyError(err, sourceString)
```

## What's Missing

* In stringify:
  * Any way to produce comments. As a JSON stand-in I'm not too worried about this.
  * Stringification could use some work on its error reporting.  It reports
    _what's_ wrong, but not where in your datastructure it was.

## Tests

Amongst other things, all of the official example files from the TOML spec
are run through this parser, `toml` and `toml-j0.4` to verify that all the
parsers produce the same output.

The tests for the stringifier are made up of three parts:

First, we verify that we can round-trip all of the examples provided in the toml spec repository. They were fetched as of
[183273af30102704a103f206f974636967c4da6d](https://github.com/toml-lang/toml/tree/183273af30102704a103f206f974636967c4da6d)
and specifically are:

* https://github.com/toml-lang/toml/tree/183273af30102704a103f206f974636967c4da6d/examples
* https://github.com/toml-lang/toml/tree/183273af30102704a103f206f974636967c4da6d/tests

Second, many tests are borrowed from
[@othiym23](https://github.com/othiym23)'s
[toml-stream](https://npmjs.com/package/toml-stream) module. They were fetched as of
[b6f1e26b572d49742d49fa6a6d11524d003441fa](https://github.com/othiym23/toml-stream/tree/b6f1e26b572d49742d49fa6a6d11524d003441fa/test).

And finally `test/stringifer` contains a number of more esoteric side cases and error conditions.
