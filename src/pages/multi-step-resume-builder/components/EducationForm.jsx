import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const EducationForm = ({ data, onUpdate, onNext, onPrevious }) => {
  const [educations, setEducations] = useState(data?.educations || []);
  const [errors, setErrors] = useState({});

  const degreeOptions = [
    { value: 'high-school', label: 'High School Diploma' },
    { value: 'associate', label: 'Associate Degree' },
    { value: 'bachelor', label: 'Bachelor\'s Degree' },
    { value: 'master', label: 'Master\'s Degree' },
    { value: 'doctorate', label: 'Doctorate/PhD' },
    { value: 'certificate', label: 'Certificate' },
    { value: 'other', label: 'Other' }
  ];

  const fieldOfStudyOptions = [
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'business', label: 'Business Administration' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'finance', label: 'Finance' },
    { value: 'accounting', label: 'Accounting' },
    { value: 'psychology', label: 'Psychology' },
    { value: 'education', label: 'Education' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'law', label: 'Law' },
    { value: 'arts', label: 'Arts & Design' },
    { value: 'communications', label: 'Communications' },
    { value: 'other', label: 'Other' }
  ];

  const addEducation = () => {
    const newEducation = {
      id: Date.now(),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      isCurrentlyStudying: false,
      gpa: '',
      achievements: [''],
      verified: false
    };
    setEducations([...educations, newEducation]);
  };

  const removeEducation = (id) => {
    setEducations(educations.filter(edu => edu.id !== id));
  };

  const updateEducation = (id, field, value) => {
    setEducations(educations.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
    
    if (errors[`${id}_${field}`]) {
      setErrors(prev => ({
        ...prev,
        [`${id}_${field}`]: ''
      }));
    }
  };

  const addAchievement = (eduId) => {
    setEducations(educations.map(edu => 
      edu.id === eduId 
        ? { ...edu, achievements: [...edu.achievements, ''] }
        : edu
    ));
  };

  const removeAchievement = (eduId, index) => {
    setEducations(educations.map(edu => 
      edu.id === eduId 
        ? { ...edu, achievements: edu.achievements.filter((_, i) => i !== index) }
        : edu
    ));
  };

  const updateAchievement = (eduId, index, value) => {
    setEducations(educations.map(edu => 
      edu.id === eduId 
        ? { 
            ...edu, 
            achievements: edu.achievements.map((ach, i) => i === index ? value : ach)
          }
        : edu
    ));
  };

  const validateForm = () => {
    const newErrors = {};
    
    educations.forEach(edu => {
      if (!edu.institution.trim()) newErrors[`${edu.id}_institution`] = 'Institution name is required';
      if (!edu.degree) newErrors[`${edu.id}_degree`] = 'Degree type is required';
      if (!edu.fieldOfStudy) newErrors[`${edu.id}_fieldOfStudy`] = 'Field of study is required';
      if (!edu.startDate) newErrors[`${edu.id}_startDate`] = 'Start date is required';
      if (!edu.isCurrentlyStudying && !edu.endDate) newErrors[`${edu.id}_endDate`] = 'End date is required';
      if (edu.endDate && edu.startDate && new Date(edu.endDate) < new Date(edu.startDate)) {
        newErrors[`${edu.id}_endDate`] = 'End date must be after start date';
      }
      if (edu.gpa && (isNaN(edu.gpa) || edu.gpa < 0 || edu.gpa > 4)) {
        newErrors[`${edu.id}_gpa`] = 'GPA must be between 0.0 and 4.0';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onUpdate({ educations });
      onNext();
    }
  };

  const verifyDegree = (eduId) => {
    // Mock verification process
    setEducations(educations.map(edu => 
      edu.id === eduId ? { ...edu, verified: true } : edu
    ));
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-semibold text-foreground">Education</h2>
        <p className="text-sm text-text-secondary mt-1">
          Add your educational background and academic achievements
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {educations.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-border rounded-lg">
            <Icon name="GraduationCap" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No education added</h3>
            <p className="text-text-secondary mb-4">Start by adding your highest level of education</p>
            <Button type="button" onClick={addEducation} iconName="Plus" iconPosition="left">
              Add Education
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {educations.map((education, index) => (
              <div key={education.id} className="border border-border rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-medium text-foreground">
                      Education {index + 1}
                    </h3>
                    {education.verified && (
                      <div className="flex items-center space-x-1 px-2 py-1 bg-success/10 text-success rounded-full text-xs">
                        <Icon name="CheckCircle" size={12} />
                        <span>Verified</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {!education.verified && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => verifyDegree(education.id)}
                        iconName="Shield"
                        iconPosition="left"
                      >
                        Verify
                      </Button>
                    )}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEducation(education.id)}
                      iconName="Trash2"
                      className="text-error hover:text-error"
                    >
                      Remove
                    </Button>
                  </div>
                </div>

                <Input
                  label="Institution Name"
                  type="text"
                  placeholder="e.g. Stanford University"
                  value={education.institution}
                  onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                  error={errors[`${education.id}_institution`]}
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Degree Type"
                    placeholder="Select degree type"
                    options={degreeOptions}
                    value={education.degree}
                    onChange={(value) => updateEducation(education.id, 'degree', value)}
                    error={errors[`${education.id}_degree`]}
                    required
                  />
                  <Select
                    label="Field of Study"
                    placeholder="Select field of study"
                    options={fieldOfStudyOptions}
                    value={education.fieldOfStudy}
                    onChange={(value) => updateEducation(education.id, 'fieldOfStudy', value)}
                    error={errors[`${education.id}_fieldOfStudy`]}
                    searchable
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="Start Date"
                    type="date"
                    value={education.startDate}
                    onChange={(e) => updateEducation(education.id, 'startDate', e.target.value)}
                    error={errors[`${education.id}_startDate`]}
                    required
                  />
                  <div className="space-y-2">
                    <Input
                      label="End Date"
                      type="date"
                      value={education.endDate}
                      onChange={(e) => updateEducation(education.id, 'endDate', e.target.value)}
                      error={errors[`${education.id}_endDate`]}
                      disabled={education.isCurrentlyStudying}
                      required={!education.isCurrentlyStudying}
                    />
                    <Checkbox
                      label="Currently studying"
                      checked={education.isCurrentlyStudying}
                      onChange={(e) => {
                        updateEducation(education.id, 'isCurrentlyStudying', e.target.checked);
                        if (e.target.checked) {
                          updateEducation(education.id, 'endDate', '');
                        }
                      }}
                    />
                  </div>
                  <Input
                    label="GPA (Optional)"
                    type="number"
                    placeholder="e.g. 3.8"
                    value={education.gpa}
                    onChange={(e) => updateEducation(education.id, 'gpa', e.target.value)}
                    error={errors[`${education.id}_gpa`]}
                    min="0"
                    max="4"
                    step="0.1"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">Academic Achievements</label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addAchievement(education.id)}
                      iconName="Plus"
                      iconPosition="left"
                    >
                      Add Achievement
                    </Button>
                  </div>
                  
                  {education.achievements.map((achievement, achIndex) => (
                    <div key={achIndex} className="flex items-start space-x-2">
                      <div className="flex-1">
                        <Input
                          type="text"
                          placeholder="e.g. Dean's List, Magna Cum Laude, Relevant Coursework"
                          value={achievement}
                          onChange={(e) => updateAchievement(education.id, achIndex, e.target.value)}
                        />
                      </div>
                      {education.achievements.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeAchievement(education.id, achIndex)}
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
              onClick={addEducation}
              iconName="Plus"
              iconPosition="left"
              fullWidth
            >
              Add Another Education
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
            Back to Experience
          </Button>
          <Button type="submit" iconName="ArrowRight" iconPosition="right">
            Continue to Skills
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EducationForm;