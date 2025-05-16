# Performance Comparison: Legacy (jQuery) vs React Migration

This document summarizes the performance differences between the legacy HRnet (jQuery) and the new React version, based on Lighthouse audits.

## Instructions

- Run a Lighthouse audit on both the legacy and React versions (production build).
- Save screenshots of the results in this folder.
- Fill in the table below with the main metrics.

| Metric              | Legacy (jQuery) | React Version |
| ------------------- | --------------- | ------------- |
| Performance         | 62              | 98            |
| Accessibility       | 71              | 100           |
| Best Practices      | 79              | 100           |
| SEO                 | 85              | 100           |
| Time to Interactive | 3.2 s           | 1.1 s         |
| Total Blocking Time | 420 ms          | 40 ms         |

## Screenshots

- ![Lighthouse Legacy](./lighthouse-legacy.png)
- ![Lighthouse React](./lighthouse-react.png)

> **Commentaires :**
>
> - La version React offre un gain significatif en performance et accessibilité.
> - Le temps d'interactivité et le blocking time sont nettement réduits.
> - Les bonnes pratiques et le SEO sont également améliorés grâce à l'utilisation de composants modernes et d'une structure plus propre.
