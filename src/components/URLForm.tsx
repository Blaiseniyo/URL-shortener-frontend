import React, { useState } from 'react';

interface URLFormProps {
  onSubmit: (data: { originalUrl: string; title?: string; customAlias?: string }) => void;
  initialData?: {
    originalUrl: string;
    title?: string;
    customAlias?: string;
  };
  isEditMode?: boolean;
}

const URLForm: React.FC<URLFormProps> = ({ onSubmit, initialData, isEditMode = false }) => {
  const [originalUrl, setOriginalUrl] = useState(initialData?.originalUrl || '');
  const [title, setTitle] = useState(initialData?.title || '');
  const [customAlias, setCustomAlias] = useState(initialData?.customAlias || '');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!originalUrl) {
      setError('Please enter a URL');
      return;
    }

    try {
      // Simple URL validation
      new URL(originalUrl);
      onSubmit({ originalUrl, title, customAlias });
    } catch (err) {
      setError('Please enter a valid URL');
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-4">
        {isEditMode ? 'Update URL' : 'Shorten a new URL'}
      </h2>

      {error && (
        <div className="mb-4 bg-red-900/30 border border-red-500 text-red-300 px-3 py-2 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="originalUrl" className="block text-sm font-medium text-slate-300 mb-1">
            Original URL*
          </label>
          <input
            type="text"
            id="originalUrl"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="https://example.com/my-long-url"
            required
          />
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-1">
            Title (optional)
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="My awesome link"
          />
        </div>

        <div>
          <label htmlFor="customAlias" className="block text-sm font-medium text-slate-300 mb-1">
            Custom Alias (optional)
          </label>
          <div className="flex items-center">
            <span className="bg-slate-600 text-slate-300 p-2 rounded-l">{import.meta.env.VITE_BACKEND_URL}/</span>
            <input
              type="text"
              id="customAlias"
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value)}
              className="w-full p-2 bg-slate-700 border border-slate-600 rounded-r text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="my-custom-link"
            />
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Leave blank to generate a random alias
          </p>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded transition duration-200"
        >
          {isEditMode ? 'Update Link' : 'Shorten URL'}
        </button>
      </form>
    </div>
  );
};

export default URLForm;
