export default function AlertsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-8">Energy Alerts</h1>
      <div className="bg-gray-800 p-6 rounded-lg max-w-2xl">
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-4">Alert Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Daily Usage Threshold (kWh)</label>
              <input
                type="number"
                className="w-full px-3 py-2 bg-gray-700 rounded-md border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Enter threshold value"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Notification Method</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox text-blue-600 bg-gray-700 border-gray-600 rounded" />
                  <span className="ml-2">Email Notifications</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox text-blue-600 bg-gray-700 border-gray-600 rounded" />
                  <span className="ml-2">In-App Notifications</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                className="w-full px-3 py-2 bg-gray-700 rounded-md border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
          </div>
        </div>
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800">
          Save Alert Settings
        </button>
      </div>
    </div>
  );
}
