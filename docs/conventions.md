# Coding & Project Conventions

This document lists the main conventions to follow for the WealthHealth HRnet project.

## General

- Use English for code, comments, and documentation.
- Write commit messages in English, following the Conventional Commits specification.
- Keep code modular, readable, and DRY.

## Naming

- Use descriptive, camelCase for variables and functions.
- Use PascalCase for React components and TypeScript types/interfaces.
- Folder and file names: kebab-case or camelCase (be consistent).

## Structure

- Organize code by feature and type (components, features, pages, store, etc.).
- Create `index.ts` files for easier imports.

## React & TypeScript

- Use functional components and hooks (no class components).
- Prefer strong typing, avoid `any`.
- Use arrow functions.
- Prefer immutable data structures.

## Styling

- Use Tailwind CSS, mobile-first approach.
- Prioritize accessibility (a11y): semantic HTML, ARIA attributes, keyboard navigation.

## Testing

- Write unit tests for reusable components and business logic.
- Follow the FIRST principles (Fast, Isolated, Repeatable, Self-validating, Timely).

## Documentation

- Document all public APIs (props, functions) and provide usage examples.
- Keep the `docs/` folder up-to-date.

> Please update this file as new conventions are adopted.
