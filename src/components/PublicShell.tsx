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
    <div className="min-h-screen bg-nv-page text-nv-fg">
      <header className="sticky top-0 z-50 border-b border-nv-border/80 bg-[#f5f5f7]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-nv-green text-[11px] font-semibold text-white">
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
