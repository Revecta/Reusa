import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if Supabase is configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey && supabaseUrl !== 'your_project_url' && supabaseAnonKey !== 'your_api_key');

// Create a comprehensive mock client for when Supabase is not configured
const createMockClient = () => {
  // Mock data for demonstration
  const mockBoxes = [
    {
      id: '1',
      user_id: 'demo-user',
      width_cm: 30,
      height_cm: 20,
      depth_cm: 15,
      volume_l: 9,
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      user_id: 'demo-user',
      width_cm: 40,
      height_cm: 30,
      depth_cm: 20,
      volume_l: 24,
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: '3',
      user_id: 'demo-user',
      width_cm: 25,
      height_cm: 25,
      depth_cm: 25,
      volume_l: 15.6,
      created_at: new Date(Date.now() - 172800000).toISOString(),
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
      
      signUp: ({ email, password }: { email: string; password: string }) => {
        // Simulate successful signup for demo
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
      
      signOut: () => {
        const previousUser = currentUser;
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
      },
      
      updateUser: ({ password }: { password: string }) => {
        console.log('Demo mode: Password would be updated');
        return Promise.resolve({ 
          data: { user: currentUser }, 
          error: null 
        });
      },
      
      signInWithOAuth: ({ provider }: { provider: string }) => {
        console.log('Demo mode: OAuth sign-in with', provider);
        return Promise.resolve({ 
          data: { url: null, provider }, 
          error: null 
        });
      },
    },
    
    from: (table: string) => ({
      select: (columns = '*') => ({
        eq: (column: string, value: any) => ({
          order: (orderColumn: string, options?: any) => {
            if (table === 'boxes' && column === 'user_id' && currentUser) {
              return Promise.resolve({ 
                data: mockBoxes.sort((a, b) => {
                  if (orderColumn === 'created_at' && options?.ascending === false) {
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                  }
                  return 0;
                }), 
                error: null 
              });
            }
            return Promise.resolve({ data: [], error: null });
          },
          single: () => {
            if (table === 'boxes' && currentUser) {
              return Promise.resolve({ data: mockBoxes[0] || null, error: null });
            }
            return Promise.resolve({ data: null, error: null });
          }
        }),
        order: (orderColumn: string, options?: any) => {
          if (table === 'boxes' && currentUser) {
            return Promise.resolve({ 
              data: mockBoxes.sort((a, b) => {
                if (orderColumn === 'created_at' && options?.ascending === false) {
                  return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                }
                return 0;
              }), 
              error: null 
            });
          }
          return Promise.resolve({ data: [], error: null });
        }
      }),
      
      insert: (data: any) => {
        if (table === 'boxes' && currentUser) {
          const newBox = {
            id: Math.random().toString(36).substr(2, 9),
            user_id: currentUser.id,
            ...data,
            created_at: new Date().toISOString()
          };
          mockBoxes.unshift(newBox);
          return Promise.resolve({ data: [newBox], error: null });
        }
        return Promise.resolve({ data: null, error: { message: 'Demo mode - data not persisted' } });
      },
      
      delete: () => ({
        eq: (column: string, value: any) => {
          if (table === 'boxes' && column === 'id' && currentUser) {
            const index = mockBoxes.findIndex(box => box.id === value);
            if (index > -1) {
              mockBoxes.splice(index, 1);
              return Promise.resolve({ data: null, error: null });
            }
          }
          return Promise.resolve({ data: null, error: { message: 'Demo mode - item not found' } });
        }
      }),
      
      update: (data: any) => ({
        eq: (column: string, value: any) => {
          if (table === 'boxes' && column === 'id' && currentUser) {
            const index = mockBoxes.findIndex(box => box.id === value);
            if (index > -1) {
              mockBoxes[index] = { ...mockBoxes[index], ...data };
              return Promise.resolve({ data: [mockBoxes[index]], error: null });
            }
          }
          return Promise.resolve({ data: null, error: { message: 'Demo mode - item not found' } });
        }
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