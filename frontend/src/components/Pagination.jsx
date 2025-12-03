import useDataStore from "../store/DataStore";

export default function Pagination() {
  const { data, filters, updatePage, loading } = useDataStore();

  if (loading || data.rows.length === 0) return null;

  

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-200 mt-6">
      <div className="flex items-center justify-between">

        {/* Previous Button */}
        <button
          className={`px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all duration-200 ${
            filters.page === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md"
          }`}
          disabled={filters.page === 1}
          onClick={() => updatePage(filters.page - 1)}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>

        {/* Page Info */}
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Page</span>
          <span className="px-3 py-1 bg-blue-50 text-blue-600 font-semibold rounded-lg">
            {filters.page}
          </span>
          <span className="text-gray-600">of</span>
          <span className="text-gray-800 font-medium">{data.total_pages}</span>
        </div>

        {/* Next Button */}
        <button
          className="px-5 py-2.5 bg-blue-500 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-blue-600 hover:shadow-md transition-all duration-200"
          disabled={filters.page >= data.total_pages}
          onClick={() => updatePage(filters.page + 1)}
        >
          Next
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
