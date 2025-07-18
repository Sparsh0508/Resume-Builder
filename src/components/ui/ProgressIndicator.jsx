import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const ProgressIndicator = ({ currentStep = 1, totalSteps = 5, completedSteps = [] }) => {
  const location = useLocation();
  
  // Only show on resume builder page
  if (!location.pathname.includes('/multi-step-resume-builder')) {
    return null;
  }

  const steps = [
    { id: 1, name: 'Personal Info', icon: 'User' },
    { id: 2, name: 'Experience', icon: 'Briefcase' },
    { id: 3, name: 'Education', icon: 'GraduationCap' },
    { id: 4, name: 'Skills', icon: 'Award' },
    { id: 5, name: 'Review', icon: 'CheckCircle' }
  ];

  const getStepStatus = (stepId) => {
    if (completedSteps.includes(stepId)) return 'completed';
    if (stepId === currentStep) return 'current';
    if (stepId < currentStep) return 'completed';
    return 'upcoming';
  };

  const handleStepClick = (stepId) => {
    // Only allow navigation to completed steps or current step
    if (stepId <= currentStep || completedSteps.includes(stepId)) {
      // Navigation logic would go here
      console.log(`Navigate to step ${stepId}`);
    }
  };

  return (
    <div className="bg-surface border-b border-border">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Desktop Progress Bar */}
          <div className="hidden md:flex items-center space-x-4 w-full">
            {steps.map((step, index) => {
              const status = getStepStatus(step.id);
              const isClickable = step.id <= currentStep || completedSteps.includes(step.id);
              
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <button
                    onClick={() => handleStepClick(step.id)}
                    disabled={!isClickable}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-smooth ${
                      status === 'completed'
                        ? 'bg-success text-success-foreground'
                        : status === 'current' ?'bg-primary text-primary-foreground'
                        : isClickable
                        ? 'text-text-secondary hover:text-foreground hover:bg-muted'
                        : 'text-muted-foreground cursor-not-allowed'
                    }`}
                  >
                    <div className={`flex items-center justify-center w-6 h-6 rounded-full ${
                      status === 'completed'
                        ? 'bg-success-foreground text-success'
                        : status === 'current' ?'bg-primary-foreground text-primary' :'bg-muted text-muted-foreground'
                    }`}>
                      {status === 'completed' ? (
                        <Icon name="Check" size={14} />
                      ) : (
                        <Icon name={step.icon} size={14} />
                      )}
                    </div>
                    <span className="text-sm font-medium">{step.name}</span>
                  </button>
                  
                  {/* Progress Line */}
                  {index < steps.length - 1 && (
                    <div className="flex-1 mx-2">
                      <div className="h-0.5 bg-border">
                        <div 
                          className={`h-full transition-all duration-300 ${
                            step.id < currentStep || completedSteps.includes(step.id)
                              ? 'bg-success' :'bg-transparent'
                          }`}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile Progress Bar */}
          <div className="md:hidden w-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm text-text-secondary">
                {steps.find(s => s.id === currentStep)?.name}
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
            
            {/* Mobile Step Navigation */}
            <div className="flex items-center justify-center mt-3 space-x-2 overflow-x-auto">
              {steps.map((step) => {
                const status = getStepStatus(step.id);
                const isClickable = step.id <= currentStep || completedSteps.includes(step.id);
                
                return (
                  <button
                    key={step.id}
                    onClick={() => handleStepClick(step.id)}
                    disabled={!isClickable}
                    className={`flex items-center justify-center w-8 h-8 rounded-full transition-smooth ${
                      status === 'completed'
                        ? 'bg-success text-success-foreground'
                        : status === 'current' ?'bg-primary text-primary-foreground'
                        : isClickable
                        ? 'bg-muted text-muted-foreground hover:bg-secondary'
                        : 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                    }`}
                  >
                    {status === 'completed' ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      <Icon name={step.icon} size={16} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;