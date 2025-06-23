import React, { useState, useEffect } from 'react';
import { Calculator as CalculatorIcon, Leaf } from 'lucide-react';

const Calculator = () => {
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    height: '',
    boxType: 'single'
  });
  
  const [results, setResults] = useState({
    co2Emissions: 0,
    boxWeight: 0
  });

  const boxTypes = {
    single: { gsm: 140, co2PerGram: 0.0007, name: 'Single Wall (140 gsm)' },
    double: { gsm: 250, co2PerGram: 0.0008, name: 'Double Wall (250 gsm)' }
  };

  useEffect(() => {
    calculateCO2();
  }, [dimensions]);

  const calculateCO2 = () => {
    const { length, width, height, boxType } = dimensions;
    
    if (length && width && height) {
      const l = parseFloat(length);
      const w = parseFloat(width);
      const h = parseFloat(height);
      
      // Calculate surface area and estimate box weight
      const surfaceArea = 2 * (l * w + l * h + w * h); // cm²
      const boxTypeData = boxTypes[boxType as keyof typeof boxTypes];
      const estimatedWeight = (surfaceArea * boxTypeData.gsm) / 1000; // grams
      const co2 = estimatedWeight * boxTypeData.co2PerGram * 1000; // grams CO₂
      
      setResults({
        co2Emissions: Math.round(co2),
        boxWeight: Math.round(estimatedWeight)
      });
    } else {
      setResults({ co2Emissions: 0, boxWeight: 0 });
    }
  };

  return (
    <section id="calculator" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-emerald-100 p-3 rounded-full">
              <CalculatorIcon className="h-8 w-8 text-emerald-600" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How Much CO₂ Does Your Box Really Cost?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Enter the dimensions and type of box you use. See how much CO₂ was emitted to make it—and how much you save by reusing it.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              {/* Calculator Inputs */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Box Specifications</h3>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Length (cm)
                    </label>
                    <input
                      type="number"
                      value={dimensions.length}
                      onChange={(e) => setDimensions(prev => ({ ...prev, length: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Width (cm)
                    </label>
                    <input
                      type="number"
                      value={dimensions.width}
                      onChange={(e) => setDimensions(prev => ({ ...prev, width: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      value={dimensions.height}
                      onChange={(e) => setDimensions(prev => ({ ...prev, height: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Box Type
                  </label>
                  <select
                    value={dimensions.boxType}
                    onChange={(e) => setDimensions(prev => ({ ...prev, boxType: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  >
                    <option value="single">Single Wall (standard, 140 gsm)</option>
                    <option value="double">Double Wall (strong, 250 gsm)</option>
                  </select>
                </div>
              </div>

              {/* Results */}
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Leaf className="h-6 w-6 text-emerald-600 mr-2" />
                  Environmental Impact
                </h3>
                
                {results.co2Emissions > 0 ? (
                  <div className="space-y-6">
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-red-600 mb-2">
                          {results.co2Emissions}g
                        </div>
                        <div className="text-gray-600">CO₂ emitted to make this box</div>
                      </div>
                    </div>
                    
                    <div className="bg-emerald-600 text-white rounded-lg p-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold mb-3">
                          Reusing this box saves {results.co2Emissions}g of CO₂!
                        </div>
                        <div className="text-emerald-100">
                          That's equivalent to preventing {Math.round(results.co2Emissions / 404 * 1000)}m of car travel
                        </div>
                      </div>
                    </div>

                    <div className="text-sm text-gray-500 text-center">
                      Box weight: ~{results.boxWeight}g | Based on {boxTypes[dimensions.boxType as keyof typeof boxTypes].name}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-12">
                    <CalculatorIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Enter box dimensions to see the environmental impact</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;