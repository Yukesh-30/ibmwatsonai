"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FiDollarSign, FiTrendingUp, FiCalendar, FiDownload } from "react-icons/fi"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import CustomLineChart from "../../components/charts/LineChart"
import CustomBarChart from "../../components/charts/BarChart"

const GovProfitLoss = () => {
  const [period, setPeriod] = useState("monthly")
  const [monthlyData, setMonthlyData] = useState([])
  const [quarterlyData, setQuarterlyData] = useState([])
  const [overproductionData, setOverproductionData] = useState([])

  useEffect(() => {
    // Simulate API calls
    // In a real app, you would fetch data from your backend

    // Monthly financial data
    const monthlyData = [
      { name: "Jan", revenue: 125000, expenses: 95000, profit: 30000 },
      { name: "Feb", revenue: 140000, expenses: 100000, profit: 40000 },
      { name: "Mar", revenue: 135000, expenses: 105000, profit: 30000 },
      { name: "Apr", revenue: 150000, expenses: 110000, profit: 40000 },
      { name: "May", revenue: 160000, expenses: 115000, profit: 45000 },
      { name: "Jun", revenue: 175000, expenses: 120000, profit: 55000 },
      { name: "Jul", revenue: 165000, expenses: 125000, profit: 40000 },
      { name: "Aug", revenue: 180000, expenses: 130000, profit: 50000 },
      { name: "Sep", revenue: 190000, expenses: 135000, profit: 55000 },
      { name: "Oct", revenue: 185000, expenses: 140000, profit: 45000 },
      { name: "Nov", revenue: 195000, expenses: 145000, profit: 50000 },
      { name: "Dec", revenue: 210000, expenses: 150000, profit: 60000 },
    ]
    setMonthlyData(monthlyData)

    // Quarterly financial data
    const quarterlyData = [
      { name: "Q1", revenue: 400000, expenses: 300000, profit: 100000 },
      { name: "Q2", revenue: 485000, expenses: 345000, profit: 140000 },
      { name: "Q3", revenue: 535000, expenses: 390000, profit: 145000 },
      { name: "Q4", revenue: 590000, expenses: 435000, profit: 155000 },
    ]
    setQuarterlyData(quarterlyData)

    // Overproduction data
    const overproductionData = [
      { name: "Rice", planned: 500, actual: 550, wasted: 50 },
      { name: "Wheat", planned: 400, actual: 420, wasted: 20 },
      { name: "Vegetables", planned: 300, actual: 350, wasted: 50 },
      { name: "Pulses", planned: 200, actual: 210, wasted: 10 },
      { name: "Dairy", planned: 150, actual: 180, wasted: 30 },
    ]
    setOverproductionData(overproductionData)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar role="government" />

        <main className="flex-1 ml-64 p-8">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Profit & Loss Routine</h1>
              <p className="text-gray-600">Monitor financial performance and identify areas for improvement</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white rounded-md border border-gray-300 p-2">
                <FiCalendar className="text-gray-500" />
                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="bg-transparent border-none focus:outline-none text-sm"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              <button className="btn btn-outline flex items-center space-x-2">
                <FiDownload />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Financial Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="card"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-green-100 mr-4">
                  <FiDollarSign className="text-green-500" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Total Revenue</h3>
                  <p className="text-2xl font-bold">₹2,010,000</p>
                </div>
              </div>
              <div className="flex items-center text-green-500">
                <FiTrendingUp className="mr-1" />
                <span className="text-sm">12% increase from last year</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-red-100 mr-4">
                  <FiDollarSign className="text-red-500" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Total Expenses</h3>
                  <p className="text-2xl font-bold">₹1,470,000</p>
                </div>
              </div>
              <div className="flex items-center text-red-500">
                <FiTrendingUp className="mr-1" />
                <span className="text-sm">8% increase from last year</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-blue-100 mr-4">
                  <FiDollarSign className="text-blue-500" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Net Profit</h3>
                  <p className="text-2xl font-bold">₹540,000</p>
                </div>
              </div>
              <div className="flex items-center text-blue-500">
                <FiTrendingUp className="mr-1" />
                <span className="text-sm">15% increase from last year</span>
              </div>
            </motion.div>
          </div>

          {/* Financial Charts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="card mb-8"
          >
            <h3 className="text-lg font-medium mb-4">Financial Overview</h3>
            <div className="h-80 mb-8">
              <CustomLineChart
                data={period === "monthly" ? monthlyData : quarterlyData}
                title=""
                dataKeys={["revenue", "expenses", "profit"]}
                colors={["#10b981", "#ef4444", "#3b82f6"]}
              />
            </div>
            
          </motion.div>

          {/* Overproduction Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="card mt-7"
          >
            <h3 className="text-lg font-medium mb-4">Overproduction Analysis</h3>
            <div className="h-80 mb-12">
              <CustomBarChart
                data={overproductionData}
                title=""
                dataKeys={["planned", "actual", "wasted"]}
                colors={["#3b82f6", "#10b981", "#ef4444"]}
              />
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">Insights on Overproduction</h4>
                <p className="text-sm text-gray-700">
                  The data indicates that vegetables and rice have the highest overproduction rates. Consider adjusting
                  production quantities based on historical demand patterns and AI forecasts.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Total Wastage</p>
                    <p className="text-xl font-bold text-red-600">160 kg</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Estimated Loss</p>
                    <p className="text-xl font-bold text-red-600">₹32,000</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Recommendations</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="inline-block w-4 h-4 bg-blue-200 rounded-full mr-2 mt-1"></span>
                    <span>Reduce rice production by 10% to minimize wastage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-4 h-4 bg-blue-200 rounded-full mr-2 mt-1"></span>
                    <span>Implement just-in-time production for vegetables</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-4 h-4 bg-blue-200 rounded-full mr-2 mt-1"></span>
                    <span>Set up redistribution channels for excess dairy products</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-4 h-4 bg-blue-200 rounded-full mr-2 mt-1"></span>
                    <span>Review demand forecasting model for better accuracy</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default GovProfitLoss
