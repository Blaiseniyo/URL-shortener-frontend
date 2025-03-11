import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { get } from '../api/axiosApi';
import formatDate from '../utils/dateFormat';

// Define the URL data type based on the backend response
interface URLData {
  id: number;
  user_id: number;
  title: string;
  long_url: string;
  short_code: string;
  clicks: number;
  createdAt: string;
  updatedAt: string;
}

// Define the API response structure
interface ApiResponse {
  status: string;
  message: string;
  data: URLData;
}

const URLAnalytics: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [urlData, setUrlData] = useState<URLData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch URL analytics data
  const fetchUrlAnalytics = async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);

    try {
      const response = await get<ApiResponse>(`/analytics/${id}`);
      
      if (response && response.status === 'success' && response.data) {
        setUrlData(response.data);
      } else {
        throw new Error(response?.message || 'Failed to fetch URL details');
      }
    } catch (err: any) {
      console.error('Error fetching URL analytics:', err);
      setError(err.message || 'An error occurred while fetching URL details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrlAnalytics();
  }, [id]);

  // Base URL for short URLs
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('URL copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !urlData) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto bg-slate-800 p-6 rounded-lg border border-slate-700 shadow-lg">
          <div className="flex items-center text-red-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-xl font-bold">Error</h2>
          </div>
          <p className="text-slate-300">{error || 'URL data not found'}</p>
          <div className="mt-6">
            <Link 
              to="/dashboard" 
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded transition-all duration-200 inline-flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Dashboard
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const shortUrl = `${baseUrl}/${urlData.short_code}`;

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <Link to="/dashboard" className="text-cyan-400 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-white">{urlData.title || 'URL Details'}</h1>
            <p className="text-slate-300 mt-1">Analytics for your short link</p>
          </div>
          <Link
            to={`/dashboard/analytics/${id}/edit`}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded transition duration-200"
          >
            Edit URL
          </Link>
        </div>

        {/* URL Info Card */}
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <div className="text-slate-400 text-sm mb-1">Short URL</div>
              <div className="flex items-center">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-cyan-400 hover:underline break-all"
                >
                  {shortUrl}
                </a>
                <button 
                  onClick={() => copyToClipboard(shortUrl)}
                  className="ml-2 text-cyan-400 hover:text-cyan-300"
                  title="Copy to clipboard"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                    <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <div className="text-slate-400 text-sm mb-1">Original URL</div>
              <a
                href={urlData.long_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-white hover:underline break-all"
              >
                {urlData.long_url}
              </a>
            </div>
            <div>
              <div className="text-slate-400 text-sm mb-1">Created At</div>
              <div className="text-lg text-white">{formatDate(urlData.createdAt)}</div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 mb-8 text-center">
          <div className="inline-block relative">
            <div className="text-6xl font-bold text-cyan-400 mb-3">{urlData.clicks}</div>
            <div className="text-slate-300">Total Clicks</div>
            
            {/* Last updated */}
            <div className="mt-4 text-xs text-slate-400">
              Last updated: {formatDate(urlData.updatedAt)}
            </div>
          </div>
        </div>

        {/* QR Code and Share Options */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* QR Code */}
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">QR Code</h2>
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded mb-4">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shortUrl)}`} 
                  alt="QR Code" 
                  className="w-48 h-48"
                />
              </div>
              <button 
                onClick={() => {
                  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(shortUrl)}`;
                  window.open(qrUrl, '_blank');
                }}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded transition duration-200"
              >
                Download QR Code
              </button>
            </div>
          </div>

          {/* Share Options */}
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
                    value={shortUrl}
                    className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-l text-white"
                  />
                  <button 
                    onClick={() => copyToClipboard(shortUrl)}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-r"
                  >
                    Copy
                  </button>
                </div>
              </div>
              
              <div>
                <p className="block text-sm font-medium text-slate-300 mb-2">Share on social media</p>
                <div className="flex space-x-4">
                  <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shortUrl)}`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a 
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shortUrl)}`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-blue-400 hover:bg-blue-500 text-white rounded"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a 
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shortUrl)}`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-blue-700 hover:bg-blue-800 text-white rounded"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Need more data message */}
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 mb-8 text-center">
          <div className="text-slate-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-slate-300">Visit analytics will appear here</h3>
            <p className="mt-2 text-slate-400">
              When people start clicking on your short link, you'll see detailed analytics here.
            </p>
          </div>
          
          <div className="flex justify-center mt-4">
            <button 
              onClick={() => fetchUrlAnalytics()}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh Data
            </button>
          </div>
        </div>
        
        {/* Helpful tips */}
        <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
          <h3 className="text-lg font-medium text-white mb-4">Tips to increase clicks:</h3>
          <ul className="list-disc pl-5 space-y-2 text-slate-300">
            <li>Share your short URL on social media platforms</li>
            <li>Include it in your email signatures</li>
            <li>Add it to your business cards or promotional materials</li>
            <li>Use the QR code for physical marketing materials</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default URLAnalytics;