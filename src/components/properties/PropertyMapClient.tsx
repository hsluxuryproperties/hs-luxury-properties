'use client'

import dynamic from 'next/dynamic'

const PropertyMap = dynamic(
  () => import('@/components/properties/PropertyMap'),
  { ssr: false, loading: () => <p>Loading map...</p> }
)

export default PropertyMap