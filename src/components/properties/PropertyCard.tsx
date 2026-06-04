import Link from 'next/link'
import ImageCarousel from './ImageCarousel'

export default function PropertyCard({ property }: { property: any }) {
  const images = property.images?.map((img: any) => img.url) ?? []

  return (
    <Link href={`/properties/${property.id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div className="property-card" style={{ aspectRatio: 'unset' }}>

        <ImageCarousel images={images} title={property.title} />

        <div style={{ padding: '20px', background: '#111111', border: '1px solid rgba(212,160,23,0.1)', borderTop: 'none' }}>

          {/* Code + Status */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '9px', letterSpacing: '3px', color: '#F0C040', fontFamily: 'Montserrat, sans-serif', textTransform: 'uppercase' }}>
              {property.property_code}
            </span>
            <span style={{
              fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', padding: '3px 8px',
              border: `1px solid ${property.status === 'for_sale' ? 'rgba(212,160,23,0.4)' : 'rgba(100,180,100,0.4)'}`,
              color: property.status === 'for_sale' ? '#F0C040' : '#80C080',
              fontFamily: 'Montserrat, sans-serif',
            }}>
              {property.status === 'for_sale' ? 'For Sale' : 'For Rent'}
            </span>
          </div>

          {/* Title */}
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', fontWeight: 400, color: '#F5F0E8', marginBottom: '6px', lineHeight: 1.3 }}>
            {property.title}
          </div>

          {/* Price */}
          <div style={{ fontSize: '15px', color: '#F0C040', marginBottom: '14px', fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}>
            €{Number(property.price).toLocaleString()}
          </div>

          {/* Specs */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {property.region && (
              <span style={{ fontSize: '11px', color: '#888888', fontFamily: 'Montserrat, sans-serif' }}>
                📍 {property.region}
              </span>
            )}
            {property.sqm && (
              <span style={{ fontSize: '11px', color: '#888888', fontFamily: 'Montserrat, sans-serif' }}>
                {property.sqm} m²
              </span>
            )}
            {property.bedrooms > 0 && (
              <span style={{ fontSize: '11px', color: '#888888', fontFamily: 'Montserrat, sans-serif' }}>
                {property.bedrooms} bed
              </span>
            )}
            {property.bathrooms > 0 && (
              <span style={{ fontSize: '11px', color: '#888888', fontFamily: 'Montserrat, sans-serif' }}>
                {property.bathrooms} bath
              </span>
            )}
            {property.floor !== null && (
              <span style={{ fontSize: '11px', color: '#888888', fontFamily: 'Montserrat, sans-serif' }}>
                Floor {property.floor}
              </span>
            )}
          </div>

        </div>
      </div>
    </Link>
  )
}