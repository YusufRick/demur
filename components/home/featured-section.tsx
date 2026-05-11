import type { Product } from '@/lib/types/product'
import { ProductGrid } from '@/components/product/product-grid'

interface FeaturedSectionProps {
  products: Product[]
}

export function FeaturedSection({ products }: FeaturedSectionProps) {
  return (
    <section className="py-24 px-6 bg-background border-t border-white/5">
      <div className="max-w-screen-2xl mx-auto">
        <h2 className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-12 text-center">
          Featured
        </h2>
        <ProductGrid products={products} columns={4} />
      </div>
    </section>
  )
}
