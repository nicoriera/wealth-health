import { describe, it, expect } from "vitest";
import employeeReducer, {
  addEmployee,
  selectEmployees,
} from "../employeeSlice";
import type { Employee } from "../employeeSlice";

// Mock employee for tests
const mockEmployee: Employee = {
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

describe("employeeSlice", () => {
  describe("reducer", () => {
    it("should return the initial state", () => {
      const initialState = employeeReducer(undefined, { type: "unknown" });

      expect(initialState.employees).toBeDefined();
      expect(Array.isArray(initialState.employees)).toBe(true);
      // The initial state contains sample employees
      expect(initialState.employees.length).toBeGreaterThan(0);
    });

    it("should add a new employee", () => {
      const initialState = {
        employees: [],
      };

      const actual = employeeReducer(initialState, addEmployee(mockEmployee));

      expect(actual.employees).toHaveLength(1);
      expect(actual.employees[0]).toEqual(mockEmployee);
    });

    it("should add multiple employees", () => {
      const initialState = {
        employees: [mockEmployee],
      };

      const secondEmployee: Employee = {
        ...mockEmployee,
        id: "test-id-456",
        firstName: "Jane",
        lastName: "Smith",
      };

      const actual = employeeReducer(initialState, addEmployee(secondEmployee));

      expect(actual.employees).toHaveLength(2);
      expect(actual.employees[1]).toEqual(secondEmployee);
    });

    it("should not mutate the original state", () => {
      const initialState = {
        employees: [mockEmployee],
      };

      const newEmployee: Employee = {
        ...mockEmployee,
        id: "test-id-789",
        firstName: "Bob",
      };

      const actual = employeeReducer(initialState, addEmployee(newEmployee));

      // The original state must not be modified
      expect(initialState.employees).toHaveLength(1);
      expect(initialState.employees[0].firstName).toBe("John");

      // The new state must contain both employees
      expect(actual.employees).toHaveLength(2);
      expect(actual.employees[1].firstName).toBe("Bob");
    });
  });

  describe("selectors", () => {
    it("should select all employees", () => {
      const state = {
        employees: {
          employees: [mockEmployee],
        },
        _persist: { version: -1, rehydrated: true },
      };

      const result = selectEmployees(state);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(mockEmployee);
    });

    it("should return an empty array if no employees", () => {
      const state = {
        employees: {
          employees: [],
        },
        _persist: { version: -1, rehydrated: true },
      };

      const result = selectEmployees(state);

      expect(result).toHaveLength(0);
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("Employee type validation", () => {
    it("should accept an employee with all required fields", () => {
      const validEmployee: Employee = {
        id: "valid-id",
        firstName: "Valid",
        lastName: "Employee",
        dateOfBirth: "01/01/1980",
        startDate: "01/01/2020",
        street: "Valid Street",
        city: "Valid City",
        state: "VS",
        zipCode: "12345",
        department: "Valid Department",
      };

      // If TypeScript compiles, the type is valid
      expect(validEmployee.id).toBe("valid-id");
      expect(validEmployee.firstName).toBe("Valid");
      expect(validEmployee.lastName).toBe("Employee");
    });
  });
});
