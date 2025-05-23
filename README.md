# wealth-health

> Monorepo containing the HRnet application migrated from jQuery to React, including performance benchmarks and reusable components.

## Table of Contents

- [Overview](#overview)
- [Test Environment](#test-environment)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
- [Documentation](#documentation)
- [Best Practices](#best-practices)
- [Contributing](#contributing)
- [License](#license)

## Overview

The HRnet application provides a user interface for employee management. This monorepo includes:

- **wealth_health_front**: React frontend with Tailwind CSS and Lighthouse performance optimizations.
- **packages/react-modal-converted**: A converted React version of a modal component (story-driven).
- **docs**: Architecture, conventions, and performance reports (Lighthouse).

## Test Environment

- **Browser**: Chrome 114.0.0 (MacBook Pro M1, macOS Ventura 14)
- **Network**: Wi-Fi (100 Mbps down / 20 Mbps up)
- **Lighthouse**: v12.5.1 (production builds)

## Getting Started

### Prerequisites

- Node.js >= 14.x
- npm or yarn

### Installation

```bash
# Install root dependencies (if using workspace)
npm install

# Install and start frontend
cd wealth_health_front
npm install
npm start

# Optionally, open docs
open docs/index.html
```

## Folder Structure

```
wealth_health/
├── docs/
│   ├── architecture.md
│   ├── conventions.md
│   └── performance/comparatif.md
├── packages/
│   └── react-modal-converted/
│       ├── .storybook/
│       └── src/
└── wealth_health_front/
    ├── public/
    └── src/
        ├── components/
        ├── features/
        └── store/
```

## Available Scripts

From the project root (adapt `--prefix` or `cd` into subfolders):

- `npm start` — start React frontend (wealth_health_front)
- `npm run storybook` — launch component library (react-modal-converted)
- `npm test` — run unit tests
- `npm run build` — build production bundle
- `npm run lint` — run ESLint

## Documentation

- **Architecture & Conventions**: `docs/architecture.md`, `docs/conventions.md`
- **Performance Comparison**: `docs/performance/comparatif.md`

## Best Practices

- Follow SOLID and DRY principles in code.
- Use React functional components with Hooks and Tailwind CSS.
- Enforce TypeScript typing; avoid `any`.
- Optimize bundle size with code splitting, lazy loading, and caching.
- Ensure accessibility (a11y) and performance (Lighthouse scores).

## Contributing

Please fork the repository and create a pull request with descriptive commits following Conventional Commits.

## License

MIT © wealth-health
