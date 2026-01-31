"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FiUserCheck, FiUserX, FiCalendar, FiClock, FiEdit2, FiPlus, FiFilter, FiDownload } from "react-icons/fi"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import CustomBarChart from "../../components/charts/BarChart"

const CorpStaffAttendance = () => {
    const [staff, setStaff] = useState([])
    const [attendanceData, setAttendanceData] = useState([])
    const [departmentData, setDepartmentData] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
    const [departmentFilter, setDepartmentFilter] = useState("all")
    const [showAddModal, setShowAddModal] = useState(false)
    const [newStaff, setNewStaff] = useState({
        name: "",
        role: "",
        department: "",
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
                department: "Kitchen",
                phone: "+91 9876543210",
                email: "rahul@example.com",
                status: "present",
                checkInTime: "09:15 AM",
            },
            {
                id: 2,
                name: "Priya Patel",
                role: "Sous Chef",
                department: "Kitchen",
                phone: "+91 9876543211",
                email: "priya@example.com",
                status: "present",
                checkInTime: "09:05 AM",
            },
            {
                id: 3,
                name: "Amit Kumar",
                role: "Server",
                department: "Service",
                phone: "+91 9876543212",
                email: "amit@example.com",
                status: "present",
                checkInTime: "09:30 AM",
            },
            {
                id: 4,
                name: "Neha Singh",
                role: "Server",
                department: "Service",
                phone: "+91 9876543213",
                email: "neha@example.com",
                status: "absent",
                checkInTime: "",
            },
            {
                id: 5,
                name: "Vikram Malhotra",
                role: "Cashier",
                department: "Service",
                phone: "+91 9876543214",
                email: "vikram@example.com",
                status: "present",
                checkInTime: "09:10 AM",
            },
            {
                id: 6,
                name: "Deepa Gupta",
                role: "Cleaner",
                department: "Housekeeping",
                phone: "+91 9876543215",
                email: "deepa@example.com",
                status: "late",
                checkInTime: "10:45 AM",
            },
            {
                id: 7,
                name: "Rajesh Verma",
                role: "Manager",
                department: "Management",
                phone: "+91 9876543216",
                email: "rajesh@example.com",
                status: "present",
                checkInTime: "08:45 AM",
            },
            {
                id: 8,
                name: "Ananya Desai",
                role: "Nutritionist",
                department: "Management",
                phone: "+91 9876543217",
                email: "ananya@example.com",
                status: "present",
                checkInTime: "09:00 AM",
            },
        ]
        setStaff(mockStaff)

        // Attendance data for chart
        const mockAttendanceData = [
            { name: "Mon", present: 7, absent: 1, late: 0 },
            { name: "Tue", present: 6, absent: 1, late: 1 },
            { name: "Wed", present: 5, absent: 2, late: 1 },
            { name: "Thu", present: 7, absent: 0, late: 1 },
            { name: "Fri", present: 6, absent: 2, late: 0 },
            { name: "Sat", present: 8, absent: 0, late: 0 },
            { name: "Sun", present: 7, absent: 0, late: 1 },
        ]
        setAttendanceData(mockAttendanceData)

        // Department data for chart
        const mockDepartmentData = [
            { name: "Kitchen", present: 2, absent: 0, late: 0 },
            { name: "Service", present: 2, absent: 1, late: 0 },
            { name: "Housekeeping", present: 0, absent: 0, late: 1 },
            { name: "Management", present: 2, absent: 0, late: 0 },
        ]
        setDepartmentData(mockDepartmentData)
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
            department: "",
            phone: "",
            email: "",
        })
    }

    const handleMarkAttendance = (staffId, status) => {
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

    const filteredStaff = departmentFilter === "all" ? staff : staff.filter((s) => s.department === departmentFilter)

    const departments = ["all", ...new Set(staff.map((s) => s.department))]

    const exportAttendance = () => {
        alert("Exporting attendance data...")
        // In a real app, this would generate and download a CSV or Excel file
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex">
                <Sidebar role="corporate" />

                <main className="flex-1 ml-64 p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Corporate Staff Attendance</h1>
                            <p className="text-gray-600">Track and manage your canteen staff attendance</p>
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

                            <button className="btn btn-outline flex items-center gap-2" onClick={exportAttendance}>
                                <FiDownload size={16} />
                                <span>Export</span>
                            </button>

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

                    {/* Attendance Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <CustomBarChart
                                data={attendanceData}
                                title="Weekly Attendance"
                                dataKeys={["present", "absent", "late"]}
                                colors={["#22c55e", "#ef4444", "#f59e0b"]}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <CustomBarChart
                                data={departmentData}
                                title="Attendance by Department"
                                dataKeys={["present", "absent", "late"]}
                                colors={["#22c55e", "#ef4444", "#f59e0b"]}
                            />
                        </motion.div>
                    </div>

                    {/* Staff List */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="card"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-medium">Staff List</h2>

                            <div className="flex items-center">
                                <FiFilter className="mr-2 text-gray-500" />
                                <select
                                    className="input"
                                    value={departmentFilter}
                                    onChange={(e) => setDepartmentFilter(e.target.value)}
                                >
                                    {departments.map((dept) => (
                                        <option key={dept} value={dept}>
                                            {dept === "all" ? "All Departments" : dept}
                                        </option>
                                    ))}
                                </select>
                            </div>
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
                                        Department
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
                                {filteredStaff.map((staffMember) => (
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
                                            <div className="text-sm text-gray-900">{staffMember.department}</div>
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
                                        <label htmlFor="department" className="label">
                                            Department
                                        </label>
                                        <select
                                            id="department"
                                            className="input"
                                            value={newStaff.department}
                                            onChange={(e) => setNewStaff({ ...newStaff, department: e.target.value })}
                                            required
                                        >
                                            <option value="">Select Department</option>
                                            <option value="Kitchen">Kitchen</option>
                                            <option value="Service">Service</option>
                                            <option value="Housekeeping">Housekeeping</option>
                                            <option value="Management">Management</option>
                                        </select>
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
                                        disabled={
                                            !newStaff.name || !newStaff.role || !newStaff.department || !newStaff.phone || !newStaff.email
                                        }
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

export default CorpStaffAttendance
