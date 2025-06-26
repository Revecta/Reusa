import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Package, AlertCircle } from 'lucide-react';
import { useWarehouseAuth } from '../../hooks/useWarehouseAuth';
import { isSupabaseConfigured } from '../../lib/warehouse-supabase';
import LoginForm from '../../components/auth/LoginForm';
import SignUpForm from '../../components/auth/SignUpForm';
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';

type AuthMode = 'login' | 'signup' | 'forgot';

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const { user, loading } = useWarehouseAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/warehouse" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src="/images/reusa-logo.svg" 
              alt="Reusa Logo" 
              className="h-16 w-auto"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Reusa Inventory
          </h1>
          <p className="text-gray-600">
            Professional inventory management system
          </p>
        </div>

        {/* Supabase Connection Warning */}
        {!isSupabaseConfigured && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
              <div>
                <p className="text-yellow-800 font-medium">Database Not Connected</p>
                <p className="text-yellow-700 text-sm">
                  Please configure Supabase to enable authentication and data storage.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Auth Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {mode === 'login' && (
            <LoginForm
              onForgotPassword={() => setMode('forgot')}
              onSignUp={() => setMode('signup')}
            />
          )}

          {mode === 'signup' && (
            <SignUpForm
              onSignIn={() => setMode('login')}
            />
          )}

          {mode === 'forgot' && (
            <ForgotPasswordForm
              onBack={() => setMode('login')}
            />
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>&copy; 2024 Reusa Inventory System. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;