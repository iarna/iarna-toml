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

* See [TOML-SPEC-SUPPORT](https://shared.by.re-becca.org/misc/TOML-SPEC-SUPPORT.html)
  for a comparison of which TOML features are supported by the various
  Node.js TOML parsers.
* BigInt support on Node 10!
* 100% test coverage.
* Fast parsing. It's as much as 100 times
  faster than `toml` and 3 times faster than `toml-j0.4`.  However a recent
  newcomer [`@ltd/j-toml`](https://www.npmjs.com/package/@ltd/j-toml) has
  appeared with 0.5 support and astoundingly fast parsing speeds for large
  text blocks. All I can say is you'll have to test your specific work loads
  if you want to know which of @iarna/toml and @ltd/j-toml is faster for
  you, as we currently excell in different areas.
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

## Changes

I write a by hand, honest-to-god,
[CHANGELOG](https://github.com/iarna/iarna-toml/blob/latest/CHANGELOG.md)
for this project.  It's a description of what went into a release that you
the consumer of the module could care about, not a list of git commits, so
please check it out!

## Benchmarks

You can run them yourself with:

```console
$ npm run benchmark
```

The results below are from my desktop using Node 13.13.0.  The library
versions tested were `@iarna/toml@2.2.4`, `toml-j0.4@1.1.1`, `toml@3.0.0`,
`@sgarciac/bombadil@2.3.0`, `@ltd/j-toml@0.5.107`, and `fast-toml@0.5.4`.  The speed value is
megabytes-per-second that the parser can process of that document type.
Bigger is better. The percentage after average results is the margin of error.

New here is fast-toml. fast-toml is very fast, for some datatypes, but it
also is missing most error checking demanded by the spec.  For 0.4, it is
complete except for detail of multiline strings caught by the compliance
tests.  Its support for 0.5 is incomplete.  Check out the
[spec compliance](https://shared.by.re-becca.org/misc/TOML-SPEC-SUPPORT.html) doc
for details.

As this table is getting a little wide, with how npm and github display it,
you can also view it seperately in the
[BENCHMARK](https://shared.by.re-becca.org/misc/BENCHMARK.html) document.

|   | @iarna/toml |   | toml-j0.4 |   | toml |   | @sgarciac/bombadil |   | @ltd/j-toml |   | fast-toml |   |
| - | ----------- | - | --------- | - | ---- | - | ------------------ | - | ----------- | - | --------- | - |
| Overall | 28MB/sec | 0.35% | 6.5MB/sec | 0.25% | 0.2MB/sec | 0.70% | - | - | 35MB/sec | 0.23% | - | - |
| Spec Example: v0.4.0 | 26MB/sec | 0.37% | 10MB/sec | 0.27% | 1MB/sec | 0.42% | 1.2MB/sec | 0.95% | 28MB/sec | 0.31% | - | - |
| Spec Example: Hard Unicode | 64MB/sec | 0.59% | 18MB/sec | 0.12% | 2MB/sec | 0.20% | 0.6MB/sec | 0.53% | 68MB/sec | 0.31% | 78MB/sec | 0.28% |
| Types: Array, Inline | 7.3MB/sec | 0.60% | 4MB/sec | 0.16% | 0.1MB/sec | 0.91% | 1.3MB/sec | 0.81% | 10MB/sec | 0.35% | 9MB/sec | 0.16% |
| Types: Array | 6.8MB/sec | 0.19% | 6.7MB/sec | 0.15% | 0.2MB/sec | 0.79% | 1.2MB/sec | 0.93% | 8.8MB/sec | 0.47% | 27MB/sec | 0.21% |
| Types: Boolean, | 21MB/sec | 0.20% | 9.4MB/sec | 0.17% | 0.2MB/sec | 0.96% | 1.8MB/sec | 0.70% | 16MB/sec | 0.20% | 8.4MB/sec | 0.22% |
| Types: Datetime | 18MB/sec | 0.14% | 11MB/sec | 0.15% | 0.3MB/sec | 0.85% | 1.6MB/sec | 0.45% | 9.8MB/sec | 0.48% | 6.5MB/sec | 0.23% |
| Types: Float | 8.8MB/sec | 0.09% | 5.9MB/sec | 0.14% | 0.2MB/sec | 0.51% | 2.1MB/sec | 0.82% | 14MB/sec | 0.15% | 7.9MB/sec | 0.14% |
| Types: Int | 5.9MB/sec | 0.11% | 4.5MB/sec | 0.28% | 0.1MB/sec | 0.78% | 1.5MB/sec | 0.64% | 10MB/sec | 0.14% | 8MB/sec | 0.17% |
| Types: Literal String, 7 char | 26MB/sec | 0.29% | 8.5MB/sec | 0.32% | 0.3MB/sec | 0.84% | 2.3MB/sec | 1.02% | 23MB/sec | 0.15% | 13MB/sec | 0.15% |
| Types: Literal String, 92 char | 46MB/sec | 0.19% | 11MB/sec | 0.20% | 0.3MB/sec | 0.56% | 12MB/sec | 0.92% | 101MB/sec | 0.17% | 75MB/sec | 0.29% |
| Types: Literal String, Multiline, 1079 char | 22MB/sec | 0.42% | 6.7MB/sec | 0.55% | 0.9MB/sec | 0.78% | 44MB/sec | 1.00% | 350MB/sec | 0.16% | 636MB/sec | 0.16% |
| Types: Basic String, 7 char | 25MB/sec | 0.15% | 7.3MB/sec | 0.18% | 0.2MB/sec | 0.96% | 2.2MB/sec | 1.09% | 14MB/sec | 0.16% | 12MB/sec | 0.22% |
| Types: Basic String, 92 char | 43MB/sec | 0.30% | 7.2MB/sec | 0.16% | 0.1MB/sec | 4.04% | 12MB/sec | 1.33% | 71MB/sec | 0.19% | 70MB/sec | 0.23% |
| Types: Basic String, 1079 char | 24MB/sec | 0.45% | 5.8MB/sec | 0.17% | 0.1MB/sec | 3.64% | 44MB/sec | 1.05% | 93MB/sec | 0.29% | 635MB/sec | 0.28% |
| Types: Table, Inline | 9.7MB/sec | 0.10% | 5.5MB/sec | 0.22% | 0.1MB/sec | 0.87% | 1.4MB/sec | 1.18% | 8.7MB/sec | 0.60% | 8.7MB/sec | 0.22% |
| Types: Table | 7.1MB/sec | 0.14% | 5.6MB/sec | 0.42% | 0.1MB/sec | 0.65% | 1.4MB/sec | 1.11% | 7.4MB/sec | 0.70% | 18MB/sec | 0.20% |
| Scaling: Array, Inline, 1000 elements | 40MB/sec | 0.21% | 2.4MB/sec | 0.19% | 0.1MB/sec | 0.35% | 1.6MB/sec | 1.02% | 17MB/sec | 0.15% | 32MB/sec | 0.16% |
| Scaling: Array, Nested, 1000 deep | 2MB/sec | 0.15% | 1.7MB/sec | 0.26% | 0.3MB/sec | 0.58% | - | - | 1.8MB/sec | 0.74% | 13MB/sec | 0.20% |
| Scaling: Literal String, 40kb | 61MB/sec | 0.18% | 10MB/sec | 0.15% | 3MB/sec | 0.84% | 12MB/sec | 0.51% | 551MB/sec | 0.44% | 19kMB/sec | 0.19% |
| Scaling: Literal String, Multiline, 40kb | 62MB/sec | 0.16% | 5MB/sec | 0.45% | 0.2MB/sec | 1.70% | 11MB/sec | 0.74% | 291MB/sec | 0.24% | 21kMB/sec | 0.22% |
| Scaling: Basic String, Multiline, 40kb | 62MB/sec | 0.18% | 5.8MB/sec | 0.38% | 2.9MB/sec | 0.86% | 11MB/sec | 0.41% | 949MB/sec | 0.44% | 26kMB/sec | 0.16% |
| Scaling: Basic String, 40kb | 59MB/sec | 0.20% | 6.3MB/sec | 0.17% | 0.2MB/sec | 1.95% | 12MB/sec | 0.44% | 508MB/sec | 0.35% | 18kMB/sec | 0.15% |
| Scaling: Table, Inline, 1000 elements | 28MB/sec | 0.12% | 8.2MB/sec | 0.19% | 0.3MB/sec | 0.89% | 2.3MB/sec | 1.14% | 5.3MB/sec | 0.24% | 13MB/sec | 0.20% |
| Scaling: Table, Inline, Nested, 1000 deep | 7.8MB/sec | 0.28% | 5MB/sec | 0.20% | 0.1MB/sec | 0.84% | - | - | 3.2MB/sec | 0.52% | 10MB/sec | 0.23% |

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
