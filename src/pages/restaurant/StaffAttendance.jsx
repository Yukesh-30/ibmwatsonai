"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FiUserCheck, FiUserX, FiCalendar, FiClock, FiEdit2, FiPlus } from "react-icons/fi"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import CustomBarChart from "../../components/charts/BarChart"

const RestStaffAttendance = () => {
    const [staff, setStaff] = useState([])
    const [attendanceData, setAttendanceData] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
    const [showAddModal, setShowAddModal] = useState(false)
    const [newStaff, setNewStaff] = useState({
        name: "",
        role: "",
        phone: "",
        email: "",
    })
    const [showAttendanceModal, setShowAttendanceModal] = useState(false)
    const [selectedStaff, setSelectedStaff] = useState(null)
    const [attendanceTime, setAttendanceTime] = useState("")

    useEffect(() => {
        // Simulate API calls
        const mockStaff = [
            {
                id: 1,
                name: "Rahul Sharma",
                role: "Chef",
                phone: "+91 9876543210",
                email: "rahul@example.com",
                status: "present",
                checkInTime: "09:15 AM",
            },
            {
                id: 2,
                name: "Priya Patel",
                role: "Sous Chef",
                phone: "+91 9876543211",
                email: "priya@example.com",
                status: "present",
                checkInTime: "09:05 AM",
            },
            {
                id: 3,
                name: "Amit Kumar",
                role: "Waiter",
                phone: "+91 9876543212",
                email: "amit@example.com",
                status: "present",
                checkInTime: "09:30 AM",
            },
            {
                id: 4,
                name: "Neha Singh",
                role: "Waitress",
                phone: "+91 9876543213",
                email: "neha@example.com",
                status: "absent",
                checkInTime: "",
            },
            {
                id: 5,
                name: "Vikram Malhotra",
                role: "Cashier",
                phone: "+91 9876543214",
                email: "vikram@example.com",
                status: "present",
                checkInTime: "09:10 AM",
            },
            {
                id: 6,
                name: "Deepa Gupta",
                role: "Cleaner",
                phone: "+91 9876543215",
                email: "deepa@example.com",
                status: "late",
                checkInTime: "10:45 AM",
            },
        ]
        setStaff(mockStaff)

        // Attendance data for chart
        const mockAttendanceData = [
            { name: "Mon", present: 6, absent: 0, late: 0 },
            { name: "Tue", present: 5, absent: 1, late: 0 },
            { name: "Wed", present: 4, absent: 1, late: 1 },
            { name: "Thu", present: 5, absent: 0, late: 1 },
            { name: "Fri", present: 4, absent: 2, late: 0 },
            { name: "Sat", present: 6, absent: 0, late: 0 },
            { name: "Sun", present: 5, absent: 0, late: 1 },
        ]
        setAttendanceData(mockAttendanceData)
    }, [])

    const handleAddStaff = () => {
        const newId = Math.max(...staff.map((s) => s.id), 0) + 1

        const staffMember = {
            id: newId,
            ...newStaff,
            status: "absent",
            checkInTime: "",
        }

        setStaff([...staff, staffMember])
        setShowAddModal(false)
        setNewStaff({
            name: "",
            role: "",
            phone: "",
            email: "",
        })
    }

    const handleMarkAttendance = (staffId) => {
        const staffMember = staff.find((s) => s.id === staffId)

        if (!staffMember) return

        setSelectedStaff(staffMember)
        setAttendanceTime(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }))
        setShowAttendanceModal(true)
    }

    const handleConfirmAttendance = () => {
        if (!selectedStaff) return

        const updatedStaff = staff.map((s) => {
            if (s.id === selectedStaff.id) {
                return {
                    ...s,
                    status: "present",
                    checkInTime: attendanceTime,
                }
            }
            return s
        })

        setStaff(updatedStaff)
        setShowAttendanceModal(false)
        setSelectedStaff(null)
        setAttendanceTime("")
    }

    const getPresentCount = () => staff.filter((s) => s.status === "present").length
    const getAbsentCount = () => staff.filter((s) => s.status === "absent").length
    const getLateCount = () => staff.filter((s) => s.status === "late").length

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex">
                <Sidebar role="restaurant" />

                <main className="flex-1 ml-64 p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Staff Attendance</h1>
                            <p className="text-gray-600">Track and manage your staff attendance</p>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex items-center">
                                <FiCalendar className="mr-2 text-gray-500" />
                                <input
                                    type="date"
                                    className="input"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                />
                            </div>

                            <button className="btn btn-primary flex items-center gap-2" onClick={() => setShowAddModal(true)}>
                                <FiPlus size={16} />
                                <span>Add Staff</span>
                            </button>
                        </div>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="card"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium">Present</h3>
                                <div className="bg-green-100 p-2 rounded-full">
                                    <FiUserCheck className="text-green-500" size={20} />
                                </div>
                            </div>
                            <div className="text-3xl font-bold mb-2">{getPresentCount()}</div>
                            <div className="text-sm text-gray-500">
                                {((getPresentCount() / staff.length) * 100).toFixed(1)}% of total staff
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="card"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium">Absent</h3>
                                <div className="bg-red-100 p-2 rounded-full">
                                    <FiUserX className="text-red-500" size={20} />
                                </div>
                            </div>
                            <div className="text-3xl font-bold mb-2">{getAbsentCount()}</div>
                            <div className="text-sm text-gray-500">
                                {((getAbsentCount() / staff.length) * 100).toFixed(1)}% of total staff
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="card"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium">Late</h3>
                                <div className="bg-yellow-100 p-2 rounded-full">
                                    <FiClock className="text-yellow-500" size={20} />
                                </div>
                            </div>
                            <div className="text-3xl font-bold mb-2">{getLateCount()}</div>
                            <div className="text-sm text-gray-500">
                                {((getLateCount() / staff.length) * 100).toFixed(1)}% of total staff
                            </div>
                        </motion.div>
                    </div>

                    {/* Attendance Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mb-8"
                    >
                        <CustomBarChart
                            data={attendanceData}
                            title="Weekly Attendance"
                            dataKeys={["present", "absent", "late"]}
                            colors={["#22c55e", "#ef4444", "#f59e0b"]}
                        />
                    </motion.div>

                    {/* Staff List */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="card"
                    >
                        <h2 className="text-lg font-medium mb-4">Staff List</h2>
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
                                        Status
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Check-in Time
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Actions
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {staff.map((staffMember) => (
                                    <tr key={staffMember.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-gray-600 font-medium">
                              {staffMember.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                            </span>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{staffMember.name}</div>
                                                    <div className="text-sm text-gray-500">{staffMember.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{staffMember.role}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                        <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${
                                staffMember.status === "present"
                                    ? "bg-green-100 text-green-800"
                                    : staffMember.status === "absent"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-yellow-100 text-yellow-800"
                            }`}
                        >
                          {staffMember.status.charAt(0).toUpperCase() + staffMember.status.slice(1)}
                        </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{staffMember.checkInTime || "-"}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {staffMember.status === "absent" ? (
                                                <button
                                                    onClick={() => handleMarkAttendance(staffMember.id, "present")}
                                                    className="text-green-600 hover:text-green-900 mr-3"
                                                >
                                                    Mark Present
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleMarkAttendance(staffMember.id, "absent")}
                                                    className="text-red-600 hover:text-red-900 mr-3"
                                                >
                                                    Mark Absent
                                                </button>
                                            )}
                                            <button className="text-blue-600 hover:text-blue-900">
                                                <FiEdit2 className="inline" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>

                    {/* Add Staff Modal */}
                    {showAddModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white rounded-lg p-6 w-full max-w-md"
                            >
                                <h2 className="text-xl font-bold mb-4">Add New Staff</h2>

                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="label">
                                            Full Name
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            className="input"
                                            value={newStaff.name}
                                            onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="role" className="label">
                                            Role
                                        </label>
                                        <input
                                            id="role"
                                            type="text"
                                            className="input"
                                            value={newStaff.role}
                                            onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="label">
                                            Phone Number
                                        </label>
                                        <input
                                            id="phone"
                                            type="tel"
                                            className="input"
                                            value={newStaff.phone}
                                            onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="label">
                                            Email Address
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            className="input"
                                            value={newStaff.email}
                                            onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2 mt-6">
                                    <button className="btn btn-outline" onClick={() => setShowAddModal(false)}>
                                        Cancel
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleAddStaff}
                                        disabled={!newStaff.name || !newStaff.role || !newStaff.phone || !newStaff.email}
                                    >
                                        Add Staff
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}

                    {/* Mark Attendance Modal */}
                    {showAttendanceModal && selectedStaff && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white rounded-lg p-6 w-full max-w-md"
                            >
                                <h2 className="text-xl font-bold mb-4">Mark Attendance</h2>

                                <div className="mb-4">
                                    <p className="text-gray-600">
                                        You are marking <span className="font-medium text-gray-800">{selectedStaff.name}</span> as present.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="checkInTime" className="label">
                                            Check-in Time
                                        </label>
                                        <input
                                            id="checkInTime"
                                            type="text"
                                            className="input"
                                            value={attendanceTime}
                                            onChange={(e) => setAttendanceTime(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2 mt-6">
                                    <button
                                        className="btn btn-outline"
                                        onClick={() => {
                                            setShowAttendanceModal(false)
                                            setSelectedStaff(null)
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button className="btn btn-primary" onClick={handleConfirmAttendance}>
                                        Confirm
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}

export default RestStaffAttendance
