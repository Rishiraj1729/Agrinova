import { Coins, Leaf } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { PageHeader } from '../../components/ui/PageHeader'
import { useToast } from '../../components/ui/Toast'
import { useCaseStudy } from '../../contexts/CaseStudyContext'
import { useMarketplace } from '../../contexts/MarketplaceContext'
import { farmerFromSession, useAuth } from '../../contexts/AuthContext'
import { redemptionCatalog, CREDITS_PER_TCO2E } from '../../data/redemptionCatalog'

export default function CreditsPage() {
  const { demoFarmer, farmers } = useCaseStudy()
  const { user } = useAuth()
  const { notify } = useToast()
  const farmer = farmerFromSession(user, farmers, demoFarmer)
  const { getWallet, redeemCredits, redemptions, ledger } = useMarketplace()
  const wallet = getWallet(farmer.id)
  const myRedemptions = (redemptions ?? []).filter((r) => r.farmerId === farmer.id)
  const earnedFromLedger = ledger
    .filter((e) => e.farmerId === farmer.id)
    .reduce((s, e) => s + Math.round(e.avoidedTco2e * CREDITS_PER_TCO2E), 0)

  function onRedeem(itemId: string, itemName: string, cost: number) {
    const ok = redeemCredits(farmer.id, itemId)
    if (ok) notify('Redeemed', `${itemName} for ${cost} credits`, 'success')
    else notify('Not enough credits', `Need ${cost} credits for ${itemName}`, 'warning')
  }

  return (
    <div className="animate-fade-in space-y-6 max-w-3xl">
      <PageHeader
        icon={Coins}
        eyebrow="Farmer wallet"
        title="Carbon credit wallet"
        description={`${user?.displayName ?? farmer.name}'s credits from completed residue sales and redemptions.`}
      />

      <Card className="border-nv-credit/30 bg-gradient-to-br from-nv-credit/10 to-transparent">
        <CardContent className="pt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs text-nv-muted uppercase tracking-wide">Available balance</p>
            <p className="text-4xl font-semibold text-nv-credit flex items-center gap-2 mt-1">
              <Coins className="h-8 w-8" />
              {wallet.balance.toLocaleString()}
            </p>
            <p className="text-xs text-nv-muted mt-2">AgriNova Credits · 1 credit ≈ 1 kg CO₂e avoided (demo unit)</p>
          </div>
          <div className="text-right text-sm text-nv-muted">
            <p>Lifetime earned: {wallet.lifetimeEarned.toLocaleString()}</p>
            <p>Redeemed: {wallet.lifetimeRedeemed.toLocaleString()}</p>
            <p className="text-nv-credit mt-1">From ledger: {earnedFromLedger.toLocaleString()} cr.</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Redeem for farm inputs</CardTitle></CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          {redemptionCatalog.map((item) => (
            <div key={item.id} className="rounded-lg border border-nv-border p-4 flex flex-col">
              <div className="flex justify-between items-start gap-2">
                <p className="font-medium text-sm">{item.name}</p>
                <Badge className="bg-nv-credit/15 text-nv-credit border-0">{item.creditsCost} cr</Badge>
              </div>
              <p className="text-xs text-nv-muted mt-2 flex-1">{item.description}</p>
              <Button
                size="sm"
                variant="outline"
                className="mt-3 w-full border-nv-credit/40 text-nv-credit hover:bg-nv-credit/10"
                disabled={wallet.balance < item.creditsCost}
                onClick={() => onRedeem(item.id, item.name, item.creditsCost)}
              >
                Redeem
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {myRedemptions.length > 0 && (
        <Card>
          <CardHeader><CardTitle className="text-base">Redemption history</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            {myRedemptions.map((r) => (
              <div key={r.id} className="flex justify-between border-b border-nv-border pb-2">
                <span>{r.itemName}</span>
                <span className="text-nv-muted">−{r.creditsSpent} · {r.date}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card className="border-nv-border">
        <CardContent className="pt-5 flex gap-3 text-sm text-nv-muted">
          <Leaf className="h-5 w-5 text-nv-green shrink-0" />
          <p>
            Completing a sale on the marketplace issues credits automatically. This prototype is not a regulated carbon market — credits are for demonstration of circular incentives in Punjab.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
