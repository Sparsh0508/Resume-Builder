import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationsEngine = ({ recommendations }) => {
  const [expandedRecommendation, setExpandedRecommendation] = useState(null);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-500 bg-red-50 border-red-200';
      case 'medium':
        return 'text-yellow-500 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-green-500 bg-green-50 border-green-200';
      default:
        return 'text-blue-500 bg-blue-50 border-blue-200';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'keyword':
        return 'Search';
      case 'format':
        return 'Layout';
      case 'content':
        return 'FileText';
      case 'design':
        return 'Palette';
      default:
        return 'Lightbulb';
    }
  };

  const handleApplyRecommendation = (recommendation) => {
    console.log('Applying recommendation:', recommendation);
    // Integration with resume editor would go here
  };

  const toggleExpansion = (id) => {
    setExpandedRecommendation(expandedRecommendation === id ? null : id);
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">AI Recommendations</h2>
          <p className="text-text-secondary text-sm mt-1">
            Personalized suggestions to improve your resume
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Lightbulb" size={16} />
          <span>{recommendations?.length || 0} suggestions</span>
        </div>
      </div>

      <div className="space-y-4">
        {recommendations?.map((recommendation) => (
          <div
            key={recommendation.id}
            className="border border-border rounded-lg p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="p-2 bg-muted rounded-lg">
                  <Icon name={getTypeIcon(recommendation.type)} size={20} className="text-primary" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium text-foreground">{recommendation.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs border ${getPriorityColor(recommendation.priority)}`}>
                      {recommendation.priority}
                    </span>
                  </div>
                  
                  <p className="text-text-secondary text-sm mb-2">
                    {recommendation.description}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Icon name="Target" size={14} className="text-green-500" />
                      <span className="text-green-500">{recommendation.impact}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} className="text-text-secondary" />
                      <span className="text-text-secondary">2-5 min</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpansion(recommendation.id)}
                >
                  <Icon 
                    name={expandedRecommendation === recommendation.id ? "ChevronUp" : "ChevronDown"} 
                    size={16} 
                  />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleApplyRecommendation(recommendation)}
                >
                  Apply
                </Button>
              </div>
            </div>
            
            {expandedRecommendation === recommendation.id && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">How to implement:</h4>
                    <div className="space-y-2 text-sm text-text-secondary">
                      {recommendation.type === 'keyword' && (
                        <div>
                          <p>• Add these keywords to your experience section: "React", "Node.js", "AWS"</p>
                          <p>• Include them naturally in your job descriptions</p>
                          <p>• Consider adding them to your skills section</p>
                        </div>
                      )}
                      {recommendation.type === 'format' && (
                        <div>
                          <p>• Move the Skills section to appear before Experience</p>
                          <p>• This helps ATS systems identify your core competencies first</p>
                          <p>• Maintain consistent formatting throughout</p>
                        </div>
                      )}
                      {recommendation.type === 'content' && (
                        <div>
                          <p>• Add specific numbers and metrics to 2 job descriptions</p>
                          <p>• Example: "Improved performance by 30%" instead of "Improved performance"</p>
                          <p>• Focus on quantifiable achievements</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Expected outcome:</h4>
                    <p className="text-sm text-text-secondary">
                      This change typically results in {recommendation.impact} improvement in resume visibility and recruiter engagement.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-foreground mb-1">Quick Actions</h3>
            <p className="text-text-secondary text-sm">Apply multiple recommendations at once</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                console.log('Apply all high priority recommendations');
              }}
            >
              Apply High Priority
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                console.log('Apply all recommendations');
              }}
            >
              Apply All
            </Button>
          </div>
        </div>
      </div>

      {/* Performance Prediction */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="TrendingUp" size={16} className="text-green-500" />
          <h3 className="font-medium text-foreground">Performance Prediction</h3>
        </div>
        <p className="text-text-secondary text-sm">
          Implementing all recommendations could improve your overall resume score by <strong>35%</strong> and increase view rate by <strong>28%</strong>.
        </p>
      </div>
    </div>
  );
};

export default RecommendationsEngine;