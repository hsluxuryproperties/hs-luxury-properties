import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <main>
      <Header />
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="font-serif text-5xl text-gold-gradient">
            HS Luxury Properties
          </h1>
          <p className="text-gold-200/60 text-sm tracking-[0.2em] uppercase font-sans">
            Luxury Properties · Extraordinary Living
          </p>
          <div className="divider-gold mx-auto mt-6" />
        </div>
      </div>
      <Footer />
    </main>
  )
}