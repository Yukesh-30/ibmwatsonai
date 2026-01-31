"use client"

import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import {
  FiHome,
  FiTrendingUp,
  FiAlertCircle,
  FiDollarSign,
  FiShield,
  FiPackage,
  FiShare2,
  FiUsers,
  FiSettings,
  FiCoffee,
  FiCalendar,
  FiBarChart2,
  FiClipboard,
  FiMessageSquare,
} from "react-icons/fi"

const Sidebar = ({ role }) => {
  const location = useLocation()

  const governmentLinks = [
    { name: "Center Overview", path: "/government/dashboard", icon: <FiHome size={20} /> },
    { name: "AI Demand Forecast", path: "/government/demand-forecast", icon: <FiTrendingUp size={20} /> },
    { name: "Food Fall Prediction", path: "/government/food-fall", icon: <FiTrendingUp size={20} /> },
    { name: "Emergency Mode", path: "/government/emergency-mode", icon: <FiAlertCircle size={20} /> },
    { name: "Profit & Loss", path: "/government/profit-loss", icon: <FiDollarSign size={20} /> },
    { name: "Food Safety Report", path: "/government/food-safety", icon: <FiShield size={20} /> },
    { name: "Inventory Management", path: "/government/inventory", icon: <FiPackage size={20} /> },
    { name: "Redistribution Log", path: "/government/redistribution", icon: <FiShare2 size={20} /> },
    { name: "Billing", path: "/government/billing", icon: <FiDollarSign size={20} /> },

    { name: "Staff Performance", path: "/government/staff-performance", icon: <FiUsers size={20} /> },
    { name: "Settings", path: "/government/settings", icon: <FiSettings size={20} /> },
  ]

  const restaurantLinks = [
    { name: "Restaurant Overview", path: "/restaurant/dashboard", icon: <FiHome size={20} /> },
    { name: "Inventory Management", path: "/restaurant/inventory", icon: <FiPackage size={20} /> },
    { name: "AI Demand Forecast", path: "/restaurant/demand-forecast", icon: <FiTrendingUp size={20} /> },
    { name: "Food Fall Prediction", path: "/restaurant/food-fall", icon: <FiTrendingUp size={20} /> },
    { name: "Profit & Loss", path: "/restaurant/profit-loss", icon: <FiDollarSign size={20} /> },
    { name: "Redistribution", path: "/restaurant/redistribution", icon: <FiShare2 size={20} /> },
    { name: "Billing", path: "/restaurant/billing", icon: <FiDollarSign size={20} /> },
    { name: "Staff Attendance", path: "/restaurant/staff-attendance", icon: <FiUsers size={20} /> },
    { name: "Settings", path: "/restaurant/settings", icon: <FiSettings size={20} /> },
  ]

  const corporateLinks = [
    { name: "Corporate Overview", path: "/corporate/dashboard", icon: <FiHome size={20} /> },
    { name: "Inventory Management", path: "/corporate/inventory", icon: <FiPackage size={20} /> },
    { name: "AI Demand Forecast", path: "/corporate/demand-forecast", icon: <FiBarChart2 size={20} /> },
    { name: "Food Fall Analysis", path: "/corporate/food-fall", icon: <FiTrendingUp size={20} /> },
    { name: "Profit & Loss", path: "/corporate/profit-loss", icon: <FiDollarSign size={20} /> },
    { name: "Meal Planning", path: "/corporate/meal-planning", icon: <FiCoffee size={20} /> },
    { name: "Events Calendar", path: "/corporate/events", icon: <FiCalendar size={20} /> },
    { name: "Redistribution", path: "/corporate/redistribution", icon: <FiShare2 size={20} /> },
    { name: "Staff Attendance", path: "/corporate/staff-attendance", icon: <FiUsers size={20} /> },
    { name: "Employee Feedback", path: "/corporate/feedback", icon: <FiMessageSquare size={20} /> },
    { name: "Department Reports", path: "/corporate/department-reports", icon: <FiClipboard size={20} /> },
    { name: "Settings", path: "/corporate/settings", icon: <FiSettings size={20} /> },
  ]

  let links = restaurantLinks
  let title = "Restaurant Dashboard"
  let titleColor = "text-green-600"

  if (role === "government") {
    links = governmentLinks
    title = "Government Center"
    titleColor = "text-purple-600"
  } else if (role === "corporate") {
    links = corporateLinks
    title = "Corporate Canteen"
    titleColor = "text-blue-600"
  }

  return (
      <motion.div initial={{ x: -300 }} animate={{ x: 0 }} transition={{ duration: 0.5 }} className="sidebar pt-16">
        <div className="px-4 py-6">
          <h2 className={`text-xl font-bold ${titleColor} mb-6`}>{title}</h2>

          <div className="flex flex-col">
            {links.map((link) => (
                <Link
                    key={link.path}
                    to={link.path}
                    className={`sidebar-link ${location.pathname === link.path ? "active" : ""}`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
            ))}
          </div>
        </div>
      </motion.div>
  )
}

export default Sidebar
