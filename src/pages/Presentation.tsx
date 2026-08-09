import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

const slides = [
  { title: 'The Problem', body: '20 million tonnes of crop residue burned annually in North India.\nAir pollution, soil degradation, zero farmer income.\nNGT fines up to ₹15,000/acre.', accent: 'text-red-400' },
  { title: 'The Farmer', body: 'Rajinder Singh, 5 acres, Patiala.\n10–15 day harvest window. Burning is the default.\nNo economic incentive to stop.', accent: 'text-nv-fg' },
  { title: 'Weather Intelligence', body: 'Heavy rain warning: Nov 12.\n82% confidence. Delay harvest.\nProtect stacked residue.', accent: 'text-blue-400' },
  { title: 'Risk Alert', body: 'Rice: HIGH risk (78% confidence).\nStubble burning season overlap.\nRecommendation: List residue within 48hrs.', accent: 'text-amber-400' },
  { title: 'Market Opportunity', body: 'Rice MSP: ₹2,300/q. Mandi avg: ₹2,280/q.\nDemand index: 85/100.\nResidue can earn ₹750/t from biomass plants.', accent: 'text-nv-green' },
  { title: 'Residue Listed', body: '3 tonnes Rice Straw listed.\nLocation: Kharar, Patiala.\nPlatform searching for buyers...', accent: 'text-nv-fg' },
  { title: 'Buyer Matched', body: 'GreenPower Biomass — 87% match.\n8.2 km away. ₹750/t.\nTotal: ₹2,250 vs ₹0 from burning.', accent: 'text-nv-green' },
  { title: 'Carbon Impact', body: 'Baseline (burning): 4.5 t CO₂e\nAlternative (selling): 0.8 t CO₂e\nEstimated avoided: 3.7 t CO₂e\n\nNot a certified carbon credit.', accent: 'text-nv-green' },
  { title: 'Science', body: 'Research Question:\nCan AI + marketplace reduce burning?\n\nHypothesis: Income + alerts → sell > burn.\nDemo: 25 farmers, 10 buyers, rule-based matching.', accent: 'text-purple-400' },
  { title: 'Results', body: '₹2,250 additional farmer income.\n3.7 t CO₂e estimated avoided.\n87% buyer match confidence.\nScalable circular economy model.', accent: 'text-nv-green' },
  { title: 'Conclusion', body: 'Agrinova: Predict. Protect. Prosper. Recycle.\n\nMade by Shikha Sharma • NCSE\nNational Children\'s Science Congress', accent: 'text-nv-green' },
]

export default function PresentationPage() {
  const [current, setCurrent] = useState(0)
  const navigate = useNavigate()
  const slide = slides[current]

  const next = useCallback(() => setCurrent((c) => Math.min(c + 1, slides.length - 1)), [])
  const prev = useCallback(() => setCurrent((c) => Math.max(c - 1, 0)), [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next() }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
      if (e.key === 'Escape') navigate('/')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, navigate])

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-nv-dark">
      <div className="flex items-center justify-between px-6 py-4">
        <span className="text-xs text-nv-muted">{current + 1} / {slides.length}</span>
        <button type="button" onClick={() => navigate('/')} className="text-nv-muted hover:text-nv-fg"><X className="h-5 w-5" /></button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <h1 className={`text-4xl md:text-6xl font-semibold tracking-tight mb-8 ${slide.accent}`}>
          {slide.title}
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-nv-muted leading-relaxed whitespace-pre-line">
          {slide.body}
        </p>
      </div>

      <div className="flex items-center justify-between px-6 py-6">
        <button type="button" onClick={prev} disabled={current === 0}
          className="flex items-center gap-2 text-sm text-nv-muted hover:text-nv-fg disabled:opacity-30">
          <ChevronLeft className="h-5 w-5" /> Previous
        </button>
        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <button key={i} type="button" onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all ${i === current ? 'w-6 bg-nv-green' : 'w-1.5 bg-nv-muted/30'}`} />
          ))}
        </div>
        <button type="button" onClick={next} disabled={current === slides.length - 1}
          className="flex items-center gap-2 text-sm text-nv-muted hover:text-nv-fg disabled:opacity-30">
          Next <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <p className="text-center text-[10px] text-nv-muted pb-4">← → or Space to navigate · Esc to exit</p>
    </div>
  )
}
