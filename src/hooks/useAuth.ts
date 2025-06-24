import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Get initial session
    const getInitialSession = async () => {
      try {
        if (isSupabaseConfigured) {
          const { data: { session }, error } = await supabase.auth.getSession();
          if (mounted) {
            if (error) {
              console.error('Error getting session:', error);
            }
            setSession(session);
            setUser(session?.user ?? null);
          }
        } else {
          // For demo purposes, we can simulate a logged-out state
          if (mounted) {
            setSession(null);
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Error in getInitialSession:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    getInitialSession();

    // Listen for auth changes only if Supabase is configured
    let subscription: any = null;
    if (isSupabaseConfigured) {
      const {
        data: { subscription: authSubscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
        }
      });
      subscription = authSubscription;
    }

    return () => {
      mounted = false;
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      return { data: null, error: { message: 'Authentication is available when connected to Supabase. For now, you can explore the demo features.' } };
    }
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signUp = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      return { data: null, error: { message: 'Authentication is available when connected to Supabase. For now, you can explore the demo features.' } };
    }
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `https://reusa.eu/reset-password`,
      },
    });
    return { data, error };
  };

  const signInWithApple = async () => {
    if (!isSupabaseConfigured) {
      return { data: null, error: { message: 'Apple Sign-In is available when connected to Supabase.' } };
    }
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: `https://reusa.eu/`,
      },
    });
    return { data, error };
  };

  const signOut = async () => {
    if (!isSupabaseConfigured) {
      return { error: null };
    }
    
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const resetPassword = async (email: string) => {
    if (!isSupabaseConfigured) {
      return { data: null, error: { message: 'Password reset is available when connected to Supabase.' } };
    }
    
    console.log('Invio email di reset per:', email);
    console.log('URL di redirect:', 'https://reusa.eu/reset-password');
    
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://reusa.eu/reset-password',
    });
    
    console.log('Risultato reset password:', { data, error });
    return { data, error };
  };

  const updatePassword = async (newPassword: string) => {
    if (!isSupabaseConfigured) {
      return { data: null, error: { message: 'Password update is available when connected to Supabase.' } };
    }
    
    console.log('Tentativo di aggiornamento password...');
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    });
    
    console.log('Risultato aggiornamento password:', { data, error });
    return { data, error };
  };

  return {
    user,
    session,
    loading,
    signIn,
    signUp,
    signInWithApple,
    signOut,
    resetPassword,
    updatePassword,
    isSupabaseConfigured,
  };
}