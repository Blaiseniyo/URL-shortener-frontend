import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import BoostPresenceSection from '../components/BoostPresenceSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 text-white">
      <Header />
      <HeroSection />
      <StatsSection />
      <BoostPresenceSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Home;