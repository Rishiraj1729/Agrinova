import { cropCalendar } from '../data/farmerTools'

interface CropCalendarProps {
  onBack: () => void
}

export default function CropCalendar({ onBack }: CropCalendarProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 animate-fade-in">
      <button type="button" onClick={onBack} className="mb-4 text-sm text-agri-muted hover:text-white">
        ← Back to Tools
      </button>

      <div className="mb-6 flex items-center gap-3">
        <span className="text-3xl">📅</span>
        <div>
          <h1 className="text-2xl font-bold">Crop Calendar</h1>
          <p className="text-sm text-agri-muted">फसल कैलेंडर · North India (Punjab region)</p>
        </div>
      </div>

      <div className="space-y-4">
        {cropCalendar.map((item) => (
          <div key={item.month + item.crop} className="rounded-xl border border-agri-border bg-agri-card p-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-lg bg-agri-green/20 px-3 py-1 text-sm font-bold text-agri-green">
                {item.month}
              </span>
              <span className="text-sm text-agri-muted">{item.monthHindi}</span>
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs">{item.crop}</span>
            </div>
            <h3 className="mt-3 font-bold">{item.activity}</h3>
            <p className="text-sm text-agri-muted">{item.activityHindi}</p>
            <p className="mt-2 text-sm">💡 {item.tip}</p>
            {item.goiScheme && (
              <span className="mt-2 inline-block rounded-full bg-orange-500/20 px-3 py-1 text-xs text-orange-300">
                🇮🇳 {item.goiScheme}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
