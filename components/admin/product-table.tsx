'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Product } from '@/lib/types/product'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'

interface ProductTableProps {
  products: Product[]
  onEdit: (product: Product) => void
}

export function ProductTable({ products, onEdit }: ProductTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const router = useRouter()

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    setDeletingId(id)
    const supabase = createClient()
    
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting product:', error)
      alert('Failed to delete product')
    } else {
      router.refresh()
    }
    
    setDeletingId(null)
  }

  if (products.length === 0) {
    return (
      <div className="p-12 text-center">
        <p className="text-muted-foreground">No products yet. Add your first product to get started.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left p-4 text-xs font-medium text-muted-foreground tracking-widest uppercase">
              Product
            </th>
            <th className="text-left p-4 text-xs font-medium text-muted-foreground tracking-widest uppercase">
              Category
            </th>
            <th className="text-left p-4 text-xs font-medium text-muted-foreground tracking-widest uppercase">
              Price
            </th>
            <th className="text-left p-4 text-xs font-medium text-muted-foreground tracking-widest uppercase">
              Featured
            </th>
            <th className="text-right p-4 text-xs font-medium text-muted-foreground tracking-widest uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary flex items-center justify-center flex-shrink-0">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-lg font-bold text-muted-foreground/30">
                        {product.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{product.name}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {product.description || 'No description'}
                    </p>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <span className="text-sm text-muted-foreground capitalize">
                  {product.category || '-'}
                </span>
              </td>
              <td className="p-4">
                <span className="text-sm font-medium text-foreground">
                  ${Number(product.price).toFixed(2)}
                </span>
              </td>
              <td className="p-4">
                {product.is_featured ? (
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs tracking-widest uppercase">
                    Featured
                  </span>
                ) : (
                  <span className="text-xs text-muted-foreground">-</span>
                )}
              </td>
              <td className="p-4">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(product)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                    disabled={deletingId === product.id}
                    className="text-muted-foreground hover:text-primary"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
