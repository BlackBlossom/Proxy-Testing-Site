import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { ArrowRightOnRectangleIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'

export default function TopBar() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')

  useEffect(() => {
    setUsername(localStorage.getItem('adminName') || 'Admin')
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminName')
    navigate('/login')
  }

  return (
    <header className="
      flex items-center justify-between px-8 py-3
      bg-[#F7F5FF]
      backdrop-blur-lg
      border-b border-[#D0D2E5]
      shadow-sm
      transition-all duration-300
    ">
      <div className="flex items-center gap-4">
        <NavLink
          to="/profile"
          className="w-10 h-10 rounded-xl flex items-center justify-center
            bg-gradient-to-r from-[#372580] to-[#412D99]
            text-white font-bold shadow-lg group hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          <UserCircleIcon className="w-5 h-5" />
        </NavLink>
        <div>
          <p className="text-[12px] text-[#1B1340]/70">Welcome back,</p>
          <h2 className="
            text-[18px] font-bold tracking-tight
            bg-clip-text bg-gradient-to-r from-[#372580] to-[#412D99]
            text-transparent
            transition-all duration-300
          ">
            {username}
          </h2>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[#1B1340]/70">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </span>
        <button
          onClick={handleLogout}
          className="
            flex items-center gap-2 px-4 py-2
            text-sm font-medium
            bg-gradient-to-r from-[#372580] to-[#412D99]
            text-white rounded-xl
            hover:from-[#412D99] hover:to-[#372580]
            shadow-sm
            hover:shadow-lg
            transition-all duration-300
            group
          "
        >
          <ArrowRightOnRectangleIcon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  )
}
