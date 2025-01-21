import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string;
  subtext: string;
  className?: string;
  icon?: ReactNode;
}

export const StatsCard = ({ 
  title, 
  value, 
  subtext, 
  className = '',
  icon 
}: StatsCardProps) => {
  return (
    <div 
      className={`
        p-6 rounded-2xl shadow-lg border-2 transition-all duration-300 
        hover:scale-105 hover:shadow-xl
        ${className}
      `}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        {icon}
      </div>
      <div className="text-4xl font-bold mb-2" style={{ 
        background: 'linear-gradient(45deg, #4caf50, #2c5e2e)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        {value}
      </div>
      <p className="text-sm text-gray-500">{subtext}</p>
    </div>
  );
};