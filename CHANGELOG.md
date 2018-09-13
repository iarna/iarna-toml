# 2.1.1

## Fixes

* Oops, type defs didn't end up in the tarball, ty [@jorgegonzalez](https://github.com/jorgegonzalez)‼

# 2.1.0

## Features

* Types for typescript support, thank you [@momocow](https://github.com/momocow)!

## Fixes

* stringify: always strip invalid dates.  This fixes a bug where an
  invalid date in an inline array would not be removed and would instead
  result in an error.
* stringify: if an invalid type is found make sure it's thrown as an
  error object.  Previously the type name was, unhelpfully, being thrown.
* stringify: Multiline strings ending in a quote would generate invalid TOML.
* parse: Error if a signed integer has a leading zero, eg, `-01` or `+01`.
* parse: Error if \_ appears at the end of the integer part of a float, eg `1_.0`. \_ is only valid between _digits_.

## Fun

* BurntSushi's comprehensive TOML 0.4.0 test suite is now used in addition to our existing test suite.
* You can see exactly how the other JS TOML libraries stack up in testing
  against both BurntSushi's tests and my own in the new
  [TOML-SPEC-SUPPORT](TOML-SPEC-SUPPORT.md) doc.

# 2.0.0

With 2.0.0, @iarna/toml supports the TOML v0.5.0 specification.  TOML 0.5.0
brings some changes:

* Delete characters (U+007F) are not allowed in plain strings. You can include them with
  escaped unicode characters, eg `\u007f`.
* Integers are specified as being 64bit unsigned values.  These are
  supported using `BigInt`s if you are using Node 10 or later.
* Keys may be literal strings, that is, you can use single quoted strings to
  quote key names, so the following is now valid:
    'a"b"c' = 123
* The floating point values `nan`, `inf` and `-inf` are supported. The stringifier will no 
  longer strip NaN, Infinity and -Infinity, instead serializing them as these new values..
* Datetimes can separate the date and time with a space instead of a T, so
  `2017-12-01T00:00:00Z` can be written as `2017-12-01 00:00:00Z`.
* Datetimes can be floating, that is, they can be represented without a timezone.
  These are represented in javascript as Date objects whose `isFloating` property is true and
  whose `toISOString` method will return a representation without a timezone.
* Dates without times are now supported. Dates do not have timezones. Dates
  are represented in javascript as a Date object whose `isDate` property is true and
  whose `toISOString` method returns just the date.
* Times without dates are now supported. Times do not have timezones. Times
  are represented in javascript as a Date object whose `isTime` property is true and
  whose `toISOString` method returns just the time.
* Keys can now include dots to directly address deeper structures, so `a.b = 23` is
  the equivalent of `a = {b = 23}` or ```[a]
b = 23```. These can be used both as keys to regular tables and inline tables.
* Integers can now be specified in binary, octal and hexadecimal by prefixing the 
  number with `0b`, `0o` and `0x` respectively.  It is now illegal to left
  pad a decimal value with zeros.

Some parser details were also fixed:

* Negative zero (`-0.0`) and positive zero (`0.0`) are distinct floating point values.
* Negative integer zero (`-0`) is not distinguished from positive zero (`0`).

# 1.7.1

Another 18% speed boost on our overall benchmarks!  This time it came from
switching from string comparisons to integer by converting each character to
its respective code point.  This also necessitated rewriting the boolean
parser to actually parse character-by-character as it should.  End-of-stream
is now marked with a numeric value outside of the Unicode range, rather than
a Symbol, meaning that the parser's char property is now monomorphic.

Bug fix, previously, `'abc''def'''`  was accepted (as the value: `abcdef`).
Now it will correctly raise an error.

Spec tests now run against bombadil as well (it fails some, which is unsurprising
given its incomplete state).

# 1.7.0

This release features an overall 15% speed boost on our benchmarks.  This
came from a few things:

* Date parsing was rewritten to not use regexps, resulting in a huge speed increase.
* Strings of all kinds and bare keywords now use tight loops to collect characters when this will help.
* Regexps in general were mostly removed.  This didn't result in a speed
  change, but it did allow refactoring the parser to be a lot easier to
  follow.
* The internal state tracking now uses a class and is constructed with a
  fixed set of properties, allowing v8's optimizer to be more effective.

In the land of new features:

* Errors in the syntax of your TOML will now have the `fromTOML` property
  set to true.  This is in addition to the `line`, `col` and `pos`
  properties they already have.

  The main use of this is to make it possible to distinguish between errors
  in the TOML and errors in the parser code itself. This is of particular utility
  when testing parse errors.

# 1.6.0

**FIXES**

* TOML.stringify: Allow toJSON properties that aren't functions, to align with JSON.stringify's behavior.
* TOML.stringify: Don't use ever render keys as literal strings.
* TOML.stringify: Don't try to escape control characters in literal strings.

**FEATURES**

* New Export: TOML.stringify.value, for encoding a stand alone inline value as TOML would. This produces
  a TOML fragment, not a complete valid document.

# 1.5.6

* String literals are NOT supported as key names.
* Accessing a shallower table after accessing it more deeply is ok and no longer crashes, eg:
  ```toml
  [a.b]
  [a]
  ```
* Unicode characters in the reserved range now crash.
* Empty bare keys, eg `[.abc]` or `[]` now crash.
* Multiline backslash trimming supports CRs.
* Multiline post quote trimming supports CRs.
* Strings may not contain bare control chars (0x00-0x1f), except for \n, \r and \t.

# 1.5.5

* Yet MORE README fixes. 🙃

# 1.5.4

* README fix

# 1.5.3

* Benchmarks!
* More tests!
* More complete LICENSE information (some dev files are from other, MIT
  licensed, projects, this is now more explicitly documented.)

# 1.5.2

* parse: Arrays with mixed types now throw errors, per the spec.
* parse: Fix a parser bug that would result in errors when trying to parse arrays of numbers or dates
  that were not separated by a space from the closing ].
* parse: Fix a bug in the error pretty printer that resulted in errors on
  the first line not getting the pretty print treatment.
* stringify: Fix long standing bug where an array of Numbers, some of which required
  decimals, would be emitted in a way that parsers would treat as mixed
  Integer and Float values.  Now if any Numbers in an array must be
  represented with a decimal then all will be emitted such that parsers will
  understand them to be Float.

# 1.5.1

* README fix

# 1.5.0

* A brand new TOML parser, from scratch, that performs like `toml-j0.4`
  without the crashes and with vastly better error messages.
* 100% test coverage for both the new parser and the existing stringifier. Some subtle bugs squashed!

# v1.4.2

* Revert fallback due to its having issues with the same files.  (New plan
  will be to write my own.)

# v1.4.1

* Depend on both `toml` and `toml-j0.4` with fallback from the latter to the
  former when the latter crashes.

# v1.4.0

* Ducktype dates to make them compatible with `moment` and other `Date` replacements.

# v1.3.1

* Update docs with new toml module.

# v1.3.0

* Switch from `toml` to `toml-j0.4`, which is between 20x and 200x faster.
  (The larger the input, the faster it is compared to `toml`).

# v1.2.0

* Return null when passed in null as the top level object.
* Detect and skip invalid dates and numbers

# v1.1.0

* toJSON transformations are now honored (for everything except Date objects, as JSON represents them as strings).
* Undefined/null values no longer result in exceptions, they now just result in the associated key being elided.

# v1.0.1

* Initial release
