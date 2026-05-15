import Link from 'next/link'

export function Footer() {
  return (
    <footer className=" bg-background">
      <div className="max-w-screen-2xl mx-auto px-6 py-12">

        {/* Info Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
          <Link href="/shipping" className="text-xs text-muted-foreground hover:text-red-500 transition-colors cursor-pointer">
            Shipping & Returns
          </Link>
          <Link href="/terms" className="text-xs text-muted-foreground hover:text-red-500 transition-colors cursor-pointer">
            Terms
          </Link>
          <Link href="https://instagram.com/d3murrr" className="text-xs text-muted-foreground hover:text-red-500 transition-colors cursor-pointer">
            Contact
          </Link>
        </div>

        {/* Copyright */}
        <div className=" mt-8 pt-8">
          <p className="text-[10px] text-muted-foreground text-center tracking-[0.3em] uppercase">
            &copy; {new Date().getFullYear()} DEMUR. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}