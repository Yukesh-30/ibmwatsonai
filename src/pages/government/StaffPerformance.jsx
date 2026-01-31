"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  FiUsers, 
  FiCalendar, 
  FiClock, 
  FiStar, 
  FiFilter, 
  FiDownload,
  FiSearch,
  FiChevronDown,
  FiChevronUp,
  FiEdit,
  FiMessageSquare
} from "react-icons/fi"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import CustomBarChart from "../../components/charts/BarChart"

const GovStaffPerformance = () => {
  const [activeTab, setActiveTab] = useState("attendance")
  const [selectedMonth, setSelectedMonth] = useState("May 2023")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [staffMembers, setStaffMembers] = useState([])
  const [attendanceData, setAttendanceData] = useState([])
  const [performanceData, setPerformanceData] = useState([])
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState(null)

  useEffect(() => {
    // Simulate API calls
    // In a real app, you would fetch data from your backend

    // Staff members data
    const staffData = [
      {
        id: 1,
        name: "Rajesh Kumar",
        role: "Head Chef",
        attendance: 22,
        workingDays: 24,
        performance: 92,
        remarks: "Excellent food quality and kitchen management.",
        avatar: "RK"
      },
      {
        id: 2,
        name: "Priya Sharma",
        role: "Assistant Chef",
        attendance: 23,
        workingDays: 24,
        performance: 88,
        remarks: "Good food preparation skills. Needs improvement in time management.",
        avatar: "PS"
      },
      {
        id: 3,
        name: "Amit Patel",
        role: "Kitchen Helper",
        attendance: 20,
        workingDays: 24,
        performance: 78,
        remarks: "Satisfactory performance. Needs to improve cleanliness standards.",
        avatar: "AP"
      },
      {
        id: 4,
        name: "Sunita Singh",
        role: "Serving Staff",
        attendance: 24,
        workingDays: 24,
        performance: 95,
        remarks: "Outstanding service and customer interaction.",
        avatar: "SS"
      },
      {
        id: 5,
        name: "Vikram Malhotra",
        role: "Inventory Manager",
        attendance: 21,
        workingDays: 24,
        performance: 85,
        remarks: "Good inventory management. Can improve stock forecasting.",
        avatar: "VM"
      },
      {
        id: 6,
        name: "Neha Gupta",
        role: "Cleaning Staff",
        attendance: 22,
        workingDays: 24,
        performance: 82,
        remarks: "Maintains good cleanliness. Can improve thoroughness.",
        avatar: "NG"
      },
      {
        id: 7,
        name: "Rahul Verma",
        role: "Security Guard",
        attendance: 23,
        workingDays: 24,
        performance: 90,
        remarks: "Very reliable and vigilant.",
        avatar: "RV"
      },
      {
        id: 8,
        name: "Ananya Desai",
        role: "Administrative Assistant",
        attendance: 24,
        workingDays: 24,
        performance: 94,
        remarks: "Excellent record keeping and organization skills.",
        avatar: "AD"
      },
    ]
    setStaffMembers(staffData)

    // Attendance data for chart
    const attendanceChartData = [
      { name: "Week 1", present: 38, absent: 2 },
      { name: "Week 2", present: 37, absent: 3 },
      { name: "Week 3", present: 39, absent: 1 },
      { name: "Week 4", present: 36, absent: 4 },
    ]
    setAttendanceData(attendanceChartData)

    // Performance data for chart
    const performanceChartData = [
      { name: "Head Chef", score: 92 },
      { name: "Assistant Chef", score: 88 },
      { name: "Kitchen Helper", score: 78 },
      { name: "Serving Staff", score: 95 },
      { name: "Inventory Manager", score: 85 },
      { name: "Cleaning Staff", score: 82 },
      { name: "Security Guard", score: 90 },
      { name: "Admin Assistant", score: 94 },
    ]
    setPerformanceData(performanceChartData)
  }, [])

  const getPerformanceColor = (score) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-blue-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getPerformanceBgColor = (score) => {
    if (score >= 90) return "bg-green-600"
    if (score >= 80) return "bg-blue-600"
    if (score >= 70) return "bg-yellow-600"
    return "bg-red-600"
  }

  const getAttendanceColor = (attendance, workingDays) => {
    const percentage = (attendance / workingDays) * 100
    if (percentage >= 95) return "text-green-600"
    if (percentage >= 85) return "text-blue-600"
    if (percentage >= 75) return "text-yellow-600"
    return "text-red-600"
  }

  const filteredStaff = staffMembers.filter(staff => {
    // Filter by search query
    if (searchQuery && !staff.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    
    // Filter by role
    if (filterRole !== "all" && staff.role !== filterRole) {
      return false
    }
    
    return true
  })

  const openFeedbackModal = (staff) => {
    setSelectedStaff(staff)
    setShowFeedbackModal(true)
  }

  const uniqueRoles = ["all", ...new Set(staffMembers.map(staff => staff.role))]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar role="government" />

        <main className="flex-1 ml-64 p-8">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Staff Performance</h1>
              <p className="text-gray-600">Monitor attendance and performance of your staff</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiCalendar className="text-gray-400" size={16} />
                </div>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="May 2023">May 2023</option>
                  <option value="April 2023">April 2023</option>
                  <option value="March 2023">March 2023</option>
                </select>
              </div>
              <button className="btn btn-outline flex items-center space-x-2">
                <FiDownload />
                <span>Export</span>
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
                <div className="p-3 rounded-full bg-blue-100 mr-4">
                  <FiUsers className="text-blue-500" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Staff</p>
                  <p className="text-xl font-bold">{staffMembers.length}</p>
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
                  <FiClock className="text-green-500" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Avg. Attendance</p>
                  <p className="text-xl font-bold">91.7%</p>
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
                  <FiStar className="text-purple-500" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Avg. Performance</p>
                  <p className="text-xl font-bold">88.0</p>
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
                  <FiStar className="text-yellow-500" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Top Performer</p>
                  <p className="text-xl font-bold">Sunita Singh</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("attendance")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "attendance"
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Attendance Tracker
              </button>
              <button
                onClick={() => setActiveTab("performance")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "performance"
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Performance Scores
              </button>
              <button
                onClick={() => setActiveTab("heatmap")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "heatmap"
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Activity Heatmap
              </button>
            </nav>
          </div>

          {/* Search and Filter */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" size={16} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search staff..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiFilter className="text-gray-400" size={16} />
              </div>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {uniqueRoles.map(role => (
                  <option key={role} value={role}>
                    {role === "all" ? "All Roles" : role}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Attendance Tracker */}
          {activeTab === "attendance" && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="lg:col-span-2 bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-800">Weekly Attendance</h3>
                  </div>
                  <div className="p-4">
                    <div className="h-80">
                      <CustomBarChart
                        data={attendanceData}
                        title=""
                        dataKeys={["present", "absent"]}
                        colors={["#10b981", "#ef4444"]}
                      />
                    </div>
                    <div className="mt-4 flex items-center justify-center space-x-8">
                      
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-800">Attendance Summary</h3>
                  </div>
                  <div className="p-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Working Days</h4>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full w-full"></div>
                          </div>
                          <span className="ml-2 text-sm font-medium">24</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Present Days</h4>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-green-600 h-2.5 rounded-full w-[91.7%]"></div>
                          </div>
                          <span className="ml-2 text-sm font-medium">22</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Absent Days</h4>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-red-600 h-2.5 rounded-full w-[8.3%]"></div>
                          </div>
                          <span className="ml-2 text-sm font-medium">2</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Late Arrivals</h4>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-yellow-600 h-2.5 rounded-full w-[12.5%]"></div>
                          </div>
                          <span className="ml-2 text-sm font-medium">3</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="bg-green-50 p-3 rounded-lg text-center">
                        <p className="text-sm text-gray-600">Attendance Rate</p>
                        <p className="text-xl font-bold text-green-600">91.7%</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg text-center">
                        <p className="text-sm text-gray-600">Punctuality Rate</p>
                        <p className="text-xl font-bold text-blue-600">87.5%</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800">Staff Attendance</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Role
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Attendance
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Late Arrivals
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
                      {filteredStaff.map((staff) => (
                        <tr key={staff.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-600 font-medium">{staff.avatar}</span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{staff.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.role}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span
                                className={`font-medium ${getAttendanceColor(
                                  staff.attendance,
                                  staff.workingDays
                                )}`}
                              >
                                {staff.attendance}/{staff.workingDays}
                              </span>
                              <span className="ml-2 text-gray-500 text-sm">
                                ({((staff.attendance / staff.workingDays) * 100).toFixed(1)}%)
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {Math.floor(Math.random() * 3)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button 
                              onClick={() => openFeedbackModal(staff)}
                              className="text-blue-600 hover:text-blue-900 mr-3"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </>
          )}

          {/* Performance Scores */}
          {activeTab === "performance" && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="lg:col-span-2 bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-800">Performance by Role</h3>
                  </div>
                  <div className="p-4">
                    <div className="h-80">
                      <CustomBarChart
                        data={performanceData}
                        title=""
                        dataKeys={["score"]}
                        colors={["#3b82f6"]}
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-800">Performance Metrics</h3>
                  </div>
                  <div className="p-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Food Quality</h4>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-green-600 h-2.5 rounded-full w-[92%]"></div>
                          </div>
                          <span className="ml-2 text-sm font-medium">92%</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Cleanliness</h4>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full w-[85%]"></div>
                          </div>
                          <span className="ml-2 text-sm font-medium">85%</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Customer Service</h4>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-purple-600 h-2.5 rounded-full w-[90%]"></div>
                          </div>
                          <span className="ml-2 text-sm font-medium">90%</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Time Management</h4>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-yellow-600 h-2.5 rounded-full w-[78%]"></div>
                          </div>
                          <span className="ml-2 text-sm font-medium">78%</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">Performance Insights</h4>
                      <p className="text-sm text-gray-700">
                        Overall performance is good with excellent food quality and customer service. Time management
                        could be improved, especially during peak hours.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800">Staff Performance</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Role
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Performance Score
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Remarks
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
                      {filteredStaff.map((staff) => (
                        <tr key={staff.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-600 font-medium">{staff.avatar}</span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{staff.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.role}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-24 bg-gray-200 rounded-full h-2.5 mr-2">
                                <div
                                  className={`h-2.5 rounded-full ${getPerformanceBgColor(staff.performance)}`}
                                  style={{ width: `${staff.performance}%` }}
                                ></div>
                              </div>
                              <span className={`font-medium ${getPerformanceColor(staff.performance)}`}>
                                {staff.performance}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.remarks}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button 
                              onClick={() => openFeedbackModal(staff)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </>
          )}

          {/* Activity Heatmap */}
          {activeTab === "heatmap" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-800">Staff Activity Heatmap</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Showing activity levels throughout the day for the month of {selectedMonth}
                </p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-8 gap-2 mb-4">
                  <div className="text-center text-xs text-gray-500 font-medium">Hour</div>
                  <div className="text-center text-xs text-gray-500 font-medium">Monday</div>
                  <div className="text-center text-xs text-gray-500 font-medium">Tuesday</div>
                  <div className="text-center text-xs text-gray-500 font-medium">Wednesday</div>
                  <div className="text-center text-xs text-gray-500 font-medium">Thursday</div>
                  <div className="text-center text-xs text-gray-500 font-medium">Friday</div>
                  <div className="text-center text-xs text-gray-500 font-medium">Saturday</div>
                  <div className="text-center text-xs text-gray-500 font-medium">Sunday</div>
                </div>

                {/* Heatmap Grid */}
                <div className="space-y-2">
                  {[
                    "6 AM",
                    "7 AM",
                    "8 AM",
                    "9 AM",
                    "10 AM",
                    "11 AM",
                    "12 PM",
                    "1 PM",
                    "2 PM",
                    "3 PM",
                    "4 PM",
                    "5 PM",
                    "6 PM",
                    "7 PM",
                    "8 PM",
                  ].map((hour, hourIndex) => (
                    <div key={hour} className="grid grid-cols-8 gap-2">
                      <div className="flex items-center justify-end text-xs text-gray-500">{hour}</div>
                      {[0, 1, 2, 3, 4, 5, 6].map((day) => {
                        // Generate random activity level for demo
                        // In a real app, this would come from your backend
                        const activityLevel = Math.floor(Math.random() * 100)
                        let bgColor = "bg-green-100"
                        if (activityLevel > 80) bgColor = "bg-green-500"
                        else if (activityLevel > 60) bgColor = "bg-green-400"
                        else if (activityLevel > 40) bgColor = "bg-green-300"
                        else if (activityLevel > 20) bgColor = "bg-green-200"

                        // Simulate lunch hour peak
                        if (hourIndex >= 6 && hourIndex <= 8) {
                          bgColor = "bg-green-500"
                        }

                        // Simulate morning prep
                        if (hourIndex >= 2 && hourIndex <= 4 && day <= 5) {
                          bgColor = "bg-green-400"
                        }

                        // Simulate evening cleanup
                        if (hourIndex >= 12 && hourIndex <= 13 && day <= 5) {
                          bgColor = "bg-green-400"
                        }

                        // Simulate weekend patterns
                        if (day >= 5 && hourIndex < 5) {
                          bgColor = "bg-green-100"
                        }

                        return (
                          <div
                            key={day}
                            className={`h-8 rounded-md ${bgColor} hover:opacity-75 cursor-pointer transition-opacity`}
                            title={`${activityLevel}% activity`}
                          ></div>
                        )
                      })}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-center">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-100 rounded-sm mr-1"></div>
                      <span className="text-xs text-gray-600">Low</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-200 rounded-sm mr-1"></div>
                      <span className="text-xs text-gray-600">Medium-Low</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-300 rounded-sm mr-1"></div>
                      <span className="text-xs text-gray-600">Medium</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-400 rounded-sm mr-1"></div>
                      <span className="text-xs text-gray-600">Medium-High</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-500 rounded-sm mr-1"></div>
                      <span className="text-xs text-gray-600">High</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Staff Feedback Modal */}
          {showFeedbackModal && selectedStaff && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-lg w-full max-w-2xl"
              >
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-800">Staff Performance Details</h3>
                  <button onClick={() => setShowFeedbackModal(false)} className="text-gray-400 hover:text-gray-500">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-medium text-gray-600">
                      {selectedStaff.avatar}
                    </div>
                    <div className="ml-4">
                      <h4 className="text-xl font-medium">{selectedStaff.name}</h4>
                      <p className="text-gray-500">{selectedStaff.role}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-medium mb-3">Performance Score</h5>
                      <div className="flex items-center mb-4">
                        <div className="w-full bg-gray-200 rounded-full h-4 mr-2">
                          <div
                            className={`h-4 rounded-full ${getPerformanceBgColor(selectedStaff.performance)}`}
                            style={{ width: `${selectedStaff.performance}%` }}
                          ></div>
                        </div>
                        <span className={`text-lg font-bold ${getPerformanceColor(selectedStaff.performance)}`}>
                          {selectedStaff.performance}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{selectedStaff.remarks}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-medium mb-3">Attendance</h5>
                      <div className="flex items-center mb-4">
                        <div className="w-full bg-gray-200 rounded-full h-4 mr-2">
                          <div
                            className="bg-blue-600 h-4 rounded-full"
                            style={{ width: `${(selectedStaff.attendance / selectedStaff.workingDays) * 100}%` }}
                          ></div>
                        </div>
                        <span className={`text-lg font-bold ${getAttendanceColor(selectedStaff.attendance, selectedStaff.workingDays)}`}>
                          {((selectedStaff.attendance / selectedStaff.workingDays) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Present {selectedStaff.attendance} out of {selectedStaff.workingDays} working days
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h5 className="font-medium mb-3">Performance Breakdown</h5>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h6 className="text-sm text-gray-500 mb-1">Food Quality</h6>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '90%' }}></div>
                          </div>
                          <span className="ml-2 text-sm font-medium">90%</span>
                        </div>
                      </div>
                      <div>
                        <h6 className="text-sm text-gray-500 mb-1">Cleanliness</h6>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                          <span className="ml-2 text-sm font-medium">85%</span>
                        </div>
                      </div>
                      <div>
                        <h6 className="text-sm text-gray-500 mb-1">Time Management</h6>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                          </div>
                          <span className="ml-2 text-sm font-medium">75%</span>
                        </div>
                      </div>
                      <div>
                        <h6 className="text-sm text-gray-500 mb-1">Teamwork</h6>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '95%' }}></div>
                          </div>
                          <span className="ml-2 text-sm font-medium">95%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h5 className="font-medium mb-3">Provide Feedback</h5>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[100px]"
                      placeholder="Enter your feedback for this staff member..."
                    ></textarea>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setShowFeedbackModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Close
                    </button>
                    <button
                      className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                    >
                      <FiMessageSquare className="mr-2" />
                      Send Feedback
                    </button>
                    <button
                      className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <FiEdit className="mr-2" />
                      Edit Performance
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default GovStaffPerformance
