import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Force Supabase to be unconfigured for main app to use local cache
export const isSupabaseConfigured = false;

// Create a comprehensive mock client with localStorage persistence
const createMockClient = () => {
  // Local storage keys
  const STORAGE_KEYS = {
    USER: 'reusa_user',
    BOXES: 'reusa_boxes',
    SESSION: 'reusa_session'
  };

  // Load data from localStorage
  const loadFromStorage = (key: string, defaultValue: any = null) => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  // Save data to localStorage
  const saveToStorage = (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  };

  // Initialize mock data
  let mockBoxes = loadFromStorage(STORAGE_KEYS.BOXES, [
    {
      id: '1',
      user_id: 'demo-user',
      width_cm: 30,
      height_cm: 20,
      depth_cm: 15,
      volume_l: 9,
      reused: false,
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      user_id: 'demo-user',
      width_cm: 40,
      height_cm: 30,
      depth_cm: 20,
      volume_l: 24,
      reused: false,
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: '3',
      user_id: 'demo-user',
      width_cm: 25,
      height_cm: 25,
      depth_cm: 25,
      volume_l: 15.6,
      reused: true,
      created_at: new Date(Date.now() - 172800000).toISOString(),
    }
  ]);

  let currentUser = loadFromStorage(STORAGE_KEYS.USER, null);
  let authListeners: Array<(event: string, session: any) => void> = [];

  // Save boxes to localStorage whenever they change
  const saveBoxes = () => {
    saveToStorage(STORAGE_KEYS.BOXES, mockBoxes);
  };

  // Save user to localStorage
  const saveUser = (user: any) => {
    currentUser = user;
    saveToStorage(STORAGE_KEYS.USER, user);
    if (user) {
      const session = {
        user,
        access_token: 'demo-token',
        refresh_token: 'demo-refresh',
        expires_at: Date.now() + 3600000,
        token_type: 'bearer'
      };
      saveToStorage(STORAGE_KEYS.SESSION, session);
    } else {
      localStorage.removeItem(STORAGE_KEYS.SESSION);
    }
  };

  return {
    auth: {
      getSession: () => Promise.resolve({ 
        data: { 
          session: currentUser ? loadFromStorage(STORAGE_KEYS.SESSION, null) : null 
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
        const user = {
          id: 'demo-user-id',
          email: email,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          email_confirmed_at: new Date().toISOString(),
          app_metadata: {},
          user_metadata: {}
        };
        
        saveUser(user);
        const session = loadFromStorage(STORAGE_KEYS.SESSION, null);

        // Notify listeners
        setTimeout(() => {
          authListeners.forEach(listener => listener('SIGNED_IN', session));
        }, 100);

        return Promise.resolve({ 
          data: { user, session }, 
          error: null 
        });
      },
      
      signUp: ({ email, password }: { email: string; password: string }) => {
        // Simulate successful signup for demo
        const user = {
          id: 'demo-user-id',
          email: email,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          email_confirmed_at: new Date().toISOString(),
          app_metadata: {},
          user_metadata: {}
        };

        saveUser(user);
        const session = loadFromStorage(STORAGE_KEYS.SESSION, null);

        // Notify listeners
        setTimeout(() => {
          authListeners.forEach(listener => listener('SIGNED_IN', session));
        }, 100);

        return Promise.resolve({ 
          data: { user, session }, 
          error: null 
        });
      },
      
      signOut: () => {
        saveUser(null);
        
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
        
        // Simulate successful OAuth login for demo
        const user = {
          id: 'demo-user-id',
          email: `demo@${provider}.com`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          email_confirmed_at: new Date().toISOString(),
          app_metadata: {},
          user_metadata: { provider }
        };
        
        saveUser(user);
        const session = loadFromStorage(STORAGE_KEYS.SESSION, null);

        // Notify listeners
        setTimeout(() => {
          authListeners.forEach(listener => listener('SIGNED_IN', session));
        }, 100);

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
              const sortedBoxes = [...mockBoxes].sort((a, b) => {
                if (orderColumn === 'created_at' && options?.ascending === false) {
                  return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                }
                return 0;
              });
              return Promise.resolve({ data: sortedBoxes, error: null });
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
            const sortedBoxes = [...mockBoxes].sort((a, b) => {
              if (orderColumn === 'created_at' && options?.ascending === false) {
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
              }
              return 0;
            });
            return Promise.resolve({ data: sortedBoxes, error: null });
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
          saveBoxes();
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
              saveBoxes();
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
              saveBoxes();
              return Promise.resolve({ data: [mockBoxes[index]], error: null });
            }
          }
          return Promise.resolve({ data: null, error: { message: 'Demo mode - item not found' } });
        }
      })
    })
  };
};

export const supabase = createMockClient() as any;

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
          reused?: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          width_cm: number;
          height_cm: number;
          depth_cm: number;
          volume_l: number;
          reused?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          width_cm?: number;
          height_cm?: number;
          depth_cm?: number;
          volume_l?: number;
          reused?: boolean;
          created_at?: string;
        };
      };
    };
  };
};