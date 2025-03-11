import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import URLTable, { URLData } from '../components/URLTable';
import Pagination from '../components/Pagination';
import { get } from '../api/axiosApi';

// Define backend URL data structure
interface BackendURLData {
  id: number;
  user_id: number;
  title: string;
  long_url: string;
  short_code: string;
  clicks: number;
  createdAt: string;
  updatedAt: string;
  shortened_url: string;
}

// Define backend response structure
interface ApiResponse {
  status: string;
  message: string;
  data: BackendURLData[];
}

const UserURLs: React.FC = () => {
  const [links, setLinks] = useState<URLData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  
  // Convert backend data to format expected by URLTable
  const convertToURLData = (data: BackendURLData[]): URLData[] => {
    return data.map(item => ({
      id: item.id.toString(),
      title: item.title,
      short_code: item.short_code,
      originalUrl: item.long_url,
      long_url: item.long_url,
      clicks: item.clicks,
      createdAt: item.createdAt,
    }));
  };

  const fetchUserURLs = async (page: number) => {
    setIsLoading(true);
    setError(null);

    try {
      // Build query parameters
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: itemsPerPage.toString(),
      });
      
      if (searchTerm) {
        queryParams.append('search', searchTerm);
      }
      
      if (sortBy) {
        queryParams.append('sort', sortBy);
      }
      
      // Call API with query parameters
      const response = await get<ApiResponse>(`/urls?${queryParams.toString()}`);
      
      if (!response || response.status !== 'success') {
        throw new Error(response?.message || 'Failed to fetch URLs');
      }
      
      console.log('Fetched URLs:', response);
      
      // Set the links from the API response
      if (Array.isArray(response.data)) {
        setLinks(convertToURLData(response.data));
        
        // For demonstration, we're calculating total pages based on array length
        // In a real API, this would typically come from the backend
        setTotalItems(response.data.length);
        setTotalPages(Math.ceil(response.data.length / itemsPerPage));
      } else {
        setLinks([]);
        setTotalItems(0);
        setTotalPages(1);
      }
      
    } catch (err: any) {
      console.error('Failed to fetch user URLs:', err);
      setError(err.message || 'Failed to load URLs. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchUserURLs(page);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  // Handle search and filter application
  const applyFilters = () => {
    setCurrentPage(1); // Reset to first page when filters change
    fetchUserURLs(1);
  };

  // Initial data fetch
  useEffect(() => {
    fetchUserURLs(currentPage);
  }, []);

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">My URLs</h1>
            <p className="text-slate-300 mt-1">Manage all your shortened links</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              to="/dashboard"
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded transition-colors inline-flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Create New URL
            </Link>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 bg-red-900/30 border border-red-500 rounded-lg p-4 text-red-300 flex items-start">
            <svg className="h-5 w-5 text-red-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">{error}</div>
            <button 
              onClick={() => setError(null)} 
              className="text-red-300 hover:text-red-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}

        {/* Search and Filter */}
        <div className="mb-6 bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search by title or URL..."
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <select 
                value={sortBy}
                onChange={handleSortChange}
                className="px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="">Sort by</option>
                <option value="createdAt_desc">Newest first</option>
                <option value="createdAt_asc">Oldest first</option>
                <option value="clicks_desc">Most clicks</option>
                <option value="clicks_asc">Least clicks</option>
              </select>
              <button 
                onClick={applyFilters}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* URLs Table */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
          <URLTable links={links} isLoading={isLoading} />
          
          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-slate-700">
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
              />
              <div className="text-xs text-center text-slate-400 mt-2">
                Showing {Math.min(1 + (currentPage - 1) * itemsPerPage, totalItems)} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} results
              </div>
            </div>
          )}
        </div>
        
        {/* Summary stats */}
        <div className="mt-6 bg-slate-800/50 rounded-lg border border-slate-700 p-4">
          <div className="flex flex-col md:flex-row md:justify-between text-center md:text-left space-y-2 md:space-y-0">
            <div className="text-slate-300">
              <span className="text-cyan-400 font-bold">{totalItems}</span> total URLs
            </div>
            <div className="text-slate-300">
              <span className="text-cyan-400 font-bold">{links.reduce((sum, link) => sum + link.clicks, 0)}</span> total clicks
            </div>
            <div>
              <button
                onClick={() => fetchUserURLs(currentPage)}
                disabled={isLoading}
                className={`px-4 py-2 rounded-md flex items-center mx-auto md:mx-0 ${
                  isLoading ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                }`}
              >
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                )}
                {isLoading ? 'Refreshing...' : 'Refresh URLs'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserURLs;
