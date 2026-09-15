import { Link } from 'react-router-dom'
import { AlertTriangle, ArrowRight, Coins } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { TransactionStepper } from '../../components/marketplace/TransactionStepper'
import { SourceNote } from '../../components/SourceNote'
import { useCaseStudy } from '../../contexts/CaseStudyContext'
import { useMarketplace } from '../../contexts/MarketplaceContext'
import { cropRisks } from '../../data/caseStudies/punjab'
import { demoProfiles } from '../../data/profiles'
import { formatINR } from '../../lib/utils'

export default function FarmerDashboard() {
  const { demoFarmer } = useCaseStudy()
  const { listings, transactions, getWallet } = useMarketplace()
  const profile = demoProfiles.find((p) => p.farmerId === demoFarmer.id) ?? demoProfiles[0]
  const wallet = getWallet(demoFarmer.id)
  const myListings = listings.filter((l) => l.farmerId === demoFarmer.id)
  const myTxn = transactions.find((t) => t.farmerId === demoFarmer.id && t.status !== 'completed')
  const strawEstimate = (demoFarmer.riceAcresThisSeason ?? 2.5) * 2
  const highRisk = cropRisks.find((r) => r.riskLevel === 'high')

  return (
    <div className="animate-fade-in space-y-6 max-w-4xl">
      <div className="flex gap-4 items-start">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-nv-elevated text-lg font-semibold">
          {demoFarmer.initials ?? 'RS'}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight">{demoFarmer.name}</h1>
          <p className="text-sm text-nv-muted">
            {demoFarmer.village}, {demoFarmer.district} · {demoFarmer.acres} acres · rice–wheat · KCC ···{demoFarmer.kccLast4 ?? '4821'}
          </p>
          <p className="text-sm mt-2 text-nv-fg/90 max-w-xl">“{profile.quote}”</p>
        </div>
        <Link to="/farmer/sell?qty=5"><Button>List residue</Button></Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-5">
            <p className="text-xs text-nv-muted">Days to wheat sowing</p>
            <p className="text-3xl font-semibold text-nv-credit mt-1">{demoFarmer.sowingWindowDays ?? 12}</p>
            <SourceNote provenance="PUBLIC_DATA">Typical 10–20 day CRM window.</SourceNote>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-xs text-nv-muted">Straw on the field now</p>
            <p className="text-3xl font-semibold mt-1">{strawEstimate.toFixed(1)} t</p>
            <p className="text-[11px] text-nv-muted mt-1">
              {demoFarmer.riceAcresThisSeason ?? 2.5} rice acres × ~2 t/acre (IARI-style factor)
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-xs text-nv-muted">Credit wallet</p>
            <p className="text-3xl font-semibold text-nv-credit mt-1 flex items-center gap-2">
              <Coins className="h-6 w-6" /> {wallet.balance.toLocaleString()}
            </p>
            <Link to="/farmer/credits" className="text-xs text-nv-green hover:underline">Redeem for urea / seed →</Link>
          </CardContent>
        </Card>
      </div>

      <Card className="border-nv-green/25">
        <CardContent className="pt-5 flex flex-wrap justify-between gap-4 items-center">
          <div>
            <Badge variant="info">This season’s job</Badge>
            <p className="font-semibold mt-2">Sell ~5 t rice straw before the window closes</p>
            <p className="text-sm text-nv-muted max-w-lg mt-1">
              Last kharif you burned {demoFarmer.lastSeasonBurnedTonnes ?? 4.8} t — ₹0 and a fire risk. Moisture, bales, and land area go on the listing so Priya at GreenPower can bid.
            </p>
          </div>
          <Link to="/farmer/map">
            <Button size="lg" variant="outline">Map sown plots</Button>
          </Link>
          <Link to="/farmer/sell?qty=5">
            <Button size="lg">Start listing <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </Link>
        </CardContent>
      </Card>

      {myTxn && (
        <Card>
          <CardHeader><CardTitle>Active sale</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <TransactionStepper status={myTxn.status} />
            <p className="text-sm text-nv-muted">{formatINR(myTxn.amount)} · {myTxn.quantityTonnes}t</p>
            <Link to="/farmer/logistics" className="text-sm text-nv-green hover:underline">Track pickup →</Link>
          </CardContent>
        </Card>
      )}

      {myListings.length > 0 && (
        <Card>
          <CardHeader><CardTitle className="text-base">Your listings</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            {myListings.map((l) => (
              <div key={l.id} className="flex justify-between gap-2 border-b border-nv-border pb-2">
                <span>{l.residueType} · {l.quantityTonnes}t · {l.details ? `${l.details.moisturePercent}% moisture` : l.condition}</span>
                <Badge>{l.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {highRisk && (
        <Card className="border-amber-500/30 bg-amber-500/5">
          <CardContent className="flex items-start gap-3 pt-5">
            <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-amber-300">Rice risk — harvest / residue overlap</p>
              <p className="text-sm text-nv-muted mt-1">{highRisk.recommendation}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
