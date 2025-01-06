export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      alerts: {
        Row: {
          id: string
          user_id: string
          threshold: number
          type: 'DAILY_USAGE' | 'WEEKLY_AVERAGE' | 'MONTHLY_COST'
          enabled: boolean
          notification_method: 'EMAIL' | 'IN_APP'
          email_address: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          threshold: number
          type: 'DAILY_USAGE' | 'WEEKLY_AVERAGE' | 'MONTHLY_COST'
          enabled?: boolean
          notification_method: 'EMAIL' | 'IN_APP'
          email_address?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          threshold?: number
          type?: 'DAILY_USAGE' | 'WEEKLY_AVERAGE' | 'MONTHLY_COST'
          enabled?: boolean
          notification_method?: 'EMAIL' | 'IN_APP'
          email_address?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      energy_readings: {
        Row: {
          id: string
          date: string
          usage: number
          cost: number | null
          user_id: string
          created_at: string
          updated_at: string
          notes: string | null
        }
        Insert: {
          id?: string
          date: string
          usage: number
          cost?: number | null
          user_id: string
          created_at?: string
          updated_at?: string
          notes?: string | null
        }
        Update: {
          id?: string
          date?: string
          usage?: number
          cost?: number | null
          user_id?: string
          created_at?: string
          updated_at?: string
          notes?: string | null
        }
      }
      user_settings: {
        Row: {
          id: string
          user_id: string
          currency: string
          rate_per_kwh: number
          notification_preferences: ('EMAIL' | 'IN_APP')[]
          dark_mode: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          currency?: string
          rate_per_kwh?: number
          notification_preferences?: ('EMAIL' | 'IN_APP')[]
          dark_mode?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          currency?: string
          rate_per_kwh?: number
          notification_preferences?: ('EMAIL' | 'IN_APP')[]
          dark_mode?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      alert_type: 'DAILY_USAGE' | 'WEEKLY_AVERAGE' | 'MONTHLY_COST'
      notification_method: 'EMAIL' | 'IN_APP'
    }
  }
}
