import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProblemSection from './components/ProblemSection'
import SolutionSection from './components/SolutionSection'
import ImpactSection from './components/ImpactSection'
import HowItWorks from './components/HowItWorks'
import Dashboard from './components/Dashboard'
import ListResidue from './components/ListResidue'
import EquipmentBooking from './components/EquipmentBooking'
import Matches from './components/Matches'
import Success from './components/Success'
import { initialListings, getBestBuyer } from './data/demoData'
import type { ResidueListing, View } from './types'

function App() {
  const [view, setView] = useState<View>('home')
  const [listings, setListings] = useState<ResidueListing[]>(initialListings)
  const [lastPayment, setLastPayment] = useState({ amount: 0, buyer: '' })

  function navigate(v: View) {
    setView(v)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleListingSubmit(listing: ResidueListing) {
    setListings((prev) => [listing, ...prev])
    setLastPayment({ amount: listing.estimatedValue, buyer: listing.matchedBuyer ?? '' })
    navigate('equipment')
  }

  function handleEquipmentBooked() {
    navigate('success')
  }

  return (
    <div className="min-h-screen bg-agri-dark">
      <Navbar currentView={view} onNavigate={navigate} />

      {view === 'home' && (
        <>
          <Hero onGetStarted={() => navigate('list')} />
          <ProblemSection />
          <SolutionSection />
          <ImpactSection />
          <HowItWorks />
          <footer className="border-t border-agri-border px-4 py-8 text-center text-sm text-agri-muted">
            <p className="font-bold text-agri-green">AGRINOVA</p>
            <p className="mt-1">Demo version · Built to help farmers earn from crop residue</p>
          </footer>
        </>
      )}

      {view === 'dashboard' && (
        <Dashboard
          listings={listings}
          onListResidue={() => navigate('list')}
          onViewMatches={() => navigate('matches')}
        />
      )}

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
    </div>
  )
}

export default App
