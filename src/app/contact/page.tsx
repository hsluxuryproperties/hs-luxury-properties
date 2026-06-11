'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// ─────────────────────────────────────────────
// BUSINESS DETAILS — update these when ready
// ─────────────────────────────────────────────
const BUSINESS = {
  phone: '+44 (0) 20 0000 0000',
  email: 'enquiries@hsluxuryproperties.com',
  address: '123 Mayfair Street, London, W1K 0XX',
  addressLine1: '123 Mayfair Street',
  addressLine2: 'London, W1K 0XX',
  // Paste your Google Maps embed src URL here (from maps.google.com → Share → Embed a map → copy the src="..." value)
  mapEmbedSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.0!2d-0.1499!3d51.5074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDMwJzI2LjYiTiAwwrAwOScwMC4wIlc!5e0!3m2!1sen!2suk!4v0000000000000!5m2!1sen!2suk',
}
// ─────────────────────────────────────────────

const gold = '#F0C040'
const darkGold = '#D4A017'
const black = '#0A0A0A'
const dark = '#111111'
const muted = '#888888'
const cream = '#F5F0E8'
const surface = '#161616'

const CALL_SLOTS = [
  '9:00am – 10:00am',
  '10:00am – 11:00am',
  '11:00am – 12:00pm',
  '1:00pm – 2:00pm',
  '2:00pm – 3:00pm',
  '3:00pm – 4:00pm',
  '4:00pm – 5:00pm',
]

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '0.65rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: muted,
  marginBottom: '0.5rem',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#1a1a1a',
  border: '1px solid #2a2a2a',
  color: cream,
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '0.85rem',
  padding: '0.85rem 1rem',
  outline: 'none',
  boxSizing: 'border-box',
}

type Locale = 'en' | 'gr'

function useLocale(): Locale {
  const [locale, setLocale] = useState<Locale>('en')

  useEffect(() => {
    const match = document.cookie.match(/(?:^|;\s*)hs_locale=([^;]+)/)
    setLocale((match?.[1] as Locale) ?? 'en')
  }, [])

  return locale
}

const T = {
  en: {
    eyebrow: 'Get In Touch',
    title: 'Contact Us',
    intro:
      'Whether you are buying, selling, or exploring investment opportunities — our advisers are ready to assist you personally.',
    ourDetails: 'Our Details',
    phone: 'Phone',
    email: 'Email',
    office: 'Office',
    businessHours: 'Business Hours',
    hours: [
      { day: 'Monday – Friday', time: '9:00am – 6:00pm' },
      { day: 'Saturday',        time: '10:00am – 4:00pm' },
      { day: 'Sunday',          time: 'By appointment only' },
    ],
    findUs: 'Find Us',
    sendEnquiry: 'Send an Enquiry',
    enquiryReceived: 'Enquiry Received',
    enquiryReceivedDesc:
      'Thank you for contacting HS Luxury Properties. A member of our team will be in touch with you shortly.',
    fullName: 'Full Name *',
    emailAddress: 'Email Address *',
    phoneNumber: 'Phone Number',
    propertyCode: 'Property Code',
    propertyCodePlaceholder: 'e.g. HS-1001',
    enquiryType: 'Enquiry Type',
    enquiryTypes: ['Buying', 'Selling', 'Investment', 'General Enquiry'],
    preferredCallTime: 'Preferred Call Time',
    selectTimeSlot: 'Select a time slot',
    message: 'Message *',
    sendEnquiryBtn: 'Send Enquiry',
    sending: 'Sending…',
    emailError: 'Please enter a valid email address.',
    phoneError: 'Please enter a valid phone number.',
  },
  gr: {
    eyebrow: 'Επικοινωνήστε Μαζί Μας',
    title: 'Επικοινωνία',
    intro:
      'Είτε αγοράζετε, είτε πουλάτε, είτε διερευνάτε επενδυτικές ευκαιρίες — οι σύμβουλοί μας είναι έτοιμοι να σας εξυπηρετήσουν προσωπικά.',
    ourDetails: 'Τα Στοιχεία μας',
    phone: 'Τηλέφωνο',
    email: 'Email',
    office: 'Γραφείο',
    businessHours: 'Ωράριο Λειτουργίας',
    hours: [
      { day: 'Δευτέρα – Παρασκευή', time: '9:00 – 18:00' },
      { day: 'Σάββατο',             time: '10:00 – 16:00' },
      { day: 'Κυριακή',             time: 'Κατόπιν ραντεβού' },
    ],
    findUs: 'Βρείτε μας',
    sendEnquiry: 'Στείλτε Ερώτημα',
    enquiryReceived: 'Το Ερώτημά σας Ελήφθη',
    enquiryReceivedDesc:
      'Σας ευχαριστούμε που επικοινωνήσατε με την HS Luxury Properties. Ένα μέλος της ομάδας μας θα επικοινωνήσει σύντομα μαζί σας.',
    fullName: 'Ονοματεπώνυμο *',
    emailAddress: 'Διεύθυνση Email *',
    phoneNumber: 'Τηλέφωνο',
    propertyCode: 'Κωδικός Ακινήτου',
    propertyCodePlaceholder: 'π.χ. HS-1001',
    enquiryType: 'Τύπος Ερωτήματος',
    enquiryTypes: ['Αγορά', 'Πώληση', 'Επένδυση', 'Γενικό Ερώτημα'],
    preferredCallTime: 'Προτιμώμενη Ώρα Κλήσης',
    selectTimeSlot: 'Επιλέξτε ώρα',
    message: 'Μήνυμα *',
    sendEnquiryBtn: 'Αποστολή Ερωτήματος',
    sending: 'Αποστολή…',
    emailError: 'Παρακαλώ εισάγετε μια έγκυρη διεύθυνση email.',
    phoneError: 'Παρακαλώ εισάγετε έναν έγκυρο αριθμό τηλεφώνου.',
  },
}

// English enquiry type values are sent to Supabase (DB-safe), regardless of displayed label
const ENQUIRY_TYPE_VALUES = ['Buying', 'Selling', 'Investment', 'General Enquiry']

export default function ContactPage() {
  const locale = useLocale()
  const t = T[locale]

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyCode: '',
    enquiryType: '',
    callSlot: '',
    message: '',
  })
  const [emailError, setEmailError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
  const validatePhone = (v: string) => !v || /^[\d\s+\-()\\.]{7,20}$/.test(v)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    let valid = true
    if (!validateEmail(formData.email)) { setEmailError(t.emailError); valid = false } else setEmailError('')
    if (!validatePhone(formData.phone)) { setPhoneError(t.phoneError); valid = false } else setPhoneError('')
    if (!valid) return

    setSubmitting(true)
    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      await supabase.from('contact_submissions').insert([{
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        message: [
          formData.enquiryType  ? `Enquiry type: ${formData.enquiryType}`   : null,
          formData.propertyCode ? `Property: ${formData.propertyCode.toUpperCase()}` : null,
          formData.callSlot     ? `Preferred call time: ${formData.callSlot}` : null,
          formData.message,
        ].filter(Boolean).join('\n'),
        property_code: formData.propertyCode?.toUpperCase() || null,
      }])
      setSubmitted(true)
    } catch {
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Header />
      <main style={{ background: black, minHeight: '100vh' }}>

        {/* ── Hero ── */}
        <section style={{ background: dark, borderBottom: '1px solid #1e1e1e', padding: '6rem 1.5rem 4rem', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, textTransform: 'uppercase', marginBottom: '1.25rem' }}>
            {t.eyebrow}
          </p>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 400, color: cream, lineHeight: 1.1, marginBottom: '1.5rem' }}>
            {t.title}
          </h1>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.875rem', color: muted, maxWidth: '520px', margin: '0 auto', lineHeight: 1.8 }}>
            {t.intro}
          </p>
        </section>

        {/* ── Two-column body ── */}
        <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '5rem 1.5rem 6rem', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.6fr)', gap: '5rem', alignItems: 'start' }}>

          {/* ── LEFT: Info panel ── */}
          <div>

            {/* Contact details */}
            <div style={{ marginBottom: '3rem' }}>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: gold, marginBottom: '1.5rem' }}>
                {t.ourDetails}
              </p>

              {/* Phone */}
              <div style={{ marginBottom: '1.75rem' }}>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: muted, marginBottom: '0.4rem' }}>{t.phone}</p>
                <a href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`} style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem', color: cream, textDecoration: 'none', letterSpacing: '0.03em' }}>
                  {BUSINESS.phone}
                </a>
              </div>

              {/* Email */}
              <div style={{ marginBottom: '1.75rem' }}>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: muted, marginBottom: '0.4rem' }}>{t.email}</p>
                <a href={`mailto:${BUSINESS.email}`} style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.1rem', color: gold, textDecoration: 'none', wordBreak: 'break-all' }}>
                  {BUSINESS.email}
                </a>
              </div>

              {/* Address */}
              <div style={{ marginBottom: '1.75rem' }}>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: muted, marginBottom: '0.4rem' }}>{t.office}</p>
                <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.1rem', color: cream, lineHeight: 1.6, margin: 0 }}>
                  {BUSINESS.addressLine1}<br />{BUSINESS.addressLine2}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: '#2a2a2a', marginBottom: '2.5rem' }} />

            {/* Business hours */}
            <div style={{ marginBottom: '3rem' }}>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: gold, marginBottom: '1.5rem' }}>
                {t.businessHours}
              </p>
              {t.hours.map((h, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.85rem' }}>
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.78rem', color: muted }}>{h.day}</span>
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.78rem', color: cream }}>{h.time}</span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: '#2a2a2a', marginBottom: '2.5rem' }} />

            {/* Map */}
            <div>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: gold, marginBottom: '1.25rem' }}>
                {t.findUs}
              </p>
              <div style={{ position: 'relative', width: '100%', paddingBottom: '70%', background: surface, border: '1px solid #2a2a2a', overflow: 'hidden' }}>
                <iframe
                  src={BUSINESS.mapEmbedSrc}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none', filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office location"
                />
              </div>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.7rem', color: muted, marginTop: '0.75rem', lineHeight: 1.6 }}>
                {BUSINESS.address}
              </p>
            </div>
          </div>

          {/* ── RIGHT: Form ── */}
          <div>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: gold, marginBottom: '1.5rem' }}>
              {t.sendEnquiry}
            </p>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 2rem', border: '1px solid #2a2a2a', background: surface }}>
                <div style={{ width: '56px', height: '56px', border: `1px solid ${gold}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: gold, fontSize: '1.25rem' }}>✓</div>
                <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.75rem', fontWeight: 400, color: cream, marginBottom: '0.75rem' }}>
                  {t.enquiryReceived}
                </h3>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.85rem', color: muted, lineHeight: 1.8 }}>
                  {t.enquiryReceivedDesc}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                {/* Name + Email */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div>
                    <label style={labelStyle}>{t.fullName}</label>
                    <input type="text" required value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>{t.emailAddress}</label>
                    <input type="email" required value={formData.email}
                      onChange={e => { setFormData({ ...formData, email: e.target.value }); if (emailError) setEmailError('') }}
                      style={{ ...inputStyle, border: `1px solid ${emailError ? '#c0392b' : '#2a2a2a'}` }} />
                    {emailError && <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.72rem', color: '#c0392b', marginTop: '0.35rem' }}>{emailError}</p>}
                  </div>
                </div>

                {/* Phone + Property Code */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div>
                    <label style={labelStyle}>{t.phoneNumber}</label>
                    <input type="tel" value={formData.phone}
                      onChange={e => { setFormData({ ...formData, phone: e.target.value }); if (phoneError) setPhoneError('') }}
                      style={{ ...inputStyle, border: `1px solid ${phoneError ? '#c0392b' : '#2a2a2a'}` }} />
                    {phoneError && <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.72rem', color: '#c0392b', marginTop: '0.35rem' }}>{phoneError}</p>}
                  </div>
                  <div>
                    <label style={labelStyle}>{t.propertyCode}</label>
                    <input type="text" placeholder={t.propertyCodePlaceholder} value={formData.propertyCode}
                      onChange={e => setFormData({ ...formData, propertyCode: e.target.value })}
                      style={inputStyle} />
                  </div>
                </div>

                {/* Enquiry type */}
                <div>
                  <label style={labelStyle}>{t.enquiryType}</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                    {ENQUIRY_TYPE_VALUES.map((value, idx) => (
                      <button key={value} type="button"
                        onClick={() => setFormData({ ...formData, enquiryType: formData.enquiryType === value ? '' : value })}
                        style={{
                          fontFamily: 'Montserrat, sans-serif',
                          fontSize: '0.72rem',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          padding: '0.75rem 1rem',
                          background: formData.enquiryType === value ? gold : '#1a1a1a',
                          color: formData.enquiryType === value ? black : muted,
                          border: `1px solid ${formData.enquiryType === value ? gold : '#2a2a2a'}`,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}>
                        {t.enquiryTypes[idx]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preferred call time */}
                <div>
                  <label style={labelStyle}>{t.preferredCallTime}</label>
                  <select value={formData.callSlot}
                    onChange={e => setFormData({ ...formData, callSlot: e.target.value })}
                    style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}>
                    <option value="">{t.selectTimeSlot}</option>
                    {CALL_SLOTS.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label style={labelStyle}>{t.message}</label>
                  <textarea required rows={5} value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    style={{ ...inputStyle, resize: 'vertical' }} />
                </div>

                {/* Submit */}
                <div style={{ paddingTop: '0.5rem' }}>
                  <button type="submit" disabled={submitting}
                    style={{
                      width: '100%',
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '0.7rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: black,
                      background: submitting ? darkGold : gold,
                      border: 'none',
                      padding: '1.1rem 2rem',
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      transition: 'background 0.2s ease',
                    }}>
                    {submitting ? t.sending : t.sendEnquiryBtn}
                  </button>
                </div>

              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
