// src/layouts/AdminLayout.jsx
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/navigation/Sidebar'
import TopBar from '../components/navigation/TopBar'
import useAutoLogout from '../lib/useAutoLogout'

export default function AdminLayout() {
    useAutoLogout()
  return (
        <div className="flex flex-col h-screen">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto px-6 bg-[#F7F5FF] dark:bg-gray-800">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
