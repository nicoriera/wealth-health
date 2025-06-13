import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";
import CreateEmployeePage from "../CreateEmployeePage";
import employeeReducer from "../../features/employees/employeeSlice";

// Mock problematic modules
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
  NavLink: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

vi.mock("@nicoriera/react-modal-converted", () => ({
  default: ({
    children,
    isOpen,
    onClose,
  }: {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
  }) =>
    isOpen ? (
      <div data-testid="modal">
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    ) : null,
}));

// Helper to create a test store
const createTestStore = () => {
  return configureStore({
    reducer: {
      employees: employeeReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

// Helper to render with providers
const renderWithProviders = (component: React.ReactElement) => {
  const store = createTestStore();
  return render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>{component}</I18nextProvider>
    </Provider>
  );
};

describe("CreateEmployeePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should display the title and the form", () => {
    renderWithProviders(<CreateEmployeePage />);

    // Check the title
    expect(screen.getByText(/créer un nouvel employé/i)).toBeInTheDocument();

    // Check the submit button
    expect(
      screen.getByRole("button", { name: /enregistrer|save/i })
    ).toBeInTheDocument();
  });

  it("should display the submit button", () => {
    renderWithProviders(<CreateEmployeePage />);

    expect(
      screen.getByRole("button", { name: /save employee|enregistrer/i })
    ).toBeInTheDocument();
  });

  it("should allow filling the first name field", async () => {
    const user = userEvent.setup();
    renderWithProviders(<CreateEmployeePage />);

    // Use a more specific selector
    const firstNameInput = screen.getByRole("textbox", {
      name: /prénom|first name/i,
    });

    await user.type(firstNameInput, "John");
    expect(firstNameInput).toHaveValue("John");
  });

  it("should have a correct form structure", () => {
    renderWithProviders(<CreateEmployeePage />);

    // Check for the presence of essential form elements
    expect(screen.getByLabelText(/prénom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^nom$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date de naissance/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/rue/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /enregistrer|save/i })
    ).toBeInTheDocument();
  });
});
