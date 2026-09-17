import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { useLanguage } from '../contexts/LanguageContext'

const steps = [
  { t: 'landing.how1t', d: 'landing.how1' },
  { t: 'landing.how2t', d: 'landing.how2' },
  { t: 'landing.how3t', d: 'landing.how3' },
] as const

const roles = [
  { t: 'landing.farmer', d: 'landing.farmerh' },
  { t: 'landing.buyer', d: 'landing.buyerh' },
  { t: 'landing.gov', d: 'landing.govh' },
  { t: 'landing.admin', d: 'landing.adminh' },
] as const

export default function LandingPage() {
  const { t } = useLanguage()

  return (
    <div className="animate-fade-in">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(31,77,58,0.14),_transparent_55%),linear-gradient(180deg,#f7f6f2_0%,#eef3f0_45%,#f7f6f2_100%)]" />
        <div className="relative mx-auto max-w-4xl px-4 pb-14 pt-20 text-center sm:pt-28">
          <p className="text-[13px] font-medium tracking-[0.12em] text-nv-muted">{t('landing.eyebrow')}</p>
          <h1 className="mt-5 font-semibold leading-[1.08] tracking-tight text-nv-fg">
            <span className="block text-[clamp(2.6rem,8vw,4.6rem)] text-nv-green">AgriNova</span>
            <span className="mt-3 block text-[clamp(1.35rem,3.5vw,2rem)] text-nv-fg">{t('landing.hero')}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-nv-muted">{t('landing.sub')}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/login">
              <Button size="lg">{t('landing.cta')}</Button>
            </Link>
            <Link to="/case-studies">
              <Button size="lg" variant="secondary">
                {t('landing.cta2')}
              </Button>
            </Link>
            <Link to="/science">
              <Button size="lg" variant="ghost">
                {t('landing.cta3')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-px overflow-hidden rounded-3xl border border-nv-border bg-nv-border sm:grid-cols-3">
        {steps.map((s, i) => (
          <div key={s.t} className="bg-white px-7 py-8">
            <p className="text-[11px] font-medium tracking-[0.14em] text-nv-muted">0{i + 1}</p>
            <h2 className="mt-3 text-lg font-semibold">{t(s.t)}</h2>
            <p className="mt-2 text-sm leading-relaxed text-nv-muted">{t(s.d)}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-5xl px-4 py-20">
        <h2 className="text-center text-2xl font-semibold tracking-tight">{t('landing.india2070t')}</h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-[16px] leading-relaxed text-nv-muted">{t('landing.india2070b')}</p>
        <div className="mt-10 grid gap-3 md:grid-cols-3">
          {[
            { k: 'Reduce open burning', v: 'List dry lots before the 10–15 day wheat window closes.' },
            { k: 'Stop drain dumping', v: 'Turn wet peri-urban heaps into specified compost feedstock.' },
            { k: 'Ward utilised tonnes', v: 'Officers see aggregates — never farmer phones on the screen.' },
          ].map((x) => (
            <div key={x.k} className="rounded-3xl border border-nv-border bg-white p-5">
              <p className="font-semibold text-nv-green">{x.k}</p>
              <p className="mt-2 text-sm leading-relaxed text-nv-muted">{x.v}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-nv-border bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <h2 className="text-center text-2xl font-semibold tracking-tight">{t('landing.bridge')}</h2>
          <div className="mt-8 flex flex-col items-center gap-3 md:flex-row md:justify-center md:gap-2">
            {['Farmer lists lot', 'Buyer match', 'Gov sees tonnes'].map((label, i) => (
              <div key={label} className="contents">
                <div className="min-w-[160px] rounded-2xl border border-nv-border bg-nv-elevated px-5 py-6 text-center">
                  <p className="text-[11px] tracking-wide text-nv-muted">0{i + 1}</p>
                  <p className="mt-2 text-sm font-semibold">{label}</p>
                </div>
                {i < 2 && <ArrowRight className="hidden h-4 w-4 text-nv-muted md:block" />}
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-nv-muted">{t('landing.wasteb')}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-20">
        <div className="overflow-hidden rounded-[32px] border border-nv-border bg-[#10261c] p-8 text-white sm:p-10">
          <p className="text-[11px] uppercase tracking-[0.16em] text-white/60">{t('landing.bandhu')}</p>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-white/85">{t('landing.bandhub')}</p>
          <Link to="/login" className="mt-6 inline-flex">
            <Button size="lg" variant="secondary">
              {t('landing.cta')}
            </Button>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-8">
        <h2 className="text-center text-2xl font-semibold tracking-tight">{t('landing.cases')}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <CaseCard kicker={t('landing.punjabt')} title={t('landing.punjabb')} to="/case-studies/punjab" label={t('cs.open')} />
          <CaseCard kicker={t('landing.wbt')} title={t('landing.wbb')} to="/case-studies/west-bengal" label={t('cs.open')} />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-center text-2xl font-semibold tracking-tight">{t('landing.roles')}</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map((r) => (
            <div key={r.t} className="rounded-2xl border border-nv-border bg-white p-5">
              <p className="font-semibold">{t(r.t)}</p>
              <p className="mt-2 text-sm leading-relaxed text-nv-muted">{t(r.d)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function CaseCard({
  kicker,
  title,
  to,
  label,
}: {
  kicker: string
  title: string
  to: string
  label: string
}) {
  return (
    <Link
      to={to}
      className="group rounded-3xl border border-nv-border bg-white p-7 transition-colors hover:bg-[#fafafa]"
    >
      <p className="text-[13px] font-medium text-nv-green">{kicker}</p>
      <p className="mt-3 text-[15px] leading-relaxed text-nv-muted">{title}</p>
      <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-nv-fg">
        {label}{' '}
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  )
}
