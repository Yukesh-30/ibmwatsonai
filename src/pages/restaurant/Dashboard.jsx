"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FiUsers, FiTrendingDown, FiAlertCircle, FiDollarSign } from "react-icons/fi"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import StatCard from "../../components/StatCard"
import CustomLineChart from "../../components/charts/LineChart"
import CustomBarChart from "../../components/charts/BarChart"
import AlertCard from "../../components/AlertCard"
import AIIntegration from "../../components/AIIntegration"

const RestDashboard = () => {
    const [wastageData, setWastageData] = useState([])
    const [revenueData, setRevenueData] = useState([])
    const [alerts, setAlerts] = useState([])
    const [aiResponse, setAIResponse] = useState(null)

    useEffect(() => {
        // Simulate API calls
        // In a real app, you would fetch data from your backend

        // Wastage data
        const wastageData = [
            { name: "Mon", wastage: 12, target: 10 },
            { name: "Tue", wastage: 15, target: 10 },
            { name: "Wed", wastage: 8, target: 10 },
            { name: "Thu", wastage: 10, target: 10 },
            { name: "Fri", wastage: 18, target: 10 },
            { name: "Sat", wastage: 20, target: 10 },
            { name: "Sun", wastage: 14, target: 10 },
        ]
        setWastageData(wastageData)

        // Revenue data
        const revenueData = [
            { name: "Mon", revenue: 2500, expenses: 1800 },
            { name: "Tue", revenue: 3200, expenses: 2100 },
            { name: "Wed", revenue: 2800, expenses: 1900 },
            { name: "Thu", revenue: 3500, expenses: 2200 },
            { name: "Fri", revenue: 4200, expenses: 2500 },
            { name: "Sat", revenue: 4800, expenses: 2800 },
            { name: "Sun", revenue: 3800, expenses: 2300 },
        ]
        setRevenueData(revenueData)

        // Alerts
        const alerts = [
            {
                id: 1,
                type: "danger",
                title: "Chicken expiring soon",
                message: "5kg of chicken will expire in 2 days. Consider using it in today's specials.",
                time: "2 hours ago",
            },
            {
                id: 2,
                type: "warning",
                title: "Vegetables low in stock",
                message: "Tomatoes and bell peppers are below threshold. Consider restocking.",
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

    const handleAIResponse = (response) => {
        setAIResponse(response)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex">
                <Sidebar role="restaurant" />

                <main className="flex-1 ml-64 p-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-800">Restaurant Dashboard</h1>
                        <p className="text-gray-600">Monitor your restaurant's performance and key metrics</p>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                            title="Customers Today"
                            value="245"
                            icon={<FiUsers className="text-blue-500" size={20} />}
                            color="blue"
                            percentage="12"
                            isIncreasing={true}
                        />

                        <StatCard
                            title="Food Wastage"
                            value="8.5 kg"
                            icon={<FiTrendingDown className="text-red-500" size={20} />}
                            color="red"
                            percentage="5"
                            isIncreasing={false}
                        />

                        <StatCard
                            title="Expiry Alerts"
                            value="3"
                            icon={<FiAlertCircle className="text-yellow-500" size={20} />}
                            color="yellow"
                        />

                        <StatCard
                            title="Today's Revenue"
                            value="₹24,500"
                            icon={<FiDollarSign className="text-green-500" size={20} />}
                            color="green"
                            percentage="8"
                            isIncreasing={true}
                        />
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <CustomLineChart
                            data={wastageData}
                            title="Daily Food Wastage"
                            dataKeys={["wastage", "target"]}
                            colors={["#ef4444", "#94a3b8"]}
                        />

                        <CustomBarChart
                            data={revenueData}
                            title="Revenue vs Expenses"
                            dataKeys={["revenue", "expenses"]}
                            colors={["#22c55e", "#f59e0b"]}
                        />
                    </div>

                    {/* Alerts and AI Integration Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="card"
                        >
                            <h3 className="text-lg font-medium mb-4">Inventory Alerts</h3>
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

                        <div>
                            <AIIntegration onAIResponse={handleAIResponse} />

                            {aiResponse && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="card mt-6"
                                >
                                    <h3 className="text-lg font-medium mb-4">AI Insights</h3>
                                    <p className="text-gray-700 mb-4">{aiResponse.prediction}</p>

                                    {aiResponse.recommendations && (
                                        <div>
                                            <h4 className="font-medium text-gray-700 mb-2">Recommendations:</h4>
                                            <ul className="list-disc pl-5 space-y-1">
                                                {aiResponse.recommendations.map((rec, index) => (
                                                    <li key={index} className="text-gray-600">{rec}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default RestDashboard
