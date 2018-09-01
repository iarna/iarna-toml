
BurntSushi tests are for TOML 0.4.0 and are from <a href="https://github.com/BurntSushi/toml-test">here</a>.<br>
<br>
iarna tests are for TOML 0.5.0 and are from <a href="https://github.com/iarna/iarna-toml/tree/cmc/test/spec-test">here</a>.<br>
<br>
<table>
<tr><th>Test</th><th>@iarna/toml @2.1.0</th><th>toml @2.3.3</th><th>toml-j0.4 @1.1.1</th><th>@sgarciac/bombadil @2.0.0-0</th></tr>

<tr><td>BurntSushi 0.4.0: array-empty</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: array-nospaces</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: array-string-quote-comma-2</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: array-string-quote-comma</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: array-string-with-comma</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: array-table-array-string-backslash</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: arrays-hetergeneous</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: arrays-nested</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: arrays</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: bool</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: comments-at-eof</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: comments-at-eof2</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: comments-everywhere</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: datetime-timezone</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: datetime</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: double-quote-escape</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: empty</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: escaped-escape</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: example</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: float-exponent</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: float-underscore</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: float</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: implicit-and-explicit-after</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: implicit-and-explicit-before</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: implicit-groups</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: inline-table</td>
<td>pass</td><td><b>FAIL</b></td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: integer-underscore</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: integer</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: key-equals-nospace</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: key-numeric</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: key-space</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: key-special-chars</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: keys-with-dots</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: long-float</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: long-integer</td>
<td>pass</td><td><b>FAIL</b></td><td><b>FAIL</b></td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: multiline-string</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: raw-multiline-string</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: raw-string</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: string-empty</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: string-escapes</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: string-nl</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: string-simple</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: string-with-pound</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: table-array-implicit</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: table-array-many</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: table-array-nest</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: table-array-one</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: table-array-table-array</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: table-empty</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: table-no-eol</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: table-sub-empty</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: table-whitespace</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: table-with-literal-string</td>
<td>pass</td><td>pass</td><td><b>FAIL</b></td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: table-with-pound</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: table-with-single-quotes</td>
<td>pass</td><td>pass</td><td><b>FAIL</b></td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: unicode-escape</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: unicode-literal</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: array-mixed-types-arrays-and-ints</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: array-mixed-types-ints-and-floats</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: array-mixed-types-strings-and-ints</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: datetime-malformed-no-leads</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: datetime-malformed-no-secs</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: datetime-malformed-no-t</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: datetime-malformed-with-milli</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: duplicate-key-table</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: duplicate-keys</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: duplicate-tables</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: empty-implicit-table</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: empty-table</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: float-leading-zero-neg</td>
<td>pass</td><td><b>FAIL</b></td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: float-leading-zero-pos</td>
<td>pass</td><td><b>FAIL</b></td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: float-leading-zero</td>
<td>pass</td><td><b>FAIL</b></td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: float-no-leading-zero</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: float-no-trailing-digits</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: float-underscore-after-point</td>
<td>pass</td><td><b>FAIL</b></td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: float-underscore-after</td>
<td>pass</td><td><b>FAIL</b></td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: float-underscore-before-point</td>
<td>pass</td><td><b>FAIL</b></td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: float-underscore-before</td>
<td>pass</td><td><b>FAIL</b></td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: inline-table-linebreak</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: integer-leading-zero-neg</td>
<td>pass</td><td><b>FAIL</b></td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: integer-leading-zero-pos</td>
<td>pass</td><td><b>FAIL</b></td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: integer-leading-zero</td>
<td>pass</td><td><b>FAIL</b></td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: integer-underscore-after</td>
<td>pass</td><td><b>FAIL</b></td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: integer-underscore-before</td>
<td>pass</td><td><b>FAIL</b></td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: integer-underscore-double</td>
<td>pass</td><td><b>FAIL</b></td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: key-after-array</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: key-after-table</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: key-empty</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: key-hash</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: key-newline</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: key-no-eol</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: key-open-bracket</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: key-single-open-bracket</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: key-space</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: key-start-bracket</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: key-two-equals</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: llbrace</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: rrbrace</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: string-bad-byte-escape</td>
<td>pass</td><td><b>FAIL</b></td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: string-bad-escape</td>
<td>pass</td><td><b>FAIL</b></td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: string-bad-uni-esc</td>
<td>pass</td><td><b>FAIL</b></td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: string-byte-escapes</td>
<td>pass</td><td><b>FAIL</b></td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: string-no-close</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: table-array-implicit</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: table-array-malformed-bracket</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: table-array-malformed-empty</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: table-empty</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: table-nested-brackets-close</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: table-nested-brackets-open</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: table-whitespace</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: table-with-pound</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: text-after-array-entries</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: text-after-integer</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: text-after-string</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: text-after-table</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: text-before-array-separator</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>BurntSushi 0.4.0: should throw: text-in-array</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>iarna 0.5.0: array-1</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: array-2</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: array-3</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: array-4</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: array-5</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: array-7</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: array-8</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: array-of-tables-1</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: array-of-tables-2</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: array-of-tables-3</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: boolean-1</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: boolean-2</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: case-sensitive</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: comment-mid-array</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: comment</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: date-local-1</td>
<td>pass</td><td><b>FAIL</b></td><td><b>FAIL</b></td><td><b>FAIL</b></td>
</tr>
<tr><td>iarna 0.5.0: date-time-1</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: date-time-2</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: date-time-3</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: date-time-4</td>
<td>pass</td><td><b>FAIL</b></td><td><b>FAIL</b></td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: date-time-5</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: date-time-6</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: date-time-local-1</td>
<td>pass</td><td><b>FAIL</b></td><td><b>FAIL</b></td><td><b>FAIL</b></td>
</tr>
<tr><td>iarna 0.5.0: date-time-local-2</td>
<td>pass</td><td><b>FAIL</b></td><td><b>FAIL</b></td><td><b>FAIL</b></td>
</tr>
<tr><td>iarna 0.5.0: dotted-keys-1</td>
<td>pass</td><td><b>FAIL</b></td><td><b>FAIL</b></td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: dotted-keys-2</td>
<td>pass</td><td><b>FAIL</b></td><td><b>FAIL</b></td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: dotted-keys-3</td>
<td>pass</td><td><b>FAIL</b></td><td><b>FAIL</b></td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: empty-key-name-1</td>
<td>pass</td><td><b>FAIL</b></td><td><b>FAIL</b></td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: empty-key-name-2</td>
<td>pass</td><td><b>FAIL</b></td><td><b>FAIL</b></td><td><b>FAIL</b></td>
</tr>
<tr><td>iarna 0.5.0: extend-dotted-object</td>
<td>pass</td><td><b>FAIL</b></td><td><b>FAIL</b></td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: float-1</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: float-10</td>
<td>pass</td><td><b>FAIL</b></td><td><b>FAIL</b></td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: float-12</td>
<td>pass</td><td><b>FAIL</b></td><td><b>FAIL</b></td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: float-13</td>
<td>pass</td><td><b>FAIL</b></td><td><b>FAIL</b></td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: float-14</td>
<td>pass</td><td><b>FAIL</b></td><td><b>FAIL</b></td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: float-15</td>
<td>pass</td><td><b>FAIL</b></td><td><b>FAIL</b></td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: float-2</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: float-3</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: float-4</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: float-5</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: float-6</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: float-7</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: float-8</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: float-9</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: int-1</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: int-2</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: int-3</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: int-3a</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: int-3b</td>
<td>pass</td><td><b>FAIL</b></td><td><b>FAIL</b></td><td><b>FAIL</b></td>
</tr>
<tr><td>iarna 0.5.0: int-4</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: int-5</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: int-6</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: int-7</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: int-bin1</td>
<td>pass</td><td><b>FAIL</b></td><td><b>FAIL</b></td><td><b>FAIL</b></td>
</tr>
<tr><td>iarna 0.5.0: int-hex1</td>
<td>pass</td><td><b>FAIL</b></td><td><b>FAIL</b></td><td><b>FAIL</b></td>
</tr>
<tr><td>iarna 0.5.0: int-hex2</td>
<td>pass</td><td><b>FAIL</b></td><td><b>FAIL</b></td><td><b>FAIL</b></td>
</tr>
<tr><td>iarna 0.5.0: int-hex3</td>
<td>pass</td><td><b>FAIL</b></td><td><b>FAIL</b></td><td><b>FAIL</b></td>
</tr>
<tr><td>iarna 0.5.0: int-max</td>
<td>pass</td><td><b>FAIL</b></td><td><b>FAIL</b></td><td><b>FAIL</b></td>
</tr>
<tr><td>iarna 0.5.0: int-min</td>
<td>pass</td><td><b>FAIL</b></td><td><b>FAIL</b></td><td><b>FAIL</b></td>
</tr>
<tr><td>iarna 0.5.0: int-oct1</td>
<td>pass</td><td><b>FAIL</b></td><td><b>FAIL</b></td><td><b>FAIL</b></td>
</tr>
<tr><td>iarna 0.5.0: int-oct2</td>
<td>pass</td><td><b>FAIL</b></td><td><b>FAIL</b></td><td><b>FAIL</b></td>
</tr>
<tr><td>iarna 0.5.0: key-value-pair-1</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: key-value-pair-2</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: key-value-pair-3</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: key-value-pair-4</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: key-value-pair-5</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: key-value-pair-6</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: key-value-pair-7</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: key-value-pair-8</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: quoted-basic-keys-1</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: quoted-literal-keys-1</td>
<td>pass</td><td>pass</td><td><b>FAIL</b></td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: readme-example</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: string-basic-multiline-1</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: string-basic-multiline-2</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: string-basic-multiline-3</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: string-basic-multiline-4</td>
<td>pass</td><td><b>FAIL</b></td><td><b>FAIL</b></td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: string-basic</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: string-escape-1</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: string-escape-2</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: string-escape-3</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: string-escape-4</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: string-escape-5</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: string-escape-6</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: string-escape-7</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: string-escape-8</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: string-escape-9</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: string-literal-1</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: string-literal-2</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: string-literal-3</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: string-literal-4</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: string-literal-multiline-1</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: string-literal-multiline-2</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: table-1</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: table-2</td>
<td>pass</td><td><b>FAIL</b></td><td><b>FAIL</b></td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: table-3</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: table-4</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: table-5</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: table-6</td>
<td>pass</td><td>pass</td><td><b>FAIL</b></td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: table-7</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: table-inline-1</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: table-inline-2</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: table-inline-3</td>
<td>pass</td><td><b>FAIL</b></td><td><b>FAIL</b></td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: table</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: time-1</td>
<td>pass</td><td><b>FAIL</b></td><td><b>FAIL</b></td><td><b>FAIL</b></td>
</tr>
<tr><td>iarna 0.5.0: time-2</td>
<td>pass</td><td><b>FAIL</b></td><td><b>FAIL</b></td><td><b>FAIL</b></td>
</tr>
<tr><td>iarna 0.5.0: should throw: array-7</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: should throw: array-of-tables-1</td>
<td>pass</td><td><b>FAIL</b></td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: should throw: array-of-tables-2</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: should throw: bare-key-1</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>iarna 0.5.0: should throw: bare-key-2</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>iarna 0.5.0: should throw: bare-key-3</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>iarna 0.5.0: should throw: int-0-padded</td>
<td>pass</td><td><b>FAIL</b></td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>iarna 0.5.0: should throw: key-value-pair-1</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>iarna 0.5.0: should throw: multiple-dot-key</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: should throw: multiple-key</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: should throw: no-key-name</td>
<td>pass</td><td>pass</td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>iarna 0.5.0: should throw: string-basic-control-1</td>
<td>pass</td><td><b>FAIL</b></td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>iarna 0.5.0: should throw: string-basic-control-2</td>
<td>pass</td><td><b>FAIL</b></td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>iarna 0.5.0: should throw: string-basic-control-3</td>
<td>pass</td><td><b>FAIL</b></td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>iarna 0.5.0: should throw: string-basic-control-4</td>
<td>pass</td><td><b>FAIL</b></td><td><b>FAIL</b></td><td><b>FAIL</b></td>
</tr>
<tr><td>iarna 0.5.0: should throw: string-basic-multiline-control-1</td>
<td>pass</td><td><b>FAIL</b></td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>iarna 0.5.0: should throw: string-basic-multiline-control-2</td>
<td>pass</td><td><b>FAIL</b></td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>iarna 0.5.0: should throw: string-basic-multiline-control-3</td>
<td>pass</td><td><b>FAIL</b></td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>iarna 0.5.0: should throw: string-basic-multiline-control-4</td>
<td>pass</td><td><b>FAIL</b></td><td><b>FAIL</b></td><td><b>FAIL</b></td>
</tr>
<tr><td>iarna 0.5.0: should throw: string-basic-multiline-out-of-range-unicode-escape-1</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: should throw: string-basic-multiline-out-of-range-unicode-escape-2</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: should throw: string-basic-multiline-unknown-escape</td>
<td>pass</td><td><b>FAIL</b></td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>iarna 0.5.0: should throw: string-basic-out-of-range-unicode-escape-1</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: should throw: string-basic-out-of-range-unicode-escape-2</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: should throw: string-basic-unknown-escape</td>
<td>pass</td><td><b>FAIL</b></td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>iarna 0.5.0: should throw: string-literal-control-1</td>
<td>pass</td><td><b>FAIL</b></td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>iarna 0.5.0: should throw: string-literal-control-2</td>
<td>pass</td><td><b>FAIL</b></td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>iarna 0.5.0: should throw: string-literal-control-3</td>
<td>pass</td><td><b>FAIL</b></td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>iarna 0.5.0: should throw: string-literal-control-4</td>
<td>pass</td><td><b>FAIL</b></td><td><b>FAIL</b></td><td><b>FAIL</b></td>
</tr>
<tr><td>iarna 0.5.0: should throw: string-literal-multiline-control-1</td>
<td>pass</td><td><b>FAIL</b></td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>iarna 0.5.0: should throw: string-literal-multiline-control-2</td>
<td>pass</td><td><b>FAIL</b></td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>iarna 0.5.0: should throw: string-literal-multiline-control-3</td>
<td>pass</td><td><b>FAIL</b></td><td>pass</td><td><b>FAIL</b></td>
</tr>
<tr><td>iarna 0.5.0: should throw: string-literal-multiline-control-4</td>
<td>pass</td><td><b>FAIL</b></td><td><b>FAIL</b></td><td><b>FAIL</b></td>
</tr>
<tr><td>iarna 0.5.0: should throw: table-1</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
<tr><td>iarna 0.5.0: should throw: table-2</td>
<td>pass</td><td>pass</td><td>pass</td><td>pass</td>
</tr>
</table>
