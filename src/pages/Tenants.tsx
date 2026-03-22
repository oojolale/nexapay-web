import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Building2, Activity, AlertTriangle, Plus, MoreHorizontal, Settings2, Clock } from 'lucide-react'

interface TenantCard {
  name: string
  plan: 'Enterprise' | 'Pro' | 'Starter'
  status: 'Active' | 'Suspended'
  apiCalls: number
  storage: number
  users: number
  lastSeen: string
  warning?: string
}

const mockTenants: TenantCard[] = [
  { name: 'Acme Corp', plan: 'Enterprise', status: 'Active', apiCalls: 87, storage: 92, users: 74, lastSeen: '2 min ago' },
  { name: 'Globex Ltd', plan: 'Pro', status: 'Active', apiCalls: 72, storage: 68, users: 55, lastSeen: '15 min ago' },
  { name: 'Initech Inc', plan: 'Pro', status: 'Active', apiCalls: 65, storage: 61, users: 48, lastSeen: '1 hr ago' },
  { name: 'Stark Industries', plan: 'Enterprise', status: 'Active', apiCalls: 58, storage: 54, users: 82, lastSeen: '30 min ago' },
  { name: 'Wayne Enterprises', plan: 'Starter', status: 'Active', apiCalls: 45, storage: 40, users: 30, lastSeen: '3 hr ago' },
  { name: 'Umbrella Corp', plan: 'Starter', status: 'Active', apiCalls: 32, storage: 28, users: 22, lastSeen: '1 day ago' },
  { name: 'Cyberdyne', plan: 'Pro', status: 'Active', apiCalls: 88, storage: 76, users: 69, lastSeen: '5 min ago', warning: 'Approaching limit' },
  { name: 'Soylent Inc', plan: 'Starter', status: 'Active', apiCalls: 12, storage: 10, users: 8, lastSeen: '2 hr ago' },
  { name: 'TechVision', plan: 'Pro', status: 'Active', apiCalls: 55, storage: 50, users: 41, lastSeen: '45 min ago' },
]

const planColors: Record<string, string> = {
  Enterprise: 'bg-purple-600 text-white',
  Pro: 'bg-blue-600 text-white',
  Starter: 'bg-gray-700 text-gray-200',
}

const progressColor = (pct: number) => {
  if (pct >= 85) return 'bg-yellow-500'
  return 'bg-indigo-500'
}

function TenantCard({ tenant }: { tenant: TenantCard }) {
  return (
    <div className="bg-[#161b22] border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-white text-sm">{tenant.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-xs px-2 py-0.5 rounded font-medium ${planColors[tenant.plan]}`}>
              {tenant.plan}
            </span>
            <span className="flex items-center gap-1 text-xs text-emerald-400">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
              {tenant.status}
            </span>
          </div>
        </div>
        <button className="text-gray-500 hover:text-gray-300 p-1">
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Warning */}
      {tenant.warning && (
        <div className="flex items-center gap-1.5 text-xs text-yellow-400 mb-3">
          <AlertTriangle size={12} />
          <span>{tenant.warning}</span>
        </div>
      )}

      {/* Metrics */}
      <div className="space-y-2.5">
        {[
          { label: 'API Calls', pct: tenant.apiCalls },
          { label: 'Storage', pct: tenant.storage },
          { label: 'Users', pct: tenant.users },
        ].map(m => (
          <div key={m.label}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-400">{m.label}</span>
              <span className="text-xs text-gray-300">{m.pct}%</span>
            </div>
            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-full ${progressColor(m.pct)} rounded-full`}
                style={{ width: `${m.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-800">
        <span className="flex items-center gap-1 text-xs text-gray-500">
          <Clock size={11} />
          {tenant.lastSeen}
        </span>
        <button className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-lg transition-colors">
          <Settings2 size={12} />
          Manage
        </button>
      </div>
    </div>
  )
}

export function Tenants() {
  const [showAdd, setShowAdd] = useState(false)
  const [search, setSearch] = useState('')
  const { token } = useAuth()

  const filtered = mockTenants.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  )

  const total = mockTenants.length + 38 // mock total 47
  const active = mockTenants.filter(t => t.status === 'Active').length + 35
  const suspended = 3

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Tenant Management</h1>
          <p className="text-gray-400 text-sm mt-0.5">B2B2C multi-tenant platform administration</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={15} />
          Add Tenant
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#161b22] border border-gray-800 rounded-xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
            <Building2 className="text-blue-400" size={20} />
          </div>
          <div>
            <div className="text-3xl font-bold text-white">{total}</div>
            <div className="text-sm text-gray-400">Total Tenants</div>
          </div>
        </div>
        <div className="bg-[#161b22] border border-gray-800 rounded-xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
            <Activity className="text-cyan-400" size={20} />
          </div>
          <div>
            <div className="text-3xl font-bold text-white">{active}</div>
            <div className="text-sm text-gray-400">Active</div>
          </div>
        </div>
        <div className="bg-[#161b22] border border-gray-800 rounded-xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
            <AlertTriangle className="text-yellow-400" size={20} />
          </div>
          <div>
            <div className="text-3xl font-bold text-white">{suspended}</div>
            <div className="text-sm text-gray-400">Suspended</div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search tenants..."
          className="w-full max-w-xs px-4 py-2 bg-[#161b22] border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      {/* Tenant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(tenant => (
          <TenantCard key={tenant.name} tenant={tenant} />
        ))}
      </div>

      {/* Add Tenant Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#161b22] border border-gray-700 rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-white mb-4">Add New Tenant</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Organization Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 bg-[#0d1117] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-gray-600"
                  placeholder="Acme Corp"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Domain</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 bg-[#0d1117] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-gray-600"
                  placeholder="acme.nexapay.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Plan</label>
                <select className="w-full px-4 py-2.5 bg-[#0d1117] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500">
                  <option value="STARTER">Starter</option>
                  <option value="PRO">Pro</option>
                  <option value="ENTERPRISE">Enterprise</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAdd(false)}
                className="flex-1 py-2.5 border border-gray-700 text-gray-300 hover:bg-gray-800 rounded-lg text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAdd(false)}
                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Create Tenant
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
