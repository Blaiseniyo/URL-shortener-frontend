import React from 'react';
import { Link } from 'react-router-dom';
import formatDate from '../utils/dateFormat';

// Define the URL data type
export interface URLData {
  id: string;
  title?: string;
  short_code: string;
  originalUrl?: string;
  long_url?: string;
  clicks: number;
  createdAt: string;
  shortened_url?: string;
}

interface URLTableProps {
  links: URLData[];
  isLoading?: boolean;
}

const URLTable: React.FC<URLTableProps> = ({ links = [], isLoading = false }) => {
  // Function to copy URL to clipboard
  const copyToClipboard = (shortUrl: string) => {
    navigator.clipboard.writeText(shortUrl)
      .then(() => {
        // Show a more subtle notification instead of alert
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-4 right-4 bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-out';
        toast.textContent = 'URL copied to clipboard';
        document.body.appendChild(toast);
        
        setTimeout(() => {
          document.body.removeChild(toast);
        }, 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  // Get original URL from the URL data (handles different API response formats)
  const getOriginalUrl = (link: URLData): string => {
    return link.originalUrl || link.long_url || '';
  };

  // Get short URL from the URL data (handles different API response formats)
  const getShortUrl = (link: URLData): string => {
    if (link.shortened_url) {
      return link.shortened_url;
    }
    const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/l` || 'http://localhost:3001/l';
    return `${baseUrl}/${link.short_code}`;
  };

  if (isLoading) {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-700">
          <thead className="bg-slate-700/50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                Title & URL
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                Short Link
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                Clicks
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                Created
              </th>
            </tr>
          </thead>
          <tbody>
            {Array(3).fill(0).map((_, index) => (
              <tr key={index}>
                <td className="px-6 py-4">
                  <div className="h-5 bg-slate-700 animate-pulse rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-slate-700 animate-pulse rounded w-full"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-5 bg-slate-700 animate-pulse rounded w-2/3"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-5 bg-slate-700 animate-pulse rounded w-12"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-5 bg-slate-700 animate-pulse rounded w-24"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (links.length === 0) {
    return (
      <div className="p-10 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <h3 className="text-slate-400 text-lg mb-2">No links yet</h3>
        <p className="text-slate-500 mb-6">Create your first short URL to get started</p>
        <Link to="/dashboard" className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded transition-colors">
          Create URL
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-700">
        <thead className="bg-slate-700/50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
              Title & URL
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
              Short Link
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
              Clicks
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
              Created
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700">
          {links.map((link) => (
            <tr key={link.id} className="hover:bg-slate-700/30">
              <td className="px-6 py-4">
                <Link to={`/dashboard/analytics/${link.short_code}`} className="block">
                  <div className="text-sm font-medium text-white truncate max-w-xs">{link.title || ' '}</div>
                  <div className="text-xs text-slate-400 truncate max-w-xs">{getOriginalUrl(link)}</div>
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <span 
                    className="text-sm text-cyan-400 flex items-center cursor-pointer hover:underline" 
                    onClick={() => copyToClipboard(getShortUrl(link))}
                  >
                    {getShortUrl(link)}
                  </span>
                  <button
                    onClick={() => copyToClipboard(getShortUrl(link))}
                    className="ml-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                    title="Copy to clipboard"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16.5 8.25H15V6.75A3.75 3.75 0 0011.25 3h-6A3.75 3.75 0 001.5 6.75v6A3.75 3.75 0 005.25 16.5h1.5v1.5A3.75 3.75 0 0010.5 21h6A3.75 3.75 0 0020.25 17.25v-6A3.75 3.75 0 0016.5 8.25zM5.25 15A2.25 2.25 0 013 12.75v-6A2.25 2.25 0 015.25 4.5h6A2.25 2.25 0 0113.5 6.75v6A2.25 2.25 0 0111.25 15h-6zm12 3A2.25 2.25 0 0115 20.25h-6A2.25 2.25 0 016.75 18v-1.5h4.5A3.75 3.75 0 0015 12.75v-4.5h1.5A2.25 2.25 0 0118.75 10.5v6z" />
                    </svg>
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-slate-300">
                  {link.clicks}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                {formatDate(link.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default URLTable;
