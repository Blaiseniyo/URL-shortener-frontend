import React from 'react';

interface QRCodeCardProps {
  url: string;
}

const QRCodeCard: React.FC<QRCodeCardProps> = ({ url }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
      <h2 className="text-xl font-semibold text-white mb-4">QR Code</h2>
      <div className="flex flex-col items-center">
        <div className="bg-white p-4 rounded mb-4">
          {/* This would typically use a QR code library to generate a real QR code */}
          <div className="w-48 h-48 bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600">QR Code for {url}</span>
          </div>
        </div>
        <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded transition duration-200">
          Download QR Code
        </button>
      </div>
    </div>
  );
};

export default QRCodeCard;
