import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import TemplateGrid from './components/TemplateGrid';
import FilterSidebar from './components/FilterSidebar';
import SearchBar from './components/SearchBar';
import TemplatePreviewModal from './components/TemplatePreviewModal';
import FavoritesPanel from './components/FavoritesPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ResumeTemplatesGallery = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    industry: [],
    experience: [],
    style: [],
    atsCompatible: false
  });
  const [viewMode, setViewMode] = useState('grid');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [favoriteTemplates, setFavoriteTemplates] = useState([]);
  const [sortBy, setSortBy] = useState('popular');

  // Sample templates data
  const [templates] = useState([
    {
      id: 1,
      name: 'Modern Tech Resume',
      industry: ['tech', 'software'],
      experience: 'mid',
      style: 'modern',
      atsCompatible: true,
      popularity: 95,
      customization: 'high',
      isPremium: false,
      thumbnail: '/api/placeholder/300/400',
      features: ['ATS Optimized', 'Modern Design', 'Easy Customization'],
      description: 'Perfect for software developers and tech professionals'
    },
    {
      id: 2,
      name: 'Executive Classic',
      industry: ['finance', 'consulting'],
      experience: 'senior',
      style: 'classic',
      atsCompatible: true,
      popularity: 88,
      customization: 'medium',
      isPremium: true,
      thumbnail: '/api/placeholder/300/400',
      features: ['Executive Format', 'Professional Layout', 'Industry Focused'],
      description: 'Ideal for C-level executives and senior management'
    },
    {
      id: 3,
      name: 'Creative Portfolio',
      industry: ['design', 'marketing'],
      experience: 'mid',
      style: 'creative',
      atsCompatible: false,
      popularity: 82,
      customization: 'high',
      isPremium: false,
      thumbnail: '/api/placeholder/300/400',
      features: ['Portfolio Integration', 'Creative Design', 'Visual Elements'],
      description: 'Best for designers and creative professionals'
    },
    {
      id: 4,
      name: 'Healthcare Professional',
      industry: ['healthcare', 'medical'],
      experience: 'entry',
      style: 'modern',
      atsCompatible: true,
      popularity: 79,
      customization: 'medium',
      isPremium: false,
      thumbnail: '/api/placeholder/300/400',
      features: ['Medical Focus', 'Clean Layout', 'ATS Friendly'],
      description: 'Designed for healthcare and medical professionals'
    }
  ]);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setPreviewModalOpen(true);
  };

  const handleFilterChange = (filters) => {
    setActiveFilters(prev => ({ ...prev, ...filters }));
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const toggleFavorite = (templateId) => {
    setFavoriteTemplates(prev => 
      prev.includes(templateId)
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
  };

  const handleApplyTemplate = (template) => {
    console.log('Applying template:', template.name);
    // Integration with resume builder would go here
    setPreviewModalOpen(false);
  };

  const clearFilters = () => {
    setActiveFilters({
      industry: [],
      experience: [],
      style: [],
      atsCompatible: false
    });
    setSearchQuery('');
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesIndustry = activeFilters.industry.length === 0 || 
                           activeFilters.industry.some(ind => template.industry.includes(ind));
    
    const matchesExperience = activeFilters.experience.length === 0 || 
                             activeFilters.experience.includes(template.experience);
    
    const matchesStyle = activeFilters.style.length === 0 || 
                        activeFilters.style.includes(template.style);
    
    const matchesATS = !activeFilters.atsCompatible || template.atsCompatible;

    return matchesSearch && matchesIndustry && matchesExperience && matchesStyle && matchesATS;
  });

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.popularity - a.popularity;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'newest':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProgressIndicator />
      
      <div className="pt-16">
        {/* Header Section */}
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-3xl font-bold text-foreground">Resume Templates Gallery</h1>
                <p className="text-text-secondary mt-1">
                  Choose from {templates.length} professionally designed templates
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFavoritesOpen(!favoritesOpen)}
                  className="relative"
                >
                  <Icon name="Heart" size={16} />
                  <span className="ml-2">Favorites</span>
                  {favoriteTemplates.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {favoriteTemplates.length}
                    </span>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="lg:hidden"
                >
                  <Icon name="Filter" size={16} />
                </Button>
              </div>
            </div>
            
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              sortBy={sortBy}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              resultsCount={sortedTemplates.length}
              onClearFilters={clearFilters}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex">
          {/* Filter Sidebar */}
          <div className={`${sidebarCollapsed ? 'w-0' : 'w-80'} transition-all duration-300 overflow-hidden`}>
            <FilterSidebar
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Template Grid */}
          <div className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <TemplateGrid
                templates={sortedTemplates}
                viewMode={viewMode}
                onTemplateSelect={handleTemplateSelect}
                favoriteTemplates={favoriteTemplates}
                onToggleFavorite={toggleFavorite}
              />
            </div>
          </div>

          {/* Favorites Panel */}
          <div className={`${favoritesOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden`}>
            <FavoritesPanel
              favoriteTemplates={favoriteTemplates}
              templates={templates}
              onTemplateSelect={handleTemplateSelect}
              onToggleFavorite={toggleFavorite}
            />
          </div>
        </div>
      </div>

      {/* Template Preview Modal */}
      {previewModalOpen && selectedTemplate && (
        <TemplatePreviewModal
          template={selectedTemplate}
          onClose={() => setPreviewModalOpen(false)}
          onApply={handleApplyTemplate}
          isFavorite={favoriteTemplates.includes(selectedTemplate.id)}
          onToggleFavorite={() => toggleFavorite(selectedTemplate.id)}
        />
      )}

      {/* Mobile Overlay */}
      {!sidebarCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}
    </div>
  );
};

export default ResumeTemplatesGallery;