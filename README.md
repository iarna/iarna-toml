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

|   | @iarna/toml |   | toml-j0.4 |   | toml |   | @sgarciac/bombadil |   |
| - | ----------- | - | --------- | - | ---- | - | -------------------| - |
| Overall | 35.83 | 4.12% | 8.62 | 3.38% | 0.82 | 3.22% | crashed | |
| Spec Example | 2146 | 1.16% | 964 | 3.20% | 147 | 3.27% | 592 | 2.48% |
| Spec Example: Hard Unicode | 12377 | 2.48% | 4231 | 2.31% | 719 | 3.67% | 885 | 1.22% |
| 1000 Keys | 627 | 1.30% | 186 | 2.25% | 10.77 | 2.56% | 203 | 1.66% |
| Array With 1000 Tables With 1 Key | 305 | 1.29% | 139 | 0.47% | 6.51 | 2.79% | 112 | 2.47% |
| Array With 1000 Tables of Tables of 1 Key | 167 | 2.39% | 84.66 | 0.76% | 3.82 | 2.10% | 60.47 | 1.89% |
| 1000 Element Inline Array | 699 | 1.28% | 457 | 0.87% | 137 | 2.47% | crashed | |
| 1000 Key Inline Table | 587 | 0.96% | 348 | 0.35% | 16.58 | 3.95% | crashed | |
| 40kb Multiline Single Quoted String | 642 | 1.44% | 60.23 | 3.70% | 68.63 | 2.84% | 749 | 1.74% |
| 40kb Multiline Double Quoted String | 551 | 0.68% | 55.94 | 3.64% | 5.50 | 0.53% | 772 | 0.80% |
| Inline Array Nested 1000 deep | 1700 | 2.67% | 126 | 0.84% | 15.57 | 2.26% | 234 | 2.45% |
| Inline Tables Nested 1000 deep | 667 | 2.18% | 171 | 3.76% | 16.80 | 2.30% | 216 | 1.83% |
| 40kb Single Quoted String | 485 | 2.33% | 91.61 | 0.39% | 5.41 | 1.20% | 818 | 0.79% |
| 40kb Single Quoted String | 556 | 2.13% | 76.47 | 4.29% | 72.73 | 3.66% | 911 | 1.09% |

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
