'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import type { Property } from '@/types'

type Locale = 'en' | 'gr'

function useLocale(): Locale {
  const [locale, setLocale] = useState<Locale>('en')
  useEffect(() => {
    const match = document.cookie.match(/(?:^|;\s*)hs_locale=([^;]+)/)
    setLocale((match?.[1] as Locale) ?? 'en')
  }, [])
  return locale
}

const t = {
  en: {
    slogan: 'Luxury Properties · Extraordinary Living',
    about: "Connecting discerning clients with the world's most exceptional properties. Discretion, expertise, and extraordinary results.",
    explore: 'Explore Properties',
    viewAll: 'View All Properties',
    featured: 'Featured',
    forInvestors: 'For Investors',
    forHomeowners: 'For Homeowners',
    investment: 'Investment Property',
    residential: 'Residential Property',
    comingSoon: 'Coming Soon',
    forSale: 'For Sale',
    forRent: 'For Rent',
    investmentTag: 'Investment',
    residenceTag: 'Residence',
    viewProperty: 'View Property',
    noDescription: 'Details available upon request.',
  },
  gr: {
    slogan: 'Πολυτελή Ακίνητα · Εξαιρετική Διαβίωση',
    about: 'Συνδέουμε απαιτητικούς πελάτες με τα πιο εξαιρετικά ακίνητα παγκοσμίως. Διακριτικότητα, τεχνογνωσία και εξαιρετικά αποτελέσματα.',
    explore: 'Εξερευνήστε Ακίνητα',
    viewAll: 'Όλα τα Ακίνητα',
    featured: 'Προτεινόμενα',
    forInvestors: 'Για Επενδυτές',
    forHomeowners: 'Για Ιδιοκατοίκηση',
    investment: 'Επενδυτικό Ακίνητο',
    residential: 'Οικιστικό Ακίνητο',
    comingSoon: 'Σύντομα',
    forSale: 'Προς Πώληση',
    forRent: 'Προς Ενοικίαση',
    investmentTag: 'Επένδυση',
    residenceTag: 'Κατοικία',
    viewProperty: 'Δείτε το Ακίνητο',
    noDescription: 'Λεπτομέρειες διαθέσιμες κατόπιν αιτήματος.',
  },
}

function formatPrice(price: number) {
  return '€' + Number(price).toLocaleString('el-GR')
}

function PropertyCard({ property, locale }: { property: Property; locale: Locale }) {
  const tr = t[locale]
  const firstImage = property.images?.[0]?.url
  const statusLabel = property.status === 'for_sale' ? tr.forSale : tr.forRent
  const tag = property.featured_investor
    ? `${tr.investmentTag} · ${statusLabel}`
    : `${tr.residenceTag} · ${statusLabel}`

  return (
    <Link href={`/properties/${property.property_code}`} style={{ textDecoration: 'none' }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid rgba(240,192,64,0.15)',
        background: '#111',
        transition: 'border-color 0.3s ease',
        cursor: 'pointer',
      }}>

        {/* Photo */}
        <div style={{ position: 'relative', width: '100%', height: '260px', overflow: 'hidden', flexShrink: 0 }}>
          {firstImage ? (
            <img
              src={firstImage}
              alt={property.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
            />
          ) : (
            <div className="property-placeholder" style={{ height: '100%' }}>
              <div className="placeholder-icon">HS</div>
            </div>
          )}
          {/* Tag badge on photo */}
          <div style={{
            position: 'absolute', top: '12px', left: '12px',
            background: 'rgba(10,10,10,0.75)', border: '1px solid rgba(240,192,64,0.4)',
            padding: '4px 10px', fontSize: '9px', letterSpacing: '2px',
            textTransform: 'uppercase', color: '#F0C040', fontFamily: 'Montserrat, sans-serif',
          }}>
            {tag}
          </div>
        </div>

        {/* Info panel below photo */}
        <div style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          background: 'linear-gradient(to bottom, #111, #0d0d0d)',
        }}>
          <div style={{
            fontSize: '10px', letterSpacing: '2px', color: 'rgba(240,192,64,0.6)',
            fontFamily: 'Montserrat, sans-serif', textTransform: 'uppercase',
          }}>
            {property.property_code}
          </div>

          <div style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '18px', fontWeight: 400, color: '#F5F0E8', letterSpacing: '1px',
            lineHeight: 1.3,
          }}>
            {property.title}
          </div>

          <div style={{
            fontSize: '11px', letterSpacing: '2px', color: '#888',
            fontFamily: 'Montserrat, sans-serif', textTransform: 'uppercase',
          }}>
            {property.region}
          </div>

          {/* Description */}
          <p style={{
            fontSize: '12px', color: '#999', fontFamily: 'Montserrat, sans-serif',
            fontWeight: 300, lineHeight: 1.7, margin: '8px 0',
            borderTop: '1px solid rgba(240,192,64,0.1)', paddingTop: '12px',
          }}>
            {property.description || tr.noDescription}
          </p>

          {/* Price + CTA row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
            <div style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '20px', color: '#F0C040', fontWeight: 400, letterSpacing: '1px',
            }}>
              {formatPrice(property.price)}
            </div>
            <div style={{
              fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase',
              color: '#F0C040', fontFamily: 'Montserrat, sans-serif',
              borderBottom: '1px solid rgba(240,192,64,0.4)', paddingBottom: '2px',
            }}>
              {tr.viewProperty} →
            </div>
          </div>
        </div>

      </div>
    </Link>
  )
}

function EmptyCard({ label }: { label: string }) {
  return (
    <div className="property-card">
      <div className="property-placeholder">
        <div className="placeholder-icon">HS</div>
      </div>
      <div className="property-overlay">
        <span className="property-tag">{label}</span>
        <div className="property-name" style={{ color: '#888888', fontSize: '14px' }}>Coming Soon</div>
      </div>
    </div>
  )
}

export default function Home() {
  const locale = useLocale()
  const tr = t[locale]

  const [investors, setInvestors] = useState<Property[]>([])
  const [homes, setHomes] = useState<Property[]>([])

  useEffect(() => {
    async function load() {
      const supabase = createClient()

      const { data: inv } = await supabase
        .from('properties')
        .select('*, images:property_images(*)')
        .eq('featured_investor', true)
        .eq('active', true)
        .order('created_at', { ascending: false })
        .limit(3)

      const { data: hom } = await supabase
        .from('properties')
        .select('*, images:property_images(*)')
        .eq('featured_home', true)
        .eq('active', true)
        .order('created_at', { ascending: false })
        .limit(3)

      setInvestors(inv ?? [])
      setHomes(hom ?? [])
    }
    load()
  }, [])

  return (
    <>
      <Header />

      <section
        id="home"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '120px 40px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Art-Deco Background Pattern */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.65,
            background: `
              repeating-linear-gradient(30deg, transparent, transparent 50px, rgba(240,192,64,0.22) 50px, rgba(240,192,64,0.22) 51px),
              repeating-linear-gradient(-30deg, transparent, transparent 50px, rgba(212,160,23,0.18) 50px, rgba(212,160,23,0.18) 51px),
              repeating-linear-gradient(75deg, transparent, transparent 70px, rgba(240,192,64,0.15) 70px, rgba(240,192,64,0.15) 71px),
              repeating-linear-gradient(-75deg, transparent, transparent 70px, rgba(212,160,23,0.15) 70px, rgba(212,160,23,0.15) 71px)
            `,
          }} />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 50%, transparent 10%, rgba(10,10,10,0.4) 40%, #0A0A0A 85%)',
          }} />
        </div>

        {/* Logo */}
        <div className="fade-up" style={{ marginBottom: '32px', position: 'relative' }}>
          <Image
            src="/logo.png"
            alt="HS Luxury Properties Logo"
            width={240}
            height={80}
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>

        {/* Divider */}
        <div className="fade-up delay-1" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, #D4A017)', maxWidth: '80px' }} />
          <div style={{ width: '6px', height: '6px', background: '#F0C040', transform: 'rotate(45deg)' }} />
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, #D4A017)', maxWidth: '80px' }} />
        </div>

        {/* Title */}
        <h1 className="fade-up delay-1" style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 300,
          letterSpacing: '6px',
          textTransform: 'uppercase',
          color: '#F5F0E8',
          marginBottom: '12px',
        }}>HS Luxury Properties</h1>

        {/* Slogan */}
        <p className="fade-up delay-2" style={{
          fontSize: '11px',
          letterSpacing: '5px',
          textTransform: 'uppercase',
          color: '#F0C040',
          marginBottom: '16px',
          fontWeight: 400,
          fontFamily: 'Montserrat, sans-serif',
        }}>{tr.slogan}</p>

        {/* About */}
        <p className="fade-up delay-2" style={{
          fontSize: '13px',
          color: '#888888',
          maxWidth: '520px',
          lineHeight: 1.8,
          marginBottom: '48px',
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 300,
        }}>{tr.about}</p>

        {/* CTA */}
        <Link href="/properties" className="hero-cta fade-up delay-3">
          <span>{tr.explore}</span>
        </Link>

        {/* Featured listings */}
        <div className="fade-up delay-4" style={{ width: '100%', maxWidth: '1200px', marginTop: '100px' }}>

          {/* For Investors */}
          <div style={{ marginBottom: '60px' }}>
            <p style={{ fontSize: '10px', letterSpacing: '5px', textTransform: 'uppercase', color: '#888888', marginBottom: '8px', fontFamily: 'Montserrat, sans-serif' }}>
              {tr.featured}
            </p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 300, color: '#F5F0E8', letterSpacing: '3px', marginBottom: '8px' }}>
              {tr.forInvestors}
            </h2>
            <div style={{ width: '40px', height: '1px', background: '#F0C040', marginBottom: '32px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {investors.length > 0
                ? investors.map(p => <PropertyCard key={p.id} property={p as Property} locale={locale} />)
                : [0,1,2].map(i => <EmptyCard key={i} label={tr.investment} />)
              }
            </div>
          </div>

          {/* For Homeowners */}
          <div>
            <p style={{ fontSize: '10px', letterSpacing: '5px', textTransform: 'uppercase', color: '#888888', marginBottom: '8px', fontFamily: 'Montserrat, sans-serif' }}>
              {tr.featured}
            </p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 300, color: '#F5F0E8', letterSpacing: '3px', marginBottom: '8px' }}>
              {tr.forHomeowners}
            </h2>
            <div style={{ width: '40px', height: '1px', background: '#F0C040', marginBottom: '32px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {homes.length > 0
                ? homes.map(p => <PropertyCard key={p.id} property={p as Property} locale={locale} />)
                : [0,1,2].map(i => <EmptyCard key={i} label={tr.residential} />)
              }
            </div>
          </div>

          {/* View all */}
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <Link href="/properties" className="hero-cta">
              <span>{tr.viewAll}</span>
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </>
  )
}