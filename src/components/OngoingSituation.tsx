import React from 'react';
import { AlertTriangle, TrendingUp, Trash2 } from 'lucide-react';

const OngoingSituation = () => {
  const cityWasteData = [
    {
      image: "/images/Photo1.jpeg",
      alt: "Boxes lining the streets",
      caption: "Cardboard waste accumulates on city streets daily"
    },
    {
      image: "/images/Photo2.jpeg",
      alt: "Overflowing waste bins",
      caption: "Recycling bins overflow with single-use packaging"
    },
    {
      image: "/images/Photo3.jpeg",
      alt: "Discarded packaging in urban areas",
      caption: "Urban areas struggle with mounting packaging waste"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-red-100 p-3 rounded-full">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            The Cost of Cardboard Waste in Our Cities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every day, millions of perfectly good boxes are discarded after a single use, creating mounting waste in urban areas and unnecessary carbon emissions.
          </p>
        </div>

        {/* City Waste Photos */}
        <div className="city-waste-photos grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {cityWasteData.map((item, index) => (
            <div key={index} className="group">
              <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <img 
                  src={item.image} 
                  alt={item.alt}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-medium text-sm leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Problem Statistics */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-red-600" />
              </div>
              <div className="text-3xl font-bold text-red-600 mb-2">7 Billion</div>
              <div className="text-gray-600">Boxes used once then discarded annually</div>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="h-8 w-8 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-orange-600 mb-2">455kg</div>
              <div className="text-gray-600">CO₂ emissions from 7 billion boxes</div>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="text-3xl font-bold text-yellow-600 mb-2">95%</div>
              <div className="text-gray-600">Of boxes could be reused but aren't</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OngoingSituation;