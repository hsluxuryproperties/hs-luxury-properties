import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import type { Property } from '@/types'

async function getFeaturedProperties() {
  const supabase = await createClient()

  const { data: investors } = await supabase
    .from('properties')
    .select('*, images:property_images(*)')
    .eq('featured_investor', true)
    .eq('active', true)
    .order('created_at', { ascending: false })
    .limit(3)

  const { data: homes } = await supabase
    .from('properties')
    .select('*, images:property_images(*)')
    .eq('featured_home', true)
    .eq('active', true)
    .order('created_at', { ascending: false })
    .limit(3)

  return {
    investors: investors ?? [],
    homes:     homes     ?? [],
  }
}

function formatPrice(price: number) {
  return '€' + Number(price).toLocaleString('el-GR')
}

function PropertyCard({ property }: { property: Property }) {
  const firstImage = property.images?.[0]?.url
  const tag = property.featured_investor
    ? `Investment · ${property.status === 'for_sale' ? 'For Sale' : 'For Rent'}`
    : `Residence · ${property.status === 'for_sale' ? 'For Sale' : 'For Rent'}`

  return (
    <Link href={`/properties/${property.property_code}`} style={{ textDecoration: 'none' }}>
      <div className="property-card">
        {firstImage ? (
          <img
            src={firstImage}
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
          <div style={{ fontSize: '10px', letterSpacing: '2px', color: 'rgba(240,192,64,0.7)', fontFamily: 'Montserrat, sans-serif', marginBottom: '4px' }}>
            {property.property_code}
          </div>
          <div className="property-name">{property.title}</div>
          <div className="property-location">{property.region}</div>
          <div className="property-price">{formatPrice(property.price)}</div>
          <div className="property-cta">View Property</div>
        </div>
      </div>
    </Link>
  )
}

function EmptyCard({ label }: { label: string }) {
  return (
    <div className="property-card">
      <div className="property-placeholder">
        <div className="placeholder-icon">HS</div>
      </div>
      <div className="property-overlay">
        <span className="property-tag">{label}</span>
        <div className="property-name" style={{ color: '#888888', fontSize: '14px' }}>Coming Soon</div>
      </div>
    </div>
  )
}

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

        {/* Replaced Monogram text with Image component + Gold Glow */}
<div 
  className="fade-up" 
  style={{ 
    marginBottom: '32px', 
    position: 'relative',
    // This creates the soft, luxury gold glow radiating behind your transparent logo
    filter: 'drop-shadow(0px 0px 30px rgba(240, 192, 64, 0.35)) drop-shadow(0px 0px 60px rgba(212, 160, 23, 0.2))'
  }}
>
  <Image 
    src="/logo.png" 
    alt="HS Luxury Properties Logo" 
    width={240} 
    height={80} 
    style={{ objectFit: 'contain' }}
    priority 
  />
</div>

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
          fontWeight: 300,
          letterSpacing: '6px',
          textTransform: 'uppercase',
          color: '#F5F0E8',
          marginBottom: '12px',
        }}>HS Luxury Properties</h1>

        {/* Slogan */}
        <p className="fade-up delay-2" style={{
          fontSize: '11px',
          letterSpacing: '5px',
          textTransform: 'uppercase',
          color: '#F0C040',
          marginBottom: '16px',
          fontWeight: 400,
          fontFamily: 'Montserrat, sans-serif',
        }}>Luxury Properties · Extraordinary Living</p>

        {/* About paragraph */}
        <p className="fade-up delay-2" style={{
          fontSize: '13px',
          color: '#888888',
          maxWidth: '520px',
          lineHeight: 1.8,
          marginBottom: '48px',
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 300,
        }}>
          Connecting discerning clients with the world&#39;s most exceptional
          properties. Discretion, expertise, and extraordinary results.
        </p>

        {/* CTA */}
        <Link href="/properties" className="hero-cta fade-up delay-3">
          <span>Explore Properties</span>
        </Link>

        {/* Featured listings */}
        <div className="fade-up delay-4" style={{ width: '100%', maxWidth: '1200px', marginTop: '100px' }}>

          {/* For Investors */}
          <div style={{ marginBottom: '60px' }}>
            <p style={{ fontSize: '10px', letterSpacing: '5px', textTransform: 'uppercase', color: '#888888', marginBottom: '8px', fontFamily: 'Montserrat, sans-serif' }}>
              Featured
            </p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 300, color: '#F5F0E8', letterSpacing: '3px', marginBottom: '8px' }}>
              For Investors
            </h2>
            <div style={{ width: '40px', height: '1px', background: '#F0C040', marginBottom: '32px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {investors.length > 0
                ? investors.map(p => <PropertyCard key={p.id} property={p as Property} />)
                : [0,1,2].map(i => <EmptyCard key={i} label="Investment Property" />)
              }
            </div>
          </div>

          {/* For Homeowners */}
          <div>
            <p style={{ fontSize: '10px', letterSpacing: '5px', textTransform: 'uppercase', color: '#888888', marginBottom: '8px', fontFamily: 'Montserrat, sans-serif' }}>
              Featured
            </p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 300, color: '#F5F0E8', letterSpacing: '3px', marginBottom: '8px' }}>
              For Homeowners
            </h2>
            <div style={{ width: '40px', height: '1px', background: '#F0C040', marginBottom: '32px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {homes.length > 0
                ? homes.map(p => <PropertyCard key={p.id} property={p as Property} />)
                : [0,1,2].map(i => <EmptyCard key={i} label="Residential Property" />)
              }
            </div>
          </div>

          {/* View all */}
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <Link href="/properties" className="hero-cta">
              <span>View All Properties</span>
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </>
  )
}