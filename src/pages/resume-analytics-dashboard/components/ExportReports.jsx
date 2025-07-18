import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportReports = ({ onClose, onExport, timeRange, metrics }) => {
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [selectedSections, setSelectedSections] = useState({
    metrics: true,
    charts: true,
    recommendations: true,
    competitive: true,
    trends: false
  });
  const [includeRawData, setIncludeRawData] = useState(false);
  const [emailReport, setEmailReport] = useState(false);

  const formatOptions = [
    { value: 'pdf', label: 'PDF Report', icon: 'FileText', description: 'Professional formatted report' },
    { value: 'excel', label: 'Excel Spreadsheet', icon: 'Table', description: 'Data tables and charts' },
    { value: 'powerpoint', label: 'PowerPoint', icon: 'Presentation', description: 'Slide presentation format' },
    { value: 'json', label: 'JSON Data', icon: 'Code', description: 'Raw data export' }
  ];

  const sectionOptions = [
    { key: 'metrics', label: 'Performance Metrics', description: 'Views, downloads, engagement scores' },
    { key: 'charts', label: 'Analytics Charts', description: 'Visual representations of data' },
    { key: 'recommendations', label: 'AI Recommendations', description: 'Improvement suggestions' },
    { key: 'competitive', label: 'Competitive Analysis', description: 'Industry comparisons' },
    { key: 'trends', label: 'Trend Analysis', description: 'Historical patterns and projections' }
  ];

  const handleSectionChange = (section, checked) => {
    setSelectedSections(prev => ({
      ...prev,
      [section]: checked
    }));
  };

  const handleExport = () => {
    const exportConfig = {
      format: selectedFormat,
      sections: selectedSections,
      includeRawData,
      emailReport,
      timeRange,
      metrics
    };
    
    onExport(exportConfig);
  };

  const getSelectedSectionsCount = () => {
    return Object.values(selectedSections).filter(Boolean).length;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Export Analytics Report</h2>
            <p className="text-text-secondary text-sm mt-1">
              Generate a comprehensive report of your resume analytics
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            {/* Format Selection */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Export Format</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {formatOptions.map((format) => (
                  <div
                    key={format.value}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedFormat === format.value
                        ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedFormat(format.value)}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name={format.icon} size={20} className="text-primary" />
                      <div>
                        <h4 className="font-medium text-foreground">{format.label}</h4>
                        <p className="text-text-secondary text-sm">{format.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section Selection */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">
                Include Sections ({getSelectedSectionsCount()} selected)
              </h3>
              <div className="space-y-3">
                {sectionOptions.map((section) => (
                  <div key={section.key} className="flex items-start space-x-3">
                    <Checkbox
                      id={section.key}
                      checked={selectedSections[section.key]}
                      onCheckedChange={(checked) => handleSectionChange(section.key, checked)}
                    />
                    <div>
                      <label
                        htmlFor={section.key}
                        className="text-foreground font-medium cursor-pointer"
                      >
                        {section.label}
                      </label>
                      <p className="text-text-secondary text-sm">{section.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Options */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Additional Options</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="raw-data"
                    checked={includeRawData}
                    onCheckedChange={setIncludeRawData}
                  />
                  <div>
                    <label htmlFor="raw-data" className="text-foreground font-medium cursor-pointer">
                      Include Raw Data
                    </label>
                    <p className="text-text-secondary text-sm">
                      Add detailed data tables and metrics to the report
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="email-report"
                    checked={emailReport}
                    onCheckedChange={setEmailReport}
                  />
                  <div>
                    <label htmlFor="email-report" className="text-foreground font-medium cursor-pointer">
                      Email Report
                    </label>
                    <p className="text-text-secondary text-sm">
                      Send a copy to your email address
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Report Preview */}
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-medium text-foreground mb-2">Report Preview</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Time Period:</span>
                  <span className="text-foreground">
                    {timeRange === '7d' ? 'Last 7 days' : 
                     timeRange === '30d' ? 'Last 30 days' : 
                     timeRange === '90d' ? 'Last 90 days' : 'Last year'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Format:</span>
                  <span className="text-foreground">{formatOptions.find(f => f.value === selectedFormat)?.label}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Sections:</span>
                  <span className="text-foreground">{getSelectedSectionsCount()} of {sectionOptions.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Estimated Size:</span>
                  <span className="text-foreground">
                    {selectedFormat === 'pdf' ? '2-4 MB' : 
                     selectedFormat === 'excel' ? '1-2 MB' : 
                     selectedFormat === 'powerpoint' ? '3-5 MB' : '< 1 MB'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-text-secondary text-sm">
            Report will be generated with current data
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleExport} disabled={getSelectedSectionsCount() === 0}>
              <Icon name="Download" size={16} className="mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportReports;