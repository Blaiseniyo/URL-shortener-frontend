import React, { useState } from 'react';

interface ShareCardProps {
  url: string;
}

const ShareCard: React.FC<ShareCardProps> = ({ url }) => {
  const [copySuccess, setCopySuccess] = useState('');
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://${url}`)
      .then(() => {
        setCopySuccess('Copied!');
        setTimeout(() => setCopySuccess(''), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
      <h2 className="text-xl font-semibold text-white mb-4">Share</h2>
      <div className="flex flex-col space-y-4">
        <div>
          <label htmlFor="copy-url" className="block text-sm font-medium text-slate-300 mb-2">
            Copy short URL
          </label>
          <div className="flex">
            <input
              id="copy-url"
              type="text"
              readOnly
              value={`https://${url}`}
              className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-l text-white"
            />
            <button 
              onClick={copyToClipboard}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-r"
            >
              {copySuccess || 'Copy'}
            </button>
          </div>
        </div>
        
        <div>
          <p className="block text-sm font-medium text-slate-300 mb-2">Share on social media</p>
          <div className="flex space-x-4">
            <button className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="p-2 bg-blue-400 hover:bg-blue-500 text-white rounded">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </button>
            <button className="p-2 bg-blue-700 hover:bg-blue-800 text-white rounded">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareCard;
