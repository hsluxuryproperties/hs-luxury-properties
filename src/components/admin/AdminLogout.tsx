'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function AdminLogout() {
  const router = useRouter()
  const supabase = createClient()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      style={{
        background: 'transparent',
        border: '1px solid rgba(212,160,23,0.2)',
        color: '#888888',
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '10px',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        padding: '8px 16px',
        cursor: 'pointer',
        transition: 'all 0.3s',
      }}
    >
      Sign Out
    </button>
  )
}