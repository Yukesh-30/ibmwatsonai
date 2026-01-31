"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { motion } from "framer-motion"
import { FiMenu, FiX, FiLogOut } from "react-icons/fi"

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <nav className="navbar flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2">
        <motion.div initial={{ rotate: -10 }} animate={{ rotate: 0 }} transition={{ duration: 0.5 }}>
          <img src="/logo.svg" alt="Logo" className="h-10 w-10" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold text-green-600"
        >
          FoodSaver
        </motion.h1>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        {!user ? (
          <>
            <Link to="/" className="text-gray-700 hover:text-green-600">
              Home
            </Link>
            <Link to="/#services" className="text-gray-700 hover:text-green-600">
              Our Services
            </Link>
            <Link to="/login" className="btn btn-outline">
              Login
            </Link>
            <Link to="/login" className="btn btn-primary">
              Get Started
            </Link>
          </>
        ) : (
          <>
            <span className="text-gray-700">Welcome, {user.name}</span>
            <button onClick={handleLogout} className="flex items-center gap-2 btn btn-outline">
              <FiLogOut /> Logout
            </button>
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 p-2">
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-16 right-0 left-0 bg-white shadow-md py-4 px-6 md:hidden z-50"
        >
          {!user ? (
            <div className="flex flex-col gap-4">
              <Link to="/" className="text-gray-700 hover:text-green-600 py-2">
                Home
              </Link>
              <Link to="/#services" className="text-gray-700 hover:text-green-600 py-2">
                Our Services
              </Link>
              <Link to="/login" className="btn btn-outline w-full text-center">
                Login
              </Link>
              <Link to="/login" className="btn btn-primary w-full text-center">
                Get Started
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <span className="text-gray-700 py-2">Welcome, {user.name}</span>
              <button onClick={handleLogout} className="flex items-center justify-center gap-2 btn btn-outline w-full">
                <FiLogOut /> Logout
              </button>
            </div>
          )}
        </motion.div>
      )}
    </nav>
  )
}

export default Navbar
