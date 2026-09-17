import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import { CaseStudyProvider } from './contexts/CaseStudyContext'
import { MarketplaceProvider } from './contexts/MarketplaceContext'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { AppShell } from './components/layout/AppShell'
import { PublicShell } from './components/PublicShell'
import { ToastProvider } from './components/ui/Toast'
import LandingPage from './pages/Landing'
import LoginPage from './pages/Login'
import FarmerDashboard from './pages/farmer/Dashboard'
import WeatherPage from './pages/farmer/Weather'
import CropPage from './pages/farmer/Crop'
import RiskPage from './pages/farmer/Risk'
import MarketPage from './pages/farmer/Market'
import IncomePage from './pages/farmer/Income'
import LogisticsPage from './pages/farmer/Logistics'
import CarbonPage from './pages/farmer/Carbon'
import KisanSathiPage from './pages/farmer/KisanSathi'
import SellWizardPage from './pages/farmer/SellWizard'
import ListingsPage from './pages/farmer/Listings'
import PathwaysPage from './pages/farmer/Pathways'
import DemandPage from './pages/farmer/Demand'
import CreditsPage from './pages/farmer/Credits'
import FarmMapPage from './pages/farmer/FarmMap'
import LearnPage from './pages/farmer/Learn'
import ImpactPage from './pages/farmer/Impact'
import BusinessDashboard from './pages/business/Dashboard'
import AdminDashboard from './pages/admin/Dashboard'
import GovernmentDashboard from './pages/government/Dashboard'
import CaseStudiesHub from './pages/case-studies/Hub'
import PunjabCaseStudy from './pages/case-studies/Punjab'
import WestBengalCaseStudy from './pages/case-studies/WestBengal'
import CarbonLedgerPage from './pages/carbon/Ledger'
import MrvPage from './pages/carbon/Mrv'
import QaChecklistPage from './pages/qa/Checklist'
import GuidePage from './pages/Guide'
import ProfilesPage from './pages/Profiles'
import SciencePage from './pages/Science'
import AnalyticsPage from './pages/Analytics'
import PresentationPage from './pages/Presentation'

function RequireAuth() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return <Outlet />
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <CaseStudyProvider>
          <MarketplaceProvider>
            <ToastProvider>
              <BrowserRouter>
                <Routes>
                  <Route element={<PublicShell />}>
                    <Route index element={<LandingPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="case-studies" element={<CaseStudiesHub />} />
                    <Route path="case-studies/punjab" element={<PunjabCaseStudy />} />
                    <Route path="case-studies/west-bengal" element={<WestBengalCaseStudy />} />
                    <Route path="science" element={<SciencePage />} />
                  </Route>
                  <Route path="presentation" element={<PresentationPage />} />
                  <Route element={<RequireAuth />}>
                    <Route element={<AppShell />}>
                      <Route path="farmer" element={<FarmerDashboard />} />
                      <Route path="farmer/map" element={<FarmMapPage />} />
                      <Route path="farmer/weather" element={<WeatherPage />} />
                      <Route path="farmer/crop" element={<CropPage />} />
                      <Route path="farmer/risk" element={<RiskPage />} />
                      <Route path="farmer/market" element={<MarketPage />} />
                      <Route path="farmer/income" element={<IncomePage />} />
                      <Route path="farmer/residue" element={<Navigate to="/farmer/sell" replace />} />
                      <Route path="farmer/sell" element={<SellWizardPage />} />
                      <Route path="farmer/kisansathi" element={<KisanSathiPage />} />
                      <Route path="farmer/listings" element={<ListingsPage />} />
                      <Route path="farmer/pathways" element={<PathwaysPage />} />
                      <Route path="farmer/demand" element={<DemandPage />} />
                      <Route path="farmer/credits" element={<CreditsPage />} />
                      <Route path="farmer/learn" element={<LearnPage />} />
                      <Route path="farmer/impact" element={<ImpactPage />} />
                      <Route path="farmer/logistics" element={<LogisticsPage />} />
                      <Route path="farmer/carbon" element={<CarbonPage />} />
                      <Route path="farmer/ai" element={<Navigate to="/farmer/kisansathi" replace />} />
                      <Route path="business" element={<BusinessDashboard />} />
                      <Route path="buyer" element={<Navigate to="/business" replace />} />
                      <Route path="admin" element={<AdminDashboard />} />
                      <Route path="government" element={<GovernmentDashboard />} />
                      <Route path="research" element={<Navigate to="/government" replace />} />
                      <Route path="carbon/ledger" element={<CarbonLedgerPage />} />
                      <Route path="carbon/mrv" element={<MrvPage />} />
                      <Route path="qa/checklist" element={<QaChecklistPage />} />
                      <Route path="guide" element={<GuidePage />} />
                      <Route path="profiles" element={<ProfilesPage />} />
                      <Route path="analytics" element={<AnalyticsPage />} />
                    </Route>
                  </Route>
                </Routes>
              </BrowserRouter>
            </ToastProvider>
          </MarketplaceProvider>
        </CaseStudyProvider>
      </AuthProvider>
    </LanguageProvider>
  )
}
