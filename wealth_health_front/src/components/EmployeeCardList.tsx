import { flexRender } from "@tanstack/react-table";
import type { Row } from "@tanstack/react-table";
import type { Employee } from "../features/employees/employeeSlice";

interface EmployeeCardListProps {
  rows: Row<Employee>[];
  noDataText?: string;
}

const EmployeeCardList = ({ rows, noDataText }: EmployeeCardListProps) => {
  if (rows.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8 bg-white rounded shadow">
        {noDataText || "Aucun employé."}
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      {rows.map((row) => (
        <div
          key={row.id}
          className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 border border-gray-100">
          {row.getVisibleCells().map((cell) => (
            <div key={cell.id} className="flex flex-col">
              <span className="text-xs text-gray-400 font-medium">
                {typeof cell.column.columnDef.header === "string"
                  ? cell.column.columnDef.header
                  : ""}
              </span>
              <span className="text-sm text-gray-700">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default EmployeeCardList;
