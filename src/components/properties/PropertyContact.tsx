'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type TimeSlot = { from: string; to: string }

export default function PropertyContact({
  propertyCode,
  propertyTitle,
}: {
  propertyCode: string
  propertyTitle: string
}) {
  const [name,      setName]      = useState('')
  const [email,     setEmail]     = useState('')
  const [emailError, setEmailError] = useState('')
  const [phone,     setPhone]     = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [message,   setMessage]   = useState(`I am interested in ${propertyCode}`)
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([{ from: '09:00', to: '18:00' }])
  const [sending,   setSending]   = useState(false)
  const [sent,      setSent]      = useState(false)
  const [error,     setError]     = useState('')

  const supabase = createClient()

  function addTimeSlot() {
    setTimeSlots(prev => [...prev, { from: '09:00', to: '18:00' }])
  }

  function removeTimeSlot(index: number) {
    setTimeSlots(prev => prev.filter((_, i) => i !== index))
  }

  function updateSlot(index: number, field: 'from' | 'to', value: string) {
    setTimeSlots(prev => prev.map((slot, i) => i === index ? { ...slot, [field]: value } : slot))
  }

  function buildCallNote() {
    if (timeSlots.length === 0) return ''
    const lines = timeSlots.map(s => `From ${s.from} to ${s.to}`).join(', ')
    return `\n\nBest time to call: ${lines}`
  }

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault()
  
  const digits = phone.replace(/\D/g, '')
  if (digits.length < 10) {
    setPhoneError('Please enter a valid phone number')
    return
  }
  
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!validEmail) {
    setEmailError('Please enter a valid email address')
    return
  }

  setSending(true)
  setError('')
  // ... rest of submit logic unchanged

    const fullMessage = message + buildCallNote()

    const { error } = await supabase
      .from('contact_submissions')
      .insert({
        name,
        email,
        phone,
        message:      fullMessage,
        property_ref: propertyCode,
      })

    if (error) {
      setError('Something went wrong. Please try again.')
      setSending(false)
      return
    }

    setSent(true)
    setSending(false)
  }

  const inputS = {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(212,160,23,0.18)',
    color: '#F5F0E8',
    padding: '12px 16px',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '13px',
    fontWeight: 300,
    outline: 'none',
    width: '100%',
  }

  const labelS = {
    fontSize: '10px',
    letterSpacing: '3px',
    textTransform: 'uppercase' as const,
    color: '#888888',
    marginBottom: '6px',
    display: 'block',
    fontFamily: 'Montserrat, sans-serif',
  }

  const timeInputS = {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(212,160,23,0.18)',
    color: '#F5F0E8',
    padding: '10px 12px',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '13px',
    fontWeight: 300,
    outline: 'none',
    width: '100px',
    colorScheme: 'dark' as const,
  }

  return (
    <div style={{ background: '#111111', border: '1px solid rgba(212,160,23,0.2)', padding: '32px' }}>

      <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', color: '#F0C040', letterSpacing: '2px', marginBottom: '6px', fontWeight: 300 }}>
        Enquire About This Property
      </h3>
      <p style={{ fontSize: '11px', color: '#888888', letterSpacing: '1px', marginBottom: '8px', fontFamily: 'Montserrat, sans-serif' }}>
        {propertyTitle}
      </p>
      <div style={{ width: '30px', height: '1px', background: '#F0C040', marginBottom: '28px' }} />

      {sent ? (
        <div style={{ textAlign: 'center', padding: '32px 0' }}>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '40px', color: '#F0C040', marginBottom: '16px' }}>✓</div>
          <p style={{ fontSize: '13px', color: '#CCCCCC', fontFamily: 'Montserrat, sans-serif', lineHeight: 1.8 }}>
            Thank you for your enquiry.<br />
            We will be in touch shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Name */}
          <div>
            <label style={labelS}>Full Name *</label>
            <input
              style={inputS}
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
<div>
  <label style={labelS}>Email *</label>
  <input
    style={inputS}
    type="email"
    value={email}
    onChange={e => setEmail(e.target.value)}
    onBlur={e => {
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)
      setEmailError(valid ? '' : 'Please enter a valid email address')
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
  <label style={labelS}>Phone *</label>
  <input
    style={inputS}
    type="tel"
    value={phone}
    onChange={e => {
      const cleaned = e.target.value.replace(/[^\d\s\+\-\(\)]/g, '')
      setPhone(cleaned)
    }}
    onBlur={e => {
      const digits = e.target.value.replace(/\D/g, '')
      if (digits.length < 10) {
        setPhoneError('Please enter a valid phone number')
      } else {
        setPhoneError('')
      }
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

          {/* Call hours */}
          <div>
            <label style={labelS}>Best Time to Call *</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {timeSlots.map((slot, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '10px', color: '#888888', fontFamily: 'Montserrat, sans-serif', letterSpacing: '1px', minWidth: '32px' }}>
                    From
                  </span>
                  <input
                    type="time"
                    value={slot.from}
                    onChange={e => updateSlot(i, 'from', e.target.value)}
                    required
                    style={timeInputS}
                  />
                  <span style={{ fontSize: '10px', color: '#888888', fontFamily: 'Montserrat, sans-serif', letterSpacing: '1px' }}>
                    to
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
                      style={{ background: 'transparent', border: '1px solid rgba(220,80,80,0.3)', color: '#E05555', width: '28px', height: '28px', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addTimeSlot}
                style={{ alignSelf: 'flex-start', background: 'transparent', border: '1px solid rgba(212,160,23,0.2)', color: '#F0C040', fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', padding: '8px 16px', cursor: 'pointer' }}
              >
                + Add More
              </button>
            </div>
          </div>

          {/* Message */}
          <div>
            <label style={labelS}>Message</label>
            <textarea
              style={{ ...inputS, minHeight: '100px', resize: 'vertical' }}
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </div>

          {/* Reference */}
          <div style={{ fontSize: '10px', color: '#888888', letterSpacing: '1px', fontFamily: 'Montserrat, sans-serif', padding: '10px 0', borderTop: '1px solid rgba(212,160,23,0.08)' }}>
            Reference: {propertyCode}
          </div>

          {error && (
            <div style={{ fontSize: '12px', color: '#E05555' }}>{error}</div>
          )}

          <button
            type="submit"
            disabled={sending}
            style={{
              padding: '16px',
              background: 'transparent',
              border: '1px solid #F0C040',
              color: sending ? '#888' : '#F0C040',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '11px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              cursor: sending ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
            }}
          >
            {sending ? 'Sending...' : 'Send Enquiry'}
          </button>

        </form>
      )}
    </div>
  )
}