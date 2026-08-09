import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { DonutChart } from '../../components/charts/DonutChart'
import { buyers, residueListings, transactions, platformStats } from '../../data/agrinovaData'
import { formatINR } from '../../lib/utils'

const demandData = buyers.map((b) => ({ name: b.name.split(' ')[0], demand: b.demandTonnes }))
const procurementMix = demandData.slice(0, 5).map((d, i) => ({
  name: d.name,
  value: d.demand,
  fill: ['#3ecf6e', '#4ade80', '#22c55e', '#3b82f6', '#eab308'][i],
}))

export default function BusinessDashboard() {
  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Business Portal</h1>
        <p className="text-sm text-nv-muted">Demand dashboard · Supplier discovery · Sustainability analytics</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Active Demand', value: `${buyers.reduce((s, b) => s + b.demandTonnes, 0)}t` },
          { label: 'Suppliers', value: String(platformStats.totalFarmers) },
          { label: 'Transactions', value: String(transactions.length) },
        ].map(({ label, value }) => (
          <Card key={label}><CardContent className="pt-5"><p className="text-xs text-nv-muted">{label}</p><p className="text-2xl font-semibold mt-1">{value}</p></CardContent></Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Residue Demand by Buyer (Demo)</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={demandData}>
                <XAxis dataKey="name" stroke="#7a8f7a" fontSize={10} />
                <YAxis stroke="#7a8f7a" fontSize={10} />
                <Tooltip contentStyle={{ background: '#111611', border: '1px solid #1e2a1e', borderRadius: 8 }} />
                <Bar dataKey="demand" fill="#3ecf6e" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Procurement Mix</CardTitle></CardHeader>
          <CardContent>
            <DonutChart
              data={procurementMix.map((d) => ({
                name: d.name,
                value: Math.round((d.value / procurementMix.reduce((s, x) => s + x.value, 0)) * 100),
                fill: d.fill,
              }))}
              height={280}
            />
          </CardContent>
        </Card>
      </div>

      <h2 className="text-lg font-medium">Supplier Discovery</h2>
      <div className="space-y-3">
        {residueListings.filter((l) => l.status === 'listed').slice(0, 5).map((l) => (
          <Card key={l.id}>
            <CardContent className="flex justify-between items-center pt-5 flex-wrap gap-2">
              <div>
                <p className="font-medium">{l.residueType} · {l.quantityTonnes}t</p>
                <p className="text-sm text-nv-muted">{l.farmerName} · {l.location}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium text-nv-green">{formatINR(l.quantityTonnes * l.pricePerTon)}</span>
                <Badge variant="success">Available</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
