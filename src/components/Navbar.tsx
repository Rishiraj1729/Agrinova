import type { View } from '../types'

interface NavbarProps {
  currentView: View
  onNavigate: (view: View) => void
}

const navItems: { view: View; label: string }[] = [
  { view: 'home', label: 'Home' },
  { view: 'dashboard', label: 'Dashboard' },
  { view: 'list', label: 'List Residue' },
  { view: 'equipment', label: 'Equipment' },
]

export default function Navbar({ currentView, onNavigate }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 border-b border-agri-border bg-agri-dark/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2"
        >
          <span className="text-2xl">🌾</span>
          <span className="text-xl font-bold tracking-wide text-agri-green">
            AGRINOVA
          </span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map(({ view, label }) => (
            <button
              key={view}
              type="button"
              onClick={() => onNavigate(view)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                currentView === view
                  ? 'bg-agri-green/15 text-agri-green'
                  : 'text-agri-muted hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onNavigate('list')}
          className="rounded-lg bg-agri-green px-4 py-2 text-sm font-semibold text-agri-dark transition hover:bg-agri-green-dim"
        >
          Sell Residue
        </button>
      </div>
    </nav>
  )
}
