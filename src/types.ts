export type View =
  | 'home'
  | 'dashboard'
  | 'tools'
  | 'emissions'
  | 'schemes'
  | 'msp'
  | 'calendar'
  | 'weather'
  | 'soil'
  | 'list'
  | 'equipment'
  | 'matches'
  | 'success'

export type CropType = 'Wheat' | 'Rice' | 'Cotton' | 'Sugarcane'

export interface ResidueListing {
  id: string
  cropType: CropType
  quantity: number
  acres: number
  location: string
  district: string
  status: 'listed' | 'matched' | 'picked' | 'paid'
  estimatedValue: number
  matchedBuyer?: string
  createdAt: string
}

export interface Buyer {
  id: string
  name: string
  type: string
  distance: number
  pricePerTon: number
  rating: number
}

export interface EquipmentSlot {
  id: string
  equipment: string
  date: string
  time: string
  available: boolean
}

export interface FarmerProfile {
  name: string
  village: string
  district: string
  acres: number
  phone: string
}

export type ToolId = 'emissions' | 'schemes' | 'msp' | 'calendar' | 'weather' | 'soil'
