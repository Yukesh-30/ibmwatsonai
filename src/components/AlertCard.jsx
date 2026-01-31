"use client"

import { motion } from "framer-motion"
import { FiAlertCircle, FiClock, FiInfo } from "react-icons/fi"

const AlertCard = ({ type, title, message, time }) => {
  const getAlertStyles = () => {
    switch (type) {
      case "danger":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          icon: <FiAlertCircle className="text-red-500" size={20} />,
          textColor: "text-red-700",
        }
      case "warning":
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          icon: <FiInfo className="text-yellow-500" size={20} />,
          textColor: "text-yellow-700",
        }
      case "info":
      default:
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          icon: <FiInfo className="text-blue-500" size={20} />,
          textColor: "text-blue-700",
        }
    }
  }

  const styles = getAlertStyles()

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={`p-4 rounded-lg border ${styles.bg} ${styles.border} mb-4`}
    >
      <div className="flex items-start">
        <div className="mr-3 mt-0.5">{styles.icon}</div>
        <div className="flex-1">
          <h4 className={`font-medium ${styles.textColor}`}>{title}</h4>
          <p className="text-gray-600 text-sm mt-1">{message}</p>
          {time && (
            <div className="flex items-center mt-2 text-xs text-gray-500">
              <FiClock className="mr-1" size={12} />
              <span>{time}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default AlertCard
