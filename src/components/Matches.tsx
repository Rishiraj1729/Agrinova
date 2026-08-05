import { buyers } from '../data/demoData'

interface MatchesProps {
  onSelectBuyer: (buyerId: string) => void
  onBack: () => void
}

export default function Matches({ onSelectBuyer, onBack }: MatchesProps) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 animate-fade-in">
      <h1 className="mb-2 text-2xl font-bold">Available Buyers Near You</h1>
      <p className="mb-8 text-agri-muted">
        Matched based on crop type, quantity, and distance
      </p>

      <div className="space-y-4">
        {buyers.map((b, i) => (
          <div
            key={b.id}
            className="rounded-xl border border-agri-border bg-agri-card p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                {i === 0 && (
                  <span className="mb-2 inline-block rounded-full bg-agri-green/20 px-2 py-0.5 text-xs font-semibold text-agri-green">
                    Best Match
                  </span>
                )}
                <h3 className="font-bold text-lg">{b.name}</h3>
                <p className="text-sm text-agri-muted">{b.type}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-agri-green">
                  ₹{b.pricePerTon}/tonne
                </p>
                <p className="text-sm text-agri-muted">{b.distance} km away</p>
                <p className="text-sm">⭐ {b.rating}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onSelectBuyer(b.id)}
              className="mt-4 w-full rounded-lg border border-agri-green/50 py-2 text-sm font-semibold text-agri-green transition hover:bg-agri-green/10"
            >
              Select Buyer
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onBack}
        className="mt-8 text-sm text-agri-muted hover:text-white"
      >
        ← Back to Dashboard
      </button>
    </div>
  )
}
