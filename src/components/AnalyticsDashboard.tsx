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
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  LeafyGreen, 
  TrendingDown, 
  DollarSign, 
  PieChart as PieChartIcon 
} from 'lucide-react';

// Mock data for various analytics
const wasteSegregationData = [
  { name: 'Organic', value: 35, target: 40, color: '#4caf50' },
  { name: 'Plastic', value: 25, target: 30, color: '#2196f3' },
  { name: 'Glass', value: 20, target: 25, color: '#ff9800' },
  { name: 'Paper', value: 15, target: 15, color: '#9c27b0' },
  { name: 'Other', value: 5, target: 10, color: '#795548' }
];

const co2EmissionsData = [
  { month: 'Jan', current: 100, previous: 120, reduction: 16.7 },
  { month: 'Feb', current: 95, previous: 115, reduction: 17.4 },
  { month: 'Mar', current: 90, previous: 110, reduction: 18.2 },
  { month: 'Apr', current: 85, previous: 105, reduction: 19.0 },
  { month: 'May', current: 80, previous: 100, reduction: 20.0 },
  { month: 'Jun', current: 75, previous: 95, reduction: 21.1 }
];

const costSavingsData = [
  { category: 'Transport', saved: 15000, total: 50000 },
  { category: 'Processing', saved: 25000, total: 75000 },
  { category: 'Landfill', saved: 10000, total: 40000 }
];

const neighborhoodPerformanceData = [
  { neighborhood: 'Centre', segregationRate: 55, co2Reduction: 18 },
  { neighborhood: 'North', segregationRate: 45, co2Reduction: 15 },
  { neighborhood: 'South', segregationRate: 60, co2Reduction: 20 },
  { neighborhood: 'East', segregationRate: 50, co2Reduction: 16 },
  { neighborhood: 'West', segregationRate: 52, co2Reduction: 17 }
];

export const AnalyticsDashboard = () => {
  const [activeChart, setActiveChart] = useState('waste');

  const chartButtons = [
    { 
      id: 'waste', 
      label: 'Waste Segregation', 
      icon: <LeafyGreen className="w-5 h-5 mr-2" /> 
    },
    { 
      id: 'co2', 
      label: 'CO2 Emissions', 
      icon: <TrendingDown className="w-5 h-5 mr-2" /> 
    },
    { 
      id: 'savings', 
      label: 'Cost Savings', 
      icon: <DollarSign className="w-5 h-5 mr-2" /> 
    },
    { 
      id: 'neighborhood', 
      label: 'Neighborhood', 
      icon: <PieChartIcon className="w-5 h-5 mr-2" /> 
    }
  ];

  const renderChart = () => {
    switch (activeChart) {
      case 'waste':
        return (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Waste Segregation Rate */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Waste Segregation Rates
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={wasteSegregationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {wasteSegregationData.map((entry) => (
                      <Cell key={`cell-${entry.name}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [
                      `${value}%`, 
                      `${name} Waste`
                    ]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Detailed Waste Breakdown */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Waste Segregation Targets
              </h3>
              <div className="space-y-4">
                {wasteSegregationData.map((item) => (
                  <div key={item.name} className="flex items-center">
                    <div 
                      className="w-12 h-12 rounded-full mr-4" 
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="flex-grow">
                      <div className="flex justify-between mb-1">
                        <span className="font-semibold">{item.name}</span>
                        <span>{item.value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-[#4caf50] h-2.5 rounded-full" 
                          style={{ width: `${(item.value / item.target) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'co2':
        return (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              CO2 Emissions Reduction
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={co2EmissionsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="previous" name="Previous Emissions" fill="#ff6384" />
                <Bar dataKey="current" name="Current Emissions" fill="#36a2eb" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Average CO2 Reduction: 
                <span className="font-bold text-[#4caf50] ml-2">
                  {co2EmissionsData[co2EmissionsData.length - 1].reduction}%
                </span>
              </p>
            </div>
          </div>
        );
      
      case 'savings':
        return (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Cost Savings Analysis
            </h3>
            <div className="space-y-4">
              {costSavingsData.map((item) => (
                <div key={item.category} className="bg-gray-100 rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">{item.category}</span>
                    <span className="text-[#4caf50]">
                      €{item.saved.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-[#2196f3] h-2.5 rounded-full" 
                      style={{ width: `${(item.saved / item.total) * 100}%` }}
                    />
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Saved {((item.saved / item.total) * 100).toFixed(1)}% of total costs
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'neighborhood':
        return (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Neighborhood Performance
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={neighborhoodPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="neighborhood" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="segregationRate" name="Segregation Rate" fill="#4caf50" />
                <Bar dataKey="co2Reduction" name="CO2 Reduction" fill="#2196f3" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Chart Navigation */}
      <div className="flex justify-center space-x-4 mb-8">
        {chartButtons.map((button) => (
          <button
            key={button.id}
            onClick={() => setActiveChart(button.id)}
            className={`
              flex items-center px-6 py-3 rounded-xl transition-all duration-300 
              ${activeChart === button.id 
                ? 'bg-[#4caf50] text-white shadow-lg' 
                : 'bg-white text-gray-700 hover:bg-[#e8f5e9] shadow-md'}
            `}
          >
            {button.icon}
            {button.label}
          </button>
        ))}
      </div>

      {/* Dynamic Chart Content */}
      {renderChart()}
    </div>
  );
};

// Updated Performance Chart with more details
export const PerformanceChart = () => (
  <div className="p-6 rounded-lg shadow-lg border border-gray-200">
    <h3 className="text-lg font-semibold mb-4">Monthly Performance Overview</h3>
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={co2EmissionsData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="current" 
            stroke="#4caf50" 
            strokeWidth={3} 
            name="Current Emissions" 
          />
          <Line 
            type="monotone" 
            dataKey="previous" 
            stroke="#ff6384" 
            strokeWidth={3} 
            name="Previous Emissions" 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

// Export for use in main page
export default function AnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <AnalyticsDashboard />
    </div>
  );
}