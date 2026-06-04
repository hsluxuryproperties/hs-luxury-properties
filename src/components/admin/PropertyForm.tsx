'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import type { Property } from '@/types'

const inputStyle = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(212,160,23,0.18)',
  color: '#F5F0E8',
  padding: '12px 16px',
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '13px',
  fontWeight: 300,
  outline: 'none',
  width: '100%',
}

const labelStyle = {
  fontSize: '10px',
  letterSpacing: '3px',
  textTransform: 'uppercase' as const,
  color: '#888888',
  marginBottom: '6px',
  display: 'block',
}

const sectionTitleStyle = {
  fontFamily: 'Cormorant Garamond, serif',
  fontSize: '22px',
  color: '#F0C040',
  letterSpacing: '2px',
  marginBottom: '24px',
  paddingBottom: '12px',
  borderBottom: '1px solid rgba(212,160,23,0.15)',
}

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '20px',
  marginBottom: '32px',
}

const grid2Style = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '20px',
  marginBottom: '32px',
}

const checkboxGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '12px',
  marginBottom: '32px',
}

const HEATING_TYPES   = ['Autonomous', 'Central', 'Air Condition', 'Fireplace', 'Radiator', 'Underfloor', 'Solar', 'None']
const VIEW_TYPES      = ['Sea View', 'Mountain View', 'City View', 'Garden View', 'Pool View', 'Street View', 'Acropolis View']
const FRAME_TYPES     = ['Aluminium', 'PVC', 'Wooden', 'Iron', 'Mixed']
const PARKING_TYPES   = ['Closed', 'Open', 'Pilotis', 'Basement', 'Street', 'None']
const TRANSPORT_TYPES = ['Metro', 'Bus', 'Tram', 'Train', 'ISAP', 'None']

const BOOLEAN_FEATURES: { key: string; label: string }[] = [
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

type FormData = Omit<Property, 'id' | 'created_at' | 'updated_at' | 'images'>

const defaultForm: FormData = {
  property_code:      '',
  title:              '',
  description:        '',
  price:              0,
  status:             'for_sale',
  region:             '',
  address:            '',
  sqm:                0,
  floor:              null,
  bedrooms:           0,
  bathrooms:          0,
  year_built:         null,
  heating_type:       null,
  view_type:          null,
  frame_type:         null,
  parking_type:       null,
  transport_type:     null,
  elevator:           false,
  warehouse:          false,
  garden:             false,
  fireplace:          false,
  pool:               false,
  ac:                 false,
  armored_door:       false,
  closet:             false,
  awnings:            false,
  solar_water_heater: false,
  painted:            false,
  penthouse:          false,
  bright:             false,
  furnished:          false,
  beachfront:         false,
  luxury:             false,
  investment:         false,
  newly_built:        false,
  student_friendly:   false,
  from_auction:       false,
  golden_visa:        false,
  featured_investor:  false,
  featured_home:      false,
  latitude:           null,
  longitude:          null,
}

export default function PropertyForm({ existing }: { existing?: Property }) {
  const isEdit = !!existing
  const router = useRouter()
  const supabase = createClient()

  const [form, setForm] = useState<FormData>(() => {
    if (!existing) return defaultForm
    const { id, created_at, updated_at, images, ...rest } = existing
    return rest
  })

  const [images,       setImages]       = useState<File[]>([])
  const [previews,     setPreviews]     = useState<string[]>([])
  const [existingImgs, setExistingImgs] = useState(existing?.images ?? [])
  const [saving,       setSaving]       = useState(false)
  const [deleting,     setDeleting]     = useState(false)
  const [error,        setError]        = useState('')
  const [success,      setSuccess]      = useState('')

  function set(key: keyof FormData, value: unknown) {
    setForm(f => ({ ...f, [key]: value }))
  }

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    setImages(prev => [...prev, ...files])
    const newPreviews = files.map(f => URL.createObjectURL(f))
    setPreviews(prev => [...prev, ...newPreviews])
  }

  function removeNewImage(index: number) {
    setImages(prev => prev.filter((_, i) => i !== index))
    setPreviews(prev => prev.filter((_, i) => i !== index))
  }

  async function removeExistingImage(imgId: number, url: string) {
    const path = url.split('/property-images/')[1]
    await supabase.storage.from('property-images').remove([path])
    await supabase.from('property_images').delete().eq('id', imgId)
    setExistingImgs(prev => prev.filter(i => i.id !== imgId))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      let propertyId = existing?.id

      if (isEdit) {
        const { error } = await supabase
          .from('properties')
          .update(form)
          .eq('id', propertyId)
        if (error) throw error
      } else {
        const { data, error } = await supabase
          .from('properties')
          .insert(form)
          .select()
          .single()
        if (error) throw error
        propertyId = data.id
      }

      // Upload new images
      for (let i = 0; i < images.length; i++) {
        const file = images[i]
        const ext  = file.name.split('.').pop()
        const path = `${propertyId}/${Date.now()}-${i}.${ext}`

        const { error: uploadError } = await supabase.storage
          .from('property-images')
          .upload(path, file)

        if (uploadError) throw uploadError

        const { data: urlData } = supabase.storage
          .from('property-images')
          .getPublicUrl(path)

        await supabase.from('property_images').insert({
          property_id:   propertyId,
          url:           urlData.publicUrl,
          display_order: existingImgs.length + i,
        })
      }

      setSuccess(isEdit ? 'Listing updated successfully.' : 'Listing created successfully.')
      setTimeout(() => router.push('/admin/dashboard'), 1200)

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!existing?.id) return
    if (!confirm('Are you sure you want to delete this listing? This cannot be undone.')) return
    setDeleting(true)

    for (const img of existingImgs) {
      const path = img.url.split('/property-images/')[1]
      await supabase.storage.from('property-images').remove([path])
    }

    await supabase.from('properties').delete().eq('id', existing.id)
    router.push('/admin/dashboard')
  }

  const F = form

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px' }}>

      {/* ── BASIC INFO ── */}
      <div style={sectionTitleStyle}>Basic Information</div>
      <div style={grid2Style}>
        <div>
          <label style={labelStyle}>Title *</label>
          <input style={inputStyle} value={F.title} onChange={e => set('title', e.target.value)} required />
        </div>
        <div>
          <label style={labelStyle}>Status *</label>
          <select style={inputStyle} value={F.status} onChange={e => set('status', e.target.value)}>
            <option value="for_sale">For Sale</option>
            <option value="for_rent">For Rent</option>
          </select>
        </div>
      </div>

      <div style={gridStyle}>
        <div>
          <label style={labelStyle}>Price (€) *</label>
          <input style={inputStyle} type="number" value={F.price} onChange={e => set('price', Number(e.target.value))} required />
        </div>
        <div>
          <label style={labelStyle}>Region *</label>
          <input style={inputStyle} value={F.region} onChange={e => set('region', e.target.value)} required placeholder="e.g. Kolonaki, Athens" />
        </div>
        <div>
          <label style={labelStyle}>Address</label>
          <input style={inputStyle} value={F.address ?? ''} onChange={e => set('address', e.target.value)} />
        </div>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <label style={labelStyle}>Description</label>
        <textarea
          style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }}
          value={F.description ?? ''}
          onChange={e => set('description', e.target.value)}
        />
      </div>

      {/* ── DETAILS ── */}
      <div style={sectionTitleStyle}>Property Details</div>
      <div style={gridStyle}>
        <div>
          <label style={labelStyle}>Size (sq.m.)</label>
          <input style={inputStyle} type="number" value={F.sqm ?? ''} onChange={e => set('sqm', Number(e.target.value))} />
        </div>
        <div>
          <label style={labelStyle}>Floor</label>
          <input style={inputStyle} type="number" value={F.floor ?? ''} onChange={e => set('floor', Number(e.target.value))} />
        </div>
        <div>
          <label style={labelStyle}>Year Built</label>
          <input style={inputStyle} type="number" value={F.year_built ?? ''} onChange={e => set('year_built', Number(e.target.value))} placeholder="e.g. 2018" />
        </div>
        <div>
          <label style={labelStyle}>Bedrooms</label>
          <input style={inputStyle} type="number" value={F.bedrooms ?? ''} onChange={e => set('bedrooms', Number(e.target.value))} />
        </div>
        <div>
          <label style={labelStyle}>Bathrooms</label>
          <input style={inputStyle} type="number" value={F.bathrooms ?? ''} onChange={e => set('bathrooms', Number(e.target.value))} />
        </div>
      </div>

      {/* ── DROPDOWNS ── */}
      <div style={sectionTitleStyle}>Property Type & Features</div>
      <div style={gridStyle}>
        <div>
          <label style={labelStyle}>Heating Type</label>
          <select style={inputStyle} value={F.heating_type ?? ''} onChange={e => set('heating_type', e.target.value || null)}>
            <option value="">Select...</option>
            {HEATING_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>View Type</label>
          <select style={inputStyle} value={F.view_type ?? ''} onChange={e => set('view_type', e.target.value || null)}>
            <option value="">Select...</option>
            {VIEW_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Frame Type</label>
          <select style={inputStyle} value={F.frame_type ?? ''} onChange={e => set('frame_type', e.target.value || null)}>
            <option value="">Select...</option>
            {FRAME_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Parking Type</label>
          <select style={inputStyle} value={F.parking_type ?? ''} onChange={e => set('parking_type', e.target.value || null)}>
            <option value="">Select...</option>
            {PARKING_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Public Transport Nearby</label>
          <select style={inputStyle} value={F.transport_type ?? ''} onChange={e => set('transport_type', e.target.value || null)}>
            <option value="">Select...</option>
            {TRANSPORT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {/* ── CHECKBOXES ── */}
      <div style={sectionTitleStyle}>Amenities & Characteristics</div>
      <div style={checkboxGridStyle}>
        {BOOLEAN_FEATURES.map(({ key, label }) => (
          <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '12px', color: '#CCCCCC', letterSpacing: '0.5px' }}>
            <input
              type="checkbox"
              checked={!!F[key as keyof FormData]}
              onChange={e => set(key as keyof FormData, e.target.checked)}
              style={{ accentColor: '#F0C040', width: '16px', height: '16px', cursor: 'pointer' }}
            />
            {label}
          </label>
        ))}
      </div>

      {/* ── FEATURED ── */}
      <div style={sectionTitleStyle}>Homepage Featured</div>
      <div style={{ display: 'flex', gap: '32px', marginBottom: '32px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px', color: '#CCCCCC' }}>
          <input
            type="checkbox"
            checked={!!F.featured_investor}
            onChange={e => set('featured_investor', e.target.checked)}
            style={{ accentColor: '#F0C040', width: '16px', height: '16px', cursor: 'pointer' }}
          />
          Featured — For Investors section
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px', color: '#CCCCCC' }}>
          <input
            type="checkbox"
            checked={!!F.featured_home}
            onChange={e => set('featured_home', e.target.checked)}
            style={{ accentColor: '#F0C040', width: '16px', height: '16px', cursor: 'pointer' }}
          />
          Featured — For Homeowners section
        </label>
      </div>

      {/* ── COORDINATES ── */}
      <div style={sectionTitleStyle}>Map Coordinates (Optional)</div>
      <div style={grid2Style}>
        <div>
          <label style={labelStyle}>Latitude</label>
          <input style={inputStyle} type="number" step="any" value={F.latitude ?? ''} onChange={e => set('latitude', e.target.value ? Number(e.target.value) : null)} placeholder="e.g. 37.9838" />
        </div>
        <div>
          <label style={labelStyle}>Longitude</label>
          <input style={inputStyle} type="number" step="any" value={F.longitude ?? ''} onChange={e => set('longitude', e.target.value ? Number(e.target.value) : null)} placeholder="e.g. 23.7275" />
        </div>
      </div>

      {/* ── IMAGES ── */}
      <div style={sectionTitleStyle}>Property Photos</div>

      {/* Existing images */}
      {existingImgs.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
          {existingImgs.map(img => (
            <div key={img.id} style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', border: '1px solid rgba(212,160,23,0.2)' }}>
              <img src={img.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button
                type="button"
                onClick={() => removeExistingImage(img.id, img.url)}
                style={{ position: 'absolute', top: '6px', right: '6px', background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', width: '24px', height: '24px', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* New image previews */}
      {previews.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
          {previews.map((src, i) => (
            <div key={i} style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', border: '1px solid rgba(212,160,23,0.4)' }}>
              <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button
                type="button"
                onClick={() => removeNewImage(i)}
                style={{ position: 'absolute', top: '6px', right: '6px', background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', width: '24px', height: '24px', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload button */}
      <label style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '14px 28px',
        border: '1px solid rgba(212,160,23,0.3)',
        color: '#888888',
        fontSize: '11px',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        cursor: 'pointer',
        marginBottom: '40px',
        fontFamily: 'Montserrat, sans-serif',
      }}>
        + Upload Photos
        <input type="file" multiple accept="image/*" onChange={handleImageSelect} style={{ display: 'none' }} />
      </label>

      {/* ── FEEDBACK ── */}
      {error   && <div style={{ marginBottom: '20px', padding: '14px', border: '1px solid rgba(220,80,80,0.3)', color: '#E05555', fontSize: '13px' }}>{error}</div>}
      {success && <div style={{ marginBottom: '20px', padding: '14px', border: '1px solid rgba(80,200,80,0.3)', color: '#80C080', fontSize: '13px' }}>{success}</div>}

      {/* ── ACTIONS ── */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        <button
          type="submit"
          disabled={saving}
          style={{
            padding: '16px 40px',
            background: 'transparent',
            border: '1px solid #F0C040',
            color: saving ? '#888' : '#F0C040',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '11px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            cursor: saving ? 'not-allowed' : 'pointer',
          }}
        >
          {saving ? 'Saving...' : isEdit ? 'Update Listing' : 'Create Listing'}
        </button>

        <button
          type="button"
          onClick={() => router.push('/admin/dashboard')}
          style={{
            padding: '16px 32px',
            background: 'transparent',
            border: '1px solid rgba(212,160,23,0.2)',
            color: '#888888',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '11px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>

        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            style={{
              marginLeft: 'auto',
              padding: '16px 32px',
              background: 'transparent',
              border: '1px solid rgba(220,80,80,0.3)',
              color: '#E05555',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '11px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              cursor: deleting ? 'not-allowed' : 'pointer',
            }}
          >
            {deleting ? 'Deleting...' : 'Delete Listing'}
          </button>
        )}
      </div>

    </form>
  )
}