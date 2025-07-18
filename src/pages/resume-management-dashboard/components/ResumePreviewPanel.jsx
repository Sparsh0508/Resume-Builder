import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const ResumePreviewPanel = ({ selectedResume, onClose }) => {
  if (!selectedResume) {
    return (
      <div className="w-full h-full bg-surface border-l border-border flex items-center justify-center">
        <div className="text-center">
          <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Resume Selected</h3>
          <p className="text-sm text-text-secondary">
            Select a resume from the list to view details
          </p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    const colors = {
      'draft': 'bg-warning text-warning-foreground',
      'in-review': 'bg-accent text-accent-foreground',
      'approved': 'bg-success text-success-foreground',
      'rejected': 'bg-error text-error-foreground',
      'pending': 'bg-secondary text-secondary-foreground'
    };
    return colors[status] || 'bg-muted text-muted-foreground';
  };

  const getCompletionColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-error';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const mockSkills = [
    'JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'AWS', 'Docker', 'Git'
  ];

  const mockEducation = [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'Stanford University',
      year: '2019',
      gpa: '3.8'
    }
  ];

  const mockExperience = [
    {
      title: 'Senior Software Engineer',
      company: 'Tech Corp',
      duration: '2021 - Present',
      description: 'Led development of microservices architecture serving 1M+ users daily'
    },
    {
      title: 'Software Engineer',
      company: 'StartupXYZ',
      duration: '2019 - 2021',
      description: 'Built full-stack web applications using React and Node.js'
    }
  ];

  return (
    <div className="w-full h-full bg-surface border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Resume Preview</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={16} />
          </Button>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-primary-foreground">
              {selectedResume.candidateName.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h3 className="font-medium text-foreground">{selectedResume.candidateName}</h3>
            <p className="text-sm text-text-secondary">{selectedResume.position}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Status & Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted rounded-lg p-3">
            <div className="text-xs text-text-secondary mb-1">Status</div>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedResume.status)}`}>
              {selectedResume.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <div className="text-xs text-text-secondary mb-1">Completion</div>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-background rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getCompletionColor(selectedResume.completionScore).replace('text-', 'bg-')}`}
                  style={{ width: `${selectedResume.completionScore}%` }}
                ></div>
              </div>
              <span className={`text-sm font-medium ${getCompletionColor(selectedResume.completionScore)}`}>
                {selectedResume.completionScore}%
              </span>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Contact Information</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name="Mail" size={14} className="text-text-secondary" />
              <span className="text-sm text-foreground">{selectedResume.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Phone" size={14} className="text-text-secondary" />
              <span className="text-sm text-foreground">{selectedResume.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={14} className="text-text-secondary" />
              <span className="text-sm text-foreground">{selectedResume.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="DollarSign" size={14} className="text-text-secondary" />
              <span className="text-sm text-foreground">{selectedResume.salary}</span>
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Professional Summary</h4>
          <p className="text-sm text-text-secondary leading-relaxed">
            Experienced software engineer with {selectedResume.experience} in full-stack development. 
            Proven track record of building scalable applications and leading technical teams. 
            Strong expertise in modern web technologies and cloud platforms.
          </p>
        </div>

        {/* Skills */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {mockSkills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-md bg-muted text-xs font-medium text-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Experience</h4>
          <div className="space-y-3">
            {mockExperience.map((exp, index) => (
              <div key={index} className="border-l-2 border-muted pl-3">
                <div className="font-medium text-foreground text-sm">{exp.title}</div>
                <div className="text-xs text-text-secondary mb-1">{exp.company} • {exp.duration}</div>
                <p className="text-xs text-text-secondary">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Education</h4>
          <div className="space-y-2">
            {mockEducation.map((edu, index) => (
              <div key={index}>
                <div className="font-medium text-foreground text-sm">{edu.degree}</div>
                <div className="text-xs text-text-secondary">{edu.institution} • {edu.year} • GPA: {edu.gpa}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Assignment Info */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Assignment Details</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-secondary">Assigned Recruiter</span>
              <span className="text-sm text-foreground">{selectedResume.assignedRecruiter}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-secondary">Last Modified</span>
              <span className="text-sm text-foreground">{formatDate(selectedResume.lastModified)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-secondary">ATS Sync</span>
              <div className="flex items-center space-x-1">
                {selectedResume.atsSync ? (
                  <>
                    <Icon name="CheckCircle" size={14} className="text-success" />
                    <span className="text-xs text-success">Synced</span>
                  </>
                ) : (
                  <>
                    <Icon name="AlertCircle" size={14} className="text-warning" />
                    <span className="text-xs text-warning">Pending</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-border">
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm">
            <Icon name="Edit" size={14} className="mr-2" />
            Edit
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="Download" size={14} className="mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="Share" size={14} className="mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="MessageSquare" size={14} className="mr-2" />
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResumePreviewPanel;