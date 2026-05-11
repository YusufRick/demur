'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Product } from '@/lib/types/product'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { X } from 'lucide-react'

interface ProductFormProps {
  product: Product | null
  onClose: () => void
}

export function ProductForm({ product, onClose }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price?.toString() || '',
    image_url: product?.image_url || '',
    category: product?.category || '',
    is_featured: product?.is_featured || false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()

    const productData = {
      name: formData.name,
      description: formData.description || null,
      price: parseFloat(formData.price),
      image_url: formData.image_url || null,
      category: formData.category || null,
      is_featured: formData.is_featured,
    }

    if (product) {
      // Update existing product
      const { error: updateError } = await supabase
        .from('products')
        .update({ ...productData, updated_at: new Date().toISOString() })
        .eq('id', product.id)

      if (updateError) {
        setError(updateError.message)
        setLoading(false)
        return
      }
    } else {
      // Create new product
      const { error: insertError } = await supabase
        .from('products')
        .insert([productData])

      if (insertError) {
        setError(insertError.message)
        setLoading(false)
        return
      }
    }

    router.refresh()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-6">
      <div className="bg-card border border-border w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-medium tracking-widest uppercase">
            {product ? 'Edit Product' : 'Add Product'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
          {error && (
            <div className="p-4 bg-primary/10 border border-primary text-primary text-sm">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-xs tracking-widest uppercase text-muted-foreground">
              Product Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="bg-secondary border-border"
              placeholder="YEEZY BOOST 350"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description" className="text-xs tracking-widest uppercase text-muted-foreground">
              Description
            </Label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              rows={3}
              placeholder="Product description..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="price" className="text-xs tracking-widest uppercase text-muted-foreground">
                Price *
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                className="bg-secondary border-border"
                placeholder="99.00"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="category" className="text-xs tracking-widest uppercase text-muted-foreground">
                Category
              </Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="bg-secondary border-border"
                placeholder="footwear"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="image_url" className="text-xs tracking-widest uppercase text-muted-foreground">
              Image URL
            </Label>
            <Input
              id="image_url"
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="bg-secondary border-border"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="is_featured"
              checked={formData.is_featured}
              onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
              className="w-4 h-4 bg-secondary border-border accent-primary"
            />
            <Label htmlFor="is_featured" className="text-sm text-foreground cursor-pointer">
              Featured product (shows on homepage)
            </Label>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-border text-foreground hover:bg-secondary"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? 'Saving...' : (product ? 'Update' : 'Create')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
