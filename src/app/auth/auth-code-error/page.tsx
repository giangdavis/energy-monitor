'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function AuthCodeError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
        <h1 className="mb-4 text-2xl font-bold text-red-600">Authentication Error</h1>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          {decodeURIComponent(error || 'There was an error authenticating your account.')}
        </p>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          Please try again or contact support if the problem persists.
        </p>
        <Link
          href="/auth/signin"
          className="inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Return to Sign In
        </Link>
      </div>
    </div>
  )
}
