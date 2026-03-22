import React, { useState } from 'react'
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  LogIn,
  CalendarClock,
  Package,
  Users,
  Shield,
  CreditCard,
  Building2,
  Settings,
  Download,
  Bell,
  Search,
  ChevronDown,
  User,
  LogOut,
  Menu,
  X,
  HelpCircle,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'

const navSections = [
  {
    label: 'OVERVIEW',
    items: [
      { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { path: '/auth', icon: LogIn, label: 'Sign In' },
    ],
  },
  {
    label: 'OPERATIONS',
    items: [
      { path: '/scheduler', icon: CalendarClock, label: 'Scheduler' },
      { path: '/erp', icon: Package, label: 'ERP' },
      { path: '/crm', icon: Users, label: 'CRM' },
    ],
  },
  {
    label: 'RISK & FINANCE',
    items: [
      { path: '/risk-control', icon: Shield, label: 'Risk Control' },
      { path: '/payments', icon: CreditCard, label: 'Payments' },
    ],
  },
  {
    label: 'SYSTEM',
    items: [
      { path: '/tenants', icon: Building2, label: 'Tenants' },
      { path: '/settings', icon: Settings, label: 'Settings' },
      { path: '/export', icon: Download, label: 'Export' },
    ],
  },
]

function getBreadcrumb(pathname: string) {
  const map: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/auth': 'Sign In',
    '/scheduler': 'Scheduler',
    '/erp': 'ERP',
    '/crm': 'CRM',
    '/risk-control': 'Risk Control',
    '/payments': 'Payments',
    '/tenants': 'Tenants',
    '/settings': 'Settings',
    '/export': 'Export Site',
  }
  return map[pathname] || ''
}

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/auth')
  }

  const breadcrumb = getBreadcrumb(location.pathname)

  return (
    <div className="flex h-screen bg-[#0d1117] text-white">
      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`flex-shrink-0 flex flex-col bg-[#0d1117] border-r border-gray-800 transition-all duration-200 ${
          isMobile
            ? `fixed inset-y-0 left-0 z-50 ${sidebarOpen ? 'w-56' : 'w-0 overflow-hidden'}`
            : sidebarOpen ? 'w-56' : 'w-14'
        }`}
      >
        {/* Logo */}
        <div className="h-14 flex items-center px-4 border-b border-gray-800 flex-shrink-0">
          <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">N</span>
          </div>
          {sidebarOpen && (
            <span className="ml-2.5 font-bold text-white text-sm">NexaPay</span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
          {navSections.map(section => (
            <div key={section.label}>
              {sidebarOpen && (
                <p className="text-[10px] font-semibold text-gray-600 tracking-widest px-2 mb-1">
                  {section.label}
                </p>
              )}
              <div className="space-y-0.5">
                {section.items.map(item => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => isMobile && setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-colors ${
                        isActive
                          ? 'bg-indigo-600/20 text-white'
                          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                      }`
                    }
                  >
                    <item.icon size={16} className="flex-shrink-0" />
                    {sidebarOpen && <span>{item.label}</span>}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* User Footer */}
        <div className="px-3 py-3 border-t border-gray-800 flex-shrink-0">
          {sidebarOpen ? (
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                {user?.username?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white truncate">{user?.username || 'Admin'}</p>
                <p className="text-[10px] text-gray-500 truncate">Platform Admin</p>
              </div>
            </div>
          ) : (
            <div className="w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center text-xs font-bold text-white mx-auto">
              {user?.username?.charAt(0).toUpperCase() || 'A'}
            </div>
          )}
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-14 border-b border-gray-800 flex items-center justify-between px-4 flex-shrink-0 bg-[#0d1117]">
          <div className="flex items-center gap-3">
            {/* Sidebar toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <span>NexaPay</span>
              {breadcrumb && (
                <>
                  <span>/</span>
                  <span className="text-white">{breadcrumb}</span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
              <input
                type="search"
                placeholder="Search..."
                className="pl-9 pr-4 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-40"
              />
            </div>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                  <Bell size={17} />
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">3</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72 bg-[#161b22] border border-gray-700 rounded-xl shadow-xl p-1 z-50">
                <DropdownMenuLabel className="px-3 py-2 text-sm font-semibold text-white">Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator className="border-gray-800 mx-1" />
                {[
                  { text: 'New tenant onboarded', sub: 'Discorp', color: 'bg-green-500/10 text-green-400' },
                  { text: 'Risk alert triggered', sub: 'TXN#4829', color: 'bg-yellow-500/10 text-yellow-400' },
                  { text: 'Payment processed', sub: '$45,230', color: 'bg-blue-500/10 text-blue-400' },
                ].map((n, i) => (
                  <DropdownMenuItem key={i} className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-800 cursor-pointer outline-none">
                    <div className={`w-8 h-8 rounded-lg ${n.color} flex items-center justify-center flex-shrink-0`}>
                      <Bell size={13} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white">{n.text}</p>
                      <p className="text-xs text-gray-500">{n.sub}</p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-800 rounded-lg transition-colors">
                  <div className="w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                    {user?.username?.charAt(0).toUpperCase() || 'A'}
                  </div>
                  <span className="text-sm text-gray-300 hidden sm:block">
                    {user?.username ? user.username.charAt(0).toUpperCase() + user.username.slice(1) : 'Acme Corp'}
                  </span>
                  <ChevronDown size={14} className="text-gray-500 hidden sm:block" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-[#161b22] border border-gray-700 rounded-xl shadow-xl p-1 z-50">
                <DropdownMenuLabel className="px-3 py-2 text-sm font-semibold text-white">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="border-gray-800 mx-1" />
                <DropdownMenuItem
                  className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg cursor-pointer outline-none"
                  onClick={() => navigate('/settings')}
                >
                  <User size={14} /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg cursor-pointer outline-none"
                  onClick={() => navigate('/settings')}
                >
                  <Settings size={14} /> Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg cursor-pointer outline-none">
                  <HelpCircle size={14} /> Help & Support
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-gray-800 mx-1" />
                <DropdownMenuItem
                  className="flex items-center gap-2.5 px-3 py-2 text-sm text-red-400 hover:bg-red-400/10 rounded-lg cursor-pointer outline-none"
                  onClick={handleLogout}
                >
                  <LogOut size={14} /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-5">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
