import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Input, Label, Select } from '../../components/ui/Input'
import { useCaseStudy } from '../../contexts/CaseStudyContext'
import { useMarketplace } from '../../contexts/MarketplaceContext'
import { buyerFromSession, isDemoSession, useAuth } from '../../contexts/AuthContext'
import { formatINR } from '../../lib/utils'
import type { ResidueType } from '../../types'

type Tab = 'procure' | 'requirements' | 'offers'

export default function BusinessDashboard() {
  const { user } = useAuth()
  const demo = isDemoSession(user)
  const { buyers, region } = useCaseStudy()
  const { listings, offers, requirements, postRequirement, createOffer, getWallet, transactions } = useMarketplace()
  const [tab, setTab] = useState<Tab>('procure')
  const demoBuyer = buyerFromSession(user, buyers, buyers[0])
  const buyerWallet = getWallet(demoBuyer.id)
  const buyerTonnes = transactions
    .filter((t) => t.buyerId === demoBuyer.id && t.status === 'completed')
    .reduce((s, t) => s + t.quantityTonnes, 0)
  const taxRelief = Math.round((buyerWallet.lifetimeEarned / 1000) * (1200 / 0.7))
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const [reqQty, setReqQty] = useState(40)
  const [reqPrice, setReqPrice] = useState(600)
  const [reqMoistureMax, setReqMoistureMax] = useState(18)
  const [reqResidue, setReqResidue] = useState<ResidueType>('Rice Straw')

  const available = listings.filter((l) => l.status === 'listed' || l.status === 'offer_received')
  const selected = available.find((l) => l.id === selectedId)
  const myOffers = offers.filter((o) => o.buyerId === demoBuyer.id)
  const regionListed = listings
    .filter((l) => l.region === region && l.status !== 'completed')
    .reduce((s, l) => s + l.quantityTonnes, 0)

  const demandData = buyers.map((b) => ({ name: b.name.split(' ')[0], demand: b.demandTonnes }))

  function submitRequirement() {
    postRequirement({
      buyerId: demoBuyer.id,
      buyerName: demoBuyer.name,
      residueTypes: [reqResidue],
      quantityTonnes: reqQty,
      maxRadiusKm: 15,
      targetPricePerTon: reqPrice,
      horizonDays: 30,
      region,
    })
    setTab('requirements')
  }

  function procureSelected() {
    if (!selected) return
    createOffer(selected.id, demoBuyer.id, demoBuyer.name, selected.pricePerTon, selected.quantityTonnes)
    setTab('offers')
  }

  return (
    <div className="animate-fade-in space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-semibold">Buyer desk — {user?.displayName ?? demoBuyer.contactName}</h1>
        <p className="text-sm text-nv-muted">{demoBuyer.name} · {demoBuyer.contactRole ?? 'Procurement'} · {demoBuyer.location} · max {demoBuyer.moistureSpecMax ?? 15}% moisture · {demoBuyer.plantCapacityTpd ?? 15} TPD</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-nv-muted">Buyer carbon credits</p>
            <p className="text-2xl font-semibold text-nv-credit">{buyerWallet.balance.toLocaleString()}</p>
            <p className="text-[10px] text-nv-muted">70% of avoided tCO₂e units on completed buys</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-nv-muted">Indicative green-tax / CSR relief</p>
            <p className="text-2xl font-semibold">{formatINR(taxRelief)}</p>
            <p className="text-[10px] text-nv-muted">Demo ₹1200/tCO₂e — not a tax ruling</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-nv-muted">Procured (completed)</p>
            <p className="text-2xl font-semibold">{buyerTonnes.toFixed(1)} t</p>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-2xl border border-nv-border bg-nv-elevated/50 px-4 py-3 text-sm text-nv-muted">
        Ward / ULB context: <span className="font-semibold text-nv-fg">{regionListed.toFixed(1)} t</span> still open on the matching desk in this region.
        Government sees the same aggregates without farmer phones.
      </div>

      <div className="flex gap-2 flex-wrap">
        {(['procure', 'requirements', 'offers'] as Tab[]).map((t) => (
          <Button key={t} size="sm" variant={tab === t ? 'primary' : 'outline'} onClick={() => setTab(t)}>
            {t === 'procure' ? 'Procure supply' : t === 'requirements' ? 'Post RFQ' : `My offers (${myOffers.length})`}
          </Button>
        ))}
      </div>

      {tab === 'procure' && (
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-2 max-h-[480px] overflow-y-auto pr-1">
            {available.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => setSelectedId(l.id)}
                className={`w-full text-left rounded-xl border p-3 transition ${selectedId === l.id ? 'border-nv-green bg-nv-green/5' : 'border-nv-border hover:border-nv-border/80'}`}
              >
                <p className="font-medium text-sm">{l.residueType} · {l.quantityTonnes}t</p>
                <p className="text-xs text-nv-muted">{l.farmerName} · {l.location}</p>
                {l.details && (
                  <p className="text-[10px] text-nv-muted mt-1">
                    Moisture {l.details.moisturePercent}% · {l.details.isBaled ? 'Baled' : 'Loose'} · {l.details.landAcres} ac land
                  </p>
                )}
                <p className="text-sm text-nv-green mt-1">{formatINR(l.pricePerTon)}/t</p>
              </button>
            ))}
            {available.length === 0 && <p className="text-sm text-nv-muted">No open listings — ask a farmer to publish via Sell.</p>}
          </div>
          <Card className="lg:col-span-3">
            <CardHeader><CardTitle>Procurement detail</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {selected ? (
                <>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div><p className="text-nv-muted">Residue</p><p className="font-medium">{selected.residueType}</p></div>
                    <div><p className="text-nv-muted">Quantity</p><p className="font-medium">{selected.quantityTonnes} tonnes</p></div>
                    <div><p className="text-nv-muted">Condition</p><p className="font-medium">{selected.condition ?? '—'}</p></div>
                    <div><p className="text-nv-muted">Availability</p><p className="font-medium">{selected.availabilityWindow ?? '—'}</p></div>
                    {selected.details && (
                      <>
                        <div><p className="text-nv-muted">Moisture</p><p className="font-medium">{selected.details.moisturePercent}%</p></div>
                        <div><p className="text-nv-muted">Storage</p><p className="font-medium">{selected.details.storageType}</p></div>
                        <div><p className="text-nv-muted">Residue area</p><p className="font-medium">{selected.details.residueAcres} acres</p></div>
                        <div><p className="text-nv-muted">Harvest</p><p className="font-medium">{selected.details.harvestDate}</p></div>
                      </>
                    )}
                  </div>
                  <p className="text-lg font-semibold">Total {formatINR(selected.quantityTonnes * selected.pricePerTon)}</p>
                  <Button onClick={procureSelected}>Send binding offer (demo)</Button>
                </>
              ) : (
                <p className="text-sm text-nv-muted">Select a listing to review quality fields and procure.</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {tab === 'requirements' && (
        <Card>
          <CardHeader><CardTitle>Request for quotation (RFQ)</CardTitle></CardHeader>
          <CardContent className="space-y-4 max-w-md">
            <div>
              <Label>Residue type</Label>
              <Select value={reqResidue} onChange={(e) => setReqResidue(e.target.value as ResidueType)}>
                <option>Rice Straw</option>
                <option>Wheat Stubble</option>
                <option>Cotton Stalks</option>
              </Select>
            </div>
            <div>
              <Label>Quantity (tonnes): {reqQty}</Label>
              <Input type="range" min={50} max={200} value={reqQty} onChange={(e) => setReqQty(Number(e.target.value))} />
            </div>
            <div>
              <Label>Max moisture (%): {reqMoistureMax}</Label>
              <Input type="range" min={10} max={20} value={reqMoistureMax} onChange={(e) => setReqMoistureMax(Number(e.target.value))} />
            </div>
            <div>
              <Label>Target price: {formatINR(reqPrice)}/t</Label>
              <Input type="range" min={2000} max={4000} step={50} value={reqPrice} onChange={(e) => setReqPrice(Number(e.target.value))} />
            </div>
            <Button onClick={submitRequirement}>Publish RFQ</Button>
            <div className="space-y-2 pt-2">
              {requirements.map((r) => (
                <div key={r.id} className="text-sm border border-nv-border rounded-lg p-3">
                  {r.quantityTonnes}t {r.residueTypes.join(', ')} · max moisture policy in RFQ · {formatINR(r.targetPricePerTon)}/t
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {tab === 'offers' && (
        <div className="space-y-3">
          {myOffers.map((o) => (
            <Card key={o.id}>
              <CardContent className="pt-5 flex justify-between flex-wrap gap-2">
                <div>
                  <p className="font-medium">Listing {o.listingId.slice(-8)}</p>
                  <p className="text-sm text-nv-muted">{o.quantityTonnes}t @ {formatINR(o.pricePerTon)}/t</p>
                </div>
                <Badge variant={o.status === 'accepted' ? 'success' : o.status === 'rejected' ? 'default' : 'info'}>
                  {o.status} · match {o.matchScore}%
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {demo && (
      <Card>
        <CardHeader><CardTitle className="text-base">Regional demand (demo)</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={demandData}>
              <XAxis dataKey="name" fontSize={10} stroke="#8b95a8" />
              <YAxis fontSize={10} stroke="#8b95a8" />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #d8e0d9', color: '#142018' }} />
              <Bar dataKey="demand" fill="#138808" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      )}
    </div>
  )
}
