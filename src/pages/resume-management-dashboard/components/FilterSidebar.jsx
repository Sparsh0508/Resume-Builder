import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ onFiltersChange, activeFilters }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [completionRange, setCompletionRange] = useState({ min: 0, max: 100 });
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const departments = [
    { value: 'engineering', label: 'Engineering', count: 45 },
    { value: 'marketing', label: 'Marketing', count: 23 },
    { value: 'sales', label: 'Sales', count: 34 },
    { value: 'hr', label: 'Human Resources', count: 12 },
    { value: 'finance', label: 'Finance', count: 18 },
    { value: 'operations', label: 'Operations', count: 29 }
  ];

  const statusOptions = [
    { value: 'draft', label: 'Draft', count: 67, color: 'bg-warning' },
    { value: 'in-review', label: 'In Review', count: 34, color: 'bg-accent' },
    { value: 'approved', label: 'Approved', count: 89, color: 'bg-success' },
    { value: 'rejected', label: 'Rejected', count: 12, color: 'bg-error' },
    { value: 'pending', label: 'Pending', count: 23, color: 'bg-secondary' }
  ];

  const jobRequisitions = [
    { id: 'REQ-2024-001', title: 'Senior Software Engineer', count: 15 },
    { id: 'REQ-2024-002', title: 'Product Manager', count: 8 },
    { id: 'REQ-2024-003', title: 'UX Designer', count: 12 },
    { id: 'REQ-2024-004', title: 'Data Analyst', count: 6 },
    { id: 'REQ-2024-005', title: 'Marketing Specialist', count: 9 }
  ];

  const savedFilters = [
    { id: 1, name: 'High Priority Candidates', icon: 'Star' },
    { id: 2, name: 'Pending Review', icon: 'Clock' },
    { id: 3, name: 'Engineering Roles', icon: 'Code' },
    { id: 4, name: 'Recent Applications', icon: 'Calendar' }
  ];

  const handleDepartmentChange = (deptValue, checked) => {
    const updated = checked 
      ? [...selectedDepartments, deptValue]
      : selectedDepartments.filter(d => d !== deptValue);
    setSelectedDepartments(updated);
    onFiltersChange({ departments: updated });
  };

  const handleStatusChange = (statusValue, checked) => {
    const updated = checked 
      ? [...selectedStatuses, statusValue]
      : selectedStatuses.filter(s => s !== statusValue);
    setSelectedStatuses(updated);
    onFiltersChange({ statuses: updated });
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedDepartments([]);
    setSelectedStatuses([]);
    setCompletionRange({ min: 0, max: 100 });
    setDateRange({ start: '', end: '' });
    onFiltersChange({ clear: true });
  };

  return (
    <div className="w-full h-full bg-surface border-r border-border overflow-y-auto">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Filters</h2>
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            <Icon name="X" size={16} />
          </Button>
        </div>
        
        <Input
          type="search"
          placeholder="Search candidates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />
      </div>

      {/* Saved Filters */}
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-medium text-foreground mb-3">Quick Filters</h3>
        <div className="space-y-2">
          {savedFilters.map((filter) => (
            <Button
              key={filter.id}
              variant="ghost"
              size="sm"
              className="w-full justify-start"
            >
              <Icon name={filter.icon} size={16} className="mr-2" />
              {filter.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Job Requisitions */}
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-medium text-foreground mb-3">Job Requisitions</h3>
        <div className="space-y-2">
          {jobRequisitions.map((req) => (
            <div key={req.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted cursor-pointer">
              <div>
                <div className="text-sm font-medium text-foreground">{req.title}</div>
                <div className="text-xs text-text-secondary">{req.id}</div>
              </div>
              <span className="text-xs bg-muted px-2 py-1 rounded-full">{req.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Departments */}
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-medium text-foreground mb-3">Departments</h3>
        <div className="space-y-2">
          {departments.map((dept) => (
            <div key={dept.value} className="flex items-center justify-between">
              <Checkbox
                label={dept.label}
                checked={selectedDepartments.includes(dept.value)}
                onChange={(e) => handleDepartmentChange(dept.value, e.target.checked)}
              />
              <span className="text-xs text-text-secondary">{dept.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-medium text-foreground mb-3">Status</h3>
        <div className="space-y-2">
          {statusOptions.map((status) => (
            <div key={status.value} className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox
                  checked={selectedStatuses.includes(status.value)}
                  onChange={(e) => handleStatusChange(status.value, e.target.checked)}
                />
                <div className="flex items-center ml-2">
                  <div className={`w-2 h-2 rounded-full ${status.color} mr-2`}></div>
                  <span className="text-sm text-foreground">{status.label}</span>
                </div>
              </div>
              <span className="text-xs text-text-secondary">{status.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Completion Score */}
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-medium text-foreground mb-3">Completion Score</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              placeholder="Min"
              value={completionRange.min}
              onChange={(e) => setCompletionRange(prev => ({ ...prev, min: parseInt(e.target.value) || 0 }))}
              className="w-20"
            />
            <span className="text-text-secondary">to</span>
            <Input
              type="number"
              placeholder="Max"
              value={completionRange.max}
              onChange={(e) => setCompletionRange(prev => ({ ...prev, max: parseInt(e.target.value) || 100 }))}
              className="w-20"
            />
          </div>
          <div className="text-xs text-text-secondary">
            {completionRange.min}% - {completionRange.max}%
          </div>
        </div>
      </div>

      {/* Date Range */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-foreground mb-3">Last Modified</h3>
        <div className="space-y-3">
          <Input
            type="date"
            label="From"
            value={dateRange.start}
            onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
          />
          <Input
            type="date"
            label="To"
            value={dateRange.end}
            onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;