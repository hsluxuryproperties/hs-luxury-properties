'use client'

import { usePathname, useRouter } from 'next/navigation'
import { switchLocale, getLocaleFromPath } from '@/lib/i18n/locale'
import type { Locale } from '@/lib/i18n/translations'

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const currentLocale = getLocaleFromPath(pathname)

  function handleSwitch(locale: Locale) {
    router.push(switchLocale(pathname, locale))
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      {(['en', 'gr'] as Locale[]).map((locale) => (
        <button
          key={locale}
          onClick={() => handleSwitch(locale)}
          title={locale === 'en' ? 'English' : 'Ελληνικά'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '4px 10px',
            borderRadius: '4px',
            border: currentLocale === locale
              ? '1px solid #F0C040'
              : '1px solid rgba(255,255,255,0.15)',
            background: currentLocale === locale
              ? 'rgba(240,192,64,0.12)'
              : 'transparent',
            color: currentLocale === locale ? '#F0C040' : '#888888',
            fontSize: '11px',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: '600',
            letterSpacing: '0.8px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <span style={{ fontSize: '15px', lineHeight: 1 }}>
            {locale === 'en' ? '🇬🇧' : '🇬🇷'}
          </span>
          <span>{locale === 'en' ? 'EN' : 'ΕΛ'}</span>
        </button>
      ))}
    </div>
  )
}