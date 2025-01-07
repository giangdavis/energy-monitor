'use client'

import { newEntry } from './actions'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function NewEntryPage() {
  const router = useRouter()
  const [error, setError] = useState<string>('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    try {
      setError('')
      const result = await newEntry(formData)
      if (result.success) {
        router.push('/dashboard')
        router.refresh()
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An error occurred')
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-8">New Energy Entry</h1>
      <div className="bg-gray-800 p-6 rounded-lg">
        <form onSubmit={handleSubmit} className="max-w-md">
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-md text-red-300">
              {error}
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium mb-2">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="w-full px-3 py-2 bg-gray-700 rounded-md border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              defaultValue={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="usage" className="block text-sm font-medium mb-2">
              Energy Usage (kWh)
            </label>
            <input
              type="number"
              id="usage"
              name="usage"
              className="w-full px-3 py-2 bg-gray-700 rounded-md border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="0.00"
              step="0.01"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Submit Entry
          </button>
        </form>
      </div>
    </div>
  )
}
