import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Cloud, Recycle, Truck, Coins, Bot, Map,
  Menu, X, BookOpen, Shield, ClipboardList, Globe, TrendingUp,
  LogOut, Sprout, ShoppingCart, FileBarChart,
  GraduationCap, Flame, Calculator,
} from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { useAuth, type AuthRole } from '../../contexts/AuthContext'
import { LanguageToggle } from '../LanguageToggle'
import { Button } from '../ui/Button'
import { cn } from '../../lib/utils'

const sellerNav = [
  { to: '/farmer', icon: LayoutDashboard, labelKey: 'nav.dashboard' },
  { to: '/farmer/map', icon: Map, labelKey: 'nav.map' },
  { to: '/farmer/impact', icon: Calculator, labelKey: 'nav.impact' },
  { to: '/farmer/sell', icon: Recycle, labelKey: 'nav.sell' },
  { to: '/farmer/listings', icon: ClipboardList, labelKey: 'nav.listings' },
  { to: '/farmer/credits', icon: Coins, labelKey: 'nav.credits' },
  { to: '/farmer/kisansathi', icon: Bot, labelKey: 'nav.kisan' },
  { to: '/farmer/learn', icon: GraduationCap, labelKey: 'nav.learn' },
  { to: '/farmer/logistics', icon: Truck, labelKey: 'nav.pickup' },
  { to: '/farmer/demand', icon: TrendingUp, labelKey: 'nav.demand' },
  { to: '/farmer/weather', icon: Cloud, labelKey: 'nav.weather' },
  { to: '/farmer/market', icon: Sprout, labelKey: 'nav.mandi' },
  { to: '/carbon/ledger', icon: BookOpen, labelKey: 'nav.ledger' },
]

const buyerNav = [
  { to: '/business', icon: ShoppingCart, labelKey: 'nav.procurement' },
  { to: '/case-studies/punjab', icon: Globe, labelKey: 'nav.punjab' },
  { to: '/case-studies/west-bengal', icon: Globe, labelKey: 'nav.wb' },
]

const govNav = [
  { to: '/government', icon: Flame, labelKey: 'nav.heatmap' },
  { to: '/case-studies/punjab', icon: Globe, labelKey: 'nav.punjab' },
  { to: '/case-studies/west-bengal', icon: Globe, labelKey: 'nav.wb' },
]

const adminNav = [
  { to: '/admin', icon: Shield, labelKey: 'nav.ops' },
  { to: '/carbon/ledger', icon: BookOpen, labelKey: 'nav.ledger' },
  { to: '/carbon/mrv', icon: FileBarChart, labelKey: 'nav.mrv' },
  { to: '/case-studies/punjab', icon: Globe, labelKey: 'nav.punjab' },
  { to: '/case-studies/west-bengal', icon: Globe, labelKey: 'nav.wb' },
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

function roleLabel(role: AuthRole, t: (k: string) => string) {
  if (role === 'seller') return t('nav.farmer')
  if (role === 'buyer') return t('nav.buyer')
  if (role === 'government') return t('nav.gov')
  return t('nav.admin')
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
  const { t } = useLanguage()
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
      <header className="sticky top-0 z-50 border-b border-nv-border bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="flex shrink-0 items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-nv-green text-[11px] font-semibold text-white">A</div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold leading-none tracking-tight text-nv-fg">{t('app.name')}</p>
              <p className="mt-1 text-[10px] text-nv-muted">{roleLabel(user.role, t)}</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center max-w-xl">
            {links.slice(0, 5).map(({ to, icon: Icon, labelKey }) => {
              const active = location.pathname === to || (to !== deskHome && location.pathname.startsWith(to) && to !== '/')
              return (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition',
                    active ? 'bg-nv-green/10 font-medium text-nv-green' : 'text-nv-muted hover:bg-nv-elevated hover:text-nv-fg',
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {t(labelKey)}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <LanguageToggle className="hidden sm:flex" />

            <div className="flex items-center gap-2 rounded-full border border-nv-border bg-white px-2.5 py-1">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-nv-elevated text-[10px] font-semibold">
                {user.displayName.split(' ').map((p) => p[0]).join('').slice(0, 2)}
              </div>
              <div className="hidden md:block min-w-0">
                <p className="text-xs font-medium truncate max-w-[110px]">{user.displayName}</p>
                <p className="text-[10px] text-nv-muted">{roleLabel(user.role, t)}</p>
              </div>
            </div>

            <Button size="sm" variant="ghost" onClick={switchAccount} title={t('shell.switch')}>
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
          {links.map(({ to, icon: Icon, labelKey }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 py-2.5 px-2 rounded-lg text-sm text-nv-muted hover:text-nv-fg hover:bg-nv-elevated"
            >
              <Icon className="h-4 w-4" />
              {t(labelKey)}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => { setMobileOpen(false); switchAccount() }}
            className="flex w-full items-center gap-2 py-2.5 px-2 text-sm text-nv-muted"
          >
            <LogOut className="h-4 w-4" /> {t('shell.switch')}
          </button>
        </div>
      )}

      <RoleGate>
        <div className="mx-auto flex max-w-7xl gap-0 lg:gap-8">
          {showSidebar && (
            <aside className="hidden w-56 shrink-0 border-r border-nv-border bg-white/50 lg:block">
              <div className="sticky top-16 space-y-4 p-4">
                <div className="rounded-2xl border border-nv-border bg-white p-3">
                  <p className="text-[10px] uppercase tracking-wide text-nv-muted">{t('shell.signedin')}</p>
                  <p className="mt-1 text-sm font-medium">{user.displayName}</p>
                  <p className="text-xs text-nv-muted">{user.village}, {user.district}</p>
                </div>
                <nav className="space-y-0.5 max-h-[calc(100vh-11rem)] overflow-y-auto">
                  {links.map(({ to, icon: Icon, labelKey }) => (
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
                      {t(labelKey)}
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
          <div className="flex justify-around py-2">
            {sellerNav.slice(0, 5).map(({ to, icon: Icon, labelKey }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  'flex flex-col items-center gap-0.5 px-1',
                  location.pathname === to ? 'text-nv-green' : 'text-nv-muted',
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[9px]">{t(labelKey).split(' ')[0]}</span>
              </Link>
            ))}
          </div>
        </nav>
      )}
    </div>
  )
}
