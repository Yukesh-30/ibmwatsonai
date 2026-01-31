"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FiTrendingDown, FiPieChart, FiBarChart2, FiCalendar, FiFilter } from "react-icons/fi"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import CustomLineChart from "../../components/charts/LineChart"
import CustomBarChart from "../../components/charts/BarChart"
import CustomPieChart from "../../components/charts/PieChart"

const RestFoodFall = () => {
    const [timeRange, setTimeRange] = useState("week")
    const [categoryFilter, setCategoryFilter] = useState("all")
    const [trendData, setTrendData] = useState([])
    const [categoryData, setCategoryData] = useState([])
    const [reasonData, setReasonData] = useState([])
    const [topWastedItems, setTopWastedItems] = useState([])

    useEffect(() => {
        // Simulate API calls
        generateData(timeRange, categoryFilter)
    }, [timeRange, categoryFilter])

    const generateData = (timeRange) => {
        // Generate trend data based on time range
        let trendData = []
        if (timeRange === "week") {
            trendData = [
                { name: "Mon", wastage: 12, target: 10 },
                { name: "Tue", wastage: 15, target: 10 },
                { name: "Wed", wastage: 8, target: 10 },
                { name: "Thu", wastage: 10, target: 10 },
                { name: "Fri", wastage: 18, target: 10 },
                { name: "Sat", wastage: 20, target: 10 },
                { name: "Sun", wastage: 14, target: 10 },
            ]
        } else if (timeRange === "month") {
            trendData = [
                { name: "Week 1", wastage: 65, target: 50 },
                { name: "Week 2", wastage: 58, target: 50 },
                { name: "Week 3", wastage: 45, target: 50 },
                { name: "Week 4", wastage: 40, target: 50 },
            ]
        } else {
            trendData = [
                { name: "Jan", wastage: 200, target: 180 },
                { name: "Feb", wastage: 180, target: 180 },
                { name: "Mar", wastage: 170, target: 180 },
                { name: "Apr", wastage: 190, target: 180 },
                { name: "May", wastage: 160, target: 180 },
                { name: "Jun", wastage: 150, target: 180 },
                { name: "Jul", wastage: 140, target: 180 },
                { name: "Aug", wastage: 130, target: 180 },
                { name: "Sep", wastage: 120, target: 180 },
                { name: "Oct", wastage: 110, target: 180 },
                { name: "Nov", wastage: 100, target: 180 },
                { name: "Dec", wastage: 90, target: 180 },
            ]
        }
        setTrendData(trendData)

        // Category data
        const categoryData = [
            { name: "Rice", value: 25 },
            { name: "Meat", value: 35 },
            { name: "Vegetables", value: 20 },
            { name: "Desserts", value: 10 },
            { name: "Others", value: 10 },
        ]
        setCategoryData(categoryData)

        // Reason data
        const reasonData = [
            { name: "Overproduction", value: 40 },
            { name: "Spoilage", value: 25 },
            { name: "Customer Returns", value: 15 },
            { name: "Preparation Errors", value: 12 },
            { name: "Others", value: 8 },
        ]
        setReasonData(reasonData)

        // Top wasted items
        const topWastedItems = [
            { name: "Fried Rice", wastage: 8.5 },
            { name: "Chicken Curry", wastage: 7.2 },
            { name: "Mixed Vegetables", wastage: 6.8 },
            { name: "Noodles", wastage: 5.5 },
            { name: "Desserts", wastage: 4.2 },
        ]
        setTopWastedItems(topWastedItems)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex">
                <Sidebar role="restaurant" />

                <main className="flex-1 ml-64 p-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-800">Food Fall Analysis</h1>
                        <p className="text-gray-600">Track and analyze food wastage patterns to optimize operations</p>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <div className="flex items-center">
                            <FiCalendar className="mr-2 text-gray-500" />
                            <select className="input" value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
                                <option value="week">This Week</option>
                                <option value="month">This Month</option>
                                <option value="year">This Year</option>
                            </select>
                        </div>

                        <div className="flex items-center">
                            <FiFilter className="mr-2 text-gray-500" />
                            <select className="input" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                                <option value="all">All Categories</option>
                                <option value="rice">Rice</option>
                                <option value="meat">Meat</option>
                                <option value="vegetables">Vegetables</option>
                                <option value="desserts">Desserts</option>
                            </select>
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
                                <h3 className="text-lg font-medium">Total Wastage</h3>
                                <div className="bg-red-100 p-2 rounded-full">
                                    <FiTrendingDown className="text-red-500" size={20} />
                                </div>
                            </div>
                            <div className="text-3xl font-bold mb-2">97.2 kg</div>
                            <div className="flex items-center text-sm">
                                <span className="text-green-500 font-medium">↓ 12% </span>
                                <span className="text-gray-500 ml-1">vs. last {timeRange}</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="card"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium">Cost Impact</h3>
                                <div className="bg-yellow-100 p-2 rounded-full">
                                    <FiBarChart2 className="text-yellow-500" size={20} />
                                </div>
                            </div>
                            <div className="text-3xl font-bold mb-2">₹14,580</div>
                            <div className="flex items-center text-sm">
                                <span className="text-green-500 font-medium">↓ 8% </span>
                                <span className="text-gray-500 ml-1">vs. last {timeRange}</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="card"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium">Environmental Impact</h3>
                                <div className="bg-green-100 p-2 rounded-full">
                                    <FiPieChart className="text-green-500" size={20} />
                                </div>
                            </div>
                            <div className="text-3xl font-bold mb-2">184.7 kg CO₂</div>
                            <div className="flex items-center text-sm">
                                <span className="text-green-500 font-medium">↓ 10% </span>
                                <span className="text-gray-500 ml-1">vs. last {timeRange}</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                            <CustomLineChart
                                data={trendData}
                                title="Food Wastage Trend"
                                dataKeys={["wastage", "target"]}
                                colors={["#ef4444", "#94a3b8"]}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <CustomBarChart
                                data={topWastedItems}
                                title="Top Wasted Items (kg)"
                                dataKeys={["wastage"]}
                                colors={["#ef4444"]}
                            />
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <CustomPieChart
                                data={categoryData}
                                title="Wastage by Category (%)"
                                dataKey="value"
                                nameKey="name"
                                colors={["#22c55e", "#ef4444", "#3b82f6", "#f59e0b", "#8b5cf6"]}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <CustomPieChart
                                data={reasonData}
                                title="Wastage by Reason (%)"
                                dataKey="value"
                                nameKey="name"
                                colors={["#ef4444", "#f59e0b", "#3b82f6", "#8b5cf6", "#22c55e"]}
                            />
                        </motion.div>
                    </div>

                    {/* Recommendations */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="card mt-8"
                    >
                        <h2 className="text-lg font-medium mb-4">AI Recommendations</h2>
                        <div className="space-y-4">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <h3 className="font-medium text-red-700">Overproduction Issue</h3>
                                <p className="text-red-600 mt-1">
                                    Overproduction accounts for 40% of your food wastage. Consider reducing batch sizes for Fried Rice and
                                    Chicken Curry.
                                </p>
                            </div>

                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <h3 className="font-medium text-yellow-700">Inventory Management</h3>
                                <p className="text-yellow-600 mt-1">
                                    Spoilage accounts for 25% of wastage. Implement a stricter FIFO (First In, First Out) system for
                                    vegetable storage.
                                </p>
                            </div>

                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <h3 className="font-medium text-green-700">Portion Control</h3>
                                <p className="text-green-600 mt-1">
                                    Customer returns suggest portion sizes may be too large. Consider offering smaller portion options or
                                    adjusting standard serving sizes.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </main>
            </div>
        </div>
    )
}

export default RestFoodFall
