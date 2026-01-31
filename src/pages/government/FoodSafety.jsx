"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FiUpload, FiDownload, FiFilter, FiCheck, FiX, FiAlertCircle, FiCalendar } from "react-icons/fi"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"

const GovFoodSafety = () => {
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedDate, setSelectedDate] = useState("")
  const [uploadModalOpen, setUploadModalOpen] = useState(false)

  // Mock inspection data
  const inspections = [
    {
      id: 1,
      date: "2023-05-15",
      inspector: "Dr. Sharma",
      area: "Kitchen",
      status: "passed",
      score: 92,
      notes: "All standards met. Minor improvements suggested for storage area.",
      documents: ["inspection_report_1.pdf", "kitchen_photos.jpg"],
    },
    {
      id: 2,
      date: "2023-05-10",
      inspector: "Dr. Patel",
      area: "Storage",
      status: "warning",
      score: 78,
      notes: "Temperature control issues identified. Follow-up required within 7 days.",
      documents: ["inspection_report_2.pdf", "storage_photos.jpg"],
    },
    {
      id: 3,
      date: "2023-05-05",
      inspector: "Dr. Kumar",
      area: "Serving Area",
      status: "passed",
      score: 95,
      notes: "Excellent compliance with all food safety standards.",
      documents: ["inspection_report_3.pdf", "serving_photos.jpg"],
    },
    {
      id: 4,
      date: "2023-04-28",
      inspector: "Dr. Singh",
      area: "Refrigeration",
      status: "failed",
      score: 65,
      notes: "Critical temperature control issues. Immediate action required.",
      documents: ["inspection_report_4.pdf", "refrigeration_photos.jpg"],
    },
    {
      id: 5,
      date: "2023-04-20",
      inspector: "Dr. Sharma",
      area: "Food Preparation",
      status: "passed",
      score: 88,
      notes: "Good compliance. Some minor issues with hand washing stations.",
      documents: ["inspection_report_5.pdf", "preparation_photos.jpg"],
    },
  ]

  const filteredInspections = inspections.filter((inspection) => {
    if (filterStatus !== "all" && inspection.status !== filterStatus) {
      return false
    }
    if (selectedDate && inspection.date !== selectedDate) {
      return false
    }
    return true
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case "passed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <FiCheck className="mr-1" size={12} />
            Passed
          </span>
        )
      case "warning":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <FiAlertCircle className="mr-1" size={12} />
            Warning
          </span>
        )
      case "failed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <FiX className="mr-1" size={12} />
            Failed
          </span>
        )
      default:
        return null
    }
  }

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600"
    if (score >= 75) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar role="government" />

        <main className="flex-1 ml-64 p-8">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Food Safety Report</h1>
              <p className="text-gray-600">Track and manage food safety inspections and compliance</p>
            </div>

            <div className="flex items-center space-x-4">
              <button onClick={() => setUploadModalOpen(true)} className="btn btn-primary flex items-center space-x-2">
                <FiUpload />
                <span>Upload Report</span>
              </button>
              <button className="btn btn-outline flex items-center space-x-2">
                <FiDownload />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-wrap items-center gap-4"
          >
            <div className="flex items-center">
              <FiFilter className="text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Filter by:</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setFilterStatus("all")}
                className={`px-3 py-1 rounded-md text-sm ${
                  filterStatus === "all" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus("passed")}
                className={`px-3 py-1 rounded-md text-sm ${
                  filterStatus === "passed" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                }`}
              >
                Passed
              </button>
              <button
                onClick={() => setFilterStatus("warning")}
                className={`px-3 py-1 rounded-md text-sm ${
                  filterStatus === "warning" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-700"
                }`}
              >
                Warning
              </button>
              <button
                onClick={() => setFilterStatus("failed")}
                className={`px-3 py-1 rounded-md text-sm ${
                  filterStatus === "failed" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"
                }`}
              >
                Failed
              </button>
            </div>

            <div className="flex items-center ml-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiCalendar className="text-gray-400" size={16} />
                </div>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {selectedDate && (
                <button onClick={() => setSelectedDate("")} className="ml-2 text-gray-500 hover:text-gray-700">
                  <FiX size={16} />
                </button>
              )}
            </div>
          </motion.div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500"
            >
              <h3 className="text-sm font-medium text-gray-500">Passed Inspections</h3>
              <p className="mt-2 text-2xl font-bold">3</p>
              <p className="mt-1 text-sm text-gray-500">Last 30 days</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-500"
            >
              <h3 className="text-sm font-medium text-gray-500">Warnings</h3>
              <p className="mt-2 text-2xl font-bold">1</p>
              <p className="mt-1 text-sm text-gray-500">Last 30 days</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-500"
            >
              <h3 className="text-sm font-medium text-gray-500">Failed Inspections</h3>
              <p className="mt-2 text-2xl font-bold">1</p>
              <p className="mt-1 text-sm text-gray-500">Last 30 days</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500"
            >
              <h3 className="text-sm font-medium text-gray-500">Average Score</h3>
              <p className="mt-2 text-2xl font-bold">83.6</p>
              <p className="mt-1 text-sm text-gray-500">Last 30 days</p>
            </motion.div>
          </div>

          {/* Inspections Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">Inspection Records</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Inspector
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Area
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
                      Score
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Documents
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredInspections.map((inspection) => (
                    <tr key={inspection.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{inspection.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{inspection.inspector}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{inspection.area}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(inspection.status)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm font-medium ${getScoreColor(inspection.score)}`}>
                          {inspection.score}/100
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {inspection.documents.length} files
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                        <button className="text-gray-600 hover:text-gray-900">Download</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Report Card Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">Food Safety Report Card</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h4 className="font-medium text-green-800 mb-2">Strengths</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <FiCheck className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Excellent kitchen cleanliness standards</span>
                    </li>
                    <li className="flex items-start">
                      <FiCheck className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Staff well-trained in food handling procedures</span>
                    </li>
                    <li className="flex items-start">
                      <FiCheck className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Proper labeling and date marking of stored food</span>
                    </li>
                    <li className="flex items-start">
                      <FiCheck className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Good pest control measures in place</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <h4 className="font-medium text-yellow-800 mb-2">Areas for Improvement</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <FiAlertCircle className="text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Temperature control in refrigeration units</span>
                    </li>
                    <li className="flex items-start">
                      <FiAlertCircle className="text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Hand washing station maintenance</span>
                    </li>
                    <li className="flex items-start">
                      <FiAlertCircle className="text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Storage area organization</span>
                    </li>
                    <li className="flex items-start">
                      <FiAlertCircle className="text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Documentation of cleaning procedures</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                  <h4 className="font-medium text-red-800 mb-2">Critical Issues</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <FiX className="text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Refrigeration temperature control failure in unit #3</span>
                    </li>
                    <li className="flex items-start">
                      <FiX className="text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Cross-contamination risk in vegetable preparation area</span>
                    </li>
                  </ul>
                  <div className="mt-4 p-3 bg-white rounded-md border border-red-300">
                    <h5 className="text-sm font-medium text-red-800 mb-1">Required Action</h5>
                    <p className="text-xs text-gray-700">
                      Immediate repair of refrigeration unit #3 and reorganization of vegetable preparation area to
                      prevent cross-contamination. Follow-up inspection scheduled for May 25, 2023.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Upload Modal */}
          {uploadModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-lg w-full max-w-md"
              >
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-800">Upload Inspection Report</h3>
                  <button onClick={() => setUploadModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                    <FiX size={20} />
                  </button>
                </div>
                <div className="p-6">
                  <form>
                    <div className="mb-4">
                      <label htmlFor="inspection-date" className="block text-sm font-medium text-gray-700 mb-1">
                        Inspection Date
                      </label>
                      <input
                        type="date"
                        id="inspection-date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="inspector" className="block text-sm font-medium text-gray-700 mb-1">
                        Inspector Name
                      </label>
                      <input
                        type="text"
                        id="inspector"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter inspector name"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
                        Inspection Area
                      </label>
                      <select
                        id="area"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select area</option>
                        <option value="kitchen">Kitchen</option>
                        <option value="storage">Storage</option>
                        <option value="serving">Serving Area</option>
                        <option value="refrigeration">Refrigeration</option>
                        <option value="preparation">Food Preparation</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                        Inspection Status
                      </label>
                      <select
                        id="status"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select status</option>
                        <option value="passed">Passed</option>
                        <option value="warning">Warning</option>
                        <option value="failed">Failed</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="score" className="block text-sm font-medium text-gray-700 mb-1">
                        Score (0-100)
                      </label>
                      <input
                        type="number"
                        id="score"
                        min="0"
                        max="100"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter score"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                        Notes
                      </label>
                      <textarea
                        id="notes"
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter inspection notes"
                      ></textarea>
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Upload Documents</label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                            >
                              <span>Upload files</span>
                              <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setUploadModalOpen(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Upload
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default GovFoodSafety
