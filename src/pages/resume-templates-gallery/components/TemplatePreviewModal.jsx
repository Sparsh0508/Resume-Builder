import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TemplatePreviewModal = ({
  template,
  onClose,
  onApply,
  isFavorite,
  onToggleFavorite
}) => {
  if (!template) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{template.name}</h2>
              <p className="text-text-secondary">{template.description}</p>
            </div>
            {template.isPremium && (
              <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                Premium
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleFavorite}
              className={isFavorite ? 'text-red-500 border-red-500' : ''}
            >
              <Icon name="Heart" size={16} className={isFavorite ? 'fill-current' : ''} />
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex h-[calc(90vh-140px)]">
          {/* Preview */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
              <img
                src={template.thumbnail}
                alt={template.name}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>

          {/* Details Sidebar */}
          <div className="w-80 bg-muted p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Template Info */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Template Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Popularity</span>
                    <div className="flex items-center">
                      <Icon name="Star" size={16} className="text-yellow-500 mr-1" />
                      <span className="text-foreground">{template.popularity}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Customization</span>
                    <span className="text-foreground capitalize">{template.customization}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">ATS Compatible</span>
                    <div className="flex items-center">
                      <Icon
                        name={template.atsCompatible ? "Check" : "X"}
                        size={16}
                        className={template.atsCompatible ? "text-green-500" : "text-red-500"}
                      />
                      <span className="ml-1 text-foreground">
                        {template.atsCompatible ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Industries */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Best for Industries</h3>
                <div className="flex flex-wrap gap-2">
                  {template.industry.map((industry) => (
                    <span
                      key={industry}
                      className="px-3 py-1 bg-surface text-foreground rounded-full text-sm capitalize"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Features</h3>
                <div className="space-y-2">
                  {template.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Icon name="Check" size={16} className="text-green-500 mr-2" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customization Options */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Customization Options</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Icon name="Palette" size={16} className="text-primary mr-2" />
                    <span className="text-foreground">Color schemes</span>
                  </div>
                  <div className="flex items-center">
                    <Icon name="Type" size={16} className="text-primary mr-2" />
                    <span className="text-foreground">Font styles</span>
                  </div>
                  <div className="flex items-center">
                    <Icon name="Layout" size={16} className="text-primary mr-2" />
                    <span className="text-foreground">Section layouts</span>
                  </div>
                  <div className="flex items-center">
                    <Icon name="Image" size={16} className="text-primary mr-2" />
                    <span className="text-foreground">Photo placement</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <Button
                  onClick={() => onApply(template)}
                  className="w-full"
                  size="lg"
                >
                  Use This Template
                </Button>
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="w-full"
                  size="lg"
                >
                  Continue Browsing
                </Button>
              </div>

              {/* Premium Upgrade */}
              {template.isPremium && (
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Icon name="Crown" size={16} className="text-primary mr-2" />
                    <span className="text-primary font-medium">Premium Template</span>
                  </div>
                  <p className="text-sm text-text-secondary mb-3">
                    Get access to premium features and unlimited downloads
                  </p>
                  <Button variant="default" size="sm" className="w-full">
                    Upgrade to Premium
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreviewModal;