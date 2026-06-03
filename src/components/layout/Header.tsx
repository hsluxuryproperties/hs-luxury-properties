'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home',       href: '/#top'       },
  { label: 'Properties', href: '/properties' },
  { label: 'FAQ',        href: '/faq'        },
  { label: 'Contact Us', href: '/contact'    },
]

export default function Header() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-dark-500/95 backdrop-blur-md border-b border-gold-800/30 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-hs flex items-center justify-between">

        {/* Logo */}
        <Link href="/#top" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10">
            <Image
              src="/logo.png"
              alt="HS Luxury Properties"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="hidden sm:block">
            <p className="text-gold-gradient font-serif text-sm font-semibold leading-tight tracking-widest uppercase">
              HS Luxury
            </p>
            <p className="text-gold-600 text-[10px] tracking-[0.2em] uppercase font-sans">
              Properties
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[11px] tracking-[0.18em] uppercase font-sans font-medium
                         text-gold-200/70 hover:text-gold-300 transition-colors duration-300
                         relative after:absolute after:bottom-[-2px] after:left-0 after:right-0
                         after:h-px after:bg-gold-400 after:scale-x-0 hover:after:scale-x-100
                         after:transition-transform after:duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-gold-400 hover:text-gold-200 transition-colors p-1"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="container-hs flex flex-col gap-4 py-5 border-t border-gold-800/20">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-[11px] tracking-[0.18em] uppercase font-sans
                         text-gold-200/70 hover:text-gold-300 transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}