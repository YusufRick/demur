import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background">
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.2em] text-foreground mb-6">
          DEMUR
        </h1>
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
