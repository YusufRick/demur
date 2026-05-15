'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/context/cart-context'
import Image from 'next/image'

const categories = [
  { name: 'All', href: '/collection' },
  { name: 'Footwear', href: '/collection?category=footwear' },
  { name: 'Jackets', href: '/collection?category=jacket' },
  { name: 'Pants', href: '/collection?category=pants' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { totalItems, toggleCart } = useCart()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="flex items-center justify-between px-6 py-4 max-w-screen-2xl mx-auto">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/Demur_Logo.jpg"
            alt="DEMUR"
            width={100}
            height={32}
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-red-500 transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </div>

        {/* Right Side - Cart */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleCart}
            className="relative p-2 text-foreground hover:text-red-500 transition-colors"
            aria-label="Open cart"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-medium flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-red-500 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border">
          <div className="flex flex-col px-6 py-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-red-500 transition-colors"
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