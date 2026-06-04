import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const investorProperties = [
  { tag: 'Investment · High Yield',    name: 'Prime Commercial Block',       location: 'Athens, Greece',     price: '€2,400,000', cta: 'Enquire'       },
  { tag: 'Investment · Rental Income', name: 'Boutique Apartment Portfolio', location: 'Mykonos, Greece',    price: '€1,850,000', cta: 'Enquire'       },
  { tag: 'Investment · Development',   name: 'Seafront Development Land',    location: 'Santorini, Greece',  price: '€3,200,000', cta: 'Enquire'       },
]

const homeProperties = [
  { tag: 'Residence · Villa',     name: 'Cliffside Infinity Villa', location: 'Santorini, Greece',   price: '€4,750,000', cta: 'View Property' },
  { tag: 'Residence · Penthouse', name: 'Athenian Sky Penthouse',   location: 'Kolonaki, Athens',    price: '€2,100,000', cta: 'View Property' },
  { tag: 'Residence · Estate',    name: 'Riviera Private Estate',   location: 'Vouliagmeni, Athens', price: '€6,500,000', cta: 'View Property' },
]

function PropertyCard({
  tag,
  name,
  location,
  price,
  cta,
}: {
  tag: string
  name: string
  location: string
  price: string
  cta: string
}) {
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
        <div className="property-cta">{cta}</div>
      </div>
    </div>
  )
}

export default function Home() {
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
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse at 50% 50%, rgba(212,160,23,0.06) 0%, transparent 70%),
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 60px,
              rgba(212,160,23,0.025) 60px,
              rgba(212,160,23,0.025) 61px
            )
          `,
          pointerEvents: 'none',
        }} />

        {/* HS Monogram */}
        <div
          className="fade-up"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(80px, 12vw, 140px)',
            fontWeight: 600,
            lineHeight: 1,
            color: '#F0C040',
            textShadow: '0 0 60px rgba(212,160,23,0.4), 0 2px 4px rgba(0,0,0,0.8)',
            letterSpacing: '-4px',
            marginBottom: '32px',
            position: 'relative',
          }}
        >
          HS
        </div>

        {/* Divider */}
        <div
          className="fade-up delay-1"
          style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}
        >
          <div style={{
            flex: 1,
            height: '1px',
            background: 'linear-gradient(to right, transparent, #D4A017)',
            maxWidth: '80px',
          }} />
          <div style={{
            width: '6px',
            height: '6px',
            background: '#F0C040',
            transform: 'rotate(45deg)',
          }} />
          <div style={{
            flex: 1,
            height: '1px',
            background: 'linear-gradient(to left, transparent, #D4A017)',
            maxWidth: '80px',
          }} />
        </div>

        {/* Company name */}
        <h1
          className="fade-up delay-1"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 300,
            letterSpacing: '6px',
            textTransform: 'uppercase',
            color: '#F5F0E8',
            marginBottom: '12px',
          }}
        >
          HS Luxury Properties
        </h1>

        {/* Slogan */}
        <p
          className="fade-up delay-2"
          style={{
            fontSize: '11px',
            letterSpacing: '5px',
            textTransform: 'uppercase',
            color: '#F0C040',
            marginBottom: '48px',
            fontWeight: 400,
            fontFamily: 'Montserrat, sans-serif',
          }}
        >
          Luxury Properties · Extraordinary Living
        </p>

        {/* CTA Button */}
        <Link href="/properties" className="hero-cta fade-up delay-3">
          <span>Explore Properties</span>
        </Link>

        {/* Featured Properties */}
        <div
          className="fade-up delay-4"
          style={{ width: '100%', maxWidth: '1200px', marginTop: '80px' }}
        >
          <p className="section-label" style={{ textAlign: 'center', marginBottom: '48px' }}>
            Featured Listings
          </p>

          {/* For Investors */}
          <p style={{
            fontSize: '10px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: '#F0C040',
            marginBottom: '16px',
            fontWeight: 400,
            fontFamily: 'Montserrat, sans-serif',
          }}>
            For Investors
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginBottom: '40px',
          }}>
            {investorProperties.map(p => (
              <PropertyCard key={p.name} {...p} />
            ))}
          </div>

          {/* For Homeowners */}
          <p style={{
            fontSize: '10px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: '#F0C040',
            marginBottom: '16px',
            marginTop: '40px',
            fontWeight: 400,
            fontFamily: 'Montserrat, sans-serif',
          }}>
            For Homeowners
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
          }}>
            {homeProperties.map(p => (
              <PropertyCard key={p.name} {...p} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}