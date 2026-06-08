import type { Metadata } from 'next'
import './globals.css'
import { link } from 'fs/promises'

export const metadata: Metadata = {
  title: {
    default: 'HS Luxury Properties',
    template: '%s | HS Luxury Properties',
  },
  description: 'Connecting discerning clients with the world\'s most exceptional properties. Discretion, expertise, and extraordinary results.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.ico?v=5" />
        <link rel="shortcut icon" href="/icon.ico?v=5" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
