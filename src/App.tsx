import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuth'
import { Layout } from './components/Layout'
import { AuthPage } from './pages/Auth'
import { Dashboard } from './pages/Dashboard'
import { Scheduler } from './pages/Scheduler'
import { ERP } from './pages/ERP'
import { CRM } from './pages/CRM'
import { RiskControl } from './pages/RiskControl'
import { Payments } from './pages/Payments'
import { Tenants } from './pages/Tenants'
import { Settings } from './pages/Settings'
import { Export } from './pages/Export'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />
  }
  return <>{children}</>
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="scheduler" element={<Scheduler />} />
        <Route path="erp" element={<ERP />} />
        <Route path="crm" element={<CRM />} />
        <Route path="risk-control" element={<RiskControl />} />
        <Route path="payments" element={<Payments />} />
        <Route path="tenants" element={<Tenants />} />
        <Route path="settings" element={<Settings />} />
        <Route path="export" element={<Export />} />
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
