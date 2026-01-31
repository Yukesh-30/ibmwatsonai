"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { FiLock, FiMail, FiArrowRight, FiAlertCircle, FiUser, FiCoffee, FiShield, FiCheckCircle } from "react-icons/fi"
import { useAuth } from "../context/AuthContext"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("restaurant")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  // Clear success message after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("")
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [success])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const result = await login(email, password, role)

      if (result.success) {
        setSuccess(`Login successful! Redirecting to ${role} dashboard...`)

        // Redirect after a short delay for better UX
        setTimeout(() => {
          if (role === "restaurant") {
            navigate("/restaurant/dashboard")
          } else if (role === "corporate") {
            navigate("/corporate/dashboard")
          } else {
            navigate("/government/dashboard")
          }
        }, 1000)
      } else {
        setError("Invalid credentials. Please try again.")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  const getRoleIcon = () => {
    switch (role) {
      case "restaurant":
        return <FiCoffee className="h-6 w-6 text-green-500" />
      case "corporate":
        return <FiUser className="h-6 w-6 text-blue-500" />
      case "government":
        return <FiShield className="h-6 w-6 text-purple-500" />
      default:
        return <FiUser className="h-6 w-6 text-green-500" />
    }
  }

  const getRoleColor = () => {
    switch (role) {
      case "restaurant":
        return "bg-green-600 hover:bg-green-700 focus:ring-green-500"
      case "corporate":
        return "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
      case "government":
        return "bg-purple-600 hover:bg-purple-700 focus:ring-purple-500"
      default:
        return "bg-green-600 hover:bg-green-700 focus:ring-green-500"
    }
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <motion.div
            className="sm:mx-auto sm:w-full sm:max-w-md"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full bg-white shadow-lg flex items-center justify-center">
              {getRoleIcon()}
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">FoodSaver</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Smart Food Wastage Management System</p>
        </motion.div>

        <motion.div
            className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
          <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10 border border-gray-100">
            <motion.div className="mb-6 flex justify-center" variants={itemVariants}>
              <div className="flex space-x-2 p-1 bg-gray-50 rounded-lg">
                <button
                    type="button"
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        role === "restaurant" ? "bg-white text-green-700 shadow-sm" : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setRole("restaurant")}
                >
                  Restaurant
                </button>
                <button
                    type="button"
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        role === "corporate" ? "bg-white text-blue-700 shadow-sm" : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setRole("corporate")}
                >
                  Corporate
                </button>
                <button
                    type="button"
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        role === "government" ? "bg-white text-purple-700 shadow-sm" : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setRole("government")}
                >
                  Government
                </button>
              </div>
            </motion.div>

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center"
                >
                  <FiAlertCircle className="mr-2" />
                  <span>{error}</span>
                </motion.div>
            )}

            {success && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center"
                >
                  <FiCheckCircle className="mr-2" />
                  <span>{success}</span>
                </motion.div>
            )}

            <motion.form className="space-y-6" onSubmit={handleSubmit} variants={containerVariants}>
              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                      id="email"
                      name="email"
                      type="text"
                      autoComplete="email"
                      required
                      className="appearance-none block w-full pl-10 px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none block w-full pl-10 px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                      id="remember_me"
                      name="remember_me"
                      type="checkbox"
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-green-600 hover:text-green-500">
                    Forgot your password?
                  </a>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <button
                    type="submit"
                    className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${getRoleColor()}`}
                    disabled={isLoading}
                >
                  {isLoading ? (
                      <div className="flex items-center">
                        <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                          <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                          ></circle>
                          <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Signing in...
                      </div>
                  ) : (
                      <div className="flex items-center">
                        <span>Sign in to {role} dashboard</span>
                        <FiArrowRight className="ml-2" />
                      </div>
                  )}
                </button>
              </motion.div>
            </motion.form>

            <motion.div className="mt-6" variants={containerVariants}>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Demo Credentials</span>
                </div>
              </div>

              <motion.div className="mt-6" variants={itemVariants}>
                <div
                    className={`p-4 rounded-md text-sm ${
                        role === "restaurant"
                            ? "bg-green-50 text-green-800"
                            : role === "corporate"
                                ? "bg-blue-50 text-blue-800"
                                : "bg-purple-50 text-purple-800"
                    }`}
                >
                  <div className="flex items-center mb-2">
                    {getRoleIcon()}
                    <span className="ml-2 font-medium">
                    {role === "restaurant"
                        ? "Restaurant Login"
                        : role === "corporate"
                            ? "Corporate Login"
                            : "Government Login"}
                  </span>
                  </div>
                  <p>
                    <strong>Email:</strong> {role}@example.com
                  </p>
                  <p>
                    <strong>Password:</strong> password
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.p className="mt-6 text-center text-sm text-gray-600" variants={itemVariants}>
            <Link to="/" className="font-medium text-green-600 hover:text-green-500">
              ← Back to homepage
            </Link>
          </motion.p>
        </motion.div>
      </div>
  )
}

export default Login
