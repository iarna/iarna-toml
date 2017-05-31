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
