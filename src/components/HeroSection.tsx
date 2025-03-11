import React, { useState } from 'react';

const HeroSection: React.FC = () => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This will redirect to login if not authenticated
    window.location.href = '/login';
  };

  return (
    <section className="container mx-auto py-20 px-4 text-center">
      <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
        Build stronger digital connections
      </h1>
      <p className="text-xl mb-10 max-w-2xl mx-auto">
        Use our URL shortener, and landing pages to engage your audience with stunning visuals.
      </p>

      {/* URL Shortener Box */}
      <div className="bg-white rounded-lg p-10 max-w-3xl mx-auto shadow-2xl">
        <h2 className="text-gray-900 text-3xl font-bold mb-2">Shorten your long link</h2>
        <p className="text-gray-700 mb-4">Quick, easy, and click-worthy.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="url"
            placeholder="https://example.com/my-long-url"
            className="w-full p-4 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            value={url}
            onChange={e => setUrl(e.target.value)}
            required
          />
          <button 
            type="submit" 
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-md font-medium transition-transform duration-200 ease-in-out w-full md:w-auto transform hover:scale-105"
          >
            Get your link for free <span className="ml-2">→</span>
          </button>
        </form>
      </div>
    </section>
  );
};

export default HeroSection;
