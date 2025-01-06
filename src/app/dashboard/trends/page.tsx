export default function TrendsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-8">Energy Consumption Trends</h1>
      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select Period</label>
          <select className="w-48 px-3 py-2 bg-gray-700 rounded-md border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
            <option>Daily (Last 30 Days)</option>
            <option>Weekly (Last 12 Weeks)</option>
            <option>Monthly (Last 12 Months)</option>
          </select>
        </div>
        <div className="h-96 flex items-center justify-center">
          <p className="text-gray-400">Chart coming soon...</p>
        </div>
      </div>
    </div>
  );
}
