import { useState, useMemo, useEffect } from "react";
// import { Link } from 'react-router-dom'; // Link is now in Layout
import { useSelector } from "react-redux";
import {
  // ... TanStack Table imports ...
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  SortingState,
  PaginationState,
} from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import Layout from "../components/Layout"; // Import Layout
import { selectEmployees } from "../features/employees/employeeSlice";
import type { RootState } from "../store/store";
import type { Employee } from "../features/employees/employeeSlice";
import Pagination from "../components/Pagination";
import Button from "../components/Button";
import EmployeeCardList from "../components/EmployeeCardList";
import EmployeeTable from "../components/EmployeeTable";
// import { useMediaQuery } from "react-responsive";

// Add a debouncing hook for smoother filter UX
function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

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

const EmployeeListPage = () => {
  const { t } = useTranslation();

  // ... state, selector, table setup ...
  const employees = useSelector((state: RootState) => selectEmployees(state));
  const data = useMemo(() => employees, [employees]);
  const [sorting, setSorting] = useState<SortingState>([]);
  // Local input state for filter and debounced value
  const [filterInput, setFilterInput] = useState("");
  const debouncedFilterInput = useDebounce(filterInput, 300);
  const [globalFilter, setGlobalFilter] = useState("");
  // Sync debounced input to table filter state
  useEffect(() => {
    setGlobalFilter(debouncedFilterInput);
  }, [debouncedFilterInput]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // ... columnHelper and columns definition ...
  const columnHelper = createColumnHelper<Employee>();
  const columns = [
    columnHelper.accessor("firstName", {
      header: t("employeeList.table.firstName"),
    }),
    columnHelper.accessor("lastName", {
      header: t("employeeList.table.lastName"),
    }),
    columnHelper.accessor("startDate", {
      header: t("employeeList.table.startDate"),
    }),
    columnHelper.accessor("department", {
      header: t("employeeList.table.department"),
    }),
    columnHelper.accessor("dateOfBirth", {
      header: t("employeeList.table.dateOfBirth"),
    }),
    columnHelper.accessor("street", { header: t("employeeList.table.street") }),
    columnHelper.accessor("city", { header: t("employeeList.table.city") }),
    columnHelper.accessor("state", { header: t("employeeList.table.state") }),
    columnHelper.accessor("zipCode", {
      header: t("employeeList.table.zipCode"),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter, pagination },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, _columnId, filterValue) => {
      // Filtre sur toutes les colonnes visibles, insensible à la casse
      return row.getAllCells().some((cell) =>
        String(cell.getValue() ?? "")
          .toLowerCase()
          .includes(String(filterValue).toLowerCase())
      );
    },
    debugTable: false,
  });

  const isMobile = useIsMobile(767);

  return (
    <Layout pageTitle={t("employeeList.title")}>
      {/* Header section with title, filters, and add button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          {t("employeeList.title")}
        </h1>
        {/* Filtres rapides (placeholder) */}
        <div className="flex-1 flex gap-2 items-center justify-start md:justify-center">
          <span className="text-gray-400 italic text-sm">
            Filtres rapides à venir
          </span>
        </div>
        <Button
          onClick={() => {
            /* TODO: Naviguer ou ouvrir modale */
          }}
          className="w-full md:w-auto">
          + {t("employeeList.addButton", "Ajouter")}
        </Button>
      </div>
      {/* Barre de recherche */}
      <div className="mb-4 flex flex-col sm:flex-row justify-end w-full gap-2">
        <div className="relative w-full sm:w-80">
          <label htmlFor="globalFilter" className="sr-only">
            Search table
          </label>
          <input
            type="text"
            id="globalFilter"
            value={filterInput}
            onChange={(e) => setFilterInput(e.target.value)}
            className="w-full p-2 pl-9 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 focus:ring-opacity-50"
            placeholder={t("employeeList.searchPlaceholder")}
          />
          {/* Clear button */}
          {filterInput && (
            <button
              onClick={() => setFilterInput("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label="Clear filter">
              &#10005;
            </button>
          )}
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
      {/* Affichage conditionnel : tableau sur desktop, cards sur mobile */}
      {isMobile ? (
        <EmployeeCardList
          rows={table.getRowModel().rows}
          noDataText={
            t("employeeList.table.noEmployees") +
            (globalFilter ? " matching filter." : ".")
          }
        />
      ) : (
        <EmployeeTable table={table} globalFilter={globalFilter} t={t} />
      )}
      {/* Pagination */}
      {isMobile ? (
        <>
          {/* Padding pour ne pas masquer le contenu */}
          <div className="pb-24" />
          <div className="fixed  bottom-0 left-0 w-full z-30 shadow-lg bg-white">
            <Pagination
              currentPage={pagination.pageIndex + 1}
              totalPages={table.getPageCount()}
              onPrevious={() => table.previousPage()}
              onNext={() => table.nextPage()}
              disabled={table.getPageCount() === 0}
              isMobile={isMobile}
            />
          </div>
        </>
      ) : (
        <div className="mt-4 w-full flex justify-center">
          <Pagination
            currentPage={pagination.pageIndex + 1}
            totalPages={table.getPageCount()}
            onPrevious={() => table.previousPage()}
            onNext={() => table.nextPage()}
            disabled={table.getPageCount() === 0}
            isMobile={isMobile}
          />
        </div>
      )}
    </Layout>
  );
};

export default EmployeeListPage;
