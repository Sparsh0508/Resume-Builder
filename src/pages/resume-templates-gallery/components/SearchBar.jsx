import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SearchBar = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  resultsCount,
  onClearFilters
}) => {
  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'newest', label: 'Newest First' }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
          <Input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          {/* Results Count */}
          <span className="text-sm text-text-secondary">
            {resultsCount} template{resultsCount !== 1 ? 's' : ''}
          </span>

          {/* Sort Dropdown */}
          <Select
            value={sortBy}
            onValueChange={onSortChange}
            placeholder="Sort by..."
            className="min-w-[140px]"
          >
            {sortOptions.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-muted rounded-md p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              className="px-3"
            >
              <Icon name="Grid3X3" size={16} />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('list')}
              className="px-3"
            >
              <Icon name="List" size={16} />
            </Button>
          </div>

          {/* Clear Filters */}
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="flex items-center space-x-2"
          >
            <Icon name="X" size={16} />
            <span>Clear</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;