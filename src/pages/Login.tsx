import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sprout, Building2, Landmark, Shield } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { demoProfiles } from '../data/profiles'
import { Button } from '../components/ui/Button'
import { Input, Label, Select } from '../components/ui/Input'
import type { CropType } from '../types'
import { cn } from '../lib/utils'

const homeFor: Record<string, string> = {
  seller: '/farmer',
  buyer: '/business',
  government: '/government',
  admin: '/admin',
}

const roles = [
  { id: 'seller' as const, label: 'Farmer', hint: 'Sell residue · credits', Icon: Sprout },
  { id: 'buyer' as const, label: 'Buyer', hint: 'Procure biomass', Icon: Building2 },
  { id: 'government' as const, label: 'Government', hint: 'Air & policy desk', Icon: Landmark },
  { id: 'admin' as const, label: 'Admin', hint: 'Operations · MRV', Icon: Shield },
]

const defaultByRole: Record<string, string> = {
  seller: 'ramesh',
  buyer: 'priya',
  government: 'anil',
  admin: 'kavya',
}

export default function LoginPage() {
  const { loginAs } = useAuth()
  const navigate = useNavigate()
  const [role, setRole] = useState<'seller' | 'buyer' | 'government' | 'admin'>('seller')
  const [selected, setSelected] = useState('ramesh')
  const [name, setName] = useState('Ramesh Singh')
  const [village, setVillage] = useState('Kharar')
  const [district, setDistrict] = useState('Patiala')
  const [acres, setAcres] = useState(6)
  const [age, setAge] = useState(42)
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male')
  const [phone, setPhone] = useState('+91 98765 10421')

  const people = demoProfiles.filter((p) => p.role === role)

  function chooseRole(next: typeof role) {
    setRole(next)
    pick(defaultByRole[next])
  }

  function pick(id: string) {
    const p = demoProfiles.find((x) => x.id === id)!
    setSelected(id)
    setName(p.name)
    setGender(id === 'simran' || id === 'priya' || id === 'kavya' ? 'female' : 'male')
    if (id === 'ramesh') {
      setVillage('Kharar'); setDistrict('Patiala'); setAcres(6); setAge(42); setPhone('+91 98765 10421')
    } else if (id === 'simran') {
      setVillage('Sunam'); setDistrict('Sangrur'); setAcres(4); setAge(34); setPhone('+91 98765 22023')
    } else if (id === 'priya') {
      setVillage('Rajpura'); setDistrict('Patiala'); setAcres(0); setAge(36); setPhone('+91 98150 33001')
    } else if (id === 'anil') {
      setVillage('Patiala'); setDistrict('Patiala'); setAcres(0); setAge(48); setPhone('+91 17200 00001')
    } else {
      setVillage('Chandigarh'); setDistrict('SAS Nagar'); setAcres(0); setAge(29); setPhone('+91 98720 00009')
    }
  }

  function enter() {
    const p = demoProfiles.find((x) => x.id === selected)!
    loginAs(selected, {
      displayName: name,
      village,
      district,
      acres,
      age,
      gender,
      phone,
      crops: ['Rice', 'Wheat'] as CropType[],
    })
    navigate(homeFor[p.role] ?? '/')
  }

  return (
    <div className="min-h-screen bg-nv-page text-nv-fg">
      <div className="tri-bar" />
      <div className="mx-auto flex min-h-[calc(100vh-5px)] max-w-lg flex-col justify-center px-4 py-10">
        <div className="mb-8 text-center">
          <div className="tri-mark mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-lg">
            A
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-nv-fg">AgriNova</h1>
          <p className="mt-1 text-sm text-nv-muted">Login — select your role to continue</p>
        </div>

        <div className="rounded-2xl border border-nv-border bg-white p-6 shadow-sm">
          <Label>Role</Label>
          <div className="mb-5 grid grid-cols-2 gap-2">
            {roles.map(({ id, label, hint, Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => chooseRole(id)}
                className={cn(
                  'rounded-xl border p-3 text-left transition',
                  role === id
                    ? 'border-nv-green bg-nv-green/8 ring-1 ring-nv-green/30'
                    : 'border-nv-border bg-nv-elevated hover:border-nv-saffron/50',
                )}
              >
                <Icon className={cn('mb-1.5 h-4 w-4', role === id ? 'text-nv-green' : 'text-nv-saffron')} />
                <p className="text-sm font-semibold">{label}</p>
                <p className="text-[11px] text-nv-muted">{hint}</p>
              </button>
            ))}
          </div>

          <Label>Profile</Label>
          <Select
            className="mb-4"
            value={selected}
            onChange={(e) => pick(e.target.value)}
          >
            {people.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — {p.title}
              </option>
            ))}
          </Select>

          <div className="mb-4 grid grid-cols-2 gap-3">
            <div>
              <Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <Label>District</Label>
              <Input value={district} onChange={(e) => setDistrict(e.target.value)} />
            </div>
          </div>

          <div className="mb-5 grid grid-cols-2 gap-3">
            <div>
              <Label>Village / office</Label>
              <Input value={village} onChange={(e) => setVillage(e.target.value)} />
            </div>
            <div>
              <Label>Phone</Label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>

          {role === 'seller' && (
            <div className="mb-5">
              <Label>Land (acres)</Label>
              <Input type="number" value={acres} onChange={(e) => setAcres(Number(e.target.value))} />
            </div>
          )}

          <div className="mb-5 grid grid-cols-2 gap-3">
            <div>
              <Label>Age</Label>
              <Input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} />
            </div>
            <div>
              <Label>Gender</Label>
              <Select value={gender} onChange={(e) => setGender(e.target.value as typeof gender)}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Select>
            </div>
          </div>

          <Button className="w-full" size="lg" onClick={enter}>
            Login as {name.split(' ')[0]}
          </Button>
          <Link
            to="/presentation"
            className="mt-4 block text-center text-sm text-nv-navy underline-offset-2 hover:underline"
          >
            Open project presentation
          </Link>
        </div>
      </div>
    </div>
  )
}
