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

  ![Benchmark results showing @iarna/toml as 50x faster than toml and 2.8x faster than toml-j0.4](https://shared.by.re-becca.org/misc/speeeed.png)
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

The results below are from my laptop using `@iarna/toml@1.5.2`,
`toml-j0.4@1.1.1`, and `toml@2.3.3`.   The percentage after average results is the margin of error.

|   | @iarna/toml |   | toml-j0.4 |   | toml |   |
| - | ----------- | - | --------- | - | ---- | - |
| Overall | 45.17 | 9.75% | 13.77 | 6.80% | 0.76 | 4.78% |
| Spec Example: 0.4.0 | 2138 | 3.02% | 1267 | 3.52% | 120 | 3.29% |
| Spec Example: Hard Unicode | 11807 | 3.35% | 4444 | 1.70% | 730 | 3.05% |
| 1000 Keys | 472 | 1.34% | 269 | 1.36% | 11.11 | 1.47% |
| Array With 1000 Tables With 1 Key | 240 | 2.43% | 161 | 3.24% | 6.17 | 4.93% |
| Array With 1000 Tables of Tables of 1 Key | 137 | 3.24% | 102 | 3.12% | 2.93 | 6.29% |
| 1000 Element Inline Array | 1665 | 1.22% | 148 | 1.75% | 11.58 | 4.26% |
| 1000 Key Inline Table | 648 | 3.33% | 272 | 1.61% | 15.28 | 3% |
| Inline Array Nested 1000 deep | 691 | 1.46% | 438 | 1.36% | 112 | 4.60% |
| Inline Tables Nested 1000 deep | 590 | 1.44% | 344 | 3.16% | 14.02 | 5.17% |
| 40kb Multiline Single Quoted String | 654 | 2.73% | 128 | 3.67% | 64.65 | 2.42% |
| 40kb Multiline Double Quoted String | 621 | 2.95% | 128 | 0.69% | 4.82 | 1.77% |
| 40kb Single Quoted String | 516 | 1.41% | 210 | 1.68% | 72.91 | 2.67% |
| 40kb Double Quoted String | 478 | 6.18% | 149 | 1.69% | 4.66 | 2.65% |

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
