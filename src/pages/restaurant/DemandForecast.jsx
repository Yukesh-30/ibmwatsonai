"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FiCalendar, FiClock, FiUsers, FiCloudRain, FiSun } from "react-icons/fi"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import CustomLineChart from "../../components/charts/LineChart"
import CustomBarChart from "../../components/charts/BarChart"

const RestDemandForecast = () => {
    const [forecastData, setForecastData] = useState([])
    const [itemForecastData, setItemForecastData] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
    const [selectedMeal, setSelectedMeal] = useState("lunch")
    const [weatherForecast, setWeatherForecast] = useState("sunny")
    const [specialEvent, setSpecialEvent] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [forecastGenerated, setForecastGenerated] = useState(false)

    useEffect(() => {
        // Simulate API call for initial data
        const mockForecastData = [
            { name: "Mon", predicted: 120, actual: 125 },
            { name: "Tue", predicted: 150, actual: 145 },
            { name: "Wed", predicted: 130, actual: 135 },
            { name: "Thu", predicted: 140, actual: 138 },
            { name: "Fri", predicted: 180, actual: 175 },
            { name: "Sat", predicted: 200, actual: 210 },
            { name: "Sun", predicted: 170, actual: 165 },
        ]
        setForecastData(mockForecastData)

        const mockItemForecastData = [
            { name: "Rice", predicted: 15, average: 12 },
            { name: "Chicken", predicted: 10, average: 8 },
            { name: "Vegetables", predicted: 8, average: 7 },
            { name: "Noodles", predicted: 12, average: 10 },
            { name: "Desserts", predicted: 6, average: 5 },
        ]
        setItemForecastData(mockItemForecastData)
    }, [])

    const generateForecast = () => {
        setIsLoading(true)

        // Simulate API call to ML model
        setTimeout(() => {
            // Update with new forecast data based on inputs
            const newForecastData = [
                { name: "Mon", predicted: 120 + (weatherForecast === "rainy" ? -10 : 10), actual: 125 },
                { name: "Tue", predicted: 150 + (weatherForecast === "rainy" ? -15 : 15), actual: 145 },
                { name: "Wed", predicted: 130 + (weatherForecast === "rainy" ? -13 : 13), actual: 135 },
                { name: "Thu", predicted: 140 + (weatherForecast === "rainy" ? -14 : 14), actual: 138 },
                { name: "Fri", predicted: 180 + (weatherForecast === "rainy" ? -18 : 18), actual: 175 },
                { name: "Sat", predicted: 200 + (weatherForecast === "rainy" ? -20 : 20), actual: 210 },
                { name: "Sun", predicted: 170 + (weatherForecast === "rainy" ? -17 : 17), actual: 165 },
            ]

            // If there's a special event, increase the prediction
            if (specialEvent) {
                newForecastData.forEach(day => {
                    day.predicted += 30
                })
            }

            setForecastData(newForecastData)

            // Update item forecast based on meal type
            const mealMultiplier = selectedMeal === "dinner" ? 1.2 : selectedMeal === "breakfast" ? 0.8 : 1
            const newItemForecastData = [
                { name: "Rice", predicted: 15 * mealMultiplier, average: 12 },
                { name: "Chicken", predicted: 10 * mealMultiplier, average: 8 },
                { name: "Vegetables", predicted: 8 * mealMultiplier, average: 7 },
                { name: "Noodles", predicted: 12 * mealMultiplier, average: 10 },
                { name: "Desserts", predicted: 6 * mealMultiplier, average: 5 },
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
                <Sidebar role="restaurant" />

                <main className="flex-1 ml-64 p-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-800">AI Demand Forecast</h1>
                        <p className="text-gray-600">Predict customer demand and optimize food preparation</p>
                    </div>

                    {/* Forecast Parameters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="card mb-8"
                    >
                        <h2 className="text-lg font-medium mb-4">Forecast Parameters</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                                <select
                                    className="input"
                                    value={selectedMeal}
                                    onChange={(e) => setSelectedMeal(e.target.value)}
                                >
                                    <option value="breakfast">Breakfast</option>
                                    <option value="lunch">Lunch</option>
                                    <option value="dinner">Dinner</option>
                                </select>
                            </div>

                            <div>
                                <label className="label flex items-center">
                                    <FiCloudRain className="mr-2 text-gray-500" />
                                    Weather Forecast
                                </label>
                                <select
                                    className="input"
                                    value={weatherForecast}
                                    onChange={(e) => setWeatherForecast(e.target.value)}
                                >
                                    <option value="sunny">Sunny</option>
                                    <option value="cloudy">Cloudy</option>
                                    <option value="rainy">Rainy</option>
                                </select>
                            </div>

                            <div>
                                <label className="label flex items-center">
                                    <FiUsers className="mr-2 text-gray-500" />
                                    Special Event
                                </label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="e.g., Festival, Holiday"
                                    value={specialEvent}
                                    onChange={(e) => setSpecialEvent(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                className="btn btn-primary"
                                onClick={generateForecast}
                                disabled={isLoading}
                            >
                                {isLoading ? "Generating..." : "Generate Forecast"}
                            </button>
                        </div>
                    </motion.div>

                    {/* Forecast Results */}
                    {forecastGenerated && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <CustomLineChart
                                    data={forecastData}
                                    title="Weekly Customer Demand Forecast"
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
                                            Based on the {weatherForecast} weather forecast and {specialEvent ? `the ${specialEvent} event` : "current trends"},
                                            we predict a {weatherForecast === "rainy" ? "decrease" : "increase"} in customer traffic for {selectedMeal} on {new Date(selectedDate).toLocaleDateString()}.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <h3 className="font-medium text-gray-700 mb-2">Preparation Recommendations:</h3>
                            <ul className="list-disc pl-5 space-y-2 text-gray-600">
                                <li>Prepare {Math.round(itemForecastData[0].predicted)} kg of rice (vs. average {itemForecastData[0].average} kg)</li>
                                <li>Prepare {Math.round(itemForecastData[1].predicted)} kg of chicken (vs. average {itemForecastData[1].average} kg)</li>
                                <li>Prepare {Math.round(itemForecastData[2].predicted)} kg of vegetables (vs. average {itemForecastData[2].average} kg)</li>
                                <li>Prepare {Math.round(itemForecastData[3].predicted)} kg of noodles (vs. average {itemForecastData[3].average} kg)</li>
                                <li>Prepare {Math.round(itemForecastData[4].predicted)} kg of desserts (vs. average {itemForecastData[4].average} kg)</li>
                            </ul>

                            <h3 className="font-medium text-gray-700 mt-4 mb-2">Wastage Reduction Tips:</h3>
                            <ul className="list-disc pl-5 space-y-2 text-gray-600">
                                <li>Prepare items in smaller batches to adjust based on actual demand</li>
                                <li>Use leftover rice for fried rice dishes the next day</li>
                                <li>Consider offering discounts on remaining items near closing time</li>
                                <li>Partner with food redistribution services for any excess food</li>
                            </ul>
                        </motion.div>
                    )}
                </main>
            </div>
        </div>
    )
}

export default RestDemandForecast
