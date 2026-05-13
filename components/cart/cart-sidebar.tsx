"use client"

import { useState } from 'react'
import { useCart } from '@/lib/context/cart-context'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createShopifyCheckout } from '@/lib/shopify/checkout'  // ✅ CHANGED: buildShopifyCheckoutUrl → createShopifyCheckout

export function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalItems, totalPrice } = useCart()
  const [isLoading, setIsLoading] = useState(false)  // ✅ ADDED

  // ✅ CHANGED: now async, calls Storefront API instead of building a URL
  const handleCheckout = async () => {
    if (items.length === 0) return

    setIsLoading(true)
    try {
      const checkoutUrl = await createShopifyCheckout(items)
      if (checkoutUrl) {
        window.location.href = checkoutUrl
      } else {
        alert('Checkout unavailable. Please try again.')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-40"
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-white/10 z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5" />
            <span className="text-sm font-medium tracking-widest uppercase">
              Cart ({totalItems})
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <ShoppingBag className="w-12 h-12 mb-4 opacity-50" />
              <p className="text-sm tracking-widest uppercase">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  {/* Product Image Placeholder */}
                  <div className="w-24 h-24 bg-white/5 flex-shrink-0 flex items-center justify-center">
                    <span className="text-[10px] text-muted-foreground tracking-widest">
                      {item.product.category?.toUpperCase()}
                    </span>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium tracking-wide">
                          {item.product.name}
                        </h3>
                        {item.size && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Size: {item.size}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-1 hover:bg-white/5 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-white/20">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-2 hover:bg-white/5 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-4 text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-2 hover:bg-white/5 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-medium">
                        ${(Number(item.product.price) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-white/10 p-6 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground tracking-widest uppercase">Subtotal</span>
              <span className="font-medium">${totalPrice.toFixed(2)}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Shipping and taxes calculated at checkout
            </p>
            
            <Button
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-sm tracking-widest uppercase disabled:opacity-50"
            >
              {isLoading ? 'Redirecting...' : 'Checkout'}
            </Button>
          </div>
        )}
      </div>
    </>
  )
}