import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'HS Luxury Properties',
    template: '%s | HS Luxury Properties',
  },
  description: 'Connecting discerning clients with the world\'s most exceptional properties. Discretion, expertise, and extraordinary results.',
  icons: {
    icon: '/favicon.ico',
    apple: '/logo.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico?v=2" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" />
      </head>
      <body>{children}</body>
    </html>
  )
}