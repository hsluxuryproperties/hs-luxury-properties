export type PropertyStatus = 'for_sale' | 'for_rent'

export type Property = {
  id: number
  property_code: string
  title: string
  description: string | null
  price: number
  status: PropertyStatus
  region: string
  address: string | null
  sqm: number
  floor: number | null
  bedrooms: number
  bathrooms: number
  year_built: number | null
  heating_type: string | null
  view_type: string | null
  frame_type: string | null
  parking_type: string | null
  transport_type: string | null
  elevator: boolean
  warehouse: boolean
  garden: boolean
  fireplace: boolean
  pool: boolean
  ac: boolean
  armored_door: boolean
  closet: boolean
  awnings: boolean
  solar_water_heater: boolean
  painted: boolean
  penthouse: boolean
  bright: boolean
  furnished: boolean
  beachfront: boolean
  luxury: boolean
  investment: boolean
  newly_built: boolean
  student_friendly: boolean
  from_auction: boolean
  golden_visa: boolean
  active: boolean
  featured_investor: boolean
  featured_home: boolean
  latitude: number | null
  longitude: number | null
  created_at: string
  updated_at: string
  images: PropertyImage[]
  map_lat?: number | null
map_lng?: number | null
}

export type PropertyImage = {
  id: number
  property_id: number
  url: string
  display_order: number
}

export type ContactSubmission = {
  id: number
  name: string
  email: string
  phone: string | null
  message: string
  property_ref: string | null
  created_at: string
}