'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function PropertyContact({
  propertyCode,
  propertyTitle,
}: {
  propertyCode: string
  propertyTitle: string
}) {
  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [phone,   setPhone]   = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [sent,    setSent]    = useState(false)
  const [error,   setError]   = useState('')

  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    setError('')

    const { error } = await supabase
      .from('contact_submissions')
      .insert({
        name,
        email,
        phone:        phone || null,
        message,
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

          <div>
            <label style={labelS}>Full Name *</label>
            <input style={inputS} value={name} onChange={e => setName(e.target.value)} required />
          </div>

          <div>
            <label style={labelS}>Email *</label>
            <input style={inputS} type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>

          <div>
            <label style={labelS}>Phone</label>
            <input style={inputS} type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
          </div>

          <div>
            <label style={labelS}>Message</label>
            <textarea
              style={{ ...inputS, minHeight: '100px', resize: 'vertical' }}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder={`I am interested in ${propertyCode}...`}
            />
          </div>

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