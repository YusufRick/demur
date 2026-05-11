'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/context/cart-context'
import type { Product } from '@/lib/types/product'

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const footwearSizes = ['US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12']

interface ProductViewProps {
  product: Product
}

export function ProductView({ product }: ProductViewProps) {
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  const isFootwear = product.category === 'footwear'
  const availableSizes = isFootwear ? footwearSizes : sizes

  const handleAddToCart = () => {
    if (!selectedSize) return
    
    setIsAdding(true)
    addItem(product, 1, selectedSize)
    
    setTimeout(() => {
      setIsAdding(false)
    }, 500)
  }

  return (
    <section className="pt-24 pb-16 px-6 min-h-screen">
      <div className="max-w-screen-xl mx-auto">
        {/* Back Link */}
        <Link 
          href="/collection" 
          className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors mb-12"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Image */}
          <div className="aspect-square bg-white/5 flex items-center justify-center">
            <span className="text-sm tracking-[0.3em] text-muted-foreground uppercase">
              {product.category}
            </span>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <p className="text-xs tracking-[0.2em] uppercase text-primary mb-2">
              {product.category}
            </p>
            <h1 className="text-2xl md:text-3xl font-bold tracking-[0.1em] text-foreground mb-4">
              {product.name}
            </h1>
            <p className="text-xl text-foreground mb-8">
              ${Number(product.price).toFixed(0)}
            </p>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Size Selection */}
            <div className="mb-8">
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
                Select Size
              </p>
              <div className="flex flex-wrap gap-2">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-3 text-xs tracking-[0.1em] border transition-colors ${
                      selectedSize === size
                        ? 'border-foreground bg-foreground text-background'
                        : 'border-white/20 text-foreground hover:border-white/40'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              disabled={!selectedSize || isAdding}
              className="w-full py-6 text-xs tracking-[0.3em] uppercase bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAdding ? 'Added to Cart' : selectedSize ? 'Add to Cart' : 'Select a Size'}
            </Button>

            {/* Additional Info */}
            <div className="mt-12 pt-8 border-t border-white/10 space-y-4">
              <div className="flex justify-between text-xs">
                <span className="tracking-[0.2em] uppercase text-muted-foreground">Shipping</span>
                <span className="text-foreground">Free worldwide shipping</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="tracking-[0.2em] uppercase text-muted-foreground">Returns</span>
                <span className="text-foreground">30-day return policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
