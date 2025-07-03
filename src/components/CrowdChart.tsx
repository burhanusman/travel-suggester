import React from 'react';

interface CrowdChartProps {
  monthlyData: number[];
  selectedMonth?: number;
  height?: number;
  showLabels?: boolean;
}

const CrowdChart: React.FC<CrowdChartProps> = ({ 
  monthlyData, 
  selectedMonth, 
  height = 64, 
  showLabels = true 
}) => {
  const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  const fullMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const getBarColor = (level: number, isSelected: boolean) => {
    if (isSelected) {
      if (level <= 30) return 'bg-green-500 ring-2 ring-green-400';
      if (level <= 60) return 'bg-yellow-500 ring-2 ring-yellow-400';
      return 'bg-red-500 ring-2 ring-red-400';
    } else {
      if (level <= 30) return 'bg-green-400 opacity-70';
      if (level <= 60) return 'bg-yellow-400 opacity-70';
      return 'bg-red-400 opacity-70';
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-end space-x-1" style={{ height: `${height}px` }}>
        {monthlyData.map((level, index) => (
          <div
            key={index}
            className={`flex-1 rounded-t transition-all duration-300 ${getBarColor(
              level, 
              selectedMonth !== undefined && index + 1 === selectedMonth
            )}`}
            style={{ height: `${(level / 100) * 100}%` }}
            title={`${fullMonths[index]}: ${level}% crowds`}
          >
            <div className="w-full h-full flex items-end justify-center pb-1">
              {selectedMonth !== undefined && index + 1 === selectedMonth && (
                <span className="text-xs text-white font-bold">{level}%</span>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {showLabels && (
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          {months.map((month, index) => (
            <span 
              key={index} 
              className={`flex-1 text-center ${
                selectedMonth !== undefined && index + 1 === selectedMonth 
                  ? 'font-bold text-gray-800' 
                  : ''
              }`}
            >
              {month}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default CrowdChart; 