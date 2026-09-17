import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { useMarketplace } from '../../contexts/MarketplaceContext'
import { useCaseStudy } from '../../contexts/CaseStudyContext'
import { farmerFromSession, useAuth } from '../../contexts/AuthContext'
import { formatINR } from '../../lib/utils'

export default function ListingsPage() {
  const { listings, offers } = useMarketplace()
  const { demoFarmer, farmers } = useCaseStudy()
  const { user } = useAuth()
  const farmer = farmerFromSession(user, farmers, demoFarmer)
  const mine = listings.filter((l) => l.farmerId === farmer.id)

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex justify-between items-start gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold">My listings</h1>
          <p className="text-sm text-nv-muted">Seller marketplace (demo)</p>
        </div>
        <Link to="/farmer/sell"><Button>New listing</Button></Link>
      </div>
      <div className="space-y-3">
        {mine.map((l) => {
          const listingOffers = offers.filter((o) => o.listingId === l.id)
          return (
            <Card key={l.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex justify-between">
                  <span>{l.residueType} · {l.quantityTonnes}t</span>
                  <Badge>{l.status}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-nv-muted">{l.location} · {formatINR(l.pricePerTon)}/t</p>
                {listingOffers.length > 0 && (
                  <p className="text-xs mt-2">{listingOffers.length} offer(s) — top match {listingOffers[0].matchScore}%</p>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
