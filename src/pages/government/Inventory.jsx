"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  FiPackage,
  FiAlertCircle,
  FiClock,
  FiPlus,
  FiSearch,
  FiFilter,
  FiEdit,
  FiTrash2,
  FiBarChart2,
} from "react-icons/fi"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import CustomBarChart from "../../components/charts/BarChart"

const GovInventory = () => {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [inventoryItems, setInventoryItems] = useState([])
  const [stockAlerts, setStockAlerts] = useState([])
  const [inventoryStats, setInventoryStats] = useState({})
  const [stockLevelsData, setStockLevelsData] = useState([])

  useEffect(() => {
    // Simulate API calls
    // In a real app, you would fetch data from your backend

    // Inventory items
    const items = [
      {
        id: 1,
        name: "Rice",
        category: "Grains",
        quantity: 250,
        unit: "kg",
        supplier: "Agro Supplies Ltd.",
        expiryDate: "2023-08-15",
        location: "Storage A",
        status: "normal",
      },
      {
        id: 2,
        name: "Wheat Flour",
        category: "Grains",
        quantity: 180,
        unit: "kg",
        supplier: "Agro Supplies Ltd.",
        expiryDate: "2023-07-20",
        location: "Storage A",
        status: "normal",
      },
      {
        id: 3,
        name: "Potatoes",
        category: "Vegetables",
        quantity: 120,
        unit: "kg",
        supplier: "Fresh Farms",
        expiryDate: "2023-05-25",
        location: "Storage B",
        status: "expiring",
      },
      {
        id: 4,
        name: "Tomatoes",
        category: "Vegetables",
        quantity: 50,
        unit: "kg",
        supplier: "Fresh Farms",
        expiryDate: "2023-05-22",
        location: "Storage B",
        status: "expiring",
      },
      {
        id: 5,
        name: "Chicken",
        category: "Meat",
        quantity: 80,
        unit: "kg",
        supplier: "Protein Foods Inc.",
        expiryDate: "2023-05-30",
        location: "Cold Storage",
        status: "normal",
      },
      {
        id: 6,
        name: "Milk",
        category: "Dairy",
        quantity: 15,
        unit: "liters",
        supplier: "Dairy Fresh",
        expiryDate: "2023-05-21",
        location: "Refrigerator",
        status: "low",
      },
      {
        id: 7,
        name: "Cooking Oil",
        category: "Oils",
        quantity: 10,
        unit: "liters",
        supplier: "Kitchen Essentials",
        expiryDate: "2023-09-15",
        location: "Storage C",
        status: "low",
      },
      {
        id: 8,
        name: "Sugar",
        category: "Sweeteners",
        quantity: 75,
        unit: "kg",
        supplier: "Sweet Supplies",
        expiryDate: "2023-12-31",
        location: "Storage A",
        status: "normal",
      },
      {
        id: 9,
        name: "Salt",
        category: "Spices",
        quantity: 40,
        unit: "kg",
        supplier: "Spice World",
        expiryDate: "2024-01-15",
        location: "Storage A",
        status: "normal",
      },
      {
        id: 10,
        name: "Eggs",
        category: "Dairy",
        quantity: 200,
        unit: "pcs",
        supplier: "Poultry Farm",
        expiryDate: "2023-06-05",
        location: "Refrigerator",
        status: "normal",
      },
    ]
    setInventoryItems(items)

    // Stock alerts
    const alerts = [
      {
        id: 1,
        type: "expiring",
        item: "Potatoes",
        message: "Expires in 5 days",
        time: "2 hours ago",
      },
      {
        id: 2,
        type: "expiring",
        item: "Tomatoes",
        message: "Expires in 2 days",
        time: "2 hours ago",
      },
      {
        id: 3,
        type: "low",
        item: "Milk",
        message: "Low stock (15 liters remaining)",
        time: "5 hours ago",
      },
      {
        id: 4,
        type: "low",
        item: "Cooking Oil",
        message: "Low stock (10 liters remaining)",
        time: "1 day ago",
      },
    ]
    setStockAlerts(alerts)

    // Inventory stats
    const stats = {
      totalItems: 10,
      totalValue: 125000,
      expiringItems: 2,
      lowStockItems: 2,
    }
    setInventoryStats(stats)

    // Stock levels data for chart
    const stockData = [
      { name: "Grains", current: 430, minimum: 200 },
      { name: "Vegetables", current: 170, minimum: 100 },
      { name: "Meat", current: 80, minimum: 50 },
      { name: "Dairy", current: 215, minimum: 100 },
      { name: "Oils", current: 10, minimum: 20 },
      { name: "Spices", current: 40, minimum: 15 },
    ]
    setStockLevelsData(stockData)
  }, [])

  // Filter inventory items based on active tab, search query, and category filter
  const filteredItems = inventoryItems.filter((item) => {
    // Filter by tab
    if (activeTab === "expiring" && item.status !== "expiring") return false
    if (activeTab === "low" && item.status !== "low") return false

    // Filter by search query
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false

    // Filter by category
    if (categoryFilter !== "all" && item.category !== categoryFilter) return false

    return true
  })

  // Get unique categories for filter dropdown
  const categories = ["all", ...new Set(inventoryItems.map((item) => item.category))].sort()

  // Get status badge for inventory items
  const getStatusBadge = (status) => {
    switch (status) {
      case "expiring":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <FiClock className="mr-1" size={12} />
            Expiring Soon
          </span>
        )
      case "low":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <FiAlertCircle className="mr-1" size={12} />
            Low Stock
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Normal
          </span>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar role="government" />

        <main className="flex-1 ml-64 p-8">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Inventory Management</h1>
              <p className="text-gray-600">Track and manage your food inventory</p>
            </div>

            <button className="btn btn-primary flex items-center space-x-2">
              <FiPlus />
              <span>Add Item</span>
            </button>
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
                <div className="p-3 rounded-full bg-blue-100 mr-4">
                  <FiPackage className="text-blue-500" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Items</p>
                  <p className="text-xl font-bold">{inventoryStats.totalItems}</p>
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
                <div className="p-3 rounded-full bg-green-100 mr-4">
                  <FiBarChart2 className="text-green-500" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Value</p>
                  <p className="text-xl font-bold">₹{(inventoryStats?.totalValue??0).toLocaleString()}</p>
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
                <div className="p-3 rounded-full bg-yellow-100 mr-4">
                  <FiClock className="text-yellow-500" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Expiring Soon</p>
                  <p className="text-xl font-bold">{inventoryStats.expiringItems}</p>
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
                <div className="p-3 rounded-full bg-red-100 mr-4">
                  <FiAlertCircle className="text-red-500" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Low Stock</p>
                  <p className="text-xl font-bold">{inventoryStats.lowStockItems}</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Stock Levels Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="lg:col-span-2 bg-white rounded-lg shadow-sm"
            >
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-800">Stock Levels by Category</h3>
              </div>
              <div className="p-4 mt-12">
                <div className="h-80">
                  <CustomBarChart
                    data={stockLevelsData}
                    title=""
                    dataKeys={["current", "minimum"]}
                    colors={["#3b82f6", "#ef4444"]}
                  />
                </div>
                
              </div>
            </motion.div>

            {/* Stock Alerts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white rounded-lg shadow-sm"
            >
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-800">Stock Alerts</h3>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {stockAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-3 rounded-lg ${
                        alert.type === "expiring"
                          ? "bg-yellow-50 border border-yellow-200"
                          : "bg-red-50 border border-red-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className={`font-medium ${alert.type === "expiring" ? "text-yellow-800" : "text-red-800"}`}>
                          {alert.item}
                        </h4>
                        <span className={`text-xs ${alert.type === "expiring" ? "text-yellow-600" : "text-red-600"}`}>
                          {alert.time}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{alert.message}</p>
                      <div className="mt-2 flex justify-end">
                        <button
                          className={`px-2 py-1 text-xs font-medium rounded-md ${
                            alert.type === "expiring" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          Take Action
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Inventory Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">Inventory Items</h3>
            </div>

            {/* Filters and Search */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setActiveTab("all")}
                    className={`px-3 py-1 rounded-md text-sm ${
                      activeTab === "all" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    All Items
                  </button>
                  <button
                    onClick={() => setActiveTab("expiring")}
                    className={`px-3 py-1 rounded-md text-sm ${
                      activeTab === "expiring" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    Expiring Soon
                  </button>
                  <button
                    onClick={() => setActiveTab("low")}
                    className={`px-3 py-1 rounded-md text-sm ${
                      activeTab === "low" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    Low Stock
                  </button>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiSearch className="text-gray-400" size={16} />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Search items..."
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiFilter className="text-gray-400" size={16} />
                    </div>
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category === "all" ? "All Categories" : category}
                        </option>
                      ))}
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
                      Item
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Supplier
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Expiry Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Location
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
                  {filteredItems.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.quantity} {item.unit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.supplier}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.expiryDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(item.status)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          <FiEdit size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <FiTrash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default GovInventory
