'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export type Locale = 'en' | 'gr'

export function getLocale(): Locale {
  if (typeof document === 'undefined') return 'en'
  const match = document.cookie.match(/(?:^|;\s*)hs_locale=([^;]+)/)
  return (match?.[1] as Locale) ?? 'en'
}

export function setLocaleCookie(locale: Locale) {
  document.cookie = `hs_locale=${locale};path=/;max-age=31536000`
}

const NAV: Record<Locale, { label: string; href: string }[]> = {
  en: [
    { label: 'Home',       href: '/'           },
    { label: 'Properties', href: '/properties' },
    { label: 'FAQ',        href: '/faq'        },
    { label: 'Contact Us', href: '/contact'    },
  ],
  gr: [
    { label: 'Αρχική',      href: '/'           },
    { label: 'Ακίνητα',     href: '/properties' },
    { label: 'Ερωτήσεις',   href: '/faq'        },
    { label: 'Επικοινωνία', href: '/contact'    },
  ],
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [locale,     setLocale]     = useState<Locale>('en')
  const [langOpen,   setLangOpen]   = useState(false)
  const langRef       = useRef<HTMLDivElement>(null)
  const langRefMobile = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setLocale(getLocale())
  }, [])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        langRef.current && !langRef.current.contains(e.target as Node) &&
        langRefMobile.current && !langRefMobile.current.contains(e.target as Node)
      ) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleLocale(next: Locale) {
    setLocaleCookie(next)
    setLocale(next)
    setLangOpen(false)
    setMobileOpen(false)
    window.location.reload()
  }

  const navLinks = NAV[locale]

  const linkStyle: React.CSSProperties = {
    fontFamily:     'Montserrat, sans-serif',
    fontSize:       '10px',
    letterSpacing:  '3px',
    textTransform:  'uppercase',
    color:          '#DDDDDD',
    textDecoration: 'none',
    whiteSpace:     'nowrap',
    transition:     'color 0.3s',
  }

  const currentLabel = locale === 'en' ? 'EN' : 'ΕΛ'

  return (
    <>
      <nav style={{
        position:       'fixed',
        top: 0, left: 0, right: 0,
        zIndex:         100,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        padding:        '0 48px',
        height:         '80px',
        background:     'rgba(10,10,10,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom:   '1px solid rgba(212,160,23,0.2)',
      }}>

        {/* Logo */}
        <Link href="/" style={{ display:'flex', alignItems:'center', gap:'10px', textDecoration:'none', flexShrink:0 }}>
          <Image src="/logo.png" alt="HS Luxury Properties" width={40} height={40} style={{ objectFit:'contain' }} priority />
          <span className="hs-logo-text" style={{ fontFamily:'Montserrat, sans-serif', fontSize:'13px', letterSpacing:'3px', textTransform:'uppercase', color:'#D4A017', lineHeight:1 }}>
            Luxury Properties
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hs-desktop-nav" style={{ display:'flex', alignItems:'center', gap:'40px' }}>
          <ul style={{ display:'flex', gap:'40px', listStyle:'none', alignItems:'center', margin:0, padding:0 }}>
            {navLinks.map(link => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  style={linkStyle}
                  onMouseEnter={e => (e.currentTarget.style.color = '#F0C040')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#DDDDDD')}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <LanguageDropdown
            locale={locale}
            open={langOpen}
            onToggle={() => setLangOpen(o => !o)}
            onSwitch={handleLocale}
            dropRef={langRef}
            currentLabel={currentLabel}
          />
        </div>

        {/* Mobile: lang + hamburger */}
        <div className="hs-mobile-nav" style={{ display:'none', alignItems:'center', gap:'8px' }}>
          <LanguageDropdown
            locale={locale}
            open={langOpen}
            onToggle={() => setLangOpen(o => !o)}
            onSwitch={handleLocale}
            dropRef={langRefMobile}
            currentLabel={currentLabel}
          />

          <button
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            style={{ background:'none', border:'none', cursor:'pointer', padding:'6px', display:'flex', flexDirection:'column', gap:'5px', justifyContent:'center', flexShrink:0 }}
          >
            <span style={{ display:'block', width:'22px', height:'2px', background:'#F0C040', transition:'transform 0.3s, opacity 0.3s', transform: mobileOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
            <span style={{ display:'block', width:'22px', height:'2px', background:'#F0C040', transition:'opacity 0.3s', opacity: mobileOpen ? 0 : 1 }} />
            <span style={{ display:'block', width:'22px', height:'2px', background:'#F0C040', transition:'transform 0.3s, opacity 0.3s', transform: mobileOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu — only rendered when open */}
      {mobileOpen && (
        <div
          className="hs-mobile-nav"
          style={{
            display:        'flex',
            flexDirection:  'column',
            position:       'fixed',
            top:            '80px', left:0, right:0,
            zIndex:         99,
            background:     'rgba(10,10,10,0.98)',
            backdropFilter: 'blur(12px)',
            borderBottom:   '1px solid rgba(212,160,23,0.2)',
            padding:        '8px 24px 16px',
          }}
        >
          {navLinks.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                ...linkStyle,
                fontSize:     '11px',
                letterSpacing:'2.5px',
                padding:      '12px 0',
                borderBottom: i < navLinks.length - 1 ? '1px solid rgba(212,160,23,0.1)' : 'none',
                display:      'block',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F0C040')}
              onMouseLeave={e => (e.currentTarget.style.color = '#DDDDDD')}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hs-desktop-nav  { display: none !important; }
          .hs-mobile-nav   { display: flex !important; }
          .hs-logo-text    { display: none !important; }
          nav              { padding: 0 16px !important; }
        }
        @media (min-width: 769px) {
          .hs-mobile-nav { display: none !important; }
        }
      `}</style>
    </>
  )
}

function LanguageDropdown({
  locale, open, onToggle, onSwitch, dropRef, currentLabel,
}: {
  locale:       Locale
  open:         boolean
  onToggle:     () => void
  onSwitch:     (l: Locale) => void
  dropRef:      React.RefObject<HTMLDivElement | null>
  currentLabel: string
}) {
  const options: { locale: Locale; code: string; label: string }[] = [
    { locale: 'en', code: 'gb', label: 'EN' },
    { locale: 'gr', code: 'gr', label: 'GR' },
  ]

  const currentCode = locale === 'en' ? 'gb' : 'gr'

  return (
    <div ref={dropRef} style={{ position: 'relative' }}>
      <button
        onClick={onToggle}
        style={{
          display:       'flex',
          alignItems:    'center',
          gap:           '6px',
          padding:       '5px 10px',
          background:    open ? 'rgba(240,192,64,0.1)' : 'transparent',
          border:        '1px solid rgba(212,160,23,0.35)',
          borderRadius:  '4px',
          color:         '#F0C040',
          cursor:        'pointer',
          fontFamily:    'Montserrat, sans-serif',
          fontSize:      '10px',
          fontWeight:    600,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          transition:    'all 0.2s',
        }}
      >
        <img
          src={`https://flagcdn.com/20x15/${currentCode}.png`}
          width={20}
          height={15}
          alt={locale === 'en' ? 'English' : 'Greek'}
          style={{ display: 'block', borderRadius: '1px' }}
        />
        <span>{currentLabel}</span>
        <span style={{
          display:    'inline-block',
          marginLeft: '2px',
          fontSize:   '8px',
          opacity:    0.7,
          transform:  open ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s',
        }}>▼</span>
      </button>

      {open && (
        <div style={{
          position:     'absolute',
          top:          'calc(100% + 8px)',
          right:        0,
          minWidth:     '110px',
          background:   '#111111',
          border:       '1px solid rgba(212,160,23,0.25)',
          borderRadius: '4px',
          overflow:     'hidden',
          zIndex:       200,
          boxShadow:    '0 8px 24px rgba(0,0,0,0.6)',
        }}>
          {options.map((opt, i) => {
            const active = locale === opt.locale
            return (
              <button
                key={opt.locale}
                onClick={() => onSwitch(opt.locale)}
                style={{
                  display:       'flex',
                  alignItems:    'center',
                  gap:           '10px',
                  width:         '100%',
                  padding:       '11px 16px',
                  background:    active ? 'rgba(240,192,64,0.08)' : 'transparent',
                  border:        'none',
                  borderBottom:  i < options.length - 1 ? '1px solid rgba(212,160,23,0.1)' : 'none',
                  color:         active ? '#F0C040' : '#CCCCCC',
                  cursor:        'pointer',
                  fontFamily:    'Montserrat, sans-serif',
                  fontSize:      '11px',
                  fontWeight:    active ? 600 : 400,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  textAlign:     'left',
                  transition:    'background 0.15s',
                }}
                onMouseEnter={e => {
                  if (!active) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(240,192,64,0.05)'
                }}
                onMouseLeave={e => {
                  if (!active) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                }}
              >
                <img
                  src={`https://flagcdn.com/20x15/${opt.code}.png`}
                  width={20}
                  height={15}
                  alt={opt.label}
                  style={{ display: 'block', borderRadius: '1px' }}
                />
                <span>{opt.label}</span>
                {active && <span style={{ marginLeft: 'auto', color: '#F0C040', fontSize: '10px' }}>✓</span>}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
