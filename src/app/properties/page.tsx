import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { createClient } from '@/lib/supabase/server'
import PropertyCard from '@/components/properties/PropertyCard'
import PropertiesFilter from '@/components/properties/PropertiesFilter'

export const metadata = { title: 'Properties' }

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const params = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from('properties')
    .select('*, images:property_images(*)')
    .order('created_at', { ascending: false })

  if (params.status)    query = query.eq('status', params.status)
  if (params.region)    query = query.ilike('region', `%${params.region}%`)
  if (params.price_min) query = query.gte('price', params.price_min)
  if (params.price_max) query = query.lte('price', params.price_max)
  if (params.sqm_min)   query = query.gte('sqm', params.sqm_min)
  if (params.sqm_max)   query = query.lte('sqm', params.sqm_max)
  if (params.bedrooms)  query = query.gte('bedrooms', params.bedrooms)
  if (params.bathrooms) query = query.gte('bathrooms', params.bathrooms)
  if (params.floor_min) query = query.gte('floor', params.floor_min)
  if (params.floor_max) query = query.lte('floor', params.floor_max)

  // Boolean filters
  const booleans = ['elevator','pool','garden','garage','furnished','beachfront','golden_visa','luxury','investment','newly_built','penthouse']
  booleans.forEach(key => {
    if (params[key] === 'true') query = (query as any).eq(key, true)
  })

  const { data: properties } = await query

  return (
    <>
      <Header />

      <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#0A0A0A' }}>

        {/* Page header */}
        <div style={{
          padding: '60px 60px 40px',
          borderBottom: '1px solid rgba(212,160,23,0.1)',
          background: '#0A0A0A',
        }}>
          <p className="section-label">Our Portfolio</p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 300, letterSpacing: '2px', color: '#F5F0E8', marginBottom: '8px' }}>
            All Properties
          </h1>
          <div className="gold-line" style={{ marginBottom: '0' }} />
        </div>

        <div style={{ display: 'flex', gap: '0' }}>

          {/* Filter sidebar */}
          <PropertiesFilter params={params} />

          {/* Grid */}
          <div style={{ flex: 1, padding: '40px 48px' }}>

            {!properties || properties.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0', color: '#888888', fontFamily: 'Montserrat, sans-serif' }}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '48px', color: 'rgba(212,160,23,0.2)', marginBottom: '16px' }}>HS</div>
                <p style={{ fontSize: '13px', letterSpacing: '1px' }}>No properties found matching your criteria.</p>
              </div>
            ) : (
              <>
                <p style={{ fontSize: '11px', color: '#888888', letterSpacing: '1px', marginBottom: '32px', fontFamily: 'Montserrat, sans-serif' }}>
                  {properties.length} {properties.length === 1 ? 'property' : 'properties'} found
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                  {properties.map(p => (
                    <PropertyCard key={p.id} property={p} />
                  ))}
                </div>
              </>
            )}
          </div>

        </div>
      </div>

      <Footer />
    </>
  )
}