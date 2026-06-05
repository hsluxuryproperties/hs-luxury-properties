'use client'

import { useState } from 'react'
import type { PropertyImage } from '@/types'

export default function PropertyGallery({
  images,
  title,
}: {
  images: PropertyImage[]
  title: string
}) {
  const [active,    setActive]    = useState(0)
  const [lightbox,  setLightbox]  = useState(false)

  if (images.length === 0) {
    return (
      <div style={{ height: '480px', background: '#111111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '72px', color: 'rgba(212,160,23,0.15)', letterSpacing: '-2px' }}>HS</div>
      </div>
    )
  }

  function prev() { setActive(i => (i - 1 + images.length) % images.length) }
  function next() { setActive(i => (i + 1) % images.length) }

  return (
    <>
      {/* Main gallery */}
      <div style={{ position: 'relative', background: '#0A0A0A' }}>

        {/* Main image */}
        <div
          style={{ height: '560px', overflow: 'hidden', cursor: 'zoom-in', position: 'relative' }}
          onClick={() => setLightbox(true)}
        >
          <img
            src={images[active].url}
            alt={title}
            style={{ width: '100%', height: '100%', objectFit: 'contain', transition: 'opacity 0.3s' }}
          />

          {/* Image counter */}
          <div style={{ position: 'absolute', bottom: '20px', right: '20px', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(212,160,23,0.2)', padding: '6px 14px', fontSize: '11px', color: '#F0C040', fontFamily: 'Montserrat, sans-serif', letterSpacing: '2px' }}>
            {active + 1} / {images.length}
          </div>

          {/* Nav arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={e => { e.stopPropagation(); prev() }}
                style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(212,160,23,0.3)', color: '#F0C040', width: '44px', height: '44px', cursor: 'pointer', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                ‹
              </button>
              <button
                onClick={e => { e.stopPropagation(); next() }}
                style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(212,160,23,0.3)', color: '#F0C040', width: '44px', height: '44px', cursor: 'pointer', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div style={{ display: 'flex', gap: '4px', padding: '4px', background: '#0A0A0A', overflowX: 'auto' }}>
            {images.map((img, i) => (
              <div
                key={img.id}
                onClick={() => setActive(i)}
                style={{
                  width: '80px', height: '56px', flexShrink: 0, cursor: 'pointer', overflow: 'hidden',
                  border: `1px solid ${i === active ? '#F0C040' : 'transparent'}`,
                  opacity: i === active ? 1 : 0.5,
                  transition: 'all 0.2s',
                }}
              >
                <img src={img.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <button
            onClick={e => { e.stopPropagation(); prev() }}
            style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(212,160,23,0.3)', color: '#F0C040', width: '52px', height: '52px', cursor: 'pointer', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 201 }}
          >
            ‹
          </button>

          <img
            src={images[active].url}
            alt={title}
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' }}
          />

          <button
            onClick={e => { e.stopPropagation(); next() }}
            style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(212,160,23,0.3)', color: '#F0C040', width: '52px', height: '52px', cursor: 'pointer', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 201 }}
          >
            ›
          </button>

          <button
            onClick={() => setLightbox(false)}
            style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(212,160,23,0.2)', color: '#F0C040', width: '40px', height: '40px', cursor: 'pointer', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 201 }}
          >
            ×
          </button>

          <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', fontSize: '11px', color: '#888888', fontFamily: 'Montserrat, sans-serif', letterSpacing: '2px' }}>
            {active + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}