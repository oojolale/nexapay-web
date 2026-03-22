import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import {
  User, Bell, Key, Shield, Globe, ChevronRight, Copy, Trash2, Plus, ExternalLink
} from 'lucide-react'

type SettingsTab = 'profile' | 'notifications' | 'apikeys' | 'security' | 'platform'

interface ApiKey {
  name: string
  type: 'Full Access' | 'Read Only'
  key: string
  created: string
  typeColor: string
}

const apiKeys: ApiKey[] = [
  { name: 'Production Key', type: 'Full Access', key: 'sk_live_••••••••••••4f2a', created: 'Created Jan 12, 2026', typeColor: 'bg-indigo-600/30 text-indigo-300' },
  { name: 'Analytics Key', type: 'Read Only', key: 'sk_live_••••••••••••9c3b', created: 'Created Feb 3, 2026', typeColor: 'bg-gray-700 text-gray-400' },
]

const menuItems = [
  { key: 'profile', label: 'Profile', icon: User },
  { key: 'notifications', label: 'Notifications', icon: Bell },
  { key: 'apikeys', label: 'API Keys', icon: Key },
  { key: 'security', label: 'Security', icon: Shield },
  { key: 'platform', label: 'Platform', icon: Globe },
]

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? 'bg-indigo-600' : 'bg-gray-700'
      }`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        checked ? 'translate-x-6' : 'translate-x-1'
      }`} />
    </button>
  )
}

export function Settings() {
  const { user } = useAuth()
  const [tab, setTab] = useState<SettingsTab>('profile')
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    riskNotifications: true,
    weeklyReports: true,
  })
  const [twoFactor, setTwoFactor] = useState(true)
  const [sessionTimeout, setSessionTimeout] = useState('30 min')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 text-sm mt-0.5">Platform configuration & preferences</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Menu */}
        <div className="w-56 flex-shrink-0">
          <div className="bg-[#161b22] border border-gray-800 rounded-xl overflow-hidden">
            {menuItems.map((item, i) => {
              const Icon = item.icon
              const isActive = tab === item.key
              return (
                <button
                  key={item.key}
                  onClick={() => setTab(item.key as SettingsTab)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors ${
                    i < menuItems.length - 1 ? 'border-b border-gray-800' : ''
                  } ${
                    isActive
                      ? 'bg-indigo-600/20 text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight size={14} className="text-indigo-400" />}
                </button>
              )
            })}
          </div>
        </div>

        {/* Content Panel */}
        <div className="flex-1 bg-[#161b22] border border-gray-800 rounded-xl p-6">
          {/* Profile */}
          {tab === 'profile' && (
            <div>
              <h2 className="text-lg font-semibold text-white mb-6">Profile</h2>
              <div className="space-y-4 max-w-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    defaultValue="Alex Johnson"
                    className="w-full px-4 py-2.5 bg-[#0d1117] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
                  <input
                    type="email"
                    defaultValue={user?.email || 'alex@acmecorp.com'}
                    className="w-full px-4 py-2.5 bg-[#0d1117] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Role</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      defaultValue="Platform Administrator"
                      readOnly
                      className="flex-1 px-4 py-2.5 bg-[#0d1117] border border-gray-700 rounded-lg text-gray-400 text-sm focus:outline-none"
                    />
                    <span className="px-3 py-2 bg-indigo-600 text-white text-xs rounded-lg font-medium">Admin</span>
                  </div>
                </div>
                <button className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Notifications */}
          {tab === 'notifications' && (
            <div>
              <h2 className="text-lg font-semibold text-white mb-6">Notifications</h2>
              <div className="space-y-1 max-w-lg">
                {[
                  { key: 'emailAlerts', label: 'Email Alerts', sub: 'Receive alerts via email' },
                  { key: 'smsAlerts', label: 'SMS Alerts', sub: 'Receive alerts via SMS' },
                  { key: 'riskNotifications', label: 'Risk Notifications', sub: 'High-priority risk events' },
                  { key: 'weeklyReports', label: 'Weekly Reports', sub: 'Summary digest every Monday' },
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between py-4 border-b border-gray-800 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-white">{item.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.sub}</p>
                    </div>
                    <Toggle
                      checked={notifications[item.key as keyof typeof notifications]}
                      onChange={v => setNotifications(prev => ({ ...prev, [item.key]: v }))}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* API Keys */}
          {tab === 'apikeys' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">API Keys</h2>
                <button className="flex items-center gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors">
                  <Plus size={14} />
                  Generate New Key
                </button>
              </div>
              <div className="space-y-3 max-w-2xl">
                {apiKeys.map(key => (
                  <div key={key.name} className="bg-[#0d1117] border border-gray-800 rounded-xl p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-white">{key.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded font-medium ${key.typeColor}`}>
                            {key.type}
                          </span>
                        </div>
                        <p className="text-xs font-mono text-gray-500">{key.key}</p>
                        <p className="text-xs text-gray-600 mt-0.5">{key.created}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button className="p-2 text-gray-500 hover:text-gray-300 hover:bg-gray-800 rounded-lg transition-colors">
                          <Copy size={15} />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security */}
          {tab === 'security' && (
            <div>
              <h2 className="text-lg font-semibold text-white mb-6">Security</h2>
              <div className="space-y-4 max-w-lg">
                <div className="flex items-center justify-between py-4 border-b border-gray-800">
                  <div>
                    <p className="text-sm font-medium text-white">Two-Factor Authentication</p>
                    <p className="text-xs text-gray-500 mt-0.5">Add an extra layer of security</p>
                  </div>
                  <Toggle checked={twoFactor} onChange={setTwoFactor} />
                </div>
                <div className="py-4 border-b border-gray-800">
                  <p className="text-sm font-medium text-white mb-3">Session Timeout (minutes)</p>
                  <select
                    value={sessionTimeout}
                    onChange={e => setSessionTimeout(e.target.value)}
                    className="px-4 py-2.5 bg-[#0d1117] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option>15 min</option>
                    <option>30 min</option>
                    <option>60 min</option>
                    <option>120 min</option>
                  </select>
                </div>
                <div className="py-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Audit Log</p>
                    <p className="text-xs text-gray-500 mt-0.5">View all admin activity</p>
                  </div>
                  <button className="flex items-center gap-2 px-3 py-2 border border-gray-700 text-gray-300 hover:bg-gray-800 rounded-lg text-sm transition-colors">
                    <ExternalLink size={14} />
                    View Log
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Platform */}
          {tab === 'platform' && (
            <div>
              <h2 className="text-lg font-semibold text-white mb-6">Platform</h2>
              <div className="space-y-4 max-w-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Timezone</label>
                  <input
                    type="text"
                    defaultValue="UTC"
                    className="w-full px-4 py-2.5 bg-[#0d1117] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Date Format</label>
                  <input
                    type="text"
                    defaultValue="MM/DD/YYYY"
                    className="w-full px-4 py-2.5 bg-[#0d1117] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Language</label>
                  <select className="w-full px-4 py-2.5 bg-[#0d1117] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500">
                    <option>English</option>
                    <option>Chinese (Simplified)</option>
                    <option>Japanese</option>
                    <option>Spanish</option>
                  </select>
                </div>
                <button className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors">
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
