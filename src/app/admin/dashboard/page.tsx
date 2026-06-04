import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import AdminLogout from '@/components/admin/AdminLogout'

export default async function AdminDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/admin/login')

  const { data: properties, count } = await supabase
    .from('properties')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })

  const { count: contactCount } = await supabase
    .from('contact_submissions')
    .select('*', { count: 'exact', head: true })

  const forSale  = properties?.filter(p => p.status === 'for_sale').length  ?? 0
  const forRent  = properties?.filter(p => p.status === 'for_rent').length  ?? 0
  const featured = properties?.filter(p => p.featured_investor || p.featured_home).length ?? 0

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', fontFamily: 'Montserrat, sans-serif', color: '#F5F0E8' }}>

      {/* Top bar */}
      <div style={{ background: '#111111', borderBottom: '1px solid rgba(212,160,23,0.2)', padding: '0 40px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', color: '#F0C040', letterSpacing: '2px' }}>HS</span>
          <span style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#888888' }}>Admin Dashboard</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Link href="/" target="_blank" style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#888888', textDecoration: 'none' }}>
            View Site
          </Link>
          <AdminLogout />
        </div>
      </div>

      <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '48px' }}>
          {[
            { label: 'Total Listings',      value: count ?? 0         },
            { label: 'For Sale',            value: forSale            },
            { label: 'For Rent',            value: forRent            },
            { label: 'Featured',            value: featured           },
            { label: 'Contact Enquiries',   value: contactCount ?? 0  },
          ].map(stat => (
            <div key={stat.label} style={{ background: '#111111', border: '1px solid rgba(212,160,23,0.15)', padding: '24px', }}>
              <div style={{ fontSize: '32px', fontFamily: 'Cormorant Garamond, serif', color: '#F0C040', lineHeight: 1, marginBottom: '8px' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#888888' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '40px' }}>
          <Link href="/admin/properties/new" style={{
            padding: '14px 32px',
            background: 'transparent',
            border: '1px solid #F0C040',
            color: '#F0C040',
            fontSize: '11px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'all 0.3s',
          }}>
            + Add New Listing
          </Link>
          <Link href="/admin/contacts" style={{
            padding: '14px 32px',
            background: 'transparent',
            border: '1px solid rgba(212,160,23,0.3)',
            color: '#888888',
            fontSize: '11px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}>
            View Enquiries
          </Link>
        </div>

        {/* Listings Table */}
        <div style={{ border: '1px solid rgba(212,160,23,0.15)', overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(212,160,23,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#F0C040' }}>All Listings</span>
            <span style={{ fontSize: '12px', color: '#888888' }}>{count ?? 0} properties</span>
          </div>

          {!properties || properties.length === 0 ? (
            <div style={{ padding: '60px 24px', textAlign: 'center', color: '#888888', fontSize: '13px' }}>
              No listings yet.{' '}
              <Link href="/admin/properties/new" style={{ color: '#F0C040', textDecoration: 'none' }}>
                Add your first property →
              </Link>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(212,160,23,0.1)' }}>
                  {['Code', 'Title', 'Region', 'Price', 'Status', 'Featured', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '14px 24px', textAlign: 'left', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#888888', fontWeight: 400 }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {properties.map((p, i) => (
                  <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                    <td style={{ padding: '16px 24px', fontSize: '11px', color: '#F0C040', letterSpacing: '1px' }}>{p.property_code}</td>
                    <td style={{ padding: '16px 24px', fontSize: '13px', color: '#F5F0E8' }}>{p.title}</td>
                    <td style={{ padding: '16px 24px', fontSize: '12px', color: '#888888' }}>{p.region}</td>
                    <td style={{ padding: '16px 24px', fontSize: '12px', color: '#F5F0E8' }}>€{Number(p.price).toLocaleString()}</td>
                    <td style={{ padding: '16px 24px' }}>
                      <span style={{
                        fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase',
                        padding: '4px 10px',
                        border: `1px solid ${p.status === 'for_sale' ? 'rgba(212,160,23,0.4)' : 'rgba(100,180,100,0.4)'}`,
                        color: p.status === 'for_sale' ? '#F0C040' : '#80C080',
                      }}>
                        {p.status === 'for_sale' ? 'For Sale' : 'For Rent'}
                      </span>
                    </td>
                    <td style={{ padding: '16px 24px', fontSize: '12px', color: '#888888' }}>
                      {p.featured_investor && <span style={{ color: '#F0C040', marginRight: '8px' }}>Investor</span>}
                      {p.featured_home     && <span style={{ color: '#F0C040' }}>Home</span>}
                      {!p.featured_investor && !p.featured_home && '—'}
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ display: 'flex', gap: '16px' }}>
                        <Link href={`/admin/properties/edit?id=${p.id}`} style={{ fontSize: '11px', color: '#F0C040', textDecoration: 'none', letterSpacing: '1px' }}>
                          Edit
                        </Link>
                        <Link href={`/properties/${p.id}`} target="_blank" style={{ fontSize: '11px', color: '#888888', textDecoration: 'none', letterSpacing: '1px' }}>
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  )
}