import type { View } from '../types'

interface BottomNavProps {
  currentView: View
  onNavigate: (view: View) => void
}

const items: { view: View; icon: string; label: string }[] = [
  { view: 'home', icon: '🏠', label: 'Home' },
  { view: 'dashboard', icon: '📋', label: 'Dashboard' },
  { view: 'tools', icon: '🧰', label: 'Tools' },
  { view: 'list', icon: '💰', label: 'Sell' },
]

export default function BottomNav({ currentView, onNavigate }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-agri-border bg-agri-dark/95 backdrop-blur-md md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {items.map(({ view, icon, label }) => {
          const active = currentView === view || (view === 'tools' && ['emissions', 'schemes', 'msp', 'calendar', 'weather', 'soil'].includes(currentView))
          return (
            <button
              key={view}
              type="button"
              onClick={() => onNavigate(view)}
              className={`flex flex-col items-center gap-0.5 rounded-xl px-4 py-2 transition ${
                active ? 'text-agri-green' : 'text-agri-muted'
              }`}
            >
              <span className="text-xl">{icon}</span>
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
