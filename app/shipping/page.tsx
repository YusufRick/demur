import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-24 max-w-2xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-red-500 transition-colors mb-12"
      >
        <ChevronLeft className="w-4 h-4" />
        Back
      </Link>

      <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">DEMUR</p>
      <h1 className="text-2xl font-bold tracking-[0.2em] uppercase mb-12">Shipping</h1>

      <div className="space-y-10">
        <div>
          <h2 className="text-xs tracking-[0.3em] uppercase font-bold mb-4">Local Shipping (Malaysia)</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            We ship to all states within Malaysia. Delivery costs range from RM15 to RM50 depending on your location. West Malaysia orders typically arrive within 3–5 business days. East Malaysia (Sabah & Sarawak) may take 5–10 business days.
          </p>
        </div>

        <div className="border-t border-border pt-10">
          <h2 className="text-xs tracking-[0.3em] uppercase font-bold mb-4">International Shipping</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            We currently ship internationally to selected countries including Singapore and other regions upon request. International shipping is a flat rate of USD $100. Delivery times vary by destination and are subject to customs clearance. DEMUR is not responsible for any customs duties, taxes, or import fees incurred upon delivery.
          </p>
        </div>

        <div className="border-t border-border pt-10">
          <h2 className="text-xs tracking-[0.3em] uppercase font-bold mb-4">Processing Time</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            All orders are processed within 1–3 business days. You will receive a tracking number once your order has been dispatched. Shipping times are estimates and may vary due to carrier delays or external circumstances beyond our control.
          </p>
        </div>

        <div className="border-t border-border pt-10">
          <h2 className="text-xs tracking-[0.3em] uppercase font-bold mb-4">Important</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            DEMUR is not liable for lost, stolen, or delayed packages once dispatched. Please ensure your shipping address is accurate at the time of checkout. We are unable to redirect orders once they have been shipped.
          </p>
        </div>
      </div>

      <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-16">
        © {new Date().getFullYear()} DEMUR. All Rights Reserved.
      </p>
    </main>
  )
}