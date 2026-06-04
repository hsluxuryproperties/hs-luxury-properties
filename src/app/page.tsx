import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

async function getFeaturedProperties() {
  const supabase = await createClient()

  const { data: investors } = await supabase
    .from('properties')
    .select('*, images:property_images(*)')
    .eq('featured_investor', true)
    .order('created_at', { ascending: false })
    .limit(3)

  const { data: homes } = await supabase
    .from('properties')
    .select('*, images:property_images(*)')
    .eq('featured_home', true)
    .order('created_at', { ascending: false })
    .limit(3)

  return { investors: investors ?? [], homes: homes ?? [] }
}

function PropertyCard({ property }: { property: any }) {
  const image = property.images?.[0]?.url
  const tag = property.featured_investor
    ? `Investment · ${property.status === 'for_sale' ? 'For Sale' : 'For Rent'}`
    : `Residence · ${property.status === 'for_sale' ? 'For Sale' : 'For Rent'}`

  return (
    <Link href={`/properties/${property.id}`} style={{ textDecoration: 'none' }}>
      <div className="property-card">
        {image ? (
          <img
            src={image}
            alt={property.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
          />
        ) : (
          <div className="property-placeholder">
            <div className="placeholder-icon">HS</div>
          </div>
        )}
        <div className="property-overlay">
          <span className="property-tag">{tag}</span>
          <div className="property-name">{property.title}</div>
          <div className="property-location">{property.region}</div>
          <div className="property-price">€{Number(property.price).toLocaleString()}</div>
          <div className="property-cta">View Property</div>
        </div>
      </div>
    </Link>
  )
}

function PlaceholderCard({ tag, name, location, price }: { tag: string; name: string; location: string; price: string }) {
  return (
    <div className="property-card">
      <div className="property-placeholder">
        <div className="placeholder-icon">HS</div>
      </div>
      <div className="property-overlay">
        <span className="property-tag">{tag}</span>
        <div className="property-name">{name}</div>
        <div className="property-location">{location}</div>
        <div className="property-price">{price}</div>
        <div className="property-cta">View Property</div>
      </div>
    </div>
  )
}

const placeholderInvestors = [
  { tag: 'Investment · High Yield',    name: 'Prime Commercial Block',       location: 'Athens, Greece',    price: '€2,400,000' },
  { tag: 'Investment · Rental Income', name: 'Boutique Apartment Portfolio', location: 'Mykonos, Greece',   price: '€1,850,000' },
  { tag: 'Investment · Development',   name: 'Seafront Development Land',    location: 'Santorini, Greece', price: '€3,200,000' },
]

const placeholderHomes = [
  { tag: 'Residence · Villa',     name: 'Cliffside Infinity Villa', location: 'Santorini, Greece',   price: '€4,750,000' },
  { tag: 'Residence · Penthouse', name: 'Athenian Sky Penthouse',   location: 'Kolonaki, Athens',    price: '€2,100,000' },
  { tag: 'Residence · Estate',    name: 'Riviera Private Estate',   location: 'Vouliagmeni, Athens', price: '€6,500,000' },
]

export default async function Home() {
  const { investors, homes } = await getFeaturedProperties()

  return (
    <>
      <Header />

      <section
        id="home"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '120px 40px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background pattern */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `
            radial-gradient(ellipse at 50% 50%, rgba(212,160,23,0.06) 0%, transparent 70%),
            repeating-linear-gradient(45deg, transparent, transparent 60px,
            rgba(212,160,23,0.025) 60px, rgba(212,160,23,0.025) 61px)
          `,
        }} />

        {/* Monogram */}
        <div className="fade-up" style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(80px, 12vw, 140px)',
          fontWeight: 600, lineHeight: 1,
          color: '#F0C040',
          textShadow: '0 0 60px rgba(212,160,23,0.4), 0 2px 4px rgba(0,0,0,0.8)',
          letterSpacing: '-4px',
          marginBottom: '32px',
          position: 'relative',
        }}>HS</div>

        {/* Divider */}
        <div className="fade-up delay-1" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, #D4A017)', maxWidth: '80px' }} />
          <div style={{ width: '6px', height: '6px', background: '#F0C040', transform: 'rotate(45deg)' }} />
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, #D4A017)', maxWidth: '80px' }} />
        </div>

        {/* Title */}
        <h1 className="fade-up delay-1" style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 300, letterSpacing: '6px',
          textTransform: 'uppercase',
          color: '#F5F0E8', marginBottom: '12px',
        }}>
          HS Luxury Properties
        </h1>

        {/* Slogan */}
        <p className="fade-up delay-2" style={{
          fontSize: '11px', letterSpacing: '5px',
          textTransform: 'uppercase', color: '#F0C040',
          marginBottom: '16px', fontWeight: 400,
          fontFamily: 'Montserrat, sans-serif',
        }}>
          Luxury Properties · Extraordinary Living
        </p>

        {/* About paragraph */}
        <p className="fade-up delay-2" style={{
          fontSize: '13px', color: '#888888',
          maxWidth: '520px', lineHeight: 1.8,
          fontFamily: 'Montserrat, sans-serif',
          marginBottom: '48px',
        }}>
          Connecting discerning clients with the world&#39;s most exceptional properties.
          Discretion, expertise, and extraordinary results.
        </p>

        {/* CTA */}
        <Link href="/properties" className="hero-cta fade-up delay-3">
          <span>Explore Properties</span>
        </Link>

        {/* Featured listings */}
        <div className="fade-up delay-4" style={{ width: '100%', maxWidth: '1200px', marginTop: '100px' }}>
          <p className="section-label" style={{ textAlign: 'center', marginBottom: '48px' }}>Featured Listings</p>

          {/* For Investors */}
          <p style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: '#F0C040', marginBottom: '16px', fontWeight: 400, fontFamily: 'Montserrat, sans-serif' }}>
            For Investors
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '40px' }}>
            {investors.length > 0
              ? investors.map(p => <PropertyCard key={p.id} property={p} />)
              : placeholderInvestors.map(p => <PlaceholderCard key={p.name} {...p} />)
            }
          </div>

          {/* For Homeowners */}
          <p style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: '#F0C040', marginBottom: '16px', marginTop: '40px', fontWeight: 400, fontFamily: 'Montserrat, sans-serif' }}>
            For Homeowners
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {homes.length > 0
              ? homes.map(p => <PropertyCard key={p.id} property={p} />)
              : placeholderHomes.map(p => <PlaceholderCard key={p.name} {...p} />)
            }
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}