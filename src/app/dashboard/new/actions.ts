'use server'

import { createClient } from '@/utils/supabase/server'

export async function getCurrentUserId() {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  console.log(session?.user.id)
  return session?.user.id
}

export async function newEntry(formData: FormData) {
  'use server'
  
  const supabase = await createClient()
  const uuid = await getCurrentUserId()
  
  if (!uuid) {
    throw new Error('User not authenticated')
  }

  const date = formData.get('date')
  const usageStr = formData.get('usage')

  
  if (!date || !usageStr) {
    throw new Error('Missing required fields')
  }

  const usage = parseFloat(usageStr.toString())
  
  if (isNaN(usage)) {
    throw new Error('Invalid usage value')
  }

  const { data, error } = await supabase
    .from('energy_readings')
    .upsert({
      uuid: uuid,
      date: date,
      usage: usage,
    })
    .select()

  if (error) {
    console.error('Error inserting entry:', error)
    console.log(uuid, date, usage)
    throw new Error('Failed to save entry')
  }

  return { success: true, data }
}