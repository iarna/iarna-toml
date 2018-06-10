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
