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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
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