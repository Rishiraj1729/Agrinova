import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { farmers, impactRecords, platformStats, cropRisks } from '../../data/agrinoveData'

const trendData = [
  { month: 'Jun', rescued: 32, co2: 64 },
  { month: 'Jul', rescued: 45, co2: 90 },
  { month: 'Aug', rescued: 58, co2: 116 },
  { month: 'Sep', rescued: 72, co2: 144 },
  { month: 'Oct', rescued: 95, co2: 190 },
  { month: 'Nov', rescued: 120, co2: 240 },
]

export default function ResearchDashboard() {
  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Research / Government Portal</h1>
        <p className="text-sm text-nv-muted">Agricultural resource map · Analytics · Impact dashboard · Fictional demo data</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Demo Farmers', value: farmers.length },
          { label: 'Tonnes Rescued', value: platformStats.tonnesRescued },
          { label: 'CO₂ Avoided (t)', value: platformStats.co2Avoided },
          { label: 'Income Generated', value: `₹${(platformStats.totalIncome / 100000).toFixed(1)}L` },
        ].map(({ label, value }) => (
          <Card key={label}><CardContent className="pt-5"><p className="text-xs text-nv-muted">{label}</p><p className="text-xl font-semibold mt-1">{value}</p></CardContent></Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle>Residue Rescue Trend (Demo)</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={trendData}>
              <XAxis dataKey="month" stroke="#7a8f7a" fontSize={12} />
              <YAxis stroke="#7a8f7a" fontSize={12} />
              <Tooltip contentStyle={{ background: '#111611', border: '1px solid #1e2a1e', borderRadius: 8 }} />
              <Area type="monotone" dataKey="rescued" stroke="#3ecf6e" fill="#3ecf6e" fillOpacity={0.15} name="Tonnes" />
              <Area type="monotone" dataKey="co2" stroke="#7a8f7a" fill="#7a8f7a" fillOpacity={0.1} name="CO₂ t" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Crop Risk Distribution</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {cropRisks.map((r) => (
              <div key={r.crop} className="flex justify-between text-sm">
                <span>{r.crop}</span>
                <span className={r.riskLevel === 'high' ? 'text-red-400' : r.riskLevel === 'medium' ? 'text-amber-400' : 'text-nv-green'}>
                  {r.riskLevel} ({r.confidence}%)
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Impact Records</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {impactRecords.map((r) => (
              <div key={r.id} className="flex justify-between text-sm">
                <span>{r.residueType}</span>
                <span className="text-nv-green">{r.avoidedEmissions.toFixed(1)} t avoided</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
