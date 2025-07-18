import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';
import { cn } from '../../../utils/cn';

const PerformanceTracking = ({ progress, resumeData }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [performanceData, setPerformanceData] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState('overall');

  useEffect(() => {
    generatePerformanceData();
  }, [selectedTimeframe, progress]);

  const generatePerformanceData = () => {
    // Mock performance data
    const mockData = {
      overall: {
        current: progress?.averageScore || 75,
        previous: 68,
        trend: 'up',
        sessions: progress?.completedSessions || 8,
        totalQuestions: progress?.answeredQuestions || 42,
        improvementRate: 12
      },
      categories: {
        behavioral: { score: 82, sessions: 5, improvement: 15 },
        technical: { score: 78, sessions: 3, improvement: 8 },
        systemDesign: { score: 70, sessions: 2, improvement: 10 }
      },
      weeklyProgress: [
        { week: 'Week 1', score: 65, sessions: 2 },
        { week: 'Week 2', score: 70, sessions: 3 },
        { week: 'Week 3', score: 75, sessions: 2 },
        { week: 'Week 4', score: 80, sessions: 3 }
      ],
      strengths: ['Communication', 'Problem Solving', 'Leadership'],
      improvements: ['System Design', 'Confidence', 'Technical Depth'],
      upcomingGoals: [
        { goal: 'Complete 5 more behavioral questions', progress: 60 },
        { goal: 'Improve system design score to 80%', progress: 40 },
        { goal: 'Practice with 3 different companies', progress: 75 }
      ]
    };

    setPerformanceData(mockData);
  };

  const MetricCard = ({ title, value, change, icon, color = 'primary' }) => (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-foreground">{title}</h3>
        <Icon name={icon} size={20} className={`text-${color}`} />
      </div>
      <div className="flex items-end space-x-2">
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {change && (
          <div className={cn(
            "flex items-center space-x-1 text-sm",
            change > 0 ? "text-success" : "text-error"
          )}>
            <Icon name={change > 0 ? "TrendingUp" : "TrendingDown"} size={14} />
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
    </div>
  );

  const ProgressBar = ({ label, value, max = 100, color = 'primary' }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-sm text-text-secondary">{value}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className={`bg-${color} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
    </div>
  );

  if (!performanceData) {
    return (
      <div className="flex items-center justify-center h-48">
        <Icon name="Loader2" size={48} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Performance Tracking</h2>
          <p className="text-text-secondary mt-1">
            Monitor your interview preparation progress and improvement
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Select
            value={selectedTimeframe}
            onValueChange={setSelectedTimeframe}
            className="w-32"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="all">All Time</option>
          </Select>
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
          >
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Overall Score"
          value={`${performanceData.overall.current}%`}
          change={performanceData.overall.current - performanceData.overall.previous}
          icon="Target"
          color="primary"
        />
        <MetricCard
          title="Practice Sessions"
          value={performanceData.overall.sessions}
          change={null}
          icon="Play"
          color="success"
        />
        <MetricCard
          title="Questions Answered"
          value={performanceData.overall.totalQuestions}
          change={null}
          icon="MessageSquare"
          color="warning"
        />
        <MetricCard
          title="Improvement Rate"
          value={`+${performanceData.overall.improvementRate}%`}
          change={performanceData.overall.improvementRate}
          icon="TrendingUp"
          color="success"
        />
      </div>

      {/* Performance by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="font-medium text-foreground mb-4">Performance by Category</h3>
          <div className="space-y-4">
            {Object.entries(performanceData.categories).map(([category, data]) => (
              <div key={category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground capitalize">
                    {category.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-text-secondary">{data.sessions} sessions</span>
                    <span className="text-sm text-success">+{data.improvement}%</span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${data.score}%` }}
                  />
                </div>
                <div className="text-xs text-text-secondary">
                  Current Score: {data.score}%
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="font-medium text-foreground mb-4">Weekly Progress</h3>
          <div className="space-y-3">
            {performanceData.weeklyProgress.map((week, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{week.week}</div>
                    <div className="text-xs text-text-secondary">{week.sessions} sessions</div>
                  </div>
                </div>
                <div className="text-lg font-semibold text-foreground">{week.score}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Strengths and Improvements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="font-medium text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Award" size={20} className="text-success" />
            <span>Top Strengths</span>
          </h3>
          <div className="space-y-3">
            {performanceData.strengths.map((strength, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-success/10 rounded-lg">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <span className="text-foreground">{strength}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="font-medium text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Target" size={20} className="text-warning" />
            <span>Areas for Improvement</span>
          </h3>
          <div className="space-y-3">
            {performanceData.improvements.map((improvement, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-warning/10 rounded-lg">
                <Icon name="AlertCircle" size={16} className="text-warning" />
                <span className="text-foreground">{improvement}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Goals Progress */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-foreground">Current Goals</h3>
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            iconPosition="left"
          >
            Add Goal
          </Button>
        </div>
        <div className="space-y-4">
          {performanceData.upcomingGoals.map((goal, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{goal.goal}</span>
                <span className="text-sm text-text-secondary">{goal.progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Items */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="font-medium text-foreground mb-4">Recommended Actions</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <Icon name="Lightbulb" size={16} className="text-blue-600 mt-0.5" />
            <div>
              <div className="text-sm font-medium text-blue-900">
                Focus on System Design Practice
              </div>
              <div className="text-xs text-blue-700 mt-1">
                Your system design scores are below average. Try practicing with more complex scenarios.
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <Icon name="Star" size={16} className="text-green-600 mt-0.5" />
            <div>
              <div className="text-sm font-medium text-green-900">
                Keep up the great work on behavioral questions
              </div>
              <div className="text-xs text-green-700 mt-1">
                Your behavioral response quality has improved significantly this week.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceTracking;