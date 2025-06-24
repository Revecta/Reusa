import React, { useEffect } from 'react';
import { ArrowLeft, Calculator, Beaker, BarChart3, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Methodology: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const calculations = [
    {
      title: 'CO₂ Emissions per Box',
      formula: 'Surface Area × GSM × CO₂ per gram',
      explanation: 'We calculate the surface area of each box, multiply by the cardboard weight (GSM), then apply the CO₂ emission factor per gram of cardboard production.',
      example: '30×20×20cm box = 2,800cm² × 140 GSM × 0.0007 kg CO₂/g = ~65g CO₂'
    },
    {
      title: 'Box Weight Estimation',
      formula: '(Surface Area × GSM) ÷ 1000',
      explanation: 'Box weight is estimated based on surface area and cardboard thickness (GSM - grams per square meter).',
      example: '2,800cm² × 140 GSM ÷ 1000 = ~93g box weight'
    },
    {
      title: 'Volume Calculation',
      formula: 'Length × Width × Height ÷ 1000',
      explanation: 'Volume is calculated in cubic centimeters and converted to liters for easier understanding.',
      example: '30 × 20 × 20 = 12,000cm³ = 12L'
    }
  ];

  const sources = [
    {
      title: 'Cardboard Production Emissions',
      source: 'European Environment Agency (EEA)',
      description: 'CO₂ emission factors for cardboard manufacturing processes',
      reliability: 'High'
    },
    {
      title: 'Packaging Industry Data',
      source: 'FEFCO (European Federation of Corrugated Board Manufacturers)',
      description: 'Industry standards for cardboard specifications and environmental impact',
      reliability: 'High'
    },
    {
      title: 'Lifecycle Assessment Studies',
      source: 'Various peer-reviewed publications',
      description: 'Academic research on packaging lifecycle environmental impact',
      reliability: 'Medium-High'
    },
    {
      title: 'Transportation Emissions',
      source: 'DEFRA UK Government',
      description: 'Conversion factors for transport emissions (car travel equivalents)',
      reliability: 'High'
    }
  ];

  const assumptions = [
    'Single-wall cardboard: 140 GSM average',
    'Double-wall cardboard: 250 GSM average',
    'CO₂ emission factor: 0.7-0.8 kg CO₂ per kg cardboard',
    'Box reuse eliminates 100% of manufacturing emissions',
    'Transportation emissions not included in calculations',
    'Quality boxes can be reused 2-3 times on average'
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
            Our Methodology
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transparency is key to building trust. Here's exactly how we calculate environmental impact 
            and measure the benefits of box reuse.
          </p>
        </div>

        {/* Calculation Methods */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Calculation Methods</h2>
          <div className="space-y-8">
            {calculations.map((calc, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-start mb-6">
                  <div className="bg-emerald-100 p-3 rounded-full mr-4">
                    <Calculator className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{calc.title}</h3>
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <code className="text-emerald-600 font-mono text-lg">{calc.formula}</code>
                    </div>
                    <p className="text-gray-600 mb-4">{calc.explanation}</p>
                    <div className="bg-emerald-50 rounded-lg p-4">
                      <p className="text-emerald-800 font-medium">Example: {calc.example}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Sources */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Data Sources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sources.map((source, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-start mb-4">
                  <Beaker className="h-6 w-6 text-emerald-600 mr-3 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{source.title}</h3>
                    <p className="text-emerald-600 font-medium mb-2">{source.source}</p>
                    <p className="text-gray-600 text-sm mb-3">{source.description}</p>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 mr-2">Reliability:</span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        source.reliability === 'High' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {source.reliability}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assumptions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Key Assumptions</h2>
          <div className="bg-yellow-50 rounded-2xl p-8">
            <div className="flex items-center mb-6">
              <BarChart3 className="h-6 w-6 text-yellow-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">Important Considerations</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assumptions.map((assumption, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{assumption}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Limitations */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Limitations & Future Improvements</h2>
          <div className="bg-blue-50 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Current Limitations</h3>
            <div className="space-y-4 mb-8">
              <p className="text-gray-700">
                • <strong>Transportation emissions:</strong> Our current calculations don't include the CO₂ from transporting boxes, 
                which could offset some environmental benefits in certain scenarios.
              </p>
              <p className="text-gray-700">
                • <strong>Box quality degradation:</strong> We assume boxes maintain quality through multiple uses, 
                but actual reuse cycles may vary.
              </p>
              <p className="text-gray-700">
                • <strong>Regional variations:</strong> Manufacturing emissions can vary by region and production methods.
              </p>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Planned Improvements</h3>
            <div className="space-y-4">
              <p className="text-gray-700">
                • Integration of transportation emissions into impact calculations
              </p>
              <p className="text-gray-700">
                • Real-time tracking of box reuse cycles and quality degradation
              </p>
              <p className="text-gray-700">
                • Regional customization of emission factors
              </p>
              <p className="text-gray-700">
                • Third-party verification of our methodology and calculations
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-emerald-50 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Questions About Our Methodology?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            We believe in complete transparency. If you have questions about our calculations or suggestions for improvements, 
            we'd love to hear from you.
          </p>
          <Link
            to="/contact"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors inline-block"
          >
            Contact Our Team
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Methodology;