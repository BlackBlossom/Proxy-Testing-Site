import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../lib/axios'
import world from '../assets/world.svg'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/auth/login', credentials)
      localStorage.setItem('adminToken', data.token)
      localStorage.setItem('adminName', data.name)
      navigate('/')
    } catch (err) {
      setError('Invalid credentials')
    }
  }

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 10 } },
    hover: { scale: 1.01, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)' }
  }

  const buttonVariants = {
    hover: { scale: 1.02, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)' },
    tap: { scale: 0.98 }
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-white">
      {/* Background image - unchanged as requested */}
      <div className="absolute inset-0">
        <img
          src={world}
          alt="World Map"
          className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none z-0"
        />
      </div>

      {/* Modern light card with dark accents */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        // whileHover="hover"
        className="relative z-10 w-full max-w-md p-10 bg-white shadow-2xl rounded-3xl border border-[#D0D2E5]"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#1B1340] to-[#0D0A1F] bg-clip-text text-transparent">
            Admin Portal
          </h1>
          <p className="text-[#1B1340]/80 font-medium">Secure access to content management</p>
        </motion.div>

        <form onSubmit={handleLogin} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-3"
          >
            <label className="block text-sm font-medium text-[#1B1340] tracking-wide">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                className="w-full pl-4 pr-12 py-3.5 bg-white border border-[#D0D2E5] rounded-xl focus:ring-0 focus:ring-[#412D99] focus:border-[#412D99] transition-all placeholder-[#1B1340]/50 text-[#1B1340]"
                placeholder="name@company.com"
                required
              />
              <svg
                className="absolute right-4 top-4 w-5 h-5 text-[#1B1340]/60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="space-y-3"
          >
            <label className="block text-sm font-medium text-[#1B1340] tracking-wide">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full pl-4 pr-12 py-3.5 bg-white border border-[#D0D2E5] rounded-xl focus:ring-0 focus:ring-[#412D99] focus:border-[#412D99] transition-all placeholder-[#1B1340]/50 text-[#1B1340]"
                placeholder="••••••••"
                required
              />
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-[#1B1340]/60 hover:text-[#1B1340] transition-colors"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </motion.button>
            </div>
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-3 flex items-center gap-2 bg-[#F7F5FF] border-l-4 border-[#F2188C] text-[#1B1340] rounded-lg"
              >
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span className="text-sm">{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="w-full py-3.5 bg-gradient-to-r from-[#1B1340] to-[#0D0A1F] hover:from-[#0D0A1F] hover:to-[#1B1340] text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
          >
            Sign In
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}
