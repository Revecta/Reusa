import React, { useState } from 'react';
import { ChevronRight, Leaf, Recycle } from 'lucide-react';
import BoxSavingFlow from './BoxSavingFlow/BoxSavingFlow';

const Hero = () => {
  const [isBoxFlowOpen, setIsBoxFlowOpen] = useState(false);

  const scrollToCalculator = () => {
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section className="relative bg-gradient-to-br from-emerald-50 to-green-100 overflow-hidden">
        <div className="absolute inset-0 bg-white/20"></div>
        
        {/* Hero Background Image */}
        <div className="absolute inset-0 opacity-10">
          <img 
            src="/images/Boxes.jpeg" 
            alt="Unused Boxes in the City" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-2 bg-emerald-100 px-4 py-2 rounded-full">
                <Leaf className="h-5 w-5 text-emerald-600" />
                <span className="text-emerald-700 font-medium">Sustainable Shipping</span>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Reimagine Shipping.
              <span className="block text-emerald-600">Revive Every Box.</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Give cardboard boxes a second life, cut waste, and shrink your carbon footprint—one shipment at a time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => setIsBoxFlowOpen(true)}
                className="group bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Start Saving Boxes
                <ChevronRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={scrollToCalculator}
                className="group bg-white hover:bg-gray-50 text-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Recycle className="inline-block mr-2 h-5 w-5" />
                Try the CO₂ Calculator
              </button>
            </div>
          </div>
          
          <div className="mt-16 relative">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-emerald-600">7B</div>
                  <div className="text-gray-600">Boxes shipped annually</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-emerald-600">65g</div>
                  <div className="text-gray-600">CO₂ per box manufacturing</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-emerald-600">0g</div>
                  <div className="text-gray-600">CO₂ when reusing boxes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BoxSavingFlow 
        isOpen={isBoxFlowOpen} 
        onClose={() => setIsBoxFlowOpen(false)} 
      />
    </>
  );
};

export default Hero;