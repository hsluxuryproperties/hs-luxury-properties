'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  { label: 'Home',       href: '/#home'      },
  { label: 'Properties', href: '/properties' },
  { label: 'FAQ',        href: '/faq'        },
  { label: 'Contact Us', href: '/contact'    },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 48px',
      height: '80px',
      background: 'rgba(10,10,10,0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(212,160,23,0.2)',
    }}>

      <Link href="/#home" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        textDecoration: 'none',
        flexShrink: 0,
      }}>
        <Image
          src="/logo.png"
          alt="HS Luxury Properties"
          width={48}
          height={48}
          style={{ objectFit: 'contain' }}
          priority
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          <span style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '22px',
            fontWeight: 600,
            color: '#F0C040',
            letterSpacing: '3px',
            lineHeight: 1,
          }}>
            HS Luxury Properties
          </span>
          <span style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '9px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: '#D4A017',
            lineHeight: 1,
          }}>
           Luxury Properties
          </span>
        </div>
      </Link>

      <ul style={{
        display: 'flex',
        gap: '40px',
        listStyle: 'none',
        alignItems: 'center',
        margin: 0,
        padding: 0,
      }}>
        {navLinks.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '10px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: '#DDDDDD',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'color 0.3s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F0C040')}
              onMouseLeave={e => (e.currentTarget.style.color = '#DDDDDD')}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

    </nav>
  )
}