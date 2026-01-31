"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FiUsers, FiTrendingDown, FiAlertCircle, FiDollarSign, FiCalendar } from "react-icons/fi"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import StatCard from "../../components/StatCard"
import CustomLineChart from "../../components/charts/LineChart"
import CustomBarChart from "../../components/charts/BarChart"
import AlertCard from "../../components/AlertCard"
import AIIntegration from "../../components/AIIntegration"

const CorpDashboard = () => {
    const [wastageData, setWastageData] = useState([])
    const [revenueData, setRevenueData] = useState([])
    const [mealPlanData, setMealPlanData] = useState([])
    const [alerts, setAlerts] = useState([])
    const [aiResponse, setAIResponse] = useState(null)
    const [upcomingEvents, setUpcomingEvents] = useState([])

    useEffect(() => {
        // Simulate API calls
        // In a real app, you would fetch data from your backend

        // Wastage data
        const wastageData = [
            { name: "Mon", wastage: 18, target: 15 },
            { name: "Tue", wastage: 22, target: 15 },
            { name: "Wed", wastage: 15, target: 15 },
            { name: "Thu", wastage: 12, target: 15 },
            { name: "Fri", wastage: 25, target: 15 },
            { name: "Sat", wastage: 10, target: 15 },
            { name: "Sun", wastage: 8, target: 15 },
        ]
        setWastageData(wastageData)

        // Revenue data
        const revenueData = [
            { name: "Mon", revenue: 35000, expenses: 28000 },
            { name: "Tue", revenue: 42000, expenses: 32000 },
            { name: "Wed", revenue: 38000, expenses: 30000 },
            { name: "Thu", revenue: 40000, expenses: 31000 },
            { name: "Fri", revenue: 45000, expenses: 34000 },
            { name: "Sat", revenue: 25000, expenses: 20000 },
            { name: "Sun", revenue: 22000, expenses: 18000 },
        ]
        setRevenueData(revenueData)

        // Meal plan data
        const mealPlanData = [
            { name: "Breakfast", planned: 250, actual: 230 },
            { name: "Lunch", planned: 450, actual: 420 },
            { name: "Snacks", planned: 200, actual: 180 },
            { name: "Dinner", planned: 350, actual: 320 },
        ]
        setMealPlanData(mealPlanData)

        // Alerts
        const alerts = [
            {
                id: 1,
                type: "danger",
                title: "Rice expiring soon",
                message: "30kg of rice will expire in 2 days. Consider using it in tomorrow's meals.",
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
                message: "AI predicts 15% higher demand tomorrow due to company event.",
                time: "1 day ago",
            },
        ]
        setAlerts(alerts)

        // Upcoming events
        const upcomingEvents = [
            {
                id: 1,
                title: "Company Quarterly Meeting",
                date: "2025-05-25",
                time: "10:00 AM - 2:00 PM",
                attendees: 120,
                mealType: "Lunch & Snacks",
            },
            {
                id: 2,
                title: "Product Launch",
                date: "2025-05-28",
                time: "6:00 PM - 9:00 PM",
                attendees: 80,
                mealType: "Dinner",
            },
            {
                id: 3,
                title: "Team Building Workshop",
                date: "2025-06-02",
                time: "9:00 AM - 5:00 PM",
                attendees: 50,
                mealType: "Breakfast, Lunch & Snacks",
            },
        ]
        setUpcomingEvents(upcomingEvents)
    }, [])

    const handleAIResponse = (response) => {
        setAIResponse(response)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex">
                <Sidebar role="corporate" />

                <main className="flex-1 ml-64 p-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-800">Corporate Canteen Dashboard</h1>
                        <p className="text-gray-600">Monitor your canteen's performance and key metrics</p>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                            title="Employees Served Today"
                            value="425"
                            icon={<FiUsers className="text-blue-500" size={20} />}
                            color="blue"
                            percentage="8"
                            isIncreasing={true}
                        />

                        <StatCard
                            title="Food Wastage"
                            value="12.5 kg"
                            icon={<FiTrendingDown className="text-red-500" size={20} />}
                            color="red"
                            percentage="10"
                            isIncreasing={false}
                        />

                        <StatCard
                            title="Expiry Alerts"
                            value="3"
                            icon={<FiAlertCircle className="text-yellow-500" size={20} />}
                            color="yellow"
                        />

                        <StatCard
                            title="Today's Budget"
                            value="₹42,500"
                            icon={<FiDollarSign className="text-green-500" size={20} />}
                            color="green"
                            percentage="5"
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
                            data={mealPlanData}
                            title="Meal Planning vs Actual"
                            dataKeys={["planned", "actual"]}
                            colors={["#3b82f6", "#22c55e"]}
                        />
                    </div>

                    {/* Alerts and Upcoming Events Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="card"
                        >
                            <h3 className="text-lg font-medium mb-4">Upcoming Events</h3>
                            <div className="space-y-4">
                                {upcomingEvents.map((event) => (
                                    <div
                                        key={event.id}
                                        className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-md transition-all duration-200"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h4 className="font-medium text-gray-800">{event.title}</h4>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    <FiCalendar className="inline mr-1" size={14} />
                                                    {new Date(event.date).toLocaleDateString()} | {event.time}
                                                </p>
                                            </div>
                                            <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                {event.attendees} Attendees
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-2">
                                            <span className="font-medium">Meal Type:</span> {event.mealType}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* AI Integration */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                                                    <li key={index} className="text-gray-600">
                                                        {rec}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </div>

                        <CustomBarChart
                            data={revenueData}
                            title="Revenue vs Expenses"
                            dataKeys={["revenue", "expenses"]}
                            colors={["#22c55e", "#f59e0b"]}
                        />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default CorpDashboard
