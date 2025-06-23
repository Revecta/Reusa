import React from 'react';
import { CheckCircle, Leaf, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { calculateCO2Savings } from '../../utils/volumeCalculator';

interface SummaryProps {
  volume: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  onStartOver: () => void;
}

const Summary: React.FC<SummaryProps> = ({ volume, dimensions, onStartOver }) => {
  const co2Savings = calculateCO2Savings(volume);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Box Saved Successfully!
        </h2>
        <p className="text-gray-600 text-lg">
          Your box dimensions have been saved to your profile
        </p>
      </div>

      <div className="space-y-6">
        {/* Box Details */}
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <Package className="h-6 w-6 text-emerald-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-900">Box Details</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Dimensions (W×H×D)</p>
              <p className="text-lg font-semibold text-gray-900">
                {dimensions.width} × {dimensions.height} × {dimensions.depth} cm
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Volume</p>
              <p className="text-lg font-semibold text-emerald-600">{volume}L</p>
            </div>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="bg-emerald-50 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <Leaf className="h-6 w-6 text-emerald-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-900">Environmental Impact</h3>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-600 mb-2">
              {co2Savings}g CO₂
            </div>
            <p className="text-emerald-700">
              Potential savings when this box is reused instead of creating a new one
            </p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">What's Next?</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>We'll connect you with others who need boxes of similar size</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>You'll receive notifications when matches are available</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Track your environmental impact in your dashboard</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <button
          onClick={onStartOver}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Add Another Box
        </button>
        <Link
          to="/dashboard"
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
        >
          View Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Summary;