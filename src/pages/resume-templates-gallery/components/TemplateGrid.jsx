import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TemplateGrid = ({
  templates,
  viewMode,
  onTemplateSelect,
  favoriteTemplates,
  onToggleFavorite
}) => {
  if (templates.length === 0) {
    return (
      <div className="text-center py-16">
        <Icon name="FileText" size={48} className="mx-auto text-muted mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">No templates found</h3>
        <p className="text-text-secondary">Try adjusting your filters or search query</p>
      </div>
    );
  }

  return (
    <div className={`grid gap-6 ${
      viewMode === 'grid' ?'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' :'grid-cols-1'
    }`}>
      {templates.map((template) => (
        <div
          key={template.id}
          className={`bg-surface border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group ${
            viewMode === 'list' ? 'flex' : ''
          }`}
          onClick={() => onTemplateSelect(template)}
        >
          {/* Template Thumbnail */}
          <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-[3/4]'}`}>
            <img
              src={template.thumbnail}
              alt={template.name}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button variant="default" size="sm">
                  <Icon name="Eye" size={16} />
                  <span className="ml-2">Preview</span>
                </Button>
              </div>
            </div>

            {/* Premium Badge */}
            {template.isPremium && (
              <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                Premium
              </div>
            )}

            {/* ATS Compatible Badge */}
            {template.atsCompatible && (
              <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                ATS
              </div>
            )}

            {/* Favorite Button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute bottom-2 right-2 bg-white bg-opacity-90 hover:bg-opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(template.id);
              }}
            >
              <Icon
                name="Heart"
                size={16}
                className={favoriteTemplates.includes(template.id) ? 'fill-red-500 text-red-500' : ''}
              />
            </Button>
          </div>

          {/* Template Info */}
          <div className="p-4 flex-1">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-foreground line-clamp-1">{template.name}</h3>
              <div className="flex items-center text-xs text-text-secondary">
                <Icon name="Star" size={12} className="mr-1" />
                {template.popularity}
              </div>
            </div>
            
            <p className="text-sm text-text-secondary mb-3 line-clamp-2">{template.description}</p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              {template.industry.slice(0, 2).map((industry) => (
                <span
                  key={industry}
                  className="text-xs px-2 py-1 bg-muted text-text-secondary rounded-full capitalize"
                >
                  {industry}
                </span>
              ))}
              <span className="text-xs px-2 py-1 bg-muted text-text-secondary rounded-full capitalize">
                {template.experience}
              </span>
            </div>

            {/* Features */}
            <div className="space-y-1 mb-3">
              {template.features.slice(0, 2).map((feature, index) => (
                <div key={index} className="flex items-center text-xs text-text-secondary">
                  <Icon name="Check" size={12} className="mr-2 text-green-500" />
                  {feature}
                </div>
              ))}
            </div>

            {/* Customization Level */}
            <div className="flex items-center justify-between">
              <div className="flex items-center text-xs text-text-secondary">
                <Icon name="Settings" size={12} className="mr-1" />
                <span className="capitalize">{template.customization} customization</span>
              </div>
              
              {template.isPremium && (
                <span className="text-xs text-primary font-medium">Premium</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemplateGrid;