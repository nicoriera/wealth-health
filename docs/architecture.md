# Project Architecture

This document describes the technical architecture of the WealthHealth HRnet project.

## Monorepo Structure

- **/packages/**: Reusable React components (e.g., modal, datepicker)
- **/wealth-health-react/**: Main React application (HRnet)
- **/P12_Front-end/**: Legacy jQuery application (for reference and comparison)

## Packages

- Each package is self-contained, with its own configuration, documentation, and tests.
- Example: `react-modal-converted` (React modal component)

## Main Application (wealth-health-react)

- Organized by feature and type (components, features, pages, store, etc.)
- Uses TypeScript, Vite, Tailwind CSS, and a modern state management solution.

## Conventions

- Functional programming paradigm (no class components)
- Strong typing (TypeScript)
- Mobile-first and accessible UI (Tailwind CSS)
- Documentation and tests for all reusable components

## Diagram

```
wealth_health/
├── packages/
│   └── react-modal-converted/
├── wealth-health-react/
│   └── src/
├── P12_Front-end/
└── docs/
```

> Please update this file as the architecture evolves.
