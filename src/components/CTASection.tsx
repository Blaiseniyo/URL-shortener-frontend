import React from 'react';
import { Link } from 'react-router-dom';

interface FeatureBoxProps {
  emoji: string;
  title: string;
  description: string;
}

const FeatureBox: React.FC<FeatureBoxProps> = ({ emoji, title, description }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-5xl mb-3">{emoji}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-cyan-100">{description}</p>
    </div>
  );
};

const CTASection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-cyan-700 to-cyan-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Start Shortening Today</h2>
        <p className="max-w-2xl mx-auto text-lg mb-8">
          Join thousands of businesses and creators who trust our platform to manage and track their online presence.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
          <Link to="/register" className="bg-white text-cyan-700 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
            Create Free Account
          </Link>
          <Link to="/#" className="border border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white/10 transition-colors">
            View Enterprise Plans
          </Link>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <FeatureBox 
            emoji="🚀" 
            title="Quick Setup" 
            description="Create an account and start shortening URLs in less than a minute."
          />
          <FeatureBox 
            emoji="🔒" 
            title="Secure Links" 
            description="Industry-leading security protocols protect your links and data."
          />
          <FeatureBox 
            emoji="💼" 
            title="Business Ready" 
            description="Enterprise features for teams of all sizes with advanced management."
          />
        </div>
      </div>
    </section>
  );
};

export default CTASection;
