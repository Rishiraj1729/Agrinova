import { impactStats } from '../data/demoData'

const rows = [
  {
    metric: 'Residue value / acre',
    before: '₹0 (burned)',
    after: `₹${impactStats.residueValueMin.toLocaleString('en-IN')}–${impactStats.residueValueMax.toLocaleString('en-IN')}`,
  },
  {
    metric: 'NGT fine exposure',
    before: `Up to ₹${impactStats.ngtFinePerAcre.toLocaleString('en-IN')}/acre`,
    after: 'Eliminated',
  },
  {
    metric: 'Air pollution (Oct–Nov)',
    before: `${impactStats.pm25Multiplier} safe PM2.5`,
    after: 'Reduced at source',
  },
  {
    metric: 'Soil organic carbon',
    before: 'Degraded by burning',
    after: 'Preserved / improved',
  },
]

export default function ImpactSection() {
  return (
    <section id="impact" className="px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-agri-green">
          Quantified Impact
        </h2>
        <p className="mb-8 text-2xl font-bold md:text-3xl">Before vs. After Agrinova</p>

        <div className="overflow-hidden rounded-xl border border-agri-border">
          <div className="grid grid-cols-3 bg-agri-card px-4 py-3 text-sm font-semibold">
            <span>Metric</span>
            <span className="text-red-400">Before (Burning)</span>
            <span className="text-agri-green">After (Agrinova)</span>
          </div>
          {rows.map((row, i) => (
            <div
              key={row.metric}
              className={`grid grid-cols-3 px-4 py-4 text-sm ${
                i % 2 === 0 ? 'bg-agri-dark' : 'bg-agri-card/50'
              }`}
            >
              <span className="font-medium">{row.metric}</span>
              <span className="text-agri-muted">{row.before}</span>
              <span className="font-medium text-agri-green">{row.after}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-agri-green/30 bg-agri-green/10 p-6 text-center">
          <p className="text-lg">
            For a <strong className="text-agri-green">5-acre farmer</strong>:
            burning yields ₹0 and carries fine risk. Selling residue generates{' '}
            <strong className="text-agri-green">₹7,500–15,000</strong> in
            additional seasonal income — zero yield trade-off.
          </p>
        </div>
      </div>
    </section>
  )
}
