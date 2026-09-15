import { Link } from 'react-router-dom'
import { Truck } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { TransactionStepper } from '../../components/marketplace/TransactionStepper'
import { useCaseStudy } from '../../contexts/CaseStudyContext'
import { useMarketplace } from '../../contexts/MarketplaceContext'
import { logisticsJobs } from '../../data/caseStudies/punjab'
import { formatINR } from '../../lib/utils'

export default function LogisticsPage() {
  const { demoFarmer, buyers } = useCaseStudy()
  const { transactions, advanceTransaction, completeTransaction } = useMarketplace()

  const mine = transactions.filter((t) => t.farmerId === demoFarmer.id)
  const active = mine.find((t) => t.status !== 'completed')

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Logistics & collection</h1>
        <p className="text-sm text-nv-muted">Live transactions from marketplace + regional demo routes</p>
      </div>

      {active && (
        <Card className="border-nv-green/30">
          <CardHeader><CardTitle>Your active shipment</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <TransactionStepper status={active.status} />
            <p className="text-sm">
              Buyer: {buyers.find((b) => b.id === active.buyerId)?.name ?? 'Processor'} · {active.quantityTonnes}t · {formatINR(active.amount)}
            </p>
            <p className="text-sm text-nv-muted">
              {demoFarmer.village} → {active.logisticsMode === 'consolidated' ? 'Kharar collection hub → Rajpura plant' : 'Direct to Rajpura biomass plant'}
            </p>
            <div className="flex gap-2 flex-wrap">
              {active.status !== 'completed' && (
                <>
                  <Button size="sm" onClick={() => advanceTransaction(active.id)}>Advance status</Button>
                  <Button size="sm" variant="outline" onClick={() => completeTransaction(active.id, active.logisticsMode)}>
                    Mark delivered & complete
                  </Button>
                </>
              )}
              <Link to="/carbon/ledger"><Button size="sm" variant="ghost">Ledger</Button></Link>
            </div>
          </CardContent>
        </Card>
      )}

      {mine.filter((t) => t.status === 'completed').map((t) => (
        <Card key={t.id}>
          <CardContent className="pt-5 flex justify-between flex-wrap gap-2">
            <div>
              <p className="font-medium">Completed · {t.quantityTonnes}t</p>
              <TransactionStepper status="completed" />
            </div>
            <Badge variant="success">{formatINR(t.amount)}</Badge>
          </CardContent>
        </Card>
      ))}

      <h2 className="text-lg font-medium">Regional routes (demonstration)</h2>
      <div className="space-y-3">
        {logisticsJobs.map((j) => (
          <Card key={j.id}>
            <CardContent className="flex items-start gap-4 pt-5">
              <Truck className="h-5 w-5 text-nv-green shrink-0" />
              <div className="flex-1">
                <p className="font-medium">{j.from} → {j.to}</p>
                <p className="text-sm text-nv-muted">{j.distanceKm} km · {j.vehicle}</p>
                <p className="text-sm text-nv-muted">ETA: {j.eta}</p>
              </div>
              <Badge variant={j.status === 'in_transit' ? 'info' : 'warning'}>{j.status.replace('_', ' ')}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
