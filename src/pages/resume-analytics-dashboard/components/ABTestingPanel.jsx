import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ABTestingPanel = ({ onClose, onStartTest }) => {
  const [testConfig, setTestConfig] = useState({
    testName: '',
    testType: 'template',
    duration: '7',
    trafficSplit: '50',
    primaryMetric: 'views',
    description: ''
  });

  const testTypes = [
    { value: 'template', label: 'Template Design', description: 'Test different resume templates' },
    { value: 'content', label: 'Content Variations', description: 'Test different content approaches' },
    { value: 'format', label: 'Format Changes', description: 'Test different formatting styles' },
    { value: 'sections', label: 'Section Order', description: 'Test different section arrangements' }
  ];

  const metrics = [
    { value: 'views', label: 'Total Views', description: 'Overall resume views' },
    { value: 'downloads', label: 'Download Rate', description: 'Percentage of downloads' },
    { value: 'engagement', label: 'Engagement Score', description: 'Overall engagement metrics' },
    { value: 'ats', label: 'ATS Score', description: 'Applicant Tracking System compatibility' }
  ];

  const handleInputChange = (field, value) => {
    setTestConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStartTest = () => {
    if (!testConfig.testName || !testConfig.testType) {
      alert('Please fill in required fields');
      return;
    }
    onStartTest(testConfig);
  };

  const isFormValid = testConfig.testName && testConfig.testType;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">A/B Test Setup</h2>
            <p className="text-text-secondary text-sm mt-1">
              Create experiments to optimize your resume performance
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            {/* Test Configuration */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Test Configuration</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Test Name *
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., Modern vs Classic Template"
                    value={testConfig.testName}
                    onChange={(e) => handleInputChange('testName', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Test Type *
                  </label>
                  <Select
                    value={testConfig.testType}
                    onValueChange={(value) => handleInputChange('testType', value)}
                  >
                    {testTypes.map((type) => (
                      <Select.Option key={type.value} value={type.value}>
                        {type.label}
                      </Select.Option>
                    ))}
                  </Select>
                  <p className="text-text-secondary text-sm mt-1">
                    {testTypes.find(t => t.value === testConfig.testType)?.description}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Test Description
                  </label>
                  <textarea
                    className="w-full p-3 border border-border rounded-lg text-foreground bg-background resize-none"
                    rows="3"
                    placeholder="Describe what you're testing and your hypothesis..."
                    value={testConfig.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Test Settings */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Test Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Duration (days)
                  </label>
                  <Select
                    value={testConfig.duration}
                    onValueChange={(value) => handleInputChange('duration', value)}
                  >
                    <Select.Option value="7">7 days</Select.Option>
                    <Select.Option value="14">14 days</Select.Option>
                    <Select.Option value="30">30 days</Select.Option>
                    <Select.Option value="60">60 days</Select.Option>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Traffic Split (%)
                  </label>
                  <Select
                    value={testConfig.trafficSplit}
                    onValueChange={(value) => handleInputChange('trafficSplit', value)}
                  >
                    <Select.Option value="50">50/50 Split</Select.Option>
                    <Select.Option value="70">70/30 Split</Select.Option>
                    <Select.Option value="80">80/20 Split</Select.Option>
                    <Select.Option value="90">90/10 Split</Select.Option>
                  </Select>
                </div>
              </div>
            </div>

            {/* Primary Metric */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Primary Success Metric</h3>
              <div className="space-y-3">
                {metrics.map((metric) => (
                  <div
                    key={metric.value}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      testConfig.primaryMetric === metric.value
                        ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                    }`}
                    onClick={() => handleInputChange('primaryMetric', metric.value)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        testConfig.primaryMetric === metric.value
                          ? 'border-primary bg-primary' :'border-border'
                      }`}>
                        {testConfig.primaryMetric === metric.value && (
                          <div className="w-full h-full rounded-full bg-white scale-50" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{metric.label}</h4>
                        <p className="text-text-secondary text-sm">{metric.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Test Variations */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Test Variations</h3>
              <div className="space-y-3">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      A
                    </div>
                    <h4 className="font-medium text-foreground">Control Version</h4>
                  </div>
                  <p className="text-text-secondary text-sm">
                    Your current resume will serve as the control version
                  </p>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-6 h-6 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      B
                    </div>
                    <h4 className="font-medium text-foreground">Test Version</h4>
                  </div>
                  <p className="text-text-secondary text-sm">
                    The variation you want to test against your current version
                  </p>
                </div>
              </div>
            </div>

            {/* Expected Results */}
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <Icon name="Target" size={16} className="text-primary" />
                <h3 className="font-medium text-foreground">Expected Results</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Test Duration:</span>
                  <span className="text-foreground">{testConfig.duration} days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Traffic Split:</span>
                  <span className="text-foreground">{testConfig.trafficSplit}% variant</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Primary Metric:</span>
                  <span className="text-foreground">
                    {metrics.find(m => m.value === testConfig.primaryMetric)?.label}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Statistical Significance:</span>
                  <span className="text-foreground">95% confidence level</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-text-secondary text-sm">
            Test will start immediately and run for {testConfig.duration} days
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleStartTest} disabled={!isFormValid}>
              <Icon name="Play" size={16} className="mr-2" />
              Start Test
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ABTestingPanel;