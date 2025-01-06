'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/components/auth/AuthProvider'

export default function NewEntryPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [usage, setUsage] = useState('')
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin')
    }
  }, [loading, user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      setError('Not authenticated')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const supabase = createClient()
      
      // Get user's rate per kWh from settings
      const { data: settings, error: settingsError } = await supabase
        .from('user_settings')
        .select('rate_per_kwh')
        .single()

      if (settingsError) {
        console.error('Settings error:', settingsError)
      }

      const rate = settings?.rate_per_kwh || 0.15 // Default to $0.15 if no setting
      const usageValue = parseFloat(usage)

      // Insert the energy reading
      const { error: insertError } = await supabase
        .from('energy_readings')
        .insert([
          {
            date: new Date(date).toISOString(),
            usage: usageValue,
            cost: usageValue * rate,
            notes: notes.trim() || null,
            user_id: user.id
          },
        ])

      if (insertError) {
        console.error('Insert error:', insertError)
        throw new Error(`Failed to save reading: ${insertError.message}`)
      }

      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      console.error('Submission error:', err)
      setError(err instanceof Error 
        ? `Error: ${err.message}` 
        : 'Failed to submit entry. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return <div className="p-4">Loading...</div>
  }

  if (!user) {
    return <div className="p-4">Redirecting to sign in...</div>
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-8 text-gray-900 dark:text-white">New Energy Entry</h1>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Energy Usage (kWh)
            </label>
            <input
              type="number"
              value={usage}
              onChange={(e) => setUsage(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900 dark:text-white"
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900 dark:text-white"
              rows={3}
              placeholder="Add any notes about this reading..."
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Entry'}
          </button>
        </div>
      </form>
    </div>
  )
}
