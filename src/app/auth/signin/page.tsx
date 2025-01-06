'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function SignIn() {
  const [supabase] = useState(() => createClient())
  const [origin, setOrigin] = useState('')

  useEffect(() => {
    setOrigin(window.location.origin)
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Welcome to Energy Monitor
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Sign in to start tracking your energy usage
          </p>
        </div>
        <div className="mt-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
          {origin && (
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#2563eb',
                      brandAccent: '#1d4ed8',
                    },
                  },
                },
              }}
              providers={['google']}
              redirectTo={`${origin}/auth/callback`}
              onError={(error) => {
                console.error('Auth error:', error)
              }}
              theme="dark"
              showLinks={false}
              view="magic_link"
            />
          )}
        </div>
      </div>
    </div>
  )
}
