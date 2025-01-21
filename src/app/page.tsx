'use client'

import { useState } from 'react';
import { StatsCard } from '@/components/StatsCard';
import { PerformanceChart } from '@/components/PerformanceCharts';
import { QRScanner } from '@/components/QRScanner';
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';
import { BarChart2, QrCode, Target } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <BarChart2 className="w-5 h-5 mr-2" />
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <Target className="w-5 h-5 mr-2" />
    },
    {
      id: 'scanner',
      label: 'Scanner',
      icon: <QrCode className="w-5 h-5 mr-2" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9f0] to-[#e6f3e6] text-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#2c5e2e] mb-4">
            Banyoles Waste Management
          </h1>
          <p className="text-xl text-gray-600">
            Your sustainable journey starts here
          </p>
        </div>

        {/* Navigation */}
        <div className="flex space-x-4 justify-center mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center px-6 py-3 rounded-xl transition-all duration-300
                ${activeTab === tab.id
                  ? 'bg-[#4caf50] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-[#e8f5e9] shadow-md'}
              `}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <StatsCard
            title="Recycling Rate"
            value="50%"
            subtext="+15% from last month"
            className="border-[#4caf50] hover:shadow-[#4caf50]/30"
          />
          <StatsCard
            title="CO2 Reduction"
            value="12%"
            subtext="152,000€ annual savings"
            className="border-[#2196f3] hover:shadow-[#2196f3]/30"
          />
          <StatsCard
            title="Community Points"
            value="75,430"
            subtext="24,570 until next milestone"
            className="border-[#ff9800] hover:shadow-[#ff9800]/30"
          />
        </div>

        {/* Dynamic Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {activeTab === 'overview' && <PerformanceChart />}
          {activeTab === 'analytics' && <AnalyticsDashboard />}
          {activeTab === 'scanner' && <QRScanner />}
        </div>
      </div>
    </div>
  );
}