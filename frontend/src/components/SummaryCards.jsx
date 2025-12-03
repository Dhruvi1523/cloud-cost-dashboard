import useDataStore from "../store/DataStore";

export default function SummaryCards() {
  const { summary } = useDataStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Spend */}
      <div className="bg-blue-600 text-white rounded-2xl p-6 shadow-xl">
        <h3 className="font-semibold text-lg">Total Spend</h3>
        <p className="text-4xl font-bold mt-2">
          $
          {summary.total_spend?.toLocaleString("en-US", {
            minimumFractionDigits: 2,
          })}
        </p>
      </div>
      {summary.spend_by_provider &&
          Object.entries(summary.spend_by_provider).map(([provider, value]) => (
            <div
              key={provider}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="font-semibold text-gray-700">{provider.toUpperCase()} {' '} Spend</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                ${value?.toLocaleString() || 0}
              </p>
            </div>
          ))}

      

     
    </div>
  );
}
