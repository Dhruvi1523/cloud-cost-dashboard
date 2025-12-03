import { useEffect, useState } from "react";
import useDataStore from "./store/DataStore";
import Header from "./components/Header";
import Filters from "./components/Filters";
import SummaryCards from "./components/SummaryCards";
import DataTable from "./components/DataTable";
import Pagination from "./components/Pagination";
import SpendCharts from "./components/SpendCharts";

export default function App() {
  const { fetchData, filters } = useDataStore();
  const [activeTab, setActiveTab] = useState("billing-details");

  useEffect(() => {
    fetchData();
  }, [filters]);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-200/60 shadow-md">
        <Header />
      </div>

      {/* Main Content Container */}
      <main className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Filters Section */}
        <div className="mb-8 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5 md:p-6 hover:shadow-xl transition-all duration-300">
            <Filters />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mb-8">
          <SummaryCards />
        </div>

        {/* Main Dashboard Tabs */}
        <div className="mb-8 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 bg-linear-to-r from-gray-50 to-white px-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4">
                <div className="flex space-x-1">
                  <button
                    onClick={() => setActiveTab("billing-details")}
                    className={`px-5 py-3 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2 ${
                      activeTab === "billing-details"
                        ? "bg-linear-to-r from-green-50 to-emerald-50 text-green-600 border border-green-100 shadow-sm"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <svg
                      className={`w-4 h-4 ${
                        activeTab === "service-details"
                          ? "text-green-500"
                          : "text-gray-400"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                    Billing Details
                  </button>
                  <button
                    onClick={() => setActiveTab("analytics")}
                    className={`px-5 py-3 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2 ${
                      activeTab === "analytics"
                        ? "bg-linear-to-r from-blue-50 to-indigo-50 text-blue-600 border border-blue-100 shadow-sm"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <svg
                      className={`w-4 h-4 ${
                        activeTab === "analytics"
                          ? "text-blue-500"
                          : "text-gray-400"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    Analytics Dashboard
                  </button>
                </div>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "analytics" && (
                <div className="space-y-6">
                  
                  <SpendCharts />
                </div>
              )}

              {activeTab === "billing-details" && (
                <div className="space-y-6">
                  {/* Data Table Section */}
                  <div className="mb-8 animate-fadeIn">
                    <div className="overflow-hidden">
                      <DataTable />
                    </div>
                  </div>

                  {/* Pagination */}
                  <div className="animate-fadeIn">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5 md:p-6">
                      <Pagination />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Add custom animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
