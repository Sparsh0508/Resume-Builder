import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnalyticsCharts = ({ data, timeRange }) => {
  const [activeChart, setActiveChart] = useState('views');

  const chartTabs = [
    { id: 'views', label: 'Views Over Time', icon: 'TrendingUp' },
    { id: 'sections', label: 'Section Performance', icon: 'BarChart' },
    { id: 'skills', label: 'Skill Demand', icon: 'Award' }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const renderViewsChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data?.viewsOverTime}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis 
          dataKey="date" 
          stroke="#6b7280"
          fontSize={12}
          tickFormatter={(value) => new Date(value).toLocaleDateString()}
        />
        <YAxis stroke="#6b7280" fontSize={12} />
        <Tooltip 
          labelFormatter={(value) => new Date(value).toLocaleDateString()}
          formatter={(value) => [value, 'Views']}
          contentStyle={{
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '6px'
          }}
        />
        <Line 
          type="monotone" 
          dataKey="views" 
          stroke="#3b82f6" 
          strokeWidth={2}
          dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderSectionChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data?.sectionPerformance} layout="horizontal">
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis type="number" domain={[0, 100]} stroke="#6b7280" fontSize={12} />
        <YAxis dataKey="section" type="category" stroke="#6b7280" fontSize={12} width={80} />
        <Tooltip 
          formatter={(value) => [`${value}%`, 'Performance Score']}
          contentStyle={{
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '6px'
          }}
        />
        <Bar dataKey="score" fill="#10b981" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderSkillsChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data?.skillDemand}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value }) => `${name}: ${value}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="demand"
        >
          {data?.skillDemand?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value}%`, 'Market Demand']} />
      </PieChart>
    </ResponsiveContainer>
  );

  const renderActiveChart = () => {
    switch (activeChart) {
      case 'views':
        return renderViewsChart();
      case 'sections':
        return renderSectionChart();
      case 'skills':
        return renderSkillsChart();
      default:
        return renderViewsChart();
    }
  };

  const getChartDescription = () => {
    switch (activeChart) {
      case 'views':
        return 'Track how your resume views change over time';
      case 'sections':
        return 'See which sections of your resume perform best';
      case 'skills':
        return 'Understand market demand for your skills';
      default:
        return '';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Performance Analytics</h2>
          <p className="text-text-secondary text-sm mt-1">
            {getChartDescription()}
          </p>
        </div>
        
        <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
          {chartTabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeChart === tab.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveChart(tab.id)}
              className="flex items-center space-x-2"
            >
              <Icon name={tab.icon} size={16} />
              <span className="hidden sm:block">{tab.label}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="min-h-[300px]">
        {renderActiveChart()}
      </div>

      {/* Chart Insights */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <h3 className="font-medium text-foreground mb-2">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {activeChart === 'views' && (
            <>
              <div className="flex items-center space-x-2">
                <Icon name="TrendingUp" size={16} className="text-green-500" />
                <span className="text-foreground">Peak day: 72 views</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} className="text-blue-500" />
                <span className="text-foreground">Average: 57 views/day</span>
              </div>
            </>
          )}
          {activeChart === 'sections' && (
            <>
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={16} className="text-green-500" />
                <span className="text-foreground">Skills section: 92% performance</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="AlertTriangle" size={16} className="text-yellow-500" />
                <span className="text-foreground">Education needs improvement</span>
              </div>
            </>
          )}
          {activeChart === 'skills' && (
            <>
              <div className="flex items-center space-x-2">
                <Icon name="Star" size={16} className="text-green-500" />
                <span className="text-foreground">React: Highest demand (95%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="TrendingUp" size={16} className="text-blue-500" />
                <span className="text-foreground">Python: Growing trend</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;