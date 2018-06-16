# Known Bugs:

* Current string literals are supported as key names. This is not valid per TOML 0.4:

  > Quoted keys follow the exact same rules as basic strings and allow you to use a much broader set of key names.

* Accessing a higher level table after accessing a deeper attribute is valid. The following should not crash:

  ```toml
  [a.b]
  c = 1

  [a]
  d = 2
  ```

* Invalid unicode should crash. Currently we catch `String.fromCodePoint` errors and rethrow them, but other
  sequences are invalid like \uD800 which becomes the Unicode Replacement Char, but probably should crash instead.
* Empty bare keys are errors, eg [.abc] or [abc.] or [abc..def] or [] should
  crash.  Versus ["".abc] or [abc.""] or [abc."".def], or [""] which are all valid. That is, `value` should not
  return an empty string if it didn't match anything. Possibly should stop initializing this.state.buf to ''.
* Multiline \ trimming nees to support CRs
* Multline post opener trimming needs to support CRs
* Strings MAY NOT contain: the control characters (U+0000 to U+001F
* toml-j0.4 and toml both think that keys in inline tables may not be quoted. The spec doesn't say much:

  > Key/value pairs take the same form as key/value pairs in standard tables.

  But keys in standard tables can be double quoted, and the ABNF definitely
  thinks they can be quoted.  I think the others are _wrong_ here.
