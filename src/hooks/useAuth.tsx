import { useState, useEffect, createContext, useContext, ReactNode } from 'react'

interface User {
  id: number
  username: string
  email: string
  role: string
  tenantId: number
}

interface AuthContextType {
  user: User | null
  token: string | null
  tenantId: number | null
  isAuthenticated: boolean
  login: (username: string, password: string, tenantId: number) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(localStorage.getItem('nexapay_token'))
  const [tenantId, setTenantId] = useState<number | null>(() => {
    const id = localStorage.getItem('nexapay_tenantId')
    return id ? parseInt(id) : null
  })

  useEffect(() => {
    if (token) {
      fetch('/api/auth/verify', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => {
          if (res.ok) return res.json()
          throw new Error('Invalid token')
        })
        .then(data => setUser(data))
        .catch(() => {
          localStorage.removeItem('nexapay_token')
          localStorage.removeItem('nexapay_tenantId')
          setToken(null)
          setTenantId(null)
        })
    }
  }, [token])

  const login = async (username: string, password: string, tenantId: number) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, tenantId: tenantId.toString() })
    })
    
    if (!res.ok) {
      throw new Error('Login failed')
    }
    
    const data = await res.json()
    setUser(data.user)
    setToken(data.token)
    setTenantId(tenantId)
    localStorage.setItem('nexapay_token', data.token)
    localStorage.setItem('nexapay_tenantId', tenantId.toString())
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    setTenantId(null)
    localStorage.removeItem('nexapay_token')
    localStorage.removeItem('nexapay_tenantId')
  }

  return (
    <AuthContext.Provider value={{
      user,
      token,
      tenantId,
      isAuthenticated: !!token && !!user,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
