"use client"

// Custom hook for API calls with loading and error states
import { useState, useEffect } from "react"
import apiService from "../services/api"

export const useApi = (apiCall, dependencies = []) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                setError(null)
                const result = await apiCall()
                setData(result)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, dependencies)

    const refetch = async () => {
        try {
            setLoading(true)
            setError(null)
            const result = await apiCall()
            setData(result)
            return result
        } catch (err) {
            setError(err.message)
            throw err
        } finally {
            setLoading(false)
        }
    }

    return { data, loading, error, refetch }
}

// Specific hooks for common API calls
export const useDashboardStats = () => {
    return useApi(() => apiService.getDashboardStats())
}

export const useInventoryItems = () => {
    return useApi(() => apiService.getInventoryItems())
}

export const useFoodWastageStats = () => {
    return useApi(() => apiService.getFoodWastageStats())
}

export const useProfitLossStats = () => {
    return useApi(() => apiService.getProfitLossStats())
}

export const useFinancialInsights = () => {
    return useApi(() => apiService.getFinancialInsights())
}

export const useAIWastageInsights = () => {
    return useApi(() => apiService.getAIWastageInsights())
}
