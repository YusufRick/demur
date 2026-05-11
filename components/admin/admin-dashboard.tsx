'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Product } from '@/lib/types/product'
import { AdminHeader } from './admin-header'
import { ProductTable } from './product-table'
import { ProductForm } from './product-form'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface AdminDashboardProps {
  products: Product[]
  userEmail: string
}

export function AdminDashboard({ products, userEmail }: AdminDashboardProps) {
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingProduct(null)
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader userEmail={userEmail} onSignOut={handleSignOut} />

      <main className="p-6 md:p-8 max-w-screen-2xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card border border-border p-6">
            <p className="text-xs text-muted-foreground tracking-widest uppercase mb-2">
              Total Products
            </p>
            <p className="text-4xl font-bold text-foreground">{products.length}</p>
          </div>
          <div className="bg-card border border-border p-6">
            <p className="text-xs text-muted-foreground tracking-widest uppercase mb-2">
              Featured Items
            </p>
            <p className="text-4xl font-bold text-primary">
              {products.filter(p => p.is_featured).length}
            </p>
          </div>
          <div className="bg-card border border-border p-6">
            <p className="text-xs text-muted-foreground tracking-widest uppercase mb-2">
              Categories
            </p>
            <p className="text-4xl font-bold text-foreground">
              {new Set(products.map(p => p.category).filter(Boolean)).size}
            </p>
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-card border border-border">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-lg font-medium tracking-widest uppercase">Products</h2>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>

          <ProductTable products={products} onEdit={handleEdit} />
        </div>
      </main>

      {/* Product Form Modal */}
      {showForm && (
        <ProductForm
          product={editingProduct}
          onClose={handleCloseForm}
        />
      )}
    </div>
  )
}
