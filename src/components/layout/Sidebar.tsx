import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  PlusIcon, 
  ClockIcon, 
  ArrowUpTrayIcon,
  BellIcon,
  ChartBarIcon,
  CalculatorIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'New Entry', href: '/dashboard/new', icon: PlusIcon },
  { name: 'History', href: '/dashboard/history', icon: ClockIcon },
  { name: 'Bulk Upload', href: '/dashboard/upload', icon: ArrowUpTrayIcon },
  { name: 'Alerts', href: '/dashboard/alerts', icon: BellIcon },
  { name: 'Trends', href: '/dashboard/trends', icon: ChartBarIcon },
  { name: 'Cost Calculator', href: '/dashboard/calculator', icon: CalculatorIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-gray-900">
      <div className="flex h-16 items-center px-6">
        <h1 className="text-xl font-semibold">Energy Dashboard</h1>
      </div>
      <nav className="flex-1 space-y-1 px-4 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
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
          );
        })}
      </nav>
    </div>
  );
}
