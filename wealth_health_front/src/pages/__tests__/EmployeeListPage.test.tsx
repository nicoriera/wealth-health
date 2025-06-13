import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";
import EmployeeListPage from "../EmployeeListPage";
import employeeReducer, {
  Employee,
} from "../../features/employees/employeeSlice";
import { act } from "react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const mockEmployees: Employee[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: "01/01/1990",
    startDate: "01/01/2020",
    street: "123 Main St",
    city: "Paris",
    state: "FR",
    zipCode: "75000",
    department: "Engineering",
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    dateOfBirth: "02/02/1985",
    startDate: "02/02/2021",
    street: "456 Side St",
    city: "Lyon",
    state: "FR",
    zipCode: "69000",
    department: "Sales",
  },
];

function setMobileWidth(isMobile = true) {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: isMobile ? 375 : 1024,
  });
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: isMobile && query.includes("max-width"),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
  act(() => {
    window.dispatchEvent(new Event("resize"));
  });
}

function renderWithProviders(employees = mockEmployees) {
  const store = configureStore({
    reducer: { employees: employeeReducer },
    preloadedState: { employees: { employees } },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
  return render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <EmployeeListPage />
        </BrowserRouter>
      </I18nextProvider>
    </Provider>
  );
}

describe("EmployeeListPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should display cards and sticky pagination on mobile", () => {
    setMobileWidth(true);
    renderWithProviders();
    // Les cards sont présentes
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();
    // Pagination sticky présente
    expect(document.querySelector(".fixed")).toBeInTheDocument();
  });

  it("should display table on desktop", () => {
    setMobileWidth(false);
    renderWithProviders();
    // Le tableau est présent (role table)
    expect(screen.getByRole("table")).toBeInTheDocument();
    // Les noms sont présents
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();
  });

  it("should display the add button", () => {
    renderWithProviders();
    expect(
      screen.getByRole("button", { name: /ajouter|add/i })
    ).toBeInTheDocument();
  });

  it("should display no employees message if list is empty", () => {
    setMobileWidth(true);
    renderWithProviders([]);
    expect(screen.getByText(/aucun employé trouvé/i)).toBeInTheDocument();
  });

  it("should filter employees with search", async () => {
    setMobileWidth(false);
    renderWithProviders();
    const searchInput = screen.getByPlaceholderText(
      /recherche|search/i
    ) as HTMLInputElement;
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();
    // Filtre sur "Jane" avec userEvent pour simuler la saisie réelle
    await userEvent.type(searchInput, "Jane");
    // Attendre le debounce (300ms) + un petit délai de rendu
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 400));
    });
    // Attendre que "John" disparaisse du DOM (filtrage effectif)
    await waitFor(
      () => {
        expect(screen.queryByText("John")).not.toBeInTheDocument();
      },
      { timeout: 1500 }
    );
    expect(screen.getByText("Jane")).toBeInTheDocument();
  });
});
