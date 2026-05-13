import Link from 'next/link'

export function BannerSection() {
  return (
    <section className="py-32 px-6 bg-background border-t border-border">
      <div className="max-w-screen-2xl mx-auto text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4">
          Kuala Lumpur, Malaysia
        </p>

        <h2 className="text-3xl md:text-5xl font-bold tracking-[0.1em] text-foreground mb-8">
          MADE FOR THE FEW
        </h2>

        <p className="text-sm text-muted-foreground max-w-lg mx-auto mb-6 leading-relaxed">
          DEMUR is a one-on-one clothing label born in Malaysia. Every piece is intentional. Designed to elevate your identity, We do custom.
        </p>

        <p className="text-sm text-muted-foreground max-w-lg mx-auto mb-12 leading-relaxed">
          Want something made for you? We work directly with you from concept to creation.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/collection"
            className="inline-block bg-primary text-primary-foreground px-12 py-4 text-xs tracking-[0.3em] uppercase hover:bg-primary/90 transition-colors"
          >
            Shop Collection
          </Link>

          <a
            href="mailto:hello@demur.my"
            className="inline-block border border-border text-foreground px-12 py-4 text-xs tracking-[0.3em] uppercase hover:border-primary hover:text-primary transition-colors"
          >
            Custom Order
          </a>
        </div>
      </div>
    </section>
  )
}