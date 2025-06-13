# Unit Testing – WealthHealth Frontend

This guide explains how to run and maintain unit tests for the WealthHealth application.

---

## Test Structure

```
src/
├── components/
│   └── __tests__/
│       ├── Button.test.tsx
│       └── CustomSelect.test.tsx
├── features/
│   └── employees/
│       └── __tests__/
│           └── employeeSlice.test.ts
├── pages/
│   └── __tests__/
│       └── CreateEmployeePage.test.tsx
└── test/
    ├── setup.ts          # Global test configuration
    ├── utils.tsx         # Test utilities and helpers
    └── README.md         # This documentation
```

---

## Running Tests

```bash
npm run test         # Run all tests once
npm run test:watch   # Re-run tests on file changes
npm run test:coverage # Generate a coverage report
```

---

## Tools Used

- **Vitest**: Fast and modern test framework
- **Testing Library**: For testing React components
- **User Event**: For simulating user interactions

---

## Simple Test Example

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Button from "../Button";

describe("Button", () => {
  it("should display the button text", () => {
    render(<Button>Test Button</Button>);
    expect(
      screen.getByRole("button", { name: "Test Button" })
    ).toBeInTheDocument();
  });
});
```

---

## Best Practices

- Use clear and English test descriptions.
- Prefer semantic selectors (`getByRole`, `getByLabelText`).
- Group tests by feature using `describe`.
- Mock external dependencies with `vi.fn()`.

---

## Coverage Report

The report is generated in the `coverage/` folder after running:

```bash
npm run test:coverage
```

---

## Troubleshooting

- For more detailed error output:  
  `npm run test -- --reporter=verbose`
- To inspect the DOM in a test:  
  `screen.debug()`

---

## Useful Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
