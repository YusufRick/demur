'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/context/cart-context'

const categories = [
  { name: 'All', href: '/collection' },
  { name: 'Footwear', href: '/collection?category=footwear' },
  { name: 'Apparel', href: '/collection?category=apparel' },
  { name: 'Jackets', href: '/collection?category=jacket' },
  { name: 'Pants', href: '/collection?category=pants' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { totalItems, toggleCart } = useCart()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/5">
      <nav className="flex items-center justify-between px-6 py-4 max-w-screen-2xl mx-auto">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-[0.3em] text-foreground hover:text-primary transition-colors">
          DEMUR
        </Link>

        {/* Desktop Navigation - Categories */}
        <div className="hidden md:flex items-center gap-8">
          {categories.map((category) => (
            <Link 
              key={category.name}
              href={category.href} 
              className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </div>

        {/* Right Side - Cart */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleCart}
            className="relative p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Open cart"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-medium flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-white/5">
          <div className="flex flex-col px-6 py-4 gap-4">
            {categories.map((category) => (
              <Link 
                key={category.name}
                href={category.href} 
                onClick={() => setIsMenuOpen(false)}
                className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
