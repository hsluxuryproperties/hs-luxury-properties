import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'HS Luxury Properties',
    template: '%s | HS Luxury Properties',
  },
  description: 'Connecting discerning clients with the world\'s most exceptional properties. Discretion, expertise, and extraordinary results.',
  keywords: ['luxury real estate', 'luxury properties Greece', 'premium homes', 'investment properties'],
  openGraph: {
    siteName: 'HS Luxury Properties',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  )
}