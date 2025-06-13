import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import employeeReducer from "../features/employees/employeeSlice";

// Interface pour les options de render personnalisées
interface ExtendedRenderOptions extends Omit<RenderOptions, "wrapper"> {
  preloadedState?: unknown;
  store?: EnhancedStore;
}

// Fonction helper pour créer un store de test
export function setupTestStore(preloadedState?: unknown) {
  return configureStore({
    reducer: {
      employees: employeeReducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
}

// Wrapper personnalisé qui inclut tous les providers nécessaires
function AllTheProviders({
  children,
  store,
}: {
  children: React.ReactNode;
  store: EnhancedStore;
}) {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </Provider>
  );
}

// Fonction de render personnalisée qui inclut tous les providers
export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupTestStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <AllTheProviders store={store}>{children}</AllTheProviders>;
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

// Mock data pour les tests
export const mockEmployee = {
  id: "test-id-123",
  firstName: "John",
  lastName: "Doe",
  dateOfBirth: "01/15/1990",
  startDate: "03/10/2023",
  street: "123 Test Street",
  city: "Test City",
  state: "TC",
  zipCode: "12345",
  department: "Engineering",
};

export const mockSelectOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

// Helper pour attendre que les animations/transitions se terminent
export const waitForAnimations = () =>
  new Promise((resolve) => setTimeout(resolve, 100));
