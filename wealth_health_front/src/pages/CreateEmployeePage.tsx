// import { Link } from "react-router-dom"; // Remove unused import
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react"; // Import useState and useEffect
import { v4 as uuidv4 } from "uuid"; // Import uuid
import { useDispatch } from "react-redux"; // Import useDispatch
import { addEmployee } from "../features/employees/employeeSlice"; // Import addEmployee action
import { states, departments } from "../lib/data"; // Importer les données pour les selects
import type { AppDispatch } from "../store/store"; // Import AppDispatch type if needed for stricter typing
import Modal from "../components/Modal"; // Import the Modal component
import CustomSelect from "../components/CustomSelect"; // Import CustomSelect
import Layout from "../components/Layout"; // Import Layout
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import FormDatePicker from "../components/FormDatePicker";
import { EmployeeFormData } from "../types/employee";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Format options for CustomSelect
const stateOptions = states.map((state) => ({
  value: state.abbreviation,
  label: state.name,
}));
const departmentOptions = departments.map((dept) => ({
  value: dept,
  label: dept,
}));

const countryOptions = [
  { value: "France", label: "France" },
  { value: "US", label: "United States" },
];

const zipCodeRegexFR = /^[0-9]{5}$/;
const zipCodeRegexUS = /^[0-9]{5}(?:-[0-9]{4})?$/;

// Hook pour détecter le mobile sans dépendance externe
function useIsMobile(breakpoint = 767) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= breakpoint : false
  );
  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    setIsMobile(mediaQuery.matches);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [breakpoint]);
  return isMobile;
}

const CreateEmployeePage = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const dispatch = useDispatch<AppDispatch>(); // Get dispatch function

  // Schéma Yup avec traduction dynamique (doit être après t et avant useForm)
  const employeeSchema: yup.ObjectSchema<EmployeeFormData> = yup.object({
    firstName: yup
      .string()
      .required(t("createEmployee.validation.firstNameRequired")),
    lastName: yup
      .string()
      .required(t("createEmployee.validation.lastNameRequired")),
    dateOfBirth: yup
      .date()
      .nullable()
      .typeError(t("createEmployee.validation.dateOfBirthRequired"))
      .required(t("createEmployee.validation.dateOfBirthRequired")),
    startDate: yup
      .date()
      .nullable()
      .typeError(t("createEmployee.validation.startDateRequired"))
      .required(t("createEmployee.validation.startDateRequired")),
    street: yup
      .string()
      .required(t("createEmployee.validation.streetRequired")),
    city: yup.string().required(t("createEmployee.validation.cityRequired")),
    state: yup.string().required(t("createEmployee.validation.stateRequired")),
    country: yup.string().oneOf(["France", "US"]).required(),
    zipCode: yup
      .string()
      .when(["country"], ([country], schema: yup.StringSchema) => {
        if (country === "France") {
          return schema
            .matches(zipCodeRegexFR, t("createEmployee.validation.zipCodeFR"))
            .required(t("createEmployee.validation.zipCodeRequired"));
        }
        return schema
          .matches(zipCodeRegexUS, t("createEmployee.validation.zipCodeUS"))
          .required(t("createEmployee.validation.zipCodeRequired"));
      })
      .default(""),
    department: yup
      .string()
      .required(t("createEmployee.validation.departmentRequired")),
  });

  const {
    register,
    handleSubmit,
    control, // Get control from useForm
    formState: { errors },
    reset, // Get reset function from useForm
    watch,
  } = useForm<EmployeeFormData>({
    resolver: yupResolver(employeeSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: null,
      startDate: null,
      street: "",
      city: "",
      state: "",
      country: "France",
      zipCode: "",
      department: "",
    },
  });

  const isMobile = useIsMobile(767);
  const country = watch("country");

  // Handle form submission
  const onSubmit: SubmitHandler<EmployeeFormData> = (data) => {
    // Format data for saving (including adding an ID)
    const newEmployee = {
      id: uuidv4(), // Generate unique ID
      ...data,
      // Ensure dates are strings and handle null case gracefully
      dateOfBirth: data.dateOfBirth
        ? data.dateOfBirth.toLocaleDateString("en-US")
        : "N/A",
      startDate: data.startDate
        ? data.startDate.toLocaleDateString("en-US")
        : "N/A",
    };

    console.log("Dispatching addEmployee with:", newEmployee);
    dispatch(addEmployee(newEmployee));

    setIsModalOpen(true); // Open the modal instead of alert
    reset(); // Reset form immediately (or could reset on modal close)
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout pageTitle={t("createEmployee.title")}>
      <div className="flex justify-center items-start min-h-screen">
        <div
          className={`bg-white text-base md:text-sm p-6 md:p-8 rounded-lg shadow max-w-3xl w-full mx-auto${
            isMobile ? " pb-24" : ""
          }`}>
          <form
            id="create-employee-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8">
            {/* Section Informations personnelles */}
            <fieldset>
              <legend className="text-xl font-semibold text-gray-700 border-b border-gray-200 pb-3 mb-5">
                {t("createEmployee.sections.personalInformation")}
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  id="firstName"
                  name="firstName"
                  label={t("createEmployee.fields.firstName")}
                  register={register}
                  rules={{
                    required: t("createEmployee.validation.firstNameRequired"),
                  }}
                  error={errors.firstName}
                  autoComplete="given-name"
                />

                <FormInput
                  id="lastName"
                  name="lastName"
                  label={t("createEmployee.fields.lastName")}
                  register={register}
                  rules={{
                    required: t("createEmployee.validation.lastNameRequired"),
                  }}
                  error={errors.lastName}
                  autoComplete="family-name"
                />

                <FormDatePicker
                  id="dateOfBirth"
                  name="dateOfBirth"
                  label={t("createEmployee.fields.dateOfBirth")}
                  control={control}
                  rules={{
                    required: t(
                      "createEmployee.validation.dateOfBirthRequired"
                    ),
                  }}
                  error={errors.dateOfBirth}
                />

                <FormDatePicker
                  id="startDate"
                  name="startDate"
                  label={t("createEmployee.fields.startDate")}
                  control={control}
                  rules={{
                    required: t("createEmployee.validation.startDateRequired"),
                  }}
                  error={errors.startDate}
                />
              </div>
            </fieldset>

            {/* Section Adresse */}
            <fieldset>
              <legend className="text-xl font-semibold text-gray-700 border-b border-gray-200 pb-3 mb-5">
                {t("createEmployee.sections.address")}
              </legend>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    {t("createEmployee.fields.country")}
                  </label>
                  <select
                    id="country"
                    {...register("country")}
                    className={`mt-0 block w-full px-3 py-2 border ${
                      errors.country ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                      errors.country
                        ? "focus:ring-red-500 focus:border-red-500"
                        : "focus:ring-indigo-300 focus:border-indigo-500"
                    } focus:ring-opacity-50 sm:text-sm`}
                    aria-invalid={!!errors.country}
                    aria-describedby={
                      errors.country ? "country-error" : undefined
                    }>
                    {countryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.country && (
                    <p id="country-error" className="mt-1 text-sm text-red-600">
                      {errors.country.message}
                    </p>
                  )}
                </div>
                <FormInput
                  id="street"
                  name="street"
                  label={t("createEmployee.fields.street")}
                  register={register}
                  rules={{
                    required: t("createEmployee.validation.streetRequired"),
                  }}
                  error={errors.street}
                  autoComplete="address-line1"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormInput
                    id="city"
                    name="city"
                    label={t("createEmployee.fields.city")}
                    register={register}
                    rules={{
                      required: t("createEmployee.validation.cityRequired"),
                    }}
                    error={errors.city}
                    autoComplete="address-level2"
                  />

                  <Controller
                    name="state"
                    control={control}
                    rules={{
                      required: t("createEmployee.validation.stateRequired"),
                    }}
                    render={({ field }) => (
                      <CustomSelect
                        id="state"
                        label={t("createEmployee.fields.state")}
                        options={stateOptions}
                        {...field}
                        placeholder={t("createEmployee.fields.state")}
                        error={errors.state?.message}
                        aria-invalid={!!errors.state}
                        aria-describedby="state-error"
                      />
                    )}
                  />

                  <FormInput
                    id="zipCode"
                    name="zipCode"
                    label={t("createEmployee.fields.zipCode")}
                    register={register}
                    rules={{
                      required: t("createEmployee.validation.zipCodeRequired"),
                    }}
                    error={errors.zipCode}
                    autoComplete="postal-code"
                    inputMode="numeric"
                    pattern={
                      country === "France" ? "[0-9]{5}" : "[0-9]{5}(-[0-9]{4})?"
                    }
                    maxLength={country === "France" ? 5 : 10}
                    placeholder={
                      country === "France" ? "75001" : "90210 ou 90210-1234"
                    }
                  />
                </div>
              </div>
            </fieldset>

            {/* Section Département */}
            <fieldset>
              <legend className="text-xl font-semibold text-gray-700 border-b border-gray-200 pb-3 mb-5">
                {t("createEmployee.sections.department")}
              </legend>
              <div>
                <Controller
                  name="department"
                  control={control}
                  rules={{
                    required: t("createEmployee.validation.departmentRequired"),
                  }}
                  render={({ field }) => (
                    <CustomSelect
                      id="department"
                      label={t("createEmployee.fields.department")}
                      options={departmentOptions}
                      {...field}
                      placeholder={t("createEmployee.fields.department")}
                      error={errors.department?.message}
                      aria-invalid={!!errors.department}
                      aria-describedby="department-error"
                    />
                  )}
                />
              </div>
            </fieldset>

            {/* Bouton de soumission (desktop uniquement) */}
            {!isMobile && (
              <div className="pt-6 border-t border-gray-200">
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    loading={isModalOpen}
                    disabled={isModalOpen}
                    className="">
                    {t("createEmployee.buttons.save")}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Bouton de soumission sticky mobile */}
      {isMobile && (
        <div
          className="fixed bottom-0 left-0 w-full z-30 shadow-lg bg-white px-4 py-3"
          data-testid="sticky-mobile-btn">
          <Button
            type="submit"
            form="create-employee-form"
            loading={isModalOpen}
            disabled={isModalOpen}
            className="w-full">
            {t("createEmployee.buttons.save")}
          </Button>
        </div>
      )}

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={t("createEmployee.modal.title")}>
        <p>{t("createEmployee.modal.message")}</p>
      </Modal>
    </Layout>
  );
};

export default CreateEmployeePage;
