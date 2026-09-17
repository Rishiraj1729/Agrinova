import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sprout, Building2, Landmark, Shield, ChevronDown } from 'lucide-react'
import { useAuth, type AuthRole } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'
import { demoProfiles } from '../data/profiles'
import {
  DISTRICTS_BY_STATE,
  INDIA_STATES,
  localitiesFor,
  type IndiaState,
} from '../data/indiaLocations'
import { Button } from '../components/ui/Button'
import { Input, Label, Select } from '../components/ui/Input'
import { cn } from '../lib/utils'

const homeFor: Record<AuthRole, string> = {
  seller: '/farmer',
  buyer: '/business',
  government: '/government',
  admin: '/admin',
}

const roleMeta = [
  { id: 'seller' as const, labelKey: 'login.farmer', hintKey: 'login.farmerh', Icon: Sprout },
  { id: 'buyer' as const, labelKey: 'login.buyer', hintKey: 'login.buyerh', Icon: Building2 },
  { id: 'government' as const, labelKey: 'login.gov', hintKey: 'login.govh', Icon: Landmark },
  { id: 'admin' as const, labelKey: 'login.admin', hintKey: 'login.adminh', Icon: Shield },
]

const defaultByRole: Record<AuthRole, string> = {
  seller: 'ramesh',
  buyer: 'biswajit',
  government: 'anil',
  admin: 'kavya',
}

export default function LoginPage() {
  const { loginAs, loginCustom } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [step, setStep] = useState<'role' | 'form'>('role')
  const [role, setRole] = useState<AuthRole>('seller')
  const [name, setName] = useState('')
  const [stateName, setStateName] = useState<IndiaState>('West Bengal')
  const [district, setDistrict] = useState('North 24 Parganas')
  const [wardId, setWardId] = useState('mg-doltala')
  const [acres, setAcres] = useState(3)
  const [phone, setPhone] = useState('')
  const [showDemo, setShowDemo] = useState(false)
  const [demoId, setDemoId] = useState('ramesh')
  const [formTab, setFormTab] = useState<'identity' | 'place' | 'land'>('identity')

  const people = demoProfiles.filter((p) => p.role === role)
  const districts = DISTRICTS_BY_STATE[stateName]
  const wards = useMemo(() => localitiesFor(stateName, district), [stateName, district])
  const ward = wards.find((w) => w.id === wardId) ?? wards[0]

  function chooseRole(next: AuthRole) {
    setRole(next)
    setStateName('West Bengal')
    setDistrict('North 24 Parganas')
    setWardId(next === 'government' ? 'mg-conservancy' : next === 'buyer' ? 'mg-conservancy' : 'mg-doltala')
    setAcres(next === 'seller' ? 3 : 0)
    setPhone('')
    setName('')
    setDemoId(defaultByRole[next])
    setShowDemo(false)
    setFormTab('identity')
    setStep('form')
  }

  function onStateChange(s: IndiaState) {
    setStateName(s)
    const first = DISTRICTS_BY_STATE[s][0]
    setDistrict(first)
    const locs = localitiesFor(s, first)
    setWardId(locs[0]?.id ?? '')
  }

  function enterNew() {
    loginCustom({
      role,
      displayName: name,
      village: ward?.label ?? '',
      district,
      state: stateName,
      acres,
      phone,
    })
    navigate(homeFor[role])
  }

  function enterDemo() {
    const p = demoProfiles.find((x) => x.id === demoId)
    if (!p) return
    const overrides: Parameters<typeof loginAs>[1] = {
      state: stateName,
      district,
      village: ward?.label,
    }
    if (name.trim()) overrides.displayName = name.trim()
    if (phone.trim()) overrides.phone = phone.trim()
    if (role === 'seller') overrides.acres = acres
    loginAs(demoId, overrides)
    navigate(homeFor[p.role])
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-56px)] max-w-lg flex-col justify-center px-4 py-12">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight">{t('login.title')}</h1>
        <p className="mt-2 text-sm leading-relaxed text-nv-muted">{t('login.sub')}</p>
        <p className="mt-2 text-[12px] text-nv-green">Default desk: West Bengal · North 24 Parganas wards</p>
      </div>

      {step === 'role' && (
        <div className="mt-8 space-y-2">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-nv-muted">{t('login.role')}</p>
          {roleMeta.map(({ id, labelKey, hintKey, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => chooseRole(id)}
              className="flex w-full items-center gap-4 rounded-2xl border border-nv-border bg-white px-4 py-4 text-left transition-colors hover:bg-[#fafafa]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-nv-elevated text-nv-green">
                <Icon className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold">{t(labelKey)}</span>
                <span className="block text-sm text-nv-muted">{t(hintKey)}</span>
              </span>
            </button>
          ))}
        </div>
      )}

      {step === 'form' && (
        <form
          className="mt-8 space-y-4 rounded-3xl border border-nv-border bg-white p-6"
          onSubmit={(e) => {
            e.preventDefault()
            enterNew()
          }}
        >
          <p className="text-sm text-nv-muted">
            {t('login.role')}{' '}
            <strong className="text-nv-fg">{t(roleMeta.find((r) => r.id === role)!.labelKey)}</strong>
            {' · '}
            <button type="button" className="underline underline-offset-2" onClick={() => setStep('role')}>
              {t('login.back')}
            </button>
          </p>

          <div className="flex gap-1 rounded-full bg-nv-elevated p-1">
            {(
              [
                ['identity', 'Identity'],
                ['place', 'State / Ward'],
                ['land', 'Land'],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setFormTab(id)}
                className={cn(
                  'flex-1 rounded-full px-2 py-1.5 text-[12px] font-medium',
                  formTab === id ? 'bg-white text-nv-fg shadow-sm' : 'text-nv-muted',
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {formTab === 'identity' && (
            <div className="space-y-3">
              <div>
                <Label>{t('login.name')}</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your name" />
              </div>
              <div>
                <Label>{t('login.phone')}</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91" />
              </div>
            </div>
          )}

          {formTab === 'place' && (
            <div className="space-y-3">
              <div>
                <Label>State (India)</Label>
                <Select
                  value={stateName}
                  onChange={(e) => onStateChange(e.target.value as IndiaState)}
                >
                  {INDIA_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label>District</Label>
                <Select
                  value={district}
                  onChange={(e) => {
                    setDistrict(e.target.value)
                    const locs = localitiesFor(stateName, e.target.value)
                    setWardId(locs[0]?.id ?? '')
                  }}
                >
                  {districts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label>{stateName === 'West Bengal' ? 'Ward / locality (ULB)' : 'Locality (phone belt)'}</Label>
                <Select value={wardId} onChange={(e) => setWardId(e.target.value)}>
                  {wards.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.label} — {w.municipality}
                    </option>
                  ))}
                </Select>
                <p className="mt-1 text-[11px] text-nv-muted">
                  India municipal / ward framing for NCSC — Madhyamgram & Barasat first.
                </p>
              </div>
            </div>
          )}

          {formTab === 'land' && (
            <div className="space-y-3">
              {role === 'seller' ? (
                <div>
                  <Label>{t('login.acres')}</Label>
                  <Input
                    type="number"
                    min={0.5}
                    step={0.5}
                    value={acres}
                    onChange={(e) => setAcres(Number(e.target.value))}
                  />
                  <p className="mt-1 text-[11px] text-nv-muted">
                    Working straw ≈ acres × 2.0 t/acre (rice). Shown on Kisan Bandhu.
                  </p>
                </div>
              ) : (
                <p className="text-sm text-nv-muted">Land acres apply to farmer desks. Continue to enter.</p>
              )}
            </div>
          )}

          <Button className="w-full" size="lg" type="submit">
            {t('login.new')}
          </Button>

          <div className="border-t border-nv-border pt-3">
            <button
              type="button"
              onClick={() => setShowDemo((v) => !v)}
              className="flex w-full items-center justify-between text-left text-sm text-nv-muted hover:text-nv-fg"
            >
              <span>{t('login.demo')}</span>
              <ChevronDown className={cn('h-4 w-4 transition', showDemo && 'rotate-180')} />
            </button>
            {showDemo && (
              <div className="mt-3 space-y-3">
                <p className="text-[12px] leading-relaxed text-nv-muted">{t('login.demoHint')}</p>
                <Select value={demoId} onChange={(e) => setDemoId(e.target.value)}>
                  {people.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — {p.title}
                    </option>
                  ))}
                </Select>
                <Button type="button" variant="outline" className="w-full" onClick={enterDemo}>
                  {t('login.enter')}
                </Button>
              </div>
            )}
          </div>
        </form>
      )}

      <p className="mt-8 text-center text-xs text-nv-muted">
        <Link to="/case-studies" className="hover:text-nv-fg">
          {t('nav.cases')}
        </Link>
        {' · '}
        <Link to="/presentation" className="hover:text-nv-fg">
          {t('nav.presentation')}
        </Link>
      </p>
    </div>
  )
}
