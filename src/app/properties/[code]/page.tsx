import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PropertyGallery from '@/components/properties/PropertyGallery'
import PropertyContact from '@/components/properties/PropertyContact'
import type { Property } from '@/types'
import type { Metadata } from 'next'

type Locale = 'en' | 'gr'

async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const match = cookieStore.get('hs_locale')?.value
  return (match === 'gr' ? 'gr' : 'en') as Locale
}

// ─── Translations ────────────────────────────────────────────────────────────

const T = {
  en: {
    forSale:          'For Sale',
    forRent:          'For Rent',
    size:             'Size',
    bedrooms:         'Bedrooms',
    bathrooms:        'Bathrooms',
    floor:            'Floor',
    aboutProperty:    'About this property',
    propertyDetails:  'Property Details',
    amenities:        'Amenities',
    location:         'Location',
    // Details table labels
    propertyCode:     'Property Code',
    status:           'Status',
    region:           'Region',
    yearBuilt:        'Year Built',
    heating:          'Heating',
    view:             'View',
    frames:           'Frames',
    parking:          'Parking',
    transport:        'Transport',
  },
  gr: {
    forSale:          'Πωλείται',
    forRent:          'Ενοικιάζεται',
    size:             'Εμβαδόν',
    bedrooms:         'Υπνοδωμάτια',
    bathrooms:        'Μπάνια',
    floor:            'Όροφος',
    aboutProperty:    'Σχετικά με το ακίνητο',
    propertyDetails:  'Στοιχεία Ακινήτου',
    amenities:        'Παροχές',
    location:         'Τοποθεσία',
    // Details table labels
    propertyCode:     'Κωδικός Ακινήτου',
    status:           'Κατάσταση',
    region:           'Περιοχή',
    yearBuilt:        'Έτος Κατασκευής',
    heating:          'Θέρμανση',
    view:             'Θέα',
    frames:           'Κουφώματα',
    parking:          'Πάρκινγκ',
    transport:        'Μεταφορά',
  },
}

// ─── Boolean feature labels ───────────────────────────────────────────────────

const BOOLEAN_FEATURES: { key: string; en: string; gr: string }[] = [
  { key: 'elevator',           en: 'Elevator',            gr: 'Ανελκυστήρας'       },
  { key: 'warehouse',          en: 'Warehouse',           gr: 'Αποθήκη'            },
  { key: 'garden',             en: 'Garden',              gr: 'Κήπος'              },
  { key: 'fireplace',          en: 'Fireplace',           gr: 'Τζάκι'              },
  { key: 'pool',               en: 'Pool',                gr: 'Πισίνα'             },
  { key: 'ac',                 en: 'A/C',                 gr: 'Κλιματισμός'        },
  { key: 'armored_door',       en: 'Armored Door',        gr: 'Θωρακισμένη Πόρτα'  },
  { key: 'closet',             en: 'Closet',              gr: 'Ντουλάπα'           },
  { key: 'awnings',            en: 'Awnings',             gr: 'Τέντες'             },
  { key: 'solar_water_heater', en: 'Solar Water Heater',  gr: 'Ηλιακός Θερμοσίφων' },
  { key: 'painted',            en: 'Painted',             gr: 'Βαμμένο'            },
  { key: 'penthouse',          en: 'Penthouse',           gr: 'Ρετιρέ'             },
  { key: 'bright',             en: 'Bright',              gr: 'Φωτεινό'            },
  { key: 'furnished',          en: 'Furnished',           gr: 'Επιπλωμένο'         },
  { key: 'beachfront',         en: 'Beachfront',          gr: 'Παραθαλάσσιο'       },
  { key: 'luxury',             en: 'Luxury Property',     gr: 'Πολυτελές Ακίνητο'  },
  { key: 'investment',         en: 'Investment Property', gr: 'Επενδυτικό Ακίνητο' },
  { key: 'newly_built',        en: 'Newly Built',         gr: 'Νεόδμητο'           },
  { key: 'student_friendly',   en: 'Student Friendly',    gr: 'Φοιτητικό'          },
  { key: 'from_auction',       en: 'From Auction',        gr: 'Από Πλειστηριασμό'  },
  { key: 'golden_visa',        en: 'Golden Visa',         gr: 'Golden Visa'        },
]

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>
}): Promise<Metadata> {
  const { code } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('properties')
    .select('title, region, price')
    .eq('property_code', code.toUpperCase())
    .single()

  if (!data) return { title: 'Property Not Found' }

  return {
    title: data.title,
    description: `${data.title} in ${data.region} — €${Number(data.price).toLocaleString()}`,
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ code: string }>
}) {
  const { code } = await params
  const locale = await getLocale()
  const t = T[locale]

  const supabase = await createClient()

  const { data } = await supabase
    .from('properties')
    .select('*, images:property_images(*), map_lat, map_lng')
    .eq('property_code', code.toUpperCase())
    .eq('active', true)
    .order('display_order', { referencedTable: 'property_images', ascending: true })
    .single()

  if (!data) notFound()

  const property = data as Property

  const activeFeatures = BOOLEAN_FEATURES.filter(
    f => property[f.key as keyof Property]
  )

  const statusLabel = property.status === 'for_sale' ? t.forSale : t.forRent

  return (
    <>
      <Header />

      <div style={{ paddingTop: '80px', background: '#0A0A0A', minHeight: '100vh' }}>

        {/* Gallery */}
        <PropertyGallery images={property.images ?? []} title={property.title} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '60px', alignItems: 'start' }}>

            {/* Left — details */}
            <div>

              {/* Title block */}
              <div style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#F0C040', border: '1px solid rgba(212,160,23,0.3)', padding: '4px 12px', fontFamily: 'Montserrat, sans-serif' }}>
                    {statusLabel}
                  </span>
                  <span style={{ fontSize: '11px', color: '#888888', fontFamily: 'Montserrat, sans-serif', letterSpacing: '2px' }}>
                    {property.property_code}
                  </span>
                </div>

                <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 300, color: '#F5F0E8', letterSpacing: '2px', marginBottom: '8px' }}>
                  {property.title}
                </h1>

                <p style={{ fontSize: '13px', color: '#888888', letterSpacing: '1px', fontFamily: 'Montserrat, sans-serif', marginBottom: '16px' }}>
                  {property.address ? `${property.address}, ` : ''}{property.region}
                </p>

                <div style={{ width: '40px', height: '1px', background: '#F0C040', marginBottom: '24px' }} />

                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(28px, 3vw, 40px)', color: '#F0C040', fontWeight: 300, letterSpacing: '2px' }}>
                  €{Number(property.price).toLocaleString('el-GR')}
                </div>
              </div>

              {/* Key specs */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'rgba(212,160,23,0.1)', marginBottom: '40px' }}>
                {[
                  { label: t.size,      value: property.sqm       ? `${property.sqm} m²`      : '—' },
                  { label: t.bedrooms,  value: property.bedrooms  ?? '—'                              },
                  { label: t.bathrooms, value: property.bathrooms ?? '—'                              },
                  { label: t.floor,     value: property.floor     ?? '—'                              },
                ].map(spec => (
                  <div key={spec.label} style={{ background: '#111111', padding: '20px 16px', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', color: '#F0C040', lineHeight: 1, marginBottom: '6px' }}>
                      {spec.value}
                    </div>
                    <div style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#888888', fontFamily: 'Montserrat, sans-serif' }}>
                      {spec.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Description */}
              {property.description && (
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', color: '#F5F0E8', letterSpacing: '2px', marginBottom: '16px', fontWeight: 300 }}>
                    {t.aboutProperty}
                  </h2>
                  <p style={{ fontSize: '14px', color: '#888888', lineHeight: 1.9, fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                    {property.description}
                  </p>
                </div>
              )}

              {/* Property details table */}
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', color: '#F5F0E8', letterSpacing: '2px', marginBottom: '20px', fontWeight: 300 }}>
                  {t.propertyDetails}
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(212,160,23,0.08)' }}>
                  {[
                    { label: t.propertyCode, value: property.property_code                },
                    { label: t.status,        value: statusLabel                           },
                    { label: t.region,        value: property.region                       },
                    { label: t.size,          value: property.sqm ? `${property.sqm} m²` : '—' },
                    { label: t.bedrooms,      value: property.bedrooms  ?? '—'            },
                    { label: t.bathrooms,     value: property.bathrooms ?? '—'            },
                    { label: t.floor,         value: property.floor     ?? '—'            },
                    { label: t.yearBuilt,     value: property.year_built ?? '—'           },
                    { label: t.heating,       value: property.heating_type   ?? '—'       },
                    { label: t.view,          value: property.view_type      ?? '—'       },
                    { label: t.frames,        value: property.frame_type     ?? '—'       },
                    { label: t.parking,       value: property.parking_type   ?? '—'       },
                    { label: t.transport,     value: property.transport_type ?? '—'       },
                  ].map(row => (
                    <div key={row.label} style={{ background: '#111111', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#888888', fontFamily: 'Montserrat, sans-serif' }}>
                        {row.label}
                      </span>
                      <span style={{ fontSize: '13px', color: '#F5F0E8', fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                        {String(row.value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features / Amenities */}
              {activeFeatures.length > 0 && (
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', color: '#F5F0E8', letterSpacing: '2px', marginBottom: '20px', fontWeight: 300 }}>
                    {t.amenities}
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                    {activeFeatures.map(f => (
                      <div key={f.key} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', background: '#111111', border: '1px solid rgba(212,160,23,0.1)' }}>
                        <div style={{ width: '6px', height: '6px', background: '#F0C040', transform: 'rotate(45deg)', flexShrink: 0 }} />
                        <span style={{ fontSize: '11px', color: '#CCCCCC', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.5px' }}>
                          {f[locale]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Map */}
              {property.latitude && property.longitude && (
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', color: '#F5F0E8', letterSpacing: '2px', marginBottom: '20px', fontWeight: 300 }}>
                    {t.location}
                  </h2>
                  <div style={{ border: '1px solid rgba(212,160,23,0.15)', overflow: 'hidden', height: '360px' }}>
                    <iframe
                      src={`https://www.google.com/maps?q=${property.latitude},${property.longitude}&z=15&output=embed`}
                      width="100%"
                      height="100%"
                      style={{ border: 0, filter: 'grayscale(0.3) invert(0.05)' }}
                      loading="lazy"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

            </div>

            {/* Right — sticky contact form */}
            <div style={{ position: 'sticky', top: '100px' }}>
              <PropertyContact
                propertyCode={property.property_code}
                propertyTitle={property.title}
              />
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
