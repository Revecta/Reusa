import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, ArrowLeft, Send, CheckCircle } from 'lucide-react';
import { useWarehouseAuth } from '../../hooks/useWarehouseAuth';

const forgotPasswordSchema = z.object({
  email: z.string().email('Indirizzo email non valido'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordFormProps {
  onBack?: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onBack }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { resetPassword } = useWarehouseAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setLoading(true);
    setError('');

    try {
      console.log('Tentativo di reset password per:', data.email);
      const { error } = await resetPassword(data.email);

      if (error) {
        console.error('Errore reset password:', error);
        setError(error.message);
      } else {
        console.log('Email di reset inviata con successo');
        setSuccess(true);
      }
    } catch (err) {
      console.error('Errore imprevisto:', err);
      setError('Si è verificato un errore imprevisto');
    } finally {
      setLoading(false);
    }
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
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Controlla la tua Email</h2>
        <p className="text-gray-600 mb-8">
          Abbiamo inviato un link per reimpostare la password al tuo indirizzo email. 
          Controlla la tua casella di posta e segui le istruzioni per reimpostare la password.
        </p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800 text-sm">
            <strong>Nota:</strong> Se non ricevi l'email entro 5 minuti, controlla la cartella spam 
            o riprova con un indirizzo email diverso.
          </p>
        </div>
        <button
          onClick={onBack}
          className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors flex items-center justify-center mx-auto"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
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
          className="h-16 w-auto mx-auto mb-6"
        />
        <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="h-8 w-8 text-orange-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Password Dimenticata?</h2>
        <p className="text-gray-600">Inserisci la tua email per ricevere il link di reset</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              placeholder="la-tua@email.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
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
              <Send className="h-5 w-5 mr-2" />
              Invia Link di Reset
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={onBack}
          className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors flex items-center justify-center mx-auto"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Torna al Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;