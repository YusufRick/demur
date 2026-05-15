import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function TermsPage() {
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
      <h1 className="text-2xl font-bold tracking-[0.2em] uppercase mb-2">Terms of Service</h1>
      <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-12">Last Updated: May 2026</p>

      <div className="space-y-10">
        <div>
          <h2 className="text-xs tracking-[0.3em] uppercase font-bold mb-4">Introduction</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            This website is operated by DEMUR. By accessing or using our website and placing an order, you agree to be bound by these Terms of Service. If you do not agree, please do not use our service.
          </p>
        </div>

        <div className="border-t border-border pt-10">
          <h2 className="text-xs tracking-[0.3em] uppercase font-bold mb-4">Eligibility</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            You must be at least 18 years of age to use this service. By using our website, you represent that you are purchasing products for personal use only and not for resale or redistribution.
          </p>
        </div>

        <div className="border-t border-border pt-10">
          <h2 className="text-xs tracking-[0.3em] uppercase font-bold mb-4">Products & Orders</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            All products are subject to availability. We reserve the right to limit quantities, discontinue products, or refuse any order at our discretion. Product images are for reference only and may vary slightly from the actual item.
          </p>
        </div>

        <div className="border-t border-border pt-10">
          <h2 className="text-xs tracking-[0.3em] uppercase font-bold mb-4">Pricing & Payment</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            All prices are listed in the applicable currency and are subject to change without notice. By submitting payment, you authorise DEMUR to charge the full amount including applicable taxes and shipping fees. All payment information must be accurate and valid.
          </p>
        </div>

        <div className="border-t border-border pt-10">
          <h2 className="text-xs tracking-[0.3em] uppercase font-bold mb-4">Shipping & Delivery</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Shipping dates are estimates only and are not guaranteed. DEMUR is not responsible for delays caused by shipping carriers. Risk of loss passes to you upon receipt of your order. See our Shipping page for full details.
          </p>
        </div>

        <div className="border-t border-border pt-10">
          <h2 className="text-xs tracking-[0.3em] uppercase font-bold mb-4">Returns & Refunds</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            All sales are final. We do not accept returns or exchanges unless an item is defective or incorrect. Custom orders are strictly non-refundable. See our Returns page for full details.
          </p>
        </div>

        <div className="border-t border-border pt-10">
          <h2 className="text-xs tracking-[0.3em] uppercase font-bold mb-4">Intellectual Property</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            All content on this website including logos, designs, text, and images are owned by or licensed to DEMUR and are protected by intellectual property laws. Unauthorised use is strictly prohibited.
          </p>
        </div>

        <div className="border-t border-border pt-10">
          <h2 className="text-xs tracking-[0.3em] uppercase font-bold mb-4">Limitation of Liability</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            DEMUR shall not be liable for any indirect, incidental, or consequential damages arising from the use of our service or products. Our total liability for any claim shall not exceed the amount paid for the specific order giving rise to the claim.
          </p>
        </div>

        <div className="border-t border-border pt-10">
          <h2 className="text-xs tracking-[0.3em] uppercase font-bold mb-4">Changes to Terms</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            We reserve the right to modify these terms at any time. Continued use of the service after changes are posted constitutes your acceptance of the revised terms.
          </p>
        </div>
        </div>
        </main>

    )}

        