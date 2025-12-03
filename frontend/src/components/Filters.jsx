import useDataStore from "../store/DataStore.jsx";

export default function Filters() {
  const { applyFilters, filters } = useDataStore();

  // Handler to reset all filters
  const handleReset = () => {
    applyFilters({
      cloud_provider: ["all"],
      team: ["all"],
      env: ["all"],
      sort_by: "date",
      order: "desc",
      page: 1,
    });
  };

  // Check if any filter is active (not "all")
  const hasActiveFilters = 
    filters.cloud_provider[0] !== "all" ||
    filters.team[0] !== "all" ||
    filters.env[0] !== "all" ||
    filters.sort_by !== "date" ||
    filters.order !== "desc";

  // Handler for sort field change
  const handleSortFieldChange = (e) => {
    applyFilters({
      sort_by: e.target.value,
      page: 1,
    });
  };

  // Handler for sort order change
  const handleSortOrderChange = (e) => {
    applyFilters({
      order: e.target.value,
      page: 1,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-linear-to-br from-blue-50 to-indigo-50 rounded-lg">
            <svg 
              className="w-5 h-5 text-blue-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" 
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Filters & Sort</h3>
            <p className="text-gray-500 text-sm">Refine and organize your billing data</p>
          </div>
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex items-center gap-2"
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
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
              />
            </svg>
            Reset All
          </button>
        )}
      </div>

      {/* Main Filters Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        
        {/* Cloud Provider Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <svg 
              className="w-4 h-4 text-blue-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z" 
              />
            </svg>
            Cloud Provider
          </label>
          <div className="relative">
            <select
              value={filters.cloud_provider[0]}
              onChange={(e) => applyFilters({ cloud_provider: [e.target.value], page: 1 })}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none cursor-pointer hover:border-gray-400 shadow-sm"
            >
              <option value="all">All Providers</option>
              <option value="AWS">AWS</option>
              <option value="GCP">GCP</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {filters.cloud_provider[0] !== "all" && (
              <div className="absolute -top-2 right-3">
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full font-medium">
                  Active
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Team Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <svg 
              className="w-4 h-4 text-green-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-4.201a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" 
              />
            </svg>
            Team
          </label>
          <div className="relative">
            <select
              value={filters.team[0]}
              onChange={(e) => applyFilters({ team: [e.target.value], page: 1 })}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 appearance-none cursor-pointer hover:border-gray-400 shadow-sm"
            >
              <option value="all">All Teams</option>
              <option value="core">Core</option>
              <option value="web">Web</option>
              <option value="data">Data</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {filters.team[0] !== "all" && (
              <div className="absolute -top-2 right-3">
                <span className="px-2 py-1 text-xs bg-green-100 text-green-600 rounded-full font-medium">
                  Active
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Environment Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <svg 
              className="w-4 h-4 text-purple-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" 
              />
            </svg>
            Environment
          </label>
          <div className="relative">
            <select
              value={filters.env[0]}
              onChange={(e) => applyFilters({ env: [e.target.value], page: 1 })}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 appearance-none cursor-pointer hover:border-gray-400 shadow-sm"
            >
              <option value="all">All Environments</option>
              <option value="prod">Production</option>
              <option value="staging">Staging</option>
              <option value="dev">Development</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {filters.env[0] !== "all" && (
              <div className="absolute -top-2 right-3">
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                  filters.env[0] === "prod" ? "bg-red-100 text-red-600" :
                  filters.env[0] === "staging" ? "bg-amber-100 text-amber-600" :
                  "bg-blue-100 text-blue-600"
                }`}>
                  {filters.env[0] === "prod" ? "Prod" : 
                   filters.env[0] === "staging" ? "Staging" : 
                   filters.env[0] === "dev" ? "Dev" : "Test"}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Sort By Dropdown */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <svg 
              className="w-4 h-4 text-amber-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" 
              />
            </svg>
            Sort By
          </label>
          <div className="relative">
            <select
              value={filters.sort_by || "date"}
              onChange={handleSortFieldChange}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 appearance-none cursor-pointer hover:border-gray-400 shadow-sm"
            >
              <option value="date">Date</option>
              <option value="cost_usd">Cost</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {filters.sort_by && filters.sort_by !== "date" && (
              <div className="absolute -top-2 right-3">
                <span className="px-2 py-1 text-xs bg-amber-100 text-amber-600 rounded-full font-medium">
                  {filters.sort_by === "cost_usd" ? "Cost" : "Date"}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Sort Order Dropdown */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <svg 
              className="w-4 h-4 text-indigo-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
            Order
          </label>
          <div className="relative">
            <select
              value={filters.order || "desc"}
              onChange={handleSortOrderChange}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 appearance-none cursor-pointer hover:border-gray-400 shadow-sm"
            >
              <option value="desc">Descending </option>
              <option value="asc">Ascending </option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {filters.order && filters.order !== "desc" && (
              <div className="absolute -top-2 right-3">
                <span className="px-2 py-1 text-xs bg-indigo-100 text-indigo-600 rounded-full font-medium">
                  {filters.order === "asc" ? "Asc" : "Desc"}
                </span>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Active Filters Badges */}
      {hasActiveFilters && (
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Active filters:</span>
            <div className="flex flex-wrap gap-2">
              {filters.cloud_provider[0] !== "all" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-100">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Provider: {filters.cloud_provider[0]}
                </span>
              )}
              {filters.team[0] !== "all" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full border border-green-100">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Team: {filters.team[0]}
                </span>
              )}
              {filters.env[0] !== "all" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-full border border-purple-100">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Env: {filters.env[0]}
                </span>
              )}
              {filters.sort_by && filters.sort_by !== "date" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 text-sm rounded-full border border-amber-100">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" clipRule="evenodd" />
                  </svg>
                  Sort: {filters.sort_by === "cost_usd" ? "Cost" : "Date"}
                </span>
              )}
              {filters.order && filters.order !== "desc" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 text-sm rounded-full border border-indigo-100">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Order: {filters.order === "asc" ? "Ascending" : "Descending"}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}