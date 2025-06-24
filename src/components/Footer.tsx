import React, { useState } from 'react';
import { Mail, MapPin, Phone, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthModal from './BoxSavingFlow/AuthModal';

const Footer = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const footerSections = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'How It Works', href: '/how-it-works' },
        { name: 'Impact Data', href: '/impact-data' },
        { name: 'Methodology', href: '/methodology' }
      ]
    },
    {
      title: 'Get Started',
      links: [
        { name: 'Sign Up', action: () => setIsAuthModalOpen(true) },
        { name: 'Donate Boxes', href: '#calculator' },
        { name: 'Receive Boxes', href: '#calculator' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'CO₂ Calculator', href: '#calculator' },
        { name: 'Help Center', href: '/contact' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'Community', href: '#faq' }
      ]
    }
  ];

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <>
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <img 
                  src="/images/reusa-logo.svg" 
                  alt="Reusa Logo" 
                  className="h-12 w-auto filter brightness-0 invert"
                />
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Join the movement to reduce waste and carbon emissions through intelligent box reuse. Every box saved makes a difference.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      {link.href ? (
                        link.href.startsWith('#') ? (
                          <a 
                            href={link.href} 
                            className="text-gray-300 hover:text-emerald-400 transition-colors"
                          >
                            {link.name}
                          </a>
                        ) : (
                          <Link 
                            to={link.href} 
                            className="text-gray-300 hover:text-emerald-400 transition-colors"
                          >
                            {link.name}
                          </Link>
                        )
                      ) : (
                        <button
                          onClick={link.action}
                          className="text-gray-300 hover:text-emerald-400 transition-colors text-left"
                        >
                          {link.name}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Information */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-emerald-400 mr-3" />
                <span className="text-gray-300">lazzari@ik.me</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-emerald-400 mr-3" />
                <span className="text-gray-300">+39 051 61 94883</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-emerald-400 mr-3" />
                <span className="text-gray-300">Bologna, Italy</span>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Reusa. All rights reserved. Making sustainability accessible, one box at a time.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default Footer;