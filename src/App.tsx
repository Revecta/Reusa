import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import OngoingSituation from './components/OngoingSituation';
import HowItWorks from './components/HowItWorks';
import Calculator from './components/Calculator';
import Impact from './components/Impact';
import FAQ from './components/FAQ';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import HowItWorksPage from './pages/HowItWorksPage';
import ImpactData from './pages/ImpactData';
import Methodology from './pages/Methodology';
import ResetPasswordPage from './pages/ResetPasswordPage';

// Warehouse/Inventory System
import WarehouseLayout from './components/layout/WarehouseLayout';
import WarehouseDashboard from './pages/warehouse/WarehouseDashboard';
import AuthPage from './pages/auth/AuthPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Reusa App Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/impact-data" element={<ImpactData />} />
        <Route path="/methodology" element={<Methodology />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        
        {/* Reusa Inventory System Routes */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/warehouse" element={<WarehouseLayout />}>
          <Route index element={<WarehouseDashboard />} />
          {/* Add more warehouse routes here as needed */}
        </Route>
        
        {/* Main Landing Page */}
        <Route path="/" element={
          <div className="min-h-screen bg-white">
            <Header />
            <Hero />
            <OngoingSituation />
            <HowItWorks />
            <Calculator />
            <Impact />
            <FAQ />
            <CallToAction />
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;