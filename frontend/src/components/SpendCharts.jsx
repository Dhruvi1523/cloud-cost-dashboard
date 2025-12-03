import BarChart from "./BarChart";
import useDataStore from "../store/DataStore";

export default function SpendCharts() {
  const { summary } = useDataStore();
  
  const COLORS = [
    "#3B82F6", // Blue
    "#10B981", // Green
    "#F59E0B", // Amber
    "#EF4444", // Red
    "#8B5CF6", // Purple
    "#EC4899", // Pink
    "#14B8A6", // Teal
    "#F97316", // Orange
  ];

  if (!summary) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 animate-pulse">
        <div className="h-64 flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-400 mb-2">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="text-gray-500">Loading chart data...</p>
          </div>
        </div>
      </div>
    );
  }

  // Provider Data
  const providerData = summary.spend_by_provider
    ? Object.entries(summary.spend_by_provider).map(([provider, spend], index) => ({
        name: provider,
        spend: spend,
        color: COLORS[index % COLORS.length]
      }))
    : [];

  // Team Data
  const teamData = summary.spend_by_team 
    ? Object.entries(summary.spend_by_team).map(([team, spend], index) => ({
        name: team,
        spend: spend,
        color: COLORS[(index + 2) % COLORS.length]
      }))
    : [];

  // Monthly Trend Data
  const monthlyData = summary.monthly_spend || [];

  // Check if we have data for any chart
  const hasProviderData = providerData.length > 0;
  const hasTeamData = teamData.length > 0;
  const hasMonthlyData = monthlyData.length > 0;

  if (!hasProviderData && !hasTeamData && !hasMonthlyData) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <div className="h-64 flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-400 mb-2">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-1">No Chart Data Available</h3>
            <p className="text-gray-500 text-sm">Try adjusting your filters to see results</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Spending Analytics</h2>
          <p className="text-gray-600 mt-1">Visual breakdown of your cloud spending</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 bg-blue-50 text-blue-600 text-sm font-medium rounded-lg border border-blue-100">
            {summary.total_spend ? `$${summary.total_spend.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '$0.00'}
          </div>
          
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spend by Provider */}
        {hasProviderData && (
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Spend by Cloud Provider</h3>
                  <p className="text-gray-500 text-sm">Cost distribution across providers</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {providerData.length} provider{providerData.length !== 1 ? 's' : ''}
              </div>
            </div>
            
            <BarChart
              labels={providerData.map((d) => d.name)}
              datasets={[
                {
                  label: "Spend ($)",
                  data: providerData.map((d) => d.spend),
                  backgroundColor: providerData.map((d) => d.color),
                  borderRadius: 8,
                  borderWidth: 0,
                  barPercentage: 0.6,
                },
              ]}
              title=""
              height={280}
            />
            
            {/* Legend */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {providerData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-700 font-medium">{item.name}</span>
                    <span className="text-sm text-gray-600 ml-auto">
                      ${item.spend.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Spend by Team */}
        {hasTeamData && (
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-4.201a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Spend by Team</h3>
                  <p className="text-gray-500 text-sm">Cost allocation across teams</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {teamData.length} team{teamData.length !== 1 ? 's' : ''}
              </div>
            </div>
            
            <BarChart
              labels={teamData.map((d) => d.name)}
              datasets={[
                {
                  label: "Spend ($)",
                  data: teamData.map((d) => d.spend),
                  backgroundColor: teamData.map((d) => d.color),
                  borderRadius: 8,
                  borderWidth: 0,
                  barPercentage: 0.6,
                },
              ]}
              title=""
              height={280}
            />
            
            {/* Legend */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {teamData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-700 font-medium">{item.name}</span>
                    <span className="text-sm text-gray-600 ml-auto">
                      ${item.spend.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Monthly Trend - Full Width */}
      {hasMonthlyData && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Monthly Spend Trend</h3>
                <p className="text-gray-500 text-sm">12-month spending overview</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {monthlyData.length} month{monthlyData.length !== 1 ? 's' : ''}
            </div>
          </div>
          
          <BarChart
            labels={monthlyData.map((d) => d.month)}
            datasets={[
              {
                label: "Monthly Spend ($)",
                data: monthlyData.map((d) => d.spend),
                backgroundColor: "#8B5CF6",
                borderColor: "#8B5CF6",
                borderRadius: 8,
                borderWidth: 0,
                barPercentage: 0.7,
              },
            ]}
            title=""
            height={320}
          />
          
          {/* Stats */}
          {monthlyData.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Current Month</div>
                  <div className="text-lg font-semibold text-gray-900">
                    ${monthlyData[monthlyData.length - 1]?.spend.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
                  </div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Average Monthly</div>
                  <div className="text-lg font-semibold text-gray-900">
                    ${(monthlyData.reduce((sum, d) => sum + d.spend, 0) / monthlyData.length).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Highest Month</div>
                  <div className="text-lg font-semibold text-gray-900">
                    ${Math.max(...monthlyData.map(d => d.spend)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
               
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}