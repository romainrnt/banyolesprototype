'use client'

import { useState } from 'react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ComposedChart
} from 'recharts';
import { 
  TrendingUp, 
  Target, 
  DollarSign, 
  LeafyGreen 
} from 'lucide-react';

// Mock data for overview
const overviewData = [
  { 
    month: 'Jan', 
    recyclingRate: 45, 
    co2Reduction: 10, 
    costSavings: 25000,
    communityPoints: 15000
  },
  { 
    month: 'Feb', 
    recyclingRate: 48, 
    co2Reduction: 11, 
    costSavings: 28000,
    communityPoints: 18000
  },
  { 
    month: 'Mar', 
    recyclingRate: 50, 
    co2Reduction: 12, 
    costSavings: 32000,
    communityPoints: 22000
  },
  { 
    month: 'Apr', 
    recyclingRate: 52, 
    co2Reduction: 14, 
    costSavings: 35000,
    communityPoints: 25000
  },
  { 
    month: 'May', 
    recyclingRate: 55, 
    co2Reduction: 15, 
    costSavings: 38000,
    communityPoints: 28000
  },
  { 
    month: 'Jun', 
    recyclingRate: 50, 
    co2Reduction: 12, 
    costSavings: 40000,
    communityPoints: 30000
  }
];

export const PerformanceChart = () => {
  const [activeChart, setActiveChart] = useState<'recycling' | 'emissions' | 'savings'>('recycling');

  const chartButtons = [
    { 
      id: 'recycling', 
      label: 'Recycling Rate', 
      icon: <LeafyGreen className="w-5 h-5 mr-2" />,
      color: '#4caf50'
    },
    { 
      id: 'emissions', 
      label: 'CO2 Reduction', 
      icon: <TrendingUp className="w-5 h-5 mr-2" />,
      color: '#2196f3'
    },
    { 
      id: 'savings', 
      label: 'Cost Savings', 
      icon: <DollarSign className="w-5 h-5 mr-2" />,
      color: '#ff9800'
    }
  ];

  const renderChart = () => {
    switch (activeChart) {
      case 'recycling':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={overviewData}>
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Bar 
                yAxisId="left" 
                dataKey="recyclingRate" 
                fill="#4caf50" 
                name="Recycling Rate (%)" 
              />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="communityPoints" 
                stroke="#ff5722" 
                name="Community Points" 
              />
            </ComposedChart>
          </ResponsiveContainer>
        );
      
      case 'emissions':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={overviewData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="co2Reduction" 
                fill="#2196f3" 
                name="CO2 Reduction (%)" 
              />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'savings':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={overviewData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`€${value.toLocaleString()}`, 'Cost Savings']} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="costSavings" 
                stroke="#ff9800" 
                strokeWidth={3} 
                name="Cost Savings (€)" 
              />
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Chart Navigation */}
      <div className="flex justify-center space-x-4 mb-6">
        {chartButtons.map((button) => (
          <button
            key={button.id}
            onClick={() => setActiveChart(button.id as any)}
            className={`
              flex items-center px-6 py-3 rounded-xl transition-all duration-300 
              ${activeChart === button.id 
                ? `bg-[${button.color}] text-white shadow-lg` 
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'}
            `}
          >
            {button.icon}
            {button.label}
          </button>
        ))}
      </div>

      {/* Chart Container */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          {chartButtons.find(b => b.id === activeChart)?.label} Performance
        </h3>
        {renderChart()}
      </div>

      {/* Quick Insights */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            title: 'Monthly Insights',
            description: 'Average recycling rate increased by 5% this quarter',
            icon: <LeafyGreen className="w-10 h-10 text-[#4caf50]" />
          },
          {
            title: 'CO2 Impact',
            description: 'Reduced emissions by 12% compared to previous year',
            icon: <TrendingUp className="w-10 h-10 text-[#2196f3]" />
          },
          {
            title: 'Financial Benefit',
            description: 'Saved €40,000 in waste management costs',
            icon: <DollarSign className="w-10 h-10 text-[#ff9800]" />
          }
        ].map((insight, index) => (
          <div 
            key={index} 
            className="bg-white rounded-2xl shadow-md p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow"
          >
            {insight.icon}
            <div>
              <h4 className="font-bold text-gray-800">{insight.title}</h4>
              <p className="text-sm text-gray-600">{insight.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};