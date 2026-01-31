"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FiDollarSign, FiTrendingUp, FiTrendingDown, FiCalendar, FiDownload, FiUsers } from "react-icons/fi"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import CustomLineChart from "../../components/charts/LineChart"
import CustomBarChart from "../../components/charts/BarChart"
import CustomPieChart from "../../components/charts/PieChart"

const CorpProfitLoss = () => {
    const [timeRange, setTimeRange] = useState("month")
    const [revenueData, setRevenueData] = useState([])
    const [expenseData, setExpenseData] = useState([])
    const [profitData, setProfitData] = useState([])
    const [categoryData, setCategoryData] = useState([])
    const [departmentData, setDepartmentData] = useState([])
    const [subsidyRate, setSubsidyRate] = useState(50)

    useEffect(() => {
        // Simulate API calls
        generateData(timeRange)
    }, [timeRange])

    const generateData = (timeRange) => {
        // Generate revenue data based on time range
        let revenueData = []
        if (timeRange === "week") {
            revenueData = [
                { name: "Mon", revenue: 45000, expenses: 38000, profit: 7000 },
                { name: "Tue", revenue: 48000, expenses: 39000, profit: 9000 },
                { name: "Wed", revenue: 42000, expenses: 37000, profit: 5000 },
                { name: "Thu", revenue: 44000, expenses: 38500, profit: 5500 },
                { name: "Fri", revenue: 52000, expenses: 42000, profit: 10000 },
                { name: "Sat", revenue: 18000, expenses: 15000, profit: 3000 },
                { name: "Sun", revenue: 15000, expenses: 13000, profit: 2000 },
            ]
        } else if (timeRange === "month") {
            revenueData = [
                { name: "Week 1", revenue: 250000, expenses: 210000, profit: 40000 },
                { name: "Week 2", revenue: 260000, expenses: 215000, profit: 45000 },
                { name: "Week 3", revenue: 270000, expenses: 220000, profit: 50000 },
                { name: "Week 4", revenue: 280000, expenses: 225000, profit: 55000 },
            ]
        } else {
            revenueData = [
                { name: "Jan", revenue: 1050000, expenses: 850000, profit: 200000 },
                { name: "Feb", revenue: 1080000, expenses: 860000, profit: 220000 },
                { name: "Mar", revenue: 1100000, expenses: 870000, profit: 230000 },
                { name: "Apr", revenue: 1120000, expenses: 880000, profit: 240000 },
                { name: "May", revenue: 1150000, expenses: 900000, profit: 250000 },
                { name: "Jun", revenue: 1180000, expenses: 920000, profit: 260000 },
                { name: "Jul", revenue: 1200000, expenses: 930000, profit: 270000 },
                { name: "Aug", revenue: 1220000, expenses: 940000, profit: 280000 },
                { name: "Sep", revenue: 1250000, expenses: 950000, profit: 300000 },
                { name: "Oct", revenue: 1280000, expenses: 970000, profit: 310000 },
                { name: "Nov", revenue: 1300000, expenses: 980000, profit: 320000 },
                { name: "Dec", revenue: 1400000, expenses: 1050000, profit: 350000 },
            ]
        }
        setRevenueData(revenueData)

        // Expense data by category
        const expenseData = [
            { name: "Ingredients", value: 40 },
            { name: "Staff", value: 30 },
            { name: "Equipment", value: 10 },
            { name: "Utilities", value: 12 },
            { name: "Maintenance", value: 8 },
        ]
        setExpenseData(expenseData)

        // Profit data
        setProfitData(revenueData)

        // Revenue by category
        const categoryData = [
            { name: "Main Course", value: 45 },
            { name: "Breakfast", value: 20 },
            { name: "Snacks", value: 15 },
            { name: "Beverages", value: 12 },
            { name: "Desserts", value: 8 },
        ]
        setCategoryData(categoryData)

        // Department data
        const departmentData = [
            { name: "Engineering", value: 35 },
            { name: "Sales", value: 20 },
            { name: "Marketing", value: 15 },
            { name: "Finance", value: 10 },
            { name: "HR", value: 8 },
            { name: "Others", value: 12 },
        ]
        setDepartmentData(departmentData)
    }

    // Calculate summary data
    const calculateSummary = () => {
        const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0)
        const totalExpenses = revenueData.reduce((sum, item) => sum + item.expenses, 0)
        const totalProfit = revenueData.reduce((sum, item) => sum + item.profit, 0)
        const profitMargin = (totalProfit / totalRevenue) * 100
        const subsidyAmount = (totalExpenses * subsidyRate) / 100

        return {
            totalRevenue,
            totalExpenses,
            totalProfit,
            profitMargin: profitMargin.toFixed(1),
            subsidyAmount,
        }
    }

    const summary = calculateSummary()

    const exportReport = () => {
        alert("Exporting financial report...")
        // In a real app, this would generate and download a PDF or Excel report
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex">
                <Sidebar role="corporate" />

                <main className="flex-1 ml-64 p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Corporate Profit & Loss Analysis</h1>
                            <p className="text-gray-600">Track your corporate canteen's financial performance</p>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex items-center">
                                <FiCalendar className="mr-2 text-gray-500" />
                                <select className="input" value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
                                    <option value="week">This Week</option>
                                    <option value="month">This Month</option>
                                    <option value="year">This Year</option>
                                </select>
                            </div>

                            <button className="btn btn-outline flex items-center gap-2" onClick={exportReport}>
                                <FiDownload size={16} />
                                <span>Export Report</span>
                            </button>
                        </div>
                    </div>

                    {/* Subsidy Control */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="card mb-8"
                    >
                        <h2 className="text-lg font-medium mb-4">Corporate Subsidy Control</h2>
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="flex-1">
                                <label htmlFor="subsidyRate" className="label flex items-center">
                                    <FiUsers className="mr-2 text-gray-500" />
                                    Employee Meal Subsidy Rate (%)
                                </label>
                                <input
                                    id="subsidyRate"
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="5"
                                    value={subsidyRate}
                                    onChange={(e) => setSubsidyRate(parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>0%</span>
                                    <span>50%</span>
                                    <span>100%</span>
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg">
                                <p className="text-blue-700 font-medium">Current Subsidy Rate: {subsidyRate}%</p>
                                <p className="text-blue-600 text-sm mt-1">
                                    Subsidy Amount: ₹{(summary.subsidyAmount / 1000).toFixed(1)}K
                                </p>
                                <p className="text-blue-600 text-sm mt-1">
                                    Employee Contribution: ₹{((summary.totalExpenses - summary.subsidyAmount) / 1000).toFixed(1)}K
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="card"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium">Total Revenue</h3>
                                <div className="bg-green-100 p-2 rounded-full">
                                    <FiDollarSign className="text-green-500" size={20} />
                                </div>
                            </div>
                            <div className="text-3xl font-bold mb-2">₹{(summary.totalRevenue / 1000).toFixed(1)}K</div>
                            <div className="flex items-center text-sm">
                                <span className="text-green-500 font-medium">↑ 6% </span>
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
                                <h3 className="text-lg font-medium">Total Expenses</h3>
                                <div className="bg-red-100 p-2 rounded-full">
                                    <FiTrendingDown className="text-red-500" size={20} />
                                </div>
                            </div>
                            <div className="text-3xl font-bold mb-2">₹{(summary.totalExpenses / 1000).toFixed(1)}K</div>
                            <div className="flex items-center text-sm">
                                <span className="text-red-500 font-medium">↑ 4% </span>
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
                                <h3 className="text-lg font-medium">Net Profit</h3>
                                <div className="bg-blue-100 p-2 rounded-full">
                                    <FiTrendingUp className="text-blue-500" size={20} />
                                </div>
                            </div>
                            <div className="text-3xl font-bold mb-2">₹{(summary.totalProfit / 1000).toFixed(1)}K</div>
                            <div className="flex items-center text-sm">
                                <span className="text-green-500 font-medium">↑ 10% </span>
                                <span className="text-gray-500 ml-1">vs. last {timeRange}</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="card"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium">Profit Margin</h3>
                                <div className="bg-purple-100 p-2 rounded-full">
                                    <FiDollarSign className="text-purple-500" size={20} />
                                </div>
                            </div>
                            <div className="text-3xl font-bold mb-2">{summary.profitMargin}%</div>
                            <div className="flex items-center text-sm">
                                <span className="text-green-500 font-medium">↑ 2.0% </span>
                                <span className="text-gray-500 ml-1">vs. last {timeRange}</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                            <CustomLineChart
                                data={profitData}
                                title="Revenue vs Expenses"
                                dataKeys={["revenue", "expenses"]}
                                colors={["#22c55e", "#ef4444"]}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <CustomBarChart data={profitData} title="Profit Trend" dataKeys={["profit"]} colors={["#3b82f6"]} />
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <CustomPieChart
                                data={expenseData}
                                title="Expenses by Category (%)"
                                dataKey="value"
                                nameKey="name"
                                colors={["#ef4444", "#f59e0b", "#3b82f6", "#8b5cf6", "#22c55e"]}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <CustomPieChart
                                data={categoryData}
                                title="Revenue by Meal Type (%)"
                                dataKey="value"
                                nameKey="name"
                                colors={["#22c55e", "#3b82f6", "#f59e0b", "#8b5cf6", "#94a3b8"]}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <CustomPieChart
                                data={departmentData}
                                title="Usage by Department (%)"
                                dataKey="value"
                                nameKey="name"
                                colors={["#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#22c55e", "#94a3b8"]}
                            />
                        </motion.div>
                    </div>

                    {/* Financial Insights */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="card mt-8"
                    >
                        <h2 className="text-lg font-medium mb-4">Corporate Financial Insights</h2>
                        <div className="space-y-4">
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <h3 className="font-medium text-green-700">Revenue Analysis</h3>
                                <p className="text-green-600 mt-1">
                                    Your revenue has increased by 6% compared to the last {timeRange}. Main course items are your biggest
                                    revenue driver at 45%, followed by breakfast items at 20%.
                                </p>
                            </div>

                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <h3 className="font-medium text-red-700">Expense Analysis</h3>
                                <p className="text-red-600 mt-1">
                                    Ingredients account for 40% of your expenses. Consider negotiating bulk contracts with suppliers to reduce costs.
                                    Staff costs at 30% are higher than industry average - evaluate staffing efficiency.
                                </p>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h3 className="font-medium text-blue-700">Subsidy Optimization</h3>
                                <p className="text-blue-600 mt-1">
                                    Your current subsidy rate of {subsidyRate}% is {subsidyRate > 60 ? "higher" : "lower"} than the industry average of 60%.
                                    {subsidyRate > 60
                                        ? " Consider reducing the subsidy rate gradually to improve profitability while maintaining employee satisfaction."
                                        : " This helps maintain profitability while still providing a valuable employee benefit."}
                                </p>
                            </div>

                            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                                <h3 className="font-medium text-purple-700">Department Usage</h3>
                                <p className="text-purple-600 mt-1">
                                    The Engineering department accounts for 35% of canteen usage. Consider tailoring menu options to their preferences
                                    to increase satisfaction and potentially reduce wastage.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </main>
            </div>
        </div>
    )
}

export default CorpProfitLoss
