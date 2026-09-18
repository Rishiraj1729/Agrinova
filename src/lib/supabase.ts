import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const supabaseConfigured = Boolean(url?.startsWith('http') && anon && anon.length > 20)

export const supabase: SupabaseClient | null = supabaseConfigured
  ? createClient(url!, anon!)
  : null

export const MARKETPLACE_KEYS = [
  'agrinova_marketplace_v6',
  'agrinova_marketplace_v5',
  'agrinova_marketplace_v4',
  'agrinova_marketplace_v3',
] as const

export function clearLocalAppState() {
  try {
    for (const k of MARKETPLACE_KEYS) localStorage.removeItem(k)
    const ecoKeys: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith('agrinova_eco_')) ecoKeys.push(key)
    }
    ecoKeys.forEach((k) => localStorage.removeItem(k))
  } catch {
    /* ignore */
  }
}
