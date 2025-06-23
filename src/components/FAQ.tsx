import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Are used boxes safe for shipping?",
      answer: "Yes! We only circulate boxes that pass our quality standards—safe, sturdy, and ready for reuse. Each box undergoes a thorough inspection to ensure it meets shipping requirements and can protect your items during transit."
    },
    {
      question: "How do I join Reusa?",
      answer: "Sign up is simple and free! Just create an account, let us know if you want to donate or receive boxes, and we'll handle the rest. We'll connect you with local businesses and individuals in your area."
    },
    {
      question: "What's the environmental impact vs. recycling?",
      answer: "Recycling is good, but reuse is even better! Every box reused avoids the entire CO₂ output of manufacturing a new one. While recycling still requires energy and water, reusing eliminates these processes entirely."
    },
    {
      question: "How do you ensure box quality?",
      answer: "Our quality control process includes checking for structural integrity, cleanliness, and shipping readiness. We only accept boxes that are clean, dry, and free from damage that could compromise their protective capabilities."
    },
    {
      question: "Is there a cost to use Reusa?",
      answer: "Our basic service is free for individuals and small businesses. We offer premium services for larger enterprises that need guaranteed box supplies or specialized logistics support."
    },
    {
      question: "How much CO₂ can I actually save?",
      answer: "The impact varies by box size and type, but even small actions add up. A typical 30×20×20cm single-wall box saves about 65g of CO₂ when reused instead of manufacturing a new one. Use our calculator above to see your specific impact!"
    }
  ];

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about joining the reuse revolution
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;