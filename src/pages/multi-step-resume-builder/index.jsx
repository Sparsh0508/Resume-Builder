import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import PersonalInfoForm from './components/PersonalInfoForm';
import ExperienceForm from './components/ExperienceForm';
import EducationForm from './components/EducationForm';
import SkillsForm from './components/SkillsForm';
import ReviewForm from './components/ReviewForm';
import ResumePreview from './components/ResumePreview';
import StepNavigation from './components/StepNavigation';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const MultiStepResumeBuilder = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [resumeData, setResumeData] = useState({});
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  // Auto-save functionality
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (Object.keys(resumeData).length > 0) {
        setIsAutoSaving(true);
        // Mock auto-save
        setTimeout(() => {
          setIsAutoSaving(false);
          setLastSaved(new Date());
        }, 1000);
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [resumeData]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 's':
            e.preventDefault();
            handleManualSave();
            break;
          case 'ArrowLeft':
            e.preventDefault();
            if (currentStep > 1) {
              setCurrentStep(currentStep - 1);
            }
            break;
          case 'ArrowRight':
            e.preventDefault();
            if (currentStep < 5) {
              setCurrentStep(currentStep + 1);
            }
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep]);

  const handleStepUpdate = (stepData) => {
    setResumeData(prev => ({
      ...prev,
      ...stepData
    }));
  };

  const handleNext = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps(prev => [...prev, currentStep]);
    }
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepChange = (step) => {
    setCurrentStep(step);
  };

  const handleManualSave = () => {
    setIsAutoSaving(true);
    setTimeout(() => {
      setIsAutoSaving(false);
      setLastSaved(new Date());
    }, 500);
  };

  const handleFinalSubmit = () => {
    // Mock final submission
    console.log('Final resume data:', resumeData);
    alert('Resume created successfully! Redirecting to dashboard...');
    navigate('/resume-management-dashboard');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
      setResumeData({});
      setCurrentStep(1);
      setCompletedSteps([]);
    }
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoForm
            data={resumeData.personalInfo}
            onUpdate={(data) => handleStepUpdate({ personalInfo: data })}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <ExperienceForm
            data={resumeData}
            onUpdate={handleStepUpdate}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <EducationForm
            data={resumeData}
            onUpdate={handleStepUpdate}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 4:
        return (
          <SkillsForm
            data={resumeData}
            onUpdate={handleStepUpdate}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 5:
        return (
          <ReviewForm
            data={resumeData}
            onUpdate={handleStepUpdate}
            onPrevious={handlePrevious}
            onSubmit={handleFinalSubmit}
          />
        );
      default:
        return null;
    }
  };

  const formatLastSaved = (date) => {
    if (!date) return 'Never';
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins === 1) return '1 minute ago';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours === 1) return '1 hour ago';
    if (diffHours < 24) return `${diffHours} hours ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16">
        <StepNavigation
          currentStep={currentStep}
          totalSteps={5}
          onStepChange={handleStepChange}
          completedSteps={completedSteps}
        />

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Mobile Preview Toggle */}
          <div className="lg:hidden mb-6">
            <Button
              variant="outline"
              onClick={togglePreview}
              iconName={showPreview ? "Edit" : "Eye"}
              iconPosition="left"
              fullWidth
            >
              {showPreview ? "Edit Resume" : "Preview Resume"}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form Section */}
            <div className={`lg:col-span-2 ${showPreview ? 'hidden lg:block' : ''}`}>
              <div className="bg-surface border border-border rounded-lg">
                <div className="p-6">
                  {renderCurrentStep()}
                </div>
              </div>

              {/* Save Status */}
              <div className="mt-4 flex items-center justify-between text-sm text-text-secondary">
                <div className="flex items-center space-x-2">
                  {isAutoSaving ? (
                    <>
                      <Icon name="Loader2" size={16} className="animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Icon name="Check" size={16} className="text-success" />
                      <span>Last saved: {formatLastSaved(lastSaved)}</span>
                    </>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleManualSave}
                    iconName="Save"
                    iconPosition="left"
                  >
                    Save Now
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleReset}
                    iconName="RotateCcw"
                    iconPosition="left"
                    className="text-error hover:text-error"
                  >
                    Reset
                  </Button>
                </div>
              </div>

              {/* Keyboard Shortcuts Help */}
              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <h4 className="text-sm font-medium text-foreground mb-2">Keyboard Shortcuts</h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-text-secondary">
                  <div>Ctrl/Cmd + S: Save</div>
                  <div>Ctrl/Cmd + ←/→: Navigate</div>
                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div className={`lg:col-span-3 ${!showPreview ? 'hidden lg:block' : ''}`}>
              <div className="sticky top-24">
                <div className="bg-surface border border-border rounded-lg overflow-hidden">
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-foreground">Live Preview</h3>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="Download"
                          iconPosition="left"
                        >
                          Export PDF
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="Share"
                          iconPosition="left"
                        >
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-[800px] overflow-y-auto">
                    <ResumePreview 
                      data={resumeData} 
                      template={resumeData.template || 'modern'} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Collaboration Panel (Mock) */}
          <div className="mt-8 bg-surface border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-foreground">Collaboration</h3>
              <Button
                variant="outline"
                size="sm"
                iconName="Users"
                iconPosition="left"
              >
                Share for Review
              </Button>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-text-secondary">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                  <Icon name="User" size={12} color="white" />
                </div>
                <span>You (Owner)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                  <Icon name="User" size={12} color="white" />
                </div>
                <span>HR Manager (Reviewer)</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Last activity: 5 minutes ago
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepResumeBuilder;