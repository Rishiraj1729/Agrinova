import { Link } from 'react-router-dom'
import { Card, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useAuth } from '../contexts/AuthContext'
import { LogOut } from 'lucide-react'

const scripts = {
  seller: [
    { step: 1, title: 'Plot map', path: '/farmer/map', action: 'Draw sown fields on OSM' },
    { step: 2, title: 'Sell', path: '/farmer/sell', action: 'Moisture, match, accept offer' },
    { step: 3, title: 'Credits', path: '/farmer/credits', action: 'Redeem seed / fertiliser' },
  ],
  buyer: [
    { step: 1, title: 'Procure', path: '/business', action: 'Review moisture & send offer' },
    { step: 2, title: 'Credits', path: '/business', action: 'See buyer carbon + tax relief' },
  ],
  government: [
    { step: 1, title: 'Air map', path: '/government', action: 'District pulse + before/after' },
  ],
  admin: [
    { step: 1, title: 'Ops', path: '/admin', action: 'Pipeline & MRV queue' },
  ],
}

export default function GuidePage() {
  const { user, logout } = useAuth()
  if (!user) return null
  const steps = scripts[user.role] ?? scripts.seller

  return (
    <div className="animate-fade-in max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Walkthrough — {user.displayName.split(' ')[0]}</h1>
        <p className="text-sm text-nv-muted mt-2">
          Only steps for your signed-in role. Other desks need Switch account.
        </p>
      </div>
      <ol className="space-y-2">
        {steps.map((item) => (
          <li key={item.step}>
            <Link to={item.path}>
              <Card className="hover:border-nv-green/30 transition">
                <CardContent className="pt-4">
                  <p className="font-medium text-sm">Step {item.step}: {item.title}</p>
                  <p className="text-xs text-nv-muted">{item.action}</p>
                </CardContent>
              </Card>
            </Link>
          </li>
        ))}
      </ol>
      <Link to="/login" onClick={() => logout()}>
        <Button variant="outline"><LogOut className="mr-2 h-4 w-4" /> Switch account</Button>
      </Link>
    </div>
  )
}
