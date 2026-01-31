"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FiPlus, FiFilter, FiSearch, FiDownload, FiUpload, FiBarChart2 } from "react-icons/fi"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import InventoryTable from "../../components/InventoryTable"
import CustomPieChart from "../../components/charts/PieChart"

const CorpInventory = () => {
    const [inventoryItems, setInventoryItems] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("all")
    const [showAddModal, setShowAddModal] = useState(false)
    const [editingItem, setEditingItem] = useState(null)
    const [newItem, setNewItem] = useState({
        name: "",
        category: "",
        quantity: "",
        unit: "kg",
        expiryDate: "",
    })
    const [categoryData, setCategoryData] = useState([])
    const [expiryData, setExpiryData] = useState([])

    useEffect(() => {
        // Simulate API call
        const mockInventoryItems = [
            {
                id: 1,
                name: "Rice",
                category: "Grains",
                quantity: 150,
                unit: "kg",
                expiryDate: "2025-08-15",
            },
            {
                id: 2,
                name: "Chicken",
                category: "Meat",
                quantity: 45,
                unit: "kg",
                expiryDate: "2025-05-25",
            },
            {
                id: 3,
                name: "Tomatoes",
                category: "Vegetables",
                quantity: 30,
                unit: "kg",
                expiryDate: "2025-05-23",
            },
            {
                id: 4,
                name: "Milk",
                category: "Dairy",
                quantity: 80,
                unit: "liter",
                expiryDate: "2025-05-22",
            },
            {
                id: 5,
                name: "Potatoes",
                category: "Vegetables",
                quantity: 100,
                unit: "kg",
                expiryDate: "2025-06-10",
            },
            {
                id: 6,
                name: "Flour",
                category: "Baking",
                quantity: 75,
                unit: "kg",
                expiryDate: "2025-09-20",
            },
            {
                id: 7,
                name: "Eggs",
                category: "Dairy",
                quantity: 500,
                unit: "pcs",
                expiryDate: "2025-06-05",
            },
            {
                id: 8,
                name: "Onions",
                category: "Vegetables",
                quantity: 60,
                unit: "kg",
                expiryDate: "2025-06-15",
            },
            {
                id: 9,
                name: "Beef",
                category: "Meat",
                quantity: 35,
                unit: "kg",
                expiryDate: "2025-05-24",
            },
            {
                id: 10,
                name: "Pasta",
                category: "Grains",
                quantity: 50,
                unit: "kg",
                expiryDate: "2025-10-15",
            },
            {
                id: 11,
                name: "Cheese",
                category: "Dairy",
                quantity: 25,
                unit: "kg",
                expiryDate: "2025-06-10",
            },
            {
                id: 12,
                name: "Bell Peppers",
                category: "Vegetables",
                quantity: 20,
                unit: "kg",
                expiryDate: "2025-05-25",
            },
        ]
        setInventoryItems(mockInventoryItems)

        // Generate category data for pie chart
        const categories = {}
        mockInventoryItems.forEach(item => {
            if (categories[item.category]) {
                categories[item.category] += item.quantity
            } else {
                categories[item.category] = item.quantity
            }
        })

        const categoryChartData = Object.keys(categories).map(category => ({
            name: category,
            value: categories[category]
        }))
        setCategoryData(categoryChartData)

        // Generate expiry data for pie chart
        const today = new Date()
        const oneWeek = new Date(today)
        oneWeek.setDate(oneWeek.getDate() + 7)
        const oneMonth = new Date(today)
        oneMonth.setDate(oneMonth.getDate() + 30)

        let expiringThisWeek = 0
        let expiringThisMonth = 0
        let expiringLater = 0

        mockInventoryItems.forEach(item => {
            const expiryDate = new Date(item.expiryDate)
            if (expiryDate <= oneWeek) {
                expiringThisWeek++
            } else if (expiryDate <= oneMonth) {
                expiringThisMonth++
            } else {
                expiringLater++
            }
        })

        const expiryChartData = [
            { name: "This Week", value: expiringThisWeek },
            { name: "This Month", value: expiringThisMonth },
            { name: "Later", value: expiringLater }
        ]
        setExpiryData(expiryChartData)
    }, [])

    const categories = ["all", ...new Set(inventoryItems.map((item) => item.category))]

    const filteredItems = inventoryItems.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
        return matchesSearch && matchesCategory
    })

    const handleAddItem = () => {
        if (editingItem) {
            // Update existing item
            setInventoryItems(inventoryItems.map((item) => (item.id === editingItem.id ? { ...newItem, id: item.id } : item)))
        } else {
            // Add new item
            const newId = Math.max(...inventoryItems.map((item) => item.id), 0) + 1
            setInventoryItems([...inventoryItems, { ...newItem, id: newId }])
        }

        setShowAddModal(false)
        setNewItem({
            name: "",
            category: "",
            quantity: "",
            unit: "kg",
            expiryDate: "",
        })
        setEditingItem(null)
    }

    const handleEditItem = (item) => {
        setEditingItem(item)
        setNewItem({
            name: item.name,
            category: item.category,
            quantity: item.quantity,
            unit: item.unit,
            expiryDate: item.expiryDate,
        })
        setShowAddModal(true)
    }

    const handleDeleteItem = (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            setInventoryItems(inventoryItems.filter((item) => item.id !== id))
        }
    }

    const exportToCSV = () => {
        const headers = ["Name", "Category", "Quantity", "Unit", "Expiry Date"]
        const csvData = [
            headers.join(","),
            ...inventoryItems.map((item) => [item.name, item.category, item.quantity, item.unit, item.expiryDate].join(",")),
        ].join("\n")

        const blob = new Blob([csvData], { type: "text/csv" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "corporate_inventory.csv"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex">
                <Sidebar role="corporate" />

                <main className="flex-1 ml-64 p-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-800">Corporate Inventory Management</h1>
                        <p className="text-gray-600">Track and manage your canteen's inventory</p>
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <CustomPieChart
                                data={categoryData}
                                title="Inventory by Category"
                                dataKey="value"
                                nameKey="name"
                                colors={["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"]}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <CustomPieChart
                                data={expiryData}
                                title="Expiry Timeline"
                                dataKey="value"
                                nameKey="name"
                                colors={["#ef4444", "#f59e0b", "#22c55e"]}
                            />
                        </motion.div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                            <div className="relative">
                                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search inventory..."
                                    className="input pl-10"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div className="relative">
                                <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <select
                                    className="input pl-10 appearance-none"
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                >
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category === "all" ? "All Categories" : category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-2 w-full md:w-auto">
                            <button className="btn btn-outline flex items-center gap-2" onClick={exportToCSV}>
                                <FiDownload size={16} />
                                <span>Export</span>
                            </button>
                            <button className="btn btn-outline flex items-center gap-2">
                                <FiUpload size={16} />
                                <span>Import</span>
                            </button>
                            <button className="btn btn-outline flex items-center gap-2">
                                <FiBarChart2 size={16} />
                                <span>Reports</span>
                            </button>
                            <button
                                className="btn btn-primary flex items-center gap-2"
                                onClick={() => {
                                    setEditingItem(null)
                                    setNewItem({
                                        name: "",
                                        category: "",
                                        quantity: "",
                                        unit: "kg",
                                        expiryDate: "",
                                    })
                                    setShowAddModal(true)
                                }}
                            >
                                <FiPlus size={16} />
                                <span>Add Item</span>
                            </button>
                        </div>
                    </div>

                    {/* Inventory Table */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                        <InventoryTable items={filteredItems} onEdit={handleEditItem} onDelete={handleDeleteItem} />
                    </motion.div>

                    {/* Add/Edit Modal */}
                    {showAddModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white rounded-lg p-6 w-full max-w-md"
                            >
                                <h2 className="text-xl font-bold mb-4">{editingItem ? "Edit Inventory Item" : "Add Inventory Item"}</h2>

                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="label">
                                            Item Name
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            className="input"
                                            value={newItem.name}
                                            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="category" className="label">
                                            Category
                                        </label>
                                        <input
                                            id="category"
                                            type="text"
                                            className="input"
                                            value={newItem.category}
                                            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label htmlFor="quantity" className="label">
                                                Quantity
                                            </label>
                                            <input
                                                id="quantity"
                                                type="number"
                                                min="0"
                                                step="0.1"
                                                className="input"
                                                value={newItem.quantity}
                                                onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                                                required
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <label htmlFor="unit" className="label">
                                                Unit
                                            </label>
                                            <select
                                                id="unit"
                                                className="input"
                                                value={newItem.unit}
                                                onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                                            >
                                                <option value="kg">Kilogram (kg)</option>
                                                <option value="g">Gram (g)</option>
                                                <option value="liter">Liter (L)</option>
                                                <option value="ml">Milliliter (ml)</option>
                                                <option value="pcs">Pieces (pcs)</option>
                                                <option value="box">Box</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="expiryDate" className="label">
                                            Expiry Date
                                        </label>
                                        <input
                                            id="expiryDate"
                                            type="date"
                                            className="input"
                                            value={newItem.expiryDate}
                                            onChange={(e) => setNewItem({ ...newItem, expiryDate: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2 mt-6">
                                    <button className="btn btn-outline" onClick={() => setShowAddModal(false)}>
                                        Cancel
                                    </button>
                                    <button className="btn btn-primary" onClick={handleAddItem}>
                                        {editingItem ? "Update" : "Add"}
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}

export default CorpInventory
