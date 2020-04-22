### v13.13.0

|   | @iarna/toml |   | toml-j0.4 |   | toml |   | @sgarciac/bombadil |   | @ltd/j-toml |   | fast-toml |   |
| - | ----------- | - | --------- | - | ---- | - | ------------------ | - | ----------- | - | --------- | - |
| Overall | 28MB/sec | 0.35% | 6.5MB/sec | 0.25% | 0.2MB/sec | 0.70% | - | - | 35MB/sec | 0.23% | - | - |
| Spec Example: v0.4.0 | 26MB/sec | 0.37% | 10MB/sec | 0.27% | 1MB/sec | 0.42% | 1.2MB/sec | 0.95% | 28MB/sec | 0.31% | - | - |
| Spec Example: Hard Unicode | 64MB/sec | 0.59% | 18MB/sec | 0.12% | 2MB/sec | 0.20% | 0.6MB/sec | 0.53% | 68MB/sec | 0.31% | 78MB/sec | 0.28% |
| Types: Array, Inline | 7.3MB/sec | 0.60% | 4MB/sec | 0.16% | 0.1MB/sec | 0.91% | 1.3MB/sec | 0.81% | 10MB/sec | 0.35% | 9MB/sec | 0.16% |
| Types: Array | 6.8MB/sec | 0.19% | 6.7MB/sec | 0.15% | 0.2MB/sec | 0.79% | 1.2MB/sec | 0.93% | 8.8MB/sec | 0.47% | 27MB/sec | 0.21% |
| Types: Boolean, | 21MB/sec | 0.20% | 9.4MB/sec | 0.17% | 0.2MB/sec | 0.96% | 1.8MB/sec | 0.70% | 16MB/sec | 0.20% | 8.4MB/sec | 0.22% |
| Types: Datetime | 18MB/sec | 0.14% | 11MB/sec | 0.15% | 0.3MB/sec | 0.85% | 1.6MB/sec | 0.45% | 9.8MB/sec | 0.48% | 6.5MB/sec | 0.23% |
| Types: Float | 8.8MB/sec | 0.09% | 5.9MB/sec | 0.14% | 0.2MB/sec | 0.51% | 2.1MB/sec | 0.82% | 14MB/sec | 0.15% | 7.9MB/sec | 0.14% |
| Types: Int | 5.9MB/sec | 0.11% | 4.5MB/sec | 0.28% | 0.1MB/sec | 0.78% | 1.5MB/sec | 0.64% | 10MB/sec | 0.14% | 8MB/sec | 0.17% |
| Types: Literal String, 7 char | 26MB/sec | 0.29% | 8.5MB/sec | 0.32% | 0.3MB/sec | 0.84% | 2.3MB/sec | 1.02% | 23MB/sec | 0.15% | 13MB/sec | 0.15% |
| Types: Literal String, 92 char | 46MB/sec | 0.19% | 11MB/sec | 0.20% | 0.3MB/sec | 0.56% | 12MB/sec | 0.92% | 101MB/sec | 0.17% | 75MB/sec | 0.29% |
| Types: Literal String, Multiline, 1079 char | 22MB/sec | 0.42% | 6.7MB/sec | 0.55% | 0.9MB/sec | 0.78% | 44MB/sec | 1.00% | 350MB/sec | 0.16% | 636MB/sec | 0.16% |
| Types: Basic String, 7 char | 25MB/sec | 0.15% | 7.3MB/sec | 0.18% | 0.2MB/sec | 0.96% | 2.2MB/sec | 1.09% | 14MB/sec | 0.16% | 12MB/sec | 0.22% |
| Types: Basic String, 92 char | 43MB/sec | 0.30% | 7.2MB/sec | 0.16% | 0.1MB/sec | 4.04% | 12MB/sec | 1.33% | 71MB/sec | 0.19% | 70MB/sec | 0.23% |
| Types: Basic String, 1079 char | 24MB/sec | 0.45% | 5.8MB/sec | 0.17% | 0.1MB/sec | 3.64% | 44MB/sec | 1.05% | 93MB/sec | 0.29% | 635MB/sec | 0.28% |
| Types: Table, Inline | 9.7MB/sec | 0.10% | 5.5MB/sec | 0.22% | 0.1MB/sec | 0.87% | 1.4MB/sec | 1.18% | 8.7MB/sec | 0.60% | 8.7MB/sec | 0.22% |
| Types: Table | 7.1MB/sec | 0.14% | 5.6MB/sec | 0.42% | 0.1MB/sec | 0.65% | 1.4MB/sec | 1.11% | 7.4MB/sec | 0.70% | 18MB/sec | 0.20% |
| Scaling: Array, Inline, 1000 elements | 40MB/sec | 0.21% | 2.4MB/sec | 0.19% | 0.1MB/sec | 0.35% | 1.6MB/sec | 1.02% | 17MB/sec | 0.15% | 32MB/sec | 0.16% |
| Scaling: Array, Nested, 1000 deep | 2MB/sec | 0.15% | 1.7MB/sec | 0.26% | 0.3MB/sec | 0.58% | - | - | 1.8MB/sec | 0.74% | 13MB/sec | 0.20% |
| Scaling: Literal String, 40kb | 61MB/sec | 0.18% | 10MB/sec | 0.15% | 3MB/sec | 0.84% | 12MB/sec | 0.51% | 551MB/sec | 0.44% | 19kMB/sec | 0.19% |
| Scaling: Literal String, Multiline, 40kb | 62MB/sec | 0.16% | 5MB/sec | 0.45% | 0.2MB/sec | 1.70% | 11MB/sec | 0.74% | 291MB/sec | 0.24% | 21kMB/sec | 0.22% |
| Scaling: Basic String, Multiline, 40kb | 62MB/sec | 0.18% | 5.8MB/sec | 0.38% | 2.9MB/sec | 0.86% | 11MB/sec | 0.41% | 949MB/sec | 0.44% | 26kMB/sec | 0.16% |
| Scaling: Basic String, 40kb | 59MB/sec | 0.20% | 6.3MB/sec | 0.17% | 0.2MB/sec | 1.95% | 12MB/sec | 0.44% | 508MB/sec | 0.35% | 18kMB/sec | 0.15% |
| Scaling: Table, Inline, 1000 elements | 28MB/sec | 0.12% | 8.2MB/sec | 0.19% | 0.3MB/sec | 0.89% | 2.3MB/sec | 1.14% | 5.3MB/sec | 0.24% | 13MB/sec | 0.20% |
| Scaling: Table, Inline, Nested, 1000 deep | 7.8MB/sec | 0.28% | 5MB/sec | 0.20% | 0.1MB/sec | 0.84% | - | - | 3.2MB/sec | 0.52% | 10MB/sec | 0.23% |
