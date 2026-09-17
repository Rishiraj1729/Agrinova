import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'
import { LanguageToggle } from './LanguageToggle'
import { Button } from './ui/Button'

function deskFor(role: string) {
  if (role === 'buyer') return '/business'
  if (role === 'government') return '/government'
  if (role === 'admin') return '/admin'
  return '/farmer'
}

export function PublicShell() {
  const { user } = useAuth()
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-nv-fg">
      <header className="sticky top-0 z-50 border-b border-white/40 bg-[#f5f5f7]/65 backdrop-blur-2xl backdrop-saturate-150">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-nv-green to-[#3d6b54] text-[11px] font-semibold text-white shadow-[0_6px_16px_-6px_rgba(31,77,58,0.7)]">
              A
            </span>
            <span className="text-[15px] font-semibold tracking-tight">{t('app.name')}</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-nv-muted sm:flex">
            <Link to="/case-studies" className="hover:text-nv-fg">
              {t('nav.cases')}
            </Link>
            <Link to="/presentation" className="hover:text-nv-fg">
              {t('nav.presentation')}
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            {user ? (
              <Link to={deskFor(user.role)}>
                <Button size="sm">{t('nav.workspace')}</Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button size="sm">{t('nav.login')}</Button>
              </Link>
            )}
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  )
}
