# v1.1.0

* toJSON transformations are now honored (for everything except Date objects, as JSON represents them as strings).
* Undefined/null values no longer result in exceptions, they now just result in the associated key being elided.

# v1.0.1

* Initial release
