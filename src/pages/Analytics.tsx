import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ComposedChart,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import {
  monthlyImpact, districtData, emissionScopes, emissionScopesAfter,
  sustainabilityRadar, residueFlow, aiAccuracy, priceDemandScatter,
  farmerIncomeWaterfall, liveMetrics, comparisonStats,
} from '../data/analyticsData'

const tooltipStyle = { background: '#111611', border: '1px solid #1e2a1e', borderRadius: 8, fontSize: 12 }

export default function AnalyticsPage() {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="text-center py-4">
        <Badge variant="info" className="mb-3">Live Intelligence Dashboard</Badge>
        <h1 className="text-3xl font-semibold tracking-tight">Agrinova Analytics</h1>
        <p className="mt-2 text-nv-muted max-w-2xl mx-auto">
          Deep impact analysis across farmers, emissions, income, and circular economy — fictional demo data
        </p>
      </div>

      {/* Live metrics */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-6">
        {liveMetrics.map((m) => (
          <Card key={m.label} className="text-center">
            <CardContent className="pt-4 pb-4">
              <span className="text-2xl">{m.icon}</span>
              <p className="text-xl font-bold mt-1">{m.value}</p>
              <p className="text-[10px] text-nv-muted leading-tight">{m.label}</p>
              <p className="text-xs text-nv-green mt-1">{m.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Before vs After */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-red-500/20">
          <CardHeader><CardTitle className="text-red-400">Without Agrinova</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div><p className="text-2xl font-bold">₹{(comparisonStats.withoutAgrinova.income / 1000).toFixed(0)}K</p><p className="text-xs text-nv-muted">Annual Income</p></div>
            <div><p className="text-2xl font-bold text-red-400">{comparisonStats.withoutAgrinova.co2}t</p><p className="text-xs text-nv-muted">CO₂ Emitted</p></div>
            <div><p className="text-2xl font-bold text-red-400">₹{(comparisonStats.withoutAgrinova.fines / 1000).toFixed(0)}K</p><p className="text-xs text-nv-muted">Fine Risk</p></div>
            <div><p className="text-2xl font-bold">{comparisonStats.withoutAgrinova.soilScore}%</p><p className="text-xs text-nv-muted">Soil Score</p></div>
          </CardContent>
        </Card>
        <Card className="border-nv-green/30">
          <CardHeader><CardTitle className="text-nv-green">With Agrinova</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div><p className="text-2xl font-bold text-nv-green">₹{(comparisonStats.withAgrinova.income / 1000).toFixed(0)}K</p><p className="text-xs text-nv-muted">Annual Income (+34%)</p></div>
            <div><p className="text-2xl font-bold text-nv-green">{comparisonStats.withAgrinova.co2}t</p><p className="text-xs text-nv-muted">CO₂ Emitted (-70%)</p></div>
            <div><p className="text-2xl font-bold text-nv-green">₹0</p><p className="text-xs text-nv-muted">Fine Risk (eliminated)</p></div>
            <div><p className="text-2xl font-bold text-nv-green">{comparisonStats.withAgrinova.soilScore}%</p><p className="text-xs text-nv-muted">Soil Score (+164%)</p></div>
          </CardContent>
        </Card>
      </div>

      {/* Burn vs Sell trend */}
      <Card>
        <CardHeader>
          <CardTitle>Burning vs Selling — 12 Month Transformation</CardTitle>
          <p className="text-sm text-nv-muted">Tonnes of residue: burned (declining) vs sold (rising)</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <ComposedChart data={monthlyImpact}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2a1e" />
              <XAxis dataKey="month" stroke="#7a8f7a" fontSize={12} />
              <YAxis yAxisId="left" stroke="#7a8f7a" fontSize={12} />
              <YAxis yAxisId="right" orientation="right" stroke="#3ecf6e" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Area yAxisId="left" type="monotone" dataKey="burned" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} name="Burned (t)" />
              <Area yAxisId="left" type="monotone" dataKey="sold" stackId="2" stroke="#3ecf6e" fill="#3ecf6e" fillOpacity={0.4} name="Sold (t)" />
              <Line yAxisId="right" type="monotone" dataKey="co2Avoided" stroke="#4ade80" strokeWidth={2} dot={false} name="CO₂ Avoided (t)" />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* District impact */}
        <Card>
          <CardHeader><CardTitle>Regional Impact by District</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={districtData} layout="vertical">
                <XAxis type="number" stroke="#7a8f7a" fontSize={11} />
                <YAxis type="category" dataKey="district" stroke="#7a8f7a" fontSize={11} width={70} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="tonnes" fill="#3ecf6e" name="Tonnes Rescued" radius={[0, 4, 4, 0]} />
                <Bar dataKey="co2" fill="#4ade80" name="CO₂ Avoided (t)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sustainability radar */}
        <Card>
          <CardHeader><CardTitle>Sustainability Score — Before vs After</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={sustainabilityRadar}>
                <PolarGrid stroke="#1e2a1e" />
                <PolarAngleAxis dataKey="metric" stroke="#7a8f7a" fontSize={11} />
                <PolarRadiusAxis stroke="#7a8f7a" fontSize={10} domain={[0, 100]} />
                <Radar name="Before" dataKey="before" stroke="#ef4444" fill="#ef4444" fillOpacity={0.2} />
                <Radar name="After Agrinova" dataKey="after" stroke="#3ecf6e" fill="#3ecf6e" fillOpacity={0.3} />
                <Legend />
                <Tooltip contentStyle={tooltipStyle} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Emissions before */}
        <Card>
          <CardHeader><CardTitle className="text-red-400">Emissions Before</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={emissionScopes} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2}>
                  {emissionScopes.map((e, i) => <Cell key={i} fill={e.fill} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Emissions after */}
        <Card>
          <CardHeader><CardTitle className="text-nv-green">Emissions After Agrinova</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={emissionScopesAfter} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2}>
                  {emissionScopesAfter.map((e, i) => <Cell key={i} fill={e.fill} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Income breakdown */}
        <Card>
          <CardHeader><CardTitle>Farmer Income Breakdown</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={farmerIncomeWaterfall}>
                <XAxis dataKey="stage" stroke="#7a8f7a" fontSize={10} />
                <YAxis stroke="#7a8f7a" fontSize={10} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => `₹${Number(v).toLocaleString('en-IN')}`} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {farmerIncomeWaterfall.map((e, i) => <Cell key={i} fill={e.fill} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Residue flow + AI accuracy */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Residue Flow by Crop Type (tonnes)</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={residueFlow}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2a1e" />
                <XAxis dataKey="month" stroke="#7a8f7a" fontSize={12} />
                <YAxis stroke="#7a8f7a" fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend />
                <Area type="monotone" dataKey="rice" stackId="1" stroke="#3ecf6e" fill="#3ecf6e" fillOpacity={0.6} />
                <Area type="monotone" dataKey="wheat" stackId="1" stroke="#4ade80" fill="#4ade80" fillOpacity={0.5} />
                <Area type="monotone" dataKey="cotton" stackId="1" stroke="#7a8f7a" fill="#7a8f7a" fillOpacity={0.4} />
                <Area type="monotone" dataKey="maize" stackId="1" stroke="#eab308" fill="#eab308" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>AI Model Accuracy (%)</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={aiAccuracy}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2a1e" />
                <XAxis dataKey="week" stroke="#7a8f7a" fontSize={12} />
                <YAxis stroke="#7a8f7a" fontSize={12} domain={[60, 95]} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend />
                <Line type="monotone" dataKey="weather" stroke="#3b82f6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="crop" stroke="#3ecf6e" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="market" stroke="#eab308" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="match" stroke="#4ade80" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Price vs Demand scatter */}
      <Card>
        <CardHeader>
          <CardTitle>Market Intelligence — Price vs Demand</CardTitle>
          <p className="text-sm text-nv-muted">Buyer types clustered by price per tonne and demand volume</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2a1e" />
              <XAxis type="number" dataKey="price" name="Price ₹/t" stroke="#7a8f7a" fontSize={12} domain={[550, 850]} />
              <YAxis type="number" dataKey="demand" name="Demand (t)" stroke="#7a8f7a" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={priceDemandScatter} fill="#3ecf6e">
                {priceDemandScatter.map((_, i) => (
                  <Cell key={i} fill={['#3ecf6e', '#4ade80', '#22c55e', '#3b82f6', '#eab308'][i % 5]} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Income + CO2 dual chart */}
      <Card>
        <CardHeader><CardTitle>Platform Growth — Income & Environmental Impact</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={monthlyImpact}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2a1e" />
              <XAxis dataKey="month" stroke="#7a8f7a" fontSize={12} />
              <YAxis yAxisId="left" stroke="#3ecf6e" fontSize={12} tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`} />
              <YAxis yAxisId="right" orientation="right" stroke="#4ade80" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v, name) => name === 'income' ? `₹${Number(v).toLocaleString('en-IN')}` : `${v}t`} />
              <Legend />
              <Bar yAxisId="left" dataKey="income" fill="#3ecf6e" fillOpacity={0.7} name="Farmer Income (₹)" radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="co2Avoided" stroke="#4ade80" strokeWidth={3} name="CO₂ Avoided (t)" dot={{ fill: '#4ade80' }} />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <p className="text-center text-xs text-nv-muted pb-8">
        All analytics use fictional demo data · Carbon figures are project-level estimates, not certified credits
      </p>
    </div>
  )
}
