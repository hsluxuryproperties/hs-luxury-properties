import { createClient } from '@/lib/supabase/server'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PropertiesClient from '@/components/properties/PropertiesClient'
import type { Property } from '@/types'

export const metadata = {
  title: 'Properties — HS Luxury Properties',
  description: 'Browse our curated portfolio of luxury properties across Greece.',
}

export default async function PropertiesPage() {
  const supabase = await createClient()

  const { data } = await supabase
    .from('properties')
    .select('*, images:property_images(*)')
    .eq('active', true)
    .order('created_at', { ascending: false })

  const properties = (data ?? []) as Property[]

  return (
    <>
      <Header />
      <PropertiesClient properties={properties} />
      <Footer />
    </>
  )
}