import { createClient } from '@supabase/supabase-js';
import { Profile, Product, Category, Location, Movement, Notification } from '../types/warehouse';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

// Create a mock client for when Supabase is not configured
const createMockClient = () => ({
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
    signUp: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
    signOut: () => Promise.resolve({ error: null }),
    resetPasswordForEmail: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        order: () => Promise.resolve({ data: [], error: null }),
        single: () => Promise.resolve({ data: null, error: null }),
      }),
      order: () => Promise.resolve({ data: [], error: null }),
      range: () => Promise.resolve({ data: [], error: null, count: 0 }),
    }),
    insert: () => ({
      select: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
    }),
    update: () => ({
      eq: () => ({
        select: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      }),
    }),
    delete: () => ({
      eq: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
    }),
  }),
});

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : createMockClient() as any;

// Database types
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>;
      };
      categories: {
        Row: Category;
        Insert: Omit<Category, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Category, 'id' | 'created_at' | 'updated_at'>>;
      };
      locations: {
        Row: Location;
        Insert: Omit<Location, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Location, 'id' | 'created_at' | 'updated_at'>>;
      };
      products: {
        Row: Product;
        Insert: Omit<Product, 'id' | 'volume_m3' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Product, 'id' | 'volume_m3' | 'created_at' | 'updated_at'>>;
      };
      movements: {
        Row: Movement;
        Insert: Omit<Movement, 'id' | 'created_at'>;
        Update: Partial<Omit<Movement, 'id' | 'created_at'>>;
      };
      notifications: {
        Row: Notification;
        Insert: Omit<Notification, 'id' | 'created_at'>;
        Update: Partial<Omit<Notification, 'id' | 'created_at'>>;
      };
    };
  };
};