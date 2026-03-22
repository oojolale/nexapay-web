import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import {
  Building2, CreditCard, AlertTriangle, Activity, Download,
  Users, RefreshCw, Lock, Plus, Bell, Zap
} from 'lucide-react'

const statCards = [
  {
    label: 'Active Tenants',
    value: '47',
    change: '+12%',
    positive: true,
    icon: Building2,
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
  },
  {
    label: 'Transaction Volume',
    value: '$2.4M',
    change: '+8.1%',
    positive: true,
    icon: CreditCard,
    color: 'text-green-400',
    bg: 'bg-green-400/10',
  },
  {
    label: 'Risk Alerts',
    value: '23',
    change: '-15%',
    positive: false,
    icon: AlertTriangle,
    color: 'text-red-400',
    bg: 'bg-red-400/10',
  },
  {
    label: 'System Uptime',
    value: '99.97%',
    change: 'Stable',
    positive: true,
    icon: Activity,
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
  },
]

const tenantUsage = [
  { name: 'Acme Corp', pct: 87, color: 'bg-cyan-500' },
  { name: 'Globes', pct: 72, color: 'bg-cyan-500' },
  { name: 'Initech', pct: 65, color: 'bg-cyan-500' },
  { name: 'Stark Ind.', pct: 58, color: 'bg-cyan-500' },
  { name: 'Wayne Ent.', pct: 45, color: 'bg-cyan-500' },
  { name: 'Umbrella', pct: 32, color: 'bg-cyan-500' },
]

const systemHealth = [
  { label: 'CPU Usage', value: '34%', pct: 34, color: 'bg-cyan-500' },
  { label: 'Memory', value: '62%', pct: 62, color: 'bg-yellow-500' },
  { label: 'Redis Connections', value: '1,247', pct: 62, color: 'bg-cyan-500', numericRight: true },
  { label: 'Active Locks', value: '89', pct: 45, color: 'bg-cyan-500', numericRight: true },
  { label: 'Queue Depth', value: '342', pct: 68, color: 'bg-yellow-500', numericRight: true },
]

const recentActivity = [
  { icon: Users, color: 'text-cyan-400', bg: 'bg-cyan-400/10', text: 'New tenant onboarded', sub: 'Discorp', time: '2m ago' },
  { icon: AlertTriangle, color: 'text-yellow-400', bg: 'bg-yellow-400/10', text: 'Risk alert triggered', sub: 'TXN#4829', time: '5m ago' },
  { icon: RefreshCw, color: 'text-blue-400', bg: 'bg-blue-400/10', text: 'Scheduler job completed', sub: 'batch_reconcile', time: '12m ago' },
  { icon: CreditCard, color: 'text-green-400', bg: 'bg-green-400/10', text: 'Payment processed', sub: '$45,230', time: '25m ago' },
  { icon: Lock, color: 'text-purple-400', bg: 'bg-purple-400/10', text: 'Lock contention resolved', sub: 'order_write', time: '1h ago' },
]

const quickActions = [
  { icon: Plus, label: 'Add Tenant', color: 'text-cyan-400', bg: 'bg-cyan-400/10', path: '/tenants' },
  { icon: Bell, label: 'View Alerts', color: 'text-yellow-400', bg: 'bg-yellow-400/10', path: '/risk-control' },
  { icon: RefreshCw, label: 'Run Reconciliation', color: 'text-green-400', bg: 'bg-green-400/10', path: '/scheduler' },
  { icon: Lock, label: 'Lock Monitor', color: 'text-purple-400', bg: 'bg-purple-400/10', path: '/scheduler' },
]

export function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 text-sm mt-0.5">Multi-tenant platform overview</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-400 text-sm flex items-center gap-1.5">
            <Activity size={14} />
            Mon Mar 23, 2026
          </span>
          <button
            onClick={() => navigate('/export')}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Download size={15} />
            Export Report
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map(card => {
          const Icon = card.icon
          return (
            <div key={card.label} className="bg-[#161b22] border border-gray-800 rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center`}>
                  <Icon className={card.color} size={20} />
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  card.change === 'Stable'
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : card.positive
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : 'bg-red-500/10 text-red-400'
                }`}>
                  {card.change}
                </span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{card.value}</div>
              <div className="text-sm text-gray-400">{card.label}</div>
            </div>
          )
        })}
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Tenant Resource Usage */}
        <div className="bg-[#161b22] border border-gray-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white">Tenant Resource Usage</h2>
            <button
              onClick={() => navigate('/tenants')}
              className="text-xs text-indigo-400 hover:text-indigo-300"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {tenantUsage.map(t => (
              <div key={t.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-300">{t.name}</span>
                  <span className="text-sm text-gray-400">{t.pct}%</span>
                </div>
                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${t.color} rounded-full`}
                    style={{ width: `${t.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="bg-[#161b22] border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Zap size={16} className="text-yellow-400" />
            <h2 className="font-semibold text-white">System Health</h2>
          </div>
          <div className="space-y-3">
            {systemHealth.map(item => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-300">{item.label}</span>
                  <span className="text-sm text-gray-400">{item.value}</span>
                </div>
                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Activity */}
        <div className="bg-[#161b22] border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Activity size={16} className="text-cyan-400" />
            <h2 className="font-semibold text-white">Recent Activity</h2>
          </div>
          <div className="space-y-3">
            {recentActivity.map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={item.color} size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm text-gray-200">{item.text}</span>
                    <span className="text-sm text-gray-500"> — {item.sub}</span>
                  </div>
                  <span className="text-xs text-gray-500 flex-shrink-0">{item.time}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#161b22] border border-gray-800 rounded-xl p-5">
          <h2 className="font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map(action => {
              const Icon = action.icon
              return (
                <button
                  key={action.label}
                  onClick={() => navigate(action.path)}
                  className="flex flex-col items-center gap-3 p-4 bg-[#0d1117] hover:bg-gray-800 border border-gray-800 hover:border-gray-700 rounded-xl transition-colors"
                >
                  <div className={`w-10 h-10 rounded-lg ${action.bg} flex items-center justify-center`}>
                    <Icon className={action.color} size={20} />
                  </div>
                  <span className="text-sm text-gray-300">{action.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
