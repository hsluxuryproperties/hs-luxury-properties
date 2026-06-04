import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import PropertyForm from '@/components/admin/PropertyForm'
import type { Property } from '@/types'

export default async function EditProperty({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { id } = await searchParams
  if (!id) redirect('/admin/dashboard')

  const { data: property } = await supabase
    .from('properties')
    .select('*, images:property_images(*)')
    .eq('id', id)
    .single()

  if (!property) redirect('/admin/dashboard')

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', fontFamily: 'Montserrat, sans-serif', color: '#F5F0E8' }}>

      <div style={{ background: '#111111', borderBottom: '1px solid rgba(212,160,23,0.2)', padding: '0 40px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Link href="/admin/dashboard" style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#888888', textDecoration: 'none' }}>
            ← Dashboard
          </Link>
          <span style={{ color: 'rgba(212,160,23,0.3)' }}>|</span>
          <span style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#F0C040' }}>
            Edit — {property.property_code}
          </span>
        </div>
        <Link
          href={`/properties/${property.id}`}
          target="_blank"
          style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#888888', textDecoration: 'none' }}
        >
          View Live →
        </Link>
      </div>

      <PropertyForm existing={property as Property} />
    </div>
  )
}