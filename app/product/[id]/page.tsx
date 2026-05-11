import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ProductView } from '@/components/product/product-view'
import { productService } from '@/lib/services/product-service'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params
  const product = await productService.getProductById(id)
  
  if (!product) {
    return { title: 'Product Not Found | DEMUR' }
  }

  return {
    title: `${product.name} | DEMUR`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = await productService.getProductById(id)

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ProductView product={product} />
      <Footer />
    </main>
  )
}
