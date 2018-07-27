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

* The only TOML 0.5.0 complaint parser for Node.js (as of this writing).
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

Version 2 of this module supports TOML 0.5.0.  Other modules currently
published to the npm registry support 0.4.0.  0.5.0 is mostly backwards
compatible with 0.4.0, but if you have need, you can install @iarna/toml@1
to get a version of this module that supports 0.4.0.  Please see the
[CHANGELOG](CHANGELOG.md) for details on exactly whats changed.

## TOML we can't do

* `-nan` is a valid TOML value and is converted into `NaN`. There is no way to
  produce `-nan` when stringifying.
* Detecting and erroring on invalid utf8 documents: This is because Node's
  UTF8 processing converts invalid sequences into the placeholder character
  and does not have facilities for reporting these as errors instead.  We
  _can_ detect the placeholder character, but it's valid to intentionally
  include it.
* On versions of Node < 10, very large Integer values will lose precision.
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

The results below are from my laptop using Node 10.6.0.  The library
versions tested were `@iarna/toml@1.6.0`, `toml-j0.4@1.1.1`, `toml@2.3.3`,
`@sgarciac/bombadil@0.0.7`.  The percentage after average results is the
margin of error.


|   | @iarna/toml |   | toml-j0.4 |   | toml |   | @sgarciac/bombadil |   |
| - | ----------- | - | --------- | - | ---- | - | -------------------| - |
| Overall | 7.4MB/sec | 0.81% | 2.3MB/sec | 0.96% | 0.3MB/sec | 0.51% | crashed | |
| Spec Example: v0.4.0 | 24MB/sec | 0.73% | 7.6MB/sec | 2.22% | 1MB/sec | 2.10% | 4.8MB/sec | 2.31% |
| Spec Example: Hard Unicode | 63MB/sec | 0.73% | 12MB/sec | 2.14% | 2.1MB/sec | 2.44% | 2.7MB/sec | 2.01% |
| Types: Array, Inline | 7.5MB/sec | 1.43% | 3MB/sec | 1.79% | 0.2MB/sec | 2.36% | 3.4MB/sec | 1.82% |
| Types: Array | 6.6MB/sec | 1.06% | 4.8MB/sec | 0.81% | 0.3MB/sec | 2.36% | 2.2MB/sec | 1.70% |
| Types: Boolean, | 20MB/sec | 1.44% | 7.2MB/sec | 0.85% | 0.3MB/sec | 1.53% | 4.3MB/sec | 1.65% |
| Types: Datetime | 18MB/sec | 0.82% | 8.8MB/sec | 1.61% | 0.4MB/sec | 1.74% | 2.2MB/sec | 1.27% |
| Types: Float | 8.5MB/sec | 1.32% | 4.5MB/sec | 1.02% | 0.3MB/sec | 2.27% | 4.5MB/sec | 1.40% |
| Types: Int | 6.4MB/sec | 0.83% | 3.5MB/sec | 1.66% | 0.1MB/sec | 3.83% | 3.5MB/sec | 1.77% |
| Types: Literal String, 7 char | 25MB/sec | 2.21% | 5.6MB/sec | 0.80% | 0.3MB/sec | 1.82% | 5.4MB/sec | 1.56% |
| Types: Literal String, 92 char | 45MB/sec | 1.64% | 5.7MB/sec | 3.32% | 0.4MB/sec | 1.53% | 28MB/sec | 1.79% |
| Types: Literal String, Multiline, 1079 char | 22MB/sec | 0.64% | 3.4MB/sec | 4.06% | 1.4MB/sec | 2.09% | 138MB/sec | 1.37% |
| Types: Basic String, 7 char | 25MB/sec | 0.98% | 4.9MB/sec | 2.47% | 0.2MB/sec | 4.21% | 4.8MB/sec | 1.53% |
| Types: Basic String, 92 char | 41MB/sec | 1.78% | 4.5MB/sec | 2.16% | 0.1MB/sec | 7.03% | 23MB/sec | 1.56% |
| Types: Basic String, 1079 char | 20MB/sec | 2.62% | 2.9MB/sec | 4.22% | 0.1MB/sec | 3.94% | 112MB/sec | 4.58% |
| Types: Table, Inline | 7.7MB/sec | 3.04% | 3.4MB/sec | 3.01% | 0.1MB/sec | 2.93% | 3.5MB/sec | 0.93% |
| Types: Table | 5.7MB/sec | 1.14% | 3.7MB/sec | 1.84% | 0.2MB/sec | 2.84% | 2.6MB/sec | 0.99% |
| Scaling: Array, Inline, 1000 elements | 39MB/sec | 2.26% | 2.1MB/sec | 2.78% | 0.2MB/sec | 3.31% | 4.5MB/sec | 1.88% |
| Scaling: Array, Nested, 1000 deep | 2MB/sec | 1.62% | 1.2MB/sec | 1.96% | 0.3MB/sec | 2.43% | crashed | |
| Scaling: Literal String, 40kb | 60MB/sec | 3.67% | 3.8MB/sec | 5.01% | 4.1MB/sec | 2.05% | 50MB/sec | 1.33% |
| Scaling: Literal String, Multiline, 40kb | 57MB/sec | 2.54% | 2.8MB/sec | 4.70% | 0.2MB/sec | 3.33% | 47MB/sec | 1.59% |
| Scaling: Basic String, Multiline, 40kb | 63MB/sec | 1.42% | 3.2MB/sec | 4.23% | 3.8MB/sec | 2.42% | 49MB/sec | 0.69% |
| Scaling: Basic String, 40kb | 63MB/sec | 0.54% | 5MB/sec | 1.46% | 0.3MB/sec | 3.04% | 49MB/sec | 0.47% |
| Scaling: Table, Inline, 1000 elements | 26MB/sec | 0.60% | 5.4MB/sec | 0.39% | 0.4MB/sec | 1.61% | 6.7MB/sec | 2.07% |
| Scaling: Table, Inline, Nested, 1000 deep | 7.4MB/sec | 1.25% | 3.6MB/sec | 0.68% | 0.1MB/sec | 1.36% | crashed | |

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
