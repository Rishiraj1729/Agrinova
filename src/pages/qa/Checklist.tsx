import { Link } from 'react-router-dom'
import { useMarketplace } from '../../contexts/MarketplaceContext'

const checks = [
  { label: 'Case study hub', path: '/case-studies', auto: true },
  { label: 'Punjab case study', path: '/case-studies/punjab', auto: true },
  { label: 'West Bengal case study', path: '/case-studies/west-bengal', auto: true },
  { label: 'KisanSathi', path: '/farmer/kisansathi', auto: true },
  { label: 'Sell wizard', path: '/farmer/sell', auto: true },
  { label: 'Buyer portal', path: '/business', auto: true },
  { label: 'Admin', path: '/admin', auto: true },
  { label: 'Government aggregates', path: '/government', auto: true },
  { label: 'Carbon ledger', path: '/carbon/ledger', auto: true },
  { label: 'MRV', path: '/carbon/mrv', auto: true },
  { label: 'Completed txn creates ledger', path: '/carbon/ledger', autoKey: 'ledger' as const },
]

export default function QaChecklistPage() {
  const { ledger } = useMarketplace()
  return (
    <div className="animate-fade-in max-w-xl space-y-4">
      <h1 className="text-2xl font-semibold">PRD §38 checklist (demo)</h1>
      <ul className="space-y-2 text-sm">
        {checks.map((c) => {
          const yes = c.autoKey === 'ledger' ? ledger.length > 0 : c.auto
          return (
            <li key={c.label} className="flex justify-between gap-4 border-b border-nv-border pb-2">
              <Link to={c.path} className="text-nv-green hover:underline">{c.label}</Link>
              <span>{yes ? 'YES' : 'NO'}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
