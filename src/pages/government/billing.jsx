"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {  FiPlus, FiMinus, FiTrash2, FiPrinter, 
  FiDownload, FiSearch, FiPackage, FiDollarSign, 
  FiCreditCard, FiCheckCircle, FiX
} from "react-icons/fi"
import { FaBarcode } from "react-icons/fa";
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"

const GovBilling = () => {
  // Product catalog
  const [products, setProducts] = useState([
    { id: "P001", name: "Rice (25kg)", barcode: "8901234567890", price: 1250.00, tax: 5, category: "Grains" },
    { id: "P002", name: "Wheat Flour (10kg)", barcode: "8901234567891", price: 450.00, tax: 5, category: "Grains" },
    { id: "P003", name: "Cooking Oil (5L)", barcode: "8901234567892", price: 650.00, tax: 18, category: "Oils" },
    { id: "P004", name: "Lentils Mix (5kg)", barcode: "8901234567893", price: 550.00, tax: 5, category: "Pulses" },
    { id: "P005", name: "Sugar (5kg)", barcode: "8901234567894", price: 250.00, tax: 5, category: "Essentials" },
    { id: "P006", name: "Salt (1kg)", barcode: "8901234567895", price: 20.00, tax: 5, category: "Essentials" },
    { id: "P007", name: "Tea Leaves (1kg)", barcode: "8901234567896", price: 300.00, tax: 18, category: "Beverages" },
    { id: "P008", name: "Milk Powder (1kg)", barcode: "8901234567897", price: 350.00, tax: 5, category: "Dairy" },
    { id: "P009", name: "Spice Mix (500g)", barcode: "8901234567898", price: 200.00, tax: 5, category: "Spices" },
    { id: "P010", name: "Vegetables Mix (5kg)", barcode: "8901234567899", price: 400.00, tax: 0, category: "Vegetables" },
  ])

  // State for cart, billing, and UI
  const [cart, setCart] = useState([])
  const [barcodeInput, setBarcodeInput] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProducts, setFilteredProducts] = useState([])
  const [showScanner, setShowScanner] = useState(false)
  const [scannerActive, setScannerActive] = useState(false)
  const [scannerResult, setScannerResult] = useState("")
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [amountPaid, setAmountPaid] = useState("")
  const [change, setChange] = useState(0)
  const [invoiceNumber, setInvoiceNumber] = useState("")
  const [agencyName, setAgencyName] = useState("")
  const [agencyContact, setAgencyContact] = useState("")
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [showInvoice, setShowInvoice] = useState(false)
  
  const barcodeInputRef = useRef(null)
  const scannerInterval = useRef(null)

  // Initialize filtered products
  useEffect(() => {
    setFilteredProducts(products)
  }, [products])

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = products.filter(
        product => 
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.barcode.includes(searchQuery)
      )
      setFilteredProducts(filtered)
    } else {
      setFilteredProducts(products)
    }
  }, [searchQuery, products])

  // Generate invoice number
  useEffect(() => {
    const date = new Date()
    const year = date.getFullYear().toString().substr(-2)
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    setInvoiceNumber(`INV-${year}${month}${day}-${random}`)
  }, [])

  // Simulate barcode scanning
  useEffect(() => {
    if (scannerActive) {
      scannerInterval.current = setInterval(() => {
        // Simulate scanning by picking a random product
        const randomIndex = Math.floor(Math.random() * products.length)
        const scannedProduct = products[randomIndex]
        setScannerResult(scannedProduct.barcode)
        addProductByBarcode(scannedProduct.barcode)
        
        // Stop after one scan for demo purposes
        setScannerActive(false)
      }, 2000)
    } else {
      clearInterval(scannerInterval.current)
    }

    return () => clearInterval(scannerInterval.current)
  }, [scannerActive, products])

  // Add product to cart by barcode
  const addProductByBarcode = (barcode) => {
    const product = products.find(p => p.barcode === barcode)
    if (product) {
      const existingItem = cart.find(item => item.id === product.id)
      if (existingItem) {
        setCart(cart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        ))
      } else {
        setCart([...cart, { ...product, quantity: 1 }])
      }
      setBarcodeInput("")
    } else {
      alert("Product not found!")
    }
  }

  // Handle barcode input submission
  const handleBarcodeSubmit = (e) => {
    e.preventDefault()
    if (barcodeInput) {
      addProductByBarcode(barcodeInput)
    }
  }

  // Add product to cart from catalog
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id)
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  // Update item quantity in cart
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      setCart(cart.filter(item => item.id !== id))
    } else {
      setCart(cart.map(item => 
        item.id === id 
          ? { ...item, quantity: newQuantity } 
          : item
      ))
    }
  }

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id))
  }

  // Calculate subtotal
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  // Calculate tax
  const calculateTax = () => {
    return cart.reduce((total, item) => {
      const itemTotal = item.price * item.quantity
      return total + (itemTotal * (item.tax / 100))
    }, 0)
  }

  // Calculate total
  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax()
  }

  // Handle payment process
  const processPayment = () => {
    if (paymentMethod === "cash" && parseFloat(amountPaid) < calculateTotal()) {
      alert("Amount paid must be greater than or equal to the total amount!")
      return
    }
    
    setPaymentComplete(true)
    setTimeout(() => {
      setShowPaymentModal(false)
      setShowInvoice(true)
    }, 2000)
  }

  // Calculate change
  useEffect(() => {
    if (paymentMethod === "cash" && amountPaid) {
      setChange(parseFloat(amountPaid) - calculateTotal())
    } else {
      setChange(0)
    }
  }, [amountPaid, paymentMethod])

  // Reset billing
  const resetBilling = () => {
    setCart([])
    setAgencyName("")
    setAgencyContact("")
    setPaymentMethod("cash")
    setAmountPaid("")
    setChange(0)
    setPaymentComplete(false)
    setShowInvoice(false)
    
    // Generate new invoice number
    const date = new Date()
    const year = date.getFullYear().toString().substr(-2)
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    setInvoiceNumber(`INV-${year}${month}${day}-${random}`)
  }

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount)
  }

  // Format date
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar role="government" />

        <main className="flex-1 ml-64 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Billing System</h1>
            <p className="text-gray-600">Manage food distribution billing and invoices</p>
          </div>

          {/* Main Billing Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Product Catalog */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="card mb-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Barcode Scanner</h3>
                  <button 
                    onClick={() => setShowScanner(!showScanner)}
                    className="btn btn-sm btn-outline"
                  >
                    {showScanner ? "Hide Scanner" : "Show Scanner"}
                  </button>
                </div>

                {showScanner && (
                  <div className="mb-4 p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                    <div className="flex flex-col items-center">
                      <div className="w-full max-w-sm h-40 bg-gray-800 rounded-lg mb-4 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          {scannerActive ? (
                            <>
                              <div className="w-full h-1 bg-red-500 absolute top-1/2 animate-pulse"></div>
                              <p className="text-white">Scanning...</p>
                            </>
                          ) : (
                            <p className="text-white">Scanner Ready</p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => setScannerActive(!scannerActive)}
                        className={`btn ${scannerActive ? 'btn-error' : 'btn-primary'} w-full max-w-sm`}
                      >
                        {scannerActive ? "Stop Scanning" : "Start Scanning"}
                      </button>
                      {scannerResult && (
                        <p className="mt-2 text-sm text-gray-600">Last scanned: {scannerResult}</p>
                      )}
                    </div>
                  </div>
                )}

                <form onSubmit={handleBarcodeSubmit} className="mb-4">
                  <div className="flex">
                    <div className="relative flex-grow">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaBarcode className="text-gray-400" />
                      </div>
                      <input
                        ref={barcodeInputRef}
                        type="text"
                        value={barcodeInput}
                        onChange={(e) => setBarcodeInput(e.target.value)}
                        className="input pl-10 w-full"
                        placeholder="Enter barcode or scan product"
                      />
                    </div>
                    <button type="submit" className="btn btn-primary ml-2">
                      Add Item
                    </button>
                  </div>
                </form>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="card"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Product Catalog</h3>
                  <div className="relative w-64">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiSearch className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="input pl-10 w-full"
                      placeholder="Search products"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th className="px-4 py-3">ID</th>
                        <th className="px-4 py-3">Product</th>
                        <th className="px-4 py-3">Category</th>
                        <th className="px-4 py-3">Price</th>
                        <th className="px-4 py-3">Tax</th>
                        <th className="px-4 py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3">{product.id}</td>
                          <td className="px-4 py-3 font-medium">{product.name}</td>
                          <td className="px-4 py-3">{product.category}</td>
                          <td className="px-4 py-3">{formatCurrency(product.price)}</td>
                          <td className="px-4 py-3">{product.tax}%</td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => addToCart(product)}
                              className="btn btn-sm btn-outline btn-success"
                            >
                              <FiPlus size={14} />
                              <span className="ml-1">Add</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Cart & Billing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card"
            >
              <h3 className="text-lg font-medium mb-4">Current Bill</h3>
              
              <div className="mb-4">
                <label className="label">Agency Name</label>
                <input
                  type="text"
                  value={agencyName}
                  onChange={(e) => setAgencyName(e.target.value)}
                  className="input w-full"
                  placeholder="Enter agency name"
                />
              </div>
              
              <div className="mb-4">
                <label className="label">Contact Number</label>
                <input
                  type="text"
                  value={agencyContact}
                  onChange={(e) => setAgencyContact(e.target.value)}
                  className="input w-full"
                  placeholder="Enter contact number"
                />
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Cart Items</h4>
                {cart.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <FiPackage className="mx-auto mb-2" size={24} />
                    <p>No items in cart</p>
                  </div>
                ) : (
                  <div className="max-h-80 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 border-b">
                        <div className="flex-1">
                          <h5 className="font-medium">{item.name}</h5>
                          <p className="text-sm text-gray-600">
                            {formatCurrency(item.price)} × {item.quantity} = {formatCurrency(item.price * item.quantity)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded-full hover:bg-gray-100"
                          >
                            <FiMinus size={14} />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-full hover:bg-gray-100"
                          >
                            <FiPlus size={14} />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 rounded-full hover:bg-gray-100 text-red-500"
                          >
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(calculateSubtotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>{formatCurrency(calculateTax())}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>{formatCurrency(calculateTotal())}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={() => setShowPaymentModal(true)}
                  disabled={cart.length === 0}
                  className="btn btn-primary w-full"
                >
                  <FiDollarSign className="mr-2" />
                  Proceed to Payment
                </button>
                <button
                  onClick={resetBilling}
                  className="btn btn-outline btn-error w-full"
                >
                  <FiTrash2 className="mr-2" />
                  Clear Bill
                </button>
              </div>
            </motion.div>
          </div>

          {/* Payment Modal */}
          {showPaymentModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-lg p-6 w-full max-w-md"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">Payment</h3>
                  <button
                    onClick={() => {
                      setShowPaymentModal(false)
                      setPaymentComplete(false)
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FiX size={20} />
                  </button>
                </div>

                {paymentComplete ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiCheckCircle className="text-green-500" size={32} />
                    </div>
                    <h4 className="text-xl font-medium text-green-600 mb-2">Payment Successful!</h4>
                    <p className="text-gray-600 mb-6">Your transaction has been completed.</p>
                    <p className="font-medium">
                      {paymentMethod === "cash" && change > 0 && (
                        <span className="block text-lg">Change: {formatCurrency(change)}</span>
                      )}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mb-4">
                      <p className="text-lg font-medium text-center mb-4">
                        Total Amount: {formatCurrency(calculateTotal())}
                      </p>
                      
                      <div className="mb-4">
                        <label className="label">Payment Method</label>
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            type="button"
                            onClick={() => setPaymentMethod("cash")}
                            className={`p-3 rounded-lg border flex flex-col items-center ${
                              paymentMethod === "cash"
                                ? "bg-blue-50 border-blue-500 text-blue-700"
                                : "border-gray-300 text-gray-700"
                            }`}
                          >
                            <FiDollarSign />
                            <span className="text-xs mt-1">Cash</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setPaymentMethod("card")}
                            className={`p-3 rounded-lg border flex flex-col items-center ${
                              paymentMethod === "card"
                                ? "bg-blue-50 border-blue-500 text-blue-700"
                                : "border-gray-300 text-gray-700"
                            }`}
                          >
                            <FiCreditCard />
                            <span className="text-xs mt-1">Card</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setPaymentMethod("upi")}
                            className={`p-3 rounded-lg border flex flex-col items-center ${
                              paymentMethod === "upi"
                                ? "bg-blue-50 border-blue-500 text-blue-700"
                                : "border-gray-300 text-gray-700"
                            }`}
                          >
                            <FiCreditCard />
                            <span className="text-xs mt-1">UPI</span>
                          </button>
                        </div>
                      </div>

                      {paymentMethod === "cash" && (
                        <div className="mb-4">
                          <label className="label">Amount Received</label>
                          <input
                            type="number"
                            value={amountPaid}
                            onChange={(e) => setAmountPaid(e.target.value)}
                            className="input w-full"
                            placeholder="Enter amount"
                            min={calculateTotal()}
                            step="0.01"
                          />
                          {parseFloat(amountPaid) >= calculateTotal() && (
                            <p className="text-sm text-green-600 mt-1">
                              Change: {formatCurrency(parseFloat(amountPaid) - calculateTotal())}
                            </p>
                          )}
                        </div>
                      )}

                      {paymentMethod === "card" && (
                        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 text-center">
                          <p className="text-gray-600 mb-2">Card Payment Simulation</p>
                          <p className="text-sm text-gray-500">
                            In a real system, this would integrate with a card payment terminal.
                          </p>
                        </div>
                      )}

                      {paymentMethod === "upi" && (
                        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 text-center">
                          <p className="text-gray-600 mb-2">UPI Payment Simulation</p>
                          <div className="w-32 h-32 mx-auto bg-white p-2 rounded-lg border mb-2">
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <span className="text-xs text-gray-600">QR Code</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500">
                            Scan with any UPI app to pay
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-3">
                      <button
                        onClick={() => setShowPaymentModal(false)}
                        className="btn btn-outline flex-1"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={processPayment}
                        className="btn btn-primary flex-1"
                        disabled={
                          paymentMethod === "cash" && 
                          (amountPaid === "" || parseFloat(amountPaid) < calculateTotal())
                        }
                      >
                        Complete Payment
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            </div>
          )}

          {/* Invoice Modal */}
          {showInvoice && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold">Invoice</h3>
                  <div className="flex space-x-2">
                    <button className="btn btn-sm btn-outline">
                      <FiPrinter className="mr-1" size={14} />
                      Print
                    </button>
                    <button className="btn btn-sm btn-outline">
                      <FiDownload className="mr-1" size={14} />
                      Download
                    </button>
                    <button
                      onClick={() => setShowInvoice(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FiX size={20} />
                    </button>
                  </div>
                </div>

                <div className="border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">Smart Food Wastage Management</h2>
                      <p className="text-gray-600">Government Food Distribution Center</p>
                      <p className="text-gray-600">123 Main Street, City</p>
                      <p className="text-gray-600">Phone: 123-456-7890</p>
                    </div>
                    <div className="text-right">
                      <h3 className="text-lg font-bold text-gray-800">INVOICE</h3>
                      <p className="text-gray-600">{invoiceNumber}</p>
                      <p className="text-gray-600">Date: {formatDate(new Date())}</p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="font-medium mb-2 text-gray-700">Bill To:</h4>
                    <p className="font-medium">{agencyName || "Guest"}</p>
                    <p className="text-gray-600">{agencyContact || "N/A"}</p>
                  </div>

                  <div className="mb-8">
                    <table className="w-full text-sm">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left">Item</th>
                          <th className="px-4 py-3 text-right">Price</th>
                          <th className="px-4 py-3 text-right">Qty</th>
                          <th className="px-4 py-3 text-right">Tax</th>
                          <th className="px-4 py-3 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((item) => (
                          <tr key={item.id} className="border-b">
                            <td className="px-4 py-3 text-left font-medium">{item.name}</td>
                            <td className="px-4 py-3 text-right">{formatCurrency(item.price)}</td>
                            <td className="px-4 py-3 text-right">{item.quantity}</td>
                            <td className="px-4 py-3 text-right">{item.tax}%</td>
                            <td className="px-4 py-3 text-right">
                              {formatCurrency(item.price * item.quantity)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-end mb-8">
                    <div className="w-64">
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">Subtotal:</span>
                        <span>{formatCurrency(calculateSubtotal())}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Tax:</span>
                        <span>{formatCurrency(calculateTax())}</span>
                      </div>
                      <div className="flex justify-between py-2 font-bold">
                        <span>Total:</span>
                        <span>{formatCurrency(calculateTotal())}</span>
                      </div>
                      <div className="flex justify-between py-2 text-green-600">
                        <span>Paid ({paymentMethod.toUpperCase()}):</span>
                        <span>{formatCurrency(calculateTotal())}</span>
                      </div>
                      {paymentMethod === "cash" && change > 0 && (
                        <div className="flex justify-between py-2 text-gray-600">
                          <span>Change:</span>
                          <span>{formatCurrency(change)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-center text-gray-600 text-sm mt-8 pt-8 border-t">
                    <p>Thank you for your business!</p>
                    <p>For any queries, please contact support@smartfoodwastage.gov</p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={resetBilling}
                    className="btn btn-primary"
                  >
                    New Bill
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default GovBilling
