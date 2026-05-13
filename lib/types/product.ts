export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  image_url: string | null
  images: string[]
  category: string | null
  is_featured: boolean
  sizes: string[]
  is_available: boolean
  created_at: string
  updated_at: string
}

export interface ProductFormData {
  name: string
  description: string
  size: string
  price: number
  image_url: string
  category: string
  is_featured: boolean
}
