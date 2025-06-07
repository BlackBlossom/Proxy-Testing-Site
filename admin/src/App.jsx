// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import HomeEditorPage from './pages/HomeEditorPage'
import PrivacyEditorPage from './pages/PrivacyEditorPage'
import TermsEditorPage from './pages/TermsEditorPage'
import AdsManager from './pages/AdsManager'
import ProtectedRoute from './components/auth/ProtectedRoute'
import ProfileSection from './pages/ProfileSection'

export default function App() {

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          {/* <Route path="/" element={<DashboardPage />} /> */}
          <Route path="/" element={<HomeEditorPage />} />
          <Route path="/privacy" element={<PrivacyEditorPage />} />
          <Route path="/terms" element={<TermsEditorPage />} />
          <Route path="/ads" element={<AdsManager />} />
          <Route path="/profile" element={<ProfileSection />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
