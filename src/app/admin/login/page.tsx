'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AdminLogin() {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Invalid credentials. Access denied.')
      setLoading(false)
      return
    }

    router.push('/admin/dashboard')
    router.refresh()
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0A0A0A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Montserrat, sans-serif',
      padding: '20px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        border: '1px solid rgba(212,160,23,0.2)',
        padding: '48px 40px',
        background: '#111111',
      }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Image
            src="/logo.png"
            alt="HS Luxury Properties"
            width={64}
            height={64}
            style={{ objectFit: 'contain', marginBottom: '16px' }}
          />
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', color: '#F0C040', letterSpacing: '3px' }}>
            HS Luxury Properties
          </div>
          <div style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: '#888888', marginTop: '4px' }}>
            Admin Access
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#888888' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(212,160,23,0.18)',
                color: '#F5F0E8',
                padding: '14px 18px',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '13px',
                fontWeight: 300,
                outline: 'none',
                width: '100%',
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#888888' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(212,160,23,0.18)',
                color: '#F5F0E8',
                padding: '14px 18px',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '13px',
                fontWeight: 300,
                outline: 'none',
                width: '100%',
              }}
            />
          </div>

          {error && (
            <div style={{ fontSize: '12px', color: '#E05555', letterSpacing: '0.5px', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '8px',
              padding: '16px',
              background: loading ? 'rgba(212,160,23,0.3)' : 'transparent',
              border: '1px solid #F0C040',
              color: '#F0C040',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '11px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
            }}
          >
            {loading ? 'Verifying...' : 'Access Dashboard'}
          </button>

        </form>

      </div>
    </div>
  )
}