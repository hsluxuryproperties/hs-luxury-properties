'use client'

import { useState } from 'react'

export default function ImageCarousel({ images, title }: { images: string[]; title: string }) {
  const [current, setCurrent] = useState(0)

  if (images.length === 0) {
    return (
      <div style={{ width: '100%', aspectRatio: '3/4', background: 'linear-gradient(135deg, #161616, #1e1e1e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '48px', fontWeight: 600, color: 'rgba(212,160,23,0.18)' }}>HS</span>
      </div>
    )
  }

  if (images.length === 1) {
    return (
      <div style={{ width: '100%', aspectRatio: '3/4', overflow: 'hidden' }}>
        <img src={images[0]} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    )
  }

  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', overflow: 'hidden' }}>
      <img
        src={images[current]}
        alt={title}
        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s ease' }}
      />

      {/* Prev */}
      <button
        onClick={e => { e.preventDefault(); setCurrent(c => (c - 1 + images.length) % images.length) }}
        style={{
          position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(212,160,23,0.3)',
          color: '#F0C040', width: '32px', height: '32px', cursor: 'pointer',
          fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        ‹
      </button>

      {/* Next */}
      <button
        onClick={e => { e.preventDefault(); setCurrent(c => (c + 1) % images.length) }}
        style={{
          position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(212,160,23,0.3)',
          color: '#F0C040', width: '32px', height: '32px', cursor: 'pointer',
          fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        ›
      </button>

      {/* Dots */}
      <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px' }}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={e => { e.preventDefault(); setCurrent(i) }}
            style={{
              width: i === current ? '20px' : '6px',
              height: '6px',
              background: i === current ? '#F0C040' : 'rgba(255,255,255,0.4)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}