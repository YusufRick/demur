import Link from 'next/link'
import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background">
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        
        <Image
          src="/Demur_Logo.jpg"
          alt="DEMUR"
          width={400}
          height={120}
          className="h-48 w-auto object-contain mx-auto mb-6"
        />

        <p className="text-sm md:text-base tracking-[0.3em] uppercase text-muted-foreground mb-12">
          Elevated Essentials
        </p>
        <Link
          href="/collection"
          className="inline-block border border-foreground px-12 py-4 text-xs tracking-[0.3em] uppercase text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
        >
          Shop Collection
        </Link>
      </div>
    </section>
  )
}