// src/components/auth/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute() {
  const isAuthenticated = !!localStorage.getItem('adminToken')
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}
