import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { BoltIcon, ChartBarIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'
import { requireAuth } from '@/components/auth/server-auth'
import { redirect } from 'next/navigation'
import { User } from '@supabase/supabase-js'

async function getEnergyData(user: User) {
  const supabase = createClient()

  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  const { data: todayReading } = await supabase
    .from('energy_readings')
    .select('usage, cost')
    .eq('user_id', user.id)
    .eq('date', today.toISOString().split('T')[0])
    .single()

  const { data: yesterdayReading } = await supabase
    .from('energy_readings')
    .select('usage')
    .eq('user_id', user.id)
    .eq('date', yesterday.toISOString().split('T')[0])
    .single()

  const { data: monthlyReadings } = await supabase
    .from('energy_readings')
    .select('usage, cost')
    .eq('user_id', user.id)
    .gte('date', new Date(today.getFullYear(), today.getMonth(), 1).toISOString())
    .lte('date', today.toISOString())

  const monthlyAverage = monthlyReadings?.length
    ? monthlyReadings.reduce((acc, curr) => acc + curr.usage, 0) / monthlyReadings.length
    : 0

  return {
    today: todayReading?.usage || 0,
    todayCost: todayReading?.cost || 0,
    yesterday: yesterdayReading?.usage || 0,
    monthlyAverage,
  }
}

export default async function DashboardPage() {
  try {
    const user = await requireAuth()
    const data = await getEnergyData(user)
    const usageChange = data ? ((data.today - data.yesterday) / data.yesterday) * 100 : 0

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold mb-8 text-gray-900 dark:text-white">
          Welcome to your Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Today's Usage Card */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Today's Usage</h3>
              <BoltIcon className="h-6 w-6 text-yellow-500" aria-hidden="true" />
            </div>
            <div className="flex items-end space-x-2">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">
                {data?.today.toFixed(1)}
              </span>
              <span className="text-xl text-gray-500 dark:text-gray-400">kWh</span>
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className={usageChange < 0 ? 'text-green-400' : 'text-red-400'}>
                {usageChange < 0 ? '↓' : '↑'} {Math.abs(usageChange).toFixed(1)}% vs. yesterday
              </span>
            </div>
          </div>

          {/* Monthly Average Card */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Monthly Average</h3>
              <ChartBarIcon className="h-6 w-6 text-blue-500" aria-hidden="true" />
            </div>
            <div className="flex items-end space-x-2">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">
                {data?.monthlyAverage.toFixed(1)}
              </span>
              <span className="text-xl text-gray-500 dark:text-gray-400">kWh</span>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
              <span>Daily average this month</span>
            </div>
          </div>

          {/* Estimated Cost Card */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Today's Cost</h3>
              <CurrencyDollarIcon className="h-6 w-6 text-green-500" aria-hidden="true" />
            </div>
            <div className="flex items-end space-x-2">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">
                ${data?.todayCost.toFixed(2)}
              </span>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
              <span>Based on today's usage</span>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Dashboard auth error:', error)
    redirect('/auth/signin')
  }
}
