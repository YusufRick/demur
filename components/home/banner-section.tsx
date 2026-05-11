import Link from 'next/link'

export function BannerSection() {
  return (
    <section className="py-32 px-6 bg-background border-t border-white/5">
      <div className="max-w-screen-2xl mx-auto text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4">
          New Arrivals
        </p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-[0.1em] text-foreground mb-8">
          SEASON 01
        </h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto mb-12 leading-relaxed">
          Discover the inaugural collection. Minimalist design meets premium construction.
        </p>
        <Link
          href="/collection"
          className="inline-block bg-primary text-primary-foreground px-12 py-4 text-xs tracking-[0.3em] uppercase hover:bg-primary/90 transition-colors"
        >
          View All
        </Link>
      </div>
    </section>
  )
}
