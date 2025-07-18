import React from 'react';
import Icon from '../../../components/AppIcon';

const DashboardStats = () => {
  const stats = [
    {
      id: 1,
      title: 'Total Resumes',
      value: '1,247',
      change: '+12%',
      changeType: 'positive',
      icon: 'FileText',
      color: 'bg-primary'
    },
    {
      id: 2,
      title: 'Pending Review',
      value: '89',
      change: '+5%',
      changeType: 'positive',
      icon: 'Clock',
      color: 'bg-warning'
    },
    {
      id: 3,
      title: 'Approved',
      value: '456',
      change: '+8%',
      changeType: 'positive',
      icon: 'CheckCircle',
      color: 'bg-success'
    },
    {
      id: 4,
      title: 'Completion Rate',
      value: '87%',
      change: '+3%',
      changeType: 'positive',
      icon: 'TrendingUp',
      color: 'bg-accent'
    }
  ];

  const getChangeColor = (type) => {
    return type === 'positive' ? 'text-success' : 'text-error';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <div key={stat.id} className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary mb-1">{stat.title}</p>
              <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
              <div className="flex items-center mt-2">
                <Icon 
                  name={stat.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                  size={14} 
                  className={`mr-1 ${getChangeColor(stat.changeType)}`} 
                />
                <span className={`text-sm font-medium ${getChangeColor(stat.changeType)}`}>
                  {stat.change}
                </span>
                <span className="text-sm text-text-secondary ml-1">vs last month</span>
              </div>
            </div>
            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
              <Icon name={stat.icon} size={24} color="white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;