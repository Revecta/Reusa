import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
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
});

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