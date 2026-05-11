import { createClient } from '@/lib/supabase/server'

// Auth Service Layer - Server-side authentication operations
export async function getCurrentUser() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return null
  }

  return user
}

export async function isAdmin(): Promise<boolean> {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return false
  }

  const { data: adminData } = await supabase
    .from('admin_users')
    .select('id')
    .eq('user_id', user.id)
    .single()

  return !!adminData
}

export async function signIn(email: string, password: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  return { data, error }
}

export async function signOut() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()
  return { error }
}
