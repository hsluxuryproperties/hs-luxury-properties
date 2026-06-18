'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const inputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(212,160,23,0.35)',
  color: '#F5F0E8',
  padding: '9px 12px',
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '12px',
  fontWeight: 400,
  outline: 'none',
  width: '100%',
  // hide number spinners
  MozAppearance: 'textfield' as any,
}

const labelStyle: React.CSSProperties = {
  fontSize: '9px',
  letterSpacing: '3px',
  textTransform: 'uppercase',
  color: '#AAAAAA',
  marginBottom: '5px',
  display: 'block',
}

const BOOLEAN_FILTERS = [
  { key: 'elevator',    label: 'Elevator'    },
  { key: 'pool',        label: 'Pool'        },
  { key: 'garden',      label: 'Garden'      },
  { key: 'furnished',   label: 'Furnished'   },
  { key: 'beachfront',  label: 'Beachfront'  },
  { key: 'golden_visa', label: 'Golden Visa' },
  { key: 'luxury',      label: 'Luxury'      },
  { key: 'investment',  label: 'Investment'  },
  { key: 'newly_built', label: 'Newly Built' },
  { key: 'penthouse',   label: 'Penthouse'   },
]

const MORE_BOOLEAN_FILTERS = [
  { key: 'ac',                 label: 'A/C'              },
  { key: 'fireplace',          label: 'Fireplace'        },
  { key: 'armored_door',       label: 'Armored Door'     },
  { key: 'warehouse',          label: 'Warehouse'        },
  { key: 'closet',             label: 'Closet'           },
  { key: 'awnings',            label: 'Awnings'          },
  { key: 'solar_water_heater', label: 'Solar Heater'     },
  { key: 'painted',            label: 'Painted'          },
  { key: 'bright',             label: 'Bright'           },
  { key: 'student_friendly',   label: 'Student Friendly' },
  { key: 'from_auction',       label: 'From Auction'     },
]

const noSpinnerStyle = `
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
  input[type=number] { -moz-appearance: textfield; }
  input::placeholder { color: #555; }
  select option { background: #1a1a1a; color: #F5F0E8; }
`

export default function PropertiesFilter({ params }: { params: Record<string, string | undefined> }) {
  const router = useRouter()
  const [showMore, setShowMore] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

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

  // Close panel on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setShowMore(false)
      }
    }
    if (showMore) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [showMore])

  function set(key: string, value: string) {
    setFilters(f => ({ ...f, [key]: value }))
  }

  function applyFilters() {
    const p = new URLSearchParams()
    Object.entries(filters).forEach(([k, v]) => { if (v) p.set(k, v) })
    router.push(`/properties?${p.toString()}`)
    setShowMore(false)
  }

  function clearFilters() {
    setFilters({
      status: '', region: '', price_min: '', price_max: '',
      sqm_min: '', sqm_max: '', bedrooms: '', bathrooms: '',
      floor_min: '', floor_max: '',
      ...Object.fromEntries([...BOOLEAN_FILTERS, ...MORE_BOOLEAN_FILTERS].map(f => [f.key, ''])),
    })
    router.push('/properties')
    setShowMore(false)
  }

  const activeMoreCount = [
    filters.sqm_min, filters.sqm_max, filters.bathrooms,
    filters.floor_min, filters.floor_max,
    ...[...BOOLEAN_FILTERS, ...MORE_BOOLEAN_FILTERS].map(f => filters[f.key]),
  ].filter(Boolean).length

  return (
    <div style={{
      borderBottom: '1px solid rgba(212,160,23,0.1)',
      background: '#111111',
      position: 'relative',
      zIndex: 10,
    }}>
      <style>{noSpinnerStyle}</style>

      {/* ── Main filter bar ── */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: '12px',
        padding: '20px 60px',
        flexWrap: 'wrap',
      }}>

        {/* Status */}
        <div style={{ minWidth: '130px' }}>
          <label style={labelStyle}>Status</label>
          <select style={inputStyle} value={filters.status} onChange={e => set('status', e.target.value)}>
            <option value="">All</option>
            <option value="for_sale">For Sale</option>
            <option value="for_rent">For Rent</option>
          </select>
        </div>

        <Divider />

        {/* Region */}
        <div style={{ minWidth: '160px', flex: 1, maxWidth: '220px' }}>
          <label style={labelStyle}>Region</label>
          <input style={inputStyle} placeholder="e.g. Athens" value={filters.region} onChange={e => set('region', e.target.value)} />
        </div>

        <Divider />

        {/* Price */}
        <div style={{ minWidth: '200px' }}>
          <label style={labelStyle}>Price (€)</label>
          <div style={{ display: 'flex', gap: '6px' }}>
            <input style={{ ...inputStyle, width: '90px' }} type="number" placeholder="From" min={0} value={filters.price_min} onChange={e => set('price_min', e.target.value)} />
            <input style={{ ...inputStyle, width: '90px' }} type="number" placeholder="To"   min={0} value={filters.price_max} onChange={e => set('price_max', e.target.value)} />
          </div>
        </div>

        <Divider />

        {/* Bedrooms */}
        <div style={{ minWidth: '80px' }}>
          <label style={labelStyle}>Bedrooms</label>
          <select style={inputStyle} value={filters.bedrooms} onChange={e => set('bedrooms', e.target.value)}>
            <option value="">Any</option>
            {[1,2,3,4,5].map(n => (
              <option key={n} value={String(n)}>{n}+</option>
            ))}
          </select>
        </div>

        <Divider />

        {/* More Filters button */}
        <div ref={panelRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setShowMore(s => !s)}
            style={{
              background: showMore ? 'rgba(212,160,23,0.08)' : 'transparent',
              border: `1px solid ${showMore ? '#F0C040' : 'rgba(212,160,23,0.25)'}`,
              color: showMore ? '#F0C040' : '#888888',
              padding: '9px 16px',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '10px', letterSpacing: '2px',
              textTransform: 'uppercase', cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', gap: '8px',
              whiteSpace: 'nowrap',
            }}
          >
            More Filters
            {activeMoreCount > 0 && (
              <span style={{
                background: '#F0C040', color: '#0A0A0A',
                borderRadius: '50%', width: '16px', height: '16px',
                fontSize: '9px', fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {activeMoreCount}
              </span>
            )}
            <span style={{ fontSize: '9px' }}>{showMore ? '▲' : '▼'}</span>
          </button>

          {/* ── Dropdown panel ── */}
          {showMore && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              left: 0,
              background: '#111111',
              border: '1px solid rgba(212,160,23,0.18)',
              padding: '28px',
              width: '600px',
              boxShadow: '0 16px 48px rgba(0,0,0,0.7)',
              zIndex: 100,
            }}>

              {/* Sqm + Bathrooms + Floor */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                <div>
                  <label style={labelStyle}>Size (m²)</label>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <input style={{ ...inputStyle, width: '70px' }} type="number" placeholder="From" min={0} value={filters.sqm_min} onChange={e => set('sqm_min', e.target.value)} />
                    <input style={{ ...inputStyle, width: '70px' }} type="number" placeholder="To"   min={0} value={filters.sqm_max} onChange={e => set('sqm_max', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Bathrooms (min)</label>
                  <select style={inputStyle} value={filters.bathrooms} onChange={e => set('bathrooms', e.target.value)}>
                    <option value="">Any</option>
                    {[1,2,3,4].map(n => (
                      <option key={n} value={String(n)}>{n}+</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Floor</label>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <input style={{ ...inputStyle, width: '70px' }} type="number" placeholder="From" min={-5} value={filters.floor_min} onChange={e => set('floor_min', e.target.value)} />
                    <input style={{ ...inputStyle, width: '70px' }} type="number" placeholder="To"   min={-5} value={filters.floor_max} onChange={e => set('floor_max', e.target.value)} />
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(212,160,23,0.08)', paddingTop: '20px', marginBottom: '20px' }}>
                <label style={{ ...labelStyle, marginBottom: '14px' }}>Features</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {[...BOOLEAN_FILTERS, ...MORE_BOOLEAN_FILTERS].map(({ key, label }) => {
                    const active = filters[key] === 'true'
                    return (
                      <button
                        key={key}
                        onClick={() => set(key, active ? '' : 'true')}
                        style={{
                          padding: '6px 14px',
                          background: active ? 'rgba(212,160,23,0.12)' : 'transparent',
                          border: `1px solid ${active ? '#F0C040' : 'rgba(212,160,23,0.2)'}`,
                          color: active ? '#F0C040' : '#888888',
                          fontFamily: 'Montserrat, sans-serif',
                          fontSize: '10px', letterSpacing: '1px',
                          cursor: 'pointer', transition: 'all 0.15s',
                        }}
                      >
                        {label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Panel actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button onClick={clearFilters} style={{
                  padding: '10px 20px', background: 'transparent',
                  border: '1px solid rgba(212,160,23,0.2)', color: '#888888',
                  fontFamily: 'Montserrat, sans-serif', fontSize: '10px',
                  letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer',
                }}>
                  Clear All
                </button>
                <button onClick={applyFilters} style={{
                  padding: '10px 24px', background: 'transparent',
                  border: '1px solid #F0C040', color: '#F0C040',
                  fontFamily: 'Montserrat, sans-serif', fontSize: '10px',
                  letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer',
                }}>
                  Apply
                </button>
              </div>

            </div>
          )}
        </div>

        {/* Inline apply / clear */}
        <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
          <button onClick={applyFilters} style={{
            padding: '9px 20px', background: 'transparent',
            border: '1px solid #F0C040', color: '#F0C040',
            fontFamily: 'Montserrat, sans-serif', fontSize: '10px',
            letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer',
          }}>
            Apply
          </button>
          <button onClick={clearFilters} style={{
            padding: '9px 16px', background: 'transparent',
            border: '1px solid rgba(212,160,23,0.2)', color: '#888888',
            fontFamily: 'Montserrat, sans-serif', fontSize: '10px',
            letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer',
          }}>
            Clear
          </button>
        </div>

      </div>
    </div>
  )
}

function Divider() {
  return (
    <div style={{
      width: '1px', height: '36px', background: 'rgba(212,160,23,0.12)',
      alignSelf: 'flex-end', marginBottom: '1px', flexShrink: 0,
    }} />
  )
}
