import React from 'react';

const StatsSection: React.FC = () => {
  return (
    <section className="bg-slate-100 py-16 text-slate-800">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Trusted by millions worldwide</h2>
        <p className="text-lg mb-12 max-w-3xl mx-auto">
          Our platform has become the industry standard for URL shortening, providing reliable service to businesses and individuals across the globe.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard number="500K+" text="Global paying customers" subtext="From startups to Fortune 500 companies" />
          <StatCard number="256M" text="Links & QR Codes monthly" subtext="Processing billions of clicks with 99.9% uptime" />
          <StatCard number="800+" text="App integrations" subtext="Seamlessly connect with your favorite tools" />
          <StatCard number="10B" text="Clicks & scans monthly" subtext="Delivering insights from every interaction" />
        </div>
      </div>
    </section>
  );
};

interface StatCardProps {
  number: string;
  text: string;
  subtext: string;
}

const StatCard: React.FC<StatCardProps> = ({ number, text, subtext }) => {
  return (
    <div className="bg-white p-8 rounded-md shadow-md hover:shadow-lg transition-shadow">
      <div className="text-4xl font-bold text-cyan-500 mb-2">{number}</div>
      <div className="text-slate-600">{text}</div>
      <p className="mt-2 text-slate-500 text-sm">{subtext}</p>
    </div>
  );
};

export default StatsSection;
