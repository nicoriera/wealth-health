import { Control, Controller, FieldError } from "react-hook-form";
import DatePicker from "react-datepicker";
import { EmployeeFormData } from "../types/employee";

interface FormDatePickerProps {
  id: string;
  label: string;
  name: keyof EmployeeFormData;
  control: Control<EmployeeFormData>;
  error?: FieldError;
  rules?: Record<string, unknown>;
}

const FormDatePicker = ({
  id,
  label,
  name,
  control,
  error,
  rules,
}: FormDatePickerProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
          <DatePicker
            id={id}
            onChange={field.onChange}
            onBlur={field.onBlur}
            selected={field.value instanceof Date ? field.value : null}
            placeholderText="MM/DD/YYYY"
            className={`mt-0 block w-full px-3 py-2 border ${
              error ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-2 ${
              error
                ? "focus:ring-red-500 focus:border-red-500"
                : "focus:ring-indigo-300 focus:border-indigo-500"
            } focus:ring-opacity-50 sm:text-sm`}
            wrapperClassName="w-full"
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
          />
        )}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FormDatePicker;
