"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FiTrendingDown, FiPieChart, FiBarChart2, FiCalendar, FiFilter, FiUsers } from "react-icons/fi"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import CustomLineChart from "../../components/charts/LineChart"
import CustomBarChart from "../../components/charts/BarChart"
import CustomPieChart from "../../components/charts/PieChart"

const CorpFoodFall = () => {
    const [timeRange, setTimeRange] = useState("week")
    const [categoryFilter, setCategoryFilter] = useState("all")
    const [mealTypeFilter, setMealTypeFilter] = useState("all")
    const [trendData, setTrendData] = useState([])
    const [categoryData, setCategoryData] = useState([])
    const [reasonData, setReasonData] = useState([])
    const [mealTypeData, setMealTypeData] = useState([])
    const [topWastedItems, setTopWastedItems] = useState([])

    useEffect(() => {
        // Simulate API calls
        generateData(timeRange, categoryFilter, mealTypeFilter)
    }, [timeRange, categoryFilter, mealTypeFilter])

    const generateData = (timeRange, categoryFilter, mealTypeFilter) => {
        // Generate trend data based on time range
        let trendData = []
        if (timeRange === "week") {
            trendData = [
                { name: "Mon", wastage: 18, target: 15 },
                { name: "Tue", wastage: 22, target: 15 },
                { name: "Wed", wastage: 15, target: 15 },
                { name: "Thu", wastage: 12, target: 15 },
                { name: "Fri", wastage: 25, target: 15 },
                { name: "Sat", wastage: 10, target: 15 },
                { name: "Sun", wastage: 8, target: 15 },
            ]
        } else if (timeRange === "month") {
            trendData = [
                { name: "Week 1", wastage: 95, target: 80 },
                { name: "Week 2", wastage: 88, target: 80 },
                { name: "Week 3", wastage: 75, target: 80 },
                { name: "Week 4", wastage: 70, target: 80 },
            ]
        } else {
            trendData = [
                { name: "Jan", wastage: 350, target: 300 },
                { name: "Feb", wastage: 320, target: 300 },
                { name: "Mar", wastage: 310, target: 300 },
                { name: "Apr", wastage: 330, target: 300 },
                { name: "May", wastage: 290, target: 300 },
                { name: "Jun", wastage: 280, target: 300 },
                { name: "Jul", wastage: 270, target: 300 },
                { name: "Aug", wastage: 260, target: 300 },
                { name: "Sep", wastage: 250, target: 300 },
                { name: "Oct", wastage: 240, target: 300 },
                { name: "Nov", wastage: 230, target: 300 },
                { name: "Dec", wastage: 220, target: 300 },
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
            { name: "Overproduction", value: 45 },
            { name: "Spoilage", value: 20 },
            { name: "Employee No-shows", value: 25 },
            { name: "Preparation Errors", value: 5 },
            { name: "Others", value: 5 },
        ]
        setReasonData(reasonData)

        // Meal type data
        const mealTypeData = [
            { name: "Breakfast", value: 20 },
            { name: "Lunch", value: 55 },
            { name: "Dinner", value: 15 },
            { name: "Snacks", value: 10 },
        ]
        setMealTypeData(mealTypeData)

        // Top wasted items
        const topWastedItems = [
            { name: "Fried Rice", wastage: 12.5 },
            { name: "Chicken Curry", wastage: 10.2 },
            { name: "Mixed Vegetables", wastage: 8.8 },
            { name: "Noodles", wastage: 7.5 },
            { name: "Desserts", wastage: 6.2 },
        ]
        setTopWastedItems(topWastedItems)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex">
                <Sidebar role="corporate" />

                <main className="flex-1 ml-64 p-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-800">Corporate Food Fall Analysis</h1>
                        <p className="text-gray-600">Track and analyze food wastage patterns in your corporate canteen</p>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-8 flex-wrap">
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

                        <div className="flex items-center">
                            <FiUsers className="mr-2 text-gray-500" />
                            <select className="input" value={mealTypeFilter} onChange={(e) => setMealTypeFilter(e.target.value)}>
                                <option value="all">All Meal Types</option>
                                <option value="breakfast">Breakfast</option>
                                <option value="lunch">Lunch</option>
                                <option value="dinner">Dinner</option>
                                <option value="snacks">Snacks</option>
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
                            <div className="text-3xl font-bold mb-2">110.2 kg</div>
                            <div className="flex items-center text-sm">
                                <span className="text-green-500 font-medium">↓ 8% </span>
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
                            <div className="text-3xl font-bold mb-2">₹22,040</div>
                            <div className="flex items-center text-sm">
                                <span className="text-green-500 font-medium">↓ 6% </span>
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
                            <div className="text-3xl font-bold mb-2">209.4 kg CO₂</div>
                            <div className="flex items-center text-sm">
                                <span className="text-green-500 font-medium">↓ 8% </span>
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

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
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

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <CustomPieChart
                                data={mealTypeData}
                                title="Wastage by Meal Type (%)"
                                dataKey="value"
                                nameKey="name"
                                colors={["#f59e0b", "#3b82f6", "#8b5cf6", "#22c55e"]}
                            />
                        </motion.div>
                    </div>

                    {/* Recommendations */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="card"
                    >
                        <h2 className="text-lg font-medium mb-4">AI Recommendations for Corporate Canteen</h2>
                        <div className="space-y-4">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <h3 className="font-medium text-red-700">Employee No-shows Issue</h3>
                                <p className="text-red-600 mt-1">
                                    Employee no-shows account for 25% of your food wastage. Consider implementing a meal pre-booking system to better predict attendance.
                                </p>
                            </div>

                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <h3 className="font-medium text-yellow-700">Lunch Overproduction</h3>
                                <p className="text-yellow-600 mt-1">
                                    Lunch accounts for 55% of wastage. Consider staggering lunch times by department to better manage production flow and reduce batch sizes.
                                </p>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h3 className="font-medium text-blue-700">Corporate-Specific Solutions</h3>
                                <p className="text-blue-600 mt-1">
                                    Implement a digital meal booking system integrated with your company calendar to account for meetings, work-from-home days, and business trips.
                                </p>
                            </div>

                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <h3 className="font-medium text-green-700">Employee Engagement</h3>
                                <p className="text-green-600 mt-1">
                                    Launch an employee awareness campaign about food wastage. Consider displaying daily wastage metrics in the canteen to encourage mindful consumption.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </main>
            </div>
        </div>
    )
}

export default CorpFoodFall
