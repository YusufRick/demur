import Link from 'next/link'
import type { Product } from '@/lib/types/product'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className="group block">
      {/* Product Image Placeholder */}
      <div className="aspect-square bg-white/5 mb-4 flex items-center justify-center overflow-hidden">
        <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase group-hover:scale-110 transition-transform duration-500">
          {product.category}
        </span>
      </div>
      
      {/* Product Info */}
      <div className="space-y-1">
        <h3 className="text-xs tracking-[0.15em] uppercase text-foreground group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground">
          ${Number(product.price).toFixed(0)}
        </p>
      </div>
    </Link>
  )
}
