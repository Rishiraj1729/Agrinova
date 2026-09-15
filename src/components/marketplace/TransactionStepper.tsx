import type { ListingStatus } from '../../types'
import { cn } from '../../lib/utils'

const FLOW: ListingStatus[] = [
  'listed',
  'offer_received',
  'accepted',
  'collection_scheduled',
  'collected',
  'delivered',
  'completed',
]

const labels: Partial<Record<ListingStatus, string>> = {
  listed: 'Listed',
  offer_received: 'Offers',
  accepted: 'Accepted',
  collection_scheduled: 'Scheduled',
  collected: 'Collected',
  delivered: 'Delivered',
  completed: 'Completed',
}

export function TransactionStepper({ status }: { status: ListingStatus | string }) {
  const idx = FLOW.indexOf(status as ListingStatus)
  const active = idx < 0 ? 0 : idx

  return (
    <div className="flex flex-wrap gap-1">
      {FLOW.map((s, i) => (
        <div
          key={s}
          className={cn(
            'rounded-full px-2 py-0.5 text-[10px] font-medium border',
            i <= active ? 'border-nv-green/50 bg-nv-green/10 text-nv-green' : 'border-nv-border text-nv-muted',
          )}
        >
          {labels[s] ?? s}
        </div>
      ))}
    </div>
  )
}
