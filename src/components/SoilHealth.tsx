import { soilHealthCard } from '../data/farmerTools'
import { farmer } from '../data/demoData'

interface SoilHealthProps {
  onBack: () => void
}

export default function SoilHealth({ onBack }: SoilHealthProps) {
  const statusColors = {
    good: 'text-agri-green bg-agri-green/20',
    low: 'text-yellow-400 bg-yellow-500/20',
    high: 'text-red-400 bg-red-500/20',
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 animate-fade-in">
      <button type="button" onClick={onBack} className="mb-4 text-sm text-agri-muted hover:text-white">
        ← Back to Tools
      </button>

      <div className="mb-6 flex items-center gap-3">
        <span className="text-3xl">🧪</span>
        <div>
          <h1 className="text-2xl font-bold">Soil Health Card</h1>
          <p className="text-sm text-agri-muted">मृदा स्वास्थ्य कार्ड · {farmer.village}, {farmer.district}</p>
        </div>
      </div>

      <div className="mb-6 rounded-xl border border-agri-saffron/30 bg-agri-saffron/10 p-4 text-sm">
        <p className="font-medium text-agri-saffron">🇮🇳 Ministry of Agriculture — Soil Health Card Scheme</p>
        <p className="mt-1 text-agri-muted">
          Free soil testing every 2 years. Balanced fertilizer use reduces costs, improves yield,
          and cuts Scope 1 N₂O & Scope 3 fertilizer emissions.
        </p>
      </div>

      <div className="space-y-3">
        {soilHealthCard.map((s) => (
          <div key={s.param} className="rounded-xl border border-agri-border bg-agri-card p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-bold">{s.param}</p>
                <p className="text-xs text-agri-muted">{s.paramHindi}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-lg font-bold">{s.yourValue}</span>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusColors[s.status]}`}>
                  {s.status}
                </span>
              </div>
            </div>
            <p className="mt-2 text-sm text-agri-muted">📋 {s.recommendation}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-agri-green/30 bg-agri-green/5 p-4 text-sm">
        <p className="font-medium text-agri-green">Next test due: March 2026</p>
        <p className="mt-1 text-agri-muted">Book free test at your nearest Krishi Vigyan Kendra (KVK)</p>
      </div>
    </div>
  )
}
