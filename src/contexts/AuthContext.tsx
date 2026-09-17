import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Buyer, CropType, Farmer } from '../types'
import { demoProfiles, type DemoProfile } from '../data/profiles'
import { defaultParcelAround, DISTRICT_COORDS, polygonAreaAcresLatLng } from '../lib/geo'
import { clearLocalAppState, supabase } from '../lib/supabase'
import { MATH } from '../data/indiaLocations'

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
  loginCustom: (draft: CustomLoginDraft) => void
  updateSession: (patch: Partial<SessionUser>) => void
  logout: () => void
  profile: DemoProfile | undefined
}

export interface CustomLoginDraft {
  role: AuthRole
  displayName: string
  village: string
  district: string
  state?: string
  acres: number
  phone: string
  gender?: SessionUser['gender']
  age?: number
}

const STORAGE = 'agrinova_session_v2'
const WB_DISTRICTS = new Set([
  'Burdwan',
  'Hooghly',
  'Nadia',
  'Murshidabad',
  'Malda',
  'Howrah',
  'Kolkata',
  'North 24 Parganas',
  'Madhyamgram',
  'Barasat',
])
export const DEMO_PROFILE_IDS = new Set(demoProfiles.map((p) => p.id))

export function isDemoSession(user: SessionUser | null) {
  return !!user && DEMO_PROFILE_IDS.has(user.profileId)
}

const AuthContext = createContext<AuthContextValue | null>(null)

function defaultSoil(district: string): SoilProfile {
  const wb = WB_DISTRICTS.has(district)
  return {
    type: 'alluvial',
    ph: wb ? 6.8 : 7.2,
    organicCarbonPercent: wb ? 0.62 : 0.45,
    nitrogen: 'medium',
    notes: wb
      ? 'Gangetic alluvium — demo soil card for West Bengal listings.'
      : 'Patiala belt alluvial — demo soil card for Kisan AI.',
  }
}

function parcelsFor(district: string, role: AuthRole): PlotParcel[] {
  if (role !== 'seller') return []
  const center = DISTRICT_COORDS[district] ?? DISTRICT_COORDS.Patiala
  const points = defaultParcelAround(center)
  return [
    {
      id: 'parcel-rice',
      label: 'Paddy block A',
      crop: 'Rice',
      acres: polygonAreaAcresLatLng(points),
      forSale: true,
      points,
    },
  ]
}

function sessionFromProfile(p: DemoProfile, overrides?: Partial<SessionUser>): SessionUser {
  const fromOrg = p.org.toLowerCase()
  let district = overrides?.district
  if (!district) {
    if (fromOrg.includes('madhyamgram') || fromOrg.includes('doltala') || fromOrg.includes('barasat') || fromOrg.includes('ward')) {
      district = 'North 24 Parganas'
    } else if (fromOrg.includes('sangrur') || fromOrg.includes('nabha')) {
      district = 'Patiala'
    } else if (p.location.toLowerCase().includes('punjab')) {
      district = 'Patiala'
    } else {
      district = 'North 24 Parganas'
    }
  }
  const state = overrides?.state ?? (WB_DISTRICTS.has(district) ? 'West Bengal' : 'Punjab')
  const acresDefault =
    p.id === 'ramesh' ? 3 : p.id === 'sukumar' ? 2 : p.id === 'tapas' ? 1.5 : p.id === 'simran' ? 4.5 : 5
  const base: SessionUser = {
    profileId: p.id,
    role: p.role,
    displayName: p.name,
    village: p.org.includes(',') ? p.org.split(',')[0] : p.org,
    district,
    state,
    acres: acresDefault,
    phone: '+91 98765 00001',
    gender: p.id === 'simran' || p.id === 'priya' || p.id === 'kavya' ? 'female' : 'male',
    age: 38,
    crops: ['Rice', 'Wheat'],
    farmerId: p.farmerId,
    buyerId: p.buyerId,
    soil: defaultSoil(district),
    parcels: parcelsFor(district, p.role),
  }
  return { ...base, ...overrides, soil: { ...base.soil, ...overrides?.soil }, parcels: overrides?.parcels ?? base.parcels }
}

export function farmerFromSession(user: SessionUser | null, farmers: Farmer[], fallback: Farmer): Farmer {
  if (!user) return fallback
  const found = farmers.find((f) => f.id === user.farmerId)
  if (found) {
    return {
      ...found,
      name: user.displayName || found.name,
      village: user.village || found.village,
      district: user.district || found.district,
      acres: user.acres || found.acres,
      phone: user.phone || found.phone,
    }
  }
  return {
    ...fallback,
    id: user.farmerId ?? 'farmer-custom',
    name: user.displayName,
    village: user.village,
    district: user.district,
    state: user.state,
    acres: user.acres,
    phone: user.phone,
    initials: user.displayName.split(' ').map((p) => p[0]).join('').slice(0, 2),
    riceAcresThisSeason: Math.min(user.acres, 2.5),
    sowingWindowDays: WB_DISTRICTS.has(user.district) ? 18 : 12,
    lastSeasonBurnedTonnes: 0,
    bio: 'Custom listing account for this session.',
  }
}

export function buyerFromSession(user: SessionUser | null, buyers: Buyer[], fallback: Buyer): Buyer {
  if (!user || user.role !== 'buyer') return fallback
  const found = buyers.find((b) => b.id === user.buyerId)
  if (found) {
    return {
      ...found,
      contactName: user.displayName,
      location: `${user.village}, ${user.district}`,
    }
  }
  return {
    id: user.buyerId ?? 'buyer-custom',
    name: `${user.displayName} desk`,
    type: 'Biomass Plant',
    location: `${user.village}, ${user.district}`,
    distanceKm: 12,
    pricePerTon: 700,
    demandTonnes: 80,
    rating: 4.5,
    residueTypes: ['Rice Straw', 'Wheat Stubble'],
    contactName: user.displayName,
    contactRole: 'Procurement',
    plantCapacityTpd: 8,
    moistureSpecMax: 15,
  }
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

  async function persistProfile(next: SessionUser) {
    if (!supabase) return
    try {
      await supabase.from('profiles').upsert({
        id: next.profileId,
        role: next.role,
        display_name: next.displayName,
        village: next.village,
        district: next.district,
        state: next.state,
        acres: next.acres,
        soil: next.soil,
        is_demo: DEMO_PROFILE_IDS.has(next.profileId),
      })
    } catch {
      /* non-blocking */
    }
  }

  function beginSession(next: SessionUser) {
    clearLocalAppState()
    setUser(next)
    void persistProfile(next)
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      profile: demoProfiles.find((p) => p.id === user?.profileId),
      loginAs: (profileId, overrides) => {
        const p = demoProfiles.find((x) => x.id === profileId)
        if (!p) return
        beginSession(sessionFromProfile(p, overrides))
      },
      loginCustom: (draft) => {
        const district = draft.district.trim() || 'Patiala'
        const state = draft.state ?? (WB_DISTRICTS.has(district) ? 'West Bengal' : 'Punjab')
        const id = `custom-${draft.role}-${Date.now()}`
        const role = draft.role
        const next: SessionUser = {
          profileId: id,
          role,
          displayName: draft.displayName.trim() || 'Guest',
          village: draft.village.trim() || district,
          district,
          state,
          acres: Number.isFinite(draft.acres) ? draft.acres : 0,
          phone: draft.phone.trim() || '',
          gender: draft.gender ?? 'other',
          age: draft.age ?? 35,
          crops: ['Rice', 'Wheat'],
          farmerId: role === 'seller' ? id : undefined,
          buyerId: role === 'buyer' ? id : undefined,
          soil: defaultSoil(district),
          parcels: parcelsFor(district, role),
        }
        beginSession(next)
      },
      updateSession: (patch) =>
        setUser((u) => {
          if (!u) return u
          const next = { ...u, ...patch, soil: { ...u.soil, ...patch.soil }, parcels: patch.parcels ?? u.parcels }
          void persistProfile(next)
          return next
        }),
      logout: () => {
        clearLocalAppState()
        setUser(null)
      },
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

export function estimateStrawFromParcels(parcels: PlotParcel[]) {
  return parcels
    .filter((p) => p.forSale)
    .reduce((sum, p) => {
      const factor =
        p.crop === 'Rice'
          ? MATH.strawPerAcreRice_t
          : p.crop === 'Wheat'
            ? MATH.strawPerAcreWheat_t
            : 1.4
      return sum + p.acres * factor
    }, 0)
}