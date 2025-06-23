import React from 'react';
import { Package, CheckCircle, Users, Truck } from 'lucide-react';

const HowItWorks = () => {
  const stats = [
    {
      number: '7 billion',
      description: 'cardboard boxes are shipped annually—most are used just once before ending up as waste.'
    },
    {
      number: '65g',
      description: 'of CO₂ can be emitted manufacturing a single shipping box (depending on size and thickness).'
    },
    {
      number: '100%',
      description: 'reuse rate can cut these emissions sharply, reduce landfill burden, and preserve trees.'
    }
  ];

  const steps = [
    {
      icon: Package,
      title: 'Collect',
      description: 'Gather gently used boxes from businesses and individuals who would otherwise discard them.'
    },
    {
      icon: CheckCircle,
      title: 'Quality Check',
      description: 'Inspect every box for durability and strength to ensure they meet shipping standards.'
    },
    {
      icon: Truck,
      title: 'Distribute',
      description: 'Connect quality boxes to shippers, shops, and anyone who needs them at a fraction of the carbon cost.'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Every Box Matters */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Every Box Matters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="text-3xl font-bold text-emerald-600 mb-4">{stat.number}</div>
                <p className="text-gray-600 leading-relaxed">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reusa Makes Reuse Effortless */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Reusa Makes Reuse Effortless
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our simple three-step process transforms box waste into shipping solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-emerald-200 hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-emerald-200 transition-colors">
                    <step.icon className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-emerald-200 transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;