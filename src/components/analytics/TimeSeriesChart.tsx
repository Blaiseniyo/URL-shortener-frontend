import React from 'react';

interface DataPoint {
  date: string;
  count: number;
}

interface TimeSeriesChartProps {
  title: string;
  data: DataPoint[];
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ title, data }) => {
  const maxClicks = Math.max(...data.map(d => d.count));
  
  return (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
      <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
      <div className="h-64">
        <div className="flex h-full items-end space-x-2">
          {data.map((day, index) => {
            const height = (day.count / maxClicks) * 100;
            return (
              <div
                key={index}
                className="flex-1 flex flex-col items-center justify-end group"
              >
                <div className="relative w-full">
                  <div
                    className="bg-cyan-500 hover:bg-cyan-400 transition-all rounded-t"
                    style={{ height: `${height}%` }}
                  ></div>
                  <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-slate-700 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                    {day.count} clicks on {new Date(day.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-xs text-slate-400 mt-1 rotate-45 origin-left">
                  {new Date(day.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimeSeriesChart;
