"use client"

import { useState } from "react"
import { pdfGenerator } from "../utils/pdfGenerator"
import apiService from "../services/api"

export const useExport = () => {
    const [isExporting, setIsExporting] = useState(false)

    const exportDashboardReport = async () => {
        setIsExporting(true)
        try {
            const data = await apiService.getDashboardStats()
            const doc = pdfGenerator.generateDashboardReport(data.data || data)
            pdfGenerator.downloadPDF(doc, "Dashboard_Report")
            return { success: true, message: "Dashboard report exported successfully!" }
        } catch (error) {
            console.error("Export error:", error)
            return { success: false, message: "Failed to export dashboard report" }
        } finally {
            setIsExporting(false)
        }
    }

    const exportInventoryReport = async () => {
        setIsExporting(true)
        try {
            const [itemsData, statsData] = await Promise.all([apiService.getInventoryItems(), apiService.getInventoryStats()])

            const doc = pdfGenerator.generateInventoryReport(
                itemsData.Items || itemsData.data || [],
                statsData.data || statsData,
            )
            pdfGenerator.downloadPDF(doc, "Inventory_Report")
            return { success: true, message: "Inventory report exported successfully!" }
        } catch (error) {
            console.error("Export error:", error)
            return { success: false, message: "Failed to export inventory report" }
        } finally {
            setIsExporting(false)
        }
    }

    const exportProfitLossReport = async () => {
        setIsExporting(true)
        try {
            const [statsData, revenueData, expenseData] = await Promise.all([
                apiService.getProfitLossStats(),
                apiService.getRevenueDetails(),
                apiService.getExpenseDetails(),
            ])

            const combinedData = {
                ...statsData,
                ...revenueData.data,
                ...expenseData.data,
            }

            const doc = pdfGenerator.generateProfitLossReport(combinedData)
            pdfGenerator.downloadPDF(doc, "Profit_Loss_Report")
            return { success: true, message: "Profit & Loss report exported successfully!" }
        } catch (error) {
            console.error("Export error:", error)
            return { success: false, message: "Failed to export profit & loss report" }
        } finally {
            setIsExporting(false)
        }
    }

    const exportFoodWastageReport = async () => {
        setIsExporting(true)
        try {
            const [statsData, categoryData, insightsData] = await Promise.all([
                apiService.getFoodWastageStats(),
                apiService.getWastageByCategory(),
                apiService.getAIWastageInsights(),
            ])

            const combinedData = {
                ...statsData,
                ...categoryData,
                ...insightsData,
            }

            const doc = pdfGenerator.generateFoodWastageReport(combinedData)
            pdfGenerator.downloadPDF(doc, "Food_Wastage_Report")
            return { success: true, message: "Food wastage report exported successfully!" }
        } catch (error) {
            console.error("Export error:", error)
            return { success: false, message: "Failed to export food wastage report" }
        } finally {
            setIsExporting(false)
        }
    }

    return {
        isExporting,
        exportDashboardReport,
        exportInventoryReport,
        exportProfitLossReport,
        exportFoodWastageReport,
    }
}
