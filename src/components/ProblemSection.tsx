import { impactStats } from '../data/demoData'

export default function ProblemSection() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-red-400">
          The Problem
        </h2>
        <p className="mb-8 text-2xl font-bold md:text-3xl">
          Every year in Punjab, Haryana & Uttar Pradesh…
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              stat: impactStats.residueBurnedAnnually,
              label: 'of crop residue burned',
              icon: '🔥',
            },
            {
              stat: impactStats.harvestWindow,
              label: 'window between harvest & sowing',
              icon: '⏱️',
            },
            {
              stat: 'Default choice',
              label: 'burning — no affordable alternatives',
              icon: '💸',
            },
            {
              stat: `Up to ₹${impactStats.ngtFinePerAcre.toLocaleString('en-IN')}/acre`,
              label: 'NGT fine exposure + soil & air damage',
              icon: '⚠️',
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-agri-border bg-agri-card p-6"
            >
              <span className="text-2xl">{item.icon}</span>
              <p className="mt-3 text-xl font-bold text-white">{item.stat}</p>
              <p className="mt-1 text-agri-muted">{item.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center text-agri-muted">
          <strong className="text-red-300">Core issue:</strong> There is no
          economic incentive for farmers to stop burning.
        </p>
      </div>
    </section>
  )
}
