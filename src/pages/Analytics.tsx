import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ComposedChart,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { ProvenanceBadge } from '../components/ProvenanceBadge'
import { DonutChart } from '../components/charts/DonutChart'
import {
  monthlyImpact, districtData, emissionScopes, emissionScopesAfter,
  sustainabilityRadar, residueFlow, priceDemandScatter,
  farmerIncomeWaterfall, comparisonStats,
} from '../data/analyticsData'

const tooltipStyle = { background: '#fff', border: '1px solid #d8e0d9', color: '#142018', borderRadius: 8, fontSize: 12 }

/** NCSC field book (n=10) — Madhyamgram–Barasat + Punjab phone */
const fieldBookFate = [
  { name: 'Burned', value: 3, fill: '#9a6b32' },
  { name: 'Stacked / dump', value: 3, fill: '#6e6e73' },
  { name: 'Sold', value: 2, fill: '#1f4d3a' },
  { name: 'Mixed waste', value: 2, fill: '#3d6b54' },
]

const fieldBookPickup = [
  { label: 'Yes (5-day)', count: 8 },
  { label: 'Maybe', count: 2 },
  { label: 'No', count: 0 },
]

const fieldBookImpact = [
  { k: 'Acres in book', v: '40.5' },
  { k: 'Straw (~2 t/ac)', v: '81 t' },
  { k: 'Burned last season', v: '27 t' },
  { k: 'Would list (8/10)', v: '~72 t' },
]

export default function AnalyticsPage() {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="text-center py-4">
        <Badge variant="info" className="mb-3">Impact analytics</Badge>
        <h1 className="text-3xl font-semibold tracking-tight">Agrinova Analytics</h1>
        <p className="mt-2 text-nv-muted max-w-2xl mx-auto">
          Field-book numbers and demonstration cluster charts — each panel is labelled by provenance.
        </p>
      </div>

      <section className="space-y-4 rounded-3xl border border-nv-border bg-white p-6">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-lg font-semibold">NCSC field book</h2>
          <ProvenanceBadge provenance="FIELD_SURVEY" />
        </div>
        <p className="text-sm text-nv-muted">
          Ten farmers (6 Madhyamgram–Barasat doorstep, 4 Punjab phone) · September 2025 · not a census.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {fieldBookImpact.map((m) => (
            <div key={m.k} className="rounded-2xl border border-nv-border bg-nv-elevated/40 px-4 py-4 text-center">
              <p className="text-2xl font-semibold tracking-tight text-nv-fg">{m.v}</p>
              <p className="mt-1 text-[12px] text-nv-muted">{m.k}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Last-season fate (n=10)</CardTitle></CardHeader>
            <CardContent>
              <DonutChart data={fieldBookFate} height={240} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Would list if pickup in 5 days</CardTitle></CardHeader>
            <CardContent className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fieldBookPickup}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e6e4df" />
                  <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="count" fill="#1f4d3a" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex flex-wrap items-center gap-3 px-1">
          <h2 className="text-lg font-semibold">Demonstration cluster</h2>
          <ProvenanceBadge provenance="DEMONSTRATION_DATA" />
        </div>
        <p className="px-1 text-sm text-nv-muted">Larger in-app case-study numbers for booth walkthrough — not the survey claim.</p>
      </section>

      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Farmer income (demo)', before: `₹${(comparisonStats.withoutAgrinova.income / 1000).toFixed(0)}k`, after: `₹${(comparisonStats.withAgrinova.income / 1000).toFixed(0)}k` },
          { label: 'CO₂ burden index', before: String(comparisonStats.withoutAgrinova.co2), after: String(comparisonStats.withAgrinova.co2) },
          { label: 'Burn fines (demo)', before: `₹${comparisonStats.withoutAgrinova.fines / 1000}k`, after: `₹${comparisonStats.withAgrinova.fines}` },
          { label: 'Soil score', before: String(comparisonStats.withoutAgrinova.soilScore), after: String(comparisonStats.withAgrinova.soilScore) },
        ].map((m) => (
          <Card key={m.label} className="text-center">
            <CardContent className="pt-4 pb-4">
              <p className="text-xl font-bold mt-1">{m.after}</p>
              <p className="text-[10px] text-nv-muted leading-tight">{m.label}</p>
              <p className="text-xs text-nv-green mt-1">was {m.before}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Monthly residue diverted (demo)</CardTitle></CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyImpact}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e6e4df" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="tonnes" stroke="#1f4d3a" fill="#1f4d3a33" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>District tonnes (demo)</CardTitle></CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={districtData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e6e4df" />
                <XAxis dataKey="district" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="tonnes" fill="#3d6b54" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Emissions before (demo)</CardTitle></CardHeader>
          <CardContent><DonutChart data={emissionScopes} height={240} /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Emissions after (demo)</CardTitle></CardHeader>
          <CardContent><DonutChart data={emissionScopesAfter} height={240} /></CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Sustainability radar</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={sustainabilityRadar}>
                <PolarGrid />
                <PolarAngleAxis dataKey="axis" tick={{ fontSize: 10 }} />
                <PolarRadiusAxis tick={{ fontSize: 10 }} />
                <Radar name="Before" dataKey="before" stroke="#9a6b32" fill="#9a6b3233" />
                <Radar name="After" dataKey="after" stroke="#1f4d3a" fill="#1f4d3a33" />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Income waterfall (demo)</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={farmerIncomeWaterfall}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e6e4df" />
                <XAxis dataKey="step" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="value" fill="#1f4d3a" />
                <Line type="monotone" dataKey="value" stroke="#9a6b32" dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Residue flow & price–demand (demo)</CardTitle></CardHeader>
        <CardContent className="grid gap-4 lg:grid-cols-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={residueFlow}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e6e4df" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="value" fill="#3d6b54" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceDemandScatter}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e6e4df" />
                <XAxis dataKey="price" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="demand" stroke="#1f4d3a" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
