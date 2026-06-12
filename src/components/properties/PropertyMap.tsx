'use client'

import { useEffect, useRef } from 'react'
import type { Property } from '@/types'

interface Props {
  properties: Property[]
  hoveredId:  string | null
  onHover:    (id: string | null) => void
}

export default function PropertyMap({ properties, hoveredId, onHover }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef       = useRef<any>(null)
  const markersRef   = useRef<Map<string, any>>(new Map())

  // Filter to only properties with coordinates
  const mapped = properties.filter(p => (p as any).map_lat && (p as any).map_lng)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    // Dynamically import Leaflet (client-only)
    import('leaflet').then(L => {
      // Fix default icon paths broken by webpack
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      // Center on Greece
      const map = L.map(containerRef.current!, {
        center: [38.5, 24.0],
        zoom:   6,
        zoomControl: true,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map)

      // Style the attribution to match dark theme
      const attr = containerRef.current!.querySelector('.leaflet-control-attribution') as HTMLElement
      if (attr) {
        attr.style.background = 'rgba(10,10,10,0.8)'
        attr.style.color = '#666'
        attr.style.fontSize = '9px'
      }

      mapRef.current = map
    })

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
        markersRef.current.clear()
      }
    }
  }, [])

  // Update markers when filtered properties change
  useEffect(() => {
    if (!mapRef.current) return

    import('leaflet').then(L => {
      const map = mapRef.current

      // Remove old markers
      markersRef.current.forEach(m => m.remove())
      markersRef.current.clear()

      if (mapped.length === 0) return

      const bounds: [number, number][] = []

      mapped.forEach(p => {
        const lat = (p as any).map_lat
        const lng = (p as any).map_lng
        if (!lat || !lng) return

        const propertyId = String(p.id)
        const isActive = hoveredId === propertyId

        

        const marker = L.circle([lat, lng], {
  radius: 500,
  color: '#F0C040',
  fillColor: '#F0C040',
  fillOpacity: 0.1,
  weight: 1.5,
              }).addTo(map)
             .bindPopup(`
            <div style="font-family: Montserrat, sans-serif; min-width: 180px;">
              <div style="font-size: 10px; color: #F0C040; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 4px;">${p.property_code ?? ''}</div>
              <div style="font-size: 13px; color: #F5F0E8; margin-bottom: 6px; font-family: 'Cormorant Garamond', serif;">${p.title}</div>
              <div style="font-size: 13px; color: #F0C040; font-weight: 600; margin-bottom: 4px;">€${Number(p.price).toLocaleString()}</div>
              <div style="font-size: 11px; color: #888;">${p.region ?? ''}</div>
              <a href="/properties/${p.property_code ?? p.id}" style="display: block; margin-top: 8px; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #F0C040; text-decoration: none;">View →</a>
            </div>
          `, {
            className: 'hs-popup',
            maxWidth: 220,
          })

        marker.on('mouseover', () => onHover(propertyId))
        marker.on('mouseout',  () => onHover(null))

        markersRef.current.set(propertyId, marker)
        bounds.push([lat, lng])
      })

      if (bounds.length > 0) {
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 })
      }
    })
  }, [mapped.map(p => p.id).join(','), hoveredId])

  return (
    <>
      <style>{`
        .hs-popup .leaflet-popup-content-wrapper {
          background: #111111 !important;
          border: 1px solid rgba(212,160,23,0.25) !important;
          border-radius: 2px !important;
          box-shadow: 0 8px 24px rgba(0,0,0,0.6) !important;
          color: #F5F0E8 !important;
        }
        .hs-popup .leaflet-popup-tip {
          background: #111111 !important;
        }
        .hs-popup .leaflet-popup-close-button {
          color: #888 !important;
        }
        .leaflet-control-zoom a {
          background: #1a1a1a !important;
          color: #F0C040 !important;
          border-color: rgba(212,160,23,0.25) !important;
        }
        .leaflet-control-zoom a:hover {
          background: rgba(212,160,23,0.1) !important;
        }
      `}</style>

      {/* Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />

      <div
        ref={containerRef}
        style={{ width: '100%', height: '100%', background: '#0a0a0a' }}
      />

      {mapped.length === 0 && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
          background: 'rgba(10,10,10,0.7)',
        }}>
          <span style={{ color: '#555', fontFamily: 'Montserrat, sans-serif', fontSize: '11px', letterSpacing: '2px' }}>
            NO LOCATION DATA
          </span>
        </div>
      )}
    </>
  )
}
