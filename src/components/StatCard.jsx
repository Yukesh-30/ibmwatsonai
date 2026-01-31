"use client"

import { motion } from "framer-motion"

const StatCard = ({ title, value, icon, color, percentage, isIncreasing }) => {
  return (
    <motion.div whileHover={{ y: -5 }} className="stat-card">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-gray-500 text-sm">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>{icon}</div>
      </div>

      {percentage && (
        <div className="flex items-center mt-2">
          <span className={`text-${isIncreasing ? "green" : "red"}-500 text-sm flex items-center`}>
            {isIncreasing ? "↑" : "↓"} {percentage}%
          </span>
          <span className="text-gray-500 text-sm ml-2">from last month</span>
        </div>
      )}
    </motion.div>
  )
}

export default StatCard
