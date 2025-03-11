import React from 'react';

interface DataItem {
  label: string;
  count: number;
}

interface BarChartProps {
  title: string;
  data: DataItem[];
  totalCount: number;
}

const BarChart: React.FC<BarChartProps> = ({ title, data, totalCount }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
      <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="w-32 text-slate-300">{item.label}</div>
            <div className="flex-1 mx-2">
              <div className="bg-slate-700 h-4 rounded-full overflow-hidden">
                <div
                  className="bg-cyan-500 h-full rounded-full"
                  style={{
                    width: `${(item.count / totalCount) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="w-16 text-right text-slate-300">{item.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChart;
