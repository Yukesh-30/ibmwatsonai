"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FiHeart, FiMapPin, FiCalendar, FiClock, FiPlus, FiFilter, FiDownload, FiX } from "react-icons/fi"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import Map from "../../components/Map"
import CustomPieChart from "../../components/charts/PieChart"

const GovRedistribution = () => {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [filterType, setFilterType] = useState("all")
  const [donations, setDonations] = useState([])
  const [orphanages, setOrphanages] = useState([])
  const [redistributionStats, setRedistributionStats] = useState({})
  const [redistributionData, setRedistributionData] = useState([])
  const [addModalOpen, setAddModalOpen] = useState(false)

  useEffect(() => {
    // Simulate API calls
    // In a real app, you would fetch data from your backend

    // Donations data
    const donationsData = [
      {
        id: 1,
        recipient: "Sunshine Orphanage",
        type: "orphanage",
        date: "2023-05-20",
        time: "10:00 AM",
        items: [
          { name: "Rice", quantity: "25 kg" },
          { name: "Vegetables", quantity: "15 kg" },
          { name: "Fruits", quantity: "10 kg" },
        ],
        status: "upcoming",
        address: "123 Main St, Delhi",
        contact: "Mr. Sharma - 9876543210",
      },
      {
        id: 2,
        recipient: "Golden Years Home",
        type: "oldage",
        date: "2023-05-18",
        time: "11:30 AM",
        items: [
          { name: "Rice", quantity: "20 kg" },
          { name: "Vegetables", quantity: "10 kg" },
          { name: "Milk", quantity: "15 liters" },
        ],
        status: "upcoming",
        address: "456 Park Ave, Delhi",
        contact: "Mrs. Patel - 9876543211",
      },
      {
        id: 3,
        recipient: "Hope Children's Home",
        type: "orphanage",
        date: "2023-05-15",
        time: "09:00 AM",
        items: [
          { name: "Rice", quantity: "30 kg" },
          { name: "Vegetables", quantity: "20 kg" },
          { name: "Fruits", quantity: "15 kg" },
        ],
        status: "completed",
        address: "789 Lake Rd, Delhi",
        contact: "Mr. Kumar - 9876543212",
      },
      {
        id: 4,
        recipient: "Serenity Senior Living",
        type: "oldage",
        date: "2023-05-12",
        time: "10:30 AM",
        items: [
          { name: "Rice", quantity: "15 kg" },
          { name: "Vegetables", quantity: "10 kg" },
          { name: "Milk", quantity: "10 liters" },
        ],
        status: "completed",
        address: "101 River View, Delhi",
        contact: "Mrs. Singh - 9876543213",
      },
      {
        id: 5,
        recipient: "Little Angels Orphanage",
        type: "orphanage",
        date: "2023-05-10",
        time: "11:00 AM",
        items: [
          { name: "Rice", quantity: "20 kg" },
          { name: "Vegetables", quantity: "15 kg" },
          { name: "Fruits", quantity: "10 kg" },
        ],
        status: "completed",
        address: "202 Hill Road, Delhi",
        contact: "Mr. Verma - 9876543214",
      },
    ]
    setDonations(donationsData)

    // Orphanages and old age homes data for map
    const orphanagesData = [
      { lat: 28.6129, lng: 77.2295, name: "Sunshine Orphanage", description: "Orphanage - 2.5 km away" },
      { lat: 28.6354, lng: 77.225, name: "Golden Years Home", description: "Old Age Home - 3.8 km away" },
      { lat: 28.5921, lng: 77.229, name: "Hope Children's Home", description: "Orphanage - 4.2 km away" },
      { lat: 28.6129, lng: 77.209, name: "Serenity Senior Living", description: "Old Age Home - 5.1 km away" },
      { lat: 28.6129, lng: 77.249, name: "Little Angels Orphanage", description: "Orphanage - 5.7 km away" },
    ]
    setOrphanages(orphanagesData)

    // Redistribution stats
    const stats = {
      totalDonated: 185,
      upcomingDonations: 2,
      completedDonations: 3,
      beneficiaries: 5,
    }
    setRedistributionStats(stats)

    // Redistribution data for chart
    const chartData = [
      { name: "Rice", value: 110 },
      { name: "Vegetables", value: 70 },
      { name: "Fruits", value: 35 },
      { name: "Milk", value: 25 },
    ]
    setRedistributionData(chartData)
  }, [])

  // Filter donations based on active tab and filter type
  const filteredDonations = donations.filter((donation) => {
    // Filter by tab
    if (activeTab === "upcoming" && donation.status !== "upcoming") return false
    if (activeTab === "completed" && donation.status !== "completed") return false

    // Filter by type
    if (filterType !== "all" && donation.type !== filterType) return false

    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar role="government" />

        <main className="flex-1 ml-64 p-8">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Redistribution Log</h1>
              <p className="text-gray-600">Track and manage food donations to orphanages and old age homes</p>
            </div>

            <div className="flex items-center space-x-4">
              <button onClick={() => setAddModalOpen(true)} className="btn btn-primary flex items-center space-x-2">
                <FiPlus />
                <span>Schedule Donation</span>
              </button>
              <button className="btn btn-outline flex items-center space-x-2">
                <FiDownload />
                <span>Export Log</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 mr-4">
                  <FiHeart className="text-green-500" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Donated</p>
                  <p className="text-xl font-bold">{redistributionStats.totalDonated} kg</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 mr-4">
                  <FiCalendar className="text-blue-500" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Upcoming Donations</p>
                  <p className="text-xl font-bold">{redistributionStats.upcomingDonations}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 mr-4">
                  <FiClock className="text-purple-500" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Completed Donations</p>
                  <p className="text-xl font-bold">{redistributionStats.completedDonations}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 mr-4">
                  <FiMapPin className="text-yellow-500" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Beneficiaries</p>
                  <p className="text-xl font-bold">{redistributionStats.beneficiaries}</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Map - Hide when modal is open */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className={`lg:col-span-2 bg-white rounded-lg shadow-sm overflow-hidden ${addModalOpen ? 'hidden' : ''}`}
            >
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-800">Nearby Orphanages and Old Age Homes</h3>
              </div>
              <div className="p-4">
                <Map markers={orphanages} center={[28.6139, 77.209]} zoom={12} />
              </div>
            </motion.div>

            {/* Donation Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className={`bg-white rounded-lg shadow-sm overflow-hidden ${addModalOpen ? 'lg:col-span-3' : ''}`}
            >
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-800">Donated Items</h3>
              </div>
              <div className="p-4">
                <CustomPieChart
                  data={redistributionData}
                  title=""
                  dataKey="value"
                  nameKey="name"
                  colors={["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6"]}
                />
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-600">This Month</p>
                    <p className="text-xl font-bold text-green-600">185 kg</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Last Month</p>
                    <p className="text-xl font-bold text-blue-600">160 kg</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Donations Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">Donation Log</h3>
            </div>

            {/* Filters */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setActiveTab("upcoming")}
                    className={`px-3 py-1 rounded-md text-sm ${
                      activeTab === "upcoming" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    Upcoming Donations
                  </button>
                  <button
                    onClick={() => setActiveTab("completed")}
                    className={`px-3 py-1 rounded-md text-sm ${
                      activeTab === "completed" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    Completed Donations
                  </button>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiFilter className="text-gray-400" size={16} />
                    </div>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Recipients</option>
                      <option value="orphanage">Orphanages</option>
                      <option value="oldage">Old Age Homes</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Recipient
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date & Time
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Items
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDonations.map((donation) => (
                    <tr key={donation.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{donation.recipient}</div>
                        <div className="text-xs text-gray-500">{donation.contact}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            donation.type === "orphanage"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {donation.type === "orphanage" ? "Orphanage" : "Old Age Home"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{donation.date}</div>
                        <div className="text-xs text-gray-500">{donation.time}</div>
                      </td>
                      <td className="px-6 py-4">
                        <ul className="text-sm text-gray-500">
                          {donation.items.map((item, index) => (
                            <li key={index}>
                              {item.name}: {item.quantity}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            donation.status === "upcoming"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {donation.status === "upcoming" ? "Scheduled" : "Completed"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                        {donation.status === "upcoming" && (
                          <button className="text-red-600 hover:text-red-900">Cancel</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Add Donation Modal - Increased z-index */}
          {addModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-lg w-full max-w-md relative z-[10000]"
              >
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-800">Schedule New Donation</h3>
                  <button onClick={() => setAddModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                    <FiX size={20} />
                  </button>
                </div>
                <div className="p-6">
                  <form>
                    <div className="mb-4">
                      <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-1">
                        Recipient
                      </label>
                      <select
                        id="recipient"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select recipient</option>
                        <option value="sunshine">Sunshine Orphanage</option>
                        <option value="golden">Golden Years Home</option>
                        <option value="hope">Hope Children's Home</option>
                        <option value="serenity">Serenity Senior Living</option>
                        <option value="angels">Little Angels Orphanage</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        id="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                        Time
                      </label>
                      <input
                        type="time"
                        id="time"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Items</label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            placeholder="Item name"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <input
                            type="text"
                            placeholder="Quantity"
                            className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button type="button" className="p-2 bg-gray-100 rounded-md text-gray-500 hover:bg-gray-200">
                            <FiPlus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                        Notes
                      </label>
                      <textarea
                        id="notes"
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Any special instructions or notes"
                      ></textarea>
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setAddModalOpen(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Schedule
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default GovRedistribution
