# @iarna/toml

Better TOML parsing and stringifying all in that familiar JSON interface.

[![Coverage Status](https://coveralls.io/repos/github/iarna/iarna-toml/badge.svg)](https://coveralls.io/github/iarna/iarna-toml)

# ** TOML 1.0.0-rc.1 **

### TOML Spec Support

The most recent version as of 2019-04-21: [1.0.0-rc.1](https://github.com/toml-lang/toml/blob/master/versions/en/toml-v1.0.0-rc.1.md)

### Other Versions

1.0.0-rc.1 parsers can load almost any TOML 0.4 and TOML 0.5 document, but
TOML 1.0.0-rc.1 docs are not always compatible with TOML 0.4 and TOML 0.5
parsers.  If you're using this to generate TOML documents and you want an
older parser to be able to read them you may want to use the
[latest TOML 0.5 version of this module](https://www.npmjs.com/package/@iarna/toml/v/toml-0.5).

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

* Support for TOML 1.0.0-rc.1!
* Highly correct! Careful adherence to spec.
* See [TOML-SPEC-SUPPORT](https://shared.by.re-becca.org/misc/TOML-SPEC-SUPPORT-v1.html) for a comparison of which TOML features
  are supported by the various Node.js TOML parsers.
* Speedy! See benchmarks at end.
* BigInt support on Node 10!
* 100% test coverage.
* Small parser bundle (if you use `@iarna/toml/parse-string`).
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

Version 3 of this module supports TOML 1.0.0-rc.1. Please see the
[CHANGELOG](CHANGELOG.md#3.0.0) for details on exactly whats changed.

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
  their ISO representation (via `toISOString`) are representative of their
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
versions tested were `@iarna/toml@3.0.0`, `toml-j0.4@1.1.1`, `toml@3.0.0`,
`@sgarciac/bombadil@2.3.0`, `@ltd/j-toml@0.5.107`, and `fast-toml@0.5.4`. 
The speed value is megabytes-per-second that the parser can process of that
document type.  Bigger is better.  The percentage after average results is
the margin of error.

New here is fast-toml. fast-toml is very fast, for some datatypes, but it
also is missing most error checking demanded by the spec.  For 0.4, it is
complete except for detail of multiline strings caught by the compliance
tests.  Its support for 0.5 is incomplete.  Check out the
[spec compliance](https://shared.by.re-becca.org/misc/TOML-SPEC-SUPPORT.html) doc
for details.

As this table is getting a little wide, with how npm and github display it,
you can also view it seperately in the
[BENCHMARK](https://shared.by.re-becca.org/misc/BENCHMARK.html) document.

|   | @iarna/<wbr>toml | toml-j0.4 | toml | @sgarciac/<wbr>bombadil | @ltd/<wbr>j-toml | fast-toml |
| - | :---------: | :-------: | :--: | :----------------: | :---------: | :-------: |
| **Overall** | 28MB/sec<br><small>0.55%</small> | - | - | - | - | - |
| **01-small-doc-mixed-type-inline-array** | 5.3MB/sec<br><small>0.48%</small> | - | - | - | - | 12MB/sec<br><small>0.13%</small> |
| **Spec Example: v0.4.0** | 25MB/sec<br><small>0.40%</small> | 9.9MB/sec<br><small>0.15%</small> | 0.9MB/sec<br><small>0.37%</small> | 1.3MB/sec<br><small>1.02%</small> | 28MB/sec<br><small>0.33%</small> | - |
| **Spec Example: Hard Unicode** | 63MB/sec<br><small>0.47%</small> | 17MB/sec<br><small>0.21%</small> | 2MB/sec<br><small>0.25%</small> | 0.6MB/sec<br><small>0.47%</small> | 65MB/sec<br><small>0.27%</small> | 79MB/sec<br><small>0.09%</small> |
| **Types: Array, Inline** | 7.2MB/sec<br><small>0.53%</small> | 4.1MB/sec<br><small>0.09%</small> | 0.1MB/sec<br><small>0.69%</small> | 1.4MB/sec<br><small>0.86%</small> | 10MB/sec<br><small>0.33%</small> | 9MB/sec<br><small>0.16%</small> |
| **Types: Array** | 6.8MB/sec<br><small>0.09%</small> | 6.8MB/sec<br><small>0.20%</small> | 0.2MB/sec<br><small>0.81%</small> | 1.3MB/sec<br><small>0.82%</small> | 8.9MB/sec<br><small>0.36%</small> | 29MB/sec<br><small>0.16%</small> |
| **Types: Boolean,** | 20MB/sec<br><small>0.22%</small> | 9.3MB/sec<br><small>0.29%</small> | 0.2MB/sec<br><small>0.91%</small> | 1.9MB/sec<br><small>0.85%</small> | 16MB/sec<br><small>0.29%</small> | 8.6MB/sec<br><small>0.22%</small> |
| **Types: Datetime** | 17MB/sec<br><small>0.09%</small> | 11MB/sec<br><small>0.17%</small> | 0.3MB/sec<br><small>0.75%</small> | 1.6MB/sec<br><small>0.42%</small> | 9.8MB/sec<br><small>0.40%</small> | 6.5MB/sec<br><small>0.11%</small> |
| **Types: Float** | 8.5MB/sec<br><small>0.29%</small> | 5.8MB/sec<br><small>0.33%</small> | 0.2MB/sec<br><small>0.91%</small> | 2.2MB/sec<br><small>0.91%</small> | 14MB/sec<br><small>0.25%</small> | 7.9MB/sec<br><small>0.33%</small> |
| **Types: Int** | 5.8MB/sec<br><small>0.13%</small> | 4.5MB/sec<br><small>0.14%</small> | 0.1MB/sec<br><small>0.63%</small> | 1.5MB/sec<br><small>0.73%</small> | 9.8MB/sec<br><small>0.14%</small> | 8.1MB/sec<br><small>0.16%</small> |
| **Types: Literal String, 7 char** | 25MB/sec<br><small>0.15%</small> | 8.3MB/sec<br><small>0.38%</small> | 0.2MB/sec<br><small>0.71%</small> | 2.3MB/sec<br><small>1.04%</small> | 23MB/sec<br><small>0.28%</small> | 14MB/sec<br><small>0.21%</small> |
| **Types: Literal String, 92 char** | 44MB/sec<br><small>0.23%</small> | 12MB/sec<br><small>0.14%</small> | 0.3MB/sec<br><small>0.63%</small> | 13MB/sec<br><small>1.12%</small> | 100MB/sec<br><small>0.14%</small> | 77MB/sec<br><small>0.15%</small> |
| **Types: Literal String, Multiline, 1079 char** | 23MB/sec<br><small>0.35%</small> | 7.2MB/sec<br><small>0.34%</small> | 0.9MB/sec<br><small>0.86%</small> | 47MB/sec<br><small>1.07%</small> | 380MB/sec<br><small>0.13%</small> | 641MB/sec<br><small>0.14%</small> |
| **Types: Basic String, 7 char** | 25MB/sec<br><small>0.09%</small> | 7MB/sec<br><small>0.08%</small> | 0.2MB/sec<br><small>0.82%</small> | 2.3MB/sec<br><small>1.02%</small> | 15MB/sec<br><small>0.12%</small> | 13MB/sec<br><small>0.14%</small> |
| **Types: Basic String, 92 char** | 44MB/sec<br><small>0.15%</small> | 8MB/sec<br><small>0.39%</small> | 0.1MB/sec<br><small>1.52%</small> | 12MB/sec<br><small>1.53%</small> | 70MB/sec<br><small>0.17%</small> | 71MB/sec<br><small>0.16%</small> |
| **Types: Basic String, 1079 char** | 24MB/sec<br><small>0.36%</small> | 5.7MB/sec<br><small>0.12%</small> | 0.1MB/sec<br><small>3.65%</small> | 42MB/sec<br><small>1.67%</small> | 93MB/sec<br><small>0.13%</small> | 617MB/sec<br><small>0.14%</small> |
| **Types: Table, Inline** | 9.4MB/sec<br><small>0.21%</small> | 5.2MB/sec<br><small>0.23%</small> | 0.1MB/sec<br><small>1.18%</small> | 1.4MB/sec<br><small>1.20%</small> | 8.5MB/sec<br><small>0.68%</small> | 8.7MB/sec<br><small>0.30%</small> |
| **Types: Table** | 6.8MB/sec<br><small>0.13%</small> | 5.5MB/sec<br><small>0.22%</small> | 0.1MB/sec<br><small>1.10%</small> | 1.5MB/sec<br><small>1.05%</small> | 7.3MB/sec<br><small>0.54%</small> | 19MB/sec<br><small>0.21%</small> |
| **Scaling: Array, Inline, 1000 elements** | 40MB/sec<br><small>0.27%</small> | 2.4MB/sec<br><small>0.20%</small> | 0.1MB/sec<br><small>1.90%</small> | 1.6MB/sec<br><small>1.14%</small> | 18MB/sec<br><small>0.16%</small> | 32MB/sec<br><small>0.12%</small> |
| **Scaling: Array, Nested, 1000 deep** | 2MB/sec<br><small>0.17%</small> | 1.6MB/sec<br><small>0.09%</small> | 0.3MB/sec<br><small>0.62%</small> | - | 1.8MB/sec<br><small>0.80%</small> | 13MB/sec<br><small>0.19%</small> |
| **Scaling: Literal String, 40kb** | 59MB/sec<br><small>0.26%</small> | 10MB/sec<br><small>0.14%</small> | 3MB/sec<br><small>0.91%</small> | 13MB/sec<br><small>0.40%</small> | 479MB/sec<br><small>0.25%</small> | 19kMB/sec<br><small>0.20%</small> |
| **Scaling: Literal String, Multiline, 40kb** | 61MB/sec<br><small>0.23%</small> | 5.3MB/sec<br><small>0.30%</small> | 0.2MB/sec<br><small>1.78%</small> | 12MB/sec<br><small>0.55%</small> | 276MB/sec<br><small>0.16%</small> | 21kMB/sec<br><small>0.10%</small> |
| **Scaling: Basic String, Multiline, 40kb** | 61MB/sec<br><small>0.21%</small> | 6MB/sec<br><small>0.40%</small> | 2.8MB/sec<br><small>0.75%</small> | 12MB/sec<br><small>0.60%</small> | 1kMB/sec<br><small>0.13%</small> | 27kMB/sec<br><small>0.14%</small> |
| **Scaling: Basic String, 40kb** | 60MB/sec<br><small>0.13%</small> | 6.6MB/sec<br><small>0.13%</small> | 0.2MB/sec<br><small>1.67%</small> | 13MB/sec<br><small>0.30%</small> | 504MB/sec<br><small>0.26%</small> | 19kMB/sec<br><small>0.22%</small> |
| **Scaling: Table, Inline, 1000 elements** | 26MB/sec<br><small>0.17%</small> | 7.3MB/sec<br><small>0.83%</small> | 0.3MB/sec<br><small>0.95%</small> | 2.5MB/sec<br><small>1.24%</small> | 5.4MB/sec<br><small>0.22%</small> | 13MB/sec<br><small>0.22%</small> |
| **Scaling: Table, Inline, Nested, 1000 deep** | 8MB/sec<br><small>0.10%</small> | 5.2MB/sec<br><small>0.25%</small> | 0.1MB/sec<br><small>0.45%</small> | - | 3.1MB/sec<br><small>0.58%</small> | 10MB/sec<br><small>0.19%</small> |

## Tests

The test suite is maintained at 100% coverage: [![Coverage Status](https://coveralls.io/repos/github/iarna/iarna-toml/badge.svg)](https://coveralls.io/github/iarna/iarna-toml)

The spec was carefully hand converted into a series of test framework
independent (and mostly language independent) assertions, as pairs of TOML
and YAML files.  You can find those files here:
[spec-test](https://github.com/iarna/toml-spec-test/). 

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

Tests for the parser's debugging mode live in [test/devel.js](https://github.com/iarna/iarna-toml/blob/latest/test/devel.js).

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
