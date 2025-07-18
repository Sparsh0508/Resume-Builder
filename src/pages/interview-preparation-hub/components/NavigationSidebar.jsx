import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { cn } from '../../../utils/cn';

const NavigationSidebar = ({ activeModule, onModuleChange, progress, resumeData }) => {
  const moduleStats = {
    questions: {
      completed: progress?.answeredQuestions || 0,
      total: progress?.totalQuestions || 50
    },
    'video-practice': {
      completed: progress?.completedSessions || 0,
      total: 10
    },
    'company-research': {
      completed: 3,
      total: 5
    },
    performance: {
      score: progress?.averageScore || 0
    },
    'mock-scheduler': {
      upcoming: 2,
      completed: 1
    },
    resources: {
      downloaded: 5,
      total: 20
    }
  };

  const navigationItems = [
    {
      id: 'questions',
      title: 'AI Interview Questions',
      icon: 'MessageSquare',
      description: 'Personalized questions based on your resume',
      stats: `${moduleStats.questions.completed}/${moduleStats.questions.total} answered`
    },
    {
      id: 'video-practice',
      title: 'Video Practice',
      icon: 'Video',
      description: 'Record and review your responses',
      stats: `${moduleStats['video-practice'].completed} sessions completed`
    },
    {
      id: 'company-research',
      title: 'Company Research',
      icon: 'Building',
      description: 'Company-specific preparation guides',
      stats: `${moduleStats['company-research'].completed}/${moduleStats['company-research'].total} companies researched`
    },
    {
      id: 'performance',
      title: 'Performance Tracking',
      icon: 'TrendingUp',
      description: 'Monitor your progress and improvement',
      stats: `${moduleStats.performance.score}% average score`
    },
    {
      id: 'mock-scheduler',
      title: 'Mock Interview Scheduler',
      icon: 'Calendar',
      description: 'Schedule practice sessions with peers',
      stats: `${moduleStats['mock-scheduler'].upcoming} upcoming`
    },
    {
      id: 'resources',
      title: 'Resource Library',
      icon: 'BookOpen',
      description: 'Industry guides and templates',
      stats: `${moduleStats.resources.downloaded}/${moduleStats.resources.total} resources`
    }
  ];

  const interviewTypes = [
    { id: 'behavioral', name: 'Behavioral', count: 15 },
    { id: 'technical', name: 'Technical', count: 25 },
    { id: 'system-design', name: 'System Design', count: 10 },
    { id: 'case-study', name: 'Case Study', count: 8 }
  ];

  const skillCategories = resumeData?.skills?.slice(0, 5) || ['React', 'Node.js', 'Python'];

  return (
    <div className="h-full flex flex-col bg-surface">
      {/* Profile Section */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <Icon name="User" size={20} color="white" />
          </div>
          <div>
            <h3 className="font-medium text-foreground">
              {resumeData?.personalInfo?.name || 'User'}
            </h3>
            <p className="text-sm text-text-secondary">
              {resumeData?.personalInfo?.title || 'Job Seeker'}
            </p>
          </div>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Preparation Progress</span>
            <span className="text-sm text-text-secondary">
              {Math.round(((progress?.answeredQuestions || 0) / (progress?.totalQuestions || 50)) * 100)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${Math.round(((progress?.answeredQuestions || 0) / (progress?.totalQuestions || 50)) * 100)}%` 
              }}
            />
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <div className="mb-6">
          <h4 className="text-sm font-medium text-foreground mb-3">Preparation Modules</h4>
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onModuleChange(item.id)}
              className={cn(
                "w-full text-left p-3 rounded-lg transition-all duration-200 group",
                activeModule === item.id 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "hover:bg-muted/50 text-foreground"
              )}
            >
              <div className="flex items-start space-x-3">
                <Icon 
                  name={item.icon} 
                  size={20} 
                  className={cn(
                    "mt-0.5 flex-shrink-0",
                    activeModule === item.id ? "text-primary-foreground" : "text-text-secondary"
                  )}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium text-sm truncate">{item.title}</h5>
                    {activeModule === item.id && (
                      <Icon name="ChevronRight" size={16} className="text-primary-foreground" />
                    )}
                  </div>
                  <p className={cn(
                    "text-xs mt-1 line-clamp-2",
                    activeModule === item.id ? "text-primary-foreground/80" : "text-text-secondary"
                  )}>
                    {item.description}
                  </p>
                  <div className={cn(
                    "text-xs mt-2 font-medium",
                    activeModule === item.id ? "text-primary-foreground" : "text-success"
                  )}>
                    {item.stats}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Interview Types */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-foreground mb-3">Interview Types</h4>
          <div className="space-y-2">
            {interviewTypes.map((type) => (
              <div key={type.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
                <span className="text-sm text-foreground">{type.name}</span>
                <span className="text-xs text-text-secondary bg-muted px-2 py-1 rounded">
                  {type.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Categories */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-foreground mb-3">Your Skills</h4>
          <div className="flex flex-wrap gap-2">
            {skillCategories.map((skill, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="border-t border-border p-4 space-y-2">
        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          fullWidth
          onClick={() => onModuleChange('mock-scheduler')}
        >
          Schedule Mock Interview
        </Button>
        <Button
          variant="ghost"
          size="sm"
          iconName="Download"
          iconPosition="left"
          fullWidth
        >
          Export Practice Report
        </Button>
      </div>
    </div>
  );
};

export default NavigationSidebar;