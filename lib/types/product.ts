export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  image_url: string | null
  category: string | null
  is_featured: boolean
  created_at: string
  updated_at: string
}

export interface ProductFormData {
  name: string
  description: string
  price: number
  image_url: string
  category: string
  is_featured: boolean
}
