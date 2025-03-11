import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import URLForm from '../components/URLForm';
import { get, post } from '../api/axiosApi';
import URLTable from '../components/URLTable';

// Define interface for URL data
interface URLData {
    id: string;
    title: string;
    short_code: string;
    originalUrl: string;
    clicks: number;
    createdAt: string;
}

// Define interface for user data
interface UserData {
    username: string;
    totalLinks: number;
    totalClicks: number;
    averageClicksPerLink: number;
    latestURLs: URLData[];
}

const initialUserData: UserData = {
    username: '',
    totalLinks: 0,
    totalClicks: 0,
    averageClicksPerLink: 0,
    latestURLs: [],
};

const Dashboard: React.FC = () => {
    const [recentLinks, setRecentLinks] = useState<URLData[]>([]);
    const [userData, setUserData] = useState<UserData>(initialUserData);
    const [isCreating, setIsCreating] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Function to fetch dashboard data
    const fetchDashboardData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await get('/dashboard');

            if (!response) {
                throw new Error('Failed to fetch data');
            }

            console.log('Dashboard data:', response);

            // Update the userData state with the fetched data
            const updatedUserData = {
                username: response.data.username || '',
                totalLinks: response.data.totalLinks || 0,
                totalClicks: response.data.totalClicks || 0,
                averageClicksPerLink: response.data.averageClicksPerLink || 0,
                latestURLs: Array.isArray(response.data.latestURLs) ? response.data.latestURLs : []
            };

            console.log('Updated user data:', updatedUserData);

            setUserData(updatedUserData);

            // Only set recent links if data.latestURLs is a valid array
            if (Array.isArray(response.data.latestURLs)) {
                setRecentLinks(response.data.latestURLs);
            } else {
                setRecentLinks([]);
                console.warn('latestURLs is not an array:', response.data.latestURLs);
            }

        } catch (err: any) {
            console.error('Failed to fetch dashboard data:', err);
            setError(err.message || 'Failed to load dashboard data. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('access_token');

        console.log('Access token:', accessToken);
        
        if (accessToken) {
            localStorage.setItem('access_token', accessToken);
        }

        fetchDashboardData();
    }, []);

    // Create a new short URL
    const handleCreateURL = async (data: { originalUrl: string; title?: string; customAlias?: string }) => {
        try {
            setIsLoading(true);
            const requestBody = {
                url: data.originalUrl,
                title: data.title || "",
                customAlias: data.customAlias || undefined,
            };

            const response = await post('/shorten', requestBody);

            if (!response) {
                throw new Error('No response from server');
            }

            // Update the recent links with the new URL at the top
            await fetchDashboardData();

            // Close the creation form
            setIsCreating(false);

        } catch (err: any) {
            console.error('Failed to create URL:', err);
            setError(err.message || 'Failed to create URL. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto">
                {/* Welcome Banner */}
                <div className="mb-8 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between flex-wrap">
                        <div>
                            <h1 className="text-3xl font-bold text-white">Welcome back{userData.username ? `, ${userData.username}` : ''}</h1>
                            <p className="text-cyan-100 mt-1">Here's how your short links are performing today</p>
                        </div>
                        <button
                            onClick={() => setIsCreating(true)}
                            className="mt-3 sm:mt-0 px-5 py-2.5 bg-white text-cyan-700 rounded-lg shadow-lg hover:bg-cyan-50 transition-all duration-200 font-medium flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Create New URL
                        </button>
                    </div>
                </div>

                {/* Error message */}
                {error && (
                    <div className="mb-8 bg-red-900/30 border border-red-500 rounded-lg p-4 text-red-300">
                        <div className="flex">
                            <svg className="h-5 w-5 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{error}</span>
                            <button
                                onClick={() => setError(null)}
                                className="ml-auto text-red-300 hover:text-red-100"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg hover:shadow-cyan-900/10 hover:border-slate-600 transition-all duration-300">
                        <div className="flex items-center">
                            <div className="p-3 bg-cyan-900/30 rounded-lg mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-slate-400">Total Links</div>
                                <div className="text-2xl font-bold text-white">
                                    {isLoading ? <div className="h-7 w-12 bg-slate-700 animate-pulse rounded"></div> : userData.totalLinks}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg hover:shadow-cyan-900/10 hover:border-slate-600 transition-all duration-300">
                        <div className="flex items-center">
                            <div className="p-3 bg-cyan-900/30 rounded-lg mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-slate-400">Total Clicks</div>
                                <div className="text-2xl font-bold text-white">
                                    {isLoading ? <div className="h-7 w-16 bg-slate-700 animate-pulse rounded"></div> : userData.totalClicks}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg hover:shadow-cyan-900/10 hover:border-slate-600 transition-all duration-300">
                        <div className="flex items-center">
                            <div className="p-3 bg-cyan-900/30 rounded-lg mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-slate-400">Avg. Clicks</div>
                                <div className="text-2xl font-bold text-white">
                                    {isLoading ? <div className="h-7 w-12 bg-slate-700 animate-pulse rounded"></div> : userData.averageClicksPerLink.toFixed(1)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Create URL Form */}
                {isCreating ? (
                    <div className="mb-8">
                        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-lg mb-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-white">Create New Short URL</h2>
                                <button
                                    onClick={() => setIsCreating(false)}
                                    className="text-slate-400 hover:text-white transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            <URLForm onSubmit={handleCreateURL} />
                        </div>
                    </div>
                ) : (
                    <div className="mb-8">
                        <button
                            onClick={() => setIsCreating(true)}
                            className="w-full p-4 border border-dashed border-slate-600 rounded-xl text-slate-400 hover:text-cyan-400 hover:border-cyan-400 transition-colors flex items-center justify-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Create New Short URL
                        </button>
                    </div>
                )}

                {/* Recent Links */}
                <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-700 flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-white">Recent Links</h2>
                        <Link
                            to="/dashboard/urls"
                            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors flex items-center"
                        >
                            View All
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>

                    {isLoading ? (
                        <div className="p-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="mb-4 last:mb-0">
                                    <div className="h-5 bg-slate-700 animate-pulse rounded w-1/3 mb-2"></div>
                                    <div className="h-4 bg-slate-700 animate-pulse rounded w-full"></div>
                                </div>
                            ))}
                        </div>
                    ) : recentLinks.length === 0 ? (
                        <div className="p-10 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <h3 className="text-slate-400 text-lg mb-2">No links yet</h3>
                            <p className="text-slate-500 mb-6">Create your first short URL to get started</p>
                            <button
                                onClick={() => setIsCreating(true)}
                                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded transition-colors"
                            >
                                Create URL
                            </button>
                        </div>
                    ) : (
                        <>
                            <URLTable links={recentLinks} isLoading={isLoading} />

                        </>
                    )}
                </div>

                {/* Refresh Button */}
                <div className="text-center mt-6">
                    <button
                        onClick={fetchDashboardData}
                        disabled={isLoading}
                        className={`px-4 py-2 rounded-md flex items-center mx-auto ${isLoading ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
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
                        {isLoading ? 'Refreshing...' : 'Refresh Data'}
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;