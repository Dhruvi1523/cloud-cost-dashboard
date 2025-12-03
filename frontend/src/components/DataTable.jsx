import useDataStore from "../store/DataStore";

export default function DataTable() {
  const { data, filters, loading } = useDataStore();

  if (loading || data.rows.length === 0) return null;

  const columns = Object.keys(data.rows[0]);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mt-6">
      
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Detailed Billing
          </h3>

          <div className="text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
            Showing {data.rows.length} records • Page {filters.page}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200"
                >
                  {col
                    .split("_")
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(" ")}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data.rows.map((row, i) => (
              <tr
                key={i}
                className={
                  i % 2 === 0
                    ? "bg-white hover:bg-gray-50"
                    : "bg-gray-50 hover:bg-gray-100 transition-colors duration-150"
                }
              >
                {columns.map((key) => {
                  const value = row[key];

                  const isAmount =
                    key.toLowerCase().includes("amount") ||
                    key.toLowerCase().includes("cost") ||
                    key.toLowerCase().includes("spend");

                  return (
                    <td key={key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">

                      {/* Money formatting */}
                      {isAmount && typeof value === "number" ? (
                        <span className="font-medium text-green-600">
                          $
                          {value.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      ) : (
                        <span
                          className={
                            typeof value === "string" &&
                            ["prod", "production"].includes(value.toLowerCase())
                              ? "text-red-600 font-medium"
                              : ""
                          }
                        >
                          {String(value)}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
