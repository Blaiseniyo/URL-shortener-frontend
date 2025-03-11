import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
      <div className="text-cyan-400 text-sm font-medium">{title}</div>
      <div className="text-3xl font-bold text-white mt-2">{value}</div>
    </div>
  );
};

export default StatCard;
