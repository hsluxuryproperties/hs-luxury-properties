import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail } from 'lucide-react'

const navLinks = [
  { label: 'Home',       href: '/#top'       },
  { label: 'Properties', href: '/properties' },
  { label: 'FAQ',        href: '/faq'        },
  { label: 'Contact Us', href: '/contact'    },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-dark-600 border-t border-gold-800/20">

      <div className="h-px bg-gold-gradient-h opacity-60" />

      <div className="container-hs py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* About Us */}
          <div className="md:col-span-1">
            <Link href="/#top" className="flex items-center gap-3 mb-6">
              <Image
  src="/logo.png"
  alt="HS Luxury Properties"
  width={40}
  height={40}
  className="object-contain"
/>
              <span className="text-gold-gradient font-serif font-semibold tracking-widest uppercase text-sm">
                HS Luxury Properties
              </span>
            </Link>

            <p className="text-gold-200/50 text-sm leading-relaxed font-sans font-light max-w-xs">
              Connecting discerning clients with the world&#39;s most exceptional
              properties. Discretion, expertise, and extraordinary results.
            </p>

            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-700 hover:text-gold-400 transition-colors duration-300"
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-700 hover:text-gold-400 transition-colors duration-300"
                aria-label="Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-gold-gradient font-serif text-sm tracking-widest uppercase mb-6">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gold-200/50 hover:text-gold-300 text-sm transition-colors duration-300 font-sans tracking-wide"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gold-gradient font-serif text-sm tracking-widest uppercase mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gold-200/50 text-sm font-sans">
                <MapPin size={15} className="text-gold-600 mt-0.5 shrink-0" />
                <span>Athens, Greece</span>
              </li>
              <li>
                <a
                  href="tel:+302101234567"
                  className="flex items-center gap-3 text-gold-200/50 hover:text-gold-300 text-sm font-sans transition-colors duration-300"
                >
                  <Phone size={15} className="text-gold-600 shrink-0" />
                  <span>+30 210 123 4567</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@hsluxuryproperties.com"
                  className="flex items-center gap-3 text-gold-200/50 hover:text-gold-300 text-sm font-sans transition-colors duration-300"
                >
                  <Mail size={15} className="text-gold-600 shrink-0" />
                  <span>info@hsluxuryproperties.com</span>
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gold-800/10">
        <div className="container-hs py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gold-800 text-xs font-sans tracking-wide">
            &copy; {year} HS Luxury Properties. All rights reserved.
          </p>
          <p className="text-gold-800 text-xs font-sans tracking-wide">
            hsluxuryproperties.com
          </p>
        </div>
      </div>

    </footer>
  )
}
