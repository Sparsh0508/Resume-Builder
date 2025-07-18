import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FavoritesPanel = ({
  favoriteTemplates,
  templates,
  onTemplateSelect,
  onToggleFavorite
}) => {
  const favoriteTemplateData = templates.filter(template => 
    favoriteTemplates.includes(template.id)
  );

  return (
    <div className="h-full bg-surface border-l border-border p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Favorites</h2>
        <div className="flex items-center text-sm text-text-secondary">
          <Icon name="Heart" size={16} className="mr-1" />
          {favoriteTemplates.length}
        </div>
      </div>

      {favoriteTemplateData.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="Heart" size={48} className="mx-auto text-muted mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No favorites yet</h3>
          <p className="text-text-secondary text-sm">
            Add templates to your favorites by clicking the heart icon
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {favoriteTemplateData.map((template) => (
            <div
              key={template.id}
              className="bg-background border border-border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onTemplateSelect(template)}
            >
              <div className="flex items-start space-x-3">
                {/* Thumbnail */}
                <div className="w-16 h-20 bg-muted rounded overflow-hidden flex-shrink-0">
                  <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-foreground text-sm line-clamp-1">
                      {template.name}
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(template.id);
                      }}
                      className="p-1 text-red-500 hover:text-red-600"
                    >
                      <Icon name="Heart" size={14} className="fill-current" />
                    </Button>
                  </div>
                  
                  <p className="text-xs text-text-secondary mb-2 line-clamp-2">
                    {template.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {template.industry.slice(0, 2).map((industry) => (
                      <span
                        key={industry}
                        className="text-xs px-2 py-1 bg-muted text-text-secondary rounded-full capitalize"
                      >
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <div className="flex items-center space-x-2 text-xs text-text-secondary">
                  <Icon name="Star" size={12} />
                  <span>{template.popularity}%</span>
                  {template.atsCompatible && (
                    <>
                      <Icon name="Shield" size={12} />
                      <span>ATS</span>
                    </>
                  )}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onTemplateSelect(template);
                  }}
                  className="text-xs px-2 py-1 h-auto"
                >
                  Preview
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {favoriteTemplateData.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => {
              // Export favorites functionality
              console.log('Export favorites:', favoriteTemplateData);
            }}
          >
            <Icon name="Download" size={16} className="mr-2" />
            Export Favorites
          </Button>
        </div>
      )}
    </div>
  );
};

export default FavoritesPanel;