// data/mockData.ts

// Types
export interface MonthlyData {
    month: string;
    waste: number;
    recycling: number;
    savings: number;
  }
  
  export interface ProjectionData {
    year: string;
    baseline: number;
    projected: number;
  }
  
  export interface StatsCardData {
    title: string;
    value: string;
    subtext: string;
    trend?: 'up' | 'down';
    trendValue?: string;
  }
  
  export interface WasteDistribution {
    type: string;
    percentage: number;
    color: string;
  }
  
  export interface CommunityGoal {
    name: string;
    target: number;
    current: number;
    color: string;
  }
  
  // Monthly performance data
  export const mockMonthlyData: MonthlyData[] = [
    { month: 'Jan', waste: 1000, recycling: 400, savings: 2000 },
    { month: 'Feb', waste: 900, recycling: 500, savings: 2500 },
    { month: 'Mar', waste: 800, recycling: 600, savings: 3000 },
    { month: 'Apr', waste: 700, recycling: 700, savings: 3500 },
    { month: 'May', waste: 600, recycling: 800, savings: 4000 },
    { month: 'Jun', waste: 500, recycling: 900, savings: 4500 }
  ];
  
  // Cost projections
  export const mockProjections: ProjectionData[] = [
    { year: '2024', baseline: 12000, projected: 12000 },
    { year: '2025', baseline: 13000, projected: 10000 },
    { year: '2026', baseline: 14000, projected: 8000 },
    { year: '2027', baseline: 15000, projected: 6000 }
  ];
  
  // Stats cards data
  export const statsCardsData: StatsCardData[] = [
    {
      title: "Recycling Rate",
      value: "50%",
      subtext: "+15% from last month",
      trend: "up",
      trendValue: "15%"
    },
    {
      title: "CO2 Reduction",
      value: "12%",
      subtext: "152,000€ annual savings",
      trend: "up",
      trendValue: "152K€"
    },
    {
      title: "Community Points",
      value: "75,430",
      subtext: "24,570 until next milestone",
      trend: "up",
      trendValue: "5,430"
    }
  ];
  
  // Waste distribution data
  export const wasteDistributionData: WasteDistribution[] = [
    { type: "Organic", percentage: 45, color: "#7ac142" },
    { type: "Plastic", percentage: 25, color: "#4dabf7" },
    { type: "Paper", percentage: 20, color: "#ffd43b" },
    { type: "Glass", percentage: 10, color: "#ff6b6b" }
  ];
  
  // Community goals data
  export const communityGoalsData: CommunityGoal[] = [
    {
      name: "Recycling Target",
      target: 75,
      current: 50,
      color: "#7ac142"
    },
    {
      name: "CO2 Reduction",
      target: 20,
      current: 12,
      color: "#4dabf7"
    }
  ];
  
  // Chart colors
  export const chartColors = {
    primary: "#d1fcb4",
    secondary: "#7ac142",
    accent: "#4dabf7",
    warning: "#ff6b6b",
    neutral: "#f8f9fa"
  };
  
  // Navigation tabs
  export const navigationTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'scanner', label: 'QR Scanner' }
  ];