import { supabase } from './supabase'
import { Database } from '@/types/supabase'

type EnergyReading = Database['public']['Tables']['energy_readings']['Row']
type Alert = Database['public']['Tables']['alerts']['Row']
type UserSettings = Database['public']['Tables']['user_settings']['Row']

// Energy Readings
export async function createEnergyReading(data: Omit<EnergyReading, 'id' | 'created_at' | 'updated_at'>) {
  const { data: reading, error } = await supabase
    .from('energy_readings')
    .insert(data)
    .select()
    .single()

  if (error) throw error
  return reading
}

export async function getEnergyReadings(userId: string) {
  const { data: readings, error } = await supabase
    .from('energy_readings')
    .select()
    .eq('user_id', userId)
    .order('date', { ascending: false })

  if (error) throw error
  return readings
}

// Alerts
export async function createAlert(data: Omit<Alert, 'id' | 'created_at' | 'updated_at'>) {
  const { data: alert, error } = await supabase
    .from('alerts')
    .insert(data)
    .select()
    .single()

  if (error) throw error
  return alert
}

export async function getAlerts(userId: string) {
  const { data: alerts, error } = await supabase
    .from('alerts')
    .select()
    .eq('user_id', userId)
    .eq('enabled', true)

  if (error) throw error
  return alerts
}

// User Settings
export async function getUserSettings(userId: string) {
  const { data: settings, error } = await supabase
    .from('user_settings')
    .select()
    .eq('user_id', userId)
    .single()

  if (error && error.code !== 'PGRST116') throw error // PGRST116 is "no rows returned"
  return settings
}

export async function createOrUpdateUserSettings(
  userId: string,
  data: Partial<Omit<UserSettings, 'id' | 'user_id' | 'created_at' | 'updated_at'>>
) {
  const { data: settings, error } = await supabase
    .from('user_settings')
    .upsert({
      user_id: userId,
      ...data,
    })
    .select()
    .single()

  if (error) throw error
  return settings
}

// Real-time subscriptions
export function subscribeToEnergyReadings(userId: string, callback: (reading: EnergyReading) => void) {
  return supabase
    .channel('energy_readings')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'energy_readings',
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        callback(payload.new as EnergyReading)
      }
    )
    .subscribe()
}
