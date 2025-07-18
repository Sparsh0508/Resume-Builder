import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ResumePreview = ({ data, template = 'modern' }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const formatDateRange = (startDate, endDate, isCurrent = false) => {
    const start = formatDate(startDate);
    const end = isCurrent ? 'Present' : formatDate(endDate);
    return `${start} - ${end}`;
  };

  const getProficiencyDots = (proficiency) => {
    const levels = { beginner: 1, intermediate: 2, advanced: 3, expert: 4 };
    const level = levels[proficiency] || 0;
    return Array.from({ length: 4 }, (_, i) => (
      <div
        key={i}
        className={`w-2 h-2 rounded-full ${
          i < level ? 'bg-primary' : 'bg-muted'
        }`}
      />
    ));
  };

  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-muted/20 rounded-lg">
        <div className="text-center">
          <Icon name="FileText" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Resume Preview</h3>
          <p className="text-text-secondary">
            Fill out the form to see your resume preview
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden h-full">
      {/* Template Header */}
      <div className="bg-primary text-primary-foreground p-6">
        <div className="flex items-start space-x-4">
          {data.personalInfo?.profilePhoto && (
            <div className="flex-shrink-0">
              <Image
                src={data.personalInfo.profilePhoto}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-2 border-primary-foreground"
              />
            </div>
          )}
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-1">
              {data.personalInfo?.firstName} {data.personalInfo?.lastName}
            </h1>
            
            <div className="space-y-1 text-sm opacity-90">
              {data.personalInfo?.email && (
                <div className="flex items-center space-x-2">
                  <Icon name="Mail" size={14} />
                  <span>{data.personalInfo.email}</span>
                </div>
              )}
              {data.personalInfo?.phone && (
                <div className="flex items-center space-x-2">
                  <Icon name="Phone" size={14} />
                  <span>{data.personalInfo.phone}</span>
                </div>
              )}
              {data.personalInfo?.address && (
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={14} />
                  <span>
                    {data.personalInfo.address}, {data.personalInfo.city}, {data.personalInfo.state} {data.personalInfo.zipCode}
                  </span>
                </div>
              )}
              {data.personalInfo?.linkedIn && (
                <div className="flex items-center space-x-2">
                  <Icon name="Linkedin" size={14} />
                  <span>{data.personalInfo.linkedIn}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 text-gray-800">
        {/* Professional Summary */}
        {data.personalInfo?.professionalSummary && (
          <section>
            <h2 className="text-lg font-semibold text-primary border-b border-primary/20 pb-1 mb-3">
              Professional Summary
            </h2>
            <p className="text-sm leading-relaxed">
              {data.personalInfo.professionalSummary}
            </p>
          </section>
        )}

        {/* Work Experience */}
        {data.experiences && data.experiences.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-primary border-b border-primary/20 pb-1 mb-3">
              Work Experience
            </h2>
            <div className="space-y-4">
              {data.experiences.map((exp, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-base">{exp.jobTitle}</h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                      {exp.location && (
                        <p className="text-sm text-gray-600">{exp.location}</p>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 text-right">
                      {formatDateRange(exp.startDate, exp.endDate, exp.isCurrentJob)}
                    </div>
                  </div>
                  
                  {exp.description && (
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                  
                  {exp.achievements && exp.achievements.filter(ach => ach.trim()).length > 0 && (
                    <ul className="text-sm text-gray-700 space-y-1">
                      {exp.achievements.filter(ach => ach.trim()).map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start space-x-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.educations && data.educations.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-primary border-b border-primary/20 pb-1 mb-3">
              Education
            </h2>
            <div className="space-y-3">
              {data.educations.map((edu, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-primary">{edu.institution}</p>
                    <p className="text-sm text-gray-600">{edu.fieldOfStudy}</p>
                    {edu.gpa && (
                      <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 text-right">
                    {formatDateRange(edu.startDate, edu.endDate, edu.isCurrentlyStudying)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-primary border-b border-primary/20 pb-1 mb-3">
              Skills
            </h2>
            <div className="space-y-3">
              {data.skills.map((skill, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">{skill.name}</span>
                    {skill.category && (
                      <span className="text-sm text-gray-600 ml-2">
                        ({skill.category.replace('-', ' ')})
                      </span>
                    )}
                  </div>
                  {skill.proficiency && (
                    <div className="flex items-center space-x-1">
                      {getProficiencyDots(skill.proficiency)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-primary border-b border-primary/20 pb-1 mb-3">
              Certifications
            </h2>
            <div className="space-y-2">
              {data.certifications.map((cert, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{cert.name}</h3>
                    <p className="text-sm text-primary">{cert.issuer}</p>
                    {cert.credentialId && (
                      <p className="text-xs text-gray-600">ID: {cert.credentialId}</p>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 text-right">
                    {formatDate(cert.issueDate)}
                    {cert.expiryDate && (
                      <div className="text-xs">
                        Expires: {formatDate(cert.expiryDate)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-primary border-b border-primary/20 pb-1 mb-3">
              Languages
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {data.languages.map((lang, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="font-medium">{lang.name}</span>
                  <span className="text-sm text-gray-600 capitalize">
                    {lang.proficiency}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;