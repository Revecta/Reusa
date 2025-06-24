import React from 'react';
import { ArrowLeft, Package, CheckCircle, Truck, Users, Leaf, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      icon: Package,
      title: 'Collect',
      description: 'Gather gently used boxes from businesses and individuals who would otherwise discard them.',
      details: [
        'Partner with local businesses',
        'Accept donations from individuals',
        'Focus on quality over quantity',
        'Ensure boxes are clean and undamaged'
      ]
    },
    {
      icon: CheckCircle,
      title: 'Quality Check',
      description: 'Inspect every box for durability and strength to ensure they meet shipping standards.',
      details: [
        'Structural integrity assessment',
        'Cleanliness verification',
        'Size and condition documentation',
        'Shipping readiness confirmation'
      ]
    },
    {
      icon: Truck,
      title: 'Distribute',
      description: 'Connect quality boxes to shippers, shops, and anyone who needs them at a fraction of the carbon cost.',
      details: [
        'Match boxes to specific needs',
        'Coordinate pickup and delivery',
        'Track environmental impact',
        'Ensure customer satisfaction'
      ]
    }
  ];

  const benefits = [
    {
      icon: Leaf,
      title: 'Environmental Impact',
      description: 'Reduce CO₂ emissions by up to 100% compared to manufacturing new boxes',
      stats: '65g CO₂ saved per reused box'
    },
    {
      icon: Users,
      title: 'Community Building',
      description: 'Connect local businesses and individuals in a sustainable ecosystem',
      stats: '500+ active community members'
    },
    {
      icon: Package,
      title: 'Cost Savings',
      description: 'Save money while helping the environment with affordable shipping solutions',
      stats: 'Up to 70% cost reduction'
    }
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
            How Reusa Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our simple three-step process transforms box waste into shipping solutions, 
            creating value while protecting the environment.
          </p>
        </div>

        {/* Process Steps */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-emerald-200 hover:shadow-xl transition-all duration-300 group-hover:scale-105 h-full">
                  <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-emerald-200 transition-colors">
                    <step.icon className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start text-sm text-gray-600">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-emerald-200 transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose Reusa?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-emerald-50 rounded-2xl p-8 text-center">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 mb-4">{benefit.description}</p>
                <div className="text-2xl font-bold text-emerald-600">{benefit.stats}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Getting Started */}
        <div className="bg-gray-50 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses and individuals who are already making a difference with Reusa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/#calculator"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors inline-flex items-center justify-center"
            >
              Calculate Your Impact
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="bg-white hover:bg-gray-50 text-emerald-600 border-2 border-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg transition-colors inline-flex items-center justify-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HowItWorksPage;