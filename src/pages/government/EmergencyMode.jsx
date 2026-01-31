"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FiAlertTriangle, FiClock, FiCheck } from "react-icons/fi"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import Map from "../../components/Map"
import CustomPieChart from "../../components/charts/PieChart"

const GovEmergencyMode = () => {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false)
  const [emergencyType, setEmergencyType] = useState("")
  const [emergencyDescription, setEmergencyDescription] = useState("")
  const [radius, setRadius] = useState(10)

  const nearbyCenters = [
    { lat: 28.6129, lng: 77.2295, name: "Delhi Central Food Hub", description: "2.5 km away" },
    { lat: 28.6354, lng: 77.225, name: "North Delhi Center", description: "3.8 km away" },
    { lat: 28.5921, lng: 77.229, name: "South Delhi Center", description: "4.2 km away" },
    { lat: 28.6129, lng: 77.209, name: "West Delhi Center", description: "5.1 km away" },
    { lat: 28.6129, lng: 77.249, name: "East Delhi Center", description: "5.7 km away" },
  ]

  const foodAvailabilityData = [
    { name: "Rice", value: 120 },
    { name: "Wheat", value: 80 },
    { name: "Vegetables", value: 60 },
    { name: "Pulses", value: 40 },
    { name: "Milk", value: 30 },
  ]

  const handleEmergencyToggle = () => {
    if (!isEmergencyActive) {
      if (!emergencyType || !emergencyDescription) {
        alert("Please fill in all emergency details")
        return
      }
    }

    setIsEmergencyActive(!isEmergencyActive)

    if (!isEmergencyActive) {
      // In a real app, you would send an API request to activate emergency mode
      alert("Emergency mode activated! Nearby centers have been notified.")
    } else {
      // In a real app, you would send an API request to deactivate emergency mode
      alert("Emergency mode deactivated.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar role="government" />

        <main className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Emergency Mode</h1>
            <p className="text-gray-600">Activate emergency mode to alert nearby centers</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`card lg:col-span-1 ${isEmergencyActive ? "border-2 border-red-500" : ""}`}
            >
              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-full ${isEmergencyActive ? "bg-red-100" : "bg-gray-100"} mr-4`}>
                  <FiAlertTriangle className={`${isEmergencyActive ? "text-red-500" : "text-gray-500"}`} size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Emergency Status</h3>
                  <p className={`text-sm ${isEmergencyActive ? "text-red-500 font-medium" : "text-gray-500"}`}>
                    {isEmergencyActive ? "ACTIVE" : "Inactive"}
                  </p>
                </div>
              </div>

              <form>
                <div className="mb-4">
                  <label htmlFor="emergencyType" className="label">
                    Emergency Type
                  </label>
                  <select
                    id="emergencyType"
                    value={emergencyType}
                    onChange={(e) => setEmergencyType(e.target.value)}
                    className="input"
                    disabled={isEmergencyActive}
                    required
                  >
                    <option value="">Select emergency type</option>
                    <option value="overproduction">Overproduction</option>
                    <option value="underdemand">Unexpected Low Demand</option>
                    <option value="event_cancelled">Event Cancelled</option>
                    <option value="expiry_risk">Expiry Risk</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="description" className="label">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={emergencyDescription}
                    onChange={(e) => setEmergencyDescription(e.target.value)}
                    className="input min-h-[100px]"
                    placeholder="Describe the emergency situation"
                    disabled={isEmergencyActive}
                    required
                  ></textarea>
                </div>

                <div className="mb-6">
                  <label htmlFor="radius" className="label">
                    Alert Radius (km)
                  </label>
                  <input
                    id="radius"
                    type="range"
                    min="1"
                    max="50"
                    value={radius}
                    onChange={(e) => setRadius(Number.parseInt(e.target.value))}
                    className="w-full"
                    disabled={isEmergencyActive}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1 km</span>
                    <span>{radius} km</span>
                    <span>50 km</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleEmergencyToggle}
                  className={`btn w-full ${isEmergencyActive ? "bg-gray-500 hover:bg-gray-600 text-white" : "bg-red-500 hover:bg-red-600 text-white"}`}
                >
                  {isEmergencyActive ? "Deactivate Emergency Mode" : "Activate Emergency Mode"}
                </button>
              </form>

              {isEmergencyActive && (
                <div className="mt-6 bg-red-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <FiClock className="text-red-500 mr-2" />
                    <span className="text-sm font-medium">Emergency activated at 10:45 AM</span>
                  </div>
                  <p className="text-sm text-gray-700">5 centers have been notified within {radius} km radius.</p>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Centers Responding:</h4>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <FiCheck className="text-green-500 mr-2" />
                        <span>Delhi Central Food Hub</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <FiCheck className="text-green-500 mr-2" />
                        <span>North Delhi Center</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card lg:col-span-2"
            >
              <h3 className="text-lg font-medium mb-4">Nearby Centers</h3>
              <Map markers={nearbyCenters} center={[28.6139, 77.209]} zoom={12} />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card"
          >
            <h3 className="text-lg font-medium mb-4">Food Availability for Quick Redistribution</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <CustomPieChart
                  data={foodAvailabilityData}
                  title=""
                  dataKey="value"
                  nameKey="name"
                  colors={["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899"]}
                />
              </div>
              <div className="lg:col-span-2">
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-medium mb-2">Available for Immediate Redistribution</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span>Rice</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">120 kg</span>
                        <button className="ml-4 btn btn-sm btn-outline">Redistribute</button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        <span>Wheat</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">80 kg</span>
                        <button className="ml-4 btn btn-sm btn-outline">Redistribute</button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                        <span>Vegetables</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">60 kg</span>
                        <button className="ml-4 btn btn-sm btn-outline">Redistribute</button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                        <span>Pulses</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">40 kg</span>
                        <button className="ml-4 btn btn-sm btn-outline">Redistribute</button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-pink-500 rounded-full mr-2"></div>
                        <span>Milk</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">30 liters</span>
                        <button className="ml-4 btn btn-sm btn-outline">Redistribute</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-green-700">Quick Actions</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="btn btn-primary">Redistribute All</button>
                    <button className="btn btn-outline">Request More Resources</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default GovEmergencyMode
