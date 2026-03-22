import { useState } from 'react'
import { Activity, AlertOctagon, BarChart2, ShieldCheck, X } from 'lucide-react'

type Tab = 'feed' | 'rules' | 'analytics'

interface Transaction {
  id: string
  tenant: string
  amount: string
  country: string
  risk: number
  riskLabel: string
  riskColor: string
  status: 'Flagged' | 'Cleared' | 'Blocked' | 'Review'
  time: string
}

const transactions: Transaction[] = [
  { id: 'TXN-8847', tenant: 'Acme Corp', amount: '$45,200', country: 'CN', risk: 87, riskLabel: 'CRITICAL', riskColor: 'text-red-400 bg-red-400/10', status: 'Flagged', time: 'just now' },
  { id: 'TXN-8846', tenant: 'Globex', amount: '$1,200', country: 'US', risk: 12, riskLabel: 'LOW', riskColor: 'text-emerald-400 bg-emerald-400/10', status: 'Cleared', time: '2s' },
  { id: 'TXN-8845', tenant: 'Initech', amount: '$89,400', country: 'RU', risk: 92, riskLabel: 'CRITICAL', riskColor: 'text-red-400 bg-red-400/10', status: 'Blocked', time: '5s' },
  { id: 'TXN-8844', tenant: 'Wayne Ent.', amount: '$340', country: 'US', risk: 8, riskLabel: 'LOW', riskColor: 'text-emerald-400 bg-emerald-400/10', status: 'Cleared', time: '8s' },
  { id: 'TXN-8843', tenant: 'Stark Ind.', amount: '$12,800', country: 'BR', risk: 45, riskLabel: 'MED', riskColor: 'text-yellow-400 bg-yellow-400/10', status: 'Review', time: '12s' },
  { id: 'TXN-8842', tenant: 'Umbrella', amount: '$2,100', country: 'DE', risk: 18, riskLabel: 'LOW', riskColor: 'text-emerald-400 bg-emerald-400/10', status: 'Cleared', time: '15s' },
  { id: 'TXN-8841', tenant: 'Oscorp', amount: '$67,000', country: 'KP', risk: 96, riskLabel: 'CRITICAL', riskColor: 'text-red-400 bg-red-400/10', status: 'Blocked', time: '19s' },
  { id: 'TXN-8840', tenant: 'Cyberdyne', amount: '$5,400', country: 'US', risk: 33, riskLabel: 'MED', riskColor: 'text-yellow-400 bg-yellow-400/10', status: 'Review', time: '24s' },
  { id: 'TXN-8839', tenant: 'Aperture', amount: '$890', country: 'CA', risk: 10, riskLabel: 'LOW', riskColor: 'text-emerald-400 bg-emerald-400/10', status: 'Cleared', time: '31s' },
  { id: 'TXN-8838', tenant: 'Weyland', amount: '$31,500', country: 'CN', risk: 71, riskLabel: 'HIGH', riskColor: 'text-orange-400 bg-orange-400/10', status: 'Flagged', time: '38s' },
]

const rules = [
  { name: 'High Amount Threshold', type: 'AMOUNT', condition: 'Amount > $50,000', action: 'BLOCK', priority: 10, status: 'Active' },
  { name: 'High-Risk Country', type: 'COUNTRY', condition: 'Country in [RU, CN, KP, NG]', action: 'REVIEW', priority: 9, status: 'Active' },
  { name: 'Velocity Check', type: 'VELOCITY', condition: '> 10 TXN in 1h', action: 'FLAG', priority: 8, status: 'Active' },
  { name: 'Crypto Payment Block', type: 'METHOD', condition: 'Method = CRYPTO', action: 'BLOCK', priority: 7, status: 'Active' },
  { name: 'New Account Large Tx', type: 'ACCOUNT', condition: 'Account age < 7d AND Amount > $5000', action: 'REVIEW', priority: 6, status: 'Paused' },
]

const statusBadgeMap: Record<string, string> = {
  Flagged: 'bg-yellow-500/20 text-yellow-400',
  Cleared: 'bg-emerald-500/20 text-emerald-400',
  Blocked: 'bg-red-500/20 text-red-400 border border-red-500/30',
  Review: 'bg-blue-500/20 text-blue-400',
}

export function RiskControl() {
  const [tab, setTab] = useState<Tab>('feed')
  const [alertDismissed, setAlertDismissed] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Payment Risk Control</h1>
          <p className="text-gray-400 text-sm mt-0.5">Real-time transaction monitoring, risk rule engine & fraud detection</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-sm text-red-400">Live monitoring active</span>
        </div>
      </div>

      {/* Alert Banner */}
      {!alertDismissed && (
        <div className="flex items-center justify-between bg-yellow-500/10 border border-yellow-500/30 rounded-xl px-4 py-3">
          <div className="flex items-center gap-3">
            <AlertOctagon className="text-yellow-400 flex-shrink-0" size={18} />
            <span className="text-sm text-yellow-300">3 high-risk transactions require immediate review</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-xs px-3 py-1.5 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg font-medium transition-colors">
              Review Now
            </button>
            <button onClick={() => setAlertDismissed(true)} className="text-gray-500 hover:text-gray-300">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Transactions Today', value: '84,230', sub: '+3.2% vs yesterday', icon: Activity, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
          { label: 'Intercepted', value: '127', sub: '12 in last hour', icon: AlertOctagon, color: 'text-red-400', bg: 'bg-red-400/10' },
          { label: 'Interception Rate', value: '0.15%', sub: 'within SLA target', icon: BarChart2, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
          { label: 'False Positive Rate', value: '0.02%', sub: 'industry low', icon: ShieldCheck, color: 'text-green-400', bg: 'bg-green-400/10' },
        ].map(s => {
          const Icon = s.icon
          return (
            <div key={s.label} className="bg-[#161b22] border border-gray-800 rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">{s.label}</span>
                <div className={`w-8 h-8 ${s.bg} rounded-lg flex items-center justify-center`}>
                  <Icon className={s.color} size={16} />
                </div>
              </div>
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.sub}</div>
            </div>
          )
        })}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 w-fit">
        {[
          { key: 'feed', label: 'Live Feed' },
          { key: 'rules', label: 'Rule Engine' },
          { key: 'analytics', label: 'Analytics' },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key as Tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t.key
                ? 'bg-indigo-600 text-white'
                : 'bg-[#161b22] border border-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Live Feed */}
      {tab === 'feed' && (
        <div className="bg-[#161b22] border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-800 flex items-center justify-between">
            <h2 className="font-semibold text-white">Transaction Stream</h2>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
              <span className="text-xs text-red-400">LIVE</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  {['Txn ID', 'Tenant', 'Amount', 'Country', 'Risk Score', 'Status', 'Time'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs text-gray-500 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {transactions.map(tx => (
                  <tr key={tx.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                    <td className="px-5 py-3 text-indigo-400 font-mono text-xs">{tx.id}</td>
                    <td className="px-5 py-3 text-gray-300">{tx.tenant}</td>
                    <td className="px-5 py-3 text-white font-medium">{tx.amount}</td>
                    <td className="px-5 py-3">
                      <span className="text-xs font-mono bg-gray-800 px-1.5 py-0.5 rounded text-gray-300">{tx.country}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded font-bold ${tx.riskColor}`}>
                        {tx.risk} {tx.riskLabel}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${statusBadgeMap[tx.status]}`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-500 text-xs">{tx.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Rule Engine */}
      {tab === 'rules' && (
        <div className="bg-[#161b22] border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-800 flex items-center justify-between">
            <h2 className="font-semibold text-white">Risk Rules</h2>
            <button className="text-xs px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors">
              + Add Rule
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  {['Rule Name', 'Type', 'Condition', 'Action', 'Priority', 'Status'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs text-gray-500 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rules.map(rule => (
                  <tr key={rule.name} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                    <td className="px-5 py-3 text-white font-medium">{rule.name}</td>
                    <td className="px-5 py-3">
                      <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">{rule.type}</span>
                    </td>
                    <td className="px-5 py-3 text-gray-400 font-mono text-xs">{rule.condition}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                        rule.action === 'BLOCK' ? 'bg-red-500/20 text-red-400'
                          : rule.action === 'REVIEW' ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-gray-700 text-gray-400'
                      }`}>
                        {rule.action}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-300">{rule.priority}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        rule.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-700 text-gray-400'
                      }`}>
                        {rule.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Analytics */}
      {tab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-[#161b22] border border-gray-800 rounded-xl p-5">
            <h3 className="font-semibold text-white mb-4">Risk Distribution</h3>
            <div className="space-y-4">
              {[
                { label: 'Low Risk (0-29)', count: 68240, pct: 81, color: 'bg-emerald-500' },
                { label: 'Medium Risk (30-59)', count: 12450, pct: 14.8, color: 'bg-yellow-500' },
                { label: 'High Risk (60-79)', count: 2890, pct: 3.4, color: 'bg-orange-500' },
                { label: 'Critical (80-100)', count: 650, pct: 0.8, color: 'bg-red-500' },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-300">{item.label}</span>
                    <span className="text-sm text-gray-400">{item.count.toLocaleString()} ({item.pct}%)</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#161b22] border border-gray-800 rounded-xl p-5">
            <h3 className="font-semibold text-white mb-4">Top Risk Countries</h3>
            <div className="space-y-3">
              {[
                { country: 'Russia (RU)', count: 1245, risk: 'High' },
                { country: 'China (CN)', count: 987, risk: 'Medium' },
                { country: 'North Korea (KP)', count: 234, risk: 'Critical' },
                { country: 'Nigeria (NG)', count: 456, risk: 'High' },
                { country: 'Brazil (BR)', count: 678, risk: 'Medium' },
              ].map(item => (
                <div key={item.country} className="flex items-center justify-between p-3 bg-[#0d1117] rounded-lg border border-gray-800">
                  <span className="text-sm text-gray-300">{item.country}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400">{item.count} txns</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      item.risk === 'Critical' ? 'bg-red-500/20 text-red-400'
                        : item.risk === 'High' ? 'bg-orange-500/20 text-orange-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {item.risk}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
