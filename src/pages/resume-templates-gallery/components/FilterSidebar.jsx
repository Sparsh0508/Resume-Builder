import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ activeFilters, onFilterChange, onClearFilters }) => {
  const filterOptions = {
    industry: [
      { value: 'tech', label: 'Technology' },
      { value: 'healthcare', label: 'Healthcare' },
      { value: 'finance', label: 'Finance' },
      { value: 'design', label: 'Design' },
      { value: 'marketing', label: 'Marketing' },
      { value: 'consulting', label: 'Consulting' },
      { value: 'education', label: 'Education' },
      { value: 'legal', label: 'Legal' }
    ],
    experience: [
      { value: 'entry', label: 'Entry Level' },
      { value: 'mid', label: 'Mid-Level' },
      { value: 'senior', label: 'Senior Level' },
      { value: 'executive', label: 'Executive' }
    ],
    style: [
      { value: 'modern', label: 'Modern' },
      { value: 'classic', label: 'Classic' },
      { value: 'creative', label: 'Creative' },
      { value: 'minimal', label: 'Minimal' },
      { value: 'professional', label: 'Professional' }
    ]
  };

  const handleCheckboxChange = (filterType, value, checked) => {
    const currentValues = activeFilters[filterType] || [];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter(v => v !== value);
    
    onFilterChange({ [filterType]: newValues });
  };

  const handleATSToggle = (checked) => {
    onFilterChange({ atsCompatible: checked });
  };

  const hasActiveFilters = Object.values(activeFilters).some(filter => 
    Array.isArray(filter) ? filter.length > 0 : filter === true
  );

  return (
    <div className="h-full bg-surface border-r border-border p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Filters</h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-primary hover:text-primary"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Industry Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-3 flex items-center">
          <Icon name="Building" size={16} className="mr-2" />
          Industry
        </h3>
        <div className="space-y-2">
          {filterOptions.industry.map((option) => (
            <Checkbox
              key={option.value}
              id={`industry-${option.value}`}
              checked={activeFilters.industry?.includes(option.value) || false}
              onCheckedChange={(checked) => handleCheckboxChange('industry', option.value, checked)}
              label={option.label}
            />
          ))}
        </div>
      </div>

      {/* Experience Level Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-3 flex items-center">
          <Icon name="TrendingUp" size={16} className="mr-2" />
          Experience Level
        </h3>
        <div className="space-y-2">
          {filterOptions.experience.map((option) => (
            <Checkbox
              key={option.value}
              id={`experience-${option.value}`}
              checked={activeFilters.experience?.includes(option.value) || false}
              onCheckedChange={(checked) => handleCheckboxChange('experience', option.value, checked)}
              label={option.label}
            />
          ))}
        </div>
      </div>

      {/* Design Style Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-3 flex items-center">
          <Icon name="Palette" size={16} className="mr-2" />
          Design Style
        </h3>
        <div className="space-y-2">
          {filterOptions.style.map((option) => (
            <Checkbox
              key={option.value}
              id={`style-${option.value}`}
              checked={activeFilters.style?.includes(option.value) || false}
              onCheckedChange={(checked) => handleCheckboxChange('style', option.value, checked)}
              label={option.label}
            />
          ))}
        </div>
      </div>

      {/* ATS Compatibility Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-3 flex items-center">
          <Icon name="Shield" size={16} className="mr-2" />
          ATS Compatibility
        </h3>
        <Checkbox
          id="ats-compatible"
          checked={activeFilters.atsCompatible || false}
          onCheckedChange={handleATSToggle}
          label="ATS Compatible Only"
        />
      </div>

      {/* Popular Templates */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-3 flex items-center">
          <Icon name="Fire" size={16} className="mr-2" />
          Popular Categories
        </h3>
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
            onClick={() => onFilterChange({ industry: ['tech'] })}
          >
            Tech Templates
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
            onClick={() => onFilterChange({ style: ['modern'] })}
          >
            Modern Designs
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
            onClick={() => onFilterChange({ atsCompatible: true })}
          >
            ATS Optimized
          </Button>
        </div>
      </div>

      {/* Pro Tip */}
      <div className="bg-muted p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={16} className="text-primary mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">Pro Tip</h4>
            <p className="text-xs text-text-secondary">
              Choose ATS-compatible templates if you're applying through online job portals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;