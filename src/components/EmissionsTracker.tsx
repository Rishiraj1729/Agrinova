import { useState } from 'react'
import { emissionFactors, calculateEmissions, scopeInfo } from '../data/emissionsData'
import { farmer } from '../data/demoData'

interface EmissionsTrackerProps {
  onBack: () => void
}

export default function EmissionsTracker({ onBack }: EmissionsTrackerProps) {
  const [inputs, setInputs] = useState<Record<string, number>>({
    'stubble-burn': 0,
    'diesel-tractor': 120,
    'urea': 50,
    'electric-pump': 800,
    'fertilizer-production': 200,
    'transport': 15,
    'residue-sold': farmer.acres * 2.4,
  })

  const emissionInputs = Object.entries(inputs)
    .filter(([, qty]) => qty > 0)
    .map(([factorId, quantity]) => ({ factorId, quantity }))

  const result = calculateEmissions(emissionInputs)

  function updateInput(id: string, value: number) {
    setInputs((prev) => ({ ...prev, [id]: Math.max(0, value) }))
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 pb-24 md:pb-8 animate-fade-in">
      <button type="button" onClick={onBack} className="mb-4 text-sm text-agri-muted hover:text-white">
        ← Back to Tools
      </button>

      <div className="mb-2 flex items-center gap-3">
        <span className="text-3xl">📊</span>
        <div>
          <h1 className="text-2xl font-bold">Farm Emissions Tracker</h1>
          <p className="text-sm text-agri-muted">उत्सर्जन ट्रैकर · Scope 1, 2 & 3</p>
        </div>
      </div>

      <div className="mb-6 rounded-xl border border-orange-500/30 bg-orange-500/10 p-4 text-sm">
        <p className="font-medium text-orange-300">🇮🇳 Govt of India Context</p>
        <p className="mt-1 text-agri-muted">
          India committed to net-zero by 2070. Agriculture contributes ~14% of national GHG emissions.
          CPCB & CAQM track stubble burning via satellites. Reducing Scope 1 burning protects you from NGT fines.
        </p>
      </div>

      <div className="mb-8 grid gap-3 sm:grid-cols-3">
        {scopeInfo.map((s) => (
          <div key={s.scope} className={`rounded-xl border p-4 ${s.bg}`}>
            <p className={`text-xs font-bold uppercase ${s.color}`}>{s.title}</p>
            <p className="mt-1 text-xs text-agri-muted">{s.titleHindi}</p>
            <p className="mt-2 text-2xl font-bold">
              {((s.scope === 1 ? result.scope1 : s.scope === 2 ? result.scope2 : result.scope3) / 1000).toFixed(2)}
              <span className="text-sm font-normal text-agri-muted"> t CO₂e</span>
            </p>
          </div>
        ))}
      </div>

      <div className="mb-6 rounded-xl border border-agri-green/30 bg-agri-green/5 p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-agri-muted">Net Farm Emissions</p>
            <p className="text-3xl font-bold text-agri-green">{(result.net / 1000).toFixed(2)} t CO₂e</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-agri-muted">Avoided (residue sold)</p>
            <p className="text-xl font-bold text-agri-green">-{(result.avoided / 1000).toFixed(2)} t</p>
          </div>
        </div>
      </div>

      <h2 className="mb-4 text-lg font-bold">Adjust Your Farm Inputs</h2>
      <div className="space-y-4">
        {emissionFactors.map((f) => (
          <div key={f.id} className="rounded-xl border border-agri-border bg-agri-card p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`rounded px-2 py-0.5 text-xs font-bold ${
                    f.scope === 1 ? 'bg-red-500/20 text-red-400' :
                    f.scope === 2 ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    Scope {f.scope}
                  </span>
                  <span className="font-medium">{f.label}</span>
                </div>
                <p className="text-xs text-agri-muted">{f.labelHindi} · {f.unit}</p>
              </div>
              <input
                type="number"
                min={0}
                value={inputs[f.id] ?? 0}
                onChange={(e) => updateInput(f.id, Number(e.target.value))}
                className="w-24 rounded-lg border border-agri-border bg-agri-dark px-3 py-2 text-right font-mono focus:border-agri-green focus:outline-none"
              />
            </div>
            {f.goiNote && (
              <p className="mt-2 text-xs text-orange-300/80">🇮🇳 {f.goiNote}</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-agri-border bg-agri-card p-5">
        <h3 className="mb-3 font-bold">How to Reduce Emissions</h3>
        <ul className="space-y-2 text-sm text-agri-muted">
          <li>✅ Sell residue on Agrinova → avoids Scope 1 burning + earns income</li>
          <li>✅ PM-KUSUM solar pump → cuts Scope 2 electricity emissions</li>
          <li>✅ Soil Health Card → right fertilizer dose reduces Scope 1 N₂O & Scope 3</li>
          <li>✅ Happy Seeder zero-till → less diesel (Scope 1) + no burning</li>
        </ul>
      </div>
    </div>
  )
}
