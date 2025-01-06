'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  HomeIcon, 
  PlusIcon, 
  ClockIcon, 
  ArrowUpTrayIcon,
  BellIcon,
  ChartBarIcon,
  CalculatorIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline'
import { createClient } from '@/lib/supabase/client'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'New Entry', href: '/dashboard/new', icon: PlusIcon },
  { name: 'History', href: '/dashboard/history', icon: ClockIcon },
  { name: 'Bulk Upload', href: '/dashboard/upload', icon: ArrowUpTrayIcon },
  { name: 'Alerts', href: '/dashboard/alerts', icon: BellIcon },
  { name: 'Trends', href: '/dashboard/trends', icon: ChartBarIcon },
  { name: 'Cost Calculator', href: '/dashboard/calculator', icon: CalculatorIcon },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      router.push('/auth/signin')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <div className="flex h-full w-64 flex-col bg-gray-900">
      <div className="flex h-16 items-center px-6">
        <h1 className="text-xl font-semibold text-white">Energy Monitor</h1>
      </div>
      <nav className="flex flex-1 flex-col space-y-1 px-4 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-2 py-2 text-sm font-medium rounded-md group ${
                isActive 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon 
                className={`mr-3 h-6 w-6 flex-shrink-0 ${
                  isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                }`} 
                aria-hidden="true" 
              />
              {item.name}
            </Link>
          )
        })}
      </nav>
      <div className="px-4 py-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex w-full items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-800 hover:text-white group"
        >
          <ArrowRightOnRectangleIcon
            className="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-white"
            aria-hidden="true"
          />
          Sign Out
        </button>
      </div>
    </div>
  )
}
