import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Calculator, Coins, Flame, Leaf, ShieldAlert, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input, Label } from '../../components/ui/Input'
import { PageHeader, StatTile } from '../../components/ui/PageHeader'
import { SourceNote } from '../../components/SourceNote'
import { farmerFromSession, useAuth } from '../../contexts/AuthContext'
import { useCaseStudy } from '../../contexts/CaseStudyContext'
import { calculateCarbonImpact } from '../../services/carbonLedger'
import { rankBuyersForListing } from '../../services/scoreMatch'
import { CREDITS_PER_TCO2E } from '../../data/redemptionCatalog'
import { formatINR } from '../../lib/utils'

/** NGT environmental compensation slabs per burning incident (public policy reference) */
function fineForAcres(acres: number) {
  if (acres < 2) return 2500
  if (acres <= 5) return 5000
  return 15000
}

const STRAW_PER_ACRE = 2

export default function ImpactPage() {
  const { user } = useAuth()
  const { demoFarmer, farmers, buyers } = useCaseStudy()
  const farmer = farmerFromSession(user, farmers, demoFarmer)

  const [acres, setAcres] = useState(Math.min(user?.acres ?? farmer.acres, 2.5))
  const [pricePerTon, setPricePerTon] = useState(750)
  const [moisture, setMoisture] = useState(13)
  const [balingCostPerTon, setBalingCostPerTon] = useState(180)

  const tonnes = +(acres * STRAW_PER_ACRE).toFixed(1)

  const ranked = useMemo(
    () => rankBuyersForListing(buyers, 'Rice Straw', tonnes, 'biomass', moisture),
    [buyers, tonnes, moisture],
  )
  const topMatch = ranked[0]

  const gross = Math.round(tonnes * pricePerTon)
  const balingCost = Math.round(tonnes * balingCostPerTon)
  const net = gross - balingCost
  const carbon = calculateCarbonImpact(tonnes, 'biomass')
  const credits = Math.round(carbon.avoided * CREDITS_PER_TCO2E)
  const fineRisk = fineForAcres(acres)
  const burnTco2e = calculateCarbonImpact(tonnes, 'burn').baseline
  const swing = net + fineRisk

  const chartData = [
    { name: 'Burn', value: -fineRisk, fill: '#c62828' },
    { name: 'Sell (net)', value: net, fill: '#138808' },
  ]

  return (
    <div className="animate-fade-in max-w-4xl space-y-6">
      <PageHeader
        icon={Calculator}
        eyebrow="Decision support"
        title="Burn vs sell calculator"
        description="Move the sliders to compare this season's residue decision in rupees, credits, and carbon before you commit to a listing."
        actions={
          <Link to={`/farmer/sell?qty=${tonnes}`}>
            <Button>List {tonnes} t now</Button>
          </Link>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile
          label="Net income if sold"
          value={formatINR(net)}
          hint={`${formatINR(gross)} gross - ${formatINR(balingCost)} baling`}
          icon={TrendingUp}
          tone="green"
        />
        <StatTile
          label="Income if burned"
          value={formatINR(0)}
          hint={`Plus up to ${formatINR(fineRisk)} compensation risk`}
          icon={Flame}
          tone="saffron"
        />
        <StatTile
          label="Credits earned"
          value={credits.toLocaleString()}
          hint="Redeem for urea, seed, baler rental"
          icon={Coins}
          tone="saffron"
        />
        <StatTile
          label="tCO2e avoided"
          value={carbon.avoided.toFixed(1)}
          hint={`Burning ${tonnes} t emits ~${burnTco2e.toFixed(1)} tCO2e`}
          icon={Leaf}
          tone="green"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Your inputs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <Label>Paddy acres to clear: {acres} ac</Label>
              <Input
                type="range"
                min={0.5}
                max={12}
                step={0.5}
                value={acres}
                onChange={(e) => setAcres(Number(e.target.value))}
              />
              <p className="mt-1 text-[11px] text-nv-muted">
                ~{STRAW_PER_ACRE} t/acre rice straw = <strong className="text-nv-fg">{tonnes} t</strong>
              </p>
            </div>
            <div>
              <Label>Gate price: {formatINR(pricePerTon)}/t</Label>
              <Input
                type="range"
                min={500}
                max={1000}
                step={10}
                value={pricePerTon}
                onChange={(e) => setPricePerTon(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Moisture: {moisture}%</Label>
              <Input
                type="range"
                min={8}
                max={24}
                value={moisture}
                onChange={(e) => setMoisture(Number(e.target.value))}
              />
              <p className="mt-1 text-[11px] text-nv-muted">
                Plants usually cap at 15%. Higher moisture lowers your match score.
              </p>
            </div>
            <div>
              <Label>Baling + handling: {formatINR(balingCostPerTon)}/t</Label>
              <Input
                type="range"
                min={0}
                max={400}
                step={10}
                value={balingCostPerTon}
                onChange={(e) => setBalingCostPerTon(Number(e.target.value))}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base">Rupee swing this season</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={210}>
              <BarChart data={chartData} margin={{ top: 8, right: 8, left: 8, bottom: 4 }}>
                <XAxis dataKey="name" fontSize={12} stroke="#5c6b60" />
                <YAxis fontSize={11} stroke="#5c6b60" tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
                <Tooltip
                  formatter={(v: number) => formatINR(v)}
                  contentStyle={{ background: '#fff', border: '1px solid #d8e0d9', color: '#142018', borderRadius: 8 }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {chartData.map((d) => (
                    <Cell key={d.name} fill={d.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-3 rounded-xl bg-nv-green/8 p-4">
              <p className="text-sm font-semibold text-nv-fg">
                Selling swings your season by about {formatINR(swing)}
              </p>
              <p className="mt-1 text-xs text-nv-muted">
                {formatINR(net)} in hand, plus {formatINR(fineRisk)} of compensation risk you no longer carry.
              </p>
            </div>
            <SourceNote provenance="MODEL_ESTIMATE">
              Straw yield, baling cost, and carbon factors are demo parameters. Compensation slabs follow published
              NGT environmental-compensation bands and are indicative, not a legal notice.
            </SourceNote>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Best buyer at this moisture</CardTitle>
        </CardHeader>
        <CardContent>
          {topMatch ? (
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-semibold">{topMatch.buyer.name}</p>
                <p className="text-sm text-nv-muted">
                  {topMatch.buyer.location} · {topMatch.buyer.distanceKm} km · {formatINR(topMatch.buyer.pricePerTon)}/t
                  · spec max {topMatch.buyer.moistureSpecMax ?? 16}%
                </p>
                <ul className="mt-2 space-y-0.5 text-xs text-nv-muted">
                  {topMatch.reasons.slice(0, 3).map((r) => (
                    <li key={r}>· {r}</li>
                  ))}
                </ul>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-nv-green">{topMatch.matchScore}%</p>
                <p className="text-[11px] text-nv-muted">AgriNova Match Score</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-nv-muted">No buyer accepts this residue at the selected quantity.</p>
          )}
          {moisture > 15 && (
            <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">
              <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                At {moisture}% moisture most plants discount or reject the lot. Sun-dry the swath for a day or two
                before baling to protect your price.
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
