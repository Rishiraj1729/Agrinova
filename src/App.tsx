import { useState } from 'react'
import Navbar from './components/Navbar'
import BottomNav from './components/BottomNav'
import Hero from './components/Hero'
import ProblemSection from './components/ProblemSection'
import SolutionSection from './components/SolutionSection'
import ImpactSection from './components/ImpactSection'
import HowItWorks from './components/HowItWorks'
import Dashboard from './components/Dashboard'
import FarmerTools from './components/FarmerTools'
import EmissionsTracker from './components/EmissionsTracker'
import GovSchemes from './components/GovSchemes'
import MspPrices from './components/MspPrices'
import CropCalendar from './components/CropCalendar'
import WeatherAdvisory from './components/WeatherAdvisory'
import SoilHealth from './components/SoilHealth'
import ListResidue from './components/ListResidue'
import EquipmentBooking from './components/EquipmentBooking'
import Matches from './components/Matches'
import Success from './components/Success'
import { initialListings, getBestBuyer } from './data/demoData'
import type { ResidueListing, ToolId, View } from './types'

function App() {
  const [view, setView] = useState<View>('home')
  const [listings, setListings] = useState<ResidueListing[]>(initialListings)
  const [lastPayment, setLastPayment] = useState({ amount: 0, buyer: '' })

  function navigate(v: View) {
    setView(v)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function openTool(tool: ToolId) {
    navigate(tool)
  }

  function handleListingSubmit(listing: ResidueListing) {
    setListings((prev) => [listing, ...prev])
    setLastPayment({ amount: listing.estimatedValue, buyer: listing.matchedBuyer ?? '' })
    navigate('equipment')
  }

  function handleEquipmentBooked() {
    navigate('success')
  }

  const showBottomNav = !['home', 'success'].includes(view)

  return (
    <div className="min-h-screen bg-agri-dark">
      <Navbar currentView={view} onNavigate={navigate} />

      {view === 'home' && (
        <>
          <Hero onGetStarted={() => navigate('list')} onOpenTools={() => navigate('tools')} />
          <ProblemSection />
          <SolutionSection />
          <ImpactSection />
          <HowItWorks />
          <footer className="border-t border-agri-border px-4 py-8 text-center text-sm text-agri-muted">
            <div className="tricolor-bar mx-auto mb-4 max-w-xs rounded-full" />
            <p className="font-bold text-agri-green">AGRINOVA · किसानों के लिए</p>
            <p className="mt-1">Demo version · Built to help Indian farmers earn & protect the environment</p>
          </footer>
        </>
      )}

      {view === 'dashboard' && (
        <Dashboard
          listings={listings}
          onListResidue={() => navigate('list')}
          onViewMatches={() => navigate('matches')}
          onOpenTools={() => navigate('tools')}
          onOpenEmissions={() => navigate('emissions')}
        />
      )}

      {view === 'tools' && <FarmerTools onSelectTool={openTool} />}

      {view === 'emissions' && <EmissionsTracker onBack={() => navigate('tools')} />}
      {view === 'schemes' && <GovSchemes onBack={() => navigate('tools')} />}
      {view === 'msp' && <MspPrices onBack={() => navigate('tools')} />}
      {view === 'calendar' && <CropCalendar onBack={() => navigate('tools')} />}
      {view === 'weather' && <WeatherAdvisory onBack={() => navigate('tools')} />}
      {view === 'soil' && <SoilHealth onBack={() => navigate('tools')} />}

      {view === 'list' && (
        <ListResidue
          onSubmit={handleListingSubmit}
          onCancel={() => navigate('dashboard')}
          onBookEquipment={() => navigate('equipment')}
        />
      )}

      {view === 'equipment' && (
        <EquipmentBooking
          onBooked={handleEquipmentBooked}
          onBack={() => navigate('list')}
        />
      )}

      {view === 'matches' && (
        <Matches
          onSelectBuyer={() => navigate('list')}
          onBack={() => navigate('dashboard')}
        />
      )}

      {view === 'success' && (
        <Success
          amount={lastPayment.amount || listings[0]?.estimatedValue || 9000}
          buyerName={lastPayment.buyer || getBestBuyer(10).name}
          onDashboard={() => navigate('dashboard')}
        />
      )}

      {showBottomNav && <BottomNav currentView={view} onNavigate={navigate} />}
    </div>
  )
}

export default App
