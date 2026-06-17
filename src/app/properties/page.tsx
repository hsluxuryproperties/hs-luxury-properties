'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import type { Property } from '@/types'

// We load the map dynamically so Leaflet doesn't crash during the Vercel build phase
const PropertyMap = dynamic(
  () => import('@/components/properties/PropertyMap'),
  { ssr: false }
)

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch your properties data when the page loads
  useEffect(() => {
    async function fetchProperties() {
      try {
        // Adjust this URL to match your actual API endpoint (e.g., '/api/properties')
        const response = await fetch('/api/properties') 
        const data = await response.json()
        setProperties(data || [])
      } catch (error) {
        console.error("Failed to fetch properties:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  if (loading) {
    return <div style={{ color: '#F5F0E8', padding: '20px' }}>Loading luxury properties...</div>
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#0a0a0a' }}>
      
      {/* LEFT SIDE: Your list of property cards go here */}
      <div style={{ width: '50%', overflowY: 'auto', padding: '20px' }}>
        <h1 style={{ color: '#F0C040', fontFamily: 'Cormorant Garamond, serif', fontSize: '32px' }}>
          Our Properties
        </h1>
        {properties.map((p) => (
          <div 
            key={p.id}
            onMouseEnter={() => setHoveredId(String(p.id))}
            onMouseLeave={() => setHoveredId(null)}
            style={{ 
              padding: '15px', 
              margin: '10px 0', 
              border: '1px solid rgba(212,160,23,0.15)',
              background: hoveredId === String(p.id) ? 'rgba(212,160,23,0.05)' : 'transparent',
              transition: 'all 0.2s ease'
            }}
          >
            <h3 style={{ color: '#F5F0E8' }}>{p.title}</h3>
            <p style={{ color: '#F0C040' }}>€{Number(p.price).toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* RIGHT SIDE: The Live Map */}
      <div style={{ width: '50%', height: '100%', position: 'relative' }}>
        <PropertyMap 
          properties={properties} 
          hoveredId={hoveredId} 
          onHover={setHoveredId} 
        />
      </div>

    </div>
  )
}