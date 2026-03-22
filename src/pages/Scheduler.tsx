import { useState } from 'react'
import { Play, List, Lock, Clock, Eye, CheckCircle2, XCircle, Loader2, Timer } from 'lucide-react'

type Tab = 'queue' | 'locks' | 'jobs'

interface Task {
  id: string
  type: string
  tenant: string
  priority: 'High' | 'Medium' | 'Low'
  status: 'Running' | 'Queued' | 'Completed' | 'Failed'
  created: string
}

const tasks: Task[] = [
  { id: 'TSK-001', type: 'payment_batch', tenant: 'Acme Corp', priority: 'High', status: 'Running', created: '2 min ago' },
  { id: 'TSK-002', type: 'data_sync', tenant: 'Globex', priority: 'Medium', status: 'Queued', created: '5 min ago' },
  { id: 'TSK-003', type: 'report_gen', tenant: 'Initech', priority: 'Low', status: 'Completed', created: '12 min ago' },
  { id: 'TSK-004', type: 'risk_assessment', tenant: 'Umbrella', priority: 'High', status: 'Running', created: '14 min ago' },
  { id: 'TSK-005', type: 'tenant_sync', tenant: 'Wayne Ent.', priority: 'Medium', status: 'Queued', created: '18 min ago' },
  { id: 'TSK-006', type: 'data_cleanup', tenant: 'Acme Corp', priority: 'Low', status: 'Completed', created: '25 min ago' },
  { id: 'TSK-007', type: 'payment_batch', tenant: 'Globex', priority: 'High', status: 'Failed', created: '31 min ago' },
  { id: 'TSK-008', type: 'report_gen', tenant: 'Initech', priority: 'Medium', status: 'Queued', created: '40 min ago' },
]

const locks = [
  { resource: 'order_write', holder: 'TSK-001', acquired: '2m ago', ttl: '4:32' },
  { resource: 'payment_batch', holder: 'TSK-004', acquired: '14m ago', ttl: '1:12' },
  { resource: 'report_cache', holder: 'TSK-002', acquired: '5m ago', ttl: '3:45' },
  { resource: 'risk_calc', holder: 'TSK-004', acquired: '14m ago', ttl: '2:08' },
]

const scheduledJobs = [
  { name: 'Daily Reconciliation', cron: '0 0 * * *', type: 'REPORT', next: '23:15:00', status: 'Active' },
  { name: 'Risk Score Recalc', cron: '*/15 * * * *', type: 'RISK_CALC', next: '00:12:34', status: 'Active' },
  { name: 'Tenant Data Sync', cron: '0 */6 * * *', type: 'SYNC', next: '05:58:00', status: 'Active' },
  { name: 'Batch Payment Process', cron: '0 2 * * *', type: 'REPORT', next: '02:00:00', status: 'Paused' },
]

const priorityColors: Record<string, string> = {
  High: 'bg-red-500/20 text-red-400',
  Medium: 'bg-yellow-500/20 text-yellow-400',
  Low: 'bg-gray-700 text-gray-400',
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'Running') return (
    <span className="inline-flex items-center gap-1 text-xs text-green-400">
      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
      Running
    </span>
  )
  if (status === 'Queued') return (
    <span className="inline-flex items-center gap-1 text-xs text-gray-400">
      <Clock size={11} /> Queued
    </span>
  )
  if (status === 'Completed') return (
    <span className="inline-flex items-center gap-1 text-xs text-cyan-400">
      <CheckCircle2 size={11} /> Completed
    </span>
  )
  if (status === 'Failed') return (
    <span className="inline-flex items-center gap-1 text-xs text-red-400">
      <XCircle size={11} /> Failed
    </span>
  )
  return <span className="text-xs text-gray-400">{status}</span>
}

export function Scheduler() {
  const [tab, setTab] = useState<Tab>('queue')

  const tabs = [
    { key: 'queue', label: 'Task Queue' },
    { key: 'locks', label: 'Distributed Locks' },
    { key: 'jobs', label: 'Job Scheduler' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Scheduling System</h1>
        <p className="text-gray-400 text-sm mt-0.5">Task queue management & Redis distributed lock monitoring</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Active Jobs', value: '156', icon: Play, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
          { label: 'Queue Depth', value: '342', icon: List, color: 'text-blue-400', bg: 'bg-blue-400/10' },
          { label: 'Active Locks', value: '89', icon: Lock, color: 'text-purple-400', bg: 'bg-purple-400/10' },
          { label: 'Avg Lock Duration', value: '1.2s', icon: Timer, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
        ].map(s => {
          const Icon = s.icon
          return (
            <div key={s.label} className="bg-[#161b22] border border-gray-800 rounded-xl p-5">
              <div className={`w-10 h-10 ${s.bg} rounded-lg flex items-center justify-center mb-3`}>
                <Icon className={s.color} size={20} />
              </div>
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-sm text-gray-400">{s.label}</div>
            </div>
          )
        })}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#0d1117] border border-gray-800 rounded-xl p-1 w-fit">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key as Tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t.key
                ? 'bg-indigo-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-[#161b22] border border-gray-800 rounded-xl overflow-hidden">
        {tab === 'queue' && (
          <>
            <div className="px-5 py-4 border-b border-gray-800">
              <h2 className="font-semibold text-white">Active Task Queue</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800">
                    {['Task ID', 'Type', 'Tenant', 'Priority', 'Status', 'Created', 'Actions'].map(h => (
                      <th key={h} className="text-left px-5 py-3 text-xs text-gray-500 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tasks.map(task => (
                    <tr key={task.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                      <td className="px-5 py-3 text-indigo-400 font-mono text-xs">{task.id}</td>
                      <td className="px-5 py-3 text-gray-300 font-mono text-xs">{task.type}</td>
                      <td className="px-5 py-3 text-gray-300">{task.tenant}</td>
                      <td className="px-5 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded font-medium ${priorityColors[task.priority]}`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <StatusBadge status={task.status} />
                      </td>
                      <td className="px-5 py-3 text-gray-500 text-xs">{task.created}</td>
                      <td className="px-5 py-3">
                        <button className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300">
                          <Eye size={12} /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === 'locks' && (
          <>
            <div className="px-5 py-4 border-b border-gray-800">
              <h2 className="font-semibold text-white">Active Distributed Locks</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800">
                    {['Resource', 'Lock Holder', 'Acquired', 'TTL Remaining'].map(h => (
                      <th key={h} className="text-left px-5 py-3 text-xs text-gray-500 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {locks.map(lock => (
                    <tr key={lock.resource} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                      <td className="px-5 py-3 text-indigo-400 font-mono text-xs">{lock.resource}</td>
                      <td className="px-5 py-3 text-gray-300 font-mono text-xs">{lock.holder}</td>
                      <td className="px-5 py-3 text-gray-500 text-xs">{lock.acquired}</td>
                      <td className="px-5 py-3">
                        <span className="text-xs text-yellow-400 font-mono">{lock.ttl}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === 'jobs' && (
          <>
            <div className="px-5 py-4 border-b border-gray-800">
              <h2 className="font-semibold text-white">Scheduled Jobs</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800">
                    {['Job Name', 'Cron Expression', 'Type', 'Next Run', 'Status'].map(h => (
                      <th key={h} className="text-left px-5 py-3 text-xs text-gray-500 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {scheduledJobs.map(job => (
                    <tr key={job.name} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                      <td className="px-5 py-3 text-white text-sm font-medium">{job.name}</td>
                      <td className="px-5 py-3 text-gray-400 font-mono text-xs">{job.cron}</td>
                      <td className="px-5 py-3">
                        <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">{job.type}</span>
                      </td>
                      <td className="px-5 py-3 text-gray-300 font-mono text-xs">{job.next}</td>
                      <td className="px-5 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          job.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-700 text-gray-400'
                        }`}>
                          {job.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
