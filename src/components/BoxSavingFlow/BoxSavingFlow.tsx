import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import BoxDimensionsForm from './BoxDimensionsForm';
import AuthModal from './AuthModal';
import Summary from './Summary';
import { BoxDimensionsFormData } from '../../schemas/boxSchema';

interface BoxSavingFlowProps {
  isOpen: boolean;
  onClose: () => void;
}

type FlowStep = 'form' | 'auth' | 'summary';

const BoxSavingFlow: React.FC<BoxSavingFlowProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<FlowStep>('form');
  const [boxData, setBoxData] = useState<BoxDimensionsFormData & { volume: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { user, loading: authLoading } = useAuth();

  const handleFormSubmit = async (data: BoxDimensionsFormData & { volume: number }) => {
    setBoxData(data);
    
    if (!isSupabaseConfigured) {
      setError('Database connection not configured. Please connect to Supabase to save boxes.');
      return;
    }
    
    if (!user) {
      setStep('auth');
      return;
    }

    await saveBox(data);
  };

  const saveBox = async (data: BoxDimensionsFormData & { volume: number }) => {
    if (!user || !isSupabaseConfigured) return;

    setLoading(true);
    setError('');

    try {
      const { error } = await supabase
        .from('boxes')
        .insert({
          user_id: user.id,
          width_cm: data.width,
          height_cm: data.height,
          depth_cm: data.depth,
          volume_l: data.volume,
        });

      if (error) {
        setError(error.message);
      } else {
        setStep('summary');
      }
    } catch (err) {
      setError('Failed to save box data');
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSuccess = async () => {
    if (boxData) {
      await saveBox(boxData);
    }
  };

  const handleStartOver = () => {
    setStep('form');
    setBoxData(null);
    setError('');
  };

  const handleClose = () => {
    setStep('form');
    setBoxData(null);
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl my-8">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
        >
          <X className="h-6 w-6 text-gray-600" />
        </button>

        {/* Supabase Connection Warning */}
        {!isSupabaseConfigured && (
          <div className="mb-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
              <div>
                <p className="text-yellow-800 font-medium">Database Not Connected</p>
                <p className="text-yellow-700 text-sm">
                  To save your box data, please connect to Supabase using the "Connect to Supabase" button in the top right.
                </p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {step === 'form' && (
          <BoxDimensionsForm 
            onSubmit={handleFormSubmit} 
            loading={loading || authLoading}
          />
        )}

        {step === 'summary' && boxData && (
          <Summary
            volume={boxData.volume}
            dimensions={{
              width: boxData.width,
              height: boxData.height,
              depth: boxData.depth,
            }}
            onStartOver={handleStartOver}
          />
        )}

        <AuthModal
          isOpen={step === 'auth'}
          onClose={() => setStep('form')}
          onSuccess={handleAuthSuccess}
        />
      </div>
    </div>
  );
};

export default BoxSavingFlow;