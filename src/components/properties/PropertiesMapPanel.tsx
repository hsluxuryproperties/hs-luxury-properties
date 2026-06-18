'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import type { Property } from '@/types'

const PropertyMap = dynamic(
  () => import('@/components/properties/PropertyMap'),
  { ssr: false, loading: () => (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#0f0f0f',
    }}>
      <span style={{ color: '#555', fontFamily: 'Montserrat, sans-serif', fontSize: '11px', letterSpacing: '2px' }}>
        LOADING MAP…
      </span>
    </div>
  )}
)

interface Props {
  properties: Property[]
}

export default function PropertiesMapPanel({ properties }: Props) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div style={{
      width: '420px',
      flexShrink: 0,
      position: 'sticky',
      top: '80px',               // sits just below the fixed header
      height: 'calc(100vh - 80px)',
      borderLeft: '1px solid rgba(212,160,23,0.1)',
      overflow: 'hidden',
    }}>
      <PropertyMap
        properties={properties}
        hoveredId={hoveredId}
        onHover={setHoveredId}
      />
    </div>
  )
}
