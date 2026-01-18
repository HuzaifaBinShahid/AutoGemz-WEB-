import { ReactNode } from "react";

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  imageType?: "box" | "rounded";
  imageKey?: string;
  imageAltKey?: string;
  onRowClick?: (row: any) => void;
}

const DataTable = ({
  columns,
  data,
  imageType = "box",
  imageKey,
  imageAltKey,
  onRowClick,
}: DataTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            {columns.map((column) => (
              <th
                key={column.key}
                className="text-left py-3 px-4 font-medium"
                style={{ color: "#1F293799" }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                onRowClick ? "cursor-pointer" : ""
              }`}
              onClick={() => onRowClick && onRowClick(row)}
            >
              {columns.map((column) => {
                if (column.render) {
                  return (
                    <td key={column.key} className="py-4 px-4">
                      {column.render(row[column.key], row)}
                    </td>
                  );
                }

                if (
                  imageKey &&
                  column.key === imageKey &&
                  row[imageKey]
                ) {
                  const imageUrl = typeof row[imageKey] === "string" 
                    ? row[imageKey] 
                    : row[imageKey]?.image || row[imageKey]?.url;
                  const altText = imageAltKey 
                    ? row[imageAltKey] 
                    : row[column.key]?.alt || row.name || row.model || "";

                  return (
                    <td key={column.key} className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={imageUrl}
                          alt={altText}
                          className={`w-12 h-12 object-cover ${
                            imageType === "rounded" ? "rounded-full" : ""
                          }`}
                        />
                        <div>
                          {row.name && (
                            <p className="font-medium text-gray-900">{row.name}</p>
                          )}
                          {row.model && (
                            <p className="font-medium text-gray-900">{row.model}</p>
                          )}
                          {row.year && (
                            <p className="text-sm text-gray-500">{row.year}</p>
                          )}
                        </div>
                      </div>
                    </td>
                  );
                }

                return (
                  <td key={column.key} className="py-4 px-4 text-gray-700">
                    {row[column.key] || "—"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
