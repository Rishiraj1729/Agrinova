import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mic, Truck, Leaf } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { TrustBadge } from '../../components/ui/TrustBadge'
import {
  currentFarmer, findBuyersForResidue, calculateCarbonImpact, logisticsJobs,
} from '../../data/agrinoveData'
import { formatINR } from '../../lib/utils'
import type { ResidueType } from '../../types'

type Step = 'list' | 'match' | 'transaction' | 'logistics' | 'carbon'

export default function ResiduePage() {
  const [step, setStep] = useState<Step>('list')
  const [quantity, setQuantity] = useState(3)
  const [residueType] = useState<ResidueType>('Rice Straw')
  const [selectedBuyer, setSelectedBuyer] = useState<string | null>(null)
  void selectedBuyer

  const steps: Step[] = ['list', 'match', 'transaction', 'logistics', 'carbon']
  const stepIndex = steps.indexOf(step)
  const buyers = findBuyersForResidue(residueType, quantity)
  const bestBuyer = buyers[0]
  const carbon = calculateCarbonImpact(quantity, 'sell')
  const income = bestBuyer ? bestBuyer.estimatedValue : 0

  function handleList() { setStep('match') }
  function handleSelectBuyer(id: string) { setSelectedBuyer(id); setStep('transaction') }
  function handleConfirm() { setStep('logistics') }
  function handleLogistics() { setStep('carbon') }

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Residue Marketplace</h1>
        <p className="text-sm text-nv-muted">Demo flow: List → Match → Transact → Logistics → Carbon Impact</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {steps.map((s, i) => (
          <Badge key={s} variant={step === s ? 'success' : i < stepIndex ? 'info' : 'default'}>
            {i + 1}. {s}
          </Badge>
        ))}
      </div>

      {step === 'list' && (
        <Card>
          <CardHeader><CardTitle>List Your Residue</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-nv-border bg-nv-dark p-4">
              <p className="text-sm text-nv-muted">Material</p>
              <p className="font-medium text-lg">{residueType} (Rice)</p>
            </div>
            <div>
              <label className="text-sm text-nv-muted">Quantity: {quantity} tonnes</label>
              <input type="range" min={1} max={10} step={0.5} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full mt-2 accent-nv-green" />
            </div>
            <p className="text-sm text-nv-muted">Location: {currentFarmer.village}, {currentFarmer.district}</p>
            <Button onClick={handleList}>Find Buyers →</Button>
          </CardContent>
        </Card>
      )}

      {step === 'match' && (
        <div className="space-y-3">
          <TrustBadge confidence={87} reason="Match score based on distance, price, demand, and rating (demo algorithm)" />
          {buyers.slice(0, 4).map((b, i) => (
            <Card key={b.id} className={i === 0 ? 'border-nv-green/40' : ''}>
              <CardContent className="flex items-center justify-between pt-5 gap-4 flex-wrap">
                <div>
                  {i === 0 && <Badge variant="success" className="mb-2">Best Match · {b.matchScore}%</Badge>}
                  <p className="font-medium">{b.name}</p>
                  <p className="text-sm text-nv-muted">{b.type} · {b.distanceKm} km · {formatINR(b.pricePerTon)}/t</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-nv-green">{formatINR(b.estimatedValue)}</p>
                  <Button size="sm" onClick={() => handleSelectBuyer(b.id)}>Select</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {step === 'transaction' && bestBuyer && (
        <Card>
          <CardHeader><CardTitle>Simulate Transaction</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-nv-green/10 border border-nv-green/30 p-4">
              <p className="text-sm text-nv-muted">Buyer</p>
              <p className="font-medium">{bestBuyer.name}</p>
              <p className="text-2xl font-semibold text-nv-green mt-2">{formatINR(income)}</p>
              <p className="text-sm text-nv-muted">{quantity}t {residueType}</p>
            </div>
            <p className="text-sm text-nv-muted">vs burning: ₹0 earned + estimated fine risk {formatINR(currentFarmer.acres * 15000)}</p>
            <Button onClick={handleConfirm}>Confirm & Schedule Logistics →</Button>
          </CardContent>
        </Card>
      )}

      {step === 'logistics' && (
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Truck className="h-5 w-5 text-nv-green" />
            <CardTitle>Logistics Assigned</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {logisticsJobs.slice(0, 1).map((j) => (
              <div key={j.id} className="rounded-lg border border-nv-border p-4">
                <p className="font-medium">{j.from} → {j.to}</p>
                <p className="text-sm text-nv-muted">{j.distanceKm} km · {j.vehicle} · ETA: {j.eta}</p>
                <Badge variant="info" className="mt-2">{j.status.replace('_', ' ')}</Badge>
              </div>
            ))}
            <Button onClick={handleLogistics}>Calculate Carbon Impact →</Button>
          </CardContent>
        </Card>
      )}

      {step === 'carbon' && (
        <Card className="border-nv-green/30">
          <CardHeader className="flex flex-row items-center gap-2">
            <Leaf className="h-5 w-5 text-nv-green" />
            <CardTitle>Estimated Carbon Impact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-red-500/10 p-4 text-center">
                <p className="text-xs text-nv-muted">Baseline (burning)</p>
                <p className="text-2xl font-semibold text-red-400">{carbon.baseline.toFixed(1)} t</p>
              </div>
              <div className="rounded-lg bg-nv-muted/10 p-4 text-center">
                <p className="text-xs text-nv-muted">Alternative (selling)</p>
                <p className="text-2xl font-semibold">{carbon.alternative.toFixed(1)} t</p>
              </div>
              <div className="rounded-lg bg-nv-green/10 p-4 text-center">
                <p className="text-xs text-nv-muted">Avoided</p>
                <p className="text-2xl font-semibold text-nv-green">{carbon.avoided.toFixed(1)} t CO₂e</p>
              </div>
            </div>
            <p className="text-sm text-amber-400/90 border border-amber-500/20 rounded-lg p-3">
              ⚠️ Project-level estimate; not a certified carbon credit. Assumptions: 1.5 t CO₂e/t residue (burning) vs 0.25 t (selling pathway).
            </p>
            <div className="rounded-lg bg-nv-green/10 p-4">
              <p className="font-medium text-nv-green">Farmer Income: {formatINR(income)}</p>
              <p className="text-sm text-nv-muted mt-1">Environmental + economic impact demonstrated</p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Link to="/farmer/carbon"><Button variant="outline">Full Carbon Dashboard</Button></Link>
              <Link to="/science"><Button variant="secondary">Science & Methodology</Button></Link>
              <Link to="/presentation"><Button>Presentation Mode</Button></Link>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-dashed">
        <CardContent className="flex items-center gap-3 pt-5">
          <Mic className="h-5 w-5 text-nv-green" />
          <div className="flex-1">
            <p className="text-sm font-medium">Voice Prototype</p>
            <p className="text-xs text-nv-muted">"मेरे पास तीन टन धान का भूसा है" → auto-detect material + quantity</p>
          </div>
          <Link to="/farmer/ai"><Button variant="ghost" size="sm">Try →</Button></Link>
        </CardContent>
      </Card>
    </div>
  )
}
