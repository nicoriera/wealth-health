import { flexRender } from "@tanstack/react-table";
import type { Table } from "@tanstack/react-table";
import type { Employee } from "../features/employees/employeeSlice";

interface EmployeeTableProps {
  table: Table<Employee>;
  globalFilter: string;
  t: (key: string) => string;
}

const EmployeeTable = ({ table, globalFilter, t }: EmployeeTableProps) => (
  <div className="relative bg-white shadow sm:rounded-lg overflow-x-auto max-h-[60vh] overflow-y-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50 sticky top-0 z-10">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none hover:bg-gray-100 transition-colors"
                onClick={header.column.getToggleSortingHandler()}
                style={{
                  width:
                    header.getSize() !== 150 ? header.getSize() : undefined,
                }}>
                <span className="flex items-center">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: <span className="ml-1.5 text-gray-700">🔼</span>,
                    desc: <span className="ml-1.5 text-gray-700">🔽</span>,
                  }[header.column.getIsSorted() as string] ?? (
                    <span className="ml-1.5 text-gray-300 group-hover:text-gray-400">
                      ↕️
                    </span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {table.getRowModel().rows.length === 0 ? (
          <tr>
            <td
              colSpan={table.getAllColumns().length}
              className="px-4 py-5 text-sm text-gray-500 text-center">
              {t("employeeList.table.noEmployees")}
              {globalFilter ? " matching filter." : "."}
            </td>
          </tr>
        ) : (
          table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="even:bg-gray-50 hover:bg-indigo-50 cursor-pointer transition-colors duration-150">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default EmployeeTable;
