import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/home/hero-section'
import { FeaturedSection } from '@/components/home/featured-section'
import { BannerSection } from '@/components/home/banner-section'
import { getFeaturedProducts } from '@/lib/services/product-service'

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <BannerSection />
      <Footer />
    </main>
  )
}
