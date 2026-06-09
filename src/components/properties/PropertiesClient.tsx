'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import type { Property } from '@/types'

// Dynamically import the map to avoid SSR issues with Leaflet
const PropertyMap = dynamic(() => import('./PropertyMap'), { ssr: false, loading: () => (
  <div style={{ width: '100%', height: '100%', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <span style={{ color: '#888', fontFamily: 'Montserrat, sans-serif', fontSize: '11px', letterSpacing: '2px' }}>LOADING MAP...</span>
  </div>
)})

// ── BILINGUAL REGIONS ────────────────────────────────────────────────────────
const REGIONS: { en: string; gr: string }[] = [
  { en: 'Kolonaki - Lycabettus (Athens - Center)', gr: 'Κολωνάκι - Λυκαβηττός (Αθήνα - Κέντρο)' },
  { en: 'Syntagma - Plaka (Athens - Center)', gr: 'Σύνταγμα - Πλάκα (Αθήνα - Κέντρο)' },
  { en: 'Exarchia - Neapoli (Athens - Center)', gr: 'Εξάρχεια - Νεάπολη (Αθήνα - Κέντρο)' },
  { en: 'Monastiraki - Psiri (Athens - Center)', gr: 'Μοναστηράκι - Ψυρρή (Αθήνα - Κέντρο)' },
  { en: 'Koukaki - Makrygianni (Athens - Center)', gr: 'Κουκάκι - Μακρυγιάννη (Αθήνα - Κέντρο)' },
  { en: 'Pagkrati (Athens - Center)', gr: 'Παγκράτι (Αθήνα - Κέντρο)' },
  { en: 'Ampelokipoi - Pedion Areos (Athens - Center)', gr: 'Αμπελόκηποι - Πεδίο Άρεως (Αθήνα - Κέντρο)' },
  { en: 'Zografou (Athens - Center)', gr: 'Ζωγράφου (Αθήνα - Κέντρο)' },
  { en: 'Ilisia (Athens - Center)', gr: 'Ιλίσια (Αθήνα - Κέντρο)' },
  { en: 'Gazi - Kerameikos (Athens - Center)', gr: 'Γκάζι - Κεραμεικός (Αθήνα - Κέντρο)' },
  { en: 'Kifisia (Athens - North Suburbs)', gr: 'Κηφισιά (Αθήνα - Βόρεια Προάστια)' },
  { en: 'Ekali (Athens - North Suburbs)', gr: 'Εκάλη (Αθήνα - Βόρεια Προάστια)' },
  { en: 'Nea Erythraia (Athens - North Suburbs)', gr: 'Νέα Ερυθραία (Αθήνα - Βόρεια Προάστια)' },
  { en: 'Marousi (Athens - North Suburbs)', gr: 'Μαρούσι (Αθήνα - Βόρεια Προάστια)' },
  { en: 'Halandri (Athens - North Suburbs)', gr: 'Χαλάνδρι (Αθήνα - Βόρεια Προάστια)' },
  { en: 'Filothei - Psychiko (Athens - North Suburbs)', gr: 'Φιλοθέη - Ψυχικό (Αθήνα - Βόρεια Προάστια)' },
  { en: 'Nea Penteli (Athens - North Suburbs)', gr: 'Νέα Πεντέλη (Αθήνα - Βόρεια Προάστια)' },
  { en: 'Agia Paraskevi (Athens - North Suburbs)', gr: 'Αγία Παρασκευή (Αθήνα - Βόρεια Προάστια)' },
  { en: 'Vrilissia (Athens - North Suburbs)', gr: 'Βριλήσσια (Αθήνα - Βόρεια Προάστια)' },
  { en: 'Metamorfosi (Athens - North Suburbs)', gr: 'Μεταμόρφωση (Αθήνα - Βόρεια Προάστια)' },
  { en: 'Glyfada (Athens - South Suburbs)', gr: 'Γλυφάδα (Αθήνα - Νότια Προάστια)' },
  { en: 'Vouliagmeni (Athens - South Suburbs)', gr: 'Βουλιαγμένη (Αθήνα - Νότια Προάστια)' },
  { en: 'Vari (Athens - South Suburbs)', gr: 'Βάρη (Αθήνα - Νότια Προάστια)' },
  { en: 'Voula (Athens - South Suburbs)', gr: 'Βούλα (Αθήνα - Νότια Προάστια)' },
  { en: 'Alimos (Athens - South Suburbs)', gr: 'Άλιμος (Αθήνα - Νότια Προάστια)' },
  { en: 'Nea Smyrni (Athens - South Suburbs)', gr: 'Νέα Σμύρνη (Αθήνα - Νότια Προάστια)' },
  { en: 'Kallithea (Athens - South Suburbs)', gr: 'Καλλιθέα (Αθήνα - Νότια Προάστια)' },
  { en: 'Moschato - Tavros (Athens - South Suburbs)', gr: 'Μοσχάτο - Ταύρος (Αθήνα - Νότια Προάστια)' },
  { en: 'Palaio Faliro (Athens - South Suburbs)', gr: 'Παλαιό Φάληρο (Αθήνα - Νότια Προάστια)' },
  { en: 'Agios Dimitrios (Athens - South Suburbs)', gr: 'Άγιος Δημήτριος (Αθήνα - Νότια Προάστια)' },
  { en: 'Rafina (Athens - East)', gr: 'Ραφήνα (Αθήνα - Ανατολικά)' },
  { en: 'Marathonas (Athens - East)', gr: 'Μαραθώνας (Αθήνα - Ανατολικά)' },
  { en: 'Nea Makri (Athens - East)', gr: 'Νέα Μάκρη (Αθήνα - Ανατολικά)' },
  { en: 'Spata (Athens - East)', gr: 'Σπάτα (Αθήνα - Ανατολικά)' },
  { en: 'Pallini (Athens - East)', gr: 'Παλλήνη (Αθήνα - Ανατολικά)' },
  { en: 'Gerakas (Athens - East)', gr: 'Γέρακας (Αθήνα - Ανατολικά)' },
  { en: 'Piraeus (Athens - Piraeus)', gr: 'Πειραιάς (Αθήνα - Πειραιάς)' },
  { en: 'Kastella - Freattyda (Piraeus)', gr: 'Καστέλλα - Φρεαττύδα (Πειραιάς)' },
  { en: 'Perama (Piraeus)', gr: 'Πέραμα (Πειραιάς)' },
  { en: 'Keratsini - Drapetsona (Piraeus)', gr: 'Κερατσίνι - Δραπετσώνα (Πειραιάς)' },
  { en: 'Nikaia - Agios Ioannis Rentis (Piraeus)', gr: 'Νίκαια - Άγιος Ιωάννης Ρέντης (Πειραιάς)' },
  { en: 'Peristeri (Athens - West)', gr: 'Περιστέρι (Αθήνα - Δυτικά)' },
  { en: 'Aigaleo (Athens - West)', gr: 'Αιγάλεω (Αθήνα - Δυτικά)' },
  { en: 'Ilion (Athens - West)', gr: 'Ίλιον (Αθήνα - Δυτικά)' },
  { en: 'Agia Varvara (Athens - West)', gr: 'Αγία Βαρβάρα (Αθήνα - Δυτικά)' },
  { en: 'Thessaloniki Center', gr: 'Θεσσαλονίκη Κέντρο' },
  { en: 'Kalamaria (Thessaloniki)', gr: 'Καλαμαριά (Θεσσαλονίκη)' },
  { en: 'Panorama (Thessaloniki)', gr: 'Πανόραμα (Θεσσαλονίκη)' },
  { en: 'Pylaia - Chortiatis (Thessaloniki)', gr: 'Πυλαία - Χορτιάτης (Θεσσαλονίκη)' },
  { en: 'Thermi (Thessaloniki)', gr: 'Θέρμη (Θεσσαλονίκη)' },
  { en: 'Neapoli - Sykies (Thessaloniki)', gr: 'Νεάπολη - Συκιές (Θεσσαλονίκη)' },
  { en: 'Ampelokipoi - Menemeni (Thessaloniki)', gr: 'Αμπελόκηποι - Μενεμένη (Θεσσαλονίκη)' },
  { en: 'Pavlos Melas (Thessaloniki)', gr: 'Παύλος Μελάς (Θεσσαλονίκη)' },
  { en: 'Kordelio - Evosmos (Thessaloniki)', gr: 'Κορδελιό - Εύοσμος (Θεσσαλονίκη)' },
  { en: 'Lagkadas (Thessaloniki)', gr: 'Λαγκαδάς (Θεσσαλονίκη)' },
  { en: 'Mykonos Town (Mykonos)', gr: 'Χώρα (Μύκονος)' },
  { en: 'Ornos (Mykonos)', gr: 'Ορνός (Μύκονος)' },
  { en: 'Psarou (Mykonos)', gr: 'Ψαρού (Μύκονος)' },
  { en: 'Kalafatis (Mykonos)', gr: 'Καλαφάτης (Μύκονος)' },
  { en: 'Fira (Santorini)', gr: 'Φηρά (Σαντορίνη)' },
  { en: 'Oia (Santorini)', gr: 'Οία (Σαντορίνη)' },
  { en: 'Imerovigli (Santorini)', gr: 'Ημεροβίγλι (Σαντορίνη)' },
  { en: 'Akrotiri (Santorini)', gr: 'Ακρωτήρι (Σαντορίνη)' },
  { en: 'Corfu Town (Corfu)', gr: 'Κέρκυρα Πόλη (Κέρκυρα)' },
  { en: 'Paleokastritsa (Corfu)', gr: 'Παλαιοκαστρίτσα (Κέρκυρα)' },
  { en: 'Dassia (Corfu)', gr: 'Δάσσια (Κέρκυρα)' },
  { en: 'Heraklion (Crete)', gr: 'Ηράκλειο (Κρήτη)' },
  { en: 'Chania (Crete)', gr: 'Χανιά (Κρήτη)' },
  { en: 'Rethymno (Crete)', gr: 'Ρέθυμνο (Κρήτη)' },
  { en: 'Agios Nikolaos (Crete)', gr: 'Άγιος Νικόλαος (Κρήτη)' },
  { en: 'Elounda (Crete)', gr: 'Ελούντα (Κρήτη)' },
  { en: 'Ierapetra (Crete)', gr: 'Ιεράπετρα (Κρήτη)' },
  { en: 'Rhodes Town (Rhodes)', gr: 'Ρόδος Πόλη (Ρόδος)' },
  { en: 'Lindos (Rhodes)', gr: 'Λίνδος (Ρόδος)' },
  { en: 'Ialyssos (Rhodes)', gr: 'Ιαλυσός (Ρόδος)' },
  { en: 'Kos Town (Kos)', gr: 'Κως Πόλη (Κως)' },
  { en: 'Kefalos (Kos)', gr: 'Κέφαλος (Κως)' },
  { en: 'Zakynthos Town (Zakynthos)', gr: 'Ζάκυνθος Πόλη (Ζάκυνθος)' },
  { en: 'Laganas (Zakynthos)', gr: 'Λαγανάς (Ζάκυνθος)' },
  { en: 'Argostoli (Kefalonia)', gr: 'Αργοστόλι (Κεφαλονιά)' },
  { en: 'Fiskardo (Kefalonia)', gr: 'Φισκάρδο (Κεφαλονιά)' },
  { en: 'Skiathos Town (Skiathos)', gr: 'Σκιάθος Πόλη (Σκιάθος)' },
  { en: 'Skopelos Town (Skopelos)', gr: 'Σκόπελος Πόλη (Σκόπελος)' },
  { en: 'Hydra Town (Hydra)', gr: 'Ύδρα Πόλη (Ύδρα)' },
  { en: 'Spetses Town (Spetses)', gr: 'Σπέτσες Πόλη (Σπέτσες)' },
  { en: 'Paros Town (Paros)', gr: 'Παροικιά (Πάρος)' },
  { en: 'Naoussa (Paros)', gr: 'Νάουσα (Πάρος)' },
  { en: 'Naxos Town (Naxos)', gr: 'Νάξος Πόλη (Νάξος)' },
  { en: 'Ios Town (Ios)', gr: 'Ίος Πόλη (Ίος)' },
  { en: 'Milos Town (Milos)', gr: 'Μήλος Πόλη (Μήλος)' },
  { en: 'Syros Town (Syros)', gr: 'Ερμούπολη (Σύρος)' },
  { en: 'Tinos Town (Tinos)', gr: 'Τήνος Πόλη (Τήνος)' },
  { en: 'Lesvos - Mytilini', gr: 'Λέσβος - Μυτιλήνη' },
  { en: 'Chios Town (Chios)', gr: 'Χίος Πόλη (Χίος)' },
  { en: 'Samos Town (Samos)', gr: 'Σάμος Πόλη (Σάμος)' },
  { en: 'Leros (Dodecanese)', gr: 'Λέρος (Δωδεκάνησα)' },
  { en: 'Patmos (Dodecanese)', gr: 'Πάτμος (Δωδεκάνησα)' },
  { en: 'Nafplio (Peloponnese)', gr: 'Ναύπλιο (Πελοπόννησος)' },
  { en: 'Kalamata (Peloponnese)', gr: 'Καλαμάτα (Πελοπόννησος)' },
  { en: 'Sparta (Peloponnese)', gr: 'Σπάρτη (Πελοπόννησος)' },
  { en: 'Pylos (Peloponnese)', gr: 'Πύλος (Πελοπόννησος)' },
  { en: 'Porto Heli (Peloponnese)', gr: 'Πόρτο Χέλι (Πελοπόννησος)' },
  { en: 'Ermioni (Peloponnese)', gr: 'Ερμιόνη (Πελοπόννησος)' },
  { en: 'Corinth (Peloponnese)', gr: 'Κόρινθος (Πελοπόννησος)' },
  { en: 'Patras (Peloponnese)', gr: 'Πάτρα (Πελοπόννησος)' },
  { en: 'Loutraki (Peloponnese)', gr: 'Λουτράκι (Πελοπόννησος)' },
  { en: 'Volos (Thessaly)', gr: 'Βόλος (Θεσσαλία)' },
  { en: 'Larissa (Thessaly)', gr: 'Λάρισα (Θεσσαλία)' },
  { en: 'Trikala (Thessaly)', gr: 'Τρίκαλα (Θεσσαλία)' },
  { en: 'Karditsa (Thessaly)', gr: 'Καρδίτσα (Θεσσαλία)' },
  { en: 'Lamia (Central Greece)', gr: 'Λαμία (Στερεά Ελλάδα)' },
  { en: 'Livadeia (Central Greece)', gr: 'Λιβαδειά (Στερεά Ελλάδα)' },
  { en: 'Chalkida (Central Greece)', gr: 'Χαλκίδα (Στερεά Ελλάδα)' },
  { en: 'Ioannina (Epirus)', gr: 'Ιωάννινα (Ήπειρος)' },
  { en: 'Preveza (Epirus)', gr: 'Πρέβεζα (Ήπειρος)' },
  { en: 'Arta (Epirus)', gr: 'Άρτα (Ήπειρος)' },
  { en: 'Igoumenitsa (Epirus)', gr: 'Ηγουμενίτσα (Ήπειρος)' },
  { en: 'Kavala (Macedonia)', gr: 'Καβάλα (Μακεδονία)' },
  { en: 'Drama (Macedonia)', gr: 'Δράμα (Μακεδονία)' },
  { en: 'Serres (Macedonia)', gr: 'Σέρρες (Μακεδονία)' },
  { en: 'Kozani (Macedonia)', gr: 'Κοζάνη (Μακεδονία)' },
  { en: 'Kastoria (Macedonia)', gr: 'Καστοριά (Μακεδονία)' },
  { en: 'Florina (Macedonia)', gr: 'Φλώρινα (Μακεδονία)' },
  { en: 'Veria (Macedonia)', gr: 'Βέροια (Μακεδονία)' },
  { en: 'Edessa (Macedonia)', gr: 'Έδεσσα (Μακεδονία)' },
  { en: 'Halkidiki - Kassandra', gr: 'Χαλκιδική - Κασσάνδρα' },
  { en: 'Halkidiki - Sithonia', gr: 'Χαλκιδική - Σιθωνία' },
  { en: 'Halkidiki - Athos', gr: 'Χαλκιδική - Άθως' },
  { en: 'Alexandroupoli (Thrace)', gr: 'Αλεξανδρούπολη (Θράκη)' },
  { en: 'Komotini (Thrace)', gr: 'Κομοτηνή (Θράκη)' },
  { en: 'Xanthi (Thrace)', gr: 'Ξάνθη (Θράκη)' },
]

// ── REGION AUTOCOMPLETE ───────────────────────────────────────────────────────
function RegionAutocomplete({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [query, setQuery] = useState(value)
  const [open,  setOpen]  = useState(false)
  const ref               = useRef<HTMLDivElement>(null)

  const suggestions = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return REGIONS.filter(r =>
      r.en.toLowerCase().includes(q) || r.gr.toLowerCase().includes(q)
    ).slice(0, 8)
  }, [query])

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  function select(r: { en: string; gr: string }) {
    setQuery(r.en)
    onChange(r.en)
    setOpen(false)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value)
    onChange(e.target.value)
    setOpen(true)
  }

  function handleClear() {
    setQuery('')
    onChange('')
    setOpen(false)
  }

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%' }}>
      <div style={{ position: 'relative' }}>
        <input
          style={filterInputS}
          placeholder="Region / Περιοχή"
          value={query}
          onChange={handleChange}
          onFocus={() => query && setOpen(true)}
          autoComplete="off"
        />
        {query && (
          <button onClick={handleClear} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '14px', padding: 0, lineHeight: 1 }}>×</button>
        )}
      </div>
      {open && suggestions.length > 0 && (
        <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, background: '#1a1a1a', border: '1px solid rgba(212,160,23,0.25)', zIndex: 500, maxHeight: '280px', overflowY: 'auto' }}>
          {suggestions.map((r, i) => (
            <button key={i} onClick={() => select(r)}
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 14px', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(212,160,23,0.08)', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(212,160,23,0.08)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <div style={{ fontSize: '11px', color: '#F5F0E8', marginBottom: '2px' }}>{r.en}</div>
              <div style={{ fontSize: '10px', color: '#888' }}>{r.gr}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── SHARED STYLES ─────────────────────────────────────────────────────────────
const filterInputS: React.CSSProperties = {
  background: '#1a1a1a',
  border: '1px solid rgba(212,160,23,0.18)',
  color: '#F5F0E8',
  padding: '10px 14px',
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '12px',
  fontWeight: 300,
  outline: 'none',
  width: '100%',
  colorScheme: 'dark',
  boxSizing: 'border-box',
}

const filterLabelS: React.CSSProperties = {
  fontSize: '9px',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  color: '#888888',
  marginBottom: '5px',
  display: 'block',
  whiteSpace: 'nowrap',
}

// ── PROPERTY CARD ─────────────────────────────────────────────────────────────
function PropertyCard({ property, highlighted, onHover }: { property: Property; highlighted: boolean; onHover: (id: string | null) => void }) {
  const [imgIndex, setImgIndex] = useState(0)
  const images = (property.images ?? []) as any[]
  const hasImages = images.length > 0

  function prev(e: React.MouseEvent) { e.preventDefault(); e.stopPropagation(); setImgIndex(i => (i - 1 + images.length) % images.length) }
  function next(e: React.MouseEvent) { e.preventDefault(); e.stopPropagation(); setImgIndex(i => (i + 1) % images.length) }

  return (
    <div
      onMouseEnter={() => onHover(String(property.id))}
      onMouseLeave={() => onHover(null)}
      style={{ outline: highlighted ? '1px solid rgba(212,160,23,0.6)' : 'none', transition: 'outline 0.2s' }}
    >
      <div className="property-card" style={{ aspectRatio: 'unset' }}>
        {hasImages ? (
          <div style={{ position: 'relative', aspectRatio: '4/3' }}>
            <img src={images[imgIndex].url ?? images[imgIndex]} alt={property.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            {images.length > 1 && (
              <>
                <button onClick={prev} style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(212,160,23,0.3)', color: '#F0C040', width: '28px', height: '28px', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>‹</button>
                <button onClick={next} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(212,160,23,0.3)', color: '#F0C040', width: '28px', height: '28px', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>›</button>
                <div style={{ position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '4px' }}>
                  {images.map((_, i) => <div key={i} style={{ width: '4px', height: '4px', borderRadius: '50%', background: i === imgIndex ? '#F0C040' : 'rgba(255,255,255,0.3)' }} />)}
                </div>
              </>
            )}
          </div>
        ) : (
          <div style={{ aspectRatio: '4/3', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', color: 'rgba(212,160,23,0.2)' }}>HS</span>
          </div>
        )}

        <Link href={`/properties/${property.property_code ?? property.id}`} style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{ padding: '16px 20px', background: '#111111', border: '1px solid rgba(212,160,23,0.1)', borderTop: 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '9px', letterSpacing: '3px', color: '#F0C040', fontFamily: 'Montserrat, sans-serif', textTransform: 'uppercase' }}>{property.property_code}</span>
              <span style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', padding: '3px 8px', border: `1px solid ${property.status === 'for_sale' ? 'rgba(212,160,23,0.4)' : 'rgba(100,180,100,0.4)'}`, color: property.status === 'for_sale' ? '#F0C040' : '#80C080', fontFamily: 'Montserrat, sans-serif' }}>
                {property.status === 'for_sale' ? 'For Sale' : 'For Rent'}
              </span>
            </div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', fontWeight: 400, color: '#F5F0E8', marginBottom: '4px', lineHeight: 1.3 }}>{property.title}</div>
            <div style={{ fontSize: '14px', color: '#F0C040', marginBottom: '10px', fontFamily: 'Montserrat, sans-serif' }}>€{Number(property.price).toLocaleString()}</div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: (property as any).description ? '10px' : '0' }}>
              {property.region    && <span style={{ fontSize: '11px', color: '#888', fontFamily: 'Montserrat, sans-serif' }}>📍 {property.region}</span>}
              {property.sqm       && <span style={{ fontSize: '11px', color: '#888', fontFamily: 'Montserrat, sans-serif' }}>{property.sqm} m²</span>}
              {(property.bedrooms  ?? 0) > 0 && <span style={{ fontSize: '11px', color: '#888', fontFamily: 'Montserrat, sans-serif' }}>{property.bedrooms} bed</span>}
              {(property.bathrooms ?? 0) > 0 && <span style={{ fontSize: '11px', color: '#888', fontFamily: 'Montserrat, sans-serif' }}>{property.bathrooms} bath</span>}
              {property.floor != null && <span style={{ fontSize: '11px', color: '#888', fontFamily: 'Montserrat, sans-serif' }}>Floor {property.floor}</span>}
            </div>
            {(property as any).description && (
              <p style={{ fontSize: '11px', color: '#666', fontFamily: 'Montserrat, sans-serif', fontWeight: 300, lineHeight: 1.7, margin: 0, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', borderTop: '1px solid rgba(212,160,23,0.08)', paddingTop: '10px' }}>
                {(property as any).description}
              </p>
            )}
          </div>
        </Link>
      </div>
    </div>
  )
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function PropertiesClient({ properties }: { properties: Property[] }) {
  const [search,       setSearch]       = useState('')
  const [region,       setRegion]       = useState('')
  const [status,       setStatus]       = useState('')
  const [priceMin,     setPriceMin]     = useState('')
  const [priceMax,     setPriceMax]     = useState('')
  const [sqmMin,       setSqmMin]       = useState('')
  const [sqmMax,       setSqmMax]       = useState('')
  const [showMore,     setShowMore]     = useState(false)
  const [bedroomsMin,  setBedroomsMin]  = useState('')
  const [bedroomsMax,  setBedroomsMax]  = useState('')
  const [bathroomsMin, setBathroomsMin] = useState('')
  const [bathroomsMax, setBathroomsMax] = useState('')
  const [floorMin,     setFloorMin]     = useState('')
  const [floorMax,     setFloorMax]     = useState('')
  const [yearMin,      setYearMin]      = useState('')
  const [yearMax,      setYearMax]      = useState('')
  const [heating,      setHeating]      = useState('')
  const [view,         setView]         = useState('')
  const [frames,       setFrames]       = useState('')
  const [parking,      setParking]      = useState('')
  const [transport,    setTransport]    = useState('')
  const [checkboxes,   setCheckboxes]   = useState<Record<string, boolean>>({})
  const [hoveredId,    setHoveredId]    = useState<string | null>(null)

  const CHECKBOXES = [
    { key: 'elevator',           label: 'Elevator'            },
    { key: 'warehouse',          label: 'Warehouse'           },
    { key: 'garden',             label: 'Garden'              },
    { key: 'fireplace',          label: 'Fireplace'           },
    { key: 'pool',               label: 'Pool'                },
    { key: 'ac',                 label: 'A/C'                 },
    { key: 'armored_door',       label: 'Armored Door'        },
    { key: 'closet',             label: 'Closet'              },
    { key: 'awnings',            label: 'Awnings'             },
    { key: 'solar_water_heater', label: 'Solar Water Heater'  },
    { key: 'painted',            label: 'Painted'             },
    { key: 'penthouse',          label: 'Penthouse'           },
    { key: 'bright',             label: 'Bright'              },
    { key: 'furnished',          label: 'Furnished'           },
    { key: 'beachfront',         label: 'Beachfront'          },
    { key: 'luxury',             label: 'Luxury Property'     },
    { key: 'investment',         label: 'Investment Property' },
    { key: 'newly_built',        label: 'Newly Built'         },
    { key: 'student_friendly',   label: 'Student Friendly'    },
    { key: 'from_auction',       label: 'From Auction'        },
    { key: 'golden_visa',        label: 'Golden Visa'         },
  ]

  const filtered = useMemo(() => {
    return properties.filter(p => {
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !(p.property_code ?? '').toLowerCase().includes(search.toLowerCase())) return false
      if (region && !(p.region ?? '').toLowerCase().includes(region.toLowerCase())) return false
      if (status && p.status !== status) return false
      if (priceMin && p.price < Number(priceMin)) return false
      if (priceMax && p.price > Number(priceMax)) return false
      if (sqmMin && (p.sqm ?? 0) < Number(sqmMin)) return false
      if (sqmMax && (p.sqm ?? 999999) > Number(sqmMax)) return false
      if (bedroomsMin && (p.bedrooms ?? 0) < Number(bedroomsMin)) return false
      if (bedroomsMax && (p.bedrooms ?? 99) > Number(bedroomsMax)) return false
      if (bathroomsMin && (p.bathrooms ?? 0) < Number(bathroomsMin)) return false
      if (bathroomsMax && (p.bathrooms ?? 99) > Number(bathroomsMax)) return false
      if (floorMin && (p.floor ?? 0) < Number(floorMin)) return false
      if (floorMax && (p.floor ?? 99) > Number(floorMax)) return false
      if (yearMin && ((p as any).year_built ?? 0) < Number(yearMin)) return false
      if (yearMax && ((p as any).year_built ?? 9999) > Number(yearMax)) return false
      if (heating && (p as any).heating_type !== heating) return false
      if (view && (p as any).view_type !== view) return false
      if (frames && (p as any).frame_type !== frames) return false
      if (parking && (p as any).parking_type !== parking) return false
      if (transport && (p as any).transport_type !== transport) return false
      for (const key of Object.keys(checkboxes)) {
        if (checkboxes[key] && !p[key as keyof Property]) return false
      }
      return true
    })
  }, [properties, search, region, status, priceMin, priceMax, sqmMin, sqmMax,
      bedroomsMin, bedroomsMax, bathroomsMin, bathroomsMax, floorMin, floorMax,
      yearMin, yearMax, heating, view, frames, parking, transport, checkboxes])

  function clearAll() {
    setSearch(''); setRegion(''); setStatus(''); setPriceMin(''); setPriceMax('')
    setSqmMin(''); setSqmMax(''); setBedroomsMin(''); setBedroomsMax('')
    setBathroomsMin(''); setBathroomsMax(''); setFloorMin(''); setFloorMax('')
    setYearMin(''); setYearMax(''); setHeating(''); setView(''); setFrames('')
    setParking(''); setTransport(''); setCheckboxes({})
  }

  const selectS: React.CSSProperties = {
    ...filterInputS,
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23F0C040'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    paddingRight: '32px',
    cursor: 'pointer',
  }

  return (
    <>
      <style>{`
        .hs-props-wrap { padding: 104px 40px 40px; }
        .hs-filter-bar {
          background: #0A0A0A;
          border: 1px solid rgba(212,160,23,0.15);
          border-top: 2px solid rgba(212,160,23,0.5);
          padding: 20px 24px;
          margin-bottom: 32px;
        }
        .hs-filter-row {
          display: flex;
          gap: 12px;
          align-items: flex-end;
          flex-wrap: nowrap;
        }
        .hs-filter-field { flex: 1; min-width: 0; }
        .hs-filter-field-wide { flex: 1.4; min-width: 0; }
        .hs-filter-pair { display: flex; gap: 6px; flex: 1.5; min-width: 0; }
        .hs-filter-pair > div { flex: 1; min-width: 0; }
        .hs-more-panel { margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(212,160,23,0.08); }
        .hs-more-grid-6 { display: grid; grid-template-columns: repeat(6,1fr); gap: 12px; margin-bottom: 16px; }
        .hs-more-grid-2 { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; margin-bottom: 16px; }
        .hs-checkboxes-grid { display: grid; grid-template-columns: repeat(5,1fr); gap: 10px; margin-bottom: 16px; }
        .hs-content-row { display: flex; gap: 24px; align-items: flex-start; }
        .hs-cards-col { flex: 2; min-width: 0; }
        .hs-map-col { flex: 1; min-width: 280px; position: sticky; top: 96px; height: calc(100vh - 116px); border: 1px solid rgba(212,160,23,0.15); overflow: hidden; }
        .hs-properties-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 16px; }
        select option { background-color: #1a1a1a !important; color: #F5F0E8 !important; }
        @media (max-width: 1100px) {
          .hs-map-col { display: none; }
          .hs-cards-col { flex: 1; }
          .hs-properties-grid { grid-template-columns: repeat(3,1fr) !important; }
        }
        @media (max-width: 768px) {
          .hs-props-wrap { padding: 96px 16px 24px !important; }
          .hs-filter-row { flex-wrap: wrap; }
          .hs-filter-field, .hs-filter-field-wide { flex: 1 1 calc(50% - 6px); }
          .hs-filter-pair { flex: 1 1 100%; }
          .hs-more-grid-6 { grid-template-columns: repeat(2,1fr) !important; }
          .hs-checkboxes-grid { grid-template-columns: repeat(2,1fr) !important; }
          .hs-properties-grid { grid-template-columns: 1fr 1fr !important; gap: 10px !important; }
        }
        @media (max-width: 480px) {
          .hs-properties-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="hs-props-wrap">

        {/* ── FILTER BAR ── */}
        <div className="hs-filter-bar">
          <div className="hs-filter-row">

            <div className="hs-filter-field-wide">
              <label style={filterLabelS}>Title or Code</label>
              <input style={filterInputS} placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>

            <div className="hs-filter-field-wide">
              <label style={filterLabelS}>Region / Περιοχή</label>
              <RegionAutocomplete value={region} onChange={setRegion} />
            </div>

            <div className="hs-filter-field">
              <label style={filterLabelS}>Status</label>
              <select style={selectS} value={status} onChange={e => setStatus(e.target.value)}>
                <option value="">For Sale &amp; Rent</option>
                <option value="for_sale">For Sale</option>
                <option value="for_rent">For Rent</option>
              </select>
            </div>

            <div className="hs-filter-pair">
              <div>
                <label style={filterLabelS}>Price From (€)</label>
                <input style={filterInputS} type="number" placeholder="0" value={priceMin} onChange={e => setPriceMin(e.target.value)} />
              </div>
              <div>
                <label style={filterLabelS}>Price To (€)</label>
                <input style={filterInputS} type="number" placeholder="Any" value={priceMax} onChange={e => setPriceMax(e.target.value)} />
              </div>
            </div>

            <div className="hs-filter-pair">
              <div>
                <label style={filterLabelS}>Sq.m. From</label>
                <input style={filterInputS} type="number" placeholder="0" value={sqmMin} onChange={e => setSqmMin(e.target.value)} />
              </div>
              <div>
                <label style={filterLabelS}>Sq.m. To</label>
                <input style={filterInputS} type="number" placeholder="Any" value={sqmMax} onChange={e => setSqmMax(e.target.value)} />
              </div>
            </div>

            <div style={{ flexShrink: 0, alignSelf: 'flex-end' }}>
              <button
                onClick={() => setShowMore(v => !v)}
                style={{ background: showMore ? 'rgba(240,192,64,0.1)' : 'transparent', border: '1px solid rgba(212,160,23,0.35)', color: '#F0C040', fontFamily: 'Montserrat, sans-serif', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', padding: '10px 16px', cursor: 'pointer', whiteSpace: 'nowrap', height: '40px' }}
              >
                {showMore ? '− Less' : '+ More'}
              </button>
            </div>

          </div>

          {showMore && (
            <div className="hs-more-panel">
              <div className="hs-more-grid-6">
                <div><label style={filterLabelS}>Bedrooms From</label><input style={filterInputS} type="number" value={bedroomsMin} onChange={e => setBedroomsMin(e.target.value)} /></div>
                <div><label style={filterLabelS}>Bedrooms To</label><input style={filterInputS} type="number" value={bedroomsMax} onChange={e => setBedroomsMax(e.target.value)} /></div>
                <div><label style={filterLabelS}>Bathrooms From</label><input style={filterInputS} type="number" value={bathroomsMin} onChange={e => setBathroomsMin(e.target.value)} /></div>
                <div><label style={filterLabelS}>Bathrooms To</label><input style={filterInputS} type="number" value={bathroomsMax} onChange={e => setBathroomsMax(e.target.value)} /></div>
                <div><label style={filterLabelS}>Floor From</label><input style={filterInputS} type="number" value={floorMin} onChange={e => setFloorMin(e.target.value)} /></div>
                <div><label style={filterLabelS}>Floor To</label><input style={filterInputS} type="number" value={floorMax} onChange={e => setFloorMax(e.target.value)} /></div>
              </div>
              <div className="hs-more-grid-6">
                <div><label style={filterLabelS}>Year From</label><input style={filterInputS} type="number" placeholder="e.g. 2000" value={yearMin} onChange={e => setYearMin(e.target.value)} /></div>
                <div><label style={filterLabelS}>Year To</label><input style={filterInputS} type="number" placeholder="e.g. 2024" value={yearMax} onChange={e => setYearMax(e.target.value)} /></div>
                <div><label style={filterLabelS}>Heating</label>
                  <select style={selectS} value={heating} onChange={e => setHeating(e.target.value)}>
                    <option value="">Any</option>
                    {['Autonomous','Central','Air Condition','Fireplace','Radiator','Underfloor','Solar','None'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div><label style={filterLabelS}>View</label>
                  <select style={selectS} value={view} onChange={e => setView(e.target.value)}>
                    <option value="">Any</option>
                    {['Sea View','Mountain View','City View','Garden View','Pool View','Street View','Acropolis View'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div><label style={filterLabelS}>Frames</label>
                  <select style={selectS} value={frames} onChange={e => setFrames(e.target.value)}>
                    <option value="">Any</option>
                    {['Aluminium','PVC','Wooden','Iron','Mixed'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div><label style={filterLabelS}>Parking</label>
                  <select style={selectS} value={parking} onChange={e => setParking(e.target.value)}>
                    <option value="">Any</option>
                    {['Closed','Open','Pilotis','Basement','Street','None'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="hs-more-grid-2">
                <div><label style={filterLabelS}>Transport</label>
                  <select style={selectS} value={transport} onChange={e => setTransport(e.target.value)}>
                    <option value="">Any</option>
                    {['Metro','Bus','Tram','Train','ISAP','None'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="hs-checkboxes-grid">
                {CHECKBOXES.map(({ key, label }) => (
                  <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '11px', color: '#CCCCCC', letterSpacing: '0.5px', fontFamily: 'Montserrat, sans-serif' }}>
                    <input type="checkbox" checked={!!checkboxes[key]} onChange={e => setCheckboxes(prev => ({ ...prev, [key]: e.target.checked }))} style={{ accentColor: '#F0C040', width: '14px', height: '14px', cursor: 'pointer', flexShrink: 0 }} />
                    {label}
                  </label>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(212,160,23,0.08)' }}>
            <span style={{ fontSize: '11px', color: '#888', fontFamily: 'Montserrat, sans-serif' }}>
              {filtered.length} {filtered.length === 1 ? 'property' : 'properties'} found
            </span>
            <button onClick={clearAll} style={{ background: 'transparent', border: 'none', color: '#888', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif' }}>
              Clear All
            </button>
          </div>
        </div>

        {/* ── CONTENT: CARDS + MAP ── */}
        <div className="hs-content-row">
          <div className="hs-cards-col">
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0', color: '#888', fontFamily: 'Montserrat, sans-serif' }}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '48px', color: 'rgba(212,160,23,0.2)', marginBottom: '16px' }}>HS</div>
                <p style={{ fontSize: '13px', letterSpacing: '1px' }}>No properties match your search criteria.</p>
              </div>
            ) : (
              <div className="hs-properties-grid">
                {filtered.map(p => (
                  <PropertyCard key={p.id} property={p} highlighted={hoveredId === String(p.id)} onHover={setHoveredId} />
                ))}
              </div>
            )}
          </div>

          <div className="hs-map-col">
            <PropertyMap properties={filtered} hoveredId={hoveredId} onHover={setHoveredId} />
          </div>
        </div>

      </div>
    </>
  )
}
