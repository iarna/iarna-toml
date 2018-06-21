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
