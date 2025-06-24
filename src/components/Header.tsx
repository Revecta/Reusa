import React, { useState } from 'react';
import { Menu, X, User, LogOut, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import BoxSavingFlow from './BoxSavingFlow/BoxSavingFlow';
import AuthModal from './BoxSavingFlow/AuthModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBoxFlowOpen, setIsBoxFlowOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, signOut, loading } = useAuth();

  const navigation = [
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Calculator', href: '#calculator' },
    { name: 'Impact', href: '#impact' },
    { name: 'FAQ', href: '#faq' }
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img 
                src="/images/reusa-logo.svg" 
                alt="Reusa Logo" 
                className="h-12 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-emerald-600 font-medium transition-colors duration-200"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* User Section */}
            <div className="hidden md:flex items-center space-x-4">
              {loading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600"></div>
              ) : user ? (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/dashboard"
                    className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                  <div className="flex items-center space-x-2 text-gray-700">
                    <User className="h-5 w-5" />
                    <span className="text-sm font-medium">{user.email}</span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                    title="Sign out"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors flex items-center"
                  >
                    <LogIn className="h-5 w-5 mr-2" />
                    Login
                  </button>
                  <button
                    onClick={() => setIsBoxFlowOpen(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
                  >
                    Get Started
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-emerald-600 transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-600 hover:text-emerald-600 font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                {user ? (
                  <div className="pt-4 border-t border-gray-200 space-y-3">
                    <Link
                      to="/dashboard"
                      className="block text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{user.email}</span>
                      <button
                        onClick={handleSignOut}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        <LogOut className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-gray-200 space-y-3">
                    <button
                      onClick={() => {
                        setIsAuthModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left text-emerald-600 hover:text-emerald-700 font-medium transition-colors flex items-center"
                    >
                      <LogIn className="h-5 w-5 mr-2" />
                      Login
                    </button>
                    <button
                      onClick={() => {
                        setIsBoxFlowOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200 w-full"
                    >
                      Get Started
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <BoxSavingFlow 
        isOpen={isBoxFlowOpen} 
        onClose={() => setIsBoxFlowOpen(false)} 
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default Header;