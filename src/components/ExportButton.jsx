"use client"

import { FiDownload } from "react-icons/fi"
import { useExport } from "../hooks/useExport"

const ExportButton = ({ type, className = "", children }) => {
    const { isExporting, exportDashboardReport, exportInventoryReport, exportProfitLossReport, exportFoodWastageReport } =
        useExport()

    const handleExport = async () => {
        let result

        switch (type) {
            case "dashboard":
                result = await exportDashboardReport()
                break
            case "inventory":
                result = await exportInventoryReport()
                break
            case "profit-loss":
                result = await exportProfitLossReport()
                break
            case "food-wastage":
                result = await exportFoodWastageReport()
                break
            default:
                console.error("Unknown export type:", type)
                return
        }

        if (result.success) {
            alert(result.message)
        } else {
            alert(result.message)
        }
    }

    return (
        <button
            onClick={handleExport}
            disabled={isExporting}
            className={`btn btn-outline flex items-center gap-2 ${className}`}
        >
            <FiDownload size={16} />
            {isExporting ? "Exporting..." : children || "Export PDF"}
        </button>
    )
}

export default ExportButton
