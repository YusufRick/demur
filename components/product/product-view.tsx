'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/context/cart-context'
import type { Product } from '@/lib/types/product'

interface ProductViewProps {
  product: Product
}

export function ProductView({ product }: ProductViewProps) {
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  // Combine image_url + images array, filter out nulls
  const allImages = [
    ...(product.image_url ? [product.image_url] : []),
    ...(product.images || []),
  ].filter(Boolean)

  const handlePrev = () =>
    setCurrentImage((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))

  const handleNext = () =>
    setCurrentImage((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))

  const handleAddToCart = () => {
    if (!selectedSize) return
    setIsAdding(true)
    addItem(product, 1, selectedSize)
    setTimeout(() => setIsAdding(false), 500)
  }

  return (
    <section className="pt-24 pb-16 px-6 min-h-screen">
      <div className="max-w-screen-xl mx-auto">
        <Link
          href="/collection"
          className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors mb-12"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Image Swiper */}
          <div className="flex flex-col gap-4">
            {/* Main image */}
            <div className="relative aspect-square bg-white/5 overflow-hidden group">
              {allImages.length > 0 ? (
                <Image
                  src={allImages[currentImage]}
                  alt={product.name}
                  fill
                  className="object-cover transition-opacity duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-sm tracking-[0.3em] text-muted-foreground uppercase">
                    {product.category}
                  </span>
                </div>
              )}

              {/* Prev / Next arrows — only show if multiple images */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>

                  {/* Dot indicators */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {allImages.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImage(i)}
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${
                          i === currentImage ? 'bg-white' : 'bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`relative flex-shrink-0 w-20 h-20 bg-white/5 overflow-hidden border transition-colors ${
                      i === currentImage ? 'border-white' : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <p className="text-xs tracking-[0.2em] uppercase text-primary mb-2">
              {product.category}
            </p>
            <h1 className="text-2xl md:text-3xl font-bold tracking-[0.1em] text-foreground mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <p className="text-xl text-foreground">
                ${Number(product.price).toFixed(0)}
              </p>
              <span className={`text-xs tracking-[0.15em] uppercase px-2 py-1 ${
                product.is_available
                  ? 'bg-green-500/10 text-green-400'
                  : 'bg-red-500/10 text-red-400'
              }`}>
                {product.is_available ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-8">
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
                  Select Size
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      disabled={!product.is_available}
                      className={`px-4 py-3 text-xs tracking-[0.1em] border transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
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
            )}

            {/* Add to Cart */}
            <Button
              onClick={handleAddToCart}
              disabled={!selectedSize || isAdding || !product.is_available}
              className="w-full py-6 text-xs tracking-[0.3em] uppercase bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {!product.is_available
                ? 'Out of Stock'
                : isAdding
                ? 'Added to Cart'
                : selectedSize
                ? 'Add to Cart'
                : 'Select a Size'}
            </Button>

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