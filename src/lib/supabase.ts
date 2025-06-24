import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if Supabase is configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

// Create a mock client for when Supabase is not configured
const createMockClient = () => ({
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
    signUp: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
    signOut: () => Promise.resolve({ error: null }),
  },
  from: () => ({
    select: () => ({ eq: () => ({ order: () => Promise.resolve({ data: [], error: null }) }) }),
    insert: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
    delete: () => ({ eq: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }) }),
  }),
});

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
      db: {
        schema: 'public',
      },
      global: {
        headers: {
          'x-my-custom-header': 'reusa-app',
        },
      },
    })
  : createMockClient() as any;

export type Database = {
  public: {
    Tables: {
      boxes: {
        Row: {
          id: string;
          user_id: string;
          width_cm: number;
          height_cm: number;
          depth_cm: number;
          volume_l: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          width_cm: number;
          height_cm: number;
          depth_cm: number;
          volume_l: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          width_cm?: number;
          height_cm?: number;
          depth_cm?: number;
          volume_l?: number;
          created_at?: string;
        };
      };
    };
  };
};