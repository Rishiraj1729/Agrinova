import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { TrustBadge } from '../../components/ui/TrustBadge'
import { marketPrices } from '../../data/agrinovaData'
import { formatINR } from '../../lib/utils'

export default function MarketPage() {
  const chartData = marketPrices.map((m) => ({ crop: m.crop, msp: m.msp, mandi: m.mandiAvg }))

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Market Intelligence</h1>
        <p className="text-sm text-nv-muted">MSP vs mandi prices · Fictional demo data</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Price Comparison (₹/quintal)</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="crop" stroke="#7a8f7a" fontSize={11} />
              <YAxis stroke="#7a8f7a" fontSize={11} />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #d8e0d9', color: '#142018', borderRadius: 8 }} />
              <Bar dataKey="msp" fill="#3ecf6e" name="MSP" radius={[4, 4, 0, 0]} />
              <Bar dataKey="mandi" fill="#7a8f7a" name="Mandi Avg" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {marketPrices.map((m) => (
          <Card key={m.crop}>
            <CardContent className="flex items-center justify-between pt-5">
              <div>
                <p className="font-medium">{m.crop}</p>
                <p className="text-sm text-nv-muted">Demand index: {m.demandIndex}/100</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{formatINR(m.mandiAvg)}/q</p>
                <Badge variant={m.trend === 'up' ? 'success' : m.trend === 'down' ? 'danger' : 'default'}>{m.trend}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <TrustBadge confidence={75} reason="Demo mandi prices aggregated from fictional dataset" updatedAt="2025-11-08" />
    </div>
  )
}
