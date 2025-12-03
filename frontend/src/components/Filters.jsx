import useDataStore from "../store/DataStore.jsx";

export default function Filters() {
  const { applyFilters, filters } = useDataStore();

  // Handler to reset all filters
  const handleReset = () => {
    applyFilters({
      cloud_provider: ["all"],
      team: ["all"],
      env: ["all"],
      page: 1,
    });
  };

  // Check if any filter is active (not "all")
  const hasActiveFilters = 
    filters.cloud_provider[0] !== "all" ||
    filters.team[0] !== "all" ||
    filters.env[0] !== "all";

  return (
    <div className="space-y-4">
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
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            <p className="text-gray-500 text-sm">Refine your billing data</p>
          </div>
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex items-center gap-1"
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

      {/* Filters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Cloud Provider Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
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
              onChange={(e) => applyFilters({ cloud_provider: [e.target.value] })}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none cursor-pointer hover:border-gray-400 shadow-sm"
            >
              <option value="all">All Providers</option>
              <option value="AWS">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  AWS
                </div>
              </option>
              <option value="GCP">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Google Cloud
                </div>
              </option>
              <option value="Azure">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-sky-500 rounded-full"></span>
                  Microsoft Azure
                </div>
              </option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
              <svg 
                className="w-5 h-5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 9l-7 7-7-7" 
                />
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
          <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
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
              onChange={(e) => applyFilters({ team: [e.target.value] })}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 appearance-none cursor-pointer hover:border-gray-400 shadow-sm"
            >
              <option value="all">All Teams</option>
              <option value="core">Core</option>
              <option value="web">Web</option>
              <option value="data">Data</option>
             
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
              <svg 
                className="w-5 h-5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 9l-7 7-7-7" 
                />
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
          <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
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
              onChange={(e) => applyFilters({ env: [e.target.value] })}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 appearance-none cursor-pointer hover:border-gray-400 shadow-sm"
            >
              <option value="all">All Environments</option>
              <option value="prod" className="text-red-600 font-medium">Production</option>
              <option value="staging" className="text-amber-600">Staging</option>
              <option value="dev" className="text-blue-600">Development</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
              <svg 
                className="w-5 h-5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 9l-7 7-7-7" 
                />
              </svg>
            </div>
            {filters.env[0] !== "all" && (
              <div className="absolute -top-2 right-3">
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                  filters.env[0] === "prod" ? "bg-red-100 text-red-600" :
                  filters.env[0] === "staging" ? "bg-amber-100 text-amber-600" :
                  filters.env[0] === "dev" ? "bg-blue-100 text-blue-600" :
                  "bg-emerald-100 text-emerald-600"
                }`}>
                  {filters.env[0] === "prod" ? "Prod" : 
                   filters.env[0] === "staging" ? "Staging" : 
                   filters.env[0] === "dev" ? "Dev" : "Test"}
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}