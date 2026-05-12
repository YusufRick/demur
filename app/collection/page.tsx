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
      <CollectionContent products={products} selectedCategory={selectedCategory} />

      <Footer />
    </main>
  )
}
