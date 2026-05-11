'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ProductGrid } from '@/components/product/product-grid'
import type { Product } from '@/lib/types/product'

const categories = [
  { key: 'all', label: 'All' },
  { key: 'footwear', label: 'Footwear' },
  { key: 'apparel', label: 'Apparel' },
  { key: 'jacket', label: 'Jackets' },
  { key: 'pants', label: 'Pants' },
]

interface CollectionContentProps {
  products: Product[]
  selectedCategory: string
}

export function CollectionContent({ products, selectedCategory }: CollectionContentProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (category === 'all') {
      params.delete('category')
    } else {
      params.set('category', category)
    }
    router.push(`/collection?${params.toString()}`)
  }

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  return (
    <section className="pb-24 px-6">
      <div className="max-w-screen-2xl mx-auto">
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => handleCategoryChange(category.key)}
              className={`text-xs tracking-[0.2em] uppercase transition-colors ${
                selectedCategory === category.key
                  ? 'text-foreground border-b border-foreground pb-1'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} columns={4} />
        ) : (
          <div className="text-center py-24">
            <p className="text-sm text-muted-foreground tracking-[0.2em] uppercase">
              No products found
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
