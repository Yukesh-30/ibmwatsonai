"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FiCalendar, FiClock, FiUsers, FiSun, FiCoffee } from "react-icons/fi"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import CustomLineChart from "../../components/charts/LineChart"
import CustomBarChart from "../../components/charts/BarChart"

const CorpDemandForecast = () => {
    const [forecastData, setForecastData] = useState([])
    const [itemForecastData, setItemForecastData] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
    const [selectedMeal, setSelectedMeal] = useState("lunch")
    const [employeeCount, setEmployeeCount] = useState(450)
    const [specialEvent, setSpecialEvent] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [forecastGenerated, setForecastGenerated] = useState(false)
    const [weeklyTrend, setWeeklyTrend] = useState([])

    useEffect(() => {
        // Simulate API call for initial data
        const mockForecastData = [
            { name: "Mon", predicted: 380, actual: 390 },
            { name: "Tue", predicted: 420, actual: 410 },
            { name: "Wed", predicted: 400, actual: 405 },
            { name: "Thu", predicted: 410, actual: 415 },
            { name: "Fri", predicted: 430, actual: 425 },
            { name: "Sat", predicted: 150, actual: 145 },
            { name: "Sun", predicted: 120, actual: 125 },
        ]
        setForecastData(mockForecastData)

        const mockItemForecastData = [
            { name: "Rice", predicted: 45, average: 40 },
            { name: "Chicken", predicted: 35, average: 30 },
            { name: "Vegetables", predicted: 25, average: 22 },
            { name: "Noodles", predicted: 30, average: 28 },
            { name: "Desserts", predicted: 20, average: 18 },
        ]
        setItemForecastData(mockItemForecastData)

        const mockWeeklyTrend = [
            { name: "Week 1", breakfast: 280, lunch: 420, dinner: 180 },
            { name: "Week 2", breakfast: 290, lunch: 430, dinner: 190 },
            { name: "Week 3", breakfast: 300, lunch: 440, dinner: 200 },
            { name: "Week 4", breakfast: 310, lunch: 450, dinner: 210 },
        ]
        setWeeklyTrend(mockWeeklyTrend)
    }, [])

    const generateForecast = () => {
        setIsLoading(true)

        // Simulate API call to ML model
        setTimeout(() => {
            // Update with new forecast data based on inputs
            const mealMultiplier = selectedMeal === "dinner" ? 0.4 : selectedMeal === "breakfast" ? 0.7 : 1
            const baseCount = employeeCount * mealMultiplier

            const newForecastData = [
                { name: "Mon", predicted: Math.round(baseCount * 0.85), actual: 390 },
                { name: "Tue", predicted: Math.round(baseCount * 0.95), actual: 410 },
                { name: "Wed", predicted: Math.round(baseCount * 0.9), actual: 405 },
                { name: "Thu", predicted: Math.round(baseCount * 0.92), actual: 415 },
                { name: "Fri", predicted: Math.round(baseCount * 0.97), actual: 425 },
                { name: "Sat", predicted: Math.round(baseCount * 0.3), actual: 145 },
                { name: "Sun", predicted: Math.round(baseCount * 0.25), actual: 125 },
            ]

            // If there's a special event, increase the prediction
            if (specialEvent) {
                newForecastData.forEach((day) => {
                    day.predicted = Math.round(day.predicted * 1.2)
                })
            }

            setForecastData(newForecastData)

            // Update item forecast based on meal type
            const newItemForecastData = [
                { name: "Rice", predicted: Math.round(45 * (baseCount / 420)), average: 40 },
                { name: "Chicken", predicted: Math.round(35 * (baseCount / 420)), average: 30 },
                { name: "Vegetables", predicted: Math.round(25 * (baseCount / 420)), average: 22 },
                { name: "Noodles", predicted: Math.round(30 * (baseCount / 420)), average: 28 },
                { name: "Desserts", predicted: Math.round(20 * (baseCount / 420)), average: 18 },
            ]

            setItemForecastData(newItemForecastData)
            setIsLoading(false)
            setForecastGenerated(true)
        }, 2000)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex">
                <Sidebar role="corporate" />

                <main className="flex-1 ml-64 p-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-800">Corporate Demand Forecast</h1>
                        <p className="text-gray-600">Predict employee meal demand and optimize food preparation</p>
                    </div>

                    {/* Weekly Trend Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <CustomLineChart
                            data={weeklyTrend}
                            title="Monthly Meal Trend by Type"
                            dataKeys={["breakfast", "lunch", "dinner"]}
                            colors={["#f59e0b", "#3b82f6", "#8b5cf6"]}
                        />
                    </motion.div>

                    {/* Forecast Parameters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="card mb-8"
                    >
                        <h2 className="text-lg font-medium mb-4">Forecast Parameters</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div>
                                <label className="label flex items-center">
                                    <FiCalendar className="mr-2 text-gray-500" />
                                    Date
                                </label>
                                <input
                                    type="date"
                                    className="input"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="label flex items-center">
                                    <FiClock className="mr-2 text-gray-500" />
                                    Meal Type
                                </label>
                                <select className="input" value={selectedMeal} onChange={(e) => setSelectedMeal(e.target.value)}>
                                    <option value="breakfast">Breakfast</option>
                                    <option value="lunch">Lunch</option>
                                    <option value="dinner">Dinner</option>
                                </select>
                            </div>

                            <div>
                                <label className="label flex items-center">
                                    <FiUsers className="mr-2 text-gray-500" />
                                    Expected Employees
                                </label>
                                <input
                                    type="number"
                                    className="input"
                                    value={employeeCount}
                                    onChange={(e) => setEmployeeCount(parseInt(e.target.value))}
                                    min="1"
                                />
                            </div>

                            <div>
                                <label className="label flex items-center">
                                    <FiCoffee className="mr-2 text-gray-500" />
                                    Special Event
                                </label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="e.g., Company Meeting, Product Launch"
                                    value={specialEvent}
                                    onChange={(e) => setSpecialEvent(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button className="btn btn-primary" onClick={generateForecast} disabled={isLoading}>
                                {isLoading ? "Generating..." : "Generate Forecast"}
                            </button>
                        </div>
                    </motion.div>

                    {/* Forecast Results */}
                    {forecastGenerated && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                                <CustomLineChart
                                    data={forecastData}
                                    title="Weekly Employee Meal Demand Forecast"
                                    dataKeys={["predicted", "actual"]}
                                    colors={["#3b82f6", "#22c55e"]}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <CustomBarChart
                                    data={itemForecastData}
                                    title="Food Item Demand Forecast (kg)"
                                    dataKeys={["predicted", "average"]}
                                    colors={["#3b82f6", "#94a3b8"]}
                                />
                            </motion.div>
                        </div>
                    )}

                    {/* Recommendations */}
                    {forecastGenerated && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="card"
                        >
                            <h2 className="text-lg font-medium mb-4">AI Recommendations</h2>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                <div className="flex items-start">
                                    <FiSun className="text-blue-500 mt-1 mr-3" size={20} />
                                    <div>
                                        <h3 className="font-medium text-blue-700">Demand Insights</h3>
                                        <p className="text-blue-600 mt-1">
                                            Based on historical data and {specialEvent ? `the ${specialEvent} event` : "current trends"}, we predict approximately {forecastData[0]?.predicted || "N/A"} employees will attend {selectedMeal} on{" "}
                                            {new Date(selectedDate).toLocaleDateString()}.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <h3 className="font-medium text-gray-700 mb-2">Preparation Recommendations:</h3>
                            <ul className="list-disc pl-5 space-y-2 text-gray-600">
                                <li>
                                    Prepare {Math.round(itemForecastData[0]?.predicted || 0)} kg of rice (vs. average{" "}
                                    {itemForecastData[0]?.average || 0} kg)
                                </li>
                                <li>
                                    Prepare {Math.round(itemForecastData[1]?.predicted || 0)} kg of chicken (vs. average{" "}
                                    {itemForecastData[1]?.average || 0} kg)
                                </li>
                                <li>
                                    Prepare {Math.round(itemForecastData[2]?.predicted || 0)} kg of vegetables (vs. average{" "}
                                    {itemForecastData[2]?.average || 0} kg)
                                </li>
                                <li>
                                    Prepare {Math.round(itemForecastData[3]?.predicted || 0)} kg of noodles (vs. average{" "}
                                    {itemForecastData[3]?.average || 0} kg)
                                </li>
                                <li>
                                    Prepare {Math.round(itemForecastData[4]?.predicted || 0)} kg of desserts (vs. average{" "}
                                    {itemForecastData[4]?.average || 0} kg)
                                </li>
                            </ul>

                            <h3 className="font-medium text-gray-700 mt-4 mb-2">Corporate-Specific Tips:</h3>
                            <ul className="list-disc pl-5 space-y-2 text-gray-600">
                                <li>Consider setting up a pre-order system for employees to reduce wastage</li>
                                <li>For {specialEvent ? "special events" : "busy days"}, prepare food in batches to maintain freshness</li>
                                <li>Coordinate with HR to get accurate headcount for company-wide events</li>
                                <li>Offer takeaway options for employees working late to reduce evening wastage</li>
                                <li>Consider dietary restrictions and preferences in your planning</li>
                            </ul>
                        </motion.div>
                    )}
                </main>
            </div>
        </div>
    )
}

export default CorpDemandForecast
