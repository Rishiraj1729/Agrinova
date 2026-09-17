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
    <div className="landing-apple relative isolate overflow-hidden">
      {/* Ambient gradient mesh */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="landing-orb landing-orb-a" />
        <div className="landing-orb landing-orb-b" />
        <div className="landing-orb landing-orb-c" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(245,245,247,0.2)_0%,rgba(245,245,247,0.75)_42%,#f5f5f7_100%)]" />
      </div>

      {/* Hero — brand first, one composition */}
      <section className="relative mx-auto max-w-5xl px-4 pb-16 pt-16 text-center sm:pb-24 sm:pt-24">
        <div className="landing-glass mx-auto inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12px] font-medium tracking-wide text-nv-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-nv-green shadow-[0_0_8px_rgba(31,77,58,0.55)]" />
          {t('landing.eyebrow')}
        </div>

        <h1 className="mt-8 font-semibold tracking-tight">
          <span className="landing-brand-gradient block text-[clamp(3rem,10vw,5.5rem)] leading-[0.95]">
            AgriNova
          </span>
          <span className="mx-auto mt-5 block max-w-3xl text-[clamp(1.35rem,3.2vw,2.05rem)] font-medium leading-[1.2] text-[#1d1d1f]/90">
            {t('landing.hero')}
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-nv-muted sm:text-[19px]">
          {t('landing.sub')}
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/login">
            <Button
              size="lg"
              className="shadow-[0_12px_40px_-12px_rgba(31,77,58,0.55)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              {t('landing.cta')}
            </Button>
          </Link>
          <Link to="/case-studies">
            <Button
              size="lg"
              variant="secondary"
              className="landing-glass border border-white/60 bg-white/50 backdrop-blur-xl hover:bg-white/70"
            >
              {t('landing.cta2')}
            </Button>
          </Link>
          <Link to="/science">
            <Button size="lg" variant="ghost" className="hover:bg-white/40">
              {t('landing.cta3')}
            </Button>
          </Link>
        </div>

        {/* Floating glass preview strip */}
        <div className="landing-glass mx-auto mt-14 grid max-w-3xl gap-3 rounded-[28px] p-3 sm:grid-cols-3 sm:p-4">
          {['List · moisture', 'Match · gate', 'Lift · credit'].map((label, i) => (
            <div
              key={label}
              className="rounded-2xl bg-white/55 px-4 py-5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-md"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <p className="text-[11px] font-medium tracking-[0.14em] text-nv-muted">0{i + 1}</p>
              <p className="mt-2 text-sm font-semibold text-nv-fg">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="relative mx-auto max-w-5xl px-4 pb-20">
        <div className="landing-glass grid overflow-hidden rounded-[32px] sm:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={s.t}
              className="border-b border-white/40 px-7 py-9 last:border-b-0 sm:border-b-0 sm:border-r sm:border-white/40 sm:last:border-r-0"
            >
              <p className="text-[11px] font-semibold tracking-[0.16em] text-nv-green/80">0{i + 1}</p>
              <h2 className="mt-3 text-[1.15rem] font-semibold tracking-tight">{t(s.t)}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-nv-muted">{t(s.d)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* India 2070 */}
      <section className="relative mx-auto max-w-5xl px-4 pb-20">
        <div className="landing-glass rounded-[36px] px-6 py-12 text-center sm:px-12 sm:py-16">
          <h2 className="text-[clamp(1.6rem,3vw,2.25rem)] font-semibold tracking-tight">{t('landing.india2070t')}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-nv-muted sm:text-[17px]">
            {t('landing.india2070b')}
          </p>
          <div className="mt-10 grid gap-4 text-left md:grid-cols-3">
            {[
              { k: 'Reduce open burning', v: 'List dry lots before the 10–15 day wheat window closes.' },
              { k: 'Stop drain dumping', v: 'Turn wet peri-urban heaps into specified compost feedstock.' },
              { k: 'Ward utilised tonnes', v: 'Officers see aggregates — never farmer phones on the screen.' },
            ].map((x) => (
              <div
                key={x.k}
                className="rounded-[24px] border border-white/50 bg-white/45 p-5 shadow-[0_8px_30px_-18px_rgba(29,29,31,0.35)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/65"
              >
                <p className="font-semibold text-nv-green">{x.k}</p>
                <p className="mt-2 text-sm leading-relaxed text-nv-muted">{x.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bridge */}
      <section className="relative mx-auto max-w-5xl px-4 pb-20">
        <h2 className="text-center text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-tight">{t('landing.bridge')}</h2>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 md:flex-row md:items-center md:gap-3">
          {['Farmer lists lot', 'Buyer match', 'Gov sees tonnes'].map((label, i) => (
            <div key={label} className="contents">
              <div className="landing-glass flex-1 rounded-[24px] px-5 py-7 text-center transition duration-300 hover:-translate-y-0.5">
                <p className="text-[11px] font-semibold tracking-[0.14em] text-nv-muted">0{i + 1}</p>
                <p className="mt-2 text-sm font-semibold">{label}</p>
              </div>
              {i < 2 && (
                <ArrowRight className="mx-auto hidden h-4 w-4 shrink-0 text-nv-muted/70 md:block" />
              )}
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-[15px] leading-relaxed text-nv-muted">
          {t('landing.wasteb')}
        </p>
      </section>

      {/* Kisan Bandhu spotlight */}
      <section className="relative mx-auto max-w-5xl px-4 pb-20">
        <div className="landing-glass-dark relative overflow-hidden rounded-[36px] px-8 py-12 text-white sm:px-12 sm:py-14">
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(154,107,50,0.45),transparent_70%)]" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(61,107,84,0.5),transparent_70%)]" />
          <div className="relative">
            <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-white/55">{t('landing.bandhu')}</p>
            <p className="mt-4 max-w-2xl text-[clamp(1.15rem,2.4vw,1.45rem)] font-medium leading-relaxed text-white/90">
              {t('landing.bandhub')}
            </p>
            <Link to="/login" className="mt-8 inline-flex">
              <Button
                size="lg"
                className="bg-white text-nv-green shadow-[0_12px_40px_-16px_rgba(0,0,0,0.45)] hover:bg-white/90"
              >
                {t('landing.cta')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="relative mx-auto max-w-5xl px-4 pb-12">
        <h2 className="text-center text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-tight">{t('landing.cases')}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <CaseCard kicker={t('landing.punjabt')} title={t('landing.punjabb')} to="/case-studies/punjab" label={t('cs.open')} />
          <CaseCard kicker={t('landing.wbt')} title={t('landing.wbb')} to="/case-studies/west-bengal" label={t('cs.open')} />
        </div>
      </section>

      {/* Roles */}
      <section className="relative mx-auto max-w-5xl px-4 pb-24">
        <h2 className="text-center text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-tight">{t('landing.roles')}</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map((r) => (
            <div
              key={r.t}
              className="landing-glass rounded-[24px] p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/70"
            >
              <p className="font-semibold tracking-tight">{t(r.t)}</p>
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
      className="landing-glass group block rounded-[28px] p-7 transition duration-300 hover:-translate-y-1 hover:bg-white/70"
    >
      <p className="text-[13px] font-semibold text-nv-green">{kicker}</p>
      <p className="mt-3 text-[15px] leading-relaxed text-nv-muted">{title}</p>
      <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-nv-fg">
        {label}{' '}
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  )
}
