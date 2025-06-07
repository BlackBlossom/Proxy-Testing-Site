import { NavLink } from 'react-router-dom'
import {
  HomeIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  Square3Stack3DIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline'

export default function Sidebar() {
  return (
    <aside className="
      fixed h-screen overflow-hidden
      w-16 hover:w-64
      transition-all duration-300 ease-in-out
      bg-[#F7F5FF]
      backdrop-blur-lg
      border-r border-[#D0D2E5]
      shadow-xl
      group
    ">
      {/* Navigation Links */}
      <nav className="flex flex-col gap-1.5 p-2 mt-2">
        {/* <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center justify-center group-hover:justify-start
            p-2 rounded-lg
            transition-all duration-300
            ${isActive
              ? 'bg-gradient-to-r from-[#4B39EF]/10 to-[#4541FE]/10 text-[#1B1340]'
              : 'text-[#1B1340] hover:bg-[#D0D2E5]/30'}
            hover:shadow-sm hover:translate-x-1`
          }
        >
          <HomeIcon className="w-[30px] h-[30px] flex-shrink-0" />
          <span className="ml-3 hidden group-hover:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate">
            Dashboard
          </span>
        </NavLink> */}

        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center justify-center group-hover:justify-start
            p-2.5 rounded-lg
            transition-all duration-300
            ${isActive
              ? 'bg-gradient-to-r from-[#4B39EF]/10 to-[#4541FE]/10 text-[#1B1340]'
              : 'text-[#1B1340] hover:bg-[#D0D2E5]/30'}
            hover:shadow-sm hover:translate-x-1`
          }
        >
          <HomeIcon className="w-[30px] h-[30px] flex-shrink-0" />
          <span className="ml-3 hidden group-hover:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate">
            Home Page
          </span>
        </NavLink>

        <NavLink
          to="/privacy"
          className={({ isActive }) =>
            `flex items-center justify-center group-hover:justify-start
            p-2.5 rounded-lg
            transition-all duration-300
            ${isActive
              ? 'bg-gradient-to-r from-[#4B39EF]/10 to-[#4541FE]/10 text-[#1B1340]'
              : 'text-[#1B1340] hover:bg-[#D0D2E5]/30'}
            hover:shadow-sm hover:translate-x-1`
          }
        >
          <ShieldCheckIcon className="w-[30px] h-[30px] flex-shrink-0" />
          <span className="ml-3 hidden group-hover:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate">
            Privacy Policy
          </span>
        </NavLink>

        <NavLink
          to="/terms"
          className={({ isActive }) =>
            `flex items-center justify-center group-hover:justify-start
            p-2.5 rounded-lg
            transition-all duration-300
            ${isActive
              ? 'bg-gradient-to-r from-[#4B39EF]/10 to-[#4541FE]/10 text-[#1B1340]'
              : 'text-[#1B1340] hover:bg-[#D0D2E5]/30'}
            hover:shadow-sm hover:translate-x-1`
          }
        >
          <DocumentTextIcon className="w-[30px] h-[30px] flex-shrink-0" />
          <span className="ml-3 hidden group-hover:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate">
            Terms & Conditions
          </span>
        </NavLink>

        <NavLink
          to="/ads"
          className={({ isActive }) =>
            `flex items-center justify-center group-hover:justify-start
            p-2.5 rounded-lg
            transition-all duration-300
            ${isActive
              ? 'bg-gradient-to-r from-[#4B39EF]/10 to-[#4541FE]/10 text-[#1B1340]'
              : 'text-[#1B1340] hover:bg-[#D0D2E5]/30'}
            hover:shadow-sm hover:translate-x-1`
          }
        >
          <Square3Stack3DIcon className="w-[30px] h-[30px] flex-shrink-0" />
          <span className="ml-3 hidden group-hover:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate">
            Ads Management
          </span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center justify-center group-hover:justify-start
            p-2.5 rounded-lg
            transition-all duration-300
            ${isActive
              ? 'bg-gradient-to-r from-[#4B39EF]/10 to-[#4541FE]/10 text-[#1B1340]'
              : 'text-[#1B1340] hover:bg-[#D0D2E5]/30'}
            hover:shadow-sm hover:translate-x-1`
          }
        >
          <UserCircleIcon className="w-[30px] h-[30px] flex-shrink-0" />
          <span className="ml-3 hidden group-hover:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate">
            Profile
          </span>
        </NavLink>
      </nav>

      {/* Subtle glow effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -right-2 top-1/2 w-1 h-32 bg-gradient-to-b from-[#4B39EF]/40 to-[#4541FE]/40 rounded-full group-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
      </div>
    </aside>
  )
}
