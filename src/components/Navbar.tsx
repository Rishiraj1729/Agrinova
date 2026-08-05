import type { View } from '../types'

interface NavbarProps {
  currentView: View
  onNavigate: (view: View) => void
}

const navItems: { view: View; label: string; hindi: string }[] = [
  { view: 'home', label: 'Home', hindi: 'होम' },
  { view: 'dashboard', label: 'Dashboard', hindi: 'डैशबोर्ड' },
  { view: 'tools', label: 'Kisan Tools', hindi: 'उपकरण' },
  { view: 'list', label: 'Sell Residue', hindi: 'बेचें' },
]

const toolViews: View[] = ['emissions', 'schemes', 'msp', 'calendar', 'weather', 'soil']

export default function Navbar({ currentView, onNavigate }: NavbarProps) {
  function isActive(view: View) {
    if (view === 'tools') return currentView === 'tools' || toolViews.includes(currentView)
    return currentView === view
  }

  return (
    <>
      <div className="tricolor-bar" />
      <nav className="sticky top-0 z-50 border-b border-agri-border bg-agri-dark/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2"
          >
            <span className="text-2xl">🌾</span>
            <div className="text-left">
              <span className="text-xl font-bold tracking-wide text-agri-green">
                AGRINOVA
              </span>
              <p className="text-[10px] text-agri-muted leading-none">किसानों के लिए</p>
            </div>
          </button>

          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map(({ view, label, hindi }) => (
              <button
                key={view}
                type="button"
                onClick={() => onNavigate(view)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(view)
                    ? 'bg-agri-green/15 text-agri-green'
                    : 'text-agri-muted hover:text-white'
                }`}
              >
                <span>{label}</span>
                <span className="ml-1 text-[10px] opacity-60">{hindi}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onNavigate('list')}
            className="rounded-lg bg-agri-green px-4 py-2 text-sm font-semibold text-agri-dark transition hover:bg-agri-green-dim"
          >
            बेचें Sell
          </button>
        </div>
      </nav>
    </>
  )
}
