"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FiShare2, FiMapPin, FiClock, FiCheck, FiX, FiPlus, FiPhone, FiMail, FiUsers, FiBarChart2 } from "react-icons/fi"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import CustomBarChart from "../../components/charts/BarChart"

const CorpRedistribution = () => {
    const [partners, setPartners] = useState([])
    const [pendingRequests, setPendingRequests] = useState([])
    const [completedRequests, setCompletedRequests] = useState([])
    const [showAddModal, setShowAddModal] = useState(false)
    const [newRequest, setNewRequest] = useState({
        partnerId: "",
        items: "",
        quantity: "",
        unit: "kg",
        pickupTime: "",
        notes: "",
    })
    const [redistributionStats, setRedistributionStats] = useState([])
    const [employeeParticipation, setEmployeeParticipation] = useState(false)

    useEffect(() => {
        // Simulate API calls
        const mockPartners = [
            {
                id: 1,
                name: "Hope Orphanage",
                type: "Orphanage",
                distance: "2.5 km",
                contact: "John Doe",
                phone: "+91 9876543210",
                email: "contact@hopeorphanage.org",
            },
            {
                id: 2,
                name: "Golden Age Home",
                type: "Old Age Home",
                distance: "3.8 km",
                contact: "Jane Smith",
                phone: "+91 9876543211",
                email: "info@goldenage.org",
            },
            {
                id: 3,
                name: "Shelter Foundation",
                type: "Homeless Shelter",
                distance: "5.2 km",
                contact: "Robert Johnson",
                phone: "+91 9876543212",
                email: "help@shelter.org",
            },
            {
                id: 4,
                name: "Community Center",
                type: "Community Center",
                distance: "1.7 km",
                contact: "Sarah Williams",
                phone: "+91 9876543213",
                email: "info@communitycenter.org",
            },
            {
                id: 5,
                name: "Local School",
                type: "School",
                distance: "4.3 km",
                contact: "Michael Brown",
                phone: "+91 9876543214",
                email: "principal@localschool.org",
            },
        ]
        setPartners(mockPartners)

        const mockPendingRequests = [
            {
                id: 1,
                partner: "Hope Orphanage",
                items: "Rice, Curry, Vegetables",
                quantity: "25 kg",
                status: "Pending",
                pickupTime: "Today, 6:00 PM",
                createdAt: "2 hours ago",
            },
            {
                id: 2,
                partner: "Shelter Foundation",
                items: "Bread, Fruits",
                quantity: "15 kg",
                status: "Pending",
                pickupTime: "Tomorrow, 10:00 AM",
                createdAt: "5 hours ago",
            },
        ]
        setPendingRequests(mockPendingRequests)

        const mockCompletedRequests = [
            {
                id: 3,
                partner: "Golden Age Home",
                items: "Rice, Dal, Vegetables",
                quantity: "20 kg",
                status: "Completed",
                pickupTime: "Yesterday, 7:00 PM",
                completedAt: "Yesterday, 7:15 PM",
            },
            {
                id: 4,
                partner: "Community Center",
                items: "Sandwiches, Fruits",
                quantity: "30 kg",
                status: "Completed",
                pickupTime: "Yesterday, 1:00 PM",
                completedAt: "Yesterday, 1:10 PM",
            },
            {
                id: 5,
                partner: "Hope Orphanage",
                items: "Rice, Curry",
                quantity: "35 kg",
                status: "Completed",
                pickupTime: "2 days ago, 6:30 PM",
                completedAt: "2 days ago, 6:45 PM",
            },
            {
                id: 6,
                partner: "Local School",
                items: "Sandwiches, Fruits, Juice",
                quantity: "40 kg",
                status: "Completed",
                pickupTime: "3 days ago, 3:00 PM",
                completedAt: "3 days ago, 3:15 PM",
            },
        ]
        setCompletedRequests(mockCompletedRequests)

        // Redistribution stats
        const mockRedistributionStats = [
            { name: "Jan", amount: 120 },
            { name: "Feb", amount: 150 },
            { name: "Mar", amount: 180 },
            { name: "Apr", amount: 210 },
            { name: "May", amount: 240 },
            { name: "Jun", amount: 270 },
        ]
        setRedistributionStats(mockRedistributionStats)
    }, [])

    const handleAddRequest = () => {
        const partner = partners.find((p) => p.id === Number.parseInt(newRequest.partnerId))

        if (!partner) return

        const newId = Math.max(...pendingRequests.map((r) => r.id), ...completedRequests.map((r) => r.id), 0) + 1

        const request = {
            id: newId,
            partner: partner.name,
            items: newRequest.items,
            quantity: `${newRequest.quantity} ${newRequest.unit}`,
            status: "Pending",
            pickupTime: newRequest.pickupTime,
            createdAt: "Just now",
        }

        setPendingRequests([request, ...pendingRequests])
        setShowAddModal(false)
        setNewRequest({
            partnerId: "",
            items: "",
            quantity: "",
            unit: "kg",
            pickupTime: "",
            notes: "",
        })
    }

    const handleCompleteRequest = (id) => {
        const request = pendingRequests.find((r) => r.id === id)

        if (!request) return

        const completedRequest = {
            ...request,
            status: "Completed",
            completedAt: "Just now",
        }

        setPendingRequests(pendingRequests.filter((r) => r.id !== id))
        setCompletedRequests([completedRequest, ...completedRequests])
    }

    const handleCancelRequest = (id) => {
        if (window.confirm("Are you sure you want to cancel this request?")) {
            setPendingRequests(pendingRequests.filter((r) => r.id !== id))
        }
    }

    const totalDonated = completedRequests.reduce((total, request) => {
        const quantity = parseFloat(request.quantity.split(" ")[0])
        return total + quantity
    }, 0)

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex">
                <Sidebar role="corporate" />

                <main className="flex-1 ml-64 p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Corporate Food Redistribution</h1>
                            <p className="text-gray-600">Donate excess food to nearby organizations</p>
                        </div>

                        <button className="btn btn-primary flex items-center gap-2" onClick={() => setShowAddModal(true)}>
                            <FiPlus size={16} />
                            <span>New Request</span>
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="card"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium">Total Donated</h3>
                                <div className="bg-green-100 p-2 rounded-full">
                                    <FiShare2 className="text-green-500" size={20} />
                                </div>
                            </div>
                            <div className="text-3xl font-bold mb-2">{totalDonated.toFixed(1)} kg</div>
                            <div className="text-sm text-gray-500">Across {completedRequests.length} donations</div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="card"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium">Partner Organizations</h3>
                                <div className="bg-blue-100 p-2 rounded-full">
                                    <FiUsers className="text-blue-500" size={20} />
                                </div>
                            </div>
                            <div className="text-3xl font-bold mb-2">{partners.length}</div>
                            <div className="text-sm text-gray-500">Active redistribution partners</div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="card"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium">Environmental Impact</h3>
                                <div className="bg-purple-100 p-2 rounded-full">
                                    <FiBarChart2 className="text-purple-500" size={20} />
                                </div>
                            </div>
                            <div className="text-3xl font-bold mb-2">{(totalDonated * 1.9).toFixed(1)} kg CO₂</div>
                            <div className="text-sm text-gray-500">Emissions saved by reducing waste</div>
                        </motion.div>
                    </div>

                    {/* Employee Participation Toggle */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="card mb-8"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-medium">Employee Participation Program</h2>
                                <p className="text-gray-600 mt-1">
                                    Enable employees to contribute to food redistribution efforts
                                </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={employeeParticipation}
                                    onChange={() => setEmployeeParticipation(!employeeParticipation)}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                            </label>
                        </div>

                        {employeeParticipation && (
                            <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                                <h3 className="font-medium text-green-700">Program Active</h3>
                                <p className="text-green-600 mt-1">
                                    Employees can now volunteer to help with food redistribution and receive recognition for their contributions.
                                </p>
                                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    12 Volunteers
                  </span>
                                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    45 Hours Contributed
                  </span>
                                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    3 Teams Participating
                  </span>
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Redistribution Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mb-8"
                    >
                        <CustomBarChart
                            data={redistributionStats}
                            title="Monthly Food Redistribution (kg)"
                            dataKeys={["amount"]}
                            colors={["#22c55e"]}
                        />
                    </motion.div>

                    {/* Partners */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="card mb-8"
                    >
                        <h2 className="text-lg font-medium mb-4">Nearby Partners</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {partners.map((partner) => (
                                <div
                                    key={partner.id}
                                    className="border border-gray-200 rounded-lg p-4 hover:border-green-500 hover:shadow-md transition-all duration-200"
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-medium text-gray-800">{partner.name}</h3>
                                            <p className="text-sm text-gray-500">{partner.type}</p>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <FiMapPin className="mr-1" size={14} />
                                            {partner.distance}
                                        </div>
                                    </div>

                                    <div className="mt-4 text-sm">
                                        <p className="flex items-center text-gray-600">
                                            <FiPhone className="mr-2" size={14} />
                                            {partner.phone}
                                        </p>
                                        <p className="flex items-center text-gray-600 mt-1">
                                            <FiMail className="mr-2" size={14} />
                                            {partner.email}
                                        </p>
                                    </div>

                                    <button
                                        className="mt-4 w-full btn btn-outline text-sm"
                                        onClick={() => {
                                            setNewRequest({
                                                ...newRequest,
                                                partnerId: partner.id.toString(),
                                            })
                                            setShowAddModal(true)
                                        }}
                                    >
                                        <FiShare2 className="mr-2" size={14} />
                                        Donate Food
                                    </button>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Pending Requests */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="card mb-8"
                    >
                        <h2 className="text-lg font-medium mb-4">Pending Requests</h2>
                        {pendingRequests.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">No pending requests</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Partner
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
                                            Quantity
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Pickup Time
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Created
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
                                    {pendingRequests.map((request) => (
                                        <tr key={request.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{request.partner}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{request.items}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{request.quantity}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <FiClock className="mr-1" size={14} />
                                                    {request.pickupTime}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{request.createdAt}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => handleCompleteRequest(request.id)}
                                                    className="text-green-600 hover:text-green-900 mr-3"
                                                >
                                                    <FiCheck className="inline" />
                                                </button>
                                                <button
                                                    onClick={() => handleCancelRequest(request.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    <FiX className="inline" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </motion.div>

                    {/* Completed Requests */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="card"
                    >
                        <h2 className="text-lg font-medium mb-4">Completed Requests</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Partner
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
                                        Quantity
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Pickup Time
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Completed
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {completedRequests.map((request) => (
                                    <tr key={request.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{request.partner}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{request.items}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{request.quantity}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{request.pickupTime}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{request.completedAt}</div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>

                    {/* Add Request Modal */}
                    {showAddModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white rounded-lg p-6 w-full max-w-md"
                            >
                                <h2 className="text-xl font-bold mb-4">New Donation Request</h2>

                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="partner" className="label">
                                            Partner Organization
                                        </label>
                                        <select
                                            id="partner"
                                            className="input"
                                            value={newRequest.partnerId}
                                            onChange={(e) => setNewRequest({ ...newRequest, partnerId: e.target.value })}
                                            required
                                        >
                                            <option value="">Select a partner</option>
                                            {partners.map((partner) => (
                                                <option key={partner.id} value={partner.id}>
                                                    {partner.name} ({partner.distance})
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="items" className="label">
                                            Food Items
                                        </label>
                                        <input
                                            id="items"
                                            type="text"
                                            className="input"
                                            placeholder="e.g., Rice, Curry, Vegetables"
                                            value={newRequest.items}
                                            onChange={(e) => setNewRequest({ ...newRequest, items: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label htmlFor="quantity" className="label">
                                                Quantity
                                            </label>
                                            <input
                                                id="quantity"
                                                type="number"
                                                min="0"
                                                step="0.1"
                                                className="input"
                                                value={newRequest.quantity}
                                                onChange={(e) => setNewRequest({ ...newRequest, quantity: e.target.value })}
                                                required
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <label htmlFor="unit" className="label">
                                                Unit
                                            </label>
                                            <select
                                                id="unit"
                                                className="input"
                                                value={newRequest.unit}
                                                onChange={(e) => setNewRequest({ ...newRequest, unit: e.target.value })}
                                            >
                                                <option value="kg">Kilogram (kg)</option>
                                                <option value="g">Gram (g)</option>
                                                <option value="liter">Liter (L)</option>
                                                <option value="ml">Milliliter (ml)</option>
                                                <option value="pcs">Pieces (pcs)</option>
                                                <option value="box">Box</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="pickupTime" className="label">
                                            Pickup Time
                                        </label>
                                        <input
                                            id="pickupTime"
                                            type="text"
                                            className="input"
                                            placeholder="e.g., Today, 6:00 PM"
                                            value={newRequest.pickupTime}
                                            onChange={(e) => setNewRequest({ ...newRequest, pickupTime: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="notes" className="label">
                                            Additional Notes
                                        </label>
                                        <textarea
                                            id="notes"
                                            className="input min-h-[80px]"
                                            placeholder="Any special instructions..."
                                            value={newRequest.notes}
                                            onChange={(e) => setNewRequest({ ...newRequest, notes: e.target.value })}
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2 mt-6">
                                    <button className="btn btn-outline" onClick={() => setShowAddModal(false)}>
                                        Cancel
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleAddRequest}
                                        disabled={
                                            !newRequest.partnerId || !newRequest.items || !newRequest.quantity || !newRequest.pickupTime
                                        }
                                    >
                                        Submit Request
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

export default CorpRedistribution
