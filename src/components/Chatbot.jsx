import React, { useState, useRef, useEffect } from 'react';

// If react-icons is not installed (it was in package.json), I will use simple Unicode chars for safety first, then double check package.json.
// package.json had "react-icons": "^5.5.0", so I can use it.
import { BsChatDotsFill, BsX, BsSendFill } from "react-icons/bs";


const MOCK_DATA = {
    "meta": { "location": "Chennai Zone 3", "planning_date": "2026-02-01", "mode": "NORMAL" },
    "signals": { "yesterday_meals": 740, "inventory_left_meals": 80, "weather": "clear", "event": "none", "emergency_flag": false },
    "forecast": { "predicted_meals": 733, "low": 681, "high": 784, "confidence": "high", "drivers": ["weather:clear", "event:none"] },
    "plan": {
        "prep_target_meals": 690,
        "procurement": [
            { "item": "rice_kg", "qty": 48 },
            { "item": "dal_kg", "qty": 14 },
            { "item": "veg_kg", "qty": 21 },
            { "item": "oil_l", "qty": 6 }
        ],
        "staffing_hint": "normal_plus_2"
    },
    "risk": { "waste_risk": "low", "shortage_risk": "low", "recommendation": { "action": "hold", "delta_meals": 0 }, "alerts": [] },
    "redistribution": { "triggered": true, "estimated_surplus": 37, "pickup_window": "18:00-20:00", "partner_types": ["NGO", "CommunityCenter", "School"], "message_template": "Surplus meals available for redistribution" }
};

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, sender: 'bot', type: 'text', content: 'Hello! Ask me about the food planning status.' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);

    const toggleChat = () => setIsOpen(!isOpen);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newUserMsg = { id: Date.now(), sender: 'user', type: 'text', content: inputValue };
        setMessages(prev => [...prev, newUserMsg]);
        setInputValue('');

        // Simulate bot response
        setTimeout(() => {
            const newBotMsg = {
                id: Date.now() + 1,
                sender: 'bot',
                type: 'json_response', // special type for our mock data
                content: MOCK_DATA
            };
            setMessages(prev => [...prev, newBotMsg]);
        }, 600);
    };

    const renderTable = (title, data) => {
        if (!data || typeof data !== 'object') return null;

        // Handle array of objects (like procurement)
        if (Array.isArray(data)) {
            if (data.length === 0) return <p className="text-xs text-gray-500 italic">No items</p>;
            const headers = Object.keys(data[0]);
            return (
                <div className="mb-3">
                    <p className="font-semibold text-emerald-700 text-xs mb-1 uppercase">{title}</p>
                    <div className="overflow-x-auto border border-gray-200 rounded-lg">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-gray-100">
                                <tr>
                                    {headers.map(h => <th key={h} className="p-2 border-b capitalize">{h.replace(/_/g, ' ')}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, idx) => (
                                    <tr key={idx} className="border-b last:border-0 hover:bg-gray-50">
                                        {headers.map(h => <td key={h} className="p-2">{typeof item[h] === 'object' ? JSON.stringify(item[h]) : item[h]}</td>)}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }

        // Handle key-value object
        return (
            <div className="mb-3">
                <p className="font-semibold text-emerald-700 text-xs mb-1 uppercase">{title}</p>
                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="w-full text-left text-xs">
                        <tbody>
                            {Object.entries(data).map(([key, value], idx) => {
                                // Skip complex nested arrays/objects for simple KV table, render them separately if needed
                                if (Array.isArray(value) && typeof value[0] === 'object') return null;

                                let displayValue = value;
                                if (Array.isArray(value)) displayValue = value.join(', ');
                                else if (typeof value === 'object' && value !== null) displayValue = JSON.stringify(value);
                                else if (typeof value === 'boolean') displayValue = value ? 'True' : 'False';

                                return (
                                    <tr key={idx} className="border-b last:border-0 hover:bg-gray-50">
                                        <td className="p-2 font-medium bg-gray-50 w-1/3 capitalize">{key.replace(/_/g, ' ')}</td>
                                        <td className="p-2">{displayValue}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-96 max-w-[90vw] h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col pointer-events-auto transform transition-all duration-300 origin-bottom-right">
                    {/* Header */}
                    <div className="bg-emerald-600 p-4 text-white flex justify-between items-center shadow-sm">
                        <h3 className="font-bold flex items-center gap-2">
                            <BsChatDotsFill /> Assistant
                        </h3>
                        <button onClick={toggleChat} className="hover:bg-emerald-700 p-1 rounded transition-colors text-xl">
                            <BsX />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 text-sm space-y-4">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-2xl p-3 shadow-sm ${msg.sender === 'user'
                                        ? 'bg-emerald-600 text-white rounded-br-none'
                                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                                        }`}
                                >
                                    {msg.type === 'text' ? (
                                        <p>{msg.content}</p>
                                    ) : msg.type === 'json_response' ? (
                                        <div className="flex flex-col gap-2">
                                            <p className="font-bold text-emerald-600 border-b pb-1">Analysis Report</p>

                                            {/* Render sections dynamically */}
                                            {renderTable('Signals', msg.content.signals)}
                                            {renderTable('Forecast', msg.content.forecast)}

                                            {/* Plan has mixed content, extract procurement array specifically */}
                                            {renderTable('Procurement Plan', msg.content.plan.procurement)}
                                            {/* Render other plan details as KV */}
                                            {renderTable('Plan Details', {
                                                target: msg.content.plan.prep_target_meals,
                                                staffing: msg.content.plan.staffing_hint
                                            })}

                                            {renderTable('Risk Assessment', {
                                                waste_risk: msg.content.risk.waste_risk,
                                                shortage_risk: msg.content.risk.shortage_risk,
                                                recommendation: `${msg.content.risk.recommendation.action} (${msg.content.risk.recommendation.delta_meals})`
                                            })}

                                            {renderTable('Redistribution', msg.content.redistribution)}


                                            {/* JSON View */}
                                            <details className="group mt-2">
                                                <summary className="cursor-pointer text-xs font-semibold text-gray-500 hover:text-emerald-600 transition-colors list-none flex items-center gap-1">
                                                    <span className="group-open:rotate-90 transition-transform">▸</span> Raw JSON Data
                                                </summary>
                                                <pre className="mt-2 bg-gray-900 text-green-400 p-3 rounded-lg overflow-x-auto text-[10px] leading-tight font-mono">
                                                    {JSON.stringify(msg.content, null, 2)}
                                                </pre>
                                            </details>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 flex gap-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 bg-gray-100 text-gray-800 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all border border-transparent shadow-inner"
                        />
                        <button
                            type="submit"
                            disabled={!inputValue.trim()}
                            className="bg-emerald-600 text-white p-2.5 rounded-full hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-95"
                        >
                            <BsSendFill className="text-sm pl-0.5" />
                        </button>
                    </form>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={toggleChat}
                className="pointer-events-auto bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-300"
            >
                {isOpen ? <BsX className="text-2xl" /> : <BsChatDotsFill className="text-xl" />}
            </button>
        </div>
    );
};

export default Chatbot;
