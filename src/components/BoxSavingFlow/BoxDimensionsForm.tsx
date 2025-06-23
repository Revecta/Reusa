import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Package, ArrowRight } from 'lucide-react';
import { boxDimensionsSchema, BoxDimensionsFormData } from '../../schemas/boxSchema';
import { calculateVolume } from '../../utils/volumeCalculator';

interface BoxDimensionsFormProps {
  onSubmit: (data: BoxDimensionsFormData & { volume: number }) => void;
  loading?: boolean;
}

const BoxDimensionsForm: React.FC<BoxDimensionsFormProps> = ({ onSubmit, loading = false }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<BoxDimensionsFormData>({
    resolver: zodResolver(boxDimensionsSchema),
    mode: 'onChange',
  });

  const watchedValues = watch();
  const volume = watchedValues.width && watchedValues.height && watchedValues.depth 
    ? calculateVolume(watchedValues) 
    : 0;

  const handleFormSubmit = (data: BoxDimensionsFormData) => {
    const volume = calculateVolume(data);
    onSubmit({ ...data, volume });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Package className="h-8 w-8 text-emerald-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Save Your Box Dimensions
        </h2>
        <p className="text-gray-600">
          Enter the dimensions of your box to calculate its volume and environmental impact
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Width (cm)
            </label>
            <input
              type="number"
              step="0.1"
              {...register('width', { valueAsNumber: true })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              placeholder="30"
            />
            {errors.width && (
              <p className="mt-1 text-sm text-red-600">{errors.width.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Height (cm)
            </label>
            <input
              type="number"
              step="0.1"
              {...register('height', { valueAsNumber: true })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              placeholder="20"
            />
            {errors.height && (
              <p className="mt-1 text-sm text-red-600">{errors.height.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Depth (cm)
            </label>
            <input
              type="number"
              step="0.1"
              {...register('depth', { valueAsNumber: true })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              placeholder="15"
            />
            {errors.depth && (
              <p className="mt-1 text-sm text-red-600">{errors.depth.message}</p>
            )}
          </div>
        </div>

        {volume > 0 && (
          <div className="bg-emerald-50 rounded-xl p-6 text-center">
            <h3 className="text-lg font-semibold text-emerald-800 mb-2">
              Calculated Volume
            </h3>
            <div className="text-3xl font-bold text-emerald-600 mb-2">
              {volume}L
            </div>
            <p className="text-emerald-700 text-sm">
              This box can hold {volume} liters of content
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={!isValid || loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          ) : (
            <>
              Continue
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default BoxDimensionsForm;