import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env['SUPABASE_URL'];
const anonKey = process.env['SUPABASE_ANON_KEY'];
const serviceRoleKey = process.env['SUPABASE_SERVICE_ROLE_KEY'];

if (!supabaseUrl) throw new Error('SUPABASE_URL is not set');
if (!anonKey) throw new Error('SUPABASE_ANON_KEY is not set');
if (!serviceRoleKey) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set');

// Admin client — used for admin.createUser and auth.getUser(token) (JWT verification)
// Never use this for user-initiated queries — it bypasses Row Level Security
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// Anon client — used only for signInWithPassword (validates user credentials)
export const supabaseAnon = createClient(supabaseUrl, anonKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});
