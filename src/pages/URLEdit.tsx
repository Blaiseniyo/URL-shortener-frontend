import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import URLForm from '../components/URLForm';

// Mock data for demonstration
const mockURLData = {
  id: '1',
  originalUrl: 'https://example.com/very/long/url/that/needs/to/be/shortened/for/better/sharing/1',
  title: 'Marketing Campaign',
  customAlias: 'brand1',
  shortUrl: 'short.ly/brand1',
};

const URLEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [urlData, setUrlData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch the URL data based on the ID
    // For now, we're using mock data
    setTimeout(() => {
      setUrlData(mockURLData);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleUpdateURL = (data: { originalUrl: string; title?: string; customAlias?: string }) => {
    // Here you would call your API to update the URL
    console.log('Updating URL:', data);
    
    // For demonstration, we'll just wait and then navigate back
    setTimeout(() => {
      navigate(`/dashboard/urls/${id}`);
    }, 500);
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

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link to={`/dashboard/analytics/${id}`} className="text-cyan-400 hover:underline flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Analytics
          </Link>
          <h1 className="text-3xl font-bold text-white">Edit URL</h1>
          <p className="text-slate-300 mt-1">Update your short link details</p>
        </div>

        <URLForm
          onSubmit={handleUpdateURL}
          initialData={{
            originalUrl: urlData.originalUrl,
            title: urlData.title,
            customAlias: urlData.customAlias,
          }}
          isEditMode={true}
        />
        
        <div className="mt-8 p-6 bg-red-900/20 border border-red-500 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-2">Danger Zone</h2>
          <p className="text-slate-300 mb-4">
            This action cannot be undone. This will permanently delete your URL and all associated analytics.
          </p>
          <button
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition duration-200"
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this URL? This action cannot be undone.')) {
                // Here you would call your API to delete the URL
                console.log('Deleting URL:', id);
                navigate('/dashboard');
              }
            }}
          >
            Delete URL
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default URLEdit;
