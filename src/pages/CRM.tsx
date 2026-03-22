import { useState } from 'react'
import { Users, Eye, TrendingUp, Star, MoreHorizontal } from 'lucide-react'

type Tab = 'pipeline' | 'contacts' | 'analytics'

interface Deal {
  company: string
  product: string
  value: string
  days: string
  avatar: string
  color: string
}

interface PipelineColumn {
  stage: string
  count: number
  total: string
  color: string
  deals: Deal[]
}

const pipelineData: PipelineColumn[] = [
  {
    stage: 'Lead', count: 8, total: '$240K', color: 'text-blue-400 border-blue-400',
    deals: [
      { company: 'Oscorp', product: 'Payment Integration', value: '$45K', days: '5d', avatar: 'AK', color: 'bg-blue-600' },
      { company: 'Umbrella Corp', product: 'Risk Module', value: '$32K', days: '7d', avatar: 'BL', color: 'bg-cyan-600' },
    ]
  },
  {
    stage: 'Qualified', count: 5, total: '$380K', color: 'text-yellow-400 border-yellow-400',
    deals: [
      { company: 'Cyberdyne', product: 'Full Suite', value: '$180K', days: '5d', avatar: 'SM', color: 'bg-green-600' },
      { company: 'Soylent', product: 'ERP Module', value: '$85K', days: '12d', avatar: 'TL', color: 'bg-yellow-600' },
    ]
  },
  {
    stage: 'Proposal', count: 3, total: '$520K', color: 'text-purple-400 border-purple-400',
    deals: [
      { company: 'Initech', product: 'Enterprise Plan', value: '$320K', days: '2d', avatar: 'RD', color: 'bg-red-600' },
      { company: 'Globex', product: 'Custom Deploy', value: '$200K', days: '9d', avatar: 'MK', color: 'bg-purple-600' },
    ]
  },
  {
    stage: 'Closed', count: 12, total: '$890K', color: 'text-emerald-400 border-emerald-400',
    deals: [
      { company: 'Acme Corp', product: 'Premium', value: '$450K', days: '2d', avatar: 'JW', color: 'bg-indigo-600' },
      { company: 'Stark Ind', product: 'Enterprise', value: '$280K', days: '9d', avatar: 'PH', color: 'bg-orange-600' },
    ]
  },
]

const contacts = [
  { name: 'Tony Stark', company: 'Stark Industries', stage: 'Closed', value: '$450K', email: 'tony@stark.com' },
  { name: 'Bruce Wayne', company: 'Wayne Enterprises', stage: 'Lead', value: '$32K', email: 'bruce@wayne.com' },
  { name: 'Peter Parker', company: 'Oscorp', stage: 'Qualified', value: '$180K', email: 'peter@oscorp.com' },
  { name: 'Diana Prince', company: 'Initech', stage: 'Proposal', value: '$320K', email: 'diana@initech.com' },
  { name: 'Clark Kent', company: 'Acme Corp', stage: 'Closed', value: '$280K', email: 'clark@acme.com' },
  { name: 'Natasha Romanov', company: 'Globex', stage: 'Proposal', value: '$200K', email: 'natasha@globex.com' },
]

const stageColors: Record<string, string> = {
  Lead: 'bg-blue-500/20 text-blue-400',
  Qualified: 'bg-yellow-500/20 text-yellow-400',
  Proposal: 'bg-purple-500/20 text-purple-400',
  Closed: 'bg-emerald-500/20 text-emerald-400',
}

export function CRM() {
  const [tab, setTab] = useState<Tab>('pipeline')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">CRM</h1>
        <p className="text-gray-400 text-sm mt-0.5">Customer relationship management & pipeline analytics</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Total Leads', value: '284', sub: '+18 this week', icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
          { label: 'Active Deals', value: '67', sub: '$1.2M pipeline value', icon: Eye, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
          { label: 'Conversion Rate', value: '24.6%', sub: '+2.1%', icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-400/10' },
          { label: 'Customer Satisfaction', value: '4.7/5', sub: 'Based on reviews', icon: Star, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
        ].map(s => {
          const Icon = s.icon
          return (
            <div key={s.label} className="bg-[#161b22] border border-gray-800 rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500 font-medium">{s.label.toUpperCase()}</span>
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
        {['pipeline', 'contacts', 'analytics'].map(t => (
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

      {/* Pipeline */}
      {tab === 'pipeline' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {pipelineData.map(col => (
            <div key={col.stage} className="bg-[#161b22] border border-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`font-semibold text-sm ${col.color.split(' ')[0]}`}>{col.stage}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${col.color.split(' ')[0].replace('text-', 'bg-').replace('400', '400/20')}`}>
                    {col.count}
                  </span>
                </div>
                <span className="text-xs text-gray-500">{col.total}</span>
              </div>
              <div className="space-y-2">
                {col.deals.map(deal => (
                  <div key={deal.company} className="bg-[#0d1117] border border-gray-800 rounded-lg p-3">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <p className="text-sm font-medium text-white">{deal.company}</p>
                        <p className="text-xs text-gray-500">{deal.product}</p>
                      </div>
                      <button className="text-gray-600 hover:text-gray-400">
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-semibold text-white">{deal.value}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-gray-500">{deal.days}</span>
                        <div className={`w-6 h-6 rounded-full ${deal.color} flex items-center justify-center text-[10px] text-white font-bold`}>
                          {deal.avatar}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Contacts */}
      {tab === 'contacts' && (
        <div className="bg-[#161b22] border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-800">
            <h2 className="font-semibold text-white">Contacts</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  {['Name', 'Company', 'Email', 'Stage', 'Value'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs text-gray-500 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {contacts.map(contact => (
                  <tr key={contact.name} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                    <td className="px-5 py-3 text-white font-medium">{contact.name}</td>
                    <td className="px-5 py-3 text-gray-300">{contact.company}</td>
                    <td className="px-5 py-3 text-gray-400 font-mono text-xs">{contact.email}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${stageColors[contact.stage]}`}>
                        {contact.stage}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-cyan-400 font-medium">{contact.value}</td>
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
            <h3 className="font-semibold text-white mb-4">Pipeline Value by Stage</h3>
            <div className="space-y-4">
              {pipelineData.map(col => (
                <div key={col.stage}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-gray-300">{col.stage}</span>
                    <span className="text-sm text-gray-400">{col.total}</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{
                        width: col.stage === 'Closed' ? '100%'
                          : col.stage === 'Proposal' ? '58%'
                          : col.stage === 'Qualified' ? '43%'
                          : '27%'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#161b22] border border-gray-800 rounded-xl p-5">
            <h3 className="font-semibold text-white mb-4">Conversion Funnel</h3>
            <div className="space-y-3">
              {[
                { stage: 'Lead → Qualified', rate: '68%', count: '193 of 284' },
                { stage: 'Qualified → Proposal', rate: '44%', count: '85 of 193' },
                { stage: 'Proposal → Closed', rate: '80%', count: '68 of 85' },
                { stage: 'Overall Win Rate', rate: '24.6%', count: '68 of 284' },
              ].map(item => (
                <div key={item.stage} className="flex items-center justify-between p-3 bg-[#0d1117] rounded-lg border border-gray-800">
                  <div>
                    <p className="text-sm text-white">{item.stage}</p>
                    <p className="text-xs text-gray-500">{item.count}</p>
                  </div>
                  <span className="text-lg font-bold text-cyan-400">{item.rate}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
