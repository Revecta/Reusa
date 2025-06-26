import React, { useEffect } from 'react';
import { ArrowLeft, Leaf, Target, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutUs: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            About Reusa
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to revolutionize shipping by giving cardboard boxes a second life, 
            reducing waste and carbon emissions one shipment at a time.
          </p>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Leadership Team</h2>
          
          {/* Founder Section */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-48 h-48 rounded-full bg-gray-300 overflow-hidden">
                  <img 
                    src="https://raw.githubusercontent.com/Revecta/reusa/refs/heads/main/public/images/Michele_lazzari_portrait_reusalogolow.png"
                    alt="Michele Lazzari - Founder & CEO"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Michele Lazzari</h3>
                <p className="text-emerald-600 font-semibold mb-6">Founder & CEO</p>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Michele founded Reusa with a simple yet powerful vision: to transform the way we think about packaging waste. 
                    After witnessing the massive amount of perfectly good cardboard boxes being discarded after single use, 
                    he realized there had to be a better way.
                  </p>
                  <p>
                    With a background in environmental engineering and sustainable business practices, Michele has dedicated 
                    his career to finding innovative solutions to environmental challenges. Reusa represents his commitment 
                    to creating a circular economy where waste becomes a resource.
                  </p>
                  <p className="italic text-emerald-700">
                    "Every box has the potential for multiple lives. Our job is to connect those who have boxes with those 
                    who need them, creating value while protecting our planet." - Michele Lazzari
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTO Section */}
          <div className="bg-blue-50 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-48 h-48 rounded-full bg-blue-200 overflow-hidden flex items-center justify-center">
                  <div className="text-6xl text-blue-600">👨‍💻</div>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Federico Collepardo</h3>
                <p className="text-blue-600 font-semibold mb-6">Chief Technology Officer</p>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Federico brings deep technical expertise and innovation to Reusa's mission. With extensive experience 
                    in software architecture, data analytics, and sustainable technology solutions, he leads the development 
                    of our platform's cutting-edge features.
                  </p>
                  <p>
                    His passion for combining technology with environmental impact drives the technical vision behind 
                    Reusa's intelligent matching algorithms, real-time impact tracking, and seamless user experience. 
                    Federico ensures our platform scales efficiently while maintaining our commitment to sustainability.
                  </p>
                  <p className="italic text-blue-700">
                    "Technology should serve both people and planet. At Reusa, we're building systems that make 
                    sustainable choices the easiest choices." - Federico Collepardo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Mission</h3>
            <p className="text-gray-600">
              To eliminate cardboard waste by creating a seamless platform that connects box donors with those who need them, 
              reducing environmental impact while saving costs.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Vision</h3>
            <p className="text-gray-600">
              A world where every cardboard box lives multiple lives, where reuse is the norm, and where businesses 
              and individuals actively participate in the circular economy.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Values</h3>
            <p className="text-gray-600">
              Sustainability, innovation, and community. We believe in making environmental responsibility accessible, 
              practical, and beneficial for everyone involved.
            </p>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="bg-emerald-50 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Impact So Far</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">10,000+</div>
              <div className="text-gray-600">Boxes Saved from Waste</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">650kg</div>
              <div className="text-gray-600">CO₂ Emissions Prevented</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">500+</div>
              <div className="text-gray-600">Community Members</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Our Mission</h2>
          <p className="text-xl text-gray-600 mb-8">
            Ready to make a difference? Start saving boxes and reducing your environmental impact today.
          </p>
          <Link
            to="/"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors inline-block"
          >
            Get Started with Reusa
          </Link>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;