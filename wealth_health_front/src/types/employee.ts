export type EmployeeFormData = {
  firstName: string;
  lastName: string;
  dateOfBirth: Date | null;
  startDate: Date | null;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  department: string;
};

export type Employee = {
  id: string;
} & Omit<EmployeeFormData, "dateOfBirth" | "startDate"> & {
    dateOfBirth: string;
    startDate: string;
  };
