'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { Property } from '@/types'

const REGIONS = [
  'Athens', 'Kolonaki', 'Glyfada', 'Vouliagmeni', 'Kifisia',
  'Mykonos', 'Santorini', 'Corfu', 'Crete', 'Rhodes', 'Thessaloniki',
]

function PropertyCard({ property }: { property: Property }) {
  const [imgIndex, setImgIndex] = useState(0)
  const images = property.images ?? []
  const hasImages = images.length > 0

  function prev(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    setImgIndex(i => (i - 1 + images.length) % images.length)
  }

  function next(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    setImgIndex(i => (i + 1) % images.length)
  }

  return (
    <div style={{ position: 'relative', cursor: 'pointer' }}>
      <div className="property-card" style={{ aspectRatio: '3/4' }}>

        {/* Image carousel */}
        {hasImages ? (
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <img
              src={images[imgIndex].url}
              alt={property.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s' }}
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(212,160,23,0.3)', color: '#F0C040', width: '28px', height: '28px', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}
                >
                  ‹
                </button>
                <button
                  onClick={next}
                  style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(212,160,23,0.3)', color: '#F0C040', width: '28px', height: '28px', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}
                >
                  ›
                </button>
                <div style={{ position: 'absolute', bottom: '80px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '4px', zIndex: 10 }}>
                  {images.map((_, i) => (
                    <div key={i} style={{ width: '4px', height: '4px', borderRadius: '50%', background: i === imgIndex ? '#F0C040' : 'rgba(255,255,255,0.3)', transition: 'background 0.2s' }} />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="property-placeholder">
            <div className="placeholder-icon">HS</div>
          </div>
        )}

        {/* Overlay — clicking this navigates */}
        <Link href={`/properties/${property.id}`} style={{ textDecoration: 'none' }}>
          <div className="property-overlay">
            <span className="property-tag">
              {property.status === 'for_sale' ? 'For Sale' : 'For Rent'} · {property.property_code}
            </span>
            <div className="property-name">{property.title}</div>
            <div className="property-location">{property.region}</div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '4px', flexWrap: 'wrap' }}>
              {property.bedrooms  != null && <span style={{ fontSize: '10px', color: '#888888' }}>{property.bedrooms} bed</span>}
              {property.bathrooms != null && <span style={{ fontSize: '10px', color: '#888888' }}>{property.bathrooms} bath</span>}
              {property.sqm       != null && <span style={{ fontSize: '10px', color: '#888888' }}>{property.sqm} m²</span>}
              {property.floor     != null && <span style={{ fontSize: '10px', color: '#888888' }}>Floor {property.floor}</span>}
            </div>
            <div className="property-price">€{Number(property.price).toLocaleString('el-GR')}</div>
            <div className="property-cta">View Property</div>
          </div>
        </Link>

      </div>
    </div>
  )
}

export default function PropertiesClient({ properties }: { properties: Property[] }) {
  const [search,      setSearch]      = useState('')
  const [region,      setRegion]      = useState('')
  const [status,      setStatus]      = useState('')
  const [priceMin,    setPriceMin]    = useState('')
  const [priceMax,    setPriceMax]    = useState('')
  const [sqmMin,      setSqmMin]      = useState('')
  const [sqmMax,      setSqmMax]      = useState('')
  const [showMore,    setShowMore]    = useState(false)
  const [bedroomsMin, setBedroomsMin] = useState('')
  const [bedroomsMax, setBedroomsMax] = useState('')
  const [bathroomsMin,setBathroomsMin]= useState('')
  const [bathroomsMax,setBathroomsMax]= useState('')
  const [floorMin,    setFloorMin]    = useState('')
  const [floorMax,    setFloorMax]    = useState('')
  const [yearMin,     setYearMin]     = useState('')
  const [yearMax,     setYearMax]     = useState('')
  const [heating,     setHeating]     = useState('')
  const [view,        setView]        = useState('')
  const [frames,      setFrames]      = useState('')
  const [parking,     setParking]     = useState('')
  const [transport,   setTransport]   = useState('')

  const [checkboxes, setCheckboxes] = useState<Record<string,boolean>>({})

  const CHECKBOXES = [
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

  const filtered = useMemo(() => {
    return properties.filter(p => {
      if (search     && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.region.toLowerCase().includes(search.toLowerCase())) return false
      if (region     && !p.region.toLowerCase().includes(region.toLowerCase())) return false
      if (status     && p.status !== status) return false
      if (priceMin   && p.price < Number(priceMin)) return false
      if (priceMax   && p.price > Number(priceMax)) return false
      if (sqmMin     && (p.sqm ?? 0)  < Number(sqmMin))  return false
      if (sqmMax     && (p.sqm ?? 999999) > Number(sqmMax)) return false
      if (bedroomsMin && (p.bedrooms ?? 0) < Number(bedroomsMin)) return false
      if (bedroomsMax && (p.bedrooms ?? 99) > Number(bedroomsMax)) return false
      if (bathroomsMin && (p.bathrooms ?? 0) < Number(bathroomsMin)) return false
      if (bathroomsMax && (p.bathrooms ?? 99) > Number(bathroomsMax)) return false
      if (floorMin   && (p.floor ?? 0) < Number(floorMin)) return false
      if (floorMax   && (p.floor ?? 99) > Number(floorMax)) return false
      if (yearMin    && (p.year_built ?? 0) < Number(yearMin)) return false
      if (yearMax    && (p.year_built ?? 9999) > Number(yearMax)) return false
      if (heating    && p.heating_type   !== heating)   return false
      if (view       && p.view_type      !== view)      return false
      if (frames     && p.frame_type     !== frames)    return false
      if (parking    && p.parking_type   !== parking)   return false
      if (transport  && p.transport_type !== transport) return false
      for (const key of Object.keys(checkboxes)) {
        if (checkboxes[key] && !p[key as keyof Property]) return false
      }
      return true
    })
  }, [properties, search, region, status, priceMin, priceMax, sqmMin, sqmMax,
      bedroomsMin, bedroomsMax, bathroomsMin, bathroomsMax, floorMin, floorMax,
      yearMin, yearMax, heating, view, frames, parking, transport, checkboxes])

  const inputS = {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(212,160,23,0.18)',
    color: '#F5F0E8',
    padding: '10px 14px',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '12px',
    fontWeight: 300,
    outline: 'none',
    width: '100%',
  }

  const labelS = {
    fontSize: '9px',
    letterSpacing: '2px',
    textTransform: 'uppercase' as const,
    color: '#888888',
    marginBottom: '6px',
    display: 'block',
  }

  function clearAll() {
    setSearch(''); setRegion(''); setStatus(''); setPriceMin(''); setPriceMax('')
    setSqmMin(''); setSqmMax(''); setBedroomsMin(''); setBedroomsMax('')
    setBathroomsMin(''); setBathroomsMax(''); setFloorMin(''); setFloorMax('')
    setYearMin(''); setYearMax(''); setHeating(''); setView(''); setFrames('')
    setParking(''); setTransport(''); setCheckboxes({})
  }

  return (
    <div style={{ padding: '40px 60px' }}>

      {/* ── FILTER BAR ── */}
      <div style={{ background: '#0A0A0A', border: '1px solid rgba(212,160,23,0.15)', padding: '28px', marginBottom: '40px' }}>

        {/* Basic filters row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px', marginBottom: '20px' }}>
          <div style={{ gridColumn: 'span 2' }}>
            <label style={labelS}>Search</label>
            <input style={inputS} placeholder="Title or region..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div>
            <label style={labelS}>Region</label>
            <select style={inputS} value={region} onChange={e => setRegion(e.target.value)}>
              <option value="">All regions</option>
              {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label style={labelS}>Status</label>
            <select style={inputS} value={status} onChange={e => setStatus(e.target.value)}>
              <option value="">For Sale &amp; Rent</option>
              <option value="for_sale">For Sale</option>
              <option value="for_rent">For Rent</option>
            </select>
          </div>
          <div>
            <label style={labelS}>Price From (€)</label>
            <input style={inputS} type="number" placeholder="0" value={priceMin} onChange={e => setPriceMin(e.target.value)} />
          </div>
          <div>
            <label style={labelS}>Price To (€)</label>
            <input style={inputS} type="number" placeholder="Any" value={priceMax} onChange={e => setPriceMax(e.target.value)} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px', marginBottom: '20px' }}>
          <div>
            <label style={labelS}>Sq.m. From</label>
            <input style={inputS} type="number" placeholder="0" value={sqmMin} onChange={e => setSqmMin(e.target.value)} />
          </div>
          <div>
            <label style={labelS}>Sq.m. To</label>
            <input style={inputS} type="number" placeholder="Any" value={sqmMax} onChange={e => setSqmMax(e.target.value)} />
          </div>
        </div>

        {/* More Filters toggle */}
        <button
          onClick={() => setShowMore(v => !v)}
          style={{ background: 'transparent', border: '1px solid rgba(212,160,23,0.25)', color: '#F0C040', fontFamily: 'Montserrat, sans-serif', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', padding: '10px 24px', cursor: 'pointer', marginBottom: showMore ? '24px' : '0' }}
        >
          {showMore ? '− Less Filters' : '+ More Filters'}
        </button>

        {/* Expanded filters */}
        {showMore && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label style={labelS}>Bedrooms From</label>
                <input style={inputS} type="number" value={bedroomsMin} onChange={e => setBedroomsMin(e.target.value)} />
              </div>
              <div>
                <label style={labelS}>Bedrooms To</label>
                <input style={inputS} type="number" value={bedroomsMax} onChange={e => setBedroomsMax(e.target.value)} />
              </div>
              <div>
                <label style={labelS}>Bathrooms From</label>
                <input style={inputS} type="number" value={bathroomsMin} onChange={e => setBathroomsMin(e.target.value)} />
              </div>
              <div>
                <label style={labelS}>Bathrooms To</label>
                <input style={inputS} type="number" value={bathroomsMax} onChange={e => setBathroomsMax(e.target.value)} />
              </div>
              <div>
                <label style={labelS}>Floor From</label>
                <input style={inputS} type="number" value={floorMin} onChange={e => setFloorMin(e.target.value)} />
              </div>
              <div>
                <label style={labelS}>Floor To</label>
                <input style={inputS} type="number" value={floorMax} onChange={e => setFloorMax(e.target.value)} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label style={labelS}>Year From</label>
                <input style={inputS} type="number" placeholder="e.g. 2000" value={yearMin} onChange={e => setYearMin(e.target.value)} />
              </div>
              <div>
                <label style={labelS}>Year To</label>
                <input style={inputS} type="number" placeholder="e.g. 2024" value={yearMax} onChange={e => setYearMax(e.target.value)} />
              </div>
              <div>
                <label style={labelS}>Heating</label>
                <select style={inputS} value={heating} onChange={e => setHeating(e.target.value)}>
                  <option value="">Any</option>
                  {['Autonomous','Central','Air Condition','Fireplace','Radiator','Underfloor','Solar','None'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label style={labelS}>View</label>
                <select style={inputS} value={view} onChange={e => setView(e.target.value)}>
                  <option value="">Any</option>
                  {['Sea View','Mountain View','City View','Garden View','Pool View','Street View','Acropolis View'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label style={labelS}>Frames</label>
                <select style={inputS} value={frames} onChange={e => setFrames(e.target.value)}>
                  <option value="">Any</option>
                  {['Aluminium','PVC','Wooden','Iron','Mixed'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label style={labelS}>Parking</label>
                <select style={inputS} value={parking} onChange={e => setParking(e.target.value)}>
                  <option value="">Any</option>
                  {['Closed','Open','Pilotis','Basement','Street','None'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={labelS}>Transport</label>
                <select style={inputS} value={transport} onChange={e => setTransport(e.target.value)}>
                  <option value="">Any</option>
                  {['Metro','Bus','Tram','Train','ISAP','None'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>

            {/* Checkboxes */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
              {CHECKBOXES.map(({ key, label }) => (
                <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '11px', color: '#CCCCCC', letterSpacing: '0.5px' }}>
                  <input
                    type="checkbox"
                    checked={!!checkboxes[key]}
                    onChange={e => setCheckboxes(prev => ({ ...prev, [key]: e.target.checked }))}
                    style={{ accentColor: '#F0C040', width: '14px', height: '14px', cursor: 'pointer' }}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Results count + clear */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(212,160,23,0.08)' }}>
          <span style={{ fontSize: '12px', color: '#888888', fontFamily: 'Montserrat, sans-serif' }}>
            {filtered.length} {filtered.length === 1 ? 'property' : 'properties'} found
          </span>
          <button onClick={clearAll} style={{ background: 'transparent', border: 'none', color: '#888888', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif' }}>
            Clear All
          </button>
        </div>
      </div>

      {/* ── GRID ── */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: '#888888', fontFamily: 'Montserrat, sans-serif' }}>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '48px', color: 'rgba(212,160,23,0.2)', marginBottom: '16px' }}>HS</div>
          <p style={{ fontSize: '13px', letterSpacing: '1px' }}>No properties match your search criteria.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {filtered.map(p => <PropertyCard key={p.id} property={p} />)}
        </div>
      )}

    </div>
  )
}