"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FiUser, FiLock, FiBell, FiGlobe, FiSave, FiUpload } from "react-icons/fi"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"

const RestSettings = () => {
    const [activeTab, setActiveTab] = useState("profile")
    const [profileForm, setProfileForm] = useState({
        name: "Spice Garden Restaurant",
        email: "contact@spicegarden.com",
        phone: "+91 9876543210",
        address: "123 Food Street, Delhi, India",
        description: "Authentic Indian cuisine with a modern twist.",
        openingHours: "10:00 AM - 10:00 PM",
    })
    useEffect(()=>{
      const fetchProfile = async ()=>{
        try{
          const response = await axios.get();
          const data = response.data
          setProfileForm({
                name: data.company_data.company_name,
                email: data.user.email,
                phone: data.user.mobile_number,
                address: data.company_data.Address,
                description: data.company_data.Description,
                openingHours: data.company_data.Opening_Hours
            })

        }
        catch(err){
          console.log(err)
        }
        
      }
      fetchProfile()

    },[])
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })
    const [notificationSettings, setNotificationSettings] = useState({
        emailAlerts: true,
        smsAlerts: false,
        inventoryAlerts: true,
        demandForecasts: true,
        staffUpdates: true,
    })
    const [aiSettings, setAiSettings] = useState({
        enableAI: true,
        shareFoodData: true,
        shareInventoryData: true,
        shareFinancialData: false,
        modelType: "advanced",
    })
    const [isLoading, setIsLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")

    const handleProfileSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            setSuccessMessage("Profile updated successfully!")

            setTimeout(() => {
                setSuccessMessage("")
            }, 3000)
        }, 1000)
    }

    const handlePasswordSubmit = (e) => {
        e.preventDefault()

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            alert("New passwords don't match!")
            return
        }

        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            setSuccessMessage("Password updated successfully!")
            setPasswordForm({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            })

            setTimeout(() => {
                setSuccessMessage("")
            }, 3000)
        }, 1000)
    }

    const handleNotificationSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            setSuccessMessage("Notification settings updated successfully!")

            setTimeout(() => {
                setSuccessMessage("")
            }, 3000)
        }, 1000)
    }

    const handleAISubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            setSuccessMessage("AI settings updated successfully!")

            setTimeout(() => {
                setSuccessMessage("")
            }, 3000)
        }, 1000)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex">
                <Sidebar role="restaurant" />

                <main className="flex-1 ml-64 p-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
                        <p className="text-gray-600">Manage your restaurant profile and preferences</p>
                    </div>

                    {/* Success Message */}
                    {successMessage && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6"
                        >
                            {successMessage}
                        </motion.div>
                    )}

                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Tabs */}
                        <div className="w-full md:w-64 shrink-0">
                            <div className="card">
                                <nav className="flex flex-col space-y-1">
                                    <button
                                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                                            activeTab === "profile" ? "bg-green-50 text-green-600" : "text-gray-700 hover:bg-gray-50"
                                        }`}
                                        onClick={() => setActiveTab("profile")}
                                    >
                                        <FiUser className="mr-3 h-5 w-5" />
                                        <span>Restaurant Profile</span>
                                    </button>
                                    <button
                                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                                            activeTab === "password" ? "bg-green-50 text-green-600" : "text-gray-700 hover:bg-gray-50"
                                        }`}
                                        onClick={() => setActiveTab("password")}
                                    >
                                        <FiLock className="mr-3 h-5 w-5" />
                                        <span>Password</span>
                                    </button>
                                    <button
                                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                                            activeTab === "notifications" ? "bg-green-50 text-green-600" : "text-gray-700 hover:bg-gray-50"
                                        }`}
                                        onClick={() => setActiveTab("notifications")}
                                    >
                                        <FiBell className="mr-3 h-5 w-5" />
                                        <span>Notifications</span>
                                    </button>
                                    <button
                                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                                            activeTab === "ai" ? "bg-green-50 text-green-600" : "text-gray-700 hover:bg-gray-50"
                                        }`}
                                        onClick={() => setActiveTab("ai")}
                                    >
                                        <FiGlobe className="mr-3 h-5 w-5" />
                                        <span>AI Integration</span>
                                    </button>
                                </nav>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <div className="card">
                                {/* Profile Settings */}
                                {activeTab === "profile" && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                                        <h2 className="text-lg font-medium mb-6">Restaurant Profile</h2>
                                        <form onSubmit={handleProfileSubmit}>
                                            <div className="mb-6">
                                                <div className="flex items-center justify-center">
                                                    <div className="relative">
                                                        <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                                                            <img
                                                                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                                                                alt="Restaurant"
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <button
                                                            type="button"
                                                            className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
                                                        >
                                                            <FiUpload className="text-gray-600" size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label htmlFor="name" className="label">
                                                        Restaurant Name
                                                    </label>
                                                    <input
                                                        id="name"
                                                        type="text"
                                                        className="input"
                                                        value={profileForm.name}
                                                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="email" className="label">
                                                        Email Address
                                                    </label>
                                                    <input
                                                        id="email"
                                                        type="email"
                                                        className="input"
                                                        value={profileForm.email}
                                                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="phone" className="label">
                                                        Phone Number
                                                    </label>
                                                    <input
                                                        id="phone"
                                                        type="tel"
                                                        className="input"
                                                        value={profileForm.phone}
                                                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="openingHours" className="label">
                                                        Opening Hours
                                                    </label>
                                                    <input
                                                        id="openingHours"
                                                        type="text"
                                                        className="input"
                                                        value={profileForm.openingHours}
                                                        onChange={(e) => setProfileForm({ ...profileForm, openingHours: e.target.value })}
                                                    />
                                                </div>

                                                <div className="md:col-span-2">
                                                    <label htmlFor="address" className="label">
                                                        Address
                                                    </label>
                                                    <input
                                                        id="address"
                                                        type="text"
                                                        className="input"
                                                        value={profileForm.address}
                                                        onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                                                        required
                                                    />
                                                </div>

                                                <div className="md:col-span-2">
                                                    <label htmlFor="description" className="label">
                                                        Description
                                                    </label>
                                                    <textarea
                                                        id="description"
                                                        className="input min-h-[100px]"
                                                        value={profileForm.description}
                                                        onChange={(e) => setProfileForm({ ...profileForm, description: e.target.value })}
                                                    ></textarea>
                                                </div>
                                            </div>

                                            <div className="mt-6 flex justify-end">
                                                <button type="submit" className="btn btn-primary flex items-center gap-2" disabled={isLoading}>
                                                    {isLoading ? (
                                                        "Saving..."
                                                    ) : (
                                                        <>
                                                            <FiSave size={16} />
                                                            <span>Save Changes</span>
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </form>
                                    </motion.div>
                                )}

                                {/* Password Settings */}
                                {activeTab === "password" && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                                        <h2 className="text-lg font-medium mb-6">Change Password</h2>
                                        <form onSubmit={handlePasswordSubmit}>
                                            <div className="space-y-4">
                                                <div>
                                                    <label htmlFor="currentPassword" className="label">
                                                        Current Password
                                                    </label>
                                                    <input
                                                        id="currentPassword"
                                                        type="password"
                                                        className="input"
                                                        value={passwordForm.currentPassword}
                                                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="newPassword" className="label">
                                                        New Password
                                                    </label>
                                                    <input
                                                        id="newPassword"
                                                        type="password"
                                                        className="input"
                                                        value={passwordForm.newPassword}
                                                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="confirmPassword" className="label">
                                                        Confirm New Password
                                                    </label>
                                                    <input
                                                        id="confirmPassword"
                                                        type="password"
                                                        className="input"
                                                        value={passwordForm.confirmPassword}
                                                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="mt-6 flex justify-end">
                                                <button type="submit" className="btn btn-primary flex items-center gap-2" disabled={isLoading}>
                                                    {isLoading ? (
                                                        "Updating..."
                                                    ) : (
                                                        <>
                                                            <FiSave size={16} />
                                                            <span>Update Password</span>
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </form>
                                    </motion.div>
                                )}

                                {/* Notification Settings */}
                                {activeTab === "notifications" && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                                        <h2 className="text-lg font-medium mb-6">Notification Settings</h2>
                                        <form onSubmit={handleNotificationSubmit}>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                                    <div>
                                                        <h3 className="font-medium text-gray-800">Email Alerts</h3>
                                                        <p className="text-sm text-gray-500">Receive notifications via email</p>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            className="sr-only peer"
                                                            checked={notificationSettings.emailAlerts}
                                                            onChange={() =>
                                                                setNotificationSettings({
                                                                    ...notificationSettings,
                                                                    emailAlerts: !notificationSettings.emailAlerts,
                                                                })
                                                            }
                                                        />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                                    </label>
                                                </div>

                                                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                                    <div>
                                                        <h3 className="font-medium text-gray-800">SMS Alerts</h3>
                                                        <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            className="sr-only peer"
                                                            checked={notificationSettings.smsAlerts}
                                                            onChange={() =>
                                                                setNotificationSettings({
                                                                    ...notificationSettings,
                                                                    smsAlerts: !notificationSettings.smsAlerts,
                                                                })
                                                            }
                                                        />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                                    </label>
                                                </div>

                                                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                                    <div>
                                                        <h3 className="font-medium text-gray-800">Inventory Alerts</h3>
                                                        <p className="text-sm text-gray-500">Get notified about low stock and expiring items</p>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            className="sr-only peer"
                                                            checked={notificationSettings.inventoryAlerts}
                                                            onChange={() =>
                                                                setNotificationSettings({
                                                                    ...notificationSettings,
                                                                    inventoryAlerts: !notificationSettings.inventoryAlerts,
                                                                })
                                                            }
                                                        />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                                    </label>
                                                </div>

                                                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                                    <div>
                                                        <h3 className="font-medium text-gray-800">Demand Forecasts</h3>
                                                        <p className="text-sm text-gray-500">Receive AI-generated demand predictions</p>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            className="sr-only peer"
                                                            checked={notificationSettings.demandForecasts}
                                                            onChange={() =>
                                                                setNotificationSettings({
                                                                    ...notificationSettings,
                                                                    demandForecasts: !notificationSettings.demandForecasts,
                                                                })
                                                            }
                                                        />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                                    </label>
                                                </div>

                                                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                                    <div>
                                                        <h3 className="font-medium text-gray-800">Staff Updates</h3>
                                                        <p className="text-sm text-gray-500">Get notified about staff attendance</p>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            className="sr-only peer"
                                                            checked={notificationSettings.staffUpdates}
                                                            onChange={() =>
                                                                setNotificationSettings({
                                                                    ...notificationSettings,
                                                                    staffUpdates: !notificationSettings.staffUpdates,
                                                                })
                                                            }
                                                        />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="mt-6 flex justify-end">
                                                <button type="submit" className="btn btn-primary flex items-center gap-2" disabled={isLoading}>
                                                    {isLoading ? (
                                                        "Saving..."
                                                    ) : (
                                                        <>
                                                            <FiSave size={16} />
                                                            <span>Save Preferences</span>
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </form>
                                    </motion.div>
                                )}

                                {/* AI Integration Settings */}
                                {activeTab === "ai" && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                                        <h2 className="text-lg font-medium mb-6">AI Integration Settings</h2>
                                        <form onSubmit={handleAISubmit}>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                                    <div>
                                                        <h3 className="font-medium text-gray-800">Enable AI Features</h3>
                                                        <p className="text-sm text-gray-500">Use AI for demand forecasting and recommendations</p>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            className="sr-only peer"
                                                            checked={aiSettings.enableAI}
                                                            onChange={() =>
                                                                setAiSettings({
                                                                    ...aiSettings,
                                                                    enableAI: !aiSettings.enableAI,
                                                                })
                                                            }
                                                        />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                                    </label>
                                                </div>

                                                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                                    <div>
                                                        <h3 className="font-medium text-gray-800">Share Food Data</h3>
                                                        <p className="text-sm text-gray-500">
                                                            Share anonymized food data to improve AI predictions
                                                        </p>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            className="sr-only peer"
                                                            checked={aiSettings.shareFoodData}
                                                            onChange={() =>
                                                                setAiSettings({
                                                                    ...aiSettings,
                                                                    shareFoodData: !aiSettings.shareFoodData,
                                                                })
                                                            }
                                                        />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                                    </label>
                                                </div>

                                                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                                    <div>
                                                        <h3 className="font-medium text-gray-800">Share Inventory Data</h3>
                                                        <p className="text-sm text-gray-500">
                                                            Share anonymized inventory data for better predictions
                                                        </p>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            className="sr-only peer"
                                                            checked={aiSettings.shareInventoryData}
                                                            onChange={() =>
                                                                setAiSettings({
                                                                    ...aiSettings,
                                                                    shareInventoryData: !aiSettings.shareInventoryData,
                                                                })
                                                            }
                                                        />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                                    </label>
                                                </div>

                                                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                                    <div>
                                                        <h3 className="font-medium text-gray-800">Share Financial Data</h3>
                                                        <p className="text-sm text-gray-500">
                                                            Share anonymized financial data for business insights
                                                        </p>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            className="sr-only peer"
                                                            checked={aiSettings.shareFinancialData}
                                                            onChange={() =>
                                                                setAiSettings({
                                                                    ...aiSettings,
                                                                    shareFinancialData: !aiSettings.shareFinancialData,
                                                                })
                                                            }
                                                        />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                                    </label>
                                                </div>

                                                <div className="py-2 border-b border-gray-100">
                                                    <h3 className="font-medium text-gray-800 mb-2">AI Model Type</h3>
                                                    <p className="text-sm text-gray-500 mb-4">
                                                        Select the AI model complexity for your predictions
                                                    </p>

                                                    <div className="space-y-2">
                                                        <label className="flex items-center">
                                                            <input
                                                                type="radio"
                                                                name="modelType"
                                                                value="basic"
                                                                checked={aiSettings.modelType === "basic"}
                                                                onChange={() =>
                                                                    setAiSettings({
                                                                        ...aiSettings,
                                                                        modelType: "basic",
                                                                    })
                                                                }
                                                                className="mr-2"
                                                            />
                                                            <span>Basic (Less accurate, faster predictions)</span>
                                                        </label>

                                                        <label className="flex items-center">
                                                            <input
                                                                type="radio"
                                                                name="modelType"
                                                                value="advanced"
                                                                checked={aiSettings.modelType === "advanced"}
                                                                onChange={() =>
                                                                    setAiSettings({
                                                                        ...aiSettings,
                                                                        modelType: "advanced",
                                                                    })
                                                                }
                                                                className="mr-2"
                                                            />
                                                            <span>Advanced (More accurate, standard speed)</span>
                                                        </label>

                                                        <label className="flex items-center">
                                                            <input
                                                                type="radio"
                                                                name="modelType"
                                                                value="premium"
                                                                checked={aiSettings.modelType === "premium"}
                                                                onChange={() =>
                                                                    setAiSettings({
                                                                        ...aiSettings,
                                                                        modelType: "premium",
                                                                    })
                                                                }
                                                                className="mr-2"
                                                            />
                                                            <span>Premium (Highest accuracy, slower predictions)</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-6 flex justify-end">
                                                <button type="submit" className="btn btn-primary flex items-center gap-2" disabled={isLoading}>
                                                    {isLoading ? (
                                                        "Saving..."
                                                    ) : (
                                                        <>
                                                            <FiSave size={16} />
                                                            <span>Save AI Settings</span>
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </form>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default RestSettings
