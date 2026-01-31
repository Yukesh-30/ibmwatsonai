import { useState } from "react"
import { motion } from "framer-motion"
import { FiSend, FiLoader } from "react-icons/fi"

const AIIntegration = ({ onAIResponse }) => {
    const [prompt, setPrompt] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!prompt.trim()) return

        setIsLoading(true)

        // This is where you would connect to your Flask backend
        // For now, we'll simulate a response
        setTimeout(() => {
            const mockResponse = {
                prediction: "Based on historical data and current trends, I predict a 15% increase in customer traffic this weekend. Consider preparing additional portions of your popular dishes.",
                recommendations: [
                    "Increase rice preparation by 10kg",
                    "Order 5kg more vegetables for Friday",
                    "Prepare 8 additional dessert portions"
                ]
            }

            onAIResponse(mockResponse)
            setIsLoading(false)
            setPrompt("")
        }, 2000)
    }

    return (
        <div className="card">
            <h3 className="text-lg font-medium mb-4">AI Assistant</h3>
            <p className="text-gray-600 mb-4">
                Ask questions about inventory management, demand forecasting, or get recommendations to reduce food wastage.
            </p>

            <form onSubmit={handleSubmit} className="mb-4">
                <div className="flex">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Ask something about your restaurant data..."
                        className="input flex-grow"
                    />
                    <button
                        type="submit"
                        className="ml-2 btn btn-primary"
                        disabled={isLoading || !prompt.trim()}
                    >
                        {isLoading ? <FiLoader className="animate-spin" /> : <FiSend />}
                    </button>
                </div>
            </form>

            <div className="text-xs text-gray-500">
                <p>Example queries:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>"Predict customer traffic for this weekend"</li>
                    <li>"How can I reduce wastage of rice?"</li>
                    <li>"What items are likely to expire soon?"</li>
                </ul>
            </div>
        </div>
    )
}

export default AIIntegration
