export default function DashboardPage() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Today's Usage Card */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Today's Usage</h3>
            <svg className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex items-end space-x-2">
            <span className="text-4xl font-bold">12.5</span>
            <span className="text-xl">kWh</span>
          </div>
          <div className="mt-2 flex items-center text-sm text-green-400">
            <span>↓ 12% vs. yesterday</span>
          </div>
        </div>

        {/* Monthly Average Card */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Monthly Average</h3>
            <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div className="flex items-end space-x-2">
            <span className="text-4xl font-bold">15.2</span>
            <span className="text-xl">kWh</span>
          </div>
          <div className="mt-2 flex items-center text-sm text-red-400">
            <span>↑ 8% vs. last month</span>
          </div>
        </div>

        {/* Estimated Cost Card */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Estimated Cost</h3>
            <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex items-end space-x-2">
            <span className="text-4xl font-bold">$45.20</span>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-400">
            <span>Based on current usage</span>
          </div>
        </div>
      </div>
    </>
  );
}
