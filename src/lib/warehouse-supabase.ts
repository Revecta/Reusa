import { createClient } from '@supabase/supabase-js';
import { Profile, Product, Category, Location, Movement, Notification } from '../types/warehouse';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey && supabaseUrl !== 'your_project_url' && supabaseAnonKey !== 'your_api_key');

// Create a comprehensive mock client for when Supabase is not configured
const createMockClient = () => {
  // Mock data for warehouse management
  const mockProfiles: Profile[] = [
    {
      id: 'demo-user-1',
      email: 'admin@demo.com',
      full_name: 'Demo Admin',
      role: 'ADMIN',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  const mockCategories: Category[] = [
    { id: '1', name: 'Electronics', description: 'Electronic devices', color: '#3B82F6', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '2', name: 'Furniture', description: 'Office furniture', color: '#8B5CF6', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '3', name: 'Tools', description: 'Hand tools', color: '#F59E0B', created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
  ];

  const mockLocations: Location[] = [
    { id: '1', name: 'A1-01', description: 'Zone A, Aisle 1', zone: 'A', aisle: '1', shelf: '01', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '2', name: 'A1-02', description: 'Zone A, Aisle 1', zone: 'A', aisle: '1', shelf: '02', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '3', name: 'B1-01', description: 'Zone B, Aisle 1', zone: 'B', aisle: '1', shelf: '01', created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
  ];

  const mockProducts: Product[] = [
    {
      id: '1',
      code: 'LAPTOP001',
      name: 'Business Laptop',
      description: 'High-performance laptop for business use',
      category_id: '1',
      location_id: '1',
      length_m: 0.35,
      width_m: 0.25,
      height_m: 0.02,
      volume_m3: 0.00175,
      weight_kg: 1.5,
      current_stock: 25,
      min_stock: 10,
      max_stock: 50,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '2',
      code: 'CHAIR001',
      name: 'Office Chair',
      description: 'Ergonomic office chair',
      category_id: '2',
      location_id: '2',
      length_m: 0.6,
      width_m: 0.6,
      height_m: 1.2,
      volume_m3: 0.432,
      weight_kg: 15,
      current_stock: 8,
      min_stock: 5,
      max_stock: 20,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  let currentUser = null;
  let authListeners: Array<(event: string, session: any) => void> = [];

  return {
    auth: {
      getSession: () => Promise.resolve({ 
        data: { 
          session: currentUser ? {
            user: currentUser,
            access_token: 'demo-token',
            refresh_token: 'demo-refresh',
            expires_at: Date.now() + 3600000,
            token_type: 'bearer'
          } : null 
        }, 
        error: null 
      }),
      
      onAuthStateChange: (callback: (event: string, session: any) => void) => {
        authListeners.push(callback);
        return { 
          data: { 
            subscription: { 
              unsubscribe: () => {
                authListeners = authListeners.filter(listener => listener !== callback);
              } 
            } 
          } 
        };
      },
      
      signInWithPassword: ({ email, password }: { email: string; password: string }) => {
        // Simulate successful login for demo
        currentUser = {
          id: 'demo-user-id',
          email: email,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          email_confirmed_at: new Date().toISOString(),
          app_metadata: {},
          user_metadata: {}
        };
        
        const session = {
          user: currentUser,
          access_token: 'demo-token',
          refresh_token: 'demo-refresh',
          expires_at: Date.now() + 3600000,
          token_type: 'bearer'
        };

        // Notify listeners
        setTimeout(() => {
          authListeners.forEach(listener => listener('SIGNED_IN', session));
        }, 100);

        return Promise.resolve({ 
          data: { user: currentUser, session }, 
          error: null 
        });
      },
      
      signUp: ({ email, password, options }: { email: string; password: string; options?: any }) => {
        // Simulate successful signup for demo
        currentUser = {
          id: 'demo-user-id',
          email: email,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          email_confirmed_at: new Date().toISOString(),
          app_metadata: {},
          user_metadata: options?.data || {}
        };

        const session = {
          user: currentUser,
          access_token: 'demo-token',
          refresh_token: 'demo-refresh',
          expires_at: Date.now() + 3600000,
          token_type: 'bearer'
        };

        // Notify listeners
        setTimeout(() => {
          authListeners.forEach(listener => listener('SIGNED_IN', session));
        }, 100);

        return Promise.resolve({ 
          data: { user: currentUser, session }, 
          error: null 
        });
      },
      
      signOut: () => {
        currentUser = null;
        
        // Notify listeners
        setTimeout(() => {
          authListeners.forEach(listener => listener('SIGNED_OUT', null));
        }, 100);

        return Promise.resolve({ error: null });
      },
      
      resetPasswordForEmail: (email: string) => {
        console.log('Demo mode: Password reset email would be sent to:', email);
        return Promise.resolve({ 
          data: { message: 'Demo mode: Password reset email sent' }, 
          error: null 
        });
      }
    },
    
    from: (table: string) => ({
      select: (columns = '*') => ({
        eq: (column: string, value: any) => ({
          order: (orderColumn: string, options?: any) => {
            let data: any[] = [];
            
            switch (table) {
              case 'profiles':
                data = mockProfiles.filter(item => (item as any)[column] === value);
                break;
              case 'categories':
                data = mockCategories.filter(item => (item as any)[column] === value);
                break;
              case 'locations':
                data = mockLocations.filter(item => (item as any)[column] === value);
                break;
              case 'products':
                data = mockProducts.filter(item => (item as any)[column] === value);
                break;
              case 'movements':
                data = []; // Empty for demo
                break;
              case 'notifications':
                data = []; // Empty for demo
                break;
            }
            
            return Promise.resolve({ data, error: null });
          },
          single: () => {
            let data: any = null;
            
            switch (table) {
              case 'profiles':
                data = mockProfiles.find(item => (item as any)[column] === value) || null;
                break;
              case 'categories':
                data = mockCategories.find(item => (item as any)[column] === value) || null;
                break;
              case 'locations':
                data = mockLocations.find(item => (item as any)[column] === value) || null;
                break;
              case 'products':
                data = mockProducts.find(item => (item as any)[column] === value) || null;
                break;
            }
            
            return Promise.resolve({ data, error: null });
          },
          range: (from: number, to: number) => {
            let data: any[] = [];
            
            switch (table) {
              case 'products':
                data = mockProducts.slice(from, to + 1);
                break;
              case 'categories':
                data = mockCategories.slice(from, to + 1);
                break;
              case 'locations':
                data = mockLocations.slice(from, to + 1);
                break;
            }
            
            return Promise.resolve({ data, error: null, count: data.length });
          }
        }),
        order: (orderColumn: string, options?: any) => {
          let data: any[] = [];
          
          switch (table) {
            case 'profiles':
              data = [...mockProfiles];
              break;
            case 'categories':
              data = [...mockCategories];
              break;
            case 'locations':
              data = [...mockLocations];
              break;
            case 'products':
              data = [...mockProducts];
              break;
            case 'movements':
              data = []; // Empty for demo
              break;
            case 'notifications':
              data = []; // Empty for demo
              break;
          }
          
          return Promise.resolve({ data, error: null });
        },
        range: (from: number, to: number) => {
          let data: any[] = [];
          
          switch (table) {
            case 'products':
              data = mockProducts.slice(from, to + 1);
              break;
            case 'categories':
              data = mockCategories.slice(from, to + 1);
              break;
            case 'locations':
              data = mockLocations.slice(from, to + 1);
              break;
          }
          
          return Promise.resolve({ data, error: null, count: data.length });
        }
      }),
      
      insert: (data: any) => ({
        select: () => Promise.resolve({ 
          data: [{ id: Math.random().toString(36).substr(2, 9), ...data, created_at: new Date().toISOString() }], 
          error: null 
        })
      }),
      
      update: (data: any) => ({
        eq: (column: string, value: any) => ({
          select: () => Promise.resolve({ 
            data: [{ id: value, ...data, updated_at: new Date().toISOString() }], 
            error: null 
          })
        })
      }),
      
      delete: () => ({
        eq: (column: string, value: any) => Promise.resolve({ data: null, error: null })
      })
    })
  };
};

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