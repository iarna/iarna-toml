# @iarna/toml

Better TOML parsing and stringifying all in that familiar JSON interface.

[![Coverage Status](https://coveralls.io/repos/github/iarna/iarna-toml/badge.svg)](https://coveralls.io/github/iarna/iarna-toml)

# ** TOML 0.5.0 **

### TOML Spec Support

The most recent version as of 2018-07-26: [v0.5.0](https://github.com/mojombo/toml/blob/master/versions/en/toml-v0.5.0.md)

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

* See [TOML-SPEC-SUPPORT](https://shared.by.re-becca.org/misc/TOML-SPEC-SUPPORT.html) for a comparison of which TOML features
  are supported by the various Node.js TOML parsers.
* BigInt support on Node 10!
* 100% test coverage.
* Faster parsing, even if you only use TOML 0.4.0, it's 25 times faster than `toml` and 3 times faster than `toml-j0.4`.
  (Do these numbers look smaller than before? The parser didn't slow down, but the benchmark suite is larger and broader now, and so
  better demonstrates the strong and week points of the various parsers.)
* Careful adherence to spec. Tests go beyond simple coverage.
* Smallest parser bundle (if you use `@iarna/toml/parse-string`).
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

### readable.pipe(TOML.parse.stream()) → Transform [(example)](https://github.com/iarna/iarna-toml/blob/latest/examples/parse-stream-through.js)

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

Version 2 of this module supports TOML 0.5.0.  Other modules currently
published to the npm registry support 0.4.0.  0.5.0 is mostly backwards
compatible with 0.4.0, but if you have need, you can install @iarna/toml@1
to get a version of this module that supports 0.4.0.  Please see the
[CHANGELOG](CHANGELOG.md#2.0.0) for details on exactly whats changed.

## TOML we can't do

* `-nan` is a valid TOML value and is converted into `NaN`. There is no way to
  produce `-nan` when stringifying. Stringification will produce positive `nan`.
* Detecting and erroring on invalid utf8 documents: This is because Node's
  UTF8 processing converts invalid sequences into the placeholder character
  and does not have facilities for reporting these as errors instead.  We
  _can_ detect the placeholder character, but it's valid to intentionally
  include them in documents, so erroring on them is not great.
* On versions of Node < 10, very large Integer values will lose precision.
  On Node >=10, bigints are used.
* Floating/local dates and times are still represented by JavaScript Date
  objects, which don't actually support these concepts. The objects
  returned have been modified so that you can determine what kind of thing
  they are (with `isFloating`, `isDate`, `isTime` properties) and that
  their ISO representation (via `toISOString`) is representative of their
  TOML value.  They will correctly round trip if you pass them to
  `TOML.stringify`.
* Binary, hexadecimal and octal values are converted to ordinary integers and
  will be decimal if you stringify them.

## Improvements to make

* In stringify:
  * Any way to produce comments.  As a JSON stand-in I'm not too worried
    about this.  That said, a document orientated fork is something I'd like
    to look at eventually…
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

The results below are from my laptop using Node 10.6.0.  The library
versions tested were `@iarna/toml@2.2.2`, `toml-j0.4@1.1.1`, `toml@3.0.0`,
`@sgarciac/bombadil@2.1.0` and `@ltd/j-toml@0.5.45`.  The speed value is
megabytes-per-second that the parser can process of that document type.
Bigger is better.  The second number is the margin of error, lower implies
more consistent performance.

The percentage after average results is the margin of error.

|   | @iarna/toml |   | toml-j0.4 |   | toml |   | @sgarciac/bombadil |   | @ltd/j-toml |
| - | ----------- | - | --------- | - | ---- | - | -------------------| - | ----------- | -
| Overall | 12MB/sec | 1.62% | 6.7MB/sec | 1.62% | 0.2MB/sec | 1.18% | crashed | | crashed | |
| Spec Example: v0.4.0 | 21MB/sec | 3.16% | 9.4MB/sec | 1.24% | 1MB/sec | 3.49% | 1.5MB/sec | 2.26% | crashed | |
| Spec Example: Hard Unicode | 55MB/sec | 1.69% | 16MB/sec | 1.35% | 2MB/sec | 3.38% | 0.8MB/sec | 2.19% | 90MB/sec | 1.76% |
| Types: Array, Inline | 4.9MB/sec | 1.98% | 2.6MB/sec | 0.92% | 0.1MB/sec | 3.52% | 1.4MB/sec | 2.59% | 3.1MB/sec | 21.97% |
| Types: Array | 6.5MB/sec | 0.89% | 5.6MB/sec | 0.70% | 0.1MB/sec | 6.68% | 1.2MB/sec | 3.51% | 4.8MB/sec | 0.36% |
| Types: Boolean, | 9.8MB/sec | 0.99% | 5.7MB/sec | 0.82% | 0.2MB/sec | 3.97% | 1.9MB/sec | 3.42% | 5.2MB/sec | 0.53% |
| Types: Datetime | 9.8MB/sec | 1.28% | 7.2MB/sec | 1.14% | 0.3MB/sec | 3.38% | 1.1MB/sec | 12.56% | 8.1MB/sec | 0.52% |
| Types: Float | 6.3MB/sec | 0.90% | 4MB/sec | 0.85% | 0.3MB/sec | 4.13% | 2MB/sec | 4.68% | 4.3MB/sec | 0.48% |
| Types: Int | 4.3MB/sec | 1.32% | 3MB/sec | 1.66% | 0.1MB/sec | 7.52% | 1.5MB/sec | 5.14% | crashed | |
| Types: Literal String, 7 char | 12MB/sec | 1.02% | 5.8MB/sec | 1.09% | 0.3MB/sec | 1.57% | 2.3MB/sec | 4.37% | 6.7MB/sec | 0.61% |
| Types: Literal String, 92 char | 15MB/sec | 0.80% | 10MB/sec | 1.19% | 0.4MB/sec | 2.61% | 12MB/sec | 4.39% | 35MB/sec | 0.41% |
| Types: Literal String, Multiline, 1079 char | 12MB/sec | 4.82% | 7MB/sec | 1.56% | 1.2MB/sec | 5.79% | 49MB/sec | 2.89% | 264MB/sec | 0.78% |
| Types: Basic String, 7 char | 12MB/sec | 1.17% | 4.8MB/sec | 1.47% | 0.2MB/sec | 1.91% | 2.1MB/sec | 3.86% | 6.5MB/sec | 0.50% |
| Types: Basic String, 92 char | 16MB/sec | 1.01% | 7.5MB/sec | 2.37% | 0.1MB/sec | 2.22% | 11MB/sec | 3.76% | 34MB/sec | 0.45% |
| Types: Basic String, 1079 char | 12MB/sec | 1.22% | 6.1MB/sec | 1.96% | 0.1MB/sec | 2.23% | 46MB/sec | 2.49% | 52MB/sec | 0.39% |
| Types: Table, Inline | 5.7MB/sec | 0.92% | 3.4MB/sec | 1.24% | 0.1MB/sec | 4.94% | 1.4MB/sec | 2.73% | 3.3MB/sec | 1.52% |
| Types: Table | 3.9MB/sec | 1.83% | 3.2MB/sec | 0.63% | 0.1MB/sec | 6.10% | 1.2MB/sec | 2.76% | 3.8MB/sec | 0.94% |
| Scaling: Array, Inline, 1000 elements | 29MB/sec | 2.81% | 2.4MB/sec | 0.93% | 0.1MB/sec | 8.03% | 1.6MB/sec | 3.48% | 9.9MB/sec | 1.01% |
| Scaling: Array, Nested, 1000 deep | 1.5MB/sec | 4.51% | 1.1MB/sec | 0.76% | 0.1MB/sec | 6.33% | crashed | | 0.9MB/sec | 5.12% |
| Scaling: Literal String, 40kb | 32MB/sec | 1.06% | 11MB/sec | 4.42% | 3.4MB/sec | 7.49% | 15MB/sec | 3.09% | 469MB/sec | 0.51% |
| Scaling: Literal String, Multiline, 40kb | 32MB/sec | 0.97% | 6.2MB/sec | 1.00% | 0.2MB/sec | 2.30% | 13MB/sec | 3.10% | 205MB/sec | 0.61% |
| Scaling: Basic String, Multiline, 40kb | 33MB/sec | 0.81% | 7MB/sec | 2.48% | 3.4MB/sec | 7.55% | 14MB/sec | 3.81% | 719MB/sec | 0.56% |
| Scaling: Basic String, 40kb | 33MB/sec | 1.37% | 8.6MB/sec | 0.98% | 0.2MB/sec | 3.16% | 16MB/sec | 2.83% | 367MB/sec | 0.35% |
| Scaling: Table, Inline, 1000 elements | 12MB/sec | 0.91% | 5.5MB/sec | 2.00% | 0.3MB/sec | 5.06% | 2.4MB/sec | 4.51% | 2MB/sec | 0.84% |
| Scaling: Table, Inline, Nested, 1000 deep | 7.2MB/sec | 2.31% | 4MB/sec | 0.76% | 0.1MB/sec | 8.18% | crashed | | 1.4MB/sec | 5.95% |

## Changes

I write a by hand, honest-to-god,
[CHANGELOG](https://github.com/iarna/iarna-toml/blob/latest/CHANGELOG.md)
for this project.  It's a description of what went into a release that you
the consumer of the module could care about, not a list of git commits, so
please check it out!

## Tests

The test suite is maintained at 100% coverage: [![Coverage Status](https://coveralls.io/repos/github/iarna/iarna-toml/badge.svg)](https://coveralls.io/github/iarna/iarna-toml)

The spec was carefully hand converted into a series of test framework
independent (and mostly language independent) assertions, as pairs of TOML
and YAML files.  You can find those files here:
[spec-test](https://github.com/iarna/iarna-toml/blob/latest/test/spec-test/). 
A number of examples of invalid Unicode were also written, but are difficult
to make use of in Node.js where Unicode errors are silently hidden.  You can
find those here: [spec-test-disabled](https://github.com/iarna/iarna-toml/blob/latest/test/spec-test-disabled/).

Further tests were written to increase coverage to 100%, these may be more
implementation specific, but they can be found in [coverage](https://github.com/iarna/iarna-toml/blob/latest/test/coverage.js) and
[coverage-error](https://github.com/iarna/iarna-toml/blob/latest/test/coverage-error.js).

I've also written some quality assurance style tests, which don't contribute
to coverage but do cover scenarios that could easily be problematic for some
implementations can be found in:
[test/qa.js](https://github.com/iarna/iarna-toml/blob/latest/test/qa.js) and
[test/qa-error.js](https://github.com/iarna/iarna-toml/blob/latest/test/qa-error.js).

All of the official example files from the TOML spec are run through this
parser and compared to the official YAML files when available. These files are from the TOML spec as of:
[357a4ba6](https://github.com/toml-lang/toml/tree/357a4ba6782e48ff26e646780bab11c90ed0a7bc)
and specifically are:

* [github.com/toml-lang/toml/tree/357a4ba6/examples](https://github.com/toml-lang/toml/tree/357a4ba6782e48ff26e646780bab11c90ed0a7bc/examples)
* [github.com/toml-lang/toml/tree/357a4ba6/tests](https://github.com/toml-lang/toml/tree/357a4ba6782e48ff26e646780bab11c90ed0a7bc/tests)

The stringifier is tested by round-tripping these same files, asserting that
`TOML.parse(sourcefile)` deepEqual
`TOML.parse(TOML.stringify(TOML.parse(sourcefile))`.  This is done in
[test/roundtrip-examples.js](https://github.com/iarna/iarna-toml/blob/latest/test/round-tripping.js)
There are also some tests written to complete coverage from stringification in:
[test/stringify.js](https://github.com/iarna/iarna-toml/blob/latest/test/stringify.js)

Tests for the async and streaming interfaces are in [test/async.js](https://github.com/iarna/iarna-toml/blob/latest/test/async.js) and [test/stream.js](https://github.com/iarna/iarna-toml/blob/latest/test/stream.js) respectively.

Tests for the parsers debugging mode live in [test/devel.js](https://github.com/iarna/iarna-toml/blob/latest/test/devel.js).

And finally, many more stringification tests were borrowed from [@othiym23](https://github.com/othiym23)'s
[toml-stream](https://npmjs.com/package/toml-stream) module. They were fetched as of
[b6f1e26b572d49742d49fa6a6d11524d003441fa](https://github.com/othiym23/toml-stream/tree/b6f1e26b572d49742d49fa6a6d11524d003441fa/test) and live in
[test/toml-stream](https://github.com/iarna/iarna-toml/blob/latest/test/toml-stream/).
