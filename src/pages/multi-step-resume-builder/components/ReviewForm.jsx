import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';


const ReviewForm = ({ data, onUpdate, onPrevious, onSubmit }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(data?.template || 'modern');
  const [completionScore, setCompletionScore] = useState(85);

  const templates = [
    { value: 'modern', label: 'Modern Professional' },
    { value: 'classic', label: 'Classic Traditional' },
    { value: 'creative', label: 'Creative Design' },
    { value: 'minimal', label: 'Minimal Clean' },
    { value: 'executive', label: 'Executive Premium' }
  ];

  const calculateCompletionScore = () => {
    let score = 0;
    let totalSections = 5;
    
    // Personal Info (20 points)
    if (data?.personalInfo?.firstName && data?.personalInfo?.lastName && data?.personalInfo?.email) {
      score += 20;
    }
    
    // Experience (25 points)
    if (data?.experiences && data?.experiences.length > 0) {
      score += 25;
    }
    
    // Education (20 points)
    if (data?.educations && data?.educations.length > 0) {
      score += 20;
    }
    
    // Skills (20 points)
    if (data?.skills && data?.skills.length > 0) {
      score += 20;
    }
    
    // Additional sections (15 points)
    if ((data?.certifications && data?.certifications.length > 0) || 
        (data?.languages && data?.languages.length > 0)) {
      score += 15;
    }
    
    return Math.min(score, 100);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreBackground = (score) => {
    if (score >= 80) return 'bg-success';
    if (score >= 60) return 'bg-warning';
    return 'bg-error';
  };

  const handleExportPDF = () => {
    // Mock PDF export
    console.log('Exporting PDF with template:', selectedTemplate);
    alert('PDF export functionality would be implemented here');
  };

  const handleSaveDraft = () => {
    // Mock save draft
    console.log('Saving draft...');
    alert('Draft saved successfully!');
  };

  const handleFinalSubmit = () => {
    onUpdate({ template: selectedTemplate });
    onSubmit();
  };

  const score = calculateCompletionScore();

  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-semibold text-foreground">Review & Finalize</h2>
        <p className="text-sm text-text-secondary mt-1">
          Review your resume, select a template, and finalize your application
        </p>
      </div>

      {/* Completion Score */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-foreground">Resume Completeness</h3>
          <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
            {score}%
          </div>
        </div>
        
        <div className="w-full bg-muted rounded-full h-3 mb-4">
          <div 
            className={`h-3 rounded-full transition-all duration-500 ${getScoreBackground(score)}`}
            style={{ width: `${score}%` }}
          />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Icon 
              name={data?.personalInfo?.firstName ? "CheckCircle" : "Circle"} 
              size={16} 
              className={data?.personalInfo?.firstName ? "text-success" : "text-muted-foreground"} 
            />
            <span>Personal Info</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon 
              name={data?.experiences?.length > 0 ? "CheckCircle" : "Circle"} 
              size={16} 
              className={data?.experiences?.length > 0 ? "text-success" : "text-muted-foreground"} 
            />
            <span>Experience</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon 
              name={data?.educations?.length > 0 ? "CheckCircle" : "Circle"} 
              size={16} 
              className={data?.educations?.length > 0 ? "text-success" : "text-muted-foreground"} 
            />
            <span>Education</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon 
              name={data?.skills?.length > 0 ? "CheckCircle" : "Circle"} 
              size={16} 
              className={data?.skills?.length > 0 ? "text-success" : "text-muted-foreground"} 
            />
            <span>Skills</span>
          </div>
        </div>
      </div>

      {/* Template Selection */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Choose Template</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Select
              label="Resume Template"
              placeholder="Select a template"
              options={templates}
              value={selectedTemplate}
              onChange={setSelectedTemplate}
            />
            
            <div className="mt-4 space-y-2">
              <h4 className="font-medium text-foreground">Template Features:</h4>
              <ul className="text-sm text-text-secondary space-y-1">
                <li className="flex items-center space-x-2">
                  <Icon name="Check" size={14} className="text-success" />
                  <span>Professional formatting</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="Check" size={14} className="text-success" />
                  <span>ATS-friendly design</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="Check" size={14} className="text-success" />
                  <span>Customizable sections</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="Check" size={14} className="text-success" />
                  <span>Multiple export formats</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-muted rounded-lg p-4 flex items-center justify-center min-h-[200px]">
            <div className="text-center">
              <Icon name="FileText" size={48} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-text-secondary">Template Preview</p>
              <p className="text-xs text-muted-foreground mt-1">
                {templates.find(t => t.value === selectedTemplate)?.label}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Summary */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Resume Summary</h3>
        
        <div className="space-y-4">
          {/* Personal Info Summary */}
          {data?.personalInfo && (
            <div className="border-l-4 border-primary pl-4">
              <h4 className="font-medium text-foreground">
                {data.personalInfo.firstName} {data.personalInfo.lastName}
              </h4>
              <p className="text-sm text-text-secondary">{data.personalInfo.email}</p>
              <p className="text-sm text-text-secondary">{data.personalInfo.phone}</p>
              {data.personalInfo.professionalSummary && (
                <p className="text-sm text-text-secondary mt-2 line-clamp-2">
                  {data.personalInfo.professionalSummary}
                </p>
              )}
            </div>
          )}

          {/* Experience Summary */}
          {data?.experiences && data.experiences.length > 0 && (
            <div>
              <h4 className="font-medium text-foreground mb-2">Work Experience</h4>
              <div className="space-y-2">
                {data.experiences.slice(0, 2).map((exp, index) => (
                  <div key={index} className="text-sm">
                    <span className="font-medium">{exp.jobTitle}</span> at{' '}
                    <span className="text-text-secondary">{exp.company}</span>
                  </div>
                ))}
                {data.experiences.length > 2 && (
                  <p className="text-xs text-muted-foreground">
                    +{data.experiences.length - 2} more positions
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Education Summary */}
          {data?.educations && data.educations.length > 0 && (
            <div>
              <h4 className="font-medium text-foreground mb-2">Education</h4>
              <div className="space-y-2">
                {data.educations.slice(0, 2).map((edu, index) => (
                  <div key={index} className="text-sm">
                    <span className="font-medium">{edu.degree}</span> in{' '}
                    <span className="text-text-secondary">{edu.fieldOfStudy}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Summary */}
          {data?.skills && data.skills.length > 0 && (
            <div>
              <h4 className="font-medium text-foreground mb-2">Top Skills</h4>
              <div className="flex flex-wrap gap-2">
                {data.skills.slice(0, 6).map((skill, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {skill.name}
                  </span>
                ))}
                {data.skills.length > 6 && (
                  <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                    +{data.skills.length - 6} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleExportPDF}
            iconName="Download"
            iconPosition="left"
            fullWidth
          >
            Export as PDF
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleSaveDraft}
            iconName="Save"
            iconPosition="left"
            fullWidth
          >
            Save Draft
          </Button>
        </div>

        <div className="flex justify-between pt-6 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={onPrevious}
            iconName="ArrowLeft"
            iconPosition="left"
          >
            Back to Skills
          </Button>
          <Button
            type="button"
            onClick={handleFinalSubmit}
            iconName="CheckCircle"
            iconPosition="right"
          >
            Complete Resume
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;