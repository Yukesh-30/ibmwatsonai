"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FiUsers, FiTrendingDown, FiAlertCircle, FiBarChart2, FiVideo } from "react-icons/fi"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import StatCard from "../../components/StatCard"
import CustomLineChart from "../../components/charts/LineChart"
import AlertCard from "../../components/AlertCard"

const GovDashboard = () => {
  const [wastageData, setWastageData] = useState([])
  const [foodFallData, setFoodFallData] = useState([])
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    // Simulate API calls
    // In a real app, you would fetch data from your backend

    // Wastage data
    const wastageData = [
      { name: "Jan", wastage: 65, target: 80 },
      { name: "Feb", wastage: 59, target: 75 },
      { name: "Mar", wastage: 45, target: 70 },
      { name: "Apr", wastage: 30, target: 65 },
      { name: "May", wastage: 25, target: 60 },
      { name: "Jun", wastage: 20, target: 55 },
      { name: "Jul", wastage: 15, target: 50 },
    ]
    setWastageData(wastageData)

    // Food fall prediction data
    const foodFallData = [
      { name: "Mon", actual: 120, predicted: 130 },
      { name: "Tue", actual: 150, predicted: 145 },
      { name: "Wed", actual: 110, predicted: 115 },
      { name: "Thu", actual: 90, predicted: 95 },
      { name: "Fri", actual: 160, predicted: 155 },
      { name: "Sat", actual: 180, predicted: 175 },
      { name: "Sun", actual: 140, predicted: 145 },
    ]
    setFoodFallData(foodFallData)

    // Alerts
    const alerts = [
      {
        id: 1,
        type: "danger",
        title: "Rice expiring soon",
        message: "25kg of rice will expire in 2 days. Consider redistribution.",
        time: "2 hours ago",
      },
      {
        id: 2,
        type: "warning",
        title: "Vegetables low in stock",
        message: "Vegetable inventory is below threshold. Consider restocking.",
        time: "5 hours ago",
      },
      {
        id: 3,
        type: "info",
        title: "High demand predicted",
        message: "AI predicts 20% higher demand tomorrow due to local event.",
        time: "1 day ago",
      },
    ]
    setAlerts(alerts)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar role="government" />

        <main className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Center Overview</h1>
            <p className="text-gray-600">Monitor your center's performance and key metrics</p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Meals Served Today"
              value="1,245"
              icon={<FiUsers className="text-blue-500" size={20} />}
              color="blue"
              percentage="12"
              isIncreasing={true}
            />

            <StatCard
              title="Wastage Reduced"
              value="42 kg"
              icon={<FiTrendingDown className="text-green-500" size={20} />}
              color="green"
              percentage="18"
              isIncreasing={true}
            />

            <StatCard
              title="Expiry Alerts"
              value="3"
              icon={<FiAlertCircle className="text-red-500" size={20} />}
              color="red"
            />

            <StatCard
              title="Predicted Demand"
              value="1,350"
              icon={<FiBarChart2 className="text-purple-500" size={20} />}
              color="purple"
              percentage="8"
              isIncreasing={true}
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <CustomLineChart
              data={wastageData}
              title="Daily Food Wastage Reduced"
              dataKeys={["wastage", "target"]}
              colors={["#10b981", "#94a3b8"]}
            />

            <CustomLineChart
              data={foodFallData}
              title="Food Fall Prediction"
              dataKeys={["actual", "predicted"]}
              colors={["#3b82f6", "#f59e0b"]}
            />
          </div>

          {/* Alerts and Camera Feed Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="card"
            >
              <h3 className="text-lg font-medium mb-4">Food Expiry Alerts</h3>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <AlertCard
                    key={alert.id}
                    type={alert.type}
                    title={alert.title}
                    message={alert.message}
                    time={alert.time}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="card"
            >
              <h3 className="text-lg font-medium mb-4">Camera Feed Preview</h3>
              <div className="bg-gray-800 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <FiVideo className="text-gray-400 mx-auto mb-2" size={40} />
                  <p className="text-gray-400">Camera feed preview</p>
                  <button className="mt-4 btn btn-outline text-sm">View All Cameras</button>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="bg-gray-100 rounded p-2 text-center text-sm">
                  <p className="font-medium">Camera 1</p>
                  <p className="text-xs text-gray-500">Kitchen</p>
                </div>
                <div className="bg-gray-100 rounded p-2 text-center text-sm">
                  <p className="font-medium">Camera 2</p>
                  <p className="text-xs text-gray-500">Storage</p>
                </div>
                <div className="bg-gray-100 rounded p-2 text-center text-sm">
                  <p className="font-medium">Camera 3</p>
                  <p className="text-xs text-gray-500">Serving Area</p>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default GovDashboard
