import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    FiUser,
    FiLock,
    FiBell,
    FiGlobe,
    FiSave,
    FiUpload,
    FiUsers,
    FiCalendar,
    FiDollarSign,
    FiCheckCircle,
    FiAlertCircle,
    FiCoffee,
    FiSettings,
    FiShield
} from "react-icons/fi"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import { useAuth } from "../../context/AuthContext"

const CorpSettings = () => {
    const { user } = useAuth()
    const [activeTab, setActiveTab] = useState("profile")
    const [profileForm, setProfileForm] = useState({
        name: "Tech Corp Canteen",
        email: "canteen@techcorp.com",
        phone: "+91 9876543210",
        address: "123 Tech Park, Bangalore, India",
        description: "Corporate canteen serving 500+ employees daily with nutritious meals.",
        openingHours: "8:00 AM - 8:00 PM",
        companySize: "1000-5000",
        industry: "Technology",
    })
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
        employeeNotifications: true,
        weeklyReports: true,
        monthlyReports: true,
    })
    const [aiSettings, setAiSettings] = useState({
        enableAI: true,
        shareFoodData: true,
        shareInventoryData: true,
        shareFinancialData: false,
        modelType: "advanced",
        enablePredictiveOrdering: true,
        enableMenuOptimization: true,
    })
    const [corporateSettings, setCorporateSettings] = useState({
        employeeSubsidy: 50,
        allowPreOrders: true,
        allowFeedback: true,
        displayNutritionInfo: true,
        trackEmployeeUsage: true,
        allowDepartmentBilling: true,
        enableMealPlans: true,
        enableSpecialDiets: true,
        enableCateringServices: true,
    })
    const [isLoading, setIsLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    // Clear messages after 3 seconds
    useEffect(() => {
        if (successMessage || errorMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage("")
                setErrorMessage("")
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [successMessage, errorMessage])

    const handleProfileSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        setErrorMessage("")

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            setSuccessMessage("Profile updated successfully!")
        }, 1000)
    }

    const handlePasswordSubmit = (e) => {
        e.preventDefault()
        setErrorMessage("")

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setErrorMessage("New passwords don't match!")
            return
        }

        if (passwordForm.newPassword.length < 8) {
            setErrorMessage("Password must be at least 8 characters long!")
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
        }, 1000)
    }

    const handleNotificationSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        setErrorMessage("")

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            setSuccessMessage("Notification settings updated successfully!")
        }, 1000)
    }

    const handleAISubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        setErrorMessage("")

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            setSuccessMessage("AI settings updated successfully!")
        }, 1000)
    }

    const handleCorporateSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        setErrorMessage("")

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            setSuccessMessage("Corporate settings updated successfully!")
        }, 1000)
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.3,
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        },
        exit: { opacity: 0 }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.3 }
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex">
                <Sidebar role="corporate" />

                <main className="flex-1 ml-64 p-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-800">Corporate Settings</h1>
                        <p className="text-gray-600">Manage your corporate canteen profile and preferences</p>
                    </div>

                    {/* Success Message */}
                    <AnimatePresence>
                        {successMessage && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center"
                            >
                                <FiCheckCircle className="mr-2" />
                                {successMessage}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Error Message */}
                    <AnimatePresence>
                        {errorMessage && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center"
                            >
                                <FiAlertCircle className="mr-2" />
                                {errorMessage}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Tabs */}
                        <div className="w-full md:w-64 shrink-0">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-4 border-b border-gray-100">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                                            <FiSettings />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-800">Settings</h3>
                                            <p className="text-xs text-gray-500">Manage your preferences</p>
                                        </div>
                                    </div>
                                </div>
                                <nav className="flex flex-col space-y-1 p-2">
                                    <button
                                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-150 ${
                                            activeTab === "profile" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                                        }`}
                                        onClick={() => setActiveTab("profile")}
                                    >
                                        <FiUser className="mr-3 h-5 w-5" />
                                        <span>Canteen Profile</span>
                                    </button>
                                    <button
                                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-150 ${
                                            activeTab === "password" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                                        }`}
                                        onClick={() => setActiveTab("password")}
                                    >
                                        <FiLock className="mr-3 h-5 w-5" />
                                        <span>Password</span>
                                    </button>
                                    <button
                                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-150 ${
                                            activeTab === "notifications" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                                        }`}
                                        onClick={() => setActiveTab("notifications")}
                                    >
                                        <FiBell className="mr-3 h-5 w-5" />
                                        <span>Notifications</span>
                                    </button>
                                    <button
                                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-150 ${
                                            activeTab === "ai" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                                        }`}
                                        onClick={() => setActiveTab("ai")}
                                    >
                                        <FiGlobe className="mr-3 h-5 w-5" />
                                        <span>AI Integration</span>
                                    </button>
                                    <button
                                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-150 ${
                                            activeTab === "corporate" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                                        }`}
                                        onClick={() => setActiveTab("corporate")}
                                    >
                                        <FiUsers className="mr-3 h-5 w-5" />
                                        <span>Corporate Options</span>
                                    </button>
                                </nav>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                                {/* Profile Settings */}
                                <AnimatePresence mode="wait">
                                    {activeTab === "profile" && (
                                        <motion.div
                                            key="profile"
                                            variants={containerVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                        >
                                            <div className="flex items-center mb-6">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                                                    <FiUser />
                                                </div>
                                                <h2 className="text-lg font-medium">Canteen Profile</h2>
                                            </div>

                                            <form onSubmit={handleProfileSubmit}>
                                                <motion.div variants={itemVariants} className="mb-6">
                                                    <div className="flex items-center justify-center">
                                                        <div className="relative">
                                                            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
                                                                <img
                                                                    src="https://images.unsplash.com/photo-1590301157890-4810ed352733?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                                                                    alt="Canteen"
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                            <button
                                                                type="button"
                                                                className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 shadow-md hover:bg-blue-700 transition-colors duration-150"
                                                            >
                                                                <FiUpload size={16} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </motion.div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <motion.div variants={itemVariants}>
                                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                                            Canteen Name
                                                        </label>
                                                        <input
                                                            id="name"
                                                            type="text"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            value={profileForm.name}
                                                            onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                                                            required
                                                        />
                                                    </motion.div>

                                                    <motion.div variants={itemVariants}>
                                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                                            Email Address
                                                        </label>
                                                        <input
                                                            id="email"
                                                            type="email"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            value={profileForm.email}
                                                            onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                                                            required
                                                        />
                                                    </motion.div>

                                                    <motion.div variants={itemVariants}>
                                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                                            Phone Number
                                                        </label>
                                                        <input
                                                            id="phone"
                                                            type="tel"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            value={profileForm.phone}
                                                            onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                                                            required
                                                        />
                                                    </motion.div>

                                                    <motion.div variants={itemVariants}>
                                                        <label htmlFor="openingHours" className="block text-sm font-medium text-gray-700 mb-1">
                                                            Opening Hours
                                                        </label>
                                                        <input
                                                            id="openingHours"
                                                            type="text"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            value={profileForm.openingHours}
                                                            onChange={(e) => setProfileForm({ ...profileForm, openingHours: e.target.value })}
                                                        />
                                                    </motion.div>

                                                    <motion.div variants={itemVariants}>
                                                        <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 mb-1">
                                                            Company Size
                                                        </label>
                                                        <select
                                                            id="companySize"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            value={profileForm.companySize}
                                                            onChange={(e) => setProfileForm({ ...profileForm, companySize: e.target.value })}
                                                        >
                                                            <option value="1-50">1-50 employees</option>
                                                            <option value="51-200">51-200 employees</option>
                                                            <option value="201-500">201-500 employees</option>
                                                            <option value="501-1000">501-1000 employees</option>
                                                            <option value="1000-5000">1000-5000 employees</option>
                                                            <option value="5000+">5000+ employees</option>
                                                        </select>
                                                    </motion.div>

                                                    <motion.div variants={itemVariants}>
                                                        <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                                                            Industry
                                                        </label>
                                                        <select
                                                            id="industry"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            value={profileForm.industry}
                                                            onChange={(e) => setProfileForm({ ...profileForm, industry: e.target.value })}
                                                        >
                                                            <option value="Technology">Technology</option>
                                                            <option value="Finance">Finance</option>
                                                            <option value="Healthcare">Healthcare</option>
                                                            <option value="Education">Education</option>
                                                            <option value="Manufacturing">Manufacturing</option>
                                                            <option value="Retail">Retail</option>
                                                            <option value="Other">Other</option>
                                                        </select>
                                                    </motion.div>

                                                    <motion.div variants={itemVariants} className="md:col-span-2">
                                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                                            Address
                                                        </label>
                                                        <input
                                                            id="address"
                                                            type="text"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            value={profileForm.address}
                                                            onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                                                            required
                                                        />
                                                    </motion.div>

                                                    <motion.div variants={itemVariants} className="md:col-span-2">
                                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                                            Description
                                                        </label>
                                                        <textarea
                                                            id="description"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
                                                            value={profileForm.description}
                                                            onChange={(e) => setProfileForm({ ...profileForm, description: e.target.value })}
                                                        ></textarea>
                                                    </motion.div>
                                                </div>

                                                <motion.div variants={itemVariants} className="mt-6 flex justify-end">
                                                    <button
                                                        type="submit"
                                                        className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center gap-2 transition-colors duration-150"
                                                        disabled={isLoading}
                                                    >
                                                        {isLoading ? (
                                                            <>
                                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                </svg>
                                                                Saving...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <FiSave size={16} />
                                                                <span>Save Changes</span>
                                                            </>
                                                        )}
                                                    </button>
                                                </motion.div>
                                            </form>
                                        </motion.div>
                                    )}

                                    {/* Password Settings */}
                                    {activeTab === "password" && (
                                        <motion.div
                                            key="password"
                                            variants={containerVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                        >
                                            <div className="flex items-center mb-6">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                                                    <FiLock />
                                                </div>
                                                <h2 className="text-lg font-medium">Change Password</h2>
                                            </div>

                                            <form onSubmit={handlePasswordSubmit}>
                                                <div className="space-y-4">
                                                    <motion.div variants={itemVariants}>
                                                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                                            Current Password
                                                        </label>
                                                        <input
                                                            id="currentPassword"
                                                            type="password"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            value={passwordForm.currentPassword}
                                                            onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                                            required
                                                        />
                                                    </motion.div>

                                                    <motion.div variants={itemVariants}>
                                                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                                            New Password
                                                        </label>
                                                        <input
                                                            id="newPassword"
                                                            type="password"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            value={passwordForm.newPassword}
                                                            onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                                            required
                                                        />
                                                        <p className="mt-1 text-xs text-gray-500">
                                                            Password must be at least 8 characters long
                                                        </p>
                                                    </motion.div>

                                                    <motion.div variants={itemVariants}>
                                                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                                            Confirm New Password
                                                        </label>
                                                        <input
                                                            id="confirmPassword"
                                                            type="password"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            value={passwordForm.confirmPassword}
                                                            onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                                            required
                                                        />
                                                    </motion.div>
                                                </div>

                                                <motion.div variants={itemVariants} className="mt-6 flex justify-end">
                                                    <button
                                                        type="submit"
                                                        className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center gap-2 transition-colors duration-150"
                                                        disabled={isLoading}
                                                    >
                                                        {isLoading ? (
                                                            <>
                                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                </svg>
                                                                Updating...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <FiSave size={16} />
                                                                <span>Update Password</span>
                                                            </>
                                                        )}
                                                    </button>
                                                </motion.div>
                                            </form>
                                        </motion.div>
                                    )}

                                    {/* Notification Settings */}
                                    {activeTab === "notifications" && (
                                        <motion.div
                                            key="notifications"
                                            variants={containerVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                        >
                                            <div className="flex items-center mb-6">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                                                    <FiBell />
                                                </div>
                                                <h2 className="text-lg font-medium">Notification Settings</h2>
                                            </div>

                                            <form onSubmit={handleNotificationSubmit}>
                                                <div className="space-y-4">
                                                    <motion.div variants={itemVariants} className="flex items-center justify-between py-3 border-b border-gray-100">
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
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                                                        </label>
                                                    </motion.div>

                                                    <motion.div variants={itemVariants} className="flex items-center justify-between py-3 border-b border-gray-100">
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
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                                                        </label>
                                                    </motion.div>

                                                    <motion.div variants={itemVariants} className="flex items-center justify-between py-3 border-b border-gray-100">
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
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                                                        </label>
                                                    </motion.div>

                                                    <motion.div variants={itemVariants} className="flex items-center justify-between py-3 border-b border-gray-100">
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
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                                                        </label>
                                                    </motion.div>

                                                    <motion.div variants={itemVariants} className="flex items-center justify-between py-3 border-b border-gray-100">
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
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                                                        </label>
                                                    </motion.div>

                                                    <motion.div variants={itemVariants} className="flex items-center justify-between py-3 border-b border-gray-100">
                                                        <div>
                                                            <h3 className="font-medium text-gray-800">Employee Notifications</h3>
                                                            <p className="text-sm text-gray-500">Send menu updates and special offers to employees</p>
                                                        </div>
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                className="sr-only peer"
                                                                checked={notificationSettings.employeeNotifications}
                                                                onChange={() =>
                                                                    setNotificationSettings({
                                                                        ...notificationSettings,
                                                                        employeeNotifications: !notificationSettings.employeeNotifications,
                                                                    })
                                                                }
                                                            />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                                                        </label>
                                                    </motion.div>

                                                    <motion.div variants={itemVariants} className="flex items-center justify-between py-3 border-b border-gray-100">
                                                        <div>
                                                            <h3 className="font-medium text-gray-800">Weekly Reports</h3>
                                                            <p className="text-sm text-gray-500">Receive weekly summary reports</p>
                                                        </div>
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                className="sr-only peer"
                                                                checked={notificationSettings.weeklyReports}
                                                                onChange={() =>
                                                                    setNotificationSettings({
                                                                        ...notificationSettings,
                                                                        weeklyReports: !notificationSettings.weeklyReports,
                                                                    })
                                                                }
                                                            />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                                                        </label>
                                                    </motion.div>

                                                    <motion.div variants={itemVariants} className="flex items-center justify-between py-3 border-b border-gray-100">
                                                        <div>
                                                            <h3 className="font-medium text-gray-800">Monthly Reports</h3>
                                                            <p className="text-sm text-gray-500">Receive monthly detailed analytics</p>
                                                        </div>
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                className="sr-only peer"
                                                                checked={notificationSettings.monthlyReports}
                                                                onChange={() =>
                                                                    setNotificationSettings({
                                                                        ...notificationSettings,
                                                                        monthlyReports: !notificationSettings.monthlyReports,
                                                                    })
                                                                }
                                                            />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                                                        </label>
                                                    </motion.div>
                                                </div>

                                                <motion.div variants={itemVariants} className="mt-6 flex justify-end">
                                                    <button
                                                        type="submit"
                                                        className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center gap-2 transition-colors duration-150"
                                                        disabled={isLoading}
                                                    >
                                                        {isLoading ? (
                                                            <>
                                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                </svg>
                                                                Saving...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <FiSave size={16} />
                                                                <span>Save Preferences</span>
                                                            </>
                                                        )}
                                                    </button>
                                                </motion.div>
                                            </form>
                                        </motion.div>
                                    )}

                                    {/* AI Integration Settings */}
                                    {activeTab === "ai" && (
                                        <motion.div
                                            key="ai"
                                            variants={containerVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                        >
                                            <div className="flex items-center mb-6">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                                                    <FiGlobe />
                                                </div>
                                                <h2 className="text-lg font-medium">AI Integration Settings</h2>
                                            </div>

                                            <form onSubmit={handleAISubmit}>
                                                <div className="space-y-4">
                                                    <motion.div variants={itemVariants} className="flex items-center justify-between py-3 border-b border-gray-100">
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
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                                                        </label>
                                                    </motion.div>

                                                    <motion.div variants={itemVariants} className="flex items-center justify-between py-3 border-b border-gray-100">
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
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                                                        </label>
                                                    </motion.div>

                                                    <motion.div variants={itemVariants} className="flex items-center justify-between py-3 border-b border-gray-100">
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
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                                                        </label>
                                                    </motion.div>

                                                    <motion.div variants={itemVariants} className="flex items-center justify-between py-3 border-b border-gray-100">
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
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                                                        </label>
                                                    </motion.div>

                                                    <motion.div variants={itemVariants} className="flex items-center justify-between py-3 border-b border-gray-100">
                                                        <div>
                                                            <h3 className="font-medium text-gray-800">Enable Predictive Ordering</h3>
                                                            <p className="text-sm text-gray-500">
                                                                Use AI to predict and suggest optimal order quantities
                                                            </p>
                                                        </div>
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                className="sr-only peer"
                                                                checked={aiSettings.enablePredictiveOrdering}
                                                                onChange={() =>
                                                                    setAiSettings({
                                                                        ...aiSettings,
                                                                        enablePredictiveOrdering: !aiSettings.enablePredictiveOrdering,
                                                                    })
                                                                }
                                                            />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-  after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                                                        </label>
                                                    </motion.div>

                                                    <motion.div variants={itemVariants} className="flex items-center justify-between py-3 border-b border-gray-100">
                                                        <div>
                                                            <h3 className="font-medium text-gray-800">Enable Menu Optimization</h3>
                                                            <p className="text-sm text-gray-500">
                                                                Use AI to optimize menu based on employee preferences and nutrition
                                                            </p>
                                                        </div>
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                className="sr-only peer"
                                                                checked={aiSettings.enableMenuOptimization}
                                                                onChange={() =>
                                                                    setAiSettings({
                                                                        ...aiSettings,
                                                                        enableMenuOptimization: !aiSettings.enableMenuOptimization,
                                                                    })
                                                                }
                                                            />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                                                        </label>
                                                    </motion.div>

                                                    <motion.div variants={itemVariants} className="py-3 border-b border-gray-100">
                                                        <h3 className="font-medium text-gray-800 mb-2">AI Model Type</h3>
                                                        <p className="text-sm text-gray-500 mb-4">
                                                            Select the AI model complexity for your predictions
                                                        </p>

                                                        <div className="space-y-3">
                                                            <label className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer transition-colors duration-150">
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
                                                                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                                />
                                                                <div>
                                                                    <span className="font-medium">Basic</span>
                                                                    <p className="text-sm text-gray-500">Less accurate, faster predictions</p>
                                                                </div>
                                                            </label>

                                                            <label className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer transition-colors duration-150">
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
                                                                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                                />
                                                                <div>
                                                                    <span className="font-medium">Advanced</span>
                                                                    <p className="text-sm text-gray-500">More accurate, standard speed</p>
                                                                </div>
                                                            </label>

                                                            <label className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer transition-colors duration-150">
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
                                                                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                                />
                                                                <div>
                                                                    <span className="font-medium">Premium</span>
                                                                    <p className="text-sm text-gray-500">Highest accuracy, slower predictions</p>
                                                                </div>
                                                            </label>
                                                        </div>
                                                    </motion.div>
                                                </div>

                                                <motion.div variants={itemVariants} className="mt-6 flex justify-end">
                                                    <button
                                                        type="submit"
                                                        className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center gap-2 transition-colors duration-150"
                                                        disabled={isLoading}
                                                    >
                                                        {isLoading ? (
                                                            <>
                                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                </svg>
                                                                Saving...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <FiSave size={16} />
                                                                <span>Save AI Settings</span>
                                                            </>
                                                        )}
                                                    </button>
                                                </motion.div>
                                            </form>
                                        </motion.div>
                                    )}

                                    {/* Corporate Settings */}
                                    {activeTab === "corporate" && (
                                        <motion.div
                                            key="corporate"
                                            variants={containerVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                        >
                                            <div className="flex items-center mb-6">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                                                    <FiUsers />
                                                </div>
                                                <h2 className="text-lg font-medium">Corporate Canteen Settings</h2>
                                            </div>

                                            <form onSubmit={handleCorporateSubmit}>
                                                <div className="space-y-6">
                                                    <motion.div variants={itemVariants}>
                                                        <label htmlFor="employeeSubsidy" className="label flex items-center mb-2">
                                                            <FiDollarSign className="mr-2 text-gray-500" />
                                                            Employee Meal Subsidy (%)
                                                        </label>
                                                        <div className="flex items-center gap-4">
                                                            <input
                                                                id="employeeSubsidy"
                                                                type="range"
                                                                min="0"
                                                                max="100"
                                                                step="5"
                                                                value={corporateSettings.employeeSubsidy}
                                                                onChange={(e) =>
                                                                    setCorporateSettings({
                                                                        ...corporateSettings,
                                                                        employeeSubsidy: Number.parseInt(e.target.value),
                                                                    })
                                                                }
                                                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                                            />
                                                            <span className="text-lg font-medium text-blue-600 min-w-[3rem] text-center">
                                {corporateSettings.employeeSubsidy}%
                              </span>
                                                        </div>
                                                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                                                            <span>0%</span>
                                                            <span>50%</span>
                                                            <span>100%</span>
                                                        </div>
                                                        <p className="text-sm text-gray-500 mt-2">
                                                            Current subsidy: {corporateSettings.employeeSubsidy}% (Employees pay{" "}
                                                            {100 - corporateSettings.employeeSubsidy}% of meal cost)
                                                        </p>
                                                    </motion.div>

                                                    <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <div className="flex items-center">
                                                                    <FiCalendar className="text-blue-500 mr-2" />
                                                                    <h3 className="font-medium text-gray-800">Allow Pre-Orders</h3>
                                                                </div>
                                                                <label className="relative inline-flex items-center cursor-pointer">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="sr-only peer"
                                                                        checked={corporateSettings.allowPreOrders}
                                                                        onChange={() =>
                                                                            setCorporateSettings({
                                                                                ...corporateSettings,
                                                                                allowPreOrders: !corporateSettings.allowPreOrders,
                                                                            })
                                                                        }
                                                                    />
                                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                                                                </label>
                                                            </div>
                                                            <p className="text-sm text-gray-500">
                                                                Enable employees to pre-order meals for better planning
                                                            </p>
                                                        </div>

                                                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <div className="flex items-center">
                                                                    <FiCoffee className="text-blue-500 mr-2" />
                                                                    <h3 className="font-medium text-gray-800">Allow Employee Feedback</h3>
                                                                </div>
                                                                <label className="relative inline-flex items-center cursor-pointer">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="sr-only peer"
                                                                        checked={corporateSettings.allowFeedback}
                                                                        onChange={() =>
                                                                            setCorporateSettings({
                                                                                ...corporateSettings,
                                                                                allowFeedback: !corporateSettings.allowFeedback,
                                                                            })
                                                                        }
                                                                    />
                                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                                                                </label>
                                                            </div>
                                                            <p className="text-sm text-gray-500">
                                                                Enable employees to provide feedback on meals
                                                            </p>
                                                        </div>

                                                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <div className="flex items-center">
                                                                    <FiShield className="text-blue-500 mr-2" />
                                                                    <h3 className="font-medium text-gray-800">Display Nutrition Info</h3>
                                                                </div>
                                                                <label className="relative inline-flex items-center cursor-pointer">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="sr-only peer"
                                                                        checked={corporateSettings.displayNutritionInfo}
                                                                        onChange={() =>
                                                                            setCorporateSettings({
                                                                                ...corporateSettings,
                                                                                displayNutritionInfo: !corporateSettings.displayNutritionInfo,
                                                                            })
                                                                        }
                                                                    />
                                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                                                                </label>
                                                            </div>
                                                            <p className="text-sm text-gray-500">
                                                                Show calorie and nutrition details for each meal
                                                            </p>
                                                        </div>

                                                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <div className="flex items-center">
                                                                    <FiUsers className="text-blue-500 mr-2" />
                                                                    <h3 className="font-medium text-gray-800">Track Employee Usage</h3>
                                                                </div>
                                                                <label className="relative inline-flex items-center cursor-pointer">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="sr-only peer"
                                                                        checked={corporateSettings.trackEmployeeUsage}
                                                                        onChange={() =>
                                                                            setCorporateSettings({
                                                                                ...corporateSettings,
                                                                                trackEmployeeUsage: !corporateSettings.trackEmployeeUsage,
                                                                            })
                                                                        }
                                                                    />
                                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                                                                </label>
                                                            </div>
                                                            <p className="text-sm text-gray-500">
                                                                Track employee canteen usage for analytics
                                                            </p>
                                                        </div>

                                                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <div className="flex items-center">
                                                                    <FiDollarSign className="text-blue-500 mr-2" />
                                                                    <h3 className="font-medium text-gray-800">Department Billing</h3>
                                                                </div>
                                                                <label className="relative inline-flex items-center cursor-pointer">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="sr-only peer"
                                                                        checked={corporateSettings.allowDepartmentBilling}
                                                                        onChange={() =>
                                                                            setCorporateSettings({
                                                                                ...corporateSettings,
                                                                                allowDepartmentBilling: !corporateSettings.allowDepartmentBilling,
                                                                            })
                                                                        }
                                                                    />
                                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                                                                </label>
                                                            </div>
                                                            <p className="text-sm text-gray-500">
                                                                Allow billing to be assigned to departments
                                                            </p>
                                                        </div>

                                                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <div className="flex items-center">
                                                                    <FiCalendar className="text-blue-500 mr-2" />
                                                                    <h3 className="font-medium text-gray-800">Enable Meal Plans</h3>
                                                                </div>
                                                                <label className="relative inline-flex items-center cursor-pointer">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="sr-only peer"
                                                                        checked={corporateSettings.enableMealPlans}
                                                                        onChange={() =>
                                                                            setCorporateSettings({
                                                                                ...corporateSettings,
                                                                                enableMealPlans: !corporateSettings.enableMealPlans,
                                                                            })
                                                                        }
                                                                    />
                                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                                                                </label>
                                                            </div>
                                                            <p className="text-sm text-gray-500">
                                                                Allow employees to subscribe to weekly meal plans
                                                            </p>
                                                        </div>

                                                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <div className="flex items-center">
                                                                    <FiCoffee className="text-blue-500 mr-2" />
                                                                    <h3 className="font-medium text-gray-800">Special Diets</h3>
                                                                </div>
                                                                <label className="relative inline-flex items-center cursor-pointer">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="sr-only peer"
                                                                        checked={corporateSettings.enableSpecialDiets}
                                                                        onChange={() =>
                                                                            setCorporateSettings({
                                                                                ...corporateSettings,
                                                                                enableSpecialDiets: !corporateSettings.enableSpecialDiets,
                                                                            })
                                                                        }
                                                                    />
                                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                                                                </label>
                                                            </div>
                                                            <p className="text-sm text-gray-500">
                                                                Enable special diet options (vegan, gluten-free, etc.)
                                                            </p>
                                                        </div>

                                                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <div className="flex items-center">
                                                                    <FiUsers className="text-blue-500 mr-2" />
                                                                    <h3 className="font-medium text-gray-800">Catering Services</h3>
                                                                </div>
                                                                <label className="relative inline-flex items-center cursor-pointer">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="sr-only peer"
                                                                        checked={corporateSettings.enableCateringServices}
                                                                        onChange={() =>
                                                                            setCorporateSettings({
                                                                                ...corporateSettings,
                                                                                enableCateringServices: !corporateSettings.enableCateringServices,
                                                                            })
                                                                        }
                                                                    />
                                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                                                                </label>
                                                            </div>
                                                            <p className="text-sm text-gray-500">
                                                                Enable catering services for corporate events
                                                            </p>
                                                        </div>
                                                    </motion.div>

                                                    <motion.div variants={itemVariants} className="mt-6 flex justify-end">
                                                        <button
                                                            type="submit"
                                                            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center gap-2 transition-colors duration-150"
                                                            disabled={isLoading}
                                                        >
                                                            {isLoading ? (
                                                                <>
                                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                    </svg>
                                                                    Saving...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <FiSave size={16} />
                                                                    <span>Save Corporate Settings</span>
                                                                </>
                                                            )}
                                                        </button>
                                                    </motion.div>
                                                </div>
                                            </form>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default CorpSettings
