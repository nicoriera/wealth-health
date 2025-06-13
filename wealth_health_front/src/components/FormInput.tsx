import { UseFormRegister, FieldError } from "react-hook-form";
import { EmployeeFormData } from "../types/employee";

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  error?: FieldError;
  autoComplete?: string;
  register: UseFormRegister<EmployeeFormData>;
  name: keyof EmployeeFormData;
  rules?: Record<string, unknown>;
  placeholder?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  pattern?: string;
  maxLength?: number;
}

const FormInput = ({
  id,
  label,
  type = "text",
  error,
  autoComplete,
  register,
  name,
  rules,
  placeholder,
  inputMode,
  pattern,
  maxLength,
}: FormInputProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        autoComplete={autoComplete}
        placeholder={placeholder}
        {...register(name, rules)}
        className={`mt-0 block w-full px-3 py-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md shadow-sm focus:outline-none focus:ring-2 ${
          error
            ? "focus:ring-red-500 focus:border-red-500"
            : "focus:ring-indigo-300 focus:border-indigo-500"
        } focus:ring-opacity-50 sm:text-sm`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...(inputMode ? { inputMode } : {})}
        {...(pattern ? { pattern } : {})}
        {...(maxLength ? { maxLength } : {})}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FormInput;
