import React from 'react';
import { ArrowLeft, Leaf, TrendingUp, Package, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const ImpactData: React.FC = () => {
  const impactStats = [
    {
      category: 'Environmental Impact',
      stats: [
        { label: 'CO₂ Emissions Prevented', value: '650kg', description: 'Equivalent to 1,600km of car travel' },
        { label: 'Boxes Saved from Waste', value: '10,000+', description: 'Diverted from landfills and recycling' },
        { label: 'Trees Saved', value: '120', description: 'Estimated based on cardboard production' },
        { label: 'Water Saved', value: '50,000L', description: 'Water not used in manufacturing' }
      ]
    },
    {
      category: 'Community Impact',
      stats: [
        { label: 'Active Users', value: '500+', description: 'Businesses and individuals' },
        { label: 'Partner Businesses', value: '50+', description: 'Local companies participating' },
        { label: 'Cities Served', value: '5', description: 'Across Italy and expanding' },
        { label: 'Successful Matches', value: '2,500+', description: 'Boxes successfully reused' }
      ]
    }
  ];

  const monthlyData = [
    { month: 'Jan 2024', boxes: 450, co2: 29.25 },
    { month: 'Feb 2024', boxes: 680, co2: 44.2 },
    { month: 'Mar 2024', boxes: 920, co2: 59.8 },
    { month: 'Apr 2024', boxes: 1200, co2: 78 },
    { month: 'May 2024', boxes: 1450, co2: 94.25 },
    { month: 'Jun 2024', boxes: 1680, co2: 109.2 }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center">
              <img 
                src="/images/reusa-logo.svg" 
                alt="Reusa Logo" 
                className="h-12 w-auto"
              />
            </Link>
            <Link
              to="/"
              className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Impact Data
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real data showing the environmental and community impact of the Reusa platform. 
            Every box reused makes a measurable difference.
          </p>
        </div>

        {/* Impact Statistics */}
        <div className="space-y-12 mb-16">
          {impactStats.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">{category.category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.stats.map((stat, statIndex) => (
                  <div key={statIndex} className="bg-emerald-50 rounded-2xl p-6 text-center">
                    <div className="text-3xl font-bold text-emerald-600 mb-2">{stat.value}</div>
                    <div className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</div>
                    <div className="text-sm text-gray-600">{stat.description}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Monthly Progress */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Monthly Progress</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Month</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Boxes Reused</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">CO₂ Saved (kg)</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Growth</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((data, index) => {
                  const prevMonth = index > 0 ? monthlyData[index - 1] : null;
                  const growth = prevMonth ? ((data.boxes - prevMonth.boxes) / prevMonth.boxes * 100).toFixed(1) : 0;
                  
                  return (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium text-gray-900">{data.month}</td>
                      <td className="py-4 px-4 text-center text-emerald-600 font-semibold">{data.boxes.toLocaleString()}</td>
                      <td className="py-4 px-4 text-center text-green-600 font-semibold">{data.co2}</td>
                      <td className="py-4 px-4 text-center">
                        {index > 0 && (
                          <span className="text-emerald-600 font-semibold">+{growth}%</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Impact Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-red-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Package className="h-6 w-6 text-red-600 mr-2" />
              Without Reusa
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">10,000 boxes manufactured</span>
                <span className="font-semibold text-red-600">650kg CO₂</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cardboard waste</span>
                <span className="font-semibold text-red-600">2.5 tons</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Trees cut down</span>
                <span className="font-semibold text-red-600">120 trees</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Water consumption</span>
                <span className="font-semibold text-red-600">50,000L</span>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Leaf className="h-6 w-6 text-emerald-600 mr-2" />
              With Reusa
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">10,000 boxes reused</span>
                <span className="font-semibold text-emerald-600">0kg CO₂</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Waste diverted</span>
                <span className="font-semibold text-emerald-600">2.5 tons</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Trees saved</span>
                <span className="font-semibold text-emerald-600">120 trees</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Water saved</span>
                <span className="font-semibold text-emerald-600">50,000L</span>
              </div>
            </div>
          </div>
        </div>

        {/* Future Goals */}
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our 2024 Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">50,000</div>
              <div className="text-gray-600">Boxes Reused</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">3.25 tons</div>
              <div className="text-gray-600">CO₂ Prevented</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">10</div>
              <div className="text-gray-600">Cities Served</div>
            </div>
          </div>
          <p className="text-gray-600 mt-8 max-w-2xl mx-auto">
            Help us reach these ambitious goals by joining the Reusa community and spreading the word about sustainable shipping.
          </p>
        </div>
      </main>
    </div>
  );
};

export default ImpactData;