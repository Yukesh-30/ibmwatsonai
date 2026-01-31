import jsPDF from "jspdf"
import "jspdf-autotable"

export class PDFGenerator {
    constructor() {
        this.doc = new jsPDF()
    }

    // Generate Professional Bill/Invoice PDF
    generateBillPDF(billData) {
        const doc = new jsPDF()

        // Set up colors
        const primaryColor = [34, 197, 94] // Green
        const secondaryColor = [59, 130, 246] // Blue
        const textColor = [55, 65, 81] // Gray-700
        const lightGray = [243, 244, 246] // Gray-100

        // Add company logo area (placeholder)
        doc.setFillColor(...primaryColor)
        doc.rect(20, 15, 60, 25, "F")
        doc.setTextColor(255, 255, 255)
        doc.setFontSize(16)
        doc.setFont("helvetica", "bold")
        doc.text("SFWMS", 25, 32)

        // Company Information
        doc.setTextColor(...textColor)
        doc.setFontSize(20)
        doc.setFont("helvetica", "bold")
        doc.text("Smart Food Wastage Management System", 90, 25)

        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")
        doc.text("Government Food Distribution Center", 90, 35)
        doc.text("123 Main Street, New Delhi - 110001", 90, 42)
        doc.text("Phone: +91-11-2345-6789 | Email: info@sfwms.gov.in", 90, 49)
        doc.text("GST No: 07AAACG2115R1ZN | PAN: AAACG2115R", 90, 56)

        // Invoice Header
        doc.setFillColor(...secondaryColor)
        doc.rect(140, 70, 50, 20, "F")
        doc.setTextColor(255, 255, 255)
        doc.setFontSize(16)
        doc.setFont("helvetica", "bold")
        doc.text("INVOICE", 155, 83)

        // Invoice Details Box
        doc.setDrawColor(200, 200, 200)
        doc.setLineWidth(0.5)
        doc.rect(140, 95, 50, 35)

        doc.setTextColor(...textColor)
        doc.setFontSize(9)
        doc.setFont("helvetica", "bold")
        doc.text("Invoice No:", 142, 102)
        doc.setFont("helvetica", "normal")
        doc.text(billData.invoiceNumber, 142, 108)

        doc.setFont("helvetica", "bold")
        doc.text("Date:", 142, 115)
        doc.setFont("helvetica", "normal")
        doc.text(new Date().toLocaleDateString("en-IN"), 142, 121)

        doc.setFont("helvetica", "bold")
        doc.text("Due Date:", 142, 128)
        doc.setFont("helvetica", "normal")
        const dueDate = new Date()
        dueDate.setDate(dueDate.getDate() + 30)
        doc.text(dueDate.toLocaleDateString("en-IN"), 142, 134)

        // Bill To Section
        doc.setFillColor(...lightGray)
        doc.rect(20, 95, 110, 35, "F")
        doc.setDrawColor(200, 200, 200)
        doc.rect(20, 95, 110, 35)

        doc.setTextColor(...textColor)
        doc.setFontSize(12)
        doc.setFont("helvetica", "bold")
        doc.text("BILL TO:", 25, 105)

        doc.setFontSize(11)
        doc.setFont("helvetica", "bold")
        doc.text(billData.agencyName || "Walk-in Customer", 25, 115)

        doc.setFontSize(9)
        doc.setFont("helvetica", "normal")
        if (billData.agencyContact) {
            doc.text(`Contact: ${billData.agencyContact}`, 25, 122)
        }
        if (billData.agencyEmail) {
            doc.text(`Email: ${billData.agencyEmail}`, 25, 128)
        }

        // Items Table
        const tableStartY = 145

        // Table Header
        doc.setFillColor(...primaryColor)
        doc.rect(20, tableStartY, 170, 12, "F")

        doc.setTextColor(255, 255, 255)
        doc.setFontSize(10)
        doc.setFont("helvetica", "bold")
        doc.text("S.No", 25, tableStartY + 8)
        doc.text("Item Description", 40, tableStartY + 8)
        doc.text("HSN/SAC", 105, tableStartY + 8)
        doc.text("Qty", 125, tableStartY + 8)
        doc.text("Rate", 140, tableStartY + 8)
        doc.text("Tax%", 155, tableStartY + 8)
        doc.text("Amount", 170, tableStartY + 8)

        // Table Rows
        let currentY = tableStartY + 12
        doc.setTextColor(...textColor)
        doc.setFont("helvetica", "normal")
        doc.setFontSize(9)

        billData.cart.forEach((item, index) => {
            const rowHeight = 10

            // Alternate row colors
            if (index % 2 === 0) {
                doc.setFillColor(248, 250, 252)
                doc.rect(20, currentY, 170, rowHeight, "F")
            }

            doc.setDrawColor(220, 220, 220)
            doc.line(20, currentY + rowHeight, 190, currentY + rowHeight)

            const itemTotal = item.price * item.quantity
            const hsn = this.getHSNCode(item.category)

            doc.text((index + 1).toString(), 25, currentY + 7)
            doc.text(item.name, 40, currentY + 7)
            doc.text(hsn, 105, currentY + 7)
            doc.text(item.quantity.toString(), 125, currentY + 7)
            doc.text(`₹${item.price.toFixed(2)}`, 140, currentY + 7)
            doc.text(`${item.tax}%`, 155, currentY + 7)
            doc.text(`₹${itemTotal.toFixed(2)}`, 170, currentY + 7)

            currentY += rowHeight
        })

        // Table border
        doc.setDrawColor(200, 200, 200)
        doc.setLineWidth(1)
        doc.rect(20, tableStartY, 170, currentY - tableStartY)

        // Totals Section
        const totalsStartY = currentY + 10
        const totalsBoxWidth = 70
        const totalsBoxX = 120

        // Totals Box
        doc.setFillColor(...lightGray)
        doc.rect(totalsBoxX, totalsStartY, totalsBoxWidth, 45, "F")
        doc.setDrawColor(200, 200, 200)
        doc.rect(totalsBoxX, totalsStartY, totalsBoxWidth, 45)

        doc.setTextColor(...textColor)
        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")

        // Subtotal
        doc.text("Subtotal:", totalsBoxX + 5, totalsStartY + 10)
        doc.text(`₹${billData.subtotal.toFixed(2)}`, totalsBoxX + 45, totalsStartY + 10)

        // Tax breakdown
        const taxBreakdown = this.calculateTaxBreakdown(billData.cart)
        let taxY = totalsStartY + 17

        Object.entries(taxBreakdown).forEach(([rate, amount]) => {
            if (amount > 0) {
                doc.text(`Tax @ ${rate}%:`, totalsBoxX + 5, taxY)
                doc.text(`₹${amount.toFixed(2)}`, totalsBoxX + 45, taxY)
                taxY += 7
            }
        })

        // Total
        doc.setFont("helvetica", "bold")
        doc.setFontSize(12)
        doc.text("Total Amount:", totalsBoxX + 5, totalsStartY + 38)
        doc.text(`₹${billData.total.toFixed(2)}`, totalsBoxX + 45, totalsStartY + 38)

        // Payment Information
        const paymentY = totalsStartY + 55
        doc.setFillColor(...secondaryColor)
        doc.rect(20, paymentY, 170, 20, "F")

        doc.setTextColor(255, 255, 255)
        doc.setFontSize(11)
        doc.setFont("helvetica", "bold")
        doc.text("PAYMENT INFORMATION", 25, paymentY + 8)

        doc.setTextColor(...textColor)
        doc.setFontSize(9)
        doc.setFont("helvetica", "normal")
        doc.text(`Payment Method: ${billData.paymentMethod.toUpperCase()}`, 25, paymentY + 15)
        doc.text(`Amount Paid: ₹${billData.total.toFixed(2)}`, 90, paymentY + 15)

        if (billData.paymentMethod === "cash" && billData.change > 0) {
            doc.text(`Change Given: ₹${billData.change.toFixed(2)}`, 155, paymentY + 15)
        }

        // Amount in Words
        const amountInWords = this.numberToWords(billData.total)
        doc.setFontSize(9)
        doc.setFont("helvetica", "bold")
        doc.text("Amount in Words:", 20, paymentY + 30)
        doc.setFont("helvetica", "normal")
        doc.text(`${amountInWords} Only`, 20, paymentY + 37)

        // Terms and Conditions
        const termsY = paymentY + 50
        doc.setFontSize(8)
        doc.setFont("helvetica", "bold")
        doc.text("Terms & Conditions:", 20, termsY)

        doc.setFont("helvetica", "normal")
        const terms = [
            "1. All goods sold are subject to our standard terms and conditions.",
            "2. Payment is due within 30 days of invoice date.",
            "3. Late payment charges may apply after due date.",
            "4. Goods once sold cannot be returned without prior approval.",
        ]

        terms.forEach((term, index) => {
            doc.text(term, 20, termsY + 7 + index * 5)
        })

        // Footer
        const footerY = termsY + 35
        doc.setFillColor(...primaryColor)
        doc.rect(20, footerY, 170, 15, "F")

        doc.setTextColor(255, 255, 255)
        doc.setFontSize(9)
        doc.setFont("helvetica", "bold")
        doc.text("Thank you for your business!", 25, footerY + 6)
        doc.text("For support: support@sfwms.gov.in | +91-11-2345-6789", 25, footerY + 12)

        doc.setTextColor(...textColor)
        doc.setFontSize(8)
        doc.text("This is a computer generated invoice and does not require signature.", 130, footerY + 20)

        return doc
    }

    // Helper function to get HSN codes
    getHSNCode(category) {
        const hsnCodes = {
            Grains: "1006",
            Oils: "1507",
            Pulses: "0713",
            Essentials: "1701",
            Beverages: "0902",
            Dairy: "0402",
            Spices: "0910",
            Vegetables: "0701",
        }
        return hsnCodes[category] || "9999"
    }

    // Helper function to calculate tax breakdown
    calculateTaxBreakdown(cart) {
        const breakdown = {}
        cart.forEach((item) => {
            const itemTotal = item.price * item.quantity
            const taxAmount = itemTotal * (item.tax / 100)
            if (breakdown[item.tax]) {
                breakdown[item.tax] += taxAmount
            } else {
                breakdown[item.tax] = taxAmount
            }
        })
        return breakdown
    }

    // Helper function to convert number to words
    numberToWords(num) {
        const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"]
        const teens = [
            "Ten",
            "Eleven",
            "Twelve",
            "Thirteen",
            "Fourteen",
            "Fifteen",
            "Sixteen",
            "Seventeen",
            "Eighteen",
            "Nineteen",
        ]
        const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"]

        if (num === 0) return "Zero"

        const crores = Math.floor(num / 10000000)
        const lakhs = Math.floor((num % 10000000) / 100000)
        const thousands = Math.floor((num % 100000) / 1000)
        const hundreds = Math.floor((num % 1000) / 100)
        const remainder = num % 100

        let result = ""

        if (crores > 0) {
            result += this.convertHundreds(crores) + " Crore "
        }
        if (lakhs > 0) {
            result += this.convertHundreds(lakhs) + " Lakh "
        }
        if (thousands > 0) {
            result += this.convertHundreds(thousands) + " Thousand "
        }
        if (hundreds > 0) {
            result += ones[hundreds] + " Hundred "
        }
        if (remainder > 0) {
            if (remainder < 10) {
                result += ones[remainder]
            } else if (remainder < 20) {
                result += teens[remainder - 10]
            } else {
                result += tens[Math.floor(remainder / 10)]
                if (remainder % 10 > 0) {
                    result += " " + ones[remainder % 10]
                }
            }
        }

        return result.trim() + " Rupees"
    }

    convertHundreds(num) {
        const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"]
        const teens = [
            "Ten",
            "Eleven",
            "Twelve",
            "Thirteen",
            "Fourteen",
            "Fifteen",
            "Sixteen",
            "Seventeen",
            "Eighteen",
            "Nineteen",
        ]
        const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"]

        let result = ""
        const hundreds = Math.floor(num / 100)
        const remainder = num % 100

        if (hundreds > 0) {
            result += ones[hundreds] + " Hundred "
        }

        if (remainder > 0) {
            if (remainder < 10) {
                result += ones[remainder]
            } else if (remainder < 20) {
                result += teens[remainder - 10]
            } else {
                result += tens[Math.floor(remainder / 10)]
                if (remainder % 10 > 0) {
                    result += " " + ones[remainder % 10]
                }
            }
        }

        return result.trim()
    }

    // Generate Dashboard Report PDF
    generateDashboardReport(data) {
        const doc = new jsPDF()

        // Header
        doc.setFontSize(20)
        doc.setTextColor(40, 40, 40)
        doc.text("Smart Food Wastage Management", 20, 30)
        doc.text("Dashboard Report", 20, 45)

        // Date
        doc.setFontSize(12)
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 60)

        // Statistics
        doc.setFontSize(14)
        doc.text("Key Statistics", 20, 80)

        const stats = [
            ["Total Inventory Items", data.totalInventory || "1,250"],
            ["Low Stock Items", data.lowStockItems || "15"],
            ["Revenue This Month", data.revenueThisMonth || "₹45,000"],
            ["Expenses This Month", data.expensesThisMonth || "₹32,000"],
            ["Net Profit", data.netProfit || "₹13,000"],
            ["Food Wastage %", data.foodWastagePercentage || "4.2%"],
        ]

        doc.autoTable({
            startY: 90,
            head: [["Metric", "Value"]],
            body: stats,
            theme: "grid",
            headStyles: { fillColor: [34, 197, 94] },
        })

        return doc
    }

    // Generate Inventory Report PDF
    generateInventoryReport(items, stats) {
        const doc = new jsPDF()

        // Header
        doc.setFontSize(20)
        doc.text("Inventory Report", 20, 30)
        doc.setFontSize(12)
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 45)

        // Summary Statistics
        if (stats) {
            doc.setFontSize(14)
            doc.text("Inventory Summary", 20, 65)

            const summaryData = [
                ["Total Items", stats.total_items || "0"],
                ["Total Value", `₹${stats.total_value || "0"}`],
                ["Low Stock Items", stats.low_stock_items || "0"],
                ["Expiring Soon", stats.expiring_soon || "0"],
            ]

            doc.autoTable({
                startY: 75,
                head: [["Metric", "Value"]],
                body: summaryData,
                theme: "grid",
                headStyles: { fillColor: [59, 130, 246] },
            })
        }

        // Inventory Items Table
        if (items && items.length > 0) {
            doc.setFontSize(14)
            doc.text("Inventory Items", 20, doc.lastAutoTable.finalY + 20)

            const tableData = items.map((item) => [
                item.Name || item.name,
                item.Category || item.category,
                item.Quantity || item.quantity,
                item["Quantity Type"] || item.unit || "pcs",
                item["Expiry Date"] || item.expiryDate || "N/A",
            ])

            doc.autoTable({
                startY: doc.lastAutoTable.finalY + 30,
                head: [["Name", "Category", "Quantity", "Unit", "Expiry Date"]],
                body: tableData,
                theme: "grid",
                headStyles: { fillColor: [59, 130, 246] },
            })
        }

        return doc
    }

    // Generate Profit & Loss Report PDF
    generateProfitLossReport(data) {
        const doc = new jsPDF()

        // Header
        doc.setFontSize(20)
        doc.text("Profit & Loss Report", 20, 30)
        doc.setFontSize(12)
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 45)

        // Financial Summary
        doc.setFontSize(14)
        doc.text("Financial Summary", 20, 65)

        const financialData = [
            ["Total Revenue", `₹${data["Total Revanue"] || data.totalRevenue || "0"}`],
            ["Total Expenses", `₹${data["Total Expenses"] || data.totalExpenses || "0"}`],
            ["Net Profit", `₹${data["Net Profit"] || data.netProfit || "0"}`],
            ["Profit Margin", `${data["Profit Margin"] || data.profitMargin || "0"}%`],
        ]

        doc.autoTable({
            startY: 75,
            head: [["Metric", "Amount"]],
            body: financialData,
            theme: "grid",
            headStyles: { fillColor: [16, 185, 129] },
        })

        // Revenue Breakdown
        if (data.revenue_by_category) {
            doc.setFontSize(14)
            doc.text("Revenue by Category", 20, doc.lastAutoTable.finalY + 20)

            const revenueData = Object.entries(data.revenue_by_category).map(([category, amount]) => [
                category.charAt(0).toUpperCase() + category.slice(1),
                `₹${amount}`,
            ])

            doc.autoTable({
                startY: doc.lastAutoTable.finalY + 30,
                head: [["Category", "Revenue"]],
                body: revenueData,
                theme: "grid",
                headStyles: { fillColor: [16, 185, 129] },
            })
        }

        return doc
    }

    // Generate Food Wastage Report PDF
    generateFoodWastageReport(data) {
        const doc = new jsPDF()

        // Header
        doc.setFontSize(20)
        doc.text("Food Wastage Analysis Report", 20, 30)
        doc.setFontSize(12)
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 45)

        // Wastage Summary
        doc.setFontSize(14)
        doc.text("Wastage Summary", 20, 65)

        const wastageData = [
            ["Total Wastage", `${data["Total Wastage"] || "0"} kg`],
            ["Cost Impact", `₹${data["Cost Impact"] || "0"}`],
            ["Environmental Impact", `${data["Environmental Impact"] || "0"} kg CO2`],
        ]

        doc.autoTable({
            startY: 75,
            head: [["Metric", "Value"]],
            body: wastageData,
            theme: "grid",
            headStyles: { fillColor: [239, 68, 68] },
        })

        // Wastage by Category
        if (data.Category) {
            doc.setFontSize(14)
            doc.text("Wastage by Category", 20, doc.lastAutoTable.finalY + 20)

            const categoryData = data.Category.map((item) => {
                const [category, amount] = Object.entries(item)[0]
                return [category, `${amount} kg`]
            })

            doc.autoTable({
                startY: doc.lastAutoTable.finalY + 30,
                head: [["Category", "Wastage Amount"]],
                body: categoryData,
                theme: "grid",
                headStyles: { fillColor: [239, 68, 68] },
            })
        }

        // AI Insights
        if (data["Wastage Patterns"]) {
            doc.setFontSize(14)
            doc.text("AI Insights & Recommendations", 20, doc.lastAutoTable.finalY + 20)

            let yPosition = doc.lastAutoTable.finalY + 35

            doc.setFontSize(12)
            doc.text("Key Patterns:", 20, yPosition)
            yPosition += 10

            data["Wastage Patterns"].forEach((pattern, index) => {
                doc.setFontSize(10)
                doc.text(`${index + 1}. ${pattern}`, 25, yPosition)
                yPosition += 8
            })

            yPosition += 5
            doc.setFontSize(12)
            doc.text("Recommendations:", 20, yPosition)
            yPosition += 10

            if (data.Recommendations) {
                data.Recommendations.forEach((recommendation, index) => {
                    doc.setFontSize(10)
                    doc.text(`${index + 1}. ${recommendation}`, 25, yPosition)
                    yPosition += 8
                })
            }
        }

        return doc
    }

    // Download PDF
    downloadPDF(doc, filename) {
        doc.save(`${filename}_${new Date().toISOString().split("T")[0]}.pdf`)
    }
}

export const pdfGenerator = new PDFGenerator()
