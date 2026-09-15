import { Link } from 'react-router-dom'
import { ArrowRight, Coins, Map, Recycle, LogOut } from 'lucide-react'
import { AreaChart, Area, ResponsiveContainer } from 'recharts'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { SourceNote } from '../components/SourceNote'
import { monthlyImpact } from '../data/analyticsData'
import { punjabUseCase } from '../data/useCases'
import { useAuth } from '../contexts/AuthContext'

export default function HomePage() {
  const { user, logout } = useAuth()

  if (!user) return null

  const isSeller = user.role === 'seller'
  const isBuyer = user.role === 'buyer'
  const isGov = user.role === 'government'
  const isAdmin = user.role === 'admin'

  return (
    <div className="animate-fade-in max-w-3xl mx-auto space-y-10">
      <section className="pt-4">
        <Badge variant="info" className="mb-3">{user.role === 'seller' ? 'Farmer desk' : user.role === 'buyer' ? 'Buyer desk' : user.role === 'government' ? 'Government desk' : 'Admin desk'}</Badge>
        <h1 className="text-3xl font-semibold tracking-tight">
          Welcome, {user.displayName.split(' ')[0]}
        </h1>
        <p className="mt-2 text-sm text-nv-muted">
          {user.village}, {user.district} · This session is only your profile — switch account to open another desk.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {isSeller && (
            <>
              <Link to="/farmer/map"><Button><Map className="mr-2 h-4 w-4" /> Plot map</Button></Link>
              <Link to="/farmer/sell?qty=5"><Button variant="outline"><Recycle className="mr-2 h-4 w-4" /> Sell residue</Button></Link>
              <Link to="/farmer/credits"><Button variant="outline"><Coins className="mr-2 h-4 w-4" /> Credits</Button></Link>
            </>
          )}
          {isBuyer && <Link to="/business"><Button>Open procurement <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>}
          {isGov && <Link to="/government"><Button>Air & policy desk <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>}
          {isAdmin && <Link to="/admin"><Button>Operations <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>}
          <Link to="/login" onClick={() => logout()}>
            <Button variant="ghost"><LogOut className="mr-2 h-4 w-4" /> Switch account</Button>
          </Link>
        </div>
      </section>

      {isSeller && (
        <Card className="border-nv-green/20">
          <CardContent className="pt-5">
            <p className="font-semibold">Your job this season</p>
            <p className="text-sm text-nv-muted mt-2 leading-relaxed">{punjabUseCase.problem}</p>
          </CardContent>
        </Card>
      )}

      <Card className="overflow-hidden">
        <CardContent className="pt-6">
          <p className="font-semibold mb-1">Punjab residue trend (demo cluster)</p>
          <p className="text-xs text-nv-muted mb-4">Shared context — not your personal ledger</p>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={monthlyImpact}>
              <Area type="monotone" dataKey="sold" stroke="#138808" fill="#138808" fillOpacity={0.25} />
              <Area type="monotone" dataKey="burned" stroke="#ff9933" fill="#ff9933" fillOpacity={0.15} />
            </AreaChart>
          </ResponsiveContainer>
          <SourceNote provenance="MODEL_ESTIMATE">
            Green utilised · saffron burned trend. Scaled to the 25-farm demo pack.
          </SourceNote>
        </CardContent>
      </Card>

      <p className="text-center text-xs text-nv-muted pb-8">
        Other roles stay separate — Switch account on login.{' '}
        <Link to="/presentation" className="text-nv-navy underline">Presentation</Link>
      </p>
    </div>
  )
}
