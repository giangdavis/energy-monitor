export default function CalculatorPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-8">Cost Calculator</h1>
      <div className="bg-gray-800 p-6 rounded-lg max-w-2xl">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Energy Usage (kWh)</label>
            <input
              type="number"
              className="w-full px-3 py-2 bg-gray-700 rounded-md border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter energy usage"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Rate per kWh ($)</label>
            <input
              type="number"
              className="w-full px-3 py-2 bg-gray-700 rounded-md border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter rate"
              step="0.01"
            />
          </div>
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800">
            Calculate Cost
          </button>
          <div className="mt-6 p-4 bg-gray-700 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Estimated Cost</h3>
            <p className="text-3xl font-bold text-blue-400">$0.00</p>
          </div>
        </div>
      </div>
    </div>
  );
}
