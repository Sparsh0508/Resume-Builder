import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsBar = ({ metrics, timeRange }) => {
  const metricsConfig = [
    {
      key: 'totalViews',
      label: 'Total Views',
      icon: 'Eye',
      value: metrics?.totalViews || 0,
      format: 'number',
      trend: '+12%',
      trendDirection: 'up'
    },
    {
      key: 'downloadRate',
      label: 'Download Rate',
      icon: 'Download',
      value: metrics?.downloadRate || 0,
      format: 'percentage',
      trend: '+5.2%',
      trendDirection: 'up'
    },
    {
      key: 'engagementScore',
      label: 'Engagement Score',
      icon: 'TrendingUp',
      value: metrics?.engagementScore || 0,
      format: 'score',
      trend: '+8%',
      trendDirection: 'up'
    },
    {
      key: 'atsCompatibility',
      label: 'ATS Compatibility',
      icon: 'Shield',
      value: metrics?.atsCompatibility || 0,
      format: 'percentage',
      trend: '-2%',
      trendDirection: 'down'
    }
  ];

  const formatValue = (value, format) => {
    switch (format) {
      case 'number':
        return value.toLocaleString();
      case 'percentage':
        return `${value}%`;
      case 'score':
        return `${value}/100`;
      default:
        return value;
    }
  };

  const getIconColor = (key) => {
    switch (key) {
      case 'totalViews':
        return 'text-blue-500';
      case 'downloadRate':
        return 'text-green-500';
      case 'engagementScore':
        return 'text-purple-500';
      case 'atsCompatibility':
        return 'text-orange-500';
      default:
        return 'text-primary';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metricsConfig.map((metric) => (
        <div
          key={metric.key}
          className="bg-surface border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg bg-muted ${getIconColor(metric.key)}`}>
              <Icon name={metric.icon} size={24} />
            </div>
            <div className={`flex items-center text-sm ${
              metric.trendDirection === 'up' ? 'text-green-500' : 'text-red-500'
            }`}>
              <Icon 
                name={metric.trendDirection === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
                className="mr-1"
              />
              {metric.trend}
            </div>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-foreground">
              {formatValue(metric.value, metric.format)}
            </h3>
            <p className="text-text-secondary text-sm">{metric.label}</p>
          </div>
          
          <div className="mt-4 text-xs text-text-secondary">
            Last {timeRange === '7d' ? '7 days' : timeRange === '30d' ? '30 days' : timeRange === '90d' ? '90 days' : 'year'}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsBar;