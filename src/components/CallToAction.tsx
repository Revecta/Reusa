import React, { useState } from 'react';
import { ArrowRight, Leaf, Users } from 'lucide-react';
import BoxSavingFlow from './BoxSavingFlow/BoxSavingFlow';

const CallToAction = () => {
  const [isBoxFlowOpen, setIsBoxFlowOpen] = useState(false);

  return (
    <>
      <section className="py-20 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full">
                <Leaf className="h-12 w-12 text-white" />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Get Started with Reusa Today!
            </h2>
            <p className="text-xl sm:text-2xl text-emerald-100 mb-4 max-w-3xl mx-auto">
              Ready to save boxes and shrink your footprint?
            </p>
            <p className="text-lg text-emerald-200 mb-12 max-w-2xl mx-auto">
              Join the reuse revolution—backed by real climate data.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={() => setIsBoxFlowOpen(true)}
              className="group bg-white hover:bg-gray-50 text-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Users className="inline-block mr-3 h-5 w-5" />
              Start Reusing
              <ArrowRight className="inline-block ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-4 rounded-xl font-semibold text-lg border-2 border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105">
              Learn More About Impact
            </button>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">Join</div>
              <div className="text-emerald-100">Easy signup process</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">Connect</div>
              <div className="text-emerald-100">Give or receive boxes</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">Impact</div>
              <div className="text-emerald-100">Track your CO₂ savings</div>
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

export default CallToAction;