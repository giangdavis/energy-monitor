'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export function useAuth() {
  const router = useRouter()

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/auth/signin')
  }

  return {
    signOut,
  }
}
