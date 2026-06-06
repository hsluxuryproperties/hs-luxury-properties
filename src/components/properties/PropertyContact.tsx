'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'

// ── i18n ──────────────────────────────────────────────────────────────────────
type Locale = 'en' | 'gr'
function useLocale(): Locale {
  const p = usePathname()
  return p.startsWith('/gr') ? 'gr' : 'en'
}
const T = {
  en: {
    title:        'Enquire About This Property',
    name:         'Full Name',
    email:        'Email',
    phone:        'Phone',
    call_time:    'Best Time to Call',
    from:         'From',
    to:           'to',
    add_more:     '+ Add More',
    message:      'Message',
    reference:    'Reference',
    send:         'Send Enquiry',
    sending:      'Sending...',
    success_h:    'Thank you for your enquiry.',
    success_p:    'We will be in touch shortly.',
    err_phone:    'Please enter a valid phone number',
    err_email:    'Please enter a valid email address',
    err_general:  'Something went wrong. Please try again.',
  },
  gr: {
    title:        'Εκδηλώστε Ενδιαφέρον',
    name:         'Ονοματεπώνυμο',
    email:        'Email',
    phone:        'Τηλέφωνο',
    call_time:    'Καλύτερη Ώρα Κλήσης',
    from:         'Από',
    to:           'έως',
    add_more:     '+ Προσθήκη',
    message:      'Μήνυμα',
    reference:    'Κωδικός',
    send:         'Αποστολή',
    sending:      'Αποστολή...',
    success_h:    'Ευχαριστούμε για το ενδιαφέρον σας.',
    success_p:    'Θα επικοινωνήσουμε σύντομα.',
    err_phone:    'Παρακαλώ εισάγετε έγκυρο τηλέφωνο',
    err_email:    'Παρακαλώ εισάγετε έγκυρο email',
    err_general:  'Κάτι πήγε στραβά. Δοκιμάστε ξανά.',
  },
}

// ── Types ─────────────────────────────────────────────────────────────────────
type TimeSlot = { from: string; to: string }

// ── Component ─────────────────────────────────────────────────────────────────
export default function PropertyContact({
  propertyCode,
  propertyTitle,
}: {
  propertyCode: string
  propertyTitle: string
}) {
  const locale = useLocale()
  const t = T[locale]

  const [name,       setName]       = useState('')
  const [email,      setEmail]      = useState('')
  const [emailError, setEmailError] = useState('')
  const [phone,      setPhone]      = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [message,    setMessage]    = useState(
    locale === 'gr'
      ? `Ενδιαφέρομαι για το ακίνητο ${propertyCode}`
      : `I am interested in ${propertyCode}`
  )
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([{ from: '09:00', to: '18:00' }])
  const [sending,   setSending]   = useState(false)
  const [sent,      setSent]      = useState(false)
  const [error,     setError]     = useState('')

  // ── Time slot helpers ──────────────────────────────────────────────────────
  function addTimeSlot() {
    setTimeSlots(prev => [...prev, { from: '09:00', to: '18:00' }])
  }
  function removeTimeSlot(index: number) {
    setTimeSlots(prev => prev.filter((_, i) => i !== index))
  }
  function updateSlot(index: number, field: 'from' | 'to', value: string) {
    setTimeSlots(prev =>
      prev.map((slot, i) => (i === index ? { ...slot, [field]: value } : slot))
    )
  }
  function buildCallNote() {
    if (timeSlots.length === 0) return ''
    const lines = timeSlots.map(s => `${t.from} ${s.from} ${t.to} ${s.to}`).join(', ')
    return locale === 'gr'
      ? `\n\nΚαλύτερη ώρα κλήσης: ${lines}`
      : `\n\nBest time to call: ${lines}`
  }

  // ── Submit — now calls /api/contact instead of Supabase directly ───────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Validate phone
    const digits = phone.replace(/\D/g, '')
    if (digits.length < 10) {
      setPhoneError(t.err_phone)
      return
    }
    // Validate email
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!validEmail) {
      setEmailError(t.err_email)
      return
    }

    setSending(true)
    setError('')

    const fullMessage = message + buildCallNote()

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          message:        fullMessage,
          property_code:  propertyCode,
          property_title: propertyTitle,
          preferred_time: timeSlots
            .map(s => `${s.from}–${s.to}`)
            .join(', '),
        }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        setError(t.err_general)
        setSending(false)
        return
      }

      setSent(true)
    } catch {
      setError(t.err_general)
    } finally {
      setSending(false)
    }
  }

  // ── Styles ─────────────────────────────────────────────────────────────────
  const inputS: React.CSSProperties = {
    background:  'rgba(255,255,255,0.03)',
    border:      '1px solid rgba(212,160,23,0.18)',
    color:       '#F5F0E8',
    padding:     '12px 16px',
    fontFamily:  'Montserrat, sans-serif',
    fontSize:    '13px',
    fontWeight:  300,
    outline:     'none',
    width:       '100%',
    boxSizing:   'border-box',
  }
  const labelS: React.CSSProperties = {
    fontSize:      '10px',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    color:         '#888888',
    marginBottom:  '6px',
    display:       'block',
    fontFamily:    'Montserrat, sans-serif',
  }
  const timeInputS: React.CSSProperties = {
    background:  'rgba(255,255,255,0.03)',
    border:      '1px solid rgba(212,160,23,0.18)',
    color:       '#F5F0E8',
    padding:     '10px 12px',
    fontFamily:  'Montserrat, sans-serif',
    fontSize:    '13px',
    fontWeight:  300,
    outline:     'none',
    width:       '100px',
    colorScheme: 'dark',
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div style={{
      background: '#111111',
      border:     '1px solid rgba(212,160,23,0.2)',
      padding:    '32px',
    }}>
      <h3 style={{
        fontFamily:    'Cormorant Garamond, serif',
        fontSize:      '22px',
        color:         '#F0C040',
        letterSpacing: '2px',
        marginBottom:  '6px',
        fontWeight:    300,
      }}>
        {t.title}
      </h3>
      <p style={{
        fontSize:      '11px',
        color:         '#888888',
        letterSpacing: '1px',
        marginBottom:  '8px',
        fontFamily:    'Montserrat, sans-serif',
      }}>
        {propertyTitle}
      </p>
      <div style={{ width: '30px', height: '1px', background: '#F0C040', marginBottom: '28px' }} />

      {/* ── Success state ── */}
      {sent ? (
        <div style={{ textAlign: 'center', padding: '32px 0' }}>
          <div style={{
            fontFamily:    'Cormorant Garamond, serif',
            fontSize:      '40px',
            color:         '#F0C040',
            marginBottom:  '16px',
          }}>✓</div>
          <p style={{
            fontSize:   '13px',
            color:      '#CCCCCC',
            fontFamily: 'Montserrat, sans-serif',
            lineHeight: 1.8,
          }}>
            {t.success_h}<br />{t.success_p}
          </p>
        </div>
      ) : (

        /* ── Form ── */
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Name */}
          <div>
            <label style={labelS}>{t.name} *</label>
            <input
              style={inputS}
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label style={labelS}>{t.email} *</label>
            <input
              style={inputS}
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onBlur={e => {
                const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)
                setEmailError(valid ? '' : t.err_email)
              }}
              required
              placeholder="your@email.com"
            />
            {emailError && (
              <div style={{ fontSize: '11px', color: '#E05555', marginTop: '4px', fontFamily: 'Montserrat, sans-serif' }}>
                {emailError}
              </div>
            )}
          </div>

          {/* Phone */}
          <div>
            <label style={labelS}>{t.phone} *</label>
            <input
              style={inputS}
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value.replace(/[^\d\s+\-()/]/g, ''))}
              onBlur={e => {
                const digits = e.target.value.replace(/\D/g, '')
                setPhoneError(digits.length < 10 ? t.err_phone : '')
              }}
              required
              placeholder="+30 210 000 0000"
            />
            {phoneError && (
              <div style={{ fontSize: '11px', color: '#E05555', marginTop: '4px', fontFamily: 'Montserrat, sans-serif' }}>
                {phoneError}
              </div>
            )}
          </div>

          {/* Call time slots */}
          <div>
            <label style={labelS}>{t.call_time} *</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {timeSlots.map((slot, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '10px', color: '#888888', fontFamily: 'Montserrat, sans-serif', letterSpacing: '1px', minWidth: '32px' }}>
                    {t.from}
                  </span>
                  <input
                    type="time"
                    value={slot.from}
                    onChange={e => updateSlot(i, 'from', e.target.value)}
                    required
                    style={timeInputS}
                  />
                  <span style={{ fontSize: '10px', color: '#888888', fontFamily: 'Montserrat, sans-serif', letterSpacing: '1px' }}>
                    {t.to}
                  </span>
                  <input
                    type="time"
                    value={slot.to}
                    onChange={e => updateSlot(i, 'to', e.target.value)}
                    required
                    style={timeInputS}
                  />
                  {timeSlots.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTimeSlot(i)}
                      style={{
                        background: 'transparent',
                        border:     '1px solid rgba(220,80,80,0.3)',
                        color:      '#E05555',
                        width:      '28px',
                        height:     '28px',
                        cursor:     'pointer',
                        fontSize:   '16px',
                        display:    'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >×</button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addTimeSlot}
                style={{
                  alignSelf:     'flex-start',
                  background:    'transparent',
                  border:        '1px solid rgba(212,160,23,0.2)',
                  color:         '#F0C040',
                  fontFamily:    'Montserrat, sans-serif',
                  fontSize:      '9px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  padding:       '8px 16px',
                  cursor:        'pointer',
                }}
              >
                {t.add_more}
              </button>
            </div>
          </div>

          {/* Message */}
          <div>
            <label style={labelS}>{t.message}</label>
            <textarea
              style={{ ...inputS, minHeight: '100px', resize: 'vertical' }}
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </div>

          {/* Reference */}
          <div style={{
            fontSize:      '10px',
            color:         '#888888',
            letterSpacing: '1px',
            fontFamily:    'Montserrat, sans-serif',
            padding:       '10px 0',
            borderTop:     '1px solid rgba(212,160,23,0.08)',
          }}>
            {t.reference}: {propertyCode}
          </div>

          {/* Error */}
          {error && (
            <div style={{ fontSize: '12px', color: '#E05555', fontFamily: 'Montserrat, sans-serif' }}>
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={sending}
            style={{
              padding:       '16px',
              background:    'transparent',
              border:        '1px solid #F0C040',
              color:         sending ? '#888' : '#F0C040',
              fontFamily:    'Montserrat, sans-serif',
              fontSize:      '11px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              cursor:        sending ? 'not-allowed' : 'pointer',
              transition:    'all 0.3s',
            }}
          >
            {sending ? t.sending : t.send}
          </button>

        </form>
      )}
    </div>
  )
}
