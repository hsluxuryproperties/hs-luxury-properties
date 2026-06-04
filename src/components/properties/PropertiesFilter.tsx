'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const inputStyle = {
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

const labelStyle = {
  fontSize: '9px',
  letterSpacing: '3px',
  textTransform: 'uppercase' as const,
  color: '#888888',
  marginBottom: '6px',
  display: 'block',
}

const BOOLEAN_FILTERS = [
  { key: 'elevator',    label: 'Elevator'        },
  { key: 'pool',        label: 'Pool'            },
  { key: 'garden',      label: 'Garden'          },
  { key: 'furnished',   label: 'Furnished'       },
  { key: 'beachfront',  label: 'Beachfront'      },
  { key: 'golden_visa', label: 'Golden Visa'     },
  { key: 'luxury',      label: 'Luxury'          },
  { key: 'investment',  label: 'Investment'      },
  { key: 'newly_built', label: 'Newly Built'     },
  { key: 'penthouse',   label: 'Penthouse'       },
]

const MORE_BOOLEAN_FILTERS = [
  { key: 'ac',                 label: 'A/C'               },
  { key: 'fireplace',          label: 'Fireplace'         },
  { key: 'armored_door',       label: 'Armored Door'      },
  { key: 'warehouse',          label: 'Warehouse'         },
  { key: 'closet',             label: 'Closet'            },
  { key: 'awnings',            label: 'Awnings'           },
  { key: 'solar_water_heater', label: 'Solar Heater'      },
  { key: 'painted',            label: 'Painted'           },
  { key: 'bright',             label: 'Bright'            },
  { key: 'student_friendly',   label: 'Student Friendly'  },
  { key: 'from_auction',       label: 'From Auction'      },
]

export default function PropertiesFilter({ params }: { params: Record<string, string | undefined> }) {
  const router = useRouter()
  const [showMore, setShowMore] = useState(false)

  const [filters, setFilters] = useState<Record<string, string>>({
    status:    params.status    ?? '',
    region:    params.region    ?? '',
    price_min: params.price_min ?? '',
    price_max: params.price_max ?? '',
    sqm_min:   params.sqm_min   ?? '',
    sqm_max:   params.sqm_max   ?? '',
    bedrooms:  params.bedrooms  ?? '',
    bathrooms: params.bathrooms ?? '',
    floor_min: params.floor_min ?? '',
    floor_max: params.floor_max ?? '',
    ...Object.fromEntries(
      [...BOOLEAN_FILTERS, ...MORE_BOOLEAN_FILTERS].map(f => [f.key, params[f.key] ?? ''])
    ),
  })

  function set(key: string, value: string) {
    setFilters(f => ({ ...f, [key]: value }))
  }

  function applyFilters() {
    const p = new URLSearchParams()
    Object.entries(filters).forEach(([k, v]) => {
      if (v && v !== '') p.set(k, v)
    })
    router.push(`/properties?${p.toString()}`)
  }

  function clearFilters() {
    setFilters({
      status: '', region: '', price_min: '', price_max: '',
      sqm_min: '', sqm_max: '', bedrooms: '', bathrooms: '',
      floor_min: '', floor_max: '',
      ...Object.fromEntries([...BOOLEAN_FILTERS, ...MORE_BOOLEAN_FILTERS].map(f => [f.key, ''])),
    })
    router.push('/properties')
  }

  return (
    <div style={{
      width: '280px',
      flexShrink: 0,
      background: '#111111',
      borderRight: '1px solid rgba(212,160,23,0.1)',
      padding: '32px 24px',
      minHeight: 'calc(100vh - 80px)',
    }}>

      <div style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: '#F0C040', marginBottom: '28px', fontFamily: 'Montserrat, sans-serif' }}>
        Filter
      </div>

      {/* Status */}
      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>Status</label>
        <select style={inputStyle} value={filters.status} onChange={e => set('status', e.target.value)}>
          <option value="">All</option>
          <option value="for_sale">For Sale</option>
          <option value="for_rent">For Rent</option>
        </select>
      </div>

      {/* Region */}
      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>Region</label>
        <input style={inputStyle} placeholder="e.g. Athens" value={filters.region} onChange={e => set('region', e.target.value)} />
      </div>

      {/* Price */}
      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>Price (€)</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <input style={inputStyle} type="number" placeholder="From" value={filters.price_min} onChange={e => set('price_min', e.target.value)} />
          <input style={inputStyle} type="number" placeholder="To" value={filters.price_max} onChange={e => set('price_max', e.target.value)} />
        </div>
      </div>

      {/* Sqm */}
      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>Size (m²)</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <input style={inputStyle} type="number" placeholder="From" value={filters.sqm_min} onChange={e => set('sqm_min', e.target.value)} />
          <input style={inputStyle} type="number" placeholder="To" value={filters.sqm_max} onChange={e => set('sqm_max', e.target.value)} />
        </div>
      </div>

      {/* Basic checkboxes */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ ...labelStyle, marginBottom: '12px' }}>Features</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {BOOLEAN_FILTERS.map(({ key, label }) => (
            <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '12px', color: '#CCCCCC', fontFamily: 'Montserrat, sans-serif' }}>
              <input
                type="checkbox"
                checked={filters[key] === 'true'}
                onChange={e => set(key, e.target.checked ? 'true' : '')}
                style={{ accentColor: '#F0C040', width: '14px', height: '14px', cursor: 'pointer' }}
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      {/* More Filters */}
      <button
        onClick={() => setShowMore(s => !s)}
        style={{
          width: '100%', background: 'transparent',
          border: '1px solid rgba(212,160,23,0.2)',
          color: '#888888', padding: '10px',
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '10px', letterSpacing: '2px',
          textTransform: 'uppercase', cursor: 'pointer',
          marginBottom: '20px', transition: 'all 0.3s',
        }}
      >
        {showMore ? 'Less Filters ↑' : 'More Filters ↓'}
      </button>

      {showMore && (
        <>
          {/* Bedrooms / Bathrooms */}
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Bedrooms (min)</label>
            <input style={inputStyle} type="number" placeholder="Any" value={filters.bedrooms} onChange={e => set('bedrooms', e.target.value)} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Bathrooms (min)</label>
            <input style={inputStyle} type="number" placeholder="Any" value={filters.bathrooms} onChange={e => set('bathrooms', e.target.value)} />
          </div>

          {/* Floor */}
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Floor</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <input style={inputStyle} type="number" placeholder="From" value={filters.floor_min} onChange={e => set('floor_min', e.target.value)} />
              <input style={inputStyle} type="number" placeholder="To" value={filters.floor_max} onChange={e => set('floor_max', e.target.value)} />
            </div>
          </div>

          {/* More boolean filters */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ ...labelStyle, marginBottom: '12px' }}>More Features</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {MORE_BOOLEAN_FILTERS.map(({ key, label }) => (
                <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '12px', color: '#CCCCCC', fontFamily: 'Montserrat, sans-serif' }}>
                  <input
                    type="checkbox"
                    checked={filters[key] === 'true'}
                    onChange={e => set(key, e.target.checked ? 'true' : '')}
                    style={{ accentColor: '#F0C040', width: '14px', height: '14px', cursor: 'pointer' }}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Apply / Clear */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
        <button onClick={applyFilters} style={{
          padding: '14px', background: 'transparent',
          border: '1px solid #F0C040', color: '#F0C040',
          fontFamily: 'Montserrat, sans-serif', fontSize: '10px',
          letterSpacing: '3px', textTransform: 'uppercase', cursor: 'pointer',
        }}>
          Apply Filters
        </button>
        <button onClick={clearFilters} style={{
          padding: '14px', background: 'transparent',
          border: '1px solid rgba(212,160,23,0.2)', color: '#888888',
          fontFamily: 'Montserrat, sans-serif', fontSize: '10px',
          letterSpacing: '3px', textTransform: 'uppercase', cursor: 'pointer',
        }}>
          Clear All
        </button>
      </div>

    </div>
  )
}