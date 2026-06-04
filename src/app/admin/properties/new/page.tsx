import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import PropertyForm from '@/components/admin/PropertyForm'

export default async function NewProperty() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', fontFamily: 'Montserrat, sans-serif', color: '#F5F0E8' }}>

      {/* Top bar */}
      <div style={{ background: '#111111', borderBottom: '1px solid rgba(212,160,23,0.2)', padding: '0 40px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Link href="/admin/dashboard" style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#888888', textDecoration: 'none' }}>
            ← Dashboard
          </Link>
          <span style={{ color: 'rgba(212,160,23,0.3)' }}>|</span>
          <span style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#F0C040' }}>New Listing</span>
        </div>
      </div>

      <PropertyForm />
    </div>
  )
}