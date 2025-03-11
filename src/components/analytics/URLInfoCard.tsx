import React from 'react';
import formatDate from '../../utils/dateFormat';

interface URLInfoCardProps {
  shortUrl: string;
  originalUrl: string;
  createdAt: string;
}

const URLInfoCard: React.FC<URLInfoCardProps> = ({ shortUrl, originalUrl, createdAt }) => {

  return (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <div className="text-slate-400 text-sm mb-1">Short URL</div>
          <a
            href={`https://${shortUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-cyan-400 hover:underline break-all"
          >
            {shortUrl}
          </a>
        </div>
        <div>
          <div className="text-slate-400 text-sm mb-1">Original URL</div>
          <a
            href={originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-white hover:underline break-all"
          >
            {originalUrl}
          </a>
        </div>
        <div>
          <div className="text-slate-400 text-sm mb-1">Created At</div>
          <div className="text-lg text-white">{formatDate(createdAt)}</div>
        </div>
      </div>
    </div>
  );
};

export default URLInfoCard;
