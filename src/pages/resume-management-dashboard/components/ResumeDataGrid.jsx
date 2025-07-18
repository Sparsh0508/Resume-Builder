import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';


const ResumeDataGrid = ({ onResumeSelect, selectedResumes, onBulkAction }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'lastModified', direction: 'desc' });
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const mockResumes = [
    {
      id: 'RES-001',
      candidateName: 'Sarah Johnson',
      position: 'Senior Software Engineer',
      department: 'Engineering',
      completionScore: 95,
      status: 'approved',
      lastModified: '2024-07-11T10:30:00Z',
      assignedRecruiter: 'Mike Chen',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      experience: '5+ years',
      location: 'San Francisco, CA',
      salary: '$120,000',
      atsSync: true,
      isActive: true
    },
    {
      id: 'RES-002',
      candidateName: 'David Rodriguez',
      position: 'Product Manager',
      department: 'Product',
      completionScore: 87,
      status: 'in-review',
      lastModified: '2024-07-11T09:15:00Z',
      assignedRecruiter: 'Lisa Park',
      email: 'david.rodriguez@email.com',
      phone: '+1 (555) 234-5678',
      experience: '7+ years',
      location: 'New York, NY',
      salary: '$135,000',
      atsSync: true,
      isActive: false
    },
    {
      id: 'RES-003',
      candidateName: 'Emily Chen',
      position: 'UX Designer',
      department: 'Design',
      completionScore: 92,
      status: 'draft',
      lastModified: '2024-07-11T08:45:00Z',
      assignedRecruiter: 'John Smith',
      email: 'emily.chen@email.com',
      phone: '+1 (555) 345-6789',
      experience: '4+ years',
      location: 'Seattle, WA',
      salary: '$95,000',
      atsSync: false,
      isActive: true
    },
    {
      id: 'RES-004',
      candidateName: 'Michael Thompson',
      position: 'Data Analyst',
      department: 'Analytics',
      completionScore: 78,
      status: 'pending',
      lastModified: '2024-07-11T07:20:00Z',
      assignedRecruiter: 'Sarah Wilson',
      email: 'michael.thompson@email.com',
      phone: '+1 (555) 456-7890',
      experience: '3+ years',
      location: 'Austin, TX',
      salary: '$85,000',
      atsSync: true,
      isActive: false
    },
    {
      id: 'RES-005',
      candidateName: 'Jessica Martinez',
      position: 'Marketing Specialist',
      department: 'Marketing',
      completionScore: 89,
      status: 'approved',
      lastModified: '2024-07-10T16:30:00Z',
      assignedRecruiter: 'Mike Chen',
      email: 'jessica.martinez@email.com',
      phone: '+1 (555) 567-8901',
      experience: '6+ years',
      location: 'Los Angeles, CA',
      salary: '$75,000',
      atsSync: true,
      isActive: true
    }
  ];

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
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    if (checked) {
      const allIds = mockResumes.map(resume => resume.id);
      onBulkAction('select', allIds);
    } else {
      onBulkAction('deselect', []);
    }
  };

  const handleRowSelect = (resumeId, checked) => {
    if (checked) {
      onBulkAction('select', [resumeId]);
    } else {
      onBulkAction('deselect', [resumeId]);
    }
  };

  const bulkActions = [
    { value: 'approve', label: 'Approve Selected', icon: 'Check' },
    { value: 'reject', label: 'Reject Selected', icon: 'X' },
    { value: 'assign', label: 'Assign Recruiter', icon: 'User' },
    { value: 'export', label: 'Export to PDF', icon: 'Download' },
    { value: 'template', label: 'Apply Template', icon: 'FileText' }
  ];

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return sortConfig.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-primary" />
      : <Icon name="ArrowDown" size={14} className="text-primary" />;
  };

  return (
    <div className="h-full flex flex-col bg-surface">
      {/* Toolbar */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-foreground">
              Resume Pipeline ({mockResumes.length})
            </h2>
            {selectedResumes.length > 0 && (
              <span className="text-sm text-text-secondary">
                {selectedResumes.length} selected
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Icon name="Filter" size={16} className="mr-2" />
              Advanced Filter
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="Download" size={16} className="mr-2" />
              Export
            </Button>
            <Button variant="default" size="sm">
              <Icon name="Plus" size={16} className="mr-2" />
              New Resume
            </Button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedResumes.length > 0 && (
          <div className="flex items-center space-x-2 p-3 bg-muted rounded-md">
            <Icon name="CheckSquare" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">
              {selectedResumes.length} items selected
            </span>
            <div className="flex items-center space-x-2 ml-4">
              {bulkActions.map((action) => (
                <Button
                  key={action.value}
                  variant="ghost"
                  size="sm"
                  onClick={() => onBulkAction(action.value, selectedResumes)}
                >
                  <Icon name={action.icon} size={14} className="mr-1" />
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Data Grid */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border sticky top-0">
            <tr>
              <th className="w-12 p-3 text-left">
                <Checkbox
                  checked={selectAll}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('candidateName')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Candidate</span>
                  <SortIcon column="candidateName" />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('position')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Position</span>
                  <SortIcon column="position" />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('completionScore')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Completion</span>
                  <SortIcon column="completionScore" />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Status</span>
                  <SortIcon column="status" />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('lastModified')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Last Modified</span>
                  <SortIcon column="lastModified" />
                </button>
              </th>
              <th className="p-3 text-left">
                <span className="text-sm font-medium text-foreground">Recruiter</span>
              </th>
              <th className="p-3 text-left">
                <span className="text-sm font-medium text-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {mockResumes.map((resume) => (
              <tr
                key={resume.id}
                className="border-b border-border hover:bg-muted/50 cursor-pointer"
                onClick={() => onResumeSelect(resume)}
              >
                <td className="p-3" onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedResumes.includes(resume.id)}
                    onChange={(e) => handleRowSelect(resume.id, e.target.checked)}
                  />
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary-foreground">
                        {resume.candidateName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{resume.candidateName}</div>
                      <div className="text-xs text-text-secondary">{resume.email}</div>
                    </div>
                    {resume.isActive && (
                      <div className="w-2 h-2 bg-success rounded-full" title="Currently active"></div>
                    )}
                  </div>
                </td>
                <td className="p-3">
                  <div>
                    <div className="font-medium text-foreground">{resume.position}</div>
                    <div className="text-xs text-text-secondary">{resume.department}</div>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getCompletionColor(resume.completionScore).replace('text-', 'bg-')}`}
                        style={{ width: `${resume.completionScore}%` }}
                      ></div>
                    </div>
                    <span className={`text-sm font-medium ${getCompletionColor(resume.completionScore)}`}>
                      {resume.completionScore}%
                    </span>
                  </div>
                </td>
                <td className="p-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(resume.status)}`}>
                    {resume.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </td>
                <td className="p-3">
                  <div className="text-sm text-foreground">{formatDate(resume.lastModified)}</div>
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                      <span className="text-xs text-secondary-foreground">
                        {resume.assignedRecruiter.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="text-sm text-foreground">{resume.assignedRecruiter}</span>
                  </div>
                </td>
                <td className="p-3" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm">
                      <Icon name="Eye" size={14} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="Edit" size={14} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="Download" size={14} />
                    </Button>
                    {resume.atsSync ? (
                      <Icon name="RefreshCw" size={14} className="text-success" title="ATS Synced" />
                    ) : (
                      <Icon name="AlertCircle" size={14} className="text-warning" title="ATS Sync Pending" />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-secondary">
            Showing 1-{Math.min(itemsPerPage, mockResumes.length)} of {mockResumes.length} resumes
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled={currentPage === 1}>
              <Icon name="ChevronLeft" size={16} />
            </Button>
            <span className="text-sm text-foreground">Page {currentPage}</span>
            <Button variant="outline" size="sm">
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeDataGrid;