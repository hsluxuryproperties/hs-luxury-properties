'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

// ── i18n ──────────────────────────────────────────────────────────────────────
type Locale = 'en' | 'gr'

function getLocale(pathname: string): Locale {
  return pathname.startsWith('/gr') ? 'gr' : 'en'
}

function switchLocale(pathname: string, next: Locale): string {
  const stripped = pathname.replace(/^\/(en|gr)/, '') || '/'
  return next === 'en' ? stripped : `/${next}${stripped}`
}

const NAV: Record<Locale, { label: string; href: string }[]> = {
  en: [
    { label: 'Home',       href: '/#home'      },
    { label: 'Properties', href: '/properties' },
    { label: 'FAQ',        href: '/faq'        },
    { label: 'Contact Us', href: '/contact'    },
  ],
  gr: [
    { label: 'Αρχική',          href: '/#home'      },
    { label: 'Ακίνητα',         href: '/properties' },
    { label: 'Ερωτήσεις',       href: '/faq'        },
    { label: 'Επικοινωνία',     href: '/contact'    },
  ],
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname  = usePathname()
  const router    = useRouter()
  const locale    = getLocale(pathname)
  const navLinks  = NAV[locale]

  function handleLocale(next: Locale) {
    setMobileOpen(false)
    router.push(switchLocale(pathname, next))
  }

  // ── shared link style helper ────────────────────────────────────────────────
  const linkStyle: React.CSSProperties = {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '10px',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    color: '#DDDDDD',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    transition: 'color 0.3s',
  }

  return (
    <>
      {/* ── Main nav bar ───────────────────────────────────────────────────── */}
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

        {/* Logo */}
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
            }} />
            <span style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '17px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: '#D4A017',
              lineHeight: 1,
            }}>
              Luxury Properties
            </span>
          </div>
        </Link>

        {/* ── Desktop nav (hidden on mobile via inline media — see <style> below) */}
        <div className="hs-desktop-nav" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '40px',
        }}>
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
                  style={linkStyle}
                  onMouseEnter={e => (e.currentTarget.style.color = '#F0C040')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#DDDDDD')}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Language switcher — desktop */}
          <LanguagePills locale={locale} onSwitch={handleLocale} />
        </div>

        {/* ── Mobile right cluster (lang + hamburger) ── */}
        <div className="hs-mobile-nav" style={{
          display: 'none',
          alignItems: 'center',
          gap: '12px',
        }}>
          <LanguagePills locale={locale} onSwitch={handleLocale} compact />

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '6px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              justifyContent: 'center',
            }}
          >
            <span style={{
              display: 'block', width: '24px', height: '2px',
              background: '#F0C040',
              transition: 'transform 0.3s, opacity 0.3s',
              transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
            }} />
            <span style={{
              display: 'block', width: '24px', height: '2px',
              background: '#F0C040',
              transition: 'opacity 0.3s',
              opacity: mobileOpen ? 0 : 1,
            }} />
            <span style={{
              display: 'block', width: '24px', height: '2px',
              background: '#F0C040',
              transition: 'transform 0.3s, opacity 0.3s',
              transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
            }} />
          </button>
        </div>
      </nav>

      {/* ── Mobile dropdown menu ─────────────────────────────────────────────── */}
      <div
        className="hs-mobile-nav"
        style={{
          display: mobileOpen ? 'flex' : 'none',
          flexDirection: 'column',
          position: 'fixed',
          top: '80px',
          left: 0,
          right: 0,
          zIndex: 99,
          background: 'rgba(10,10,10,0.98)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(212,160,23,0.2)',
          padding: '24px 32px 32px',
          gap: '0',
        }}
      >
        {navLinks.map((link, i) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            style={{
              ...linkStyle,
              fontSize: '12px',
              letterSpacing: '2.5px',
              padding: '16px 0',
              borderBottom: i < navLinks.length - 1
                ? '1px solid rgba(212,160,23,0.1)'
                : 'none',
              display: 'block',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#F0C040')}
            onMouseLeave={e => (e.currentTarget.style.color = '#DDDDDD')}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* ── Responsive CSS injected once ────────────────────────────────────── */}
      <style>{`
        @media (max-width: 768px) {
          .hs-desktop-nav { display: none !important; }
          .hs-mobile-nav  { display: flex !important; }
          nav { padding: 0 20px !important; }
        }
        @media (min-width: 769px) {
          .hs-mobile-nav { display: none !important; }
        }
      `}</style>
    </>
  )
}

// ── Language pills sub-component ──────────────────────────────────────────────
function LanguagePills({
  locale,
  onSwitch,
  compact = false,
}: {
  locale: Locale
  onSwitch: (l: Locale) => void
  compact?: boolean
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      {(['en', 'gr'] as Locale[]).map((l) => {
        const active = locale === l
        return (
          <button
            key={l}
            onClick={() => onSwitch(l)}
            title={l === 'en' ? 'English' : 'Ελληνικά'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: compact ? '0' : '5px',
              padding: compact ? '4px 6px' : '4px 10px',
              borderRadius: '4px',
              border: active
                ? '1px solid #F0C040'
                : '1px solid rgba(255,255,255,0.12)',
              background: active
                ? 'rgba(240,192,64,0.12)'
                : 'transparent',
              color: active ? '#F0C040' : '#777',
              fontSize: '10px',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ fontSize: '14px', lineHeight: 1 }}>
              {l === 'en' ? '🇬🇧' : '🇬🇷'}
            </span>
            {!compact && (
              <span style={{ marginLeft: '4px' }}>
                {l === 'en' ? 'EN' : 'ΕΛ'}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
