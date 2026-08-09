import { Link } from 'react-router-dom'
import { AlertTriangle, TrendingUp, Recycle, Leaf, ArrowRight } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { TrustBadge } from '../../components/ui/TrustBadge'
import { Button } from '../../components/ui/Button'
import {
  currentFarmer, weatherEvents, cropRisks, marketPrices,
  platformStats, residueListings,
} from '../../data/agrinovaData'
import { formatINR } from '../../lib/utils'

const incomeData = [
  { month: 'Jun', income: 12000 },
  { month: 'Jul', income: 8500 },
  { month: 'Aug', income: 15000 },
  { month: 'Sep', income: 22000 },
  { month: 'Oct', income: 18000 },
  { month: 'Nov', income: 24000 },
]

export default function FarmerDashboard() {
  const myListings = residueListings.filter((l) => l.farmerId === currentFarmer.id)
  const highRisk = cropRisks.find((r) => r.riskLevel === 'high')

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Welcome, {currentFarmer.name.split(' ')[0]}</h1>
        <p className="text-sm text-nv-muted">{currentFarmer.village}, {currentFarmer.district} · {currentFarmer.acres} acres</p>
      </div>

      {highRisk && (
        <Card className="border-amber-500/30 bg-amber-500/5">
          <CardContent className="flex items-start gap-3 pt-5">
            <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-amber-300">Estimated Risk: {highRisk.crop} — {highRisk.riskLevel.toUpperCase()}</p>
              <p className="mt-1 text-sm text-nv-muted">{highRisk.recommendation}</p>
              <TrustBadge confidence={highRisk.confidence} reason={highRisk.reason} updatedAt={highRisk.updatedAt} className="mt-3" />
            </div>
            <Link to="/farmer/risk"><Button variant="ghost" size="sm">View</Button></Link>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Est. Season Income', value: formatINR(24000), icon: TrendingUp },
          { label: 'Active Listings', value: String(myListings.length), icon: Recycle },
          { label: 'CO₂ Avoided', value: '3.7 t', icon: Leaf },
          { label: 'Weather Alerts', value: String(weatherEvents.length), icon: AlertTriangle },
        ].map(({ label, value, icon: Icon }) => (
          <Card key={label}>
            <CardContent className="pt-5">
              <Icon className="h-4 w-4 text-nv-green mb-2" />
              <p className="text-xs text-nv-muted">{label}</p>
              <p className="text-xl font-semibold mt-1">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Income Trend (Demo)</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={incomeData}>
                <XAxis dataKey="month" stroke="#7a8f7a" fontSize={12} />
                <YAxis stroke="#7a8f7a" fontSize={12} />
                <Tooltip contentStyle={{ background: '#111611', border: '1px solid #1e2a1e', borderRadius: 8 }} />
                <Area type="monotone" dataKey="income" stroke="#3ecf6e" fill="#3ecf6e" fillOpacity={0.15} />
              </AreaChart>
            </ResponsiveContainer>
            <p className="text-xs text-nv-muted mt-2">{/* fictional */}Fictional demo data</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Market Snapshot</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {marketPrices.slice(0, 3).map((m) => (
              <div key={m.crop} className="flex items-center justify-between">
                <span className="text-sm">{m.crop}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{formatINR(m.mandiAvg)}/q</span>
                  <Badge variant={m.trend === 'up' ? 'success' : m.trend === 'down' ? 'danger' : 'default'}>{m.trend}</Badge>
                </div>
              </div>
            ))}
            <Link to="/farmer/market" className="text-sm text-nv-green hover:underline">View all →</Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Demo Flow — Start Here</CardTitle>
          <Badge variant="info">Judge Demo</Badge>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2 text-sm text-nv-muted">
            <li>1. Check <Link to="/farmer/weather" className="text-nv-green hover:underline">Weather Warning</Link></li>
            <li>2. Review <Link to="/farmer/risk" className="text-nv-green hover:underline">Crop Risk</Link></li>
            <li>3. See <Link to="/farmer/market" className="text-nv-green hover:underline">Market Opportunity</Link></li>
            <li>4. <Link to="/farmer/residue" className="text-nv-green hover:underline">List Rice Straw → Match Buyers → Logistics → Carbon Impact</Link></li>
          </ol>
          <Link to="/farmer/residue" className="inline-block mt-4">
            <Button>Start Residue Demo <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </Link>
        </CardContent>
      </Card>

      <p className="text-xs text-nv-muted text-center">
        Platform: {platformStats.totalFarmers} demo farmers · {platformStats.totalBuyers} buyers · {platformStats.tonnesRescued}t rescued (fictional)
      </p>
    </div>
  )
}
