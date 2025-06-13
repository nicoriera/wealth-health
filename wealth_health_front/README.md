# HRnet – Wealth Health

HRnet is a modern employee management application designed for an optimal user experience on both **desktop and mobile**. The interface adapts automatically: table view on desktop, **card view on mobile**, with sticky pagination and action buttons for maximum accessibility. The app is robust, accessible, well-tested, and fully internationalized (French/English).

## Features

- 🌐 Internationalization (English/French)
- 📱 **Responsive design**: table on desktop, cards on mobile
- 📋 Employee list with **sticky pagination** on mobile
- ➕ Sticky action buttons (add, save) on mobile
- 🔍 Global search across all columns (instant filtering)
- 📝 Create employee with advanced validation
- 💾 Persistent data storage (Redux Persist)
- 🎨 Modern UI with animations and reusable components
- ♿ **Accessibility-first** (a11y)
- ✅ **Robust tests** (Vitest): responsive, accessibility, search, pagination, etc.

## Tech Stack

- React 19
- TypeScript
- Vite
- Redux Toolkit & Redux Persist
- React Router DOM
- React Hook Form
- TanStack Table
- React DatePicker
- Tailwind CSS
- i18next
- Custom Modal Component (@nicoriera/react-modal-converted)

## Prerequisites

- Node.js (latest LTS recommended)
- npm or yarn

## Getting Started

1. **Clone the repository**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173)

## Available Scripts

- `npm run dev` – Start the development server
- `npm run build` – Build for production
- `npm run lint` – Run ESLint
- `npm run preview` – Preview the production build
- `npm run test` – Run all unit tests
- `npm run test:watch` – Run tests in watch mode
- `npm run test:coverage` – Generate coverage report

## Project Structure

```
src/
├── assets/         # Static assets
├── components/     # Reusable components (cards, table, pagination, etc.)
│   └── __tests__/  # Component unit tests
├── features/       # Business logic (employees, etc.)
│   └── employees/  # Employee feature
│       └── __tests__/  # Feature tests
├── lib/            # Utilities and constants
├── locales/        # i18n translation files
├── pages/          # Main pages
│   └── __tests__/  # Page integration tests
├── store/          # Redux configuration
└── test/           # Test utilities and setup
```

## Testing

The app is covered by **unit and integration tests** using **Vitest** and Testing Library.

- **Tested behaviors**: responsive (cards/table, sticky), accessibility, global search, pagination, user actions, etc.
- **Robustness**: tests simulate real user interactions (typing, navigation, resize), check accessibility and UI consistency.
- **Coverage goals**:
  - Components: ≥ 90%
  - Redux slices: ≥ 95%
  - Pages: ≥ 80%
  - Utilities: ≥ 95%

### Running tests

```bash
npm run test           # All tests
npm run test:watch     # Watch mode
npm run test:coverage  # Coverage report
```

### Writing tests

See [`src/test/README.md`](src/test/README.md) for best practices and examples.

## Contributing

1. Fork the repo
2. Create your branch (`git checkout -b feature/MyFeature`)
3. Commit (`git commit -m 'feat: MyFeature'`)
4. Push (`git push origin feature/MyFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
