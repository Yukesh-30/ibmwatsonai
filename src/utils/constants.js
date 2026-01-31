// API Configuration and Constants
export const API_CONFIG = {
    BASE_URL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000",
    TIMEOUT: 10000, // 10 seconds
    RETRY_ATTEMPTS: 3,
}

// Time period types for API calls
export const TIME_PERIODS = {
    DAILY: "D",
    WEEKLY: "W",
    MONTHLY: "M",
    YEARLY: "Y",
}

// User roles
export const USER_ROLES = {
    ADMIN: "admin",
    MANAGER: "manager",
    EMPLOYEE: "employee",
}

// Frontend role mapping
export const FRONTEND_ROLES = {
    RESTAURANT: "restaurant",
    CORPORATE: "corporate",
    GOVERNMENT: "government",
}

// API endpoints
export const API_ENDPOINTS = {
    LOGIN: "/login/",
    DASHBOARD: "/dashboard/stats",
    INVENTORY: "/inventory/",
    FOOD_SAFETY: "/foodsafety/",
    FORECAST: "/forecast/",
    PROFIT_LOSS: "/profitloss/",
    FOOD_FALL: "/foodfall/",
    ABOUT: "/about/",
    MENU: "/menu",
    BILL: "/bill",
}

// Error messages
export const ERROR_MESSAGES = {
    NETWORK_ERROR: "Network error. Please check your connection.",
    UNAUTHORIZED: "You are not authorized to perform this action.",
    SERVER_ERROR: "Server error. Please try again later.",
    INVALID_CREDENTIALS: "Invalid username or password.",
    TOKEN_EXPIRED: "Your session has expired. Please login again.",
}

// Success messages
export const SUCCESS_MESSAGES = {
    LOGIN_SUCCESS: "Login successful!",
    LOGOUT_SUCCESS: "Logged out successfully.",
    UPDATE_SUCCESS: "Updated successfully.",
    DELETE_SUCCESS: "Deleted successfully.",
    CREATE_SUCCESS: "Created successfully.",
}
