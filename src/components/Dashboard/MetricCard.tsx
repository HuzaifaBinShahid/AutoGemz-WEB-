import type { ReactNode } from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  change?: {
    value: string;
    percentage: string;
    isPositive: boolean;
  };
  icon: ReactNode;
}

const MetricCard = ({ title, value, subtitle, change, icon }: MetricCardProps) => {
  return (
    <div className="bg-white p-6 flex items-center justify-between" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="flex-1">
        <p className="text-[16px] text-[#1F293799] mb-1 font-medium">{title}</p>
        <h3 className="text-2xl font-bold mb-2" style={{ color: '#DC3729' }}>
          {value}
        </h3>
        {subtitle && (
          <p className="text-sm text-gray-500">{subtitle}</p>
        )}
        {change && (
          <div className="flex items-center gap-1 mt-2">
            {change.isPositive ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 4L12 8H9V12H7V8H4L8 4Z" fill="#10B981" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 12L4 8H7V4H9V8H12L8 12Z" fill="#DC3729" />
              </svg>
            )}
            <span className={`text-sm font-medium ${change.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {change.value} ({change.percentage})
            </span>
          </div>
        )}
      </div>
      <div className="ml-4">
        {icon}
      </div>
    </div>
  );
};

export default MetricCard;
