import { Link } from 'react-router-dom'
import { ArrowRight, Leaf, Cloud, Recycle, BarChart3 } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <div className="animate-fade-in">
      <section className="mx-auto max-w-3xl py-16 text-center lg:py-24">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-nv-green">{t('app.credit')}</p>
        <h1 className="text-4xl font-semibold tracking-tight lg:text-5xl">{t('app.name')}</h1>
        <p className="mt-3 text-lg text-nv-green font-medium">{t('app.tagline')}</p>
        <p className="mx-auto mt-6 max-w-xl text-nv-muted leading-relaxed">{t('hero.subtitle')}</p>
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link to="/farmer"><Button size="lg">{t('hero.cta')} <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          <Link to="/science"><Button variant="outline" size="lg">Science & Methodology</Button></Link>
        </div>
        <p className="mt-6 text-xs text-nv-muted">{t('disclaimer.demo')}</p>
      </section>

      <section className="mx-auto max-w-5xl pb-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Cloud, title: 'Predict', desc: 'Weather & crop risk intelligence' },
            { icon: Leaf, title: 'Protect', desc: 'Early warnings & soil health' },
            { icon: BarChart3, title: 'Prosper', desc: 'Market prices & income simulation' },
            { icon: Recycle, title: 'Recycle', desc: 'Residue marketplace & carbon impact' },
          ].map(({ icon: Icon, title, desc }) => (
            <Card key={title}>
              <CardContent className="pt-5">
                <Icon className="h-5 w-5 text-nv-green mb-3" />
                <p className="font-semibold">{title}</p>
                <p className="mt-1 text-sm text-nv-muted">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl border-t border-nv-border py-16">
        <h2 className="text-center text-2xl font-semibold">Three Portals</h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {[
            { to: '/farmer', title: 'Farmer Portal', desc: 'Dashboard, weather, crops, market, residue sales, carbon impact, AI assistant' },
            { to: '/business', title: 'Business Portal', desc: 'Demand dashboard, supplier discovery, procurement, sustainability analytics' },
            { to: '/research', title: 'Research / Govt', desc: 'Resource maps, crop analytics, residue flows, impact dashboards' },
          ].map(({ to, title, desc }) => (
            <Link key={to} to={to}>
              <Card className="h-full transition hover:border-nv-green/30">
                <CardContent className="pt-5">
                  <p className="font-semibold">{title}</p>
                  <p className="mt-2 text-sm text-nv-muted">{desc}</p>
                  <span className="mt-4 inline-block text-sm text-nv-green">Explore →</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
