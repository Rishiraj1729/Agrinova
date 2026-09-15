import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Cloud, Recycle, Truck, Coins, Bot, Map,
  Menu, X, BookOpen, Shield, ClipboardList, Globe, TrendingUp,
  LogOut, Sprout, UserRound, ShoppingCart, FileBarChart,
  GraduationCap, Flame, Calculator,
} from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { useAuth, type AuthRole } from '../../contexts/AuthContext'
import { Button } from '../ui/Button'
import { cn } from '../../lib/utils'
import type { Lang } from '../../types/index'

const sellerNav = [
  { to: '/farmer', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/farmer/map', icon: Map, label: 'Plot map' },
  { to: '/farmer/impact', icon: Calculator, label: 'Burn vs sell' },
  { to: '/farmer/sell', icon: Recycle, label: 'Sell residue' },
  { to: '/farmer/listings', icon: ClipboardList, label: 'My listings' },
  { to: '/farmer/credits', icon: Coins, label: 'Credits' },
  { to: '/farmer/kisansathi', icon: Bot, label: 'Kisan AI' },
  { to: '/farmer/learn', icon: GraduationCap, label: 'Learn farming' },
  { to: '/farmer/logistics', icon: Truck, label: 'Pickup' },
  { to: '/farmer/demand', icon: TrendingUp, label: 'Demand' },
  { to: '/farmer/weather', icon: Cloud, label: 'Weather' },
  { to: '/farmer/market', icon: Sprout, label: 'Mandi' },
  { to: '/carbon/ledger', icon: BookOpen, label: 'Ledger' },
]

const buyerNav = [
  { to: '/business', icon: ShoppingCart, label: 'Procurement' },
  { to: '/case-studies/punjab', icon: Globe, label: 'Punjab case' },
  { to: '/profiles', icon: UserRound, label: 'Directory' },
]

const govNav = [
  { to: '/government', icon: Flame, label: 'Air heatmap' },
  { to: '/case-studies/punjab', icon: Globe, label: 'Punjab case' },
  { to: '/profiles', icon: UserRound, label: 'Directory' },
]

const adminNav = [
  { to: '/admin', icon: Shield, label: 'Operations' },
  { to: '/carbon/ledger', icon: BookOpen, label: 'Ledger' },
  { to: '/carbon/mrv', icon: FileBarChart, label: 'MRV' },
  { to: '/case-studies/punjab', icon: Globe, label: 'Punjab case' },
  { to: '/profiles', icon: UserRound, label: 'Directory' },
]

function navFor(role: AuthRole) {
  if (role === 'buyer') return buyerNav
  if (role === 'government') return govNav
  if (role === 'admin') return adminNav
  return sellerNav
}

function homeFor(role: AuthRole) {
  if (role === 'buyer') return '/business'
  if (role === 'government') return '/government'
  if (role === 'admin') return '/admin'
  return '/farmer'
}

function roleLabel(role: AuthRole) {
  if (role === 'seller') return 'Farmer'
  if (role === 'buyer') return 'Buyer'
  if (role === 'government') return 'Government'
  return 'Admin'
}

/** Block cross-role routes so profiles never mix in one session */
function RoleGate({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) return <>{children}</>

  const path = location.pathname
  const role = user.role

  const buyerOnly = path.startsWith('/business')
  const govOnly = path.startsWith('/government')
  const adminDesk = path.startsWith('/admin')

  if (role === 'seller' && (buyerOnly || govOnly || adminDesk)) {
    return <Navigate to="/farmer" replace />
  }
  if (role === 'buyer' && (path.startsWith('/farmer') || govOnly || adminDesk)) {
    return <Navigate to="/business" replace />
  }
  if (role === 'government' && (path.startsWith('/farmer') || buyerOnly || adminDesk)) {
    return <Navigate to="/government" replace />
  }
  if (role === 'admin' && (path.startsWith('/farmer') || buyerOnly || govOnly)) {
    return <Navigate to="/admin" replace />
  }
  if ((role === 'buyer' || role === 'government') && path.startsWith('/carbon')) {
    return <Navigate to={homeFor(role)} replace />
  }

  return <>{children}</>
}

export function AppShell() {
  const { lang, setLang, t } = useLanguage()
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  if (!user) return <Outlet />

  const links = navFor(user.role)
  const deskHome = homeFor(user.role)
  const showSidebar = user.role === 'seller'

  function switchAccount() {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-nv-page">
      <div className="tri-bar sticky top-0 z-[60]" />
      <header className="sticky top-[5px] z-50 border-b border-nv-border bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          <Link to={deskHome} className="flex shrink-0 items-center gap-2.5">
            <div className="tri-mark flex h-9 w-9 items-center justify-center rounded-lg text-sm">A</div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold leading-none tracking-tight text-nv-fg">{t('app.name')}</p>
              <p className="mt-1 text-[10px] text-nv-muted">{roleLabel(user.role)} workspace</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center max-w-xl">
            {links.slice(0, 5).map(({ to, icon: Icon, label }) => {
              const active = location.pathname === to || (to !== deskHome && location.pathname.startsWith(to) && to !== '/')
              return (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition',
                    active ? 'bg-nv-green/10 font-medium text-nv-green' : 'text-nv-muted hover:bg-nv-elevated hover:text-nv-fg',
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden rounded-lg border border-nv-border bg-nv-elevated p-0.5 sm:flex">
              {(['en', 'hi', 'bn'] as Lang[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className={cn(
                    'rounded-md px-2 py-1 text-[10px] font-medium uppercase',
                    lang === l ? 'bg-white text-nv-green shadow-sm' : 'text-nv-muted',
                  )}
                >
                  {l}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-nv-border bg-white px-2.5 py-1.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-nv-saffron/20 text-xs font-semibold text-nv-credit">
                {user.displayName.split(' ').map((p) => p[0]).join('').slice(0, 2)}
              </div>
              <div className="hidden md:block min-w-0">
                <p className="text-xs font-medium truncate max-w-[110px]">{user.displayName}</p>
                <p className="text-[10px] text-nv-muted">{roleLabel(user.role)}</p>
              </div>
            </div>

            <Button size="sm" variant="ghost" onClick={switchAccount} title="Sign out to use another profile">
              <LogOut className="h-4 w-4" />
            </Button>

            <button type="button" className="lg:hidden p-2 text-nv-muted" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="space-y-1 border-b border-nv-border bg-white p-3 lg:hidden">
          {links.map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 py-2.5 px-2 rounded-lg text-sm text-nv-muted hover:text-nv-fg hover:bg-nv-elevated"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => { setMobileOpen(false); switchAccount() }}
            className="flex w-full items-center gap-2 py-2.5 px-2 text-sm text-nv-credit"
          >
            <LogOut className="h-4 w-4" /> Switch account
          </button>
        </div>
      )}

      <RoleGate>
        <div className="mx-auto flex max-w-7xl gap-0 lg:gap-8">
          {showSidebar && (
            <aside className="hidden w-56 shrink-0 border-r border-nv-border bg-white/60 lg:block">
              <div className="sticky top-16 space-y-4 p-4">
                <div className="overflow-hidden rounded-xl border border-nv-border bg-white p-3 shadow-sm">
                  <div className="tri-bar -mx-3 -mt-3 mb-3" />
                  <p className="text-[10px] uppercase tracking-wide text-nv-muted">Signed in</p>
                  <p className="mt-1 text-sm font-medium">{user.displayName}</p>
                  <p className="text-xs text-nv-muted">{user.village}, {user.district}</p>
                </div>
                <nav className="space-y-0.5 max-h-[calc(100vh-11rem)] overflow-y-auto">
                  {links.map(({ to, icon: Icon, label }) => (
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
                      <Icon className="h-4 w-4 shrink-0" />
                      {label}
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          <main className={cn('min-h-[calc(100vh-57px)] flex-1 px-4 py-6', showSidebar && 'pb-20 lg:pb-6')}>
            <Outlet />
          </main>
        </div>
      </RoleGate>

      {showSidebar && (
        <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-nv-border bg-white/95 backdrop-blur lg:hidden">
          <div className="tri-bar" />
          <div className="flex justify-around py-2">
            {sellerNav.slice(0, 5).map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  'flex flex-col items-center gap-0.5 px-1',
                  location.pathname === to ? 'text-nv-green' : 'text-nv-muted',
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[9px]">{label.split(' ')[0]}</span>
              </Link>
            ))}
          </div>
        </nav>
      )}
    </div>
  )
}
