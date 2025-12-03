import { useState } from "react";

export default function RowDetailModal({ row, onClose }) {
  if (!row) return null;
  const [isCopied, setIsCopied] = useState(false);

  // Format value based on key type
  const formatValue = (key, value) => {
    const stringValue = String(value);

    // Check for amount/cost fields
    const isAmount =
      key.toLowerCase().includes("amount") ||
      key.toLowerCase().includes("cost") ||
      key.toLowerCase().includes("spend") ||
      key.toLowerCase().includes("price");

    // Check for date fields
    const isDate =
      key.toLowerCase().includes("date") ||
      key.toLowerCase().includes("time") ||
      key.toLowerCase().includes("created") ||
      key.toLowerCase().includes("updated");

    if (isAmount && !isNaN(value)) {
      return (
        <span className="font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
          $
          {parseFloat(value).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      );
    }

    if (isDate && !isNaN(Date.parse(value))) {
      return (
        <span className="text-gray-700 bg-gray-50 px-2 py-1 rounded">
          {new Date(value).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      );
    }

    // Default formatting
    return <span className="text-gray-900">{stringValue}</span>;
  };

  // Format key name
  const formatKey = (key) => {
    return key
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-2xl animate-fadeInScale bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 bg-linear-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-linear-to-br from-blue-500 to-indigo-500 rounded-lg shadow">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Service Details
                </h2>
                <p className="text-sm text-gray-500">
                  Complete information for {row.id}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-5 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Quick Stats Bar */}
          <div className=" mb-6 p-4 bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            {row.env && (
              <div className="flex   gap-4">
                <div className="text-md text-blue-600 font-medium ">
                  Environment:
                </div>
                <div
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    row.env === "prod"
                      ? "bg-red-100 text-red-600"
                      : row.env === "staging"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {row.env.toUpperCase()}
                </div>
              </div>
            )}
          </div>

          {/* Details Grid */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              All Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(row).map(([key, value]) => (
                <div
                  key={key}
                  className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-200 border border-gray-200"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        {formatKey(key)}
                      </div>
                      <div className="text-sm text-gray-700 break-words">
                        {formatValue(key, value)}
                      </div>
                    </div>
                    <div className="text-gray-400">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={() => {
              // Copy all data to clipboard
              navigator.clipboard.writeText(JSON.stringify(row, null, 2));
              setIsCopied(true);
              setTimeout(() => setIsCopied(false), 2000);
            }}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2 ${
              isCopied
                ? "bg-green-100 text-green-700 border border-green-200"
                : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {isCopied ? (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy JSON
              </>
            )}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-medium text-white bg-linear-to-r from-blue-500 to-indigo-500 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
