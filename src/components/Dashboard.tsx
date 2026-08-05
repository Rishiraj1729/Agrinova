import { farmer, platformStats } from '../data/demoData'
import type { ResidueListing } from '../types'

interface DashboardProps {
  listings: ResidueListing[]
  onListResidue: () => void
  onViewMatches: () => void
}

export default function Dashboard({ listings, onListResidue, onViewMatches }: DashboardProps) {
  const totalEarned = listings
    .filter((l) => l.status === 'paid')
    .reduce((sum, l) => sum + l.estimatedValue, 0)
  const pending = listings.filter((l) => l.status !== 'paid').length
  const potentialEarnings = farmer.acres * 2400

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome, {farmer.name.split(' ')[0]} 👋</h1>
        <p className="mt-1 text-agri-muted">
          {farmer.village}, {farmer.district} · {farmer.acres} acres
        </p>
      </div>

      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Earned', value: `₹${totalEarned.toLocaleString('en-IN')}`, color: 'text-agri-green' },
          { label: 'Active Listings', value: String(pending), color: 'text-white' },
          { label: 'Potential This Season', value: `₹${potentialEarnings.toLocaleString('en-IN')}`, color: 'text-yellow-400' },
          { label: 'Acres Protected', value: `${farmer.acres} ac`, color: 'text-blue-400' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-agri-border bg-agri-card p-5">
            <p className="text-sm text-agri-muted">{stat.label}</p>
            <p className={`mt-2 text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mb-10 rounded-xl border border-agri-green/30 bg-agri-green/5 p-6">
        <h2 className="text-lg font-bold text-agri-green">🌍 Your Environmental Impact</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-2xl font-bold">{farmer.acres * 2.4} t</p>
            <p className="text-sm text-agri-muted">Residue saved from burning</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{farmer.acres * 4.8} t</p>
            <p className="text-sm text-agri-muted">CO₂ emissions avoided</p>
          </div>
          <div>
            <p className="text-2xl font-bold">₹0</p>
            <p className="text-sm text-agri-muted">NGT fine risk (eliminated)</p>
          </div>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">Your Listings</h2>
        <button
          type="button"
          onClick={onListResidue}
          className="rounded-lg bg-agri-green px-4 py-2 text-sm font-semibold text-agri-dark hover:bg-agri-green-dim"
        >
          + New Listing
        </button>
      </div>

      {listings.length === 0 ? (
        <div className="rounded-xl border border-dashed border-agri-border p-12 text-center">
          <p className="text-agri-muted">No listings yet. Start by listing your crop residue.</p>
          <button
            type="button"
            onClick={onListResidue}
            className="mt-4 rounded-lg bg-agri-green px-6 py-2 font-semibold text-agri-dark"
          >
            List Residue
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {listings.map((l) => (
            <div
              key={l.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-agri-border bg-agri-card p-5"
            >
              <div>
                <p className="font-bold">{l.cropType} · {l.quantity} tonnes · {l.acres} acres</p>
                <p className="text-sm text-agri-muted">{l.location} · {l.createdAt}</p>
                {l.matchedBuyer && (
                  <p className="mt-1 text-sm text-agri-green">Matched: {l.matchedBuyer}</p>
                )}
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-agri-green">
                  ₹{l.estimatedValue.toLocaleString('en-IN')}
                </span>
                <StatusBadge status={l.status} />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 rounded-xl border border-agri-border bg-agri-card p-6">
        <h2 className="mb-4 text-lg font-bold">Platform Impact (All Farmers)</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Farmers Helped', value: platformStats.farmersHelped.toLocaleString('en-IN') },
            { label: 'Tonnes Rescued', value: platformStats.tonnesRescued.toLocaleString('en-IN') },
            { label: 'CO₂ Avoided (t)', value: platformStats.co2Avoided.toLocaleString('en-IN') },
            { label: 'Total Paid Out', value: `₹${(platformStats.totalPaidOut / 100000).toFixed(1)}L` },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-xl font-bold text-agri-green">{s.value}</p>
              <p className="text-sm text-agri-muted">{s.label}</p>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={onViewMatches}
          className="mt-6 text-sm font-medium text-agri-green hover:underline"
        >
          View available buyers →
        </button>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: ResidueListing['status'] }) {
  const styles: Record<ResidueListing['status'], string> = {
    listed: 'bg-yellow-500/20 text-yellow-400',
    matched: 'bg-blue-500/20 text-blue-400',
    picked: 'bg-purple-500/20 text-purple-400',
    paid: 'bg-agri-green/20 text-agri-green',
  }
  const labels: Record<ResidueListing['status'], string> = {
    listed: 'Listed',
    matched: 'Matched',
    picked: 'Picked Up',
    paid: 'Paid ✓',
  }
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}
