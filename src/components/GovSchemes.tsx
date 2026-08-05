import { goiSchemes, goiProblems } from '../data/goiSchemes'

interface GovSchemesProps {
  onBack: () => void
}

export default function GovSchemes({ onBack }: GovSchemesProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 animate-fade-in">
      <button type="button" onClick={onBack} className="mb-4 text-sm text-agri-muted hover:text-white">
        ← Back to Tools
      </button>

      <div className="mb-2 flex items-center gap-3">
        <span className="text-3xl">🏛️</span>
        <div>
          <h1 className="text-2xl font-bold">Government Schemes</h1>
          <p className="text-sm text-agri-muted">सरकारी योजनाएं · Problems flagged by Govt of India</p>
        </div>
      </div>

      <h2 className="mb-3 mt-8 text-lg font-bold text-orange-400">⚠️ Key Problems (GOI Alerts)</h2>
      <div className="mb-8 space-y-3">
        {goiProblems.map((p) => (
          <div key={p.id} className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-bold">{p.title}</p>
                <p className="text-sm text-agri-muted">{p.titleHindi}</p>
              </div>
              <span className="rounded-full bg-orange-500/20 px-3 py-1 text-xs font-medium text-orange-300">
                {p.source}
              </span>
            </div>
            <p className="mt-2 text-sm font-medium text-orange-200">{p.stat}</p>
            <p className="mt-1 text-sm text-agri-muted">💡 {p.hint}</p>
          </div>
        ))}
      </div>

      <h2 className="mb-3 text-lg font-bold text-agri-green">✅ Schemes You Can Apply For</h2>
      <div className="space-y-4">
        {goiSchemes.map((s) => (
          <div key={s.id} className="rounded-xl border border-agri-border bg-agri-card p-5 transition hover:border-agri-green/30">
            <div className="flex items-start gap-4">
              <span className="text-3xl">{s.icon}</span>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-lg">{s.name}</h3>
                  {s.amount && (
                    <span className="rounded-full bg-agri-green/20 px-2 py-0.5 text-xs font-bold text-agri-green">
                      {s.amount}
                    </span>
                  )}
                  <span className={`rounded-full px-2 py-0.5 text-xs ${
                    s.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {s.status === 'active' ? 'Year-round' : 'Seasonal'}
                  </span>
                </div>
                <p className="text-sm text-agri-muted">{s.nameHindi} · {s.ministry}</p>
                <p className="mt-2 text-sm"><strong>Benefit:</strong> {s.benefit}</p>
                <p className="mt-1 text-sm text-agri-muted"><strong>Solves:</strong> {s.problem}</p>
                <p className="mt-2 rounded-lg bg-agri-green/10 p-3 text-sm text-agri-green">
                  📋 {s.action}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
