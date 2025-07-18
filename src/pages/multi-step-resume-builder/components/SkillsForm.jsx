import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const SkillsForm = ({ data, onUpdate, onNext, onPrevious }) => {
  const [skills, setSkills] = useState(data?.skills || []);
  const [certifications, setCertifications] = useState(data?.certifications || []);
  const [languages, setLanguages] = useState(data?.languages || []);
  const [errors, setErrors] = useState({});

  const skillCategories = [
    { value: 'technical', label: 'Technical Skills' },
    { value: 'programming', label: 'Programming Languages' },
    { value: 'frameworks', label: 'Frameworks & Libraries' },
    { value: 'tools', label: 'Tools & Software' },
    { value: 'soft', label: 'Soft Skills' },
    { value: 'leadership', label: 'Leadership' },
    { value: 'communication', label: 'Communication' },
    { value: 'other', label: 'Other' }
  ];

  const proficiencyLevels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' }
  ];

  const languageProficiencyLevels = [
    { value: 'basic', label: 'Basic' },
    { value: 'conversational', label: 'Conversational' },
    { value: 'fluent', label: 'Fluent' },
    { value: 'native', label: 'Native' }
  ];

  const addSkill = () => {
    const newSkill = {
      id: Date.now(),
      name: '',
      category: '',
      proficiency: '',
      yearsOfExperience: ''
    };
    setSkills([...skills, newSkill]);
  };

  const removeSkill = (id) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const updateSkill = (id, field, value) => {
    setSkills(skills.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    ));
  };

  const addCertification = () => {
    const newCertification = {
      id: Date.now(),
      name: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      credentialId: '',
      url: ''
    };
    setCertifications([...certifications, newCertification]);
  };

  const removeCertification = (id) => {
    setCertifications(certifications.filter(cert => cert.id !== id));
  };

  const updateCertification = (id, field, value) => {
    setCertifications(certifications.map(cert => 
      cert.id === id ? { ...cert, [field]: value } : cert
    ));
  };

  const addLanguage = () => {
    const newLanguage = {
      id: Date.now(),
      name: '',
      proficiency: ''
    };
    setLanguages([...languages, newLanguage]);
  };

  const removeLanguage = (id) => {
    setLanguages(languages.filter(lang => lang.id !== id));
  };

  const updateLanguage = (id, field, value) => {
    setLanguages(languages.map(lang => 
      lang.id === id ? { ...lang, [field]: value } : lang
    ));
  };

  const getProficiencyColor = (proficiency) => {
    switch (proficiency) {
      case 'beginner': return 'bg-error';
      case 'intermediate': return 'bg-warning';
      case 'advanced': return 'bg-accent';
      case 'expert': return 'bg-success';
      default: return 'bg-muted';
    }
  };

  const getProficiencyWidth = (proficiency) => {
    switch (proficiency) {
      case 'beginner': return '25%';
      case 'intermediate': return '50%';
      case 'advanced': return '75%';
      case 'expert': return '100%';
      default: return '0%';
    }
  };

  const isExpiringCertification = (expiryDate) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const today = new Date();
    const threeMonthsFromNow = new Date(today.getTime() + (90 * 24 * 60 * 60 * 1000));
    return expiry <= threeMonthsFromNow;
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (skills.length === 0) {
      newErrors.skills = 'At least one skill is required';
    }
    
    skills.forEach(skill => {
      if (!skill.name.trim()) newErrors[`skill_${skill.id}_name`] = 'Skill name is required';
      if (!skill.category) newErrors[`skill_${skill.id}_category`] = 'Category is required';
      if (!skill.proficiency) newErrors[`skill_${skill.id}_proficiency`] = 'Proficiency level is required';
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onUpdate({ skills, certifications, languages });
      onNext();
    }
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-semibold text-foreground">Skills & Qualifications</h2>
        <p className="text-sm text-text-secondary mt-1">
          Showcase your technical skills, certifications, and language proficiencies
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Skills Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-foreground">Skills</h3>
            <Button
              type="button"
              variant="outline"
              onClick={addSkill}
              iconName="Plus"
              iconPosition="left"
            >
              Add Skill
            </Button>
          </div>

          {errors.skills && (
            <div className="text-sm text-error">{errors.skills}</div>
          )}

          {skills.length === 0 ? (
            <div className="text-center py-6 border-2 border-dashed border-border rounded-lg">
              <Icon name="Award" size={32} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-text-secondary">No skills added yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.id} className="border border-border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground">Skill</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSkill(skill.id)}
                      iconName="Trash2"
                      className="text-error hover:text-error"
                    >
                      Remove
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Skill Name"
                      type="text"
                      placeholder="e.g. JavaScript, Project Management"
                      value={skill.name}
                      onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                      error={errors[`skill_${skill.id}_name`]}
                      required
                    />
                    <Select
                      label="Category"
                      placeholder="Select category"
                      options={skillCategories}
                      value={skill.category}
                      onChange={(value) => updateSkill(skill.id, 'category', value)}
                      error={errors[`skill_${skill.id}_category`]}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                      label="Proficiency Level"
                      placeholder="Select proficiency"
                      options={proficiencyLevels}
                      value={skill.proficiency}
                      onChange={(value) => updateSkill(skill.id, 'proficiency', value)}
                      error={errors[`skill_${skill.id}_proficiency`]}
                      required
                    />
                    <Input
                      label="Years of Experience"
                      type="number"
                      placeholder="e.g. 3"
                      value={skill.yearsOfExperience}
                      onChange={(e) => updateSkill(skill.id, 'yearsOfExperience', e.target.value)}
                      min="0"
                      max="50"
                    />
                  </div>

                  {skill.proficiency && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Proficiency</span>
                        <span className="text-foreground capitalize">{skill.proficiency}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${getProficiencyColor(skill.proficiency)}`}
                          style={{ width: getProficiencyWidth(skill.proficiency) }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Certifications Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-foreground">Certifications</h3>
            <Button
              type="button"
              variant="outline"
              onClick={addCertification}
              iconName="Plus"
              iconPosition="left"
            >
              Add Certification
            </Button>
          </div>

          {certifications.length === 0 ? (
            <div className="text-center py-6 border-2 border-dashed border-border rounded-lg">
              <Icon name="Award" size={32} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-text-secondary">No certifications added yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {certifications.map((cert) => (
                <div key={cert.id} className="border border-border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-foreground">Certification</h4>
                      {isExpiringCertification(cert.expiryDate) && (
                        <div className="flex items-center space-x-1 px-2 py-1 bg-warning/10 text-warning rounded-full text-xs">
                          <Icon name="AlertTriangle" size={12} />
                          <span>Expiring Soon</span>
                        </div>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCertification(cert.id)}
                      iconName="Trash2"
                      className="text-error hover:text-error"
                    >
                      Remove
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Certification Name"
                      type="text"
                      placeholder="e.g. AWS Certified Solutions Architect"
                      value={cert.name}
                      onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                    />
                    <Input
                      label="Issuing Organization"
                      type="text"
                      placeholder="e.g. Amazon Web Services"
                      value={cert.issuer}
                      onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Issue Date"
                      type="date"
                      value={cert.issueDate}
                      onChange={(e) => updateCertification(cert.id, 'issueDate', e.target.value)}
                    />
                    <Input
                      label="Expiry Date (Optional)"
                      type="date"
                      value={cert.expiryDate}
                      onChange={(e) => updateCertification(cert.id, 'expiryDate', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Credential ID (Optional)"
                      type="text"
                      placeholder="e.g. AWS-ASA-12345"
                      value={cert.credentialId}
                      onChange={(e) => updateCertification(cert.id, 'credentialId', e.target.value)}
                    />
                    <Input
                      label="Verification URL (Optional)"
                      type="url"
                      placeholder="https://verify.example.com"
                      value={cert.url}
                      onChange={(e) => updateCertification(cert.id, 'url', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Languages Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-foreground">Languages</h3>
            <Button
              type="button"
              variant="outline"
              onClick={addLanguage}
              iconName="Plus"
              iconPosition="left"
            >
              Add Language
            </Button>
          </div>

          {languages.length === 0 ? (
            <div className="text-center py-6 border-2 border-dashed border-border rounded-lg">
              <Icon name="Globe" size={32} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-text-secondary">No languages added yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {languages.map((language) => (
                <div key={language.id} className="border border-border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground">Language</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLanguage(language.id)}
                      iconName="Trash2"
                      className="text-error hover:text-error"
                    >
                      Remove
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Language"
                      type="text"
                      placeholder="e.g. Spanish, Mandarin"
                      value={language.name}
                      onChange={(e) => updateLanguage(language.id, 'name', e.target.value)}
                    />
                    <Select
                      label="Proficiency Level"
                      placeholder="Select proficiency"
                      options={languageProficiencyLevels}
                      value={language.proficiency}
                      onChange={(value) => updateLanguage(language.id, 'proficiency', value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between pt-6 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={onPrevious}
            iconName="ArrowLeft"
            iconPosition="left"
          >
            Back to Education
          </Button>
          <Button type="submit" iconName="ArrowRight" iconPosition="right">
            Continue to Review
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SkillsForm;