import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import { AppShell } from './components/layout/AppShell'
import HomePage from './pages/Home'
import FarmerDashboard from './pages/farmer/Dashboard'
import WeatherPage from './pages/farmer/Weather'
import CropPage from './pages/farmer/Crop'
import RiskPage from './pages/farmer/Risk'
import MarketPage from './pages/farmer/Market'
import IncomePage from './pages/farmer/Income'
import ResiduePage from './pages/farmer/Residue'
import LogisticsPage from './pages/farmer/Logistics'
import CarbonPage from './pages/farmer/Carbon'
import AIPage from './pages/farmer/AI'
import BusinessDashboard from './pages/business/Dashboard'
import ResearchDashboard from './pages/research/Dashboard'
import SciencePage from './pages/Science'
import AnalyticsPage from './pages/Analytics'
import PresentationPage from './pages/Presentation'

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<HomePage />} />
            <Route path="farmer" element={<FarmerDashboard />} />
            <Route path="farmer/weather" element={<WeatherPage />} />
            <Route path="farmer/crop" element={<CropPage />} />
            <Route path="farmer/risk" element={<RiskPage />} />
            <Route path="farmer/market" element={<MarketPage />} />
            <Route path="farmer/income" element={<IncomePage />} />
            <Route path="farmer/residue" element={<ResiduePage />} />
            <Route path="farmer/logistics" element={<LogisticsPage />} />
            <Route path="farmer/carbon" element={<CarbonPage />} />
            <Route path="farmer/ai" element={<AIPage />} />
            <Route path="business" element={<BusinessDashboard />} />
            <Route path="research" element={<ResearchDashboard />} />
            <Route path="science" element={<SciencePage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
          </Route>
          <Route path="presentation" element={<PresentationPage />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}
