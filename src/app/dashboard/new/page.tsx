export default function NewEntryPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-8">New Energy Entry</h1>
      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="max-w-md">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Date</label>
            <input
              type="date"
              className="w-full px-3 py-2 bg-gray-700 rounded-md border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              defaultValue="2025-01-03"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Energy Usage (kWh)</label>
            <input
              type="number"
              className="w-full px-3 py-2 bg-gray-700 rounded-md border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="0.00"
              step="0.01"
            />
          </div>
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800">
            Submit Entry
          </button>
        </div>
      </div>
    </div>
  );
}
