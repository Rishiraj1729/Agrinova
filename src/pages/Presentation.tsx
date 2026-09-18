import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Download, X, Presentation as PresIcon } from 'lucide-react'

type Slide = {
  kicker: string
  title: string
  body: string
  bullets?: string[]
  footer?: string
}

const slides: Slide[] = [
  {
    kicker: 'AgriNova · NCSC demo',
    title: 'Turning leftover straw into a listed lot — not a drain dump',
    body: 'A West Bengal marketplace for Madhyamgram–Barasat farmers, compost and paper desks, and ULB officers.',
    bullets: [
      'Sell straw instead of burning',
      'Match moisture-aware buyers',
      'Dual carbon credits + policy heatmap',
    ],
    footer: 'Predict · Protect · Prosper · Recycle',
  },
  {
    kicker: 'Why we built it',
    title: 'The peri-urban leftover problem',
    body: 'After paddy harvest around Madhyamgram and Barasat, straw sits wet, dumps in drains, or mixes into municipal waste. Compost pads are short of clean feedstock.',
    bullets: [
      'No pad number in the village — small lots never become a listing',
      'Wet heaps fail ≤15% biomass specs; compost-first is the working path',
      'ULB desks see mixed biodegradable lift, not utilised tonnes',
    ],
  },
  {
    kicker: 'What we built',
    title: 'One platform · four desks · one story',
    body: 'Role-separated workspaces so judges never mix farmer money with buyer procurement or DAO aggregates.',
    bullets: [
      'Farmer: plot map, sell wizard, credits, Kisan AI, learn farming',
      'Buyer: moisture specs, offers, green-tax / CSR simulator',
      'Government: pollution heatmap + operational savings',
      'Admin: pipeline, ledger, MRV queue',
    ],
  },
  {
    kicker: 'How we built it',
    title: 'Tech stack',
    body: 'A fast, judge-ready web demo — no backend required for the booth.',
    bullets: [
      'React + TypeScript + Vite',
      'Tailwind CSS — white + Indian tricolor UI',
      'Leaflet / OpenStreetMap for real geography',
      'Recharts for impact charts',
      'OpenAI (gpt-4o-mini) for Kisan AI + Policy AI + voice',
      'localStorage marketplace state (lived-in seed data)',
      'Deployed on Vercel',
    ],
  },
  {
    kicker: 'West Bengal case',
    title: 'Madhyamgram–Barasat demo cluster',
    body: 'Doorstep leftover around KV Dum Dum. Live counters update from transactions you run in the browser.',
    bullets: [
      'Ramesh Das — 3 acres, Doltala · leftover by the drain',
      'Biswajit Ghosh — Madhyamgram compost pad, clean feedstock only',
      'Rekha Sen — Barasat paper desk, drier lots',
      'Sudip Biswas — ULB desk, aggregates only (no farmer PII)',
    ],
    footer: 'Provenance labels: demonstration / model / public literature',
  },
  {
    kicker: 'Golden path',
    title: '5 minutes: list → match → pickup → credits',
    body: 'The judge journey that proves the circular economy loop.',
    bullets: [
      '1. Draw field on OSM plot map → straw estimate',
      '2. Sell wizard: moisture, pathway, expected ₹/t',
      '3. AgriNova Match Score (distance, demand, moisture fit)',
      '4. Accept offer · consolidated vs individual logistics',
      '5. Farmer credits + buyer procurement credits',
    ],
  },
  {
    kicker: 'Additional features',
    title: 'Kisan AI · soil · learning · voice',
    body: 'Beyond marketplace — tools that help farmers decide what to grow and how to manage residue.',
    bullets: [
      'KisanSathi: OpenAI chat for residue, sowing, fertiliser',
      'Soil card: pH, OC%, N — editable per session',
      'Learn farming: Happy Seeder, DSR, biochar, mulch…',
      'Voice in / voice out (browser mic + speech synthesis)',
      'Policy AI on the government desk',
    ],
  },
  {
    kicker: 'Government impact',
    title: 'Heatmap + “if AgriNova operates here”',
    body: 'Department-style portal with pollution heat layers and operational cluster savings.',
    bullets: [
      'District PM heat on a real basemap',
      'Operational sites: straw diverted, income, tCO₂e',
      'Slider: projected savings at 40–90% utilisation',
      'Before / after 70% utilisation for the 25-farm pack',
    ],
    footer: 'Not a statewide forecast — honest demo-scale models',
  },
  {
    kicker: 'Carbon story',
    title: 'Dual credits — farmer + buyer',
    body: 'Climate incentive on both sides of the trade.',
    bullets: [
      'Farmer: redeem seed / fertiliser after completed sale',
      'Buyer: procurement credits → indicative green-tax / CSR relief',
      'Ledger + MRV pages for audit narrative',
      'Labels stress: not a certified registry or legal tax opinion',
    ],
  },
  {
    kicker: 'Impact (demo cluster)',
    title: 'What changes when straw is sold',
    body: 'Compared with burning: cash for farmers, feedstock for plants, less smoke for districts.',
    bullets: [
      'Farmer income instead of ₹0 burn',
      'Avoided tCO₂e tracked per completed transaction',
      'PM index drop in utilisation projections',
      'Buyer plants get moisture-qualified supply',
    ],
  },
  {
    kicker: 'Science frame',
    title: 'Research question',
    body: 'Can an AI-assisted marketplace + soil guidance shift the default from burn → sell for smallholders in a short harvest window?',
    bullets: [
      'Hypothesis: income + match + logistics > burn habit',
      'Method: interactive simulation with lived-in seed data',
      'West Bengal case pack for comparative CRM story',
    ],
  },
  {
    kicker: 'Thank you',
    title: 'AgriNova is ready to demo',
    body: 'Login → pick a role → walk one desk. Esc closes this deck.',
    bullets: [
      'Farmer: /login → Farmer → Sell residue',
      'Government: heatmap + savings table',
      'Ask Kisan AI anything about soil or Happy Seeder',
    ],
    footer: 'Made for National Children’s Science Congress · Predict. Protect. Prosper. Recycle.',
  },
]

export default function PresentationPage() {
  const [current, setCurrent] = useState(0)
  const navigate = useNavigate()
  const slide = slides[current]

  const next = useCallback(() => setCurrent((c) => Math.min(c + 1, slides.length - 1)), [])
  const prev = useCallback(() => setCurrent((c) => Math.max(c - 1, 0)), [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        next()
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prev()
      }
      if (e.key === 'Escape') navigate('/login')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, navigate])

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-nv-page text-nv-fg">
      <div className="tri-bar" />
      <div className="flex items-center justify-between border-b border-nv-border bg-white px-5 py-3">
        <div className="flex items-center gap-2 text-xs text-nv-muted">
          <PresIcon className="h-4 w-4 text-nv-saffron" />
          <span>
            {current + 1} / {slides.length}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/AgriNova_Presentation.pdf"
            download
            className="inline-flex items-center gap-1.5 text-xs font-medium text-nv-green hover:underline"
          >
            <Download className="h-4 w-4" /> Full PDF
          </a>
          <Link to="/login" className="text-nv-muted hover:text-nv-fg" aria-label="Exit">
            <X className="h-5 w-5" />
          </Link>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-6 py-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-nv-saffron">
          {slide.kicker}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-nv-fg md:text-5xl">{slide.title}</h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-nv-muted md:text-lg">{slide.body}</p>
        {slide.bullets && (
          <ul className="mt-6 space-y-2.5">
            {slide.bullets.map((b) => (
              <li key={b} className="flex gap-3 text-sm text-nv-fg md:text-base">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-nv-green" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
        {slide.footer && (
          <p className="mt-8 text-sm font-medium text-nv-green">{slide.footer}</p>
        )}
      </div>

      <div className="border-t border-nv-border bg-white px-5 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3">
          <button
            type="button"
            onClick={prev}
            disabled={current === 0}
            className="flex items-center gap-1 text-sm text-nv-muted hover:text-nv-fg disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" /> Prev
          </button>
          <div className="flex flex-wrap justify-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === current ? 'w-6 bg-nv-green' : 'w-1.5 bg-nv-border'
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            disabled={current === slides.length - 1}
            className="flex items-center gap-1 text-sm text-nv-muted hover:text-nv-fg disabled:opacity-30"
          >
            Next <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <p className="mt-2 text-center text-[10px] text-nv-muted">← → or Space · Esc to login</p>
      </div>
    </div>
  )
}
