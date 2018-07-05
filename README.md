# @iarna/toml

Better TOML parsing and stringifying all in that familiar JSON interface.

[![Coverage Status](https://coveralls.io/repos/github/iarna/iarna-toml/badge.svg)](https://coveralls.io/github/iarna/iarna-toml)

### TOML Spec Support

The most recent version as of 2018-06-14: [v0.4.0](https://github.com/mojombo/toml/blob/master/versions/en/toml-v0.4.0.md)

### Example

```js
const TOML = require('@iarna/toml')
const obj = TOML.parse(`[abc]
foo = 123
bar = [1,2,3]`)
/* obj =
{abc: {foo: 123, bar: [1,2,3]}}
*/
const str = TOML.stringify(obj)
/* str =
[abc]
foo = 123
bar = [ 1, 2, 3 ]
*/
```

Visit the project github [for more examples](https://github.com/iarna/iarna-toml/tree/latest/examples)!

## Why @iarna/toml

* 100% test coverage.
* Faster parser:

  ![Benchmark results showing @iarna/toml as 55x faster than toml and 5.1x faster than toml-j0.4](https://shared.by.re-becca.org/misc/speeeed.png)
* More correct parser. (Behavior carefully drawn from the spec and tested to within an inch of its life.)
* Smallest parser bundle (if you use `@iarna/toml/parse-string`), 20kb.
* No deps.
* Detailed and easy to read error messages‼

```console
> TOML.parse(src)
Error: Unexpected character, expecting string, number, datetime, boolean, inline array or inline table at row 6, col 5, pos 87:
5: "abc\"" = { abc=123,def="abc" }
6> foo=sdkfj
       ^
7:
```

## TOML.parse(str) → Object [(example)](https://github.com/iarna/iarna-toml/blob/latest/examples/parse.js)

Also available with: `require('@iarna/toml/parse-string')`

Synchronously parse a TOML string and return an object.


## TOML.stringify(obj) → String [(example)](https://github.com/iarna/iarna-toml/blob/latest/examples/stringify.js)

Also available with: `require('@iarna/toml/stringify)`

Serialize an object as TOML.

## [your-object].toJSON

If an object `TOML.stringify` is serializing has a `toJSON` method then it
will call it to transform the object before serializing it.  This matches
the behavior of `JSON.stringify`.

The one exception to this is that `toJSON` is not called for `Date` objects
because `JSON` represents dates as strings and TOML can represent them natively.

[`moment`](https://www.npmjs.com/package/moment) objects are treated the
same as native `Date` objects, in this respect.

## TOML.stringify.value(obj) -> String

Also available with: `require('@iarna/toml/stringify').value`

Serialize a value as TOML would.  This is a fragment and not a complete
valid TOML document.

## Promises and Streaming

The parser provides alternative async and streaming interfaces, for times
that you're working with really absurdly big TOML files and don't want to
tie-up the event loop while it parses.

### TOML.parse.async(str[, opts]) → Promise(Object) [(example)](https://github.com/iarna/iarna-toml/blob/latest/examples/parse-async.js)

Also available with: `require('@iarna/toml/parse-async')`

`opts.blocksize` is the amount text to parser per pass through the event loop. Defaults to 40kb.

Asynchronously parse a TOML string and return a promise of the resulting object.

### TOML.parse.stream(readable) → Promise(Object) [(example)](https://github.com/iarna/iarna-toml/blob/latest/examples/parse-stream-readable.js)

Also available with: `require('@iarna/toml/parse-stream')`

Given a readable stream, parse it as it feeds us data. Return a promise of the resulting object.

## readable.pipe(TOML.parse.stream()) → Transform [(example)](https://github.com/iarna/iarna-toml/blob/latest/examples/parse-stream-through.js)

Also available with: `require('@iarna/toml/parse-stream')`

Returns a transform stream in object mode.  When it completes, emit the
resulting object. Only one object will ever be emitted.

## Lowlevel Interface [(example)](https://github.com/iarna/iarna-toml/blob/latest/examples/parse-lowlevel.js) [(example w/ parser debugging)](https://github.com/iarna/iarna-toml/blob/latest/examples/parse-lowlevel-debug.js)

You construct a parser object, per TOML file you want to process:

```js
const TOMLParser = require('@iarna/toml/lib/toml-parser.js')
const parser = new TOMLParser()
```

Then you call the `parse` method for each chunk as you read them, or in a
single call:

```js
parser.parse(`hello = 'world'`)
```

And finally, you call the `finish` method to complete parsing and retrieve
the resulting object.

```js
const data = parser.finish()
```

Both the `parse` method and `finish` method will throw if they find a
problem with the string they were given.  Error objects thrown from the
parser have `pos`, `line` and `col` attributes.  `TOML.parse` adds a visual
summary of where in the source string there were issues using
`parse-pretty-error` and you can too:

```js
const prettyError = require('./parse-pretty-error.js')
const newErr = prettyError(err, sourceString)
```

## What's Different

For the most part, this module is stricter than the `toml` module and about
as strict as `toml-j0.4`.  Adherence to the spec is needed if your TOML is
going to be compatible between implementations. The `toml` module also has
some extensions that are not yet standardized into a TOML release, but
likely will be in the future.

Additionally:

* The `toml-j0.4` and `toml` modules both think that keys in inline tables
  may not be quoted.  I believe they are in error and I allow quotes.  The
  spec says this:

  > Key/value pairs take the same form as key/value pairs in standard tables.

  Standard tables allow quoted keys and further, the ABNF from the standard
  allows them to be quoted.

  However, be aware that if you use quoted keys in inline tables you won't
  be able to parse your file with the `toml-j0.4` or `toml` modules.

## Improvements to make

* In stringify:
  * Any way to produce comments. As a JSON stand-in I'm not too worried about this.
  * Stringification could use some work on its error reporting.  It reports
    _what's_ wrong, but not where in your data structure it was.
* Further optimize the parser:
  * There are some debugging assertions left in the main parser, these should be moved to a subclass.
  * Make the whole debugging parser thing work as a mixin instead of as a superclass.

## Benchmarks

You can run them yourself with:

```console
$ npm run benchmark
```

The results below are from my laptop using Node 10.5.0.  The library
versions tested were `@iarna/toml@1.6.0`, `toml-j0.4@1.1.1`, `toml@2.3.3`,
`@sgarciac/bombadil@0.0.7`.  The percentage after average results is the
margin of error.


|   | @iarna/​toml |   | toml-j0.4 |   | toml |   | @sgarciac/​bombadil |   |
| - | ----------- | - | --------- | - | ---- | - | -------------------| - |
| Overall | 48.50 | 3.58% | 8.79 | 3.88% | 0.83 | 1.01% | crashed | |
| Spec Example | 3616 | 2.04% | 961 | 3.66% | 151 | 2.34% | 604 | 1.80% |
| Spec Example: Hard Unicode | 22433 | 1.91% | 4178 | 1.98% | 736 | 3.30% | 893 | 1.24% |
| 1000 Keys | 989 | 2.18% | 195 | 0.43% | 10.92 | 2.31% | 206 | 1.71% |
| Array With 1000 Tables With 1 Key | 385 | 1.13% | 133 | 0.77% | 6.18 | 1.00% | 113 | 1.65% |
| Array With 1000 Tables of Tables of 1 Key | 200 | 0.37% | 79.87 | 1.04% | 3.72 | 1.57% | 59.53 | 1.70% |
| 1000 Element Inline Array | 743 | 0.25% | 444 | 0.26% | 133 | 2.56% | crashed | |
| 1000 Key Inline Table | 736 | 0.50% | 332 | 1.27% | 16.32 | 3.35% | crashed | |
| 40kb Multiline Single Quoted String | 1122 | 3.03% | 61.77 | 4.01% | 68.24 | 2.59% | 782 | 1.00% |
| 40kb Multiline Double Quoted String | 1074 | 3.54% | 57.27 | 3.33% | 5.42 | 0.65% | 825 | 1.60% |
| Inline Array Nested 1000 deep | 2662 | 0.69% | 128 | 0.32% | 15.75 | 2.08% | 240 | 1.52% |
| Inline Tables Nested 1000 deep | 1098 | 0.94% | 197 | 1.82% | 16.65 | 2.34% | 221 | 1.84% |
| 40kb Double Quoted String | 1044 | 2.62% | 90.21 | 0.24% | 5.37 | 1.38% | 812 | 1.03% |
| 40kb Single Quoted String | 1105 | 0.60% | 82.79 | 4.56% | 75.11 | 2.12% | 825 | 1.34% |

## Changes

I write a by hand, honest-to-god,
[CHANGELOG](https://github.com/iarna/iarna-toml/blob/latest/CHANGELOG.md)
for this project.  It's a description of what went into a release that you
the consumer of the module could care about, not a list of git commits, so
please check it out!

## Tests

The test suite is maintained at 100% coverage: [![Coverage Status](https://coveralls.io/repos/github/iarna/iarna-toml/badge.svg)](https://coveralls.io/github/iarna/iarna-toml)

All of the official example files from the TOML spec
are run through this parser. The parser's output is compared to that of
[`toml`](https://www.npmjs.com/package/toml) and
[`toml-j0.4`](https://www.npmjs.com/package/toml-j0.4) to ensure we're parsing this
core material in the same way.

The stringifier is tested by round tripping these same files, asserting that
`TOML.parse(sourcefile)` deepEqual
`TOML.parse(TOML.stringify(TOML.parse(sourcefile))`

The files are from the TOML specification as of
[183273af30102704a103f206f974636967c4da6d](https://github.com/toml-lang/toml/tree/183273af30102704a103f206f974636967c4da6d)
and specifically are:

* [github.com/toml-lang/toml/tree/183273af/examples](https://github.com/toml-lang/toml/tree/183273af30102704a103f206f974636967c4da6d/examples)
* [github.com/toml-lang/toml/tree/183273af/tests](https://github.com/toml-lang/toml/tree/183273af30102704a103f206f974636967c4da6d/tests)

Additional tests look at some more unusual use cases and error
conditions are were drawn up primarily while achieving 100% coverage and are found in 
[test/specific.js](https://github.com/iarna/iarna-toml/blob/latest/test/specific.js) and
and [test/error.js](https://github.com/iarna/iarna-toml/blob/latest/test/error.js) respectively.
Relatedly, [test/stringify.js](https://github.com/iarna/iarna-toml/blob/latest/test/stringify.js)
contains the same for stringification. Tests for the parsers debugging mode live in [test/devel.js](https://github.com/iarna/iarna-toml/blob/latest/test/devel.js).

And finally, many stringification tests were borrowed from [@othiym23](https://github.com/othiym23)'s
[toml-stream](https://npmjs.com/package/toml-stream) module. They were fetched as of
[b6f1e26b572d49742d49fa6a6d11524d003441fa](https://github.com/othiym23/toml-stream/tree/b6f1e26b572d49742d49fa6a6d11524d003441fa/test).
