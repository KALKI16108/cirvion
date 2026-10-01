import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isValidUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  if (url.includes('your_supabase') || url.includes('placeholder')) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

const supabaseUrl = isValidUrl(rawUrl) 
  ? rawUrl 
  : 'https://placeholder.supabase.co';

const supabaseAnonKey = (rawKey && !rawKey.includes('your_supabase')) 
  ? rawKey 
  : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder';

if (!isValidUrl(rawUrl) || !rawKey || rawKey.includes('your_supabase')) {
  console.warn('Supabase URL or Anon Key is missing or invalid. Using fallback configuration.');
}

// Client for standard operations and auth. Uses only the public Anon Key.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

