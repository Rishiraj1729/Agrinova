import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Input, Label, Select, Textarea } from '../../components/ui/Input'
import { ClassificationCard } from '../../components/marketplace/ClassificationCard'
import { ValuationCard } from '../../components/marketplace/ValuationCard'
import { PathwayList } from '../../components/marketplace/PathwayList'
import { MatchScoreBreakdown } from '../../components/marketplace/MatchScoreBreakdown'
import { TransactionStepper } from '../../components/marketplace/TransactionStepper'
import { useCaseStudy } from '../../contexts/CaseStudyContext'
import { useMarketplace } from '../../contexts/MarketplaceContext'
import { farmerFromSession, useAuth } from '../../contexts/AuthContext'
import { classifyResidue } from '../../services/classifyResidue'
import { estimateValue } from '../../services/estimateValue'
import { recommendPathways } from '../../services/recommendPathways'
import { rankBuyersForListing } from '../../services/scoreMatch'
import { calculateCarbonImpact } from '../../services/carbonLedger'
import { CREDITS_PER_TCO2E } from '../../data/redemptionCatalog'
import { formatINR } from '../../lib/utils'
import type { CropType, PathwayId, ResidueType, StorageType } from '../../types'

type Step = 'farm' | 'quality' | 'listing' | 'pathways' | 'offers' | 'logistics' | 'complete'

const stepOrder: Step[] = ['farm', 'quality', 'listing', 'pathways', 'offers', 'logistics', 'complete']

export default function SellWizardPage() {
  const [searchParams] = useSearchParams()
  const { demoFarmer, farmers, buyers, region } = useCaseStudy()
  const { user } = useAuth()
  const farmer = farmerFromSession(user, farmers, demoFarmer)
  const {
    addListing,
    seedOffersForListing,
    acceptOffer,
    completeTransaction,
    transactions,
    getOffersForListing,
    getWallet,
  } = useMarketplace()

  const [step, setStep] = useState<Step>('farm')
  const [crop, setCrop] = useState<CropType>('Rice')
  const [landAcres, setLandAcres] = useState(user?.acres ?? farmer.acres)
  const [residueAcres, setResidueAcres] = useState(Math.max(1, Math.min(user?.acres ?? farmer.acres, farmer.riceAcresThisSeason ?? 2.5)))
  const [quantity, setQuantity] = useState(Number(searchParams.get('qty')) || 5)
  const [moisture, setMoisture] = useState(12)
  const [isBaled, setIsBaled] = useState(true)
  const [storage, setStorage] = useState<StorageType>('stacked')
  const [harvestDate, setHarvestDate] = useState('2025-11-01')
  const [ashPercent, setAshPercent] = useState(8)
  const [pickupNotes, setPickupNotes] = useState('Tractor access from main road; stack behind tubewell.')
  const [expectedPrice, setExpectedPrice] = useState(750)
  const [availabilityDays, setAvailabilityDays] = useState(7)

  const [classification, setClassification] = useState(() =>
    classifyResidue(undefined, searchParams.get('type') ?? 'rice straw'),
  )
  const [pathway, setPathway] = useState<PathwayId>('biomass')
  const [listingId, setListingId] = useState<string | null>(null)
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null)
  const [txnId, setTxnId] = useState<string | null>(null)
  const [logisticsMode, setLogisticsMode] = useState<'individual' | 'consolidated'>('consolidated')

  const residueType: ResidueType = classification.userOverride ?? classification.residueType
  const valuation = useMemo(() => estimateValue(quantity, residueType, buyers, expectedPrice), [quantity, residueType, buyers, expectedPrice])
  const pathways = useMemo(() => recommendPathways(residueType, quantity), [residueType, quantity])
  const ranked = useMemo(
    () => rankBuyersForListing(buyers, residueType, quantity, pathway, moisture),
    [buyers, residueType, quantity, pathway, moisture],
  )
  const carbon = calculateCarbonImpact(quantity, pathway)
  const estCredits = Math.round(carbon.avoided * CREDITS_PER_TCO2E)

  const listingOffers = listingId ? getOffersForListing(listingId) : []
  const stepIndex = stepOrder.indexOf(step)
  const completedTxn = transactions.find((t) => t.id === txnId)
  const wallet = getWallet(farmer.id)

  function publish() {
    setPathway(pathways[0]?.id ?? 'biomass')
    const top = ranked[0]
    const listing = addListing({
      farmerId: farmer.id,
      farmerName: user?.displayName ?? farmer.name,
      residueType,
      crop,
      quantityTonnes: quantity,
      location: `${user?.village ?? farmer.village}, ${user?.district ?? farmer.district}, ${farmer.state}`,
      pricePerTon: expectedPrice || top?.buyer.pricePerTon || 700,
      pathway: pathways[0]?.id ?? 'biomass',
      provenance: 'DEMONSTRATION_DATA',
      region,
      condition: `Moisture ${moisture}%, ${isBaled ? 'baled' : 'loose'}, ash ~${ashPercent}%`,
      availabilityWindow: `${availabilityDays} days`,
      expectedPricePerTon: expectedPrice,
      details: {
        landAcres,
        residueAcres,
        moisturePercent: moisture,
        isBaled,
        storageType: storage,
        harvestDate,
        ashPercent,
        pickupNotes,
      },
    })
    setListingId(listing.id)
    const matchPayload = ranked.slice(0, 3).map((r) => ({
      buyerId: r.buyer.id,
      buyerName: r.buyer.name,
      pricePerTon: r.buyer.pricePerTon,
      quantity,
    }))
    queueMicrotask(() => seedOffersForListing(listing.id, matchPayload))
    setStep('offers')
  }

  function acceptSelectedOffer() {
    if (!selectedOfferId) return
    const txn = acceptOffer(selectedOfferId)
    if (txn) {
      setTxnId(txn.id)
      setStep('logistics')
    }
  }

  function finish() {
    if (!txnId) return
    completeTransaction(txnId, logisticsMode)
    setStep('complete')
  }

  return (
    <div className="animate-fade-in space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">List residue — {user?.displayName ?? farmer.name}</h1>
        <p className="text-sm text-nv-muted">
          {farmer.riceAcresThisSeason ?? Math.min(farmer.acres, 2.5)} acres paddy × ~2 t/acre ≈ {((farmer.riceAcresThisSeason ?? Math.min(farmer.acres, 2.5)) * 2).toFixed(1)} t straw.
          Moisture and bales decide whether GreenPower can lift it.
        </p>
      </div>

      <div className="flex gap-1.5 flex-wrap">
        {stepOrder.map((s, i) => (
          <span
            key={s}
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
              step === s ? 'bg-nv-green/20 text-nv-green' : i < stepIndex ? 'bg-nv-elevated text-nv-muted' : 'text-nv-muted'
            }`}
          >
            {i + 1}. {s}
          </span>
        ))}
      </div>

      {step === 'farm' && (
        <Card>
          <CardHeader><CardTitle>Farm & land</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Farmer</Label>
                <Input value={user?.displayName ?? farmer.name} readOnly />
              </div>
              <div>
                <Label>Phone</Label>
                <Input value={user?.phone ?? farmer.phone} readOnly />
              </div>
              <div className="sm:col-span-2">
                <Label>Location</Label>
                <Input value={`${user?.village ?? farmer.village}, ${user?.district ?? farmer.district}, ${farmer.state}`} readOnly />
              </div>
              <div>
                <Label>Total land (acres)</Label>
                <Input type="number" min={0.5} step={0.5} value={landAcres} onChange={(e) => setLandAcres(Number(e.target.value))} />
              </div>
              <div>
                <Label>Area under this residue (acres)</Label>
                <Input type="number" min={0.5} step={0.5} value={residueAcres} onChange={(e) => setResidueAcres(Number(e.target.value))} />
              </div>
              <div>
                <Label>Source crop</Label>
                <Select value={crop} onChange={(e) => setCrop(e.target.value as CropType)}>
                  {(['Rice', 'Wheat', 'Cotton', 'Maize', 'Sugarcane'] as CropType[]).map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </Select>
              </div>
              <div>
                <Label>Harvest date</Label>
                <Input type="date" value={harvestDate} onChange={(e) => setHarvestDate(e.target.value)} />
              </div>
            </div>
            <ClassificationCard
              result={classification}
              onOverride={(t) => setClassification({ ...classification, userOverride: t })}
            />
            <Button onClick={() => setStep('quality')}>Continue</Button>
          </CardContent>
        </Card>
      )}

      {step === 'quality' && (
        <Card>
          <CardHeader><CardTitle>Residue quality</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Quantity (tonnes)</Label>
                <Input type="number" min={0.5} step={0.5} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
              </div>
              <div>
                <Label>Moisture (%)</Label>
                <Input type="number" min={5} max={30} value={moisture} onChange={(e) => setMoisture(Number(e.target.value))} />
                <p className="text-[10px] text-nv-muted mt-1">Buyers prefer &lt;15% for biomass</p>
              </div>
              <div>
                <Label>Ash content (% est.)</Label>
                <Input type="number" min={3} max={20} value={ashPercent} onChange={(e) => setAshPercent(Number(e.target.value))} />
              </div>
              <div>
                <Label>Storage</Label>
                <Select value={storage} onChange={(e) => setStorage(e.target.value as StorageType)}>
                  <option value="field">Open field</option>
                  <option value="stacked">Stacked on platform</option>
                  <option value="covered">Tarpaulin covered</option>
                  <option value="silo">Silo / shed</option>
                </Select>
              </div>
              <div className="sm:col-span-2 flex items-center gap-3">
                <input type="checkbox" id="baled" checked={isBaled} onChange={(e) => setIsBaled(e.target.checked)} className="accent-nv-green" />
                <Label htmlFor="baled" className="mb-0">Baled (ready for pickup)</Label>
              </div>
              <div className="sm:col-span-2">
                <Label>Pickup / access notes</Label>
                <Textarea value={pickupNotes} onChange={(e) => setPickupNotes(e.target.value)} />
              </div>
            </div>
            <Button onClick={() => setStep('listing')}>Continue</Button>
          </CardContent>
        </Card>
      )}

      {step === 'listing' && (
        <Card>
          <CardHeader><CardTitle>Pricing & availability</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <ValuationCard valuation={valuation} />
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Expected price (₹/tonne)</Label>
                <Input type="number" value={expectedPrice} onChange={(e) => setExpectedPrice(Number(e.target.value))} />
              </div>
              <div>
                <Label>Available for pickup (days)</Label>
                <Input type="number" min={1} max={30} value={availabilityDays} onChange={(e) => setAvailabilityDays(Number(e.target.value))} />
              </div>
            </div>
            <p className="text-xs text-nv-credit">Estimated carbon credits on sale: ~{estCredits.toLocaleString()} (demo)</p>
            <Button onClick={() => setStep('pathways')}>Review pathways</Button>
          </CardContent>
        </Card>
      )}

      {step === 'pathways' && (
        <Card>
          <CardHeader><CardTitle>Utilisation pathway</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <PathwayList pathways={pathways} />
            <Button onClick={publish}>Publish listing & request buyer offers</Button>
          </CardContent>
        </Card>
      )}

      {step === 'offers' && (
        <div className="space-y-3">
          <h2 className="font-semibold">Buyer offers (marketplace)</h2>
          {listingOffers.length === 0 && (
            <p className="text-sm text-nv-muted">Loading offers… go back and publish again if empty.</p>
          )}
          {listingOffers
            .sort((a, b) => b.matchScore - a.matchScore)
            .map((o, i) => (
              <Card
                key={o.id}
                className={`cursor-pointer ${selectedOfferId === o.id ? 'ring-1 ring-nv-green' : ''}`}
                onClick={() => setSelectedOfferId(o.id)}
              >
                <CardContent className="pt-5 space-y-2">
                  {i === 0 && <Badge variant="success">Top match</Badge>}
                  <p className="font-medium">{o.buyerName}</p>
                  <p className="text-sm text-nv-muted">{o.quantityTonnes}t @ {formatINR(o.pricePerTon)}/t · Total {formatINR(o.quantityTonnes * o.pricePerTon)}</p>
                  <MatchScoreBreakdown breakdown={o.breakdown} />
                  {ranked.find((r) => r.buyer.id === o.buyerId)?.reasons?.slice(0, 2).map((reason) => (
                    <p key={reason} className="text-[11px] text-nv-muted">· {reason}</p>
                  ))}
                </CardContent>
              </Card>
            ))}
          <Button onClick={acceptSelectedOffer} disabled={!selectedOfferId}>Accept offer & schedule logistics</Button>
        </div>
      )}

      {step === 'logistics' && (
        <Card>
          <CardHeader><CardTitle>Logistics</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <TransactionStepper status={completedTxn?.status ?? 'accepted'} />
            <div className="grid sm:grid-cols-2 gap-3">
              <button
                type="button"
                className={`rounded-xl border p-4 text-left ${logisticsMode === 'individual' ? 'border-nv-green bg-nv-green/5' : 'border-nv-border'}`}
                onClick={() => setLogisticsMode('individual')}
              >
                <p className="font-medium text-sm">Direct pickup</p>
                <p className="text-xs text-nv-muted mt-1">Farm → processor</p>
              </button>
              <button
                type="button"
                className={`rounded-xl border p-4 text-left ${logisticsMode === 'consolidated' ? 'border-nv-green bg-nv-green/5' : 'border-nv-border'}`}
                onClick={() => setLogisticsMode('consolidated')}
              >
                <p className="font-medium text-sm">Collection hub</p>
                <p className="text-xs text-nv-muted mt-1">Lower transport emissions (model)</p>
              </button>
            </div>
            <Button onClick={finish}>Confirm delivery & issue credits</Button>
          </CardContent>
        </Card>
      )}

      {step === 'complete' && (
        <Card className="border-nv-green/30">
          <CardHeader><CardTitle>Sale complete</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-3 gap-3 text-sm">
              <div className="rounded-xl bg-nv-elevated p-4">
                <p className="text-nv-muted">Cash to you</p>
                <p className="text-xl font-semibold">{formatINR(completedTxn?.amount ?? valuation.net)}</p>
              </div>
              <div className="rounded-xl bg-nv-elevated p-4">
                <p className="text-nv-muted">Credits earned</p>
                <p className="text-xl font-semibold text-nv-credit">+{estCredits.toLocaleString()}</p>
              </div>
              <div className="rounded-xl bg-nv-elevated p-4">
                <p className="text-nv-muted">Wallet balance</p>
                <p className="text-xl font-semibold text-nv-credit">{wallet.balance.toLocaleString()}</p>
              </div>
            </div>
            <TransactionStepper status="completed" />
            <p className="text-sm text-nv-muted">~{carbon.avoided.toFixed(1)} tCO₂e avoided vs burning — supports Punjab air quality (model).</p>
            <div className="flex flex-wrap gap-2">
              <Link to="/farmer/credits"><Button>Redeem credits</Button></Link>
              <Link to="/government"><Button variant="outline">See pollution impact</Button></Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
