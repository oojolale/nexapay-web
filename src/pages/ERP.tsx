import { useState } from 'react'
import { ShoppingCart, DollarSign, Package, TrendingUp } from 'lucide-react'

type Tab = 'orders' | 'inventory' | 'financials'

interface Order {
  id: string
  customer: string
  amount: string
  items: string
  status: 'Processing' | 'Fulfilled' | 'Pending' | 'Cancelled'
  date: string
}

const orders: Order[] = [
  { id: 'ORD-2847', customer: 'Acme Corp', amount: '$12,450', items: '24 items', status: 'Processing', date: 'Mar 22' },
  { id: 'ORD-2846', customer: 'Globex Ltd', amount: '$8,920', items: '12 items', status: 'Fulfilled', date: 'Mar 21' },
  { id: 'ORD-2845', customer: 'Initech Inc', amount: '$3,200', items: '5 items', status: 'Pending', date: 'Mar 21' },
  { id: 'ORD-2844', customer: 'Stark Industries', amount: '$45,800', items: '48 items', status: 'Fulfilled', date: 'Mar 20' },
  { id: 'ORD-2843', customer: 'Wayne Enterprises', amount: '$6,730', items: '8 items', status: 'Cancelled', date: 'Mar 20' },
  { id: 'ORD-2842', customer: 'Umbrella Corp', amount: '$15,300', items: '19 items', status: 'Processing', date: 'Mar 19' },
  { id: 'ORD-2841', customer: 'Cyberdyne Systems', amount: '$9,100', items: '11 items', status: 'Fulfilled', date: 'Mar 19' },
  { id: 'ORD-2840', customer: 'Rekall Inc', amount: '$2,450', items: '3 items', status: 'Pending', date: 'Mar 18' },
]

interface InventoryItem {
  sku: string
  name: string
  category: string
  qty: number
  price: string
  status: 'In Stock' | 'Low Stock' | 'Out of Stock'
}

const inventory: InventoryItem[] = [
  { sku: 'SKU-001', name: 'Payment Gateway API', category: 'Software', qty: 999, price: '$499/mo', status: 'In Stock' },
  { sku: 'SKU-002', name: 'Risk Engine Module', category: 'Software', qty: 47, price: '$299/mo', status: 'In Stock' },
  { sku: 'SKU-003', name: 'Enterprise License', category: 'License', qty: 8, price: '$999/mo', status: 'Low Stock' },
  { sku: 'SKU-004', name: 'CRM Module', category: 'Software', qty: 0, price: '$199/mo', status: 'Out of Stock' },
  { sku: 'SKU-005', name: 'Scheduler Pro', category: 'Software', qty: 123, price: '$149/mo', status: 'In Stock' },
  { sku: 'SKU-006', name: 'API Key Bundle', category: 'Add-on', qty: 5, price: '$49/mo', status: 'Low Stock' },
]

const financials = [
  { month: 'Oct', revenue: 680000, expenses: 420000, profit: 260000 },
  { month: 'Nov', revenue: 720000, expenses: 445000, profit: 275000 },
  { month: 'Dec', revenue: 850000, expenses: 480000, profit: 370000 },
  { month: 'Jan', revenue: 780000, expenses: 460000, profit: 320000 },
  { month: 'Feb', revenue: 820000, expenses: 470000, profit: 350000 },
  { month: 'Mar', revenue: 892000, expenses: 495000, profit: 397000 },
]

const statusColors: Record<string, string> = {
  Processing: 'bg-yellow-500/20 text-yellow-400',
  Fulfilled: 'bg-emerald-500/20 text-emerald-400',
  Pending: 'bg-gray-700 text-gray-400',
  Cancelled: 'bg-red-500/20 text-red-400',
}

const invStatusColors: Record<string, string> = {
  'In Stock': 'bg-emerald-500/20 text-emerald-400',
  'Low Stock': 'bg-yellow-500/20 text-yellow-400',
  'Out of Stock': 'bg-red-500/20 text-red-400',
}

export function ERP() {
  const [tab, setTab] = useState<Tab>('orders')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">ERP System</h1>
        <p className="text-gray-400 text-sm mt-0.5">Order lifecycle, inventory & financial management</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'TOTAL ORDERS', value: '1,847', sub: '+12% this month', icon: ShoppingCart, color: 'text-blue-400', bg: 'bg-blue-400/10' },
          { label: 'REVENUE', value: '$892K', sub: '+7.2% this month', icon: DollarSign, color: 'text-green-400', bg: 'bg-green-400/10' },
          { label: 'INVENTORY ITEMS', value: '3,420', sub: 'Active SKUs', icon: Package, color: 'text-purple-400', bg: 'bg-purple-400/10' },
          { label: 'FULFILLMENT RATE', value: '96.8%', sub: '+1.2% this month', icon: TrendingUp, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
        ].map(s => {
          const Icon = s.icon
          return (
            <div key={s.label} className="bg-[#161b22] border border-gray-800 rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500 font-medium tracking-wide">{s.label}</span>
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
        {['orders', 'inventory', 'financials'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t as Tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
              tab === t
                ? 'bg-indigo-600 text-white'
                : 'bg-[#161b22] border border-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Orders Tab */}
      {tab === 'orders' && (
        <div className="bg-[#161b22] border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-800">
            <h2 className="font-semibold text-white">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  {['Order ID', 'Customer', 'Amount', 'Items', 'Status', 'Date'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs text-gray-500 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                    <td className="px-5 py-3 text-indigo-400 font-mono text-xs">{order.id}</td>
                    <td className="px-5 py-3 text-gray-200">{order.customer}</td>
                    <td className="px-5 py-3 text-white font-medium">{order.amount}</td>
                    <td className="px-5 py-3 text-gray-400">{order.items}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-500">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Inventory Tab */}
      {tab === 'inventory' && (
        <div className="bg-[#161b22] border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-800">
            <h2 className="font-semibold text-white">Inventory Items</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  {['SKU', 'Name', 'Category', 'Quantity', 'Price', 'Status'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs text-gray-500 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {inventory.map(item => (
                  <tr key={item.sku} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                    <td className="px-5 py-3 text-indigo-400 font-mono text-xs">{item.sku}</td>
                    <td className="px-5 py-3 text-gray-200">{item.name}</td>
                    <td className="px-5 py-3 text-gray-400">{item.category}</td>
                    <td className="px-5 py-3 text-white">{item.qty.toLocaleString()}</td>
                    <td className="px-5 py-3 text-gray-300">{item.price}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${invStatusColors[item.status]}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Financials Tab */}
      {tab === 'financials' && (
        <div className="bg-[#161b22] border border-gray-800 rounded-xl p-5">
          <h2 className="font-semibold text-white mb-4">Financial Summary (Last 6 Months)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  {['Month', 'Revenue', 'Expenses', 'Profit', 'Margin'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs text-gray-500 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {financials.map(row => {
                  const margin = ((row.profit / row.revenue) * 100).toFixed(1)
                  return (
                    <tr key={row.month} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                      <td className="px-4 py-3 text-gray-300 font-medium">{row.month}</td>
                      <td className="px-4 py-3 text-green-400">${(row.revenue / 1000).toFixed(0)}K</td>
                      <td className="px-4 py-3 text-red-400">${(row.expenses / 1000).toFixed(0)}K</td>
                      <td className="px-4 py-3 text-cyan-400">${(row.profit / 1000).toFixed(0)}K</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-24 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${margin}%` }} />
                          </div>
                          <span className="text-xs text-gray-400">{margin}%</span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
