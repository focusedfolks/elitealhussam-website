import { Navigate, useLocation } from 'react-router-dom'
import { useAdminAuth } from './AdminAuth'
import { AdminLayout } from './AdminLayout'

export function ProtectedAdmin() {
  const { ready, user } = useAdminAuth()
  const location = useLocation()

  if (!ready) {
    return (
      <div className="admin-login">
        <p style={{ color: '#fff' }}>Loading admin…</p>
      </div>
    )
  }

  if (!user) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location.pathname }}
      />
    )
  }

  return <AdminLayout />
}
