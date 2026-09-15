import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { impactRecords } from '../../data/agrinovaData'

export default function CarbonPage() {
  const chartData = impactRecords.map((r) => ({
    name: r.residueType.split(' ')[0],
    baseline: r.baselineEmissions,
    alternative: r.alternativeEmissions,
    avoided: r.avoidedEmissions,
  }))

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Carbon Impact</h1>
        <p className="text-sm text-nv-muted">Baseline − Alternative = Estimated avoided emissions</p>
      </div>

      <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-amber-300/90">
        Project-level estimate; not a certified carbon credit. All values are fictional demo calculations.
      </div>

      <Card>
        <CardHeader><CardTitle>Emissions Comparison (t CO₂e)</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#7a8f7a" fontSize={12} />
              <YAxis stroke="#7a8f7a" fontSize={12} />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #d8e0d9', color: '#142018', borderRadius: 8 }} />
              <Bar dataKey="baseline" fill="#ef4444" name="Baseline (burn)" radius={[4,4,0,0]} />
              <Bar dataKey="alternative" fill="#7a8f7a" name="Alternative" radius={[4,4,0,0]} />
              <Bar dataKey="avoided" fill="#3ecf6e" name="Avoided" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {impactRecords.map((r) => (
          <Card key={r.id}>
            <CardContent className="pt-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{r.residueType} · {r.quantityTonnes}t</p>
                  <p className="text-sm text-nv-muted">{r.note}</p>
                </div>
                <p className="text-xl font-semibold text-nv-green">{r.avoidedEmissions.toFixed(1)} t avoided</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
