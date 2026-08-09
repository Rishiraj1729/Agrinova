import { Link } from 'react-router-dom'
import { ArrowRight, Leaf, Cloud, Recycle, BarChart3, TrendingUp, Users, Globe } from 'lucide-react'
import { AreaChart, Area, ResponsiveContainer } from 'recharts'
import { useLanguage } from '../contexts/LanguageContext'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { liveMetrics, monthlyImpact } from '../data/analyticsData'

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <div className="animate-fade-in">
      <section className="mx-auto max-w-3xl py-16 text-center lg:py-24">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-nv-green">{t('app.credit')}</p>
        <h1 className="text-4xl font-semibold tracking-tight lg:text-6xl">Agrinova</h1>
        <p className="mt-3 text-lg text-nv-green font-medium">{t('app.tagline')}</p>
        <p className="mx-auto mt-6 max-w-xl text-nv-muted leading-relaxed">{t('hero.subtitle')}</p>
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link to="/farmer"><Button size="lg">{t('hero.cta')} <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          <Link to="/analytics"><Button variant="outline" size="lg"><BarChart3 className="mr-2 h-4 w-4" /> Analytics Dashboard</Button></Link>
        </div>
        <p className="mt-6 text-xs text-nv-muted">{t('disclaimer.demo')}</p>
      </section>

      {/* Live stats ticker */}
      <section className="mx-auto max-w-5xl pb-12">
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {liveMetrics.map((m) => (
            <Card key={m.label} className="text-center border-nv-green/10 hover:border-nv-green/30 transition">
              <CardContent className="pt-4 pb-3">
                <p className="text-lg font-bold">{m.value}</p>
                <p className="text-[10px] text-nv-muted">{m.label}</p>
                <p className="text-[10px] text-nv-green">{m.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Mini chart preview */}
      <section className="mx-auto max-w-5xl pb-16">
        <Card className="border-nv-green/20 overflow-hidden">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <Badge variant="success">+86% burning reduced</Badge>
                <p className="font-semibold mt-2">Platform Impact Trend</p>
                <p className="text-sm text-nv-muted">Residue sold vs burned over 12 months (demo)</p>
              </div>
              <Link to="/analytics" className="text-sm text-nv-green hover:underline">Full analytics →</Link>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={monthlyImpact}>
                <Area type="monotone" dataKey="sold" stroke="#3ecf6e" fill="#3ecf6e" fillOpacity={0.2} />
                <Area type="monotone" dataKey="burned" stroke="#ef4444" fill="#ef4444" fillOpacity={0.15} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-5xl pb-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Cloud, title: 'Predict', desc: 'Weather & crop risk intelligence' },
            { icon: Leaf, title: 'Protect', desc: 'Early warnings & soil health' },
            { icon: TrendingUp, title: 'Prosper', desc: 'Market prices & income simulation' },
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
        <h2 className="text-center text-2xl font-semibold">Four Portals</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { to: '/farmer', title: 'Farmer', icon: Users, desc: 'Dashboard, weather, crops, market, residue, carbon, AI' },
            { to: '/business', title: 'Business', icon: TrendingUp, desc: 'Demand, suppliers, procurement, sustainability' },
            { to: '/research', title: 'Research', icon: Globe, desc: 'Maps, analytics, residue flows, impact' },
            { to: '/analytics', title: 'Analytics', icon: BarChart3, desc: '12+ charts, radar, scatter, before/after impact' },
          ].map(({ to, title, icon: Icon, desc }) => (
            <Link key={to} to={to}>
              <Card className="h-full transition hover:border-nv-green/30">
                <CardContent className="pt-5">
                  <Icon className="h-5 w-5 text-nv-green mb-2" />
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
