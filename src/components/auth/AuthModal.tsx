import React, { useState } from 'react';
import { X } from 'lucide-react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import ForgotPasswordForm from './ForgotPasswordForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  initialMode?: 'login' | 'signup' | 'forgot';
}

type AuthMode = 'login' | 'signup' | 'forgot';

const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess,
  initialMode = 'login' 
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  const handleSuccess = () => {
    onSuccess?.();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        {mode === 'login' && (
          <LoginForm
            onSuccess={handleSuccess}
            onForgotPassword={() => setMode('forgot')}
            onSignUp={() => setMode('signup')}
          />
        )}

        {mode === 'signup' && (
          <SignUpForm
            onSuccess={handleSuccess}
            onSignIn={() => setMode('login')}
          />
        )}

        {mode === 'forgot' && (
          <ForgotPasswordForm
            onBack={() => setMode('login')}
          />
        )}
      </div>
    </div>
  );
};

export default AuthModal;