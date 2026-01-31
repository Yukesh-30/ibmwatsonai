// Email Service for sending donation requests and notifications
class EmailService {
    constructor() {
        this.apiEndpoint = import.meta.env.VITE_EMAIL_API_ENDPOINT || "https://api.emailjs.com/api/v1.0/email/send"
        this.serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
        this.templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
        this.publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    }

    // Initialize EmailJS (you'll need to set up EmailJS account)
    async sendDonationRequest(donationData) {
        try {
            const emailData = {
                service_id: this.serviceId,
                template_id: this.templateId,
                user_id: this.publicKey,
                template_params: {
                    to_email: donationData.partnerEmail,
                    from_name: "Smart Food Wastage Management System",
                    partner_name: donationData.partnerName,
                    restaurant_name: donationData.restaurantName || "Food Distribution Center",
                    food_items: donationData.items,
                    quantity: donationData.quantity,
                    pickup_time: donationData.pickupTime,
                    contact_person: donationData.contactPerson || "Restaurant Manager",
                    contact_phone: donationData.contactPhone || "+91 9876543210",
                    notes: donationData.notes || "No additional notes",
                    request_date: new Date().toLocaleDateString(),
                },
            }

            const response = await fetch(this.apiEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(emailData),
            })

            if (response.ok) {
                return {
                    success: true,
                    message: "Donation request sent successfully!",
                }
            } else {
                throw new Error("Failed to send email")
            }
        } catch (error) {
            console.error("Email sending error:", error)

            // Fallback: Use mailto link
            const subject = encodeURIComponent(`Food Donation Request - ${donationData.items}`)
            const body = encodeURIComponent(`
Dear ${donationData.partnerName},

We have excess food available for donation:

Food Items: ${donationData.items}
Quantity: ${donationData.quantity}
Pickup Time: ${donationData.pickupTime}
Notes: ${donationData.notes || "None"}

Please contact us to arrange pickup:
Phone: ${donationData.contactPhone || "+91 9876543210"}

Best regards,
${donationData.restaurantName || "Food Distribution Center"}
Smart Food Wastage Management System
      `)

            const mailtoLink = `mailto:${donationData.partnerEmail}?subject=${subject}&body=${body}`
            window.open(mailtoLink, "_blank")

            return {
                success: true,
                message: "Email client opened. Please send the email manually.",
                fallback: true,
            }
        }
    }

    // Send notification email
    async sendNotificationEmail(notificationData) {
        try {
            // Similar implementation for notifications
            const emailData = {
                service_id: this.serviceId,
                template_id: this.templateId,
                user_id: this.publicKey,
                template_params: {
                    to_email: notificationData.recipientEmail,
                    from_name: "Smart Food Wastage Management System",
                    subject: notificationData.subject,
                    message: notificationData.message,
                    sender_name: notificationData.senderName,
                },
            }

            const response = await fetch(this.apiEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(emailData),
            })

            return {
                success: response.ok,
                message: response.ok ? "Notification sent successfully!" : "Failed to send notification",
            }
        } catch (error) {
            console.error("Notification email error:", error)
            return {
                success: false,
                message: "Failed to send notification",
            }
        }
    }

    // Send bill via email
    async sendBillEmail(billData, recipientEmail) {
        try {
            const emailData = {
                service_id: this.serviceId,
                template_id: this.templateId,
                user_id: this.publicKey,
                template_params: {
                    to_email: recipientEmail,
                    from_name: "Smart Food Wastage Management System",
                    subject: `Invoice ${billData.invoiceNumber} - Food Distribution`,
                    invoice_number: billData.invoiceNumber,
                    agency_name: billData.agencyName,
                    total_amount: `₹${billData.total.toFixed(2)}`,
                    payment_method: billData.paymentMethod.toUpperCase(),
                    items_list: billData.cart
                        .map((item) => `${item.name} (Qty: ${item.quantity}) - ₹${(item.price * item.quantity).toFixed(2)}`)
                        .join("\n"),
                    bill_date: new Date().toLocaleDateString(),
                },
            }

            const response = await fetch(this.apiEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(emailData),
            })

            return {
                success: response.ok,
                message: response.ok ? "Bill sent via email successfully!" : "Failed to send bill",
            }
        } catch (error) {
            console.error("Bill email error:", error)
            return {
                success: false,
                message: "Failed to send bill via email",
            }
        }
    }
}

export const emailService = new EmailService()
