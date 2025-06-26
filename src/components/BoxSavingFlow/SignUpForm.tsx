import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, User, Eye, EyeOff, UserPlus } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import SocialLoginButtons from '../auth/SocialLoginButtons';

const signUpSchema = z.object({
  fullName: z.string().min(2, 'Il nome completo deve essere di almeno 2 caratteri'),
  email: z.string().email('Indirizzo email non valido'),
  password: z.string().min(6, 'La password deve essere di almeno 6 caratteri'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Le password non corrispondono",
  path: ["confirmPassword"],
});

type SignUpFormData = z.infer<typeof signUpSchema>;

interface SignUpFormProps {
  onSuccess?: () => void;
  onSignIn?: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSuccess, onSignIn }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { signUp, isSupabaseConfigured } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: SignUpFormData) => {
    setLoading(true);
    setError('');

    try {
      const { error } = await signUp(data.email, data.password);

      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
        // Don't call onSuccess immediately, wait for email confirmation
      }
    } catch (err) {
      setError('Si è verificato un errore imprevisto');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSuccess = () => {
    onSuccess?.();
  };

  const handleSocialError = (errorMessage: string) => {
    setError(errorMessage);
  };

  if (success) {
    return (
      <div className="w-full max-w-md mx-auto text-center">
        <img 
          src="/images/reusa-logo.svg" 
          alt="Reusa Logo" 
          className="h-16 w-auto mx-auto mb-6"
        />
        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Controlla la tua Email! 📧</h2>
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-6">
          <p className="text-emerald-800 mb-4">
            <strong>Registrazione quasi completata!</strong>
          </p>
          <p className="text-emerald-700 text-sm mb-4">
            Ti abbiamo inviato un'email di benvenuto con un link di conferma. 
            Clicca sul link nell'email per attivare il tuo account e iniziare a salvare scatole!
          </p>
          <div className="bg-white rounded-lg p-4 border border-emerald-200">
            <p className="text-emerald-600 text-sm">
              <strong>💡 Suggerimento:</strong> Se non vedi l'email, controlla la cartella spam o promozioni.
            </p>
          </div>
        </div>
        <button
          onClick={onSignIn}
          className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
        >
          Torna al Login
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <img 
          src="/images/reusa-logo.svg" 
          alt="Reusa Logo" 
          className="h-16 w-auto mx-auto mb-4"
        />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Crea il tuo Account</h2>
        <p className="text-gray-600">Unisciti alla comunità Reusa</p>
      </div>

      {/* Social Login Buttons */}
      <div className="mb-6">
        <SocialLoginButtons 
          onSuccess={handleSocialSuccess}
          onError={handleSocialError}
          useWarehouse={false}
        />
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Oppure continua con email</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome Completo
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              {...register('fullName')}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              placeholder="Mario Rossi"
            />
          </div>
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Indirizzo Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              {...register('email')}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              placeholder="mario@esempio.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Conferma Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              {...register('confirmPassword')}
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={!isValid || loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <UserPlus className="h-5 w-5 mr-2" />
              Crea Account
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <div className="text-gray-600">
          Hai già un account?{' '}
          <button
            onClick={onSignIn}
            className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
          >
            Accedi
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;