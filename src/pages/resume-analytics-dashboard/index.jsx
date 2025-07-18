import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import MetricsBar from './components/MetricsBar';
import AnalyticsCharts from './components/AnalyticsCharts';
import RecommendationsEngine from './components/RecommendationsEngine';
import PerformancePanel from './components/PerformancePanel';
import ExportReports from './components/ExportReports';
import ABTestingPanel from './components/ABTestingPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ResumeAnalyticsDashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [selectedResume, setSelectedResume] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showABTestModal, setShowABTestModal] = useState(false);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sample analytics data
  const [mockData] = useState({
    metrics: {
      totalViews: 1247,
      downloadRate: 23.5,
      engagementScore: 78,
      atsCompatibility: 92
    },
    chartData: {
      viewsOverTime: [
        { date: '2024-01-01', views: 45 },
        { date: '2024-01-02', views: 52 },
        { date: '2024-01-03', views: 48 },
        { date: '2024-01-04', views: 61 },
        { date: '2024-01-05', views: 55 },
        { date: '2024-01-06', views: 67 },
        { date: '2024-01-07', views: 72 }
      ],
      sectionPerformance: [
        { section: 'Experience', score: 85 },
        { section: 'Skills', score: 92 },
        { section: 'Education', score: 78 },
        { section: 'Projects', score: 88 },
        { section: 'Certifications', score: 82 }
      ],
      skillDemand: [
        { skill: 'React', demand: 95 },
        { skill: 'Node.js', demand: 88 },
        { skill: 'Python', demand: 92 },
        { skill: 'AWS', demand: 85 },
        { skill: 'TypeScript', demand: 78 }
      ]
    },
    recommendations: [
      {
        id: 1,
        type: 'keyword',
        priority: 'high',
        title: 'Add Missing Keywords',
        description: 'Your resume is missing 3 high-demand keywords in your industry',
        action: 'Add keywords',
        impact: '+15% visibility'
      },
      {
        id: 2,
        type: 'format',
        priority: 'medium',
        title: 'Optimize Section Order',
        description: 'Moving your Skills section up could improve ATS scanning',
        action: 'Reorder sections',
        impact: '+8% ATS score'
      },
      {
        id: 3,
        type: 'content',
        priority: 'low',
        title: 'Quantify Achievements',
        description: 'Add more metrics to 2 of your experience entries',
        action: 'Update content',
        impact: '+12% engagement'
      }
    ],
    competitiveAnalysis: {
      industry: 'Technology',
      averageViews: 890,
      topSkills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS'],
      salaryRange: '$75,000 - $120,000',
      jobMarketTrend: 'growing'
    }
  });

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setAnalyticsData(mockData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [mockData]);

  const handleTimeRangeChange = (range) => {
    setSelectedTimeRange(range);
    // Fetch new data based on time range
    console.log('Fetching data for:', range);
  };

  const handleExportReport = (format) => {
    console.log('Exporting report in format:', format);
    setShowExportModal(false);
  };

  const handleStartABTest = (testConfig) => {
    console.log('Starting A/B test:', testConfig);
    setShowABTestModal(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <ProgressIndicator />
        <div className="pt-16 flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="text-center">
            <Icon name="BarChart3" size={48} className="mx-auto text-muted mb-4 animate-pulse" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Loading Analytics...</h3>
            <p className="text-text-secondary">Analyzing your resume performance</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProgressIndicator />
      
      <div className="pt-16">
        {/* Header Section */}
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-3xl font-bold text-foreground">Resume Analytics Dashboard</h1>
                <p className="text-text-secondary mt-1">
                  Track performance and get insights to improve your resume
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Time Range Selector */}
                <div className="flex items-center bg-surface border border-border rounded-lg p-1">
                  {['7d', '30d', '90d', '1y'].map((range) => (
                    <Button
                      key={range}
                      variant={selectedTimeRange === range ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => handleTimeRangeChange(range)}
                      className="px-3"
                    >
                      {range}
                    </Button>
                  ))}
                </div>

                {/* Action Buttons */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowExportModal(true)}
                >
                  <Icon name="Download" size={16} className="mr-2" />
                  Export Report
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowABTestModal(true)}
                >
                  <Icon name="TestTube" size={16} className="mr-2" />
                  A/B Test
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Bar */}
        <div className="px-6 mb-6">
          <div className="max-w-7xl mx-auto">
            <MetricsBar 
              metrics={analyticsData?.metrics} 
              timeRange={selectedTimeRange}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Charts Section */}
              <div className="lg:col-span-2 space-y-6">
                <AnalyticsCharts 
                  data={analyticsData?.chartData}
                  timeRange={selectedTimeRange}
                />
                
                <PerformancePanel 
                  data={analyticsData?.competitiveAnalysis}
                  sectionPerformance={analyticsData?.chartData?.sectionPerformance}
                />
              </div>

              {/* Recommendations Section */}
              <div className="space-y-6">
                <RecommendationsEngine 
                  recommendations={analyticsData?.recommendations}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <ExportReports
          onClose={() => setShowExportModal(false)}
          onExport={handleExportReport}
          timeRange={selectedTimeRange}
          metrics={analyticsData?.metrics}
        />
      )}

      {/* A/B Testing Modal */}
      {showABTestModal && (
        <ABTestingPanel
          onClose={() => setShowABTestModal(false)}
          onStartTest={handleStartABTest}
        />
      )}
    </div>
  );
};

export default ResumeAnalyticsDashboard;