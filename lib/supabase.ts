/**
 * WARUM: Supabase-Client für Datenbank-Zugriff (Waitlist-Signups)
 * WIE: @supabase/supabase-js mit ENV-Variables (Public-Key für Client-Side)
 * WAS: Stellt `supabase`-Object zur Verfügung für Queries (INSERT, SELECT, etc.)
 * 
 * BEISPIEL-USE:
 * import { supabase } from '@/lib/supabase';
 * const { data, error } = await supabase.from('waitlist_signups').insert([...]);
 */

import { createClient } from '@supabase/supabase-js';

// ENV-Variables aus .env.local lesen
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Supabase-Client erstellen (wird überall in der App genutzt)
// Falls ENV-Variables fehlen, wird createClient trotzdem funktionieren
// (Requests werden dann fehlschlagen, aber App crasht nicht beim Start)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
