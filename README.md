# @iarna/toml

JSON-like bindings for TOML.

## Example

```
var TOML = require('@iarna/toml')
var obj = TOML.parse(`[abc]
foo = 123
bar = [1,2,3]`)
/* obj =
   {abc: {foo: 123, bar: [1,2,3]}}
*/
var str = TOML.stringify(obj)
/* str =
   [abc]
   foo = 123
   bar = [ 1, 2, 3 ]
*/
```

The parser is provided by [`toml`](https://npmjs.com/package/toml). We provide our own stringifier.

## toJSON

If available, `TOML.stringify` will call the `toJSON` method on objects to transform
them before trying to serialize them, much as `JSON.stringify` does.

There is one exception to this, `toJSON` is not called for `Date` objects
because `JSON` represents dates as strings and TOML can represent them natively.

## What's Missing

* Any way to produce comments. As a JSON stand-in I'm not too worried about this.
* Error reporting in stringification that's not terrible.  Right now it's
  basically "it broke".  Making this better will not be difficult. Error reporting
  is important because there are datastructures TOML can't represent. 

## Tests

The tests for the stringifier are made up of two parts:

First, we verify that we can round-trip all of the examples provided in the toml spec repository. They were fetched as of
[183273af30102704a103f206f974636967c4da6d](https://github.com/toml-lang/toml/tree/183273af30102704a103f206f974636967c4da6d)
and specifically are:

* https://github.com/toml-lang/toml/tree/183273af30102704a103f206f974636967c4da6d/examples
* https://github.com/toml-lang/toml/tree/183273af30102704a103f206f974636967c4da6d/tests

Second, many tests are borrowed from
[@othiym23](https://github.com/othiym23)'s
[toml-stream](https://npmjs.com/package/toml-stream) module. They were fetched as of
[b6f1e26b572d49742d49fa6a6d11524d003441fa](https://github.com/othiym23/toml-stream/tree/b6f1e26b572d49742d49fa6a6d11524d003441fa/test).
