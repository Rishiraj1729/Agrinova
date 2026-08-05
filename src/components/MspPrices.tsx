import { mspPrices } from '../data/farmerTools'

interface MspPricesProps {
  onBack: () => void
}

export default function MspPrices({ onBack }: MspPricesProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 animate-fade-in">
      <button type="button" onClick={onBack} className="mb-4 text-sm text-agri-muted hover:text-white">
        ← Back to Tools
      </button>

      <div className="mb-6 flex items-center gap-3">
        <span className="text-3xl">📈</span>
        <div>
          <h1 className="text-2xl font-bold">MSP Prices 2025-26</h1>
          <p className="text-sm text-agri-muted">न्यूनतम समर्थन मूल्य · Cabinet approved</p>
        </div>
      </div>

      <div className="mb-6 rounded-xl border border-agri-saffron/30 bg-agri-saffron/10 p-4 text-sm">
        <p className="font-medium text-agri-saffron">🇮🇳 Govt of India — DAC&FW</p>
        <p className="mt-1 text-agri-muted">
          MSP is the floor price govt agencies pay when they procure. Always check MSP before selling
          to private traders. Procurement happens at mandis via FCI & state agencies.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-agri-border">
        <div className="grid grid-cols-4 bg-agri-card px-4 py-3 text-xs font-semibold sm:text-sm">
          <span>Crop</span>
          <span>Season</span>
          <span>MSP (₹/q)</span>
          <span>Change</span>
        </div>
        {mspPrices.map((c, i) => (
          <div
            key={c.crop}
            className={`grid grid-cols-4 items-center px-4 py-4 text-sm ${
              i % 2 === 0 ? 'bg-agri-dark' : 'bg-agri-card/50'
            }`}
          >
            <div>
              <p className="font-medium">{c.crop}</p>
              <p className="text-xs text-agri-muted">{c.cropHindi}</p>
            </div>
            <span className="text-agri-muted">{c.season}</span>
            <span className="text-lg font-bold text-agri-green">₹{c.msp2025.toLocaleString('en-IN')}</span>
            <span className="text-agri-green text-sm">{c.change}</span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-xs text-agri-muted">
        Source: Cabinet Committee on Economic Affairs · Demo data for illustration
      </p>
    </div>
  )
}
