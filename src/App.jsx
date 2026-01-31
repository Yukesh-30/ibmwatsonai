import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Login from "./pages/Login"
import GovDashboard from "./pages/government/Dashboard"
import GovDemandForecast from "./pages/government/DemandForecast"
import GovFoodFall from './pages/government/FoodFall'
import GovEmergencyMode from "./pages/government/EmergencyMode"
import GovProfitLoss from "./pages/government/ProfitLoss"
import GovFoodSafety from "./pages/government/FoodSafety"
import GovInventory from "./pages/government/Inventory"
import GovRedistribution from "./pages/government/Redistribution"
import GovBilling from "./pages/government/billing"
import GovStaffPerformance from "./pages/government/StaffPerformance"
import GovSettings from "./pages/government/Settings"
import RestDashboard from "./pages/restaurant/Dashboard"
import RestInventory from "./pages/restaurant/Inventory"
import RestDemandForecast from "./pages/restaurant/DemandForecast"
import RestFoodFall from "./pages/restaurant/FoodFall"
import RestProfitLoss from "./pages/restaurant/ProfitLoss"
import RestRedistribution from "./pages/restaurant/Redistribution"
import RestBilling from "./pages/restaurant/billing"
import RestStaffAttendance from "./pages/restaurant/StaffAttendance"
import RestSettings from "./pages/restaurant/Settings"
import CorpDashboard from "./pages/corporate/Dashboard"
import CorpInventory from "./pages/corporate/Inventory"
import CorpDemandForecast from "./pages/corporate/DemandForecast"
import CorpFoodFall from "./pages/corporate/FoodFall"
import CorpProfitLoss from "./pages/corporate/ProfitLoss"
import CorpRedistribution from "./pages/corporate/Redistribution"
import CorpStaffAttendance from "./pages/corporate/StaffAttendance"
import CorpSettings from "./pages/corporate/Settings"
import { AuthProvider } from "./context/AuthContext"
import Chatbot from "./components/Chatbot"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />

          {/* Government Center Routes */}
          <Route path="/government/dashboard" element={<GovDashboard />} />
          <Route path="/government/demand-forecast" element={<GovDemandForecast />} />
          <Route path="/government/food-fall" element={<GovFoodFall />} />
          <Route path="/government/emergency-mode" element={<GovEmergencyMode />} />
          <Route path="/government/profit-loss" element={<GovProfitLoss />} />
          <Route path="/government/food-safety" element={<GovFoodSafety />} />
          <Route path="/government/inventory" element={<GovInventory />} />
          <Route path="/government/redistribution" element={<GovRedistribution />} />
          <Route path="/government/billing" element={<GovBilling />} />

          <Route path="/government/staff-performance" element={<GovStaffPerformance />} />
          <Route path="/government/settings" element={<GovSettings />} />

          {/* Restaurant Routes */}
          <Route path="/restaurant/dashboard" element={<RestDashboard />} />
          <Route path="/restaurant/inventory" element={<RestInventory />} />
          <Route path="/restaurant/demand-forecast" element={<RestDemandForecast />} />
          <Route path="/restaurant/food-fall" element={<RestFoodFall />} />
          <Route path="/restaurant/profit-loss" element={<RestProfitLoss />} />
          <Route path="/restaurant/redistribution" element={<RestRedistribution />} />
          <Route path="/restaurant/billing" element={<RestBilling />} />
          <Route path="/restaurant/staff-attendance" element={<RestStaffAttendance />} />
          <Route path="/restaurant/settings" element={<RestSettings />} />

          {/* Corporate Canteen Routes*/}
          <Route path="/corporate/dashboard" element={<CorpDashboard />} />
          <Route path="/corporate/inventory" element={<CorpInventory />} />
          <Route path="/corporate/demand-forecast" element={<CorpDemandForecast />} />
          <Route path="/corporate/food-fall" element={<CorpFoodFall />} />
          <Route path="/corporate/profit-loss" element={<CorpProfitLoss />} />
          <Route path="/corporate/redistribution" element={<CorpRedistribution />} />
          <Route path="/corporate/staff-attendance" element={<CorpStaffAttendance />} />
          <Route path="/corporate/settings" element={<CorpSettings />} />
        </Routes>
        <Chatbot />
      </Router>
    </AuthProvider>
  )
}

export default App
