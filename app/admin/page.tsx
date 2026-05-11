import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getProducts } from '@/lib/services/product-service'
import { AdminDashboard } from '@/components/admin/admin-dashboard'

export const metadata = {
  title: 'Admin Dashboard | YEEZY',
  description: 'Manage your YEEZY store.',
}

export default async function AdminPage() {
  const supabase = await createClient()
  
  // Check authentication
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/admin/login')
  }

  // Check if user is admin
  const { data: adminData } = await supabase
    .from('admin_users')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!adminData) {
    redirect('/admin/login')
  }

  const products = await getProducts()

  return <AdminDashboard products={products} userEmail={user.email || ''} />
}
