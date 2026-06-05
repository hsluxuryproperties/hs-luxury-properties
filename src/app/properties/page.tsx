import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PropertiesClient from '@/components/properties/PropertiesClient'
import { createClient } from '@/lib/supabase/server'
import type { Property } from '@/types'

export const metadata = {
  title: 'Properties',
  description: 'Browse our curated portfolio of luxury properties across Greece.',
}

export default async function PropertiesPage() {
  const supabase = await createClient()

  const { data } = await supabase
    .from('properties')
    .select('*, images:property_images(*)')
    .order('created_at', { ascending: false })

  const properties = (data ?? []) as Property[]

  return (
    <>
      <Header />
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#111111' }}>

        {/* Page header */}
        <div style={{
          padding: '60px 60px 40px',
          borderBottom: '1px solid rgba(212,160,23,0.1)',
          background: '#0A0A0A',
        }}>
          <p className="section-label">Our Portfolio</p>
          <h1 className="section-title">All Properties</h1>
          <div className="gold-line" />
          <p className="section-sub">
            Every property in our portfolio is hand-selected for its exceptional
            quality, location, and investment potential.
          </p>
        </div>

        <PropertiesClient properties={properties} />
      </div>
      <Footer />
    </>
  )
}