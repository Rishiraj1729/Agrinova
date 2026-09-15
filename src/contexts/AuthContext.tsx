import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { CropType } from '../types'
import { demoProfiles, type DemoProfile } from '../data/profiles'
import { defaultKhararRiceParcel, polygonAreaAcresLatLng } from '../lib/geo'

export type AuthRole = 'seller' | 'buyer' | 'government' | 'admin'

export interface SoilProfile {
  type: 'alluvial' | 'sandy_loam' | 'clay_loam' | 'saline'
  ph: number
  organicCarbonPercent: number
  nitrogen: 'low' | 'medium' | 'high'
  notes: string
}

export interface PlotParcel {
  id: string
  label: string
  crop: CropType
  acres: number
  forSale: boolean
  /** Real map vertices (WGS84) */
  points: { lat: number; lng: number }[]
}

export interface SessionUser {
  profileId: string
  role: AuthRole
  displayName: string
  village: string
  district: string
  state: string
  acres: number
  phone: string
  gender: 'male' | 'female' | 'other'
  age: number
  crops: CropType[]
  farmerId?: string
  buyerId?: string
  soil: SoilProfile
  parcels: PlotParcel[]
}

interface AuthContextValue {
  user: SessionUser | null
  loginAs: (profileId: string, overrides?: Partial<SessionUser>) => void
  updateSession: (patch: Partial<SessionUser>) => void
  logout: () => void
  profile: DemoProfile | undefined
}

const STORAGE = 'agrinova_session_v2'

const AuthContext = createContext<AuthContextValue | null>(null)

function defaultSoil(): SoilProfile {
  return {
    type: 'alluvial',
    ph: 7.2,
    organicCarbonPercent: 0.45,
    nitrogen: 'medium',
    notes: 'Patiala belt alluvial — demo soil card for Kisan AI.',
  }
}

function sessionFromProfile(p: DemoProfile, overrides?: Partial<SessionUser>): SessionUser {
  const base: SessionUser = {
    profileId: p.id,
    role: p.role,
    displayName: p.name,
    village: p.org.includes(',') ? p.org.split(',')[0] : p.location.split(',')[0] || 'Kharar',
    district: p.role === 'government' ? 'Patiala' : p.org.includes('Sangrur') ? 'Sangrur' : 'Patiala',
    state: 'Punjab',
    acres: p.id === 'ramesh' ? 6 : p.id === 'simran' ? 4 : 5,
    phone: '+91 98765 00001',
    gender: p.id === 'simran' || p.id === 'priya' || p.id === 'kavya' ? 'female' : 'male',
    age: p.id === 'ramesh' ? 42 : p.id === 'simran' ? 34 : 38,
    crops: ['Rice', 'Wheat'],
    farmerId: p.farmerId,
    buyerId: p.buyerId,
    soil: defaultSoil(),
    parcels: p.role === 'seller'
      ? [
          {
            id: 'parcel-rice',
            label: 'Paddy block A',
            crop: 'Rice',
            acres: polygonAreaAcresLatLng(defaultKhararRiceParcel()),
            forSale: true,
            points: defaultKhararRiceParcel(),
          },
        ]
      : [],
  }
  return { ...base, ...overrides, soil: { ...base.soil, ...overrides?.soil }, parcels: overrides?.parcels ?? base.parcels }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE)
      return raw ? (JSON.parse(raw) as SessionUser) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE, JSON.stringify(user))
    else localStorage.removeItem(STORAGE)
  }, [user])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      profile: demoProfiles.find((p) => p.id === user?.profileId),
      loginAs: (profileId, overrides) => {
        const p = demoProfiles.find((x) => x.id === profileId)
        if (!p) return
        setUser(sessionFromProfile(p, overrides))
      },
      updateSession: (patch) => setUser((u) => (u ? { ...u, ...patch, soil: { ...u.soil, ...patch.soil }, parcels: patch.parcels ?? u.parcels } : u)),
      logout: () => setUser(null),
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth within AuthProvider')
  return ctx
}

/** Straw estimate: ~2 t/acre for paddy (IARI-style), 1.6 for wheat stubble demo */
export function estimateStrawFromParcels(parcels: PlotParcel[]) {
  return parcels
    .filter((p) => p.forSale)
    .reduce((sum, p) => {
      const factor = p.crop === 'Rice' ? 2.0 : p.crop === 'Wheat' ? 1.6 : 1.4
      return sum + p.acres * factor
    }, 0)
}
