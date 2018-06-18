# Optimize Parser

* There are some debugging assertions left in the main parser, these should be moved to a subclass.
* Make the whole debugging parser thing work as a mixin instead of as a superclass.

# To support TOML 1.0 (when it comes)

While there has been no updated spec since 0.4, there have been changes to
in preparation for a new release.  I intend to develop these in a branch with releases
to `@iarna/toml@2.x` tagged as `prerelease`.

* Keys may be literal as well as basic strings
* dotted keys: `foo.bar = 23` ~~~ `[foo]\nbar = 23`.
* dotted keys, also in inline: `example = { foo.bar = 23 }` ~~~ `example = { foo: { bar: 23 } }`
* literal U+007F is not allowed (must be escaped) (like U+0000 to U+001F)
* Hexidecimal, octal and binary literals
* Leading zeros are not allowed. -0 and +0 are valid.
* inf and nan support
* Datetimes can use a space instead of a T to separate them.
* Local date-times (without a timezone) are allowed
* Dates and times individually are valid, eg 1979-05-27 or 07:32:00
* The backslash at the end of line in multi-line strings is allowed have
  whitespace after it up to the newline.
  It's an error to have whitespace and then a non-whitespace char before the
  newline.
* Trailing commas in arrays are valid
