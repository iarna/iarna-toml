
Tests are for TOML 1.0.0-rc.1 and are from <a href="https://github.com/iarna/toml-spec-tests">here</a>.<br>
<br>
<table>
<tr><th>Test</th><th>@iarna/toml @2.2.4</th><th>toml @3.0.0</th><th>toml-j0.4 @1.1.1</th><th>@sgarciac/bombadil @2.3.0</th><th>@ltd/j-toml @0.5.107</th><th>fast-toml @0.5.4</th></tr>

<tr><td>TOML 1.0.0-rc.1: qa-array-inline-1000</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: qa-array-inline-nested-1000</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: qa-key-literal-40kb</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: qa-key-string-40kb</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: qa-scalar-literal-40kb</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: qa-scalar-literal-multiline-40kb</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: qa-scalar-string-40kb</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: qa-scalar-string-multiline-40kb</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: qa-table-inline-1000</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: qa-table-inline-nested-1000</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-array-1</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-array-2</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-array-3</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-array-4</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-array-5</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-array-7</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-array-8</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-array-mixed-number-types</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-array-more-mixed-types</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-array-of-tables-1</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-array-of-tables-2</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-array-of-tables-3</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-boolean-1</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-boolean-2</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-case-sensitive</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-comment-mid-array</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-comment-mid-string</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-comment-tab</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-comment</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-date-local-1</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-date-time-1</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-date-time-2</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-date-time-3</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-date-time-4</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-date-time-5</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-date-time-6</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-date-time-local-1</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-date-time-local-2</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-dotted-keys-1</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-dotted-keys-2</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-dotted-keys-3</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-empty-key-name-1</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-empty-key-name-2</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-extend-dotted-object-1</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-extend-dotted-object-2</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-extend-dotted-object-3</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-float-1</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-float-10</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-float-11</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-float-12</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-float-13</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-float-14</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-float-15</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-float-2</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-float-3</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-float-4</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-float-5</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-float-6</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-float-7</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-float-8</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-float-9</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-int-1</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-int-2</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-int-3</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-int-3a</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-int-3b</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-int-4</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-int-5</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-int-6</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-int-7</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-int-bin1</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-int-hex1</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-int-hex2</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-int-hex3</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-int-max</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-int-min</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-int-oct1</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-int-oct2</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-key-value-pair-1</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-key-value-pair-2</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-key-value-pair-3</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-key-value-pair-4</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-key-value-pair-5</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-key-value-pair-6</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-key-value-pair-7</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-key-value-pair-8</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-key-value-pair-9</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-newline-1</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-newline-2</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-newline-3</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-quoted-basic-keys-1</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-quoted-literal-keys-1</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-readme-example</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-string-basic-multiline-1</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-string-basic-multiline-2</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-string-basic-multiline-3</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-string-basic-multiline-4</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-string-basic-multiline-5</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-string-basic-multiline-6</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-string-basic-multiline-7</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-string-basic-multiline-8</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-string-basic-multiline-9</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-string-basic-tab-multiline</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-string-basic-tab</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-string-basic</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-string-escape-1</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-string-escape-2</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-string-escape-3</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-string-escape-4</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-string-escape-5</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-string-escape-6</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-string-escape-7</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-string-escape-8</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-string-escape-9</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-string-literal-1</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-string-literal-2</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-string-literal-3</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-string-literal-4</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-string-literal-multiline-1</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-string-literal-multiline-2</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-string-literal-multiline-3</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-string-literal-multiline-4</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-table-1</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-table-2</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-table-3</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-table-4</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-table-5</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-table-6</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-table-7</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-table-8</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-table-inline-1</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-table-inline-2</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-table-inline-3</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-table</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-time-1</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: spec-time-2</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: array-of-tables-1</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: array-of-tables-2</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: bare-key-1</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: bare-key-2</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: bare-key-3</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: comment-control-1</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: comment-control-2</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: comment-control-3</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: comment-control-4</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: inline-table-imutable-1</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: inline-table-imutable-2</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: inline-table-trailing-comma</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: int-0-padded</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: int-signed-bin</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: int-signed-hex</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: int-signed-oct</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: key-value-pair-1</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: key-value-pair-2</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: multiple-dot-key</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: multiple-key</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: no-key-name</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: string-basic-control-1</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: string-basic-control-2</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: string-basic-control-3</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: string-basic-control-4</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: string-basic-multiline-control-1</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: string-basic-multiline-control-2</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: string-basic-multiline-control-3</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: string-basic-multiline-control-4</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: string-basic-multiline-invalid-backslash</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: string-basic-multiline-out-of-range-unicode-escape-1</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: string-basic-multiline-out-of-range-unicode-escape-2</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: string-basic-multiline-quotes</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: string-basic-multiline-unknown-escape</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: string-basic-out-of-range-unicode-escape-1</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: string-basic-out-of-range-unicode-escape-2</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: string-basic-unknown-escape</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: string-literal-control-1</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: string-literal-control-2</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: string-literal-control-3</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: string-literal-control-4</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: string-literal-multiline-control-1</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: string-literal-multiline-control-2</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: string-literal-multiline-control-3</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: string-literal-multiline-control-4</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: string-literal-multiline-quotes</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: table-1</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: table-2</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: table-3</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: table-4</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: table-invalid-1</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: table-invalid-2</td>
<td class="pass">pass</td><td class="fail"><b>FAIL</b></td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="fail"><b>FAIL</b></td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: table-invalid-3</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
<tr><td>TOML 1.0.0-rc.1: should throw: table-invalid-4</td>
<td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td><td class="pass">pass</td>
</tr>
</table>
