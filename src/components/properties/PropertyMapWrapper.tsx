'use client'

import dynamic from 'next/dynamic'
import type { Property } from '@/types'

const PropertyMap = dynamic(
  () => import('@/components/properties/PropertyMap'),
  { ssr: false }
)

interface Props {
  property: Property
}

export default function PropertyMapWrapper({ property }: Props) {
  if (!property.map_lat || !property.map_lng) return null

  return (
    <div style={{ border: '1px solid rgba(212,160,23,0.15)', overflow: 'hidden', height: '360px' }}>
      <PropertyMap
        properties={[property]}
        hoveredId={null}
        onHover={() => {}}
      />
    </div>
  )
}