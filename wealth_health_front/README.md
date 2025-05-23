# HRnet - Wealth Health

HRnet is a modern employee management system built with React, TypeScript, and Vite. This application allows HR administrators to manage employee records efficiently through a user-friendly interface.

## Features

- 🌐 Internationalization support (English/French)
- 📝 Create new employee records with comprehensive form validation
- 📋 View and manage employee list with advanced table features
- 🔍 Search and filter capabilities
- 📱 Responsive design with Tailwind CSS
- 💾 Persistent data storage using Redux Persist
- 🎨 Modern UI with custom animations
- ♿ Accessibility-focused development

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

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── assets/         # Static assets
├── components/     # Reusable components
├── features/       # Feature-specific components and logic
│   └── employees/  # Employee management feature
├── lib/           # Utilities and constants
├── locales/       # i18n translation files
├── pages/         # Page components
└── store/         # Redux store configuration
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
