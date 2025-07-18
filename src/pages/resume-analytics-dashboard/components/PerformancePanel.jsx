import React from 'react';
import Icon from '../../../components/AppIcon';


const PerformancePanel = ({ data, sectionPerformance }) => {
  const competitiveMetrics = [
    {
      label: 'Your Views',
      value: '1,247',
      comparison: data?.averageViews || 890,
      comparisonLabel: 'Industry Average',
      performance: 'above'
    },
    {
      label: 'Market Position',
      value: 'Top 25%',
      comparison: 'Top 50%',
      comparisonLabel: 'Similar Profiles',
      performance: 'above'
    },
    {
      label: 'Salary Range',
      value: data?.salaryRange || '$75,000 - $120,000',
      comparison: '$65,000 - $100,000',
      comparisonLabel: 'Market Average',
      performance: 'above'
    }
  ];

  const getPerformanceColor = (performance) => {
    switch (performance) {
      case 'above':
        return 'text-green-500';
      case 'below':
        return 'text-red-500';
      case 'average':
        return 'text-yellow-500';
      default:
        return 'text-text-secondary';
    }
  };

  const getPerformanceIcon = (performance) => {
    switch (performance) {
      case 'above':
        return 'TrendingUp';
      case 'below':
        return 'TrendingDown';
      case 'average':
        return 'Minus';
      default:
        return 'Minus';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Competitive Analysis</h2>
          <p className="text-text-secondary text-sm mt-1">
            How you compare to similar profiles in {data?.industry || 'your industry'}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Users" size={16} className="text-text-secondary" />
          <span className="text-text-secondary text-sm">vs 2,500+ profiles</span>
        </div>
      </div>

      {/* Competitive Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {competitiveMetrics.map((metric, index) => (
          <div key={index} className="bg-background border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-text-secondary text-sm">{metric.label}</span>
              <Icon
                name={getPerformanceIcon(metric.performance)}
                size={16}
                className={getPerformanceColor(metric.performance)}
              />
            </div>
            <div className="space-y-1">
              <div className="text-lg font-semibold text-foreground">{metric.value}</div>
              <div className="text-xs text-text-secondary">
                vs {typeof metric.comparison === 'number' ? metric.comparison.toLocaleString() : metric.comparison} {metric.comparisonLabel}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Top Skills Analysis */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Top Skills in Your Industry</h3>
        <div className="space-y-3">
          {data?.topSkills?.map((skill, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <span className="text-foreground">{skill}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-24 h-2 bg-muted rounded-full">
                  <div 
                    className="h-2 bg-primary rounded-full" 
                    style={{ width: `${95 - (index * 5)}%` }}
                  />
                </div>
                <span className="text-text-secondary text-sm w-10">{95 - (index * 5)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section Performance Comparison */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Section Performance vs Industry</h3>
        <div className="space-y-3">
          {sectionPerformance?.map((section, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-foreground">{section.section}</span>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <span className="text-text-secondary text-sm">You:</span>
                  <span className="text-foreground font-medium">{section.score}%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-text-secondary text-sm">Avg:</span>
                  <span className="text-text-secondary">{section.score - 5}%</span>
                </div>
                <Icon
                  name={section.score > 85 ? 'TrendingUp' : section.score > 70 ? 'Minus' : 'TrendingDown'}
                  size={16}
                  className={section.score > 85 ? 'text-green-500' : section.score > 70 ? 'text-yellow-500' : 'text-red-500'}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Insights */}
      <div className="bg-muted p-4 rounded-lg">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="TrendingUp" size={16} className="text-green-500" />
          <h3 className="font-medium text-foreground">Market Insights</h3>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="Circle" size={8} className="text-green-500" />
            <span className="text-foreground">
              Job market for {data?.industry || 'Technology'} is <strong>{data?.jobMarketTrend || 'growing'}</strong> by 15% this year
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Circle" size={8} className="text-blue-500" />
            <span className="text-foreground">
              Your profile ranks in the top 25% for your experience level
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Circle" size={8} className="text-yellow-500" />
            <span className="text-foreground">
              Consider adding Cloud certifications to boost your competitiveness
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformancePanel;