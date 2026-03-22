import { CreditCard, TrendingUp, Clock, AlertCircle, Download } from 'lucide-react'

interface Transaction {
  id: string
  merchant: string
  amount: string
  method: string
  status: 'Success' | 'Failed' | 'Pending'
  time: string
}

const transactions: Transaction[] = [
  { id: 'TXN-9912', merchant: 'Acme Corp', amount: '$12,450', method: 'Visa', status: 'Success', time: 'just now' },
  { id: 'TXN-9911', merchant: 'Globex Ltd', amount: '$8,920', method: 'Mastercard', status: 'Success', time: '30s ago' },
  { id: 'TXN-9910', merchant: 'Initech Inc', amount: '$340', method: 'AMEX', status: 'Failed', time: '1m ago' },
  { id: 'TXN-9909', merchant: 'Stark Ind.', amount: '$45,800', method: 'Visa', status: 'Success', time: '2m ago' },
  { id: 'TXN-9908', merchant: 'Wayne Ent.', amount: '$6,730', method: 'Mastercard', status: 'Pending', time: '3m ago' },
  { id: 'TXN-9907', merchant: 'Umbrella Corp', amount: '$1,200', method: 'Visa', status: 'Success', time: '5m ago' },
  { id: 'TXN-9906', merchant: 'Cyberdyne', amount: '$23,000', method: 'AMEX', status: 'Success', time: '7m ago' },
  { id: 'TXN-9905', merchant: 'Oscorp', amount: '$5,600', method: 'Mastercard', status: 'Success', time: '10m ago' },
  { id: 'TXN-9904', merchant: 'Soylent Inc', amount: '$890', method: 'Visa', status: 'Failed', time: '12m ago' },
  { id: 'TXN-9903', merchant: 'TechVision', amount: '$3,410', method: 'Visa', status: 'Success', time: '15m ago' },
]

const paymentMethods = [
  { name: 'Visa', pct: 45, color: 'bg-blue-500' },
  { name: 'Mastercard', pct: 30, color: 'bg-red-500' },
  { name: 'AMEX', pct: 15, color: 'bg-cyan-500' },
  { name: 'Other', pct: 10, color: 'bg-gray-500' },
]

const statusBadge: Record<string, string> = {
  Success: 'bg-emerald-500/20 text-emerald-400',
  Failed: 'bg-red-500/20 text-red-400',
  Pending: 'bg-yellow-500/20 text-yellow-400',
}

export function Payments() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Payments</h1>
          <p className="text-gray-400 text-sm mt-0.5">Transaction processing & payment gateway management</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors">
          <Download size={15} />
          Export
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Total Volume', value: '$2.4M', change: '+8.3%', icon: CreditCard, color: 'text-blue-400', bg: 'bg-blue-400/10', positive: true },
          { label: 'Success Rate', value: '99.2%', change: '+0.1%', icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-400/10', positive: true },
          { label: 'Avg Processing', value: '1.8s', change: '-0.2s', icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-400/10', positive: true },
          { label: 'Chargebacks', value: '0.08%', change: '-0.01%', icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-400/10', positive: false },
        ].map(s => {
          const Icon = s.icon
          return (
            <div key={s.label} className="bg-[#161b22] border border-gray-800 rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-8 h-8 ${s.bg} rounded-lg flex items-center justify-center`}>
                  <Icon className={s.color} size={16} />
                </div>
                <span className={`text-xs font-medium ${s.positive ? 'text-emerald-400' : 'text-gray-400'}`}>
                  {s.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            </div>
          )
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Transactions Table */}
        <div className="xl:col-span-2 bg-[#161b22] border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-800 flex items-center justify-between">
            <h2 className="font-semibold text-white">Recent Transactions</h2>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs text-emerald-400">Live</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  {['Txn ID', 'Merchant', 'Amount', 'Method', 'Status', 'Time'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs text-gray-500 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {transactions.map(tx => (
                  <tr key={tx.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                    <td className="px-5 py-3 text-indigo-400 font-mono text-xs">{tx.id}</td>
                    <td className="px-5 py-3 text-gray-200">{tx.merchant}</td>
                    <td className="px-5 py-3 text-white font-medium">{tx.amount}</td>
                    <td className="px-5 py-3 text-gray-400">{tx.method}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${statusBadge[tx.status]}`}>
                        {tx.status === 'Success' && '✓ '}
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

        {/* Right Panel */}
        <div className="space-y-4">
          {/* Payment Methods */}
          <div className="bg-[#161b22] border border-gray-800 rounded-xl p-5">
            <h3 className="font-semibold text-white mb-4">Payment Methods</h3>
            <div className="space-y-3">
              {paymentMethods.map(m => (
                <div key={m.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-300">{m.name}</span>
                    <span className="text-sm text-gray-400">{m.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className={`h-full ${m.color} rounded-full`} style={{ width: `${m.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Summary */}
          <div className="bg-[#161b22] border border-gray-800 rounded-xl p-5">
            <h3 className="font-semibold text-white mb-4">Today's Summary</h3>
            <div className="space-y-3">
              {[
                { label: 'Processed', value: '$2.4M' },
                { label: 'Transactions', value: '84,230' },
                { label: 'Declined', value: '127' },
                { label: 'Refunds', value: '$12,450' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
                  <span className="text-sm text-gray-400">{item.label}</span>
                  <span className="text-sm font-medium text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
