import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CollectionContent } from '@/components/collection/collection-content'
import { getProducts } from '@/lib/services/product-service'

export const metadata = {
  title: 'Collection | DEMUR',
  description: 'Shop the complete DEMUR collection.',
}

export default async function CollectionPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const params = await searchParams
  const products = await getProducts()
  const selectedCategory = params.category || 'all'

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-screen-2xl mx-auto text-center">
          <h1 className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
            Collection
          </h1>
        </div>
      </section>

      {/* Products Section */}
      <CollectionContent products={products} selectedCategory={selectedCategory} />

      <Footer />
    </main>
  )
}
