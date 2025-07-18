import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const ExperienceForm = ({ data, onUpdate, onNext, onPrevious }) => {
  const [experiences, setExperiences] = useState(data?.experiences || []);
  const [errors, setErrors] = useState({});

  const addExperience = () => {
    const newExperience = {
      id: Date.now(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrentJob: false,
      description: '',
      achievements: ['']
    };
    setExperiences([...experiences, newExperience]);
  };

  const removeExperience = (id) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const updateExperience = (id, field, value) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
    
    // Clear errors
    if (errors[`${id}_${field}`]) {
      setErrors(prev => ({
        ...prev,
        [`${id}_${field}`]: ''
      }));
    }
  };

  const addAchievement = (expId) => {
    setExperiences(experiences.map(exp => 
      exp.id === expId 
        ? { ...exp, achievements: [...exp.achievements, ''] }
        : exp
    ));
  };

  const removeAchievement = (expId, index) => {
    setExperiences(experiences.map(exp => 
      exp.id === expId 
        ? { ...exp, achievements: exp.achievements.filter((_, i) => i !== index) }
        : exp
    ));
  };

  const updateAchievement = (expId, index, value) => {
    setExperiences(experiences.map(exp => 
      exp.id === expId 
        ? { 
            ...exp, 
            achievements: exp.achievements.map((ach, i) => i === index ? value : ach)
          }
        : exp
    ));
  };

  const validateForm = () => {
    const newErrors = {};
    
    experiences.forEach(exp => {
      if (!exp.jobTitle.trim()) newErrors[`${exp.id}_jobTitle`] = 'Job title is required';
      if (!exp.company.trim()) newErrors[`${exp.id}_company`] = 'Company name is required';
      if (!exp.startDate) newErrors[`${exp.id}_startDate`] = 'Start date is required';
      if (!exp.isCurrentJob && !exp.endDate) newErrors[`${exp.id}_endDate`] = 'End date is required';
      if (exp.endDate && exp.startDate && new Date(exp.endDate) < new Date(exp.startDate)) {
        newErrors[`${exp.id}_endDate`] = 'End date must be after start date';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onUpdate({ experiences });
      onNext();
    }
  };

  const companyOptions = [
    "Google", "Microsoft", "Apple", "Amazon", "Meta", "Netflix", "Tesla", 
    "IBM", "Oracle", "Salesforce", "Adobe", "Uber", "Airbnb", "Spotify"
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-semibold text-foreground">Work Experience</h2>
        <p className="text-sm text-text-secondary mt-1">
          Add your professional work experience and achievements
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {experiences.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-border rounded-lg">
            <Icon name="Briefcase" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No work experience added</h3>
            <p className="text-text-secondary mb-4">Start by adding your most recent position</p>
            <Button type="button" onClick={addExperience} iconName="Plus" iconPosition="left">
              Add Work Experience
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {experiences.map((experience, index) => (
              <div key={experience.id} className="border border-border rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-foreground">
                    Experience {index + 1}
                  </h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeExperience(experience.id)}
                    iconName="Trash2"
                    className="text-error hover:text-error"
                  >
                    Remove
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Job Title"
                    type="text"
                    placeholder="e.g. Senior Software Engineer"
                    value={experience.jobTitle}
                    onChange={(e) => updateExperience(experience.id, 'jobTitle', e.target.value)}
                    error={errors[`${experience.id}_jobTitle`]}
                    required
                  />
                  <div className="space-y-2">
                    <Input
                      label="Company"
                      type="text"
                      placeholder="e.g. Google Inc."
                      value={experience.company}
                      onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                      error={errors[`${experience.id}_company`]}
                      required
                    />
                    <div className="text-xs text-text-secondary">
                      Popular: {companyOptions.slice(0, 5).join(', ')}
                    </div>
                  </div>
                </div>

                <Input
                  label="Location"
                  type="text"
                  placeholder="e.g. San Francisco, CA"
                  value={experience.location}
                  onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Start Date"
                    type="date"
                    value={experience.startDate}
                    onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                    error={errors[`${experience.id}_startDate`]}
                    required
                  />
                  <div className="space-y-2">
                    <Input
                      label="End Date"
                      type="date"
                      value={experience.endDate}
                      onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                      error={errors[`${experience.id}_endDate`]}
                      disabled={experience.isCurrentJob}
                      required={!experience.isCurrentJob}
                    />
                    <Checkbox
                      label="I currently work here"
                      checked={experience.isCurrentJob}
                      onChange={(e) => {
                        updateExperience(experience.id, 'isCurrentJob', e.target.checked);
                        if (e.target.checked) {
                          updateExperience(experience.id, 'endDate', '');
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Job Description</label>
                  <textarea
                    className="w-full min-h-[100px] px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                    placeholder="Describe your role and responsibilities..."
                    value={experience.description}
                    onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
                    maxLength={500}
                  />
                  <div className="text-xs text-text-secondary text-right">
                    {experience.description.length}/500
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">Key Achievements</label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addAchievement(experience.id)}
                      iconName="Plus"
                      iconPosition="left"
                    >
                      Add Achievement
                    </Button>
                  </div>
                  
                  {experience.achievements.map((achievement, achIndex) => (
                    <div key={achIndex} className="flex items-start space-x-2">
                      <div className="flex-1">
                        <Input
                          type="text"
                          placeholder="e.g. Increased team productivity by 25% through process optimization"
                          value={achievement}
                          onChange={(e) => updateAchievement(experience.id, achIndex, e.target.value)}
                        />
                      </div>
                      {experience.achievements.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeAchievement(experience.id, achIndex)}
                          className="text-error hover:text-error mt-1"
                        >
                          <Icon name="X" size={16} />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addExperience}
              iconName="Plus"
              iconPosition="left"
              fullWidth
            >
              Add Another Experience
            </Button>
          </div>
        )}

        <div className="flex justify-between pt-6 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={onPrevious}
            iconName="ArrowLeft"
            iconPosition="left"
          >
            Back to Personal Info
          </Button>
          <Button type="submit" iconName="ArrowRight" iconPosition="right">
            Continue to Education
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ExperienceForm;