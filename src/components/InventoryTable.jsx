"use client"

import {useState} from "react"
import {FiAlertCircle, FiEdit2, FiTrash2} from "react-icons/fi"

const InventoryTable = ({ items, onEdit, onDelete }) => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" })

    const sortedItems = [...items].sort((a, b) => {
        if (!sortConfig.key) return 0

        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
    })

    const requestSort = (key) => {
        let direction = "ascending"
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending"
        }
        setSortConfig({ key, direction })
    }

    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return
        }
        return sortConfig.key === name ? sortConfig.direction : undefined
    }

    const getDaysLeft = (expiryDate) => {
        const today = new Date()
        const expiry = new Date(expiryDate)
        const diffTime = expiry - today
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => requestSort("name")}
                    >
                        Item Name
                        {getClassNamesFor("name") === "ascending" && " ↑"}
                        {getClassNamesFor("name") === "descending" && " ↓"}
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => requestSort("category")}
                    >
                        Category
                        {getClassNamesFor("category") === "ascending" && " ↑"}
                        {getClassNamesFor("category") === "descending" && " ↓"}
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => requestSort("quantity")}
                    >
                        Quantity
                        {getClassNamesFor("quantity") === "ascending" && " ↑"}
                        {getClassNamesFor("quantity") === "descending" && " ↓"}
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => requestSort("expiryDate")}
                    >
                        Expiry Date
                        {getClassNamesFor("expiryDate") === "ascending" && " ↑"}
                        {getClassNamesFor("expiryDate") === "descending" && " ↓"}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {sortedItems.map((item) => {
                    const daysLeft = getDaysLeft(item.expiryDate)
                    let statusColor = "bg-green-100 text-green-800"
                    if (daysLeft <= 3) {
                        statusColor = "bg-red-100 text-red-800"
                    } else if (daysLeft <= 7) {
                        statusColor = "bg-yellow-100 text-yellow-800"
                    }

                    return (
                        <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{item.category}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                    {item.quantity} {item.unit}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{new Date(item.expiryDate).toLocaleDateString()}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}`}>
                    {daysLeft <= 0 ? "Expired" : `${daysLeft} days left`}
                      {daysLeft <= 3 && <FiAlertCircle className="ml-1" />}
                  </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button onClick={() => onEdit(item)} className="text-blue-600 hover:text-blue-900 mr-3">
                                    <FiEdit2 className="inline" />
                                </button>
                                <button onClick={() => onDelete(item.id)} className="text-red-600 hover:text-red-900">
                                    <FiTrash2 className="inline" />
                                </button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

export default InventoryTable
