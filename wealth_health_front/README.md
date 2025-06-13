# HRnet – Wealth Health

HRnet is a modern employee management system built with React, TypeScript, and Vite. The application enables HR administrators to efficiently manage employee records through a user-friendly and accessible interface.

## Features

- 🌐 Internationalization (English/French)
- 📝 Create new employee records with robust form validation
- 📋 View and manage employee list with advanced table features
- 🔍 Search and filter capabilities
- 📱 Responsive design using Tailwind CSS
- 💾 Persistent data storage with Redux Persist
- 🎨 Modern UI with custom animations
- ♿ Accessibility-first development

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

- Node.js (latest LTS version recommended)
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
   The application will be available at [http://localhost:5173](http://localhost:5173)

## Available Scripts

- `npm run dev` – Start the development server
- `npm run build` – Build for production
- `npm run lint` – Run ESLint
- `npm run preview` – Preview the production build
- `npm run test` – Run unit tests
- `npm run test:watch` – Run tests in watch mode
- `npm run test:coverage` – Generate test coverage report

## Project Structure

```
src/
├── assets/         # Static assets
├── components/     # Reusable components
│   └── __tests__/  # Component tests
├── features/       # Feature-specific components and logic
│   └── employees/  # Employee management feature
│       └── __tests__/  # Feature tests
├── lib/            # Utilities and constants
├── locales/        # i18n translation files
├── pages/          # Page components
│   └── __tests__/  # Page integration tests
├── store/          # Redux store configuration
└── test/           # Test utilities and setup
```

## Testing

This project includes comprehensive unit and integration tests using Vitest and Testing Library.

### Running Tests

```bash
npm run test           # Run all tests
npm run test:watch     # Run tests in watch mode
npm run test:coverage  # Generate coverage report
```

### Test Coverage Goals

- Components: ≥ 90%
- Redux slices: ≥ 95%
- Pages: ≥ 80%
- Utilities: ≥ 95%

### Writing Tests

See [`src/test/README.md`](src/test/README.md) for detailed testing guidelines and examples.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
