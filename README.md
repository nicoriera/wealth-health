# wealth-health

> Monorepo for the Wealth Health HR application, modernized with React, TypeScript, and Tailwind CSS. Includes a reusable component library and technical documentation.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
- [Documentation](#documentation)
- [Best Practices](#best-practices)
- [Contributing](#contributing)
- [License](#license)

## Overview

This monorepo contains:

- **wealth_health_front**: Modern React frontend (Vite, TypeScript, Tailwind CSS, state management, i18n, Vitest tests).
- **packages/react-modal-converted**: Reusable React component library (e.g., Modal), fully tested.
- **docs**: Technical documentation, conventions, performance reports.

## Tech Stack

- **React 18+** (functional, hooks)
- **TypeScript** (strict typing)
- **Vite** (fast build tool)
- **Tailwind CSS** (utility-first design system)
- **Vitest** (unit testing)
- **Redux Toolkit** (state management, if applicable)
- **React Router** (routing)
- **i18next** (internationalization)
- **ESLint/Prettier** (code quality and formatting)

## Getting Started

### Prerequisites

- Node.js >= 16.x
- npm >= 8.x or yarn

### Installation

```bash
# Install root dependencies (monorepo)
npm install

# Install and start the frontend
cd wealth_health_front
npm install
npm run dev
```

> Documentation is available in Markdown files inside the `docs/` folder (e.g., `docs/architecture.md`, `docs/conventions.md`).

## Folder Structure

```
wealth_health/
├── docs/
│   ├── architecture.md
│   ├── conventions.md
│   └── performance/
├── packages/
│   └── react-modal-converted/
│       ├── src/
│       └── stories/
└── wealth_health_front/
    ├── public/
    └── src/
        ├── assets/
        ├── components/
        ├── features/
        ├── lib/
        ├── locales/
        ├── pages/
        ├── store/
        └── types/
```

## Available Scripts

From the project root:

- `npm run dev --workspace=wealth_health_front` — start the React frontend
- `npm run test --workspace=wealth_health_front` — run unit tests (Vitest)
- `npm run build --workspace=wealth_health_front` — build for production
- `npm run lint --workspace=wealth_health_front` — check code quality
- `npm run storybook --workspace=react-modal-converted` — launch Storybook for the component library

## Documentation

- **Architecture & Conventions**: `docs/architecture.md`, `docs/conventions.md`
- **Performance**: `docs/performance/comparatif.md`

## Best Practices

- Follow SOLID and DRY principles.
- Use React functional components with hooks.
- Enforce strict TypeScript typing; avoid `any`.
- Use Tailwind CSS for styling, mobile-first.
- Optimize bundle size (code splitting, lazy loading).
- Write unit tests with Vitest (see `src/components/__tests__`).
- Prioritize accessibility (a11y): semantic HTML, ARIA, keyboard navigation.
- Secure the frontend (input validation/sanitation).
- Internationalize the UI (i18next, files in `src/locales/`).
- Follow naming and code organization conventions (see `docs/conventions.md`).

## Contributing

Fork the repository and open a pull request with descriptive commits following the Conventional Commits specification.

## License

MIT © wealth-health
