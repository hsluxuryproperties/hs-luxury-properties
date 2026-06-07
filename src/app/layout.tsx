import type { Metadata } from 'next'
import './globals.css'

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
        <link rel="icon" href="/icon.ico?v=4" />
        <link rel="shortcut icon" href="/icon.ico?v=4" />
      </head>
      <body>{children}</body>
    </html>
  )
}