"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FiCalendar, FiUsers, FiCloud, FiSun, FiTrendingUp, FiBarChart, FiChevronDown } from "react-icons/fi"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import CustomLineChart from "../../components/charts/LineChart"
import CustomBarChart from "../../components/charts/BarChart"

const GovDemandForecast = () => {
  const [fromDate, setFromDate] = useState("2023-01-01")
  const [toDate, setToDate] = useState("2023-12-31")
  const [eventType, setEventType] = useState("")
  const [expectedAttendees, setExpectedAttendees] = useState("")
  const [weatherCondition, setWeatherCondition] = useState("")
  const [activeView, setActiveView] = useState("yearly")
  const [selectedWeek, setSelectedWeek] = useState("1")

  // Available weeks for selection
  const availableWeeks = [
    { id: "1", label: "Week 1 (Jan 1-7)" },
    { id: "2", label: "Week 2 (Jan 8-14)" },
    { id: "3", label: "Week 3 (Jan 15-21)" },
    { id: "4", label: "Week 4 (Jan 22-28)" },
    { id: "5", label: "Week 5 (Jan 29-Feb 4)" },
    { id: "6", label: "Week 6 (Feb 5-11)" },
    { id: "7", label: "Week 7 (Feb 12-18)" },
    { id: "8", label: "Week 8 (Feb 19-25)" },
  ]

  // Chart data based on selected date range and view
  const [yearlyTrendData, setYearlyTrendData] = useState([])
  const [weeklyTrendData, setWeeklyTrendData] = useState([])
  const [overallTrendData, setOverallTrendData] = useState([])
  const [forecastData, setForecastData] = useState([])

  useEffect(() => {
    generateForecastData()
  }, [fromDate, toDate, activeView, selectedWeek])

  const generateForecastData = () => {
    // Generate data based on date range and view type
    const startDate = new Date(fromDate)
    const endDate = new Date(toDate)

    // Yearly trend data
    const yearlyData = [
      { name: "Jan", predicted: 1200, actual: 1180, demand: 1250 },
      { name: "Feb", predicted: 1300, actual: 1250, demand: 1320 },
      { name: "Mar", predicted: 1100, actual: 1150, demand: 1180 },
      { name: "Apr", predicted: 1400, actual: 1380, demand: 1420 },
      { name: "May", predicted: 1500, actual: 1520, demand: 1480 },
      { name: "Jun", predicted: 1600, actual: 1550, demand: 1580 },
      { name: "Jul", predicted: 1350, actual: 1320, demand: 1370 },
      { name: "Aug", predicted: 1450, actual: 1430, demand: 1460 },
      { name: "Sep", predicted: 1550, actual: 1580, demand: 1520 },
      { name: "Oct", predicted: 1650, actual: 1620, demand: 1680 },
      { name: "Nov", predicted: 1750, actual: 1730, demand: 1770 },
      { name: "Dec", predicted: 1850, actual: 1820, demand: 1880 },
    ]
    setYearlyTrendData(yearlyData)

    // Generate weekly data based on selected week
    // Each week has data for all 7 days
    const weeklyDataSets = {
      1: [
        { name: "Monday", predicted: 320, actual: 310, demand: 330 },
        { name: "Tuesday", predicted: 340, actual: 335, demand: 345 },
        { name: "Wednesday", predicted: 380, actual: 375, demand: 385 },
        { name: "Thursday", predicted: 360, actual: 355, demand: 365 },
        { name: "Friday", predicted: 420, actual: 415, demand: 425 },
        { name: "Saturday", predicted: 450, actual: 445, demand: 455 },
        { name: "Sunday", predicted: 380, actual: 375, demand: 385 },
      ],
      2: [
        { name: "Monday", predicted: 330, actual: 325, demand: 335 },
        { name: "Tuesday", predicted: 350, actual: 345, demand: 355 },
        { name: "Wednesday", predicted: 390, actual: 385, demand: 395 },
        { name: "Thursday", predicted: 370, actual: 365, demand: 375 },
        { name: "Friday", predicted: 430, actual: 425, demand: 435 },
        { name: "Saturday", predicted: 460, actual: 455, demand: 465 },
        { name: "Sunday", predicted: 390, actual: 385, demand: 395 },
      ],
      3: [
        { name: "Monday", predicted: 310, actual: 305, demand: 315 },
        { name: "Tuesday", predicted: 330, actual: 325, demand: 335 },
        { name: "Wednesday", predicted: 370, actual: 365, demand: 375 },
        { name: "Thursday", predicted: 350, actual: 345, demand: 355 },
        { name: "Friday", predicted: 410, actual: 405, demand: 415 },
        { name: "Saturday", predicted: 440, actual: 435, demand: 445 },
        { name: "Sunday", predicted: 370, actual: 365, demand: 375 },
      ],
      4: [
        { name: "Monday", predicted: 340, actual: 335, demand: 345 },
        { name: "Tuesday", predicted: 360, actual: 355, demand: 365 },
        { name: "Wednesday", predicted: 400, actual: 395, demand: 405 },
        { name: "Thursday", predicted: 380, actual: 375, demand: 385 },
        { name: "Friday", predicted: 440, actual: 435, demand: 445 },
        { name: "Saturday", predicted: 470, actual: 465, demand: 475 },
        { name: "Sunday", predicted: 400, actual: 395, demand: 405 },
      ],
      5: [
        { name: "Monday", predicted: 350, actual: 345, demand: 355 },
        { name: "Tuesday", predicted: 370, actual: 365, demand: 375 },
        { name: "Wednesday", predicted: 410, actual: 405, demand: 415 },
        { name: "Thursday", predicted: 390, actual: 385, demand: 395 },
        { name: "Friday", predicted: 450, actual: 445, demand: 455 },
        { name: "Saturday", predicted: 480, actual: 475, demand: 485 },
        { name: "Sunday", predicted: 410, actual: 405, demand: 415 },
      ],
      6: [
        { name: "Monday", predicted: 330, actual: 325, demand: 335 },
        { name: "Tuesday", predicted: 350, actual: 345, demand: 355 },
        { name: "Wednesday", predicted: 390, actual: 385, demand: 395 },
        { name: "Thursday", predicted: 370, actual: 365, demand: 375 },
        { name: "Friday", predicted: 430, actual: 425, demand: 435 },
        { name: "Saturday", predicted: 460, actual: 455, demand: 465 },
        { name: "Sunday", predicted: 390, actual: 385, demand: 395 },
      ],
      7: [
        { name: "Monday", predicted: 320, actual: 315, demand: 325 },
        { name: "Tuesday", predicted: 340, actual: 335, demand: 345 },
        { name: "Wednesday", predicted: 380, actual: 375, demand: 385 },
        { name: "Thursday", predicted: 360, actual: 355, demand: 365 },
        { name: "Friday", predicted: 420, actual: 415, demand: 425 },
        { name: "Saturday", predicted: 450, actual: 445, demand: 455 },
        { name: "Sunday", predicted: 380, actual: 375, demand: 385 },
      ],
      8: [
        { name: "Monday", predicted: 360, actual: 355, demand: 365 },
        { name: "Tuesday", predicted: 380, actual: 375, demand: 385 },
        { name: "Wednesday", predicted: 420, actual: 415, demand: 425 },
        { name: "Thursday", predicted: 400, actual: 395, demand: 405 },
        { name: "Friday", predicted: 460, actual: 455, demand: 465 },
        { name: "Saturday", predicted: 490, actual: 485, demand: 495 },
        { name: "Sunday", predicted: 420, actual: 415, demand: 425 },
      ],
    }

    // Set weekly data based on selected week
    setWeeklyTrendData(weeklyDataSets[selectedWeek] || weeklyDataSets["1"])

    // Overall trend data (quarterly)
    const overallData = [
      { name: "Q1 2023", predicted: 3600, actual: 3580, demand: 3750 },
      { name: "Q2 2023", predicted: 4500, actual: 4450, demand: 4480 },
      { name: "Q3 2023", predicted: 4350, actual: 4330, demand: 4350 },
      { name: "Q4 2023", predicted: 5250, actual: 5170, demand: 5330 },
    ]
    setOverallTrendData(overallData)

    // Current forecast data
    const currentForecast = [
      { name: "Breakfast", predicted: 350, lastWeek: 320 },
      { name: "Lunch", predicted: 580, lastWeek: 520 },
      { name: "Dinner", predicted: 420, lastWeek: 380 },
    ]
    setForecastData(currentForecast)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    generateForecastData()
    alert("Forecast updated with new parameters")
  }

  const getCurrentData = () => {
    switch (activeView) {
      case "yearly":
        return yearlyTrendData
      case "weekly":
        return weeklyTrendData
      case "overall":
        return overallTrendData
      default:
        return yearlyTrendData
    }
  }

  const getViewTitle = () => {
    switch (activeView) {
      case "yearly":
        return "Yearly Trend Analysis"
      case "weekly": {
        const selectedWeekLabel = availableWeeks.find((week) => week.id === selectedWeek)?.label || "Week 1"
        return `Weekly Trend Analysis - ${selectedWeekLabel}`
      }
      case "overall":
        return "Overall Trend Analysis (Quarterly)"
      default:
        return "Trend Analysis"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar role="government" />

        <main className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">AI Demand Forecast</h1>
            <p className="text-gray-600">Predict food demand based on various factors and date ranges</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="card lg:col-span-1"
            >
              <h3 className="text-lg font-medium mb-4">Input Parameters</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="fromDate" className="label">
                    From Date
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiCalendar className="text-gray-400" />
                    </div>
                    <input
                      id="fromDate"
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="input pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="toDate" className="label">
                    To Date
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiCalendar className="text-gray-400" />
                    </div>
                    <input
                      id="toDate"
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="input pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="eventType" className="label">
                    Event Type
                  </label>
                  <select
                    id="eventType"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="input"
                    required
                  >
                    <option value="">Select event type</option>
                    <option value="normal">Normal Day</option>
                    <option value="festival">Festival</option>
                    <option value="holiday">Public Holiday</option>
                    <option value="special">Special Event</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="attendees" className="label">
                    Expected Attendees
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUsers className="text-gray-400" />
                    </div>
                    <input
                      id="attendees"
                      type="number"
                      value={expectedAttendees}
                      onChange={(e) => setExpectedAttendees(e.target.value)}
                      className="input pl-10"
                      placeholder="Number of expected attendees"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="weather" className="label">
                    Weather Condition
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => setWeatherCondition("sunny")}
                      className={`p-3 rounded-lg border flex flex-col items-center ${
                        weatherCondition === "sunny"
                          ? "bg-yellow-50 border-yellow-500 text-yellow-700"
                          : "border-gray-300 text-gray-700"
                      }`}
                    >
                      <FiSun />
                      <span className="text-xs mt-1">Sunny</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setWeatherCondition("cloudy")}
                      className={`p-3 rounded-lg border flex flex-col items-center ${
                        weatherCondition === "cloudy"
                          ? "bg-gray-100 border-gray-500 text-gray-700"
                          : "border-gray-300 text-gray-700"
                      }`}
                    >
                      <FiCloud />
                      <span className="text-xs mt-1">Cloudy</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setWeatherCondition("rainy")}
                      className={`p-3 rounded-lg border flex flex-col items-center ${
                        weatherCondition === "rainy"
                          ? "bg-blue-50 border-blue-500 text-blue-700"
                          : "border-gray-300 text-gray-700"
                      }`}
                    >
                      <FiCloud />
                      <span className="text-xs mt-1">Rainy</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setWeatherCondition("hot")}
                      className={`p-3 rounded-lg border flex flex-col items-center ${
                        weatherCondition === "hot"
                          ? "bg-red-50 border-red-500 text-red-700"
                          : "border-gray-300 text-gray-700"
                      }`}
                    >
                      <FiSun />
                      <span className="text-xs mt-1">Hot</span>
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-full">
                  Generate Forecast
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card lg:col-span-2"
            >
              <h3 className="text-lg font-medium mb-4">Predicted Food Demand</h3>
              <div className="h-80">
                <CustomBarChart
                  data={forecastData}
                  title=""
                  dataKeys={["predicted", "lastWeek"]}
                  colors={["#10b981", "#94a3b8"]}
                />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600">Breakfast</p>
                  <p className="text-xl font-bold text-green-700">350</p>
                  <p className="text-xs text-green-600">+9.4% from last week</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600">Lunch</p>
                  <p className="text-xl font-bold text-green-700">580</p>
                  <p className="text-xs text-green-600">+11.5% from last week</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600">Dinner</p>
                  <p className="text-xl font-bold text-green-700">420</p>
                  <p className="text-xs text-green-600">+10.5% from last week</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Trend Analysis Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card mb-8"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
              <h3 className="text-lg font-medium text-gray-800">{getViewTitle()}</h3>

              <div className="flex flex-col md:flex-row gap-4">
                {/* Week selector - only visible when weekly view is active */}
                {activeView === "weekly" && (
                  <div className="relative">
                    <select
                      value={selectedWeek}
                      onChange={(e) => setSelectedWeek(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      {availableWeeks.map((week) => (
                        <option key={week.id} value={week.id}>
                          {week.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <FiChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                )}

                {/* View selector buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => setActiveView("yearly")}
                    className={`px-3 py-1 rounded-md text-sm flex items-center ${
                      activeView === "yearly" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <FiTrendingUp className="mr-1" size={14} />
                    Yearly
                  </button>
                  <button
                    onClick={() => setActiveView("weekly")}
                    className={`px-3 py-1 rounded-md text-sm flex items-center ${
                      activeView === "weekly" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <FiBarChart className="mr-1" size={14} />
                    Weekly
                  </button>
                  <button
                    onClick={() => setActiveView("overall")}
                    className={`px-3 py-1 rounded-md text-sm flex items-center ${
                      activeView === "overall" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <FiBarChart className="mr-1" size={14} />
                    Overall
                  </button>
                </div>
              </div>
            </div>

            <div className="h-80">
              <CustomLineChart
                data={getCurrentData()}
                title=""
                dataKeys={["predicted", "actual", "demand"]}
                colors={["#3b82f6", "#10b981", "#f59e0b"]}
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 md:gap-8">
              
            </div>
          </motion.div>

          {/* Date Range Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="card"
          >
            <h3 className="text-lg font-medium mb-4">
              Forecast Summary ({fromDate} to {toDate})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <h4 className="text-sm font-medium text-blue-800 mb-2">Average Daily Demand</h4>
                <p className="text-2xl font-bold text-blue-600">1,350</p>
                <p className="text-xs text-blue-600">meals per day</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <h4 className="text-sm font-medium text-green-800 mb-2">Peak Demand Day</h4>
                <p className="text-2xl font-bold text-green-600">1,880</p>
                <p className="text-xs text-green-600">December 25th</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <h4 className="text-sm font-medium text-yellow-800 mb-2">Low Demand Day</h4>
                <p className="text-2xl font-bold text-yellow-600">1,150</p>
                <p className="text-xs text-yellow-600">March 15th</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <h4 className="text-sm font-medium text-purple-800 mb-2">Forecast Accuracy</h4>
                <p className="text-2xl font-bold text-purple-600">95.8%</p>
                <p className="text-xs text-purple-600">overall accuracy</p>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default GovDemandForecast
