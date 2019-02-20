### v11.10.0

|   | @iarna/toml |   | toml-j0.4 |   | toml |   | @sgarciac/bombadil |   | @ltd/j-toml |   |
| - | ----------- | - | --------- | - | ---- | - | ------------------ | - | ----------- | - |
| Overall | 25MB/sec | 0.55% | 7MB/sec | 1.39% | 0.2MB/sec | 3.47% | - | - | 38MB/sec | 1.37% |
| Spec Example: v0.4.0 | 23MB/sec | 0.87% | 10MB/sec | 0.62% | 1MB/sec | 1.89% | 1.7MB/sec | 1.03% | 35MB/sec | 1.32% |
| Spec Example: Hard Unicode | 57MB/sec | 1.46% | 16MB/sec | 0.66% | 2MB/sec | 2.25% | 0.8MB/sec | 0.57% | 93MB/sec | 1.79% |
| Types: Array, Inline | 7.2MB/sec | 1.60% | 3.2MB/sec | 0.77% | 0.1MB/sec | 1.84% | 1.7MB/sec | 0.56% | 4.1MB/sec | 14.48% |
| Types: Array | 6.9MB/sec | 0.47% | 5.8MB/sec | 0.46% | 0.1MB/sec | 3.67% | 1.4MB/sec | 0.76% | 2.5MB/sec | 8.19% |
| Types: Boolean, | 22MB/sec | 0.85% | 8.5MB/sec | 0.55% | 0.2MB/sec | 1.83% | 2.1MB/sec | 1.29% | 5.6MB/sec | 0.58% |
| Types: Datetime | 18MB/sec | 0.56% | 11MB/sec | 0.80% | 0.3MB/sec | 1.55% | 0.8MB/sec | 0.51% | 4.5MB/sec | 0.66% |
| Types: Float | 9.2MB/sec | 0.71% | 5.2MB/sec | 1.12% | 0.3MB/sec | 2.04% | 2.6MB/sec | 0.86% | 3.7MB/sec | 0.61% |
| Types: Int | 6.4MB/sec | 0.44% | 3.9MB/sec | 0.56% | 0.1MB/sec | 1.65% | 1.7MB/sec | 1.15% | 1.5MB/sec | 4.06% |
| Types: Literal String, 7 char | 26MB/sec | 0.62% | 8.1MB/sec | 1.00% | 0.3MB/sec | 1.48% | 2.9MB/sec | 0.58% | 6MB/sec | 0.52% |
| Types: Literal String, 92 char | 41MB/sec | 0.80% | 11MB/sec | 1.20% | 0.4MB/sec | 2.38% | 15MB/sec | 0.84% | 23MB/sec | 0.58% |
| Types: Literal String, Multiline, 1079 char | 21MB/sec | 0.28% | 7.2MB/sec | 1.62% | 1.3MB/sec | 3.05% | 55MB/sec | 0.53% | 332MB/sec | 0.46% |
| Types: Basic String, 7 char | 26MB/sec | 0.56% | 6.6MB/sec | 0.61% | 0.2MB/sec | 4.70% | 2.7MB/sec | 0.68% | 3.3MB/sec | 0.47% |
| Types: Basic String, 92 char | 41MB/sec | 0.63% | 8MB/sec | 0.51% | 0.1MB/sec | 1.57% | 14MB/sec | 0.66% | 21MB/sec | 0.43% |
| Types: Basic String, 1079 char | 21MB/sec | 0.36% | 6MB/sec | 0.81% | 0.1MB/sec | 1.81% | 51MB/sec | 0.53% | 13MB/sec | 0.62% |
| Types: Table, Inline | 9.8MB/sec | 0.47% | 4.6MB/sec | 0.81% | 0.1MB/sec | 1.82% | 1.7MB/sec | 0.75% | 2.9MB/sec | 4.82% |
| Types: Table | 6.9MB/sec | 0.43% | 4.9MB/sec | 0.46% | 0.1MB/sec | 3.59% | 1.6MB/sec | 0.88% | 4.4MB/sec | 0.53% |
| Scaling: Array, Inline, 1000 elements | 33MB/sec | 2.15% | 2.5MB/sec | 1.07% | 0.1MB/sec | 3.57% | 1.8MB/sec | 0.64% | 8.7MB/sec | 4.12% |
| Scaling: Array, Nested, 1000 deep | 1.6MB/sec | 2.50% | 1.2MB/sec | 0.49% | 0.1MB/sec | 3.62% | - | - | 1MB/sec | 3.79% |
| Scaling: Literal String, 40kb | 56MB/sec | 0.58% | 12MB/sec | 1.03% | 3.6MB/sec | 4.00% | 17MB/sec | 0.54% | 498MB/sec | 0.52% |
| Scaling: Literal String, Multiline, 40kb | 58MB/sec | 0.38% | 6.4MB/sec | 0.54% | 0.2MB/sec | 1.72% | 15MB/sec | 0.74% | 197MB/sec | 0.54% |
| Scaling: Basic String, Multiline, 40kb | 57MB/sec | 1.03% | 7.2MB/sec | 1.22% | 3.4MB/sec | 4.24% | 15MB/sec | 0.75% | 840MB/sec | 0.52% |
| Scaling: Basic String, 40kb | 57MB/sec | 0.43% | 8.6MB/sec | 0.57% | 0.2MB/sec | 1.71% | 17MB/sec | 0.51% | 394MB/sec | 0.54% |
| Scaling: Table, Inline, 1000 elements | 27MB/sec | 0.46% | 7.5MB/sec | 0.71% | 0.3MB/sec | 2.24% | 3MB/sec | 0.74% | 2.3MB/sec | 0.81% |
| Scaling: Table, Inline, Nested, 1000 deep | 7.8MB/sec | 0.61% | 4.3MB/sec | 0.83% | 0.1MB/sec | 2.93% | - | - | 1.2MB/sec | 13.45% |

