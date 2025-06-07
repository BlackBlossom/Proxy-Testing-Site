import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UsersIcon, DocumentTextIcon, BellIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')

  // Widgets data
  const widgets = [
    { title: 'Total Visitors', value: '1,240', change: '+12%', icon: <UsersIcon className="w-8 h-8 text-[#372580]" />, bg: 'bg-[#D0D2E5]/30' },
    { title: 'Content Updates', value: '42', change: '+5', icon: <DocumentTextIcon className="w-8 h-8 text-[#412D99]" />, bg: 'bg-[#D0D2E5]/30' },
    { title: 'Alerts', value: '3', change: '-1', icon: <BellIcon className="w-8 h-8 text-[#F2188C]" />, bg: 'bg-[#D0D2E5]/30' },
  ]

  // Activity data
  const activities = [
    { id: 1, action: 'Section updated by Admin', time: 'Today, 10:30 AM' },
    { id: 2, action: 'Home content edited', time: 'Today, 09:15 AM' },
    { id: 3, action: 'Privacy policy updated', time: 'Yesterday, 3:45 PM' },
  ]

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 10 } },
    hover: { scale: 1.02, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)' }
  }

  // Animation variants for activity items
  const activityVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100, damping: 10 } },
    hover: { scale: 1.01 }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between mb-8"
      >
        <h1 className="text-2xl font-bold text-[#1B1340] tracking-tight">Dashboard</h1>
        <div className="flex gap-2">
          <motion.button
            onClick={() => setActiveTab('overview')}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            whileHover={{ scale: 1.05, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)' }}
            whileTap={{ scale: 0.98 }}
            className={`px-4 py-2 text-sm font-medium rounded-xl ${activeTab === 'overview' ? 'bg-gradient-to-r from-[#372580] to-[#412D99] text-white' : 'text-[#1B1340] hover:bg-[#D0D2E5]/30'}`}
          >
            Overview
          </motion.button>
          <motion.button
            onClick={() => setActiveTab('activity')}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            whileHover={{ scale: 1.05, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)' }}
            whileTap={{ scale: 0.98 }}
            className={`px-4 py-2 text-sm font-medium rounded-xl ${activeTab === 'activity' ? 'bg-gradient-to-r from-[#372580] to-[#412D99] text-white' : 'text-[#1B1340] hover:bg-[#D0D2E5]/30'}`}
          >
            Activity
          </motion.button>
        </div>
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {widgets.map((widget, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                transition={{ delay: 0.1 + index * 0.1 }}
                className="bg-white border border-[#D0D2E5] rounded-2xl shadow-sm p-6"
              >
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl ${widget.bg}`}>
                    {widget.icon}
                  </div>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="text-xs font-medium px-2 py-1 bg-[#D0D2E5]/30 text-[#1B1340] rounded-full"
                  >
                    {widget.change}
                  </motion.span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[#1B1340]">
                  {widget.title}
                </h3>
                <p className="text-2xl font-bold text-[#1B1340] mt-2">
                  {widget.value}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'activity' && (
          <motion.div
            key="activity"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                variants={activityVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                transition={{ delay: 0.1 + index * 0.1 }}
                className="flex items-start gap-4 p-4 bg-white border border-[#D0D2E5] rounded-2xl shadow-sm"
              >
                <div className="p-2 rounded-xl bg-[#D0D2E5]/30">
                  <AdjustmentsHorizontalIcon className="w-5 h-5 text-[#1B1340]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1B1340]">
                    {activity.action}
                  </p>
                  <p className="text-xs text-[#1B1340]/70">
                    {activity.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recent Activity (always visible on overview) */}
      {activeTab === 'overview' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-8 bg-white border border-[#D0D2E5] rounded-2xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#1B1340]">Recent Activity</h2>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('activity')}
              className="text-sm font-medium text-[#412D99] hover:underline"
            >
              View All
            </motion.button>
          </div>
          <div className="space-y-4">
            {activities.slice(0, 3).map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="p-2 rounded-xl bg-[#D0D2E5]/30">
                  <AdjustmentsHorizontalIcon className="w-5 h-5 text-[#1B1340]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1B1340]">
                    {activity.action}
                  </p>
                  <p className="text-xs text-[#1B1340]/70">
                    {activity.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
