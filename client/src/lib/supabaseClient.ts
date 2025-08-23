import { createClient } from '@supabase/supabase-js';

// Support multiple env name conventions (Vite uses VITE_ prefix; some setups use NEXT_PUBLIC_)
const url = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL || import.meta.env.SUPABASE_URL;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY;

export const supabase = (url && anon) ? createClient(url as string, anon as string) : null;

export default supabase;
