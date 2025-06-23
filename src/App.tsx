import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import OngoingSituation from './components/OngoingSituation';
import Calculator from './components/Calculator';
import HowItWorks from './components/HowItWorks';
import Impact from './components/Impact';
import CallToAction from './components/CallToAction';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import DashboardLayout from './components/DashboardLayout';
import { useAuth } from './hooks/useAuth';

function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <OngoingSituation />
      <Calculator />
      <HowItWorks />
      <Impact />
      <CallToAction />
      <FAQ />
      <Footer />
    </div>
  );
}

function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect to home if not authenticated
    window.location.href = '/';
    return null;
  }

  return (
    <DashboardLayout>
      <Dashboard />
    </DashboardLayout>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;