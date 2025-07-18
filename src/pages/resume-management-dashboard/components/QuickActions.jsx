import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActions = () => {
  const quickActions = [
    {
      id: 1,
      title: 'Create New Resume',
      description: 'Start building a new candidate resume',
      icon: 'Plus',
      color: 'bg-primary',
      link: '/multi-step-resume-builder'
    },
    {
      id: 2,
      title: 'Bulk Import',
      description: 'Import multiple resumes from CSV/Excel',
      icon: 'Upload',
      color: 'bg-accent',
      action: 'import'
    },
    {
      id: 3,
      title: 'Template Manager',
      description: 'Manage resume templates and layouts',
      icon: 'Layout',
      color: 'bg-secondary',
      action: 'templates'
    },
    {
      id: 4,
      title: 'Analytics Report',
      description: 'View recruitment analytics and metrics',
      icon: 'BarChart3',
      color: 'bg-success',
      action: 'analytics'
    }
  ];

  const handleAction = (action) => {
    switch (action) {
      case 'import': console.log('Opening bulk import dialog');
        break;
      case 'templates': console.log('Opening template manager');
        break;
      case 'analytics': console.log('Opening analytics dashboard');
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <div key={action.id}>
            {action.link ? (
              <Link
                to={action.link}
                className="block p-4 border border-border rounded-lg hover:bg-muted transition-smooth"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                    <Icon name={action.icon} size={20} color="white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{action.title}</h4>
                    <p className="text-sm text-text-secondary">{action.description}</p>
                  </div>
                </div>
              </Link>
            ) : (
              <button
                onClick={() => handleAction(action.action)}
                className="w-full p-4 border border-border rounded-lg hover:bg-muted transition-smooth text-left"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                    <Icon name={action.icon} size={20} color="white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{action.title}</h4>
                    <p className="text-sm text-text-secondary">{action.description}</p>
                  </div>
                </div>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;