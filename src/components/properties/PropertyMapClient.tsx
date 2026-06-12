'use client'

import dynamic from 'next/dynamic'

const PropertyMap = dynamic(
  () => import('@/components/properties/PropertyMap'),
  { ssr: false }
)

export default PropertyMap
