// API Service Layer for Food Management System
const API_BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000"

class ApiService {
    constructor() {
        this.baseURL = API_BASE_URL
    }

    // Get stored JWT token
    getToken() {
        return localStorage.getItem("access_token")
    }

    // Set JWT token
    setToken(token) {
        localStorage.setItem("access_token", token)
    }

    // Remove JWT token
    removeToken() {
        localStorage.removeItem("access_token")
    }

    // Get authorization headers
    getAuthHeaders() {
        const token = this.getToken()
        return token ? { Authorization: `Bearer ${token}` } : {}
    }

    // Generic API request method
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`

        const config = {
            headers: {
                "Content-Type": "application/json",
                ...this.getAuthHeaders(),
                ...options.headers,
            },
            ...options,
        }

        try {
            const response = await fetch(url, config)

            // Handle different response types
            const contentType = response.headers.get("content-type")
            let data

            if (contentType && contentType.includes("application/json")) {
                data = await response.json()
            } else {
                data = await response.text()
            }

            if (!response.ok) {
                throw new Error(data.msg || data.error || `HTTP error! status: ${response.status}`)
            }

            return data
        } catch (error) {
            console.error("API Request Error:", error)
            throw error
        }
    }

    // GET request
    async get(endpoint) {
        return this.request(endpoint, { method: "GET" })
    }

    // POST request
    async post(endpoint, data) {
        return this.request(endpoint, {
            method: "POST",
            body: JSON.stringify(data),
        })
    }

    // PUT request
    async put(endpoint, data) {
        return this.request(endpoint, {
            method: "PUT",
            body: JSON.stringify(data),
        })
    }

    // DELETE request
    async delete(endpoint, data) {
        return this.request(endpoint, {
            method: "DELETE",
            body: data ? JSON.stringify(data) : undefined,
        })
    }

    // Authentication Methods
    async login(username, password) {
        try {
            const response = await this.post("/login/", {
                username,
                password,
            })

            if (response.access_token) {
                this.setToken(response.access_token)
                return {
                    success: true,
                    token: response.access_token,
                    role: response.role,
                }
            }

            return {
                success: false,
                error: "No access token received",
            }
        } catch (error) {
            return {
                success: false,
                error: error.message,
            }
        }
    }

    // Dashboard Methods
    async getDashboardStats() {
        return this.get("/dashboard/stats")
    }

    // Inventory Methods
    async getInventoryItems() {
        return this.get("/inventory/")
    }

    async addInventoryItem(item) {
        return this.put("/inventory/", item)
    }

    async updateInventoryItem(item) {
        return this.put("/inventory/", item)
    }

    async deleteInventoryItems(items) {
        return this.delete("/inventory/", { items })
    }

    async getInventoryStats() {
        return this.get("/inventory/stats")
    }

    async exportInventoryData() {
        return this.get("/inventory/export")
    }

    // Food Safety Methods
    async getInspectionDetails() {
        return this.get("/foodsafety/inspection")
    }

    async updateInspectionRecords(data) {
        return this.put("/foodsafety/inspection", data)
    }

    async getFoodSafetyStats() {
        return this.get("/foodsafety/stats")
    }

    // Forecast Methods
    async getForecastInfo() {
        return this.get("/forecast/")
    }

    // Profit & Loss Methods
    async getProfitLossStats() {
        return this.get("/profitloss/stats")
    }

    async getRevenueDetails() {
        return this.get("/profitloss/revenue")
    }

    async getExpenseDetails() {
        return this.get("/profitloss/expenses")
    }

    async getFinancialInsights() {
        return this.get("/profitloss/financialinsight")
    }

    async getRevenueExpensesByPeriod(baseType = "M", baseCount = 3) {
        return this.post("/profitloss/revenue-expenses", {
            BaseType: baseType,
            BaseCount: baseCount,
        })
    }

    // Food Fall (Wastage) Methods
    async getFoodWastageStats() {
        return this.get("/foodfall/stats")
    }

    async getDetailedWastageByPeriod(baseType = "M", baseCount = 3) {
        return this.post("/foodfall/wastage", {
            BaseType: baseType,
            BaseCount: baseCount,
        })
    }

    async getWastedFoodItems(baseType = "M", baseCount = 3) {
        return this.post("/foodfall/items", {
            BaseType: baseType,
            BaseCount: baseCount,
        })
    }

    async getWastageByCategory(baseType = "M", baseCount = 3) {
        return this.post("/foodfall/category", {
            BaseType: baseType,
            BaseCount: baseCount,
        })
    }

    async getWastageByReason(baseType = "M", baseCount = 3) {
        return this.post("/foodfall/reason", {
            BaseType: baseType,
            BaseCount: baseCount,
        })
    }

    async getAIWastageInsights() {
        return this.get("/foodfall/aiinsight")
    }

    // About Methods
    async getAboutInfo() {
        return this.get("/about/")
    }

    async updateAboutInfo(data) {
        return this.put("/about/", data)
    }

    // Menu Methods
    async getMenu() {
        return this.get("/menu")
    }

    async addMenuItems(items) {
        return this.post("/menu", items)
    }

    async updateMenuItems(items) {
        return this.put("/menu", items)
    }

    // Bill Methods
    async addBill(billData) {
        return this.post("/bill", billData)
    }

    // Utility method to check if token is valid
    async validateToken() {
        try {
            const token = this.getToken()
            if (!token) return false

            // Try to make an authenticated request to validate token
            await this.getDashboardStats()
            return true
        } catch (error) {
            // If request fails, token is likely invalid
            this.removeToken()
            return false
        }
    }
}

// Create and export a singleton instance
const apiService = new ApiService()
export default apiService
