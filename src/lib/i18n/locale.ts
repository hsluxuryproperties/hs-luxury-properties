import { Locale } from './translations'

export function getLocaleFromPath(pathname: string): Locale {
  if (pathname.startsWith('/gr')) return 'gr'
  return 'en'
}

export function switchLocale(currentPath: string, newLocale: Locale): string {
  const stripped = currentPath.replace(/^\/(en|gr)/, '') || '/'
  if (newLocale === 'en') return stripped
  return `/${newLocale}${stripped}`
}