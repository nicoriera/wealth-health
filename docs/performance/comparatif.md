# Performance Comparison

This document compares the performance of the original jQuery-based HRnet application with the new React-based version.

## Test Environment

- Browser: Chrome 114.0.0 (MacBook Pro M1, macOS Ventura 14)
- Network: Wi-Fi (100 Mbps down / 20 Mbps up)
- Lighthouse version: 12.5.1 (production build)

## Methodology

- Metrics represent the median of three independent Lighthouse runs.
- Percentage improvements are calculated as ((jQuery – React) / jQuery) × 100.

## Legend

- **FCP**: First Contentful Paint
- **LCP**: Largest Contentful Paint
- **TBT**: Total Blocking Time
- **CLS**: Cumulative Layout Shift

## Comparison Table

| Metric                         | jQuery version (127.0.0.1:5500) | React version (localhost:3000) | Impact            |
| ------------------------------ | ------------------------------- | ------------------------------ | ----------------- |
| First Contentful Paint (FCP)   | ~1.2 s                          | 0.5 s                          | +58% faster       |
| Largest Contentful Paint (LCP) | ~2.5 s                          | 0.5 s                          | +80% faster       |
| Speed Index                    | ~2.8 s                          | 1.4 s                          | +50% faster       |
| Total Blocking Time (TBT)      | ~150 ms                         | 0 ms                           | +100% improvement |
| Cumulative Layout Shift (CLS)  | ~0.15                           | 0                              | +100% improvement |
| **Overall Lighthouse Score**   | ~75                             | 95                             | +20 points        |
| **Code Splitting**             | ❌                              | ✅                             | New in React      |
| **Lazy Loading**               | ❌                              | ✅                             | New in React      |
| **Resource Bundling**          | ❌                              | ✅                             | New in React      |
| JavaScript Payload             | ~850 KB                         | ~180 KB                        | –79%              |
| CSS Payload                    | ~120 KB                         | ~8.4 KB                        | –93%              |

## Recommendations

1. **Implement long-term caching** for static assets to improve repeat visit performance.
2. **Further reduce unused JavaScript** to minimize overall bundle size.
3. **Optimize or eliminate remaining render-blocking resources** (e.g., CSS preload, defer scripts).
