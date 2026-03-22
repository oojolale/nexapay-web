import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { Eye, EyeOff, Loader2, Mail, Lock, Building2, Shield, KeyRound } from 'lucide-react'

interface Tenant {
  id: number
  name: string
  domain: string
  plan: string
}

type Step = 'signin' | 'verify' | 'tenant'

export function AuthPage() {
  const [step, setStep] = useState<Step>('signin')
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [selectedTenant, setSelectedTenant] = useState<number | null>(null)
  const [email, setEmail] = useState('admin')
  const [password, setPassword] = useState('admin123')
  const [verifyCode, setVerifyCode] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
    fetch('/api/auth/tenants')
      .then(res => res.json())
      .then((data: Tenant[]) => {
        setTenants(data)
        if (data.length > 0) setSelectedTenant(data[0].id)
      })
      .catch(() => {})
  }, [isAuthenticated, navigate])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !password) return
    // Move to verify step (simulated 2FA)
    setStep('verify')
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    // Skip real TOTP, just move to tenant step
    setStep('tenant')
  }

  const handleTenantSelect = async () => {
    if (!selectedTenant) return
    setError('')
    setLoading(true)
    try {
      await login(email, password, selectedTenant)
      navigate('/dashboard')
    } catch {
      setError('Login failed. Please check credentials.')
      setStep('signin')
    } finally {
      setLoading(false)
    }
  }

  const steps = [
    { key: 'signin', label: 'Sign In', icon: KeyRound },
    { key: 'verify', label: 'Verify', icon: Shield },
    { key: 'tenant', label: 'Tenant', icon: Building2 },
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0d1117] p-4">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col items-center gap-3"
      >
        <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center">
          <Shield className="text-white" size={28} />
        </div>
        <h1 className="text-2xl font-bold text-white">NexaPay</h1>
      </motion.div>

      {/* Step indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-6 mb-8"
      >
        {steps.map((s, i) => {
          const Icon = s.icon
          const isActive = step === s.key
          const isPast = steps.findIndex(x => x.key === step) > i
          return (
            <div key={s.key} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 ${isActive || isPast ? 'text-white' : 'text-gray-500'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isActive ? 'bg-indigo-600' : isPast ? 'bg-indigo-800' : 'bg-gray-800'
                }`}>
                  <Icon size={15} />
                </div>
                <span className="text-sm font-medium">{s.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`ml-2 w-6 h-px ${isPast ? 'bg-indigo-600' : 'bg-gray-700'}`} />
              )}
            </div>
          )
        })}
      </motion.div>

      {/* Card */}
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-sm bg-[#161b22] rounded-2xl border border-gray-800 p-8"
      >
        {/* Step 1: Sign In */}
        {step === 'signin' && (
          <>
            <h2 className="text-xl font-bold text-white mb-1">Welcome Back</h2>
            <p className="text-gray-400 text-sm mb-6">Sign in to your NexaPay account</p>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-[#0d1117] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-gray-600"
                    placeholder="admin@company.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 bg-[#0d1117] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-gray-600"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <div className="flex justify-end mt-1">
                  <button type="button" className="text-xs text-indigo-400 hover:text-indigo-300">
                    Forgot password?
                  </button>
                </div>
              </div>
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2"
              >
                Sign In →
              </button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-4">
              No account? <span className="text-indigo-400 cursor-pointer hover:text-indigo-300">Register</span>
            </p>
          </>
        )}

        {/* Step 2: Verify */}
        {step === 'verify' && (
          <>
            <h2 className="text-xl font-bold text-white mb-1">Verify Identity</h2>
            <p className="text-gray-400 text-sm mb-6">Enter your 2FA verification code</p>
            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Verification Code</label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input
                    type="text"
                    value={verifyCode}
                    onChange={e => setVerifyCode(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-[#0d1117] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-gray-600 tracking-widest"
                    placeholder="000000"
                    maxLength={6}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Enter any code to continue (demo mode)</p>
              </div>
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium text-sm transition-colors"
              >
                Verify →
              </button>
              <button
                type="button"
                onClick={() => setStep('signin')}
                className="w-full py-2.5 bg-transparent border border-gray-700 text-gray-300 hover:bg-gray-800 rounded-lg font-medium text-sm transition-colors"
              >
                Back
              </button>
            </form>
          </>
        )}

        {/* Step 3: Tenant */}
        {step === 'tenant' && (
          <>
            <h2 className="text-xl font-bold text-white mb-1">Select Tenant</h2>
            <p className="text-gray-400 text-sm mb-6">Choose your organization</p>
            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
              {tenants.map(tenant => (
                <button
                  key={tenant.id}
                  onClick={() => setSelectedTenant(tenant.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors text-left ${
                    selectedTenant === tenant.id
                      ? 'border-indigo-500 bg-indigo-500/10'
                      : 'border-gray-700 hover:border-gray-600 bg-[#0d1117]'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold ${
                    selectedTenant === tenant.id ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'
                  }`}>
                    {tenant.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{tenant.name}</p>
                    <p className="text-xs text-gray-500 truncate">{tenant.domain}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    (tenant.plan || '').toUpperCase() === 'ENTERPRISE'
                      ? 'bg-purple-500/20 text-purple-300'
                      : (tenant.plan || '').toUpperCase() === 'PRO'
                      ? 'bg-blue-500/20 text-blue-300'
                      : 'bg-gray-700 text-gray-400'
                  }`}>
                    {tenant.plan || 'Standard'}
                  </span>
                </button>
              ))}
            </div>
            {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
            <button
              onClick={handleTenantSelect}
              disabled={loading || !selectedTenant}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              Continue →
            </button>
          </>
        )}
      </motion.div>

      <p className="mt-6 text-xs text-gray-600">
        Secured by NexaPay Platform v2.2 · SOC 2 Compliant
      </p>
    </div>
  )
}
