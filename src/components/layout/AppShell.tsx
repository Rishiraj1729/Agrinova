import { Link, Outlet, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Cloud, Sprout, AlertTriangle, TrendingUp,
  Calculator, Recycle, Truck, Leaf, Bot, Building2, Map, FlaskConical,
  Presentation, Home, Menu, X,
} from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { Button } from '../ui/Button'
import { cn } from '../../lib/utils'
import type { Lang } from '../../types/index'

const farmerLinks = [
  { to: '/farmer', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/farmer/weather', icon: Cloud, label: 'Weather' },
  { to: '/farmer/crop', icon: Sprout, label: 'Crop Intel' },
  { to: '/farmer/risk', icon: AlertTriangle, label: 'Risk' },
  { to: '/farmer/market', icon: TrendingUp, label: 'Market' },
  { to: '/farmer/income', icon: Calculator, label: 'Income' },
  { to: '/farmer/residue', icon: Recycle, label: 'Residue' },
  { to: '/farmer/logistics', icon: Truck, label: 'Logistics' },
  { to: '/farmer/carbon', icon: Leaf, label: 'Carbon' },
  { to: '/farmer/ai', icon: Bot, label: 'AI Assistant' },
]

const mainLinks = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/farmer', icon: LayoutDashboard, label: 'Farmer' },
  { to: '/business', icon: Building2, label: 'Business' },
  { to: '/research', icon: Map, label: 'Research' },
  { to: '/science', icon: FlaskConical, label: 'Science' },
  { to: '/presentation', icon: Presentation, label: 'Presentation' },
]

export function AppShell() {
  const { lang, setLang, t } = useLanguage()
  const location = useLocation()
  const isFarmer = location.pathname.startsWith('/farmer')
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-nv-dark">
      <header className="sticky top-0 z-50 border-b border-nv-border bg-nv-dark/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-nv-green/15 text-nv-green text-sm font-bold">N</div>
            <div>
              <p className="text-sm font-semibold tracking-tight">{t('app.name')}</p>
              <p className="text-[10px] text-nv-muted leading-none">{t('app.credit')}</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {mainLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-sm transition',
                  location.pathname === to || (to !== '/' && location.pathname.startsWith(to))
                    ? 'bg-nv-green/10 text-nv-green'
                    : 'text-nv-muted hover:text-nv-fg',
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-nv-border p-0.5">
              {(['en', 'hi', 'bn'] as Lang[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className={cn(
                    'rounded-md px-2 py-1 text-xs font-medium uppercase',
                    lang === l ? 'bg-nv-green/15 text-nv-green' : 'text-nv-muted',
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
            <Link to="/farmer/residue" className="hidden sm:block">
              <Button size="sm">{t('nav.demo')}</Button>
            </Link>
            <button type="button" className="lg:hidden p-2 text-nv-muted" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="border-b border-nv-border bg-nv-card p-4 lg:hidden">
          {mainLinks.map(({ to, label }) => (
            <Link key={to} to={to} onClick={() => setMobileOpen(false)} className="block py-2 text-sm text-nv-muted hover:text-nv-fg">
              {label}
            </Link>
          ))}
        </div>
      )}

      <div className="mx-auto flex max-w-7xl gap-0 lg:gap-8">
        {isFarmer && (
          <aside className="hidden w-52 shrink-0 border-r border-nv-border lg:block">
            <nav className="sticky top-16 space-y-0.5 p-4">
              {farmerLinks.map(({ to, icon: Icon, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition',
                    location.pathname === to
                      ? 'bg-nv-green/10 text-nv-green font-medium'
                      : 'text-nv-muted hover:text-nv-fg hover:bg-nv-muted/5',
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}
            </nav>
          </aside>
        )}

        <main className="min-h-[calc(100vh-57px)] flex-1 px-4 py-6 pb-20 lg:pb-6">
          <Outlet />
        </main>
      </div>

      {isFarmer && (
        <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-nv-border bg-nv-dark/95 backdrop-blur lg:hidden">
          <div className="flex justify-around py-2">
            {farmerLinks.slice(0, 5).map(({ to, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={cn('p-2', location.pathname === to ? 'text-nv-green' : 'text-nv-muted')}
              >
                <Icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </nav>
      )}
    </div>
  )
}
