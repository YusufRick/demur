import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background">
      <div className="max-w-screen-2xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold tracking-[0.3em] mb-4">DEMUR</h3>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              Elevated essentials for the modern individual. Each piece is crafted with precision and designed without compromise.
            </p>
          </div>

         

          {/* Info */}
          {/* Info */}
<div>
  <h4 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">Info</h4>
  <ul className="flex flex-row gap-6">
    <li>
      <span className="text-xs text-muted-foreground hover:text-red-500 transition-colors cursor-pointer">Shipping</span>
    </li>
    <li>
      <span className="text-xs text-muted-foreground hover:text-red-500 transition-colors cursor-pointer">Returns</span>
    </li>
    <li>
      <span className="text-xs text-muted-foreground hover:text-red-500 transition-colors cursor-pointer">Contact</span>
    </li>
  </ul>
</div>
        </div>

        <div className="border-t border-white/5 mt-16 pt-8">
          <p className="text-[10px] text-muted-foreground text-center tracking-[0.3em] uppercase">
            &copy; {new Date().getFullYear()} DEMUR. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
