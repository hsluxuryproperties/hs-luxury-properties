import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PropertyGallery from '@/components/properties/PropertyGallery'
import PropertyContact from '@/components/properties/PropertyContact'
import type { Property } from '@/types'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>
}): Promise<Metadata> {
  const { code } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('properties')
    .select('title, region, price, property_code')
    .eq('property_code', code.toUpperCase())
    .single()

  if (!data) return { title: 'Property Not Found' }

  return {
    title: `${data.property_code} — ${data.title}`,
    description: `${data.title} in ${data.region} — €${Number(data.price).toLocaleString()}`,
  }
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ code: string }>
}) {
  const { code } = await params
  const supabase = await createClient()

  const { data } = await supabase
    .from('properties')
    .select('*, images:property_images(*)')
    .eq('property_code', code.toUpperCase())
    .order('display_order', { referencedTable: 'property_images', ascending: true })
    .single()

  if (!data) notFound()

  const property = data as Property

  const BOOLEAN_FEATURES = [
    { key: 'elevator',           label: 'Elevator'            },
    { key: 'warehouse',          label: 'Warehouse'           },
    { key: 'garden',             label: 'Garden'              },
    { key: 'fireplace',          label: 'Fireplace'           },
    { key: 'pool',               label: 'Pool'                },
    { key: 'ac',                 label: 'A/C'                 },
    { key: 'armored_door',       label: 'Armored Door'        },
    { key: 'closet',             label: 'Closet'              },
    { key: 'awnings',            label: 'Awnings'             },
    { key: 'solar_water_heater', label: 'Solar Water Heater'  },
    { key: 'painted',            label: 'Painted'             },
    { key: 'penthouse',          label: 'Penthouse'           },
    { key: 'bright',             label: 'Bright'              },
    { key: 'furnished',          label: 'Furnished'           },
    { key: 'beachfront',         label: 'Beachfront'          },
    { key: 'luxury',             label: 'Luxury Property'     },
    { key: 'investment',         label: 'Investment Property' },
    { key: 'newly_built',        label: 'Newly Built'         },
    { key: 'student_friendly',   label: 'Student Friendly'    },
    { key: 'from_auction',       label: 'From Auction'        },
    { key: 'golden_visa',        label: 'Golden Visa'         },
  ]

  const activeFeatures = BOOLEAN_FEATURES.filter(
    f => property[f.key as keyof Property]
  )

  return (
    <>
      <Header />

      <div style={{ paddingTop: '80px', background: '#0A0A0A', minHeight: '100vh' }}>

        <PropertyGallery images={property.images ?? []} title={property.title} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '60px', alignItems: 'start' }}>

            <div>

              <div style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#F0C040', border: '1px solid rgba(212,160,23,0.3)', padding: '4px 12px', fontFamily: 'Montserrat, sans-serif' }}>
                    {property.status === 'for_sale' ? 'For Sale' : 'For Rent'}
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

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'rgba(212,160,23,0.1)', marginBottom: '40px' }}>
                {[
                  { label: 'Size',      value: property.sqm       ? `${property.sqm} m²` : '—' },
                  { label: 'Bedrooms',  value: property.bedrooms  ?? '—'                        },
                  { label: 'Bathrooms', value: property.bathrooms ?? '—'                        },
                  { label: 'Floor',     value: property.floor     ?? '—'                        },
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

              {property.description && (
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', color: '#F5F0E8', letterSpacing: '2px', marginBottom: '16px', fontWeight: 300 }}>
                    About this property
                  </h2>
                  <p style={{ fontSize: '14px', color: '#888888', lineHeight: 1.9, fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                    {property.description}
                  </p>
                </div>
              )}

              <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', color: '#F5F0E8', letterSpacing: '2px', marginBottom: '20px', fontWeight: 300 }}>
                  Property Details
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(212,160,23,0.08)' }}>
                  {[
                    { label: 'Property Code', value: property.property_code                                        },
                    { label: 'Status',        value: property.status === 'for_sale' ? 'For Sale' : 'For Rent'      },
                    { label: 'Region',        value: property.region                                               },
                    { label: 'Size',          value: property.sqm        ? `${property.sqm} m²`      : '—'        },
                    { label: 'Bedrooms',      value: property.bedrooms   ?? '—'                                    },
                    { label: 'Bathrooms',     value: property.bathrooms  ?? '—'                                    },
                    { label: 'Floor',         value: property.floor      ?? '—'                                    },
                    { label: 'Year Built',    value: property.year_built ?? '—'                                    },
                    { label: 'Heating',       value: property.heating_type   ?? '—'                                },
                    { label: 'View',          value: property.view_type      ?? '—'                                },
                    { label: 'Frames',        value: property.frame_type     ?? '—'                                },
                    { label: 'Parking',       value: property.parking_type   ?? '—'                                },
                    { label: 'Transport',     value: property.transport_type ?? '—'                                },
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

              {activeFeatures.length > 0 && (
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', color: '#F5F0E8', letterSpacing: '2px', marginBottom: '20px', fontWeight: 300 }}>
                    Amenities
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                    {activeFeatures.map(f => (
                      <div key={f.key} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', background: '#111111', border: '1px solid rgba(212,160,23,0.1)' }}>
                        <div style={{ width: '6px', height: '6px', background: '#F0C040', transform: 'rotate(45deg)', flexShrink: 0 }} />
                        <span style={{ fontSize: '11px', color: '#CCCCCC', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.5px' }}>
                          {f.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {property.latitude && property.longitude && (
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', color: '#F5F0E8', letterSpacing: '2px', marginBottom: '20px', fontWeight: 300 }}>
                    Location
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