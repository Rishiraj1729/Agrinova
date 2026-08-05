import { weatherAdvisory } from '../data/farmerTools'

interface WeatherAdvisoryProps {
  onBack: () => void
}

export default function WeatherAdvisory({ onBack }: WeatherAdvisoryProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 animate-fade-in">
      <button type="button" onClick={onBack} className="mb-4 text-sm text-agri-muted hover:text-white">
        ← Back to Tools
      </button>

      <div className="mb-6 flex items-center gap-3">
        <span className="text-3xl">🌤️</span>
        <div>
          <h1 className="text-2xl font-bold">Weather Advisory</h1>
          <p className="text-sm text-agri-muted">मौसम सलाह · IMD-style alerts</p>
        </div>
      </div>

      <div className="mb-6 rounded-2xl border border-agri-border bg-gradient-to-br from-blue-900/30 to-agri-card p-6">
        <p className="text-sm text-agri-muted">{weatherAdvisory.location}</p>
        <div className="mt-2 flex items-end gap-4">
          <span className="text-5xl font-bold">{weatherAdvisory.temp}</span>
          <span className="mb-2 text-lg text-agri-muted">{weatherAdvisory.condition}</span>
        </div>
        <div className="mt-4 flex gap-6 text-sm text-agri-muted">
          <span>💧 Humidity: {weatherAdvisory.humidity}</span>
          <span>💨 Wind: {weatherAdvisory.wind}</span>
        </div>
      </div>

      <h2 className="mb-3 font-bold">Farming Alerts</h2>
      <div className="space-y-3">
        {weatherAdvisory.alerts.map((a) => (
          <div
            key={a.text}
            className={`rounded-xl border p-4 ${
              a.type === 'warning'
                ? 'border-red-500/30 bg-red-500/10'
                : a.type === 'info'
                  ? 'border-blue-500/30 bg-blue-500/10'
                  : 'border-agri-green/30 bg-agri-green/10'
            }`}
          >
            <p className="text-sm font-medium">{a.text}</p>
            <p className="mt-1 text-xs text-agri-muted">{a.textHindi}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
