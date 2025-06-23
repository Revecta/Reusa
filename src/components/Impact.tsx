import React from 'react';
import { Leaf, Car, TreePine, Recycle } from 'lucide-react';

const Impact = () => {
  const comparisonData = [
    {
      metric: 'CO₂ Emissions',
      reusing: '0g',
      recycling: '~0.7g CO₂/gram',
      reuseBetter: true
    },
    {
      metric: 'Forest Impact',
      reusing: 'No new material needed',
      recycling: 'Energy/water still used',
      reuseBetter: true
    },
    {
      metric: 'Waste Output',
      reusing: '0',
      recycling: 'Some ends up as trash',
      reuseBetter: true
    },
    {
      metric: 'Cost',
      reusing: 'Lower',
      recycling: 'Higher',
      reuseBetter: true
    }
  ];

  return (
    <section id="impact" className="py-20 bg-gradient-to-br from-emerald-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Why Join the Reusa Movement?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See the real difference between reusing and recycling boxes
          </p>
        </div>

        {/* Why Section Images */}
        <div className="why-section-images grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="relative">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center mb-6">
                <div className="bg-emerald-100 p-3 rounded-full mr-4">
                  <Recycle className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Box Reuse Makes a Difference</h3>
              </div>
              <img 
                src="/images/Boxes.jpeg" 
                alt="Boxes ready for reuse"
                className="w-full h-48 object-cover rounded-xl mb-6"
              />
              <p className="text-gray-600 leading-relaxed">
                Instead of creating new boxes, we give existing ones a second life. This simple change eliminates the entire manufacturing process and its associated emissions.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center mb-6">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <TreePine className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Sustainability and Environmental Impact</h3>
              </div>
              <img 
                src="/images/Sustainability.jpeg" 
                alt="Sustainability and environmental impact"
                className="w-full h-48 object-cover rounded-xl mb-6"
              />
              <p className="text-gray-600 leading-relaxed">
                Every reused box represents saved trees, reduced water consumption, and eliminated manufacturing emissions. It's circular economy in action.
              </p>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-lg font-semibold text-gray-900">Impact</th>
                  <th className="px-6 py-4 text-center text-lg font-semibold text-emerald-600">Reusing One Box</th>
                  <th className="px-6 py-4 text-center text-lg font-semibold text-gray-600">Recycling That Box</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {comparisonData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{row.metric}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                        {row.reusing}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                        {row.recycling}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Did You Know */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-emerald-100 p-4 rounded-full">
              <Car className="h-8 w-8 text-emerald-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-4">
            Did you know?
          </h3>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
            Reusing just <span className="font-bold text-emerald-600">100 standard boxes</span> saves as much CO₂ as taking a car off the road for a day.
          </p>
        </div>

        {/* CO₂ Data Table */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Cardboard Box CO₂ Data
          </h3>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Box Type</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-900">Typical GSM</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-900">CO₂ per gram</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-900">Example: 30×20×20cm Box</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Single Wall</td>
                    <td className="px-6 py-4 text-center text-gray-600">140</td>
                    <td className="px-6 py-4 text-center text-gray-600">0.0007 kg</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-red-600 font-semibold">~65g CO₂ emitted</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Double Wall</td>
                    <td className="px-6 py-4 text-center text-gray-600">250</td>
                    <td className="px-6 py-4 text-center text-gray-600">0.0008 kg</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-red-600 font-semibold">~115g CO₂ emitted</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;