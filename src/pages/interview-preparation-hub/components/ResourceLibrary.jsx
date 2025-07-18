import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';
import { cn } from '../../../utils/cn';

const ResourceLibrary = ({ resumeData, selectedRole }) => {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [favorites, setFavorites] = useState([]);
  const [downloads, setDownloads] = useState([]);

  useEffect(() => {
    loadResources();
  }, [selectedRole]);

  useEffect(() => {
    filterResources();
  }, [searchTerm, selectedCategory, selectedFormat, resources]);

  const loadResources = () => {
    const mockResources = [
      {
        id: 1,
        title: 'STAR Method Template',
        description: 'Complete template for structuring behavioral interview responses',
        category: 'behavioral',
        format: 'template',
        type: 'PDF',
        size: '245 KB',
        downloads: 1250,
        rating: 4.8,
        tags: ['behavioral', 'star method', 'template'],
        featured: true
      },
      {
        id: 2,
        title: 'System Design Interview Guide',
        description: 'Comprehensive guide covering scalable system architecture',
        category: 'technical',
        format: 'guide',
        type: 'PDF',
        size: '2.1 MB',
        downloads: 890,
        rating: 4.9,
        tags: ['system design', 'architecture', 'scalability'],
        featured: true
      },
      {
        id: 3,
        title: 'Salary Negotiation Scripts',
        description: 'Proven scripts and tactics for salary negotiations',
        category: 'negotiation',
        format: 'template',
        type: 'DOCX',
        size: '156 KB',
        downloads: 567,
        rating: 4.6,
        tags: ['salary', 'negotiation', 'scripts']
      },
      {
        id: 4,
        title: 'Thank You Email Templates',
        description: 'Professional follow-up email templates for after interviews',
        category: 'follow-up',
        format: 'template',
        type: 'DOCX',
        size: '89 KB',
        downloads: 2100,
        rating: 4.7,
        tags: ['follow-up', 'email', 'templates']
      },
      {
        id: 5,
        title: 'React Interview Questions',
        description: 'Common React interview questions with detailed answers',
        category: 'technical',
        format: 'guide',
        type: 'PDF',
        size: '1.8 MB',
        downloads: 1340,
        rating: 4.8,
        tags: ['react', 'javascript', 'frontend']
      },
      {
        id: 6,
        title: 'Leadership Interview Stories',
        description: 'Example stories demonstrating leadership qualities',
        category: 'behavioral',
        format: 'examples',
        type: 'PDF',
        size: '512 KB',
        downloads: 785,
        rating: 4.5,
        tags: ['leadership', 'behavioral', 'examples']
      },
      {
        id: 7,
        title: 'Company Research Template',
        description: 'Structured template for researching target companies',
        category: 'research',
        format: 'template',
        type: 'DOCX',
        size: '123 KB',
        downloads: 950,
        rating: 4.4,
        tags: ['research', 'company', 'preparation']
      },
      {
        id: 8,
        title: 'Mock Interview Evaluation Form',
        description: 'Comprehensive form for evaluating mock interview performance',
        category: 'evaluation',
        format: 'form',
        type: 'PDF',
        size: '201 KB',
        downloads: 445,
        rating: 4.3,
        tags: ['evaluation', 'feedback', 'mock interview']
      }
    ];

    setResources(mockResources);
  };

  const filterResources = () => {
    let filtered = resources;

    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(resource => resource.category === selectedCategory);
    }

    if (selectedFormat !== 'all') {
      filtered = filtered.filter(resource => resource.format === selectedFormat);
    }

    setFilteredResources(filtered);
  };

  const handleDownload = (resourceId) => {
    if (!downloads.includes(resourceId)) {
      setDownloads(prev => [...prev, resourceId]);
      
      // Update download count
      setResources(prev => prev.map(resource =>
        resource.id === resourceId
          ? { ...resource, downloads: resource.downloads + 1 }
          : resource
      ));
    }
  };

  const toggleFavorite = (resourceId) => {
    setFavorites(prev =>
      prev.includes(resourceId)
        ? prev.filter(id => id !== resourceId)
        : [...prev, resourceId]
    );
  };

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'behavioral', label: 'Behavioral' },
    { value: 'technical', label: 'Technical' },
    { value: 'negotiation', label: 'Negotiation' },
    { value: 'follow-up', label: 'Follow-up' },
    { value: 'research', label: 'Research' },
    { value: 'evaluation', label: 'Evaluation' }
  ];

  const formats = [
    { value: 'all', label: 'All Formats' },
    { value: 'template', label: 'Templates' },
    { value: 'guide', label: 'Guides' },
    { value: 'examples', label: 'Examples' },
    { value: 'form', label: 'Forms' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Resource Library</h2>
          <p className="text-text-secondary mt-1">
            Templates, guides, and tools to boost your interview success
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            iconName="Upload"
            iconPosition="left"
          >
            Upload Resource
          </Button>
          <Button
            variant="outline"
            iconName="Share"
            iconPosition="left"
          >
            Share Collection
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-1">
          <Input
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon="Search"
            iconPosition="left"
          />
        </div>
        <Select
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="w-48"
        >
          {categories.map(category => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </Select>
        <Select
          value={selectedFormat}
          onValueChange={setSelectedFormat}
          className="w-48"
        >
          {formats.map(format => (
            <option key={format.value} value={format.value}>
              {format.label}
            </option>
          ))}
        </Select>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{resources.length}</div>
          <div className="text-sm text-text-secondary">Total Resources</div>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{downloads.length}</div>
          <div className="text-sm text-text-secondary">Downloaded</div>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{favorites.length}</div>
          <div className="text-sm text-text-secondary">Favorites</div>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-foreground">
            {resources.filter(r => r.featured).length}
          </div>
          <div className="text-sm text-text-secondary">Featured</div>
        </div>
      </div>

      {/* Featured Resources */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Featured Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.filter(resource => resource.featured).slice(0, 3).map((resource) => (
            <div key={resource.id} className="bg-surface border border-border rounded-lg p-6 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Star" size={16} className="text-warning" />
                  <span className="text-xs text-warning font-medium">FEATURED</span>
                </div>
                <button
                  onClick={() => toggleFavorite(resource.id)}
                  className="text-text-secondary hover:text-error"
                >
                  <Icon
                    name={favorites.includes(resource.id) ? "Heart" : "Heart"}
                    size={16}
                    className={favorites.includes(resource.id) ? "text-error" : ""}
                  />
                </button>
              </div>
              
              <h4 className="font-medium text-foreground mb-2">{resource.title}</h4>
              <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                {resource.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-text-secondary mb-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Download" size={14} />
                  <span>{resource.downloads.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Star" size={14} />
                  <span>{resource.rating}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="File" size={14} />
                  <span>{resource.type} • {resource.size}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  onClick={() => handleDownload(resource.id)}
                  disabled={downloads.includes(resource.id)}
                  iconName={downloads.includes(resource.id) ? "Check" : "Download"}
                  iconPosition="left"
                  fullWidth
                >
                  {downloads.includes(resource.id) ? "Downloaded" : "Download"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Resources */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-foreground">
            All Resources ({filteredResources.length})
          </h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Grid3X3"
              iconPosition="left"
            >
              Grid View
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="List"
              iconPosition="left"
            >
              List View
            </Button>
          </div>
        </div>

        {filteredResources.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-text-secondary">No resources found matching your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="bg-surface border border-border rounded-lg p-6 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center",
                      resource.category === 'behavioral' && "bg-blue-100 text-blue-600",
                      resource.category === 'technical' && "bg-green-100 text-green-600",
                      resource.category === 'negotiation' && "bg-purple-100 text-purple-600",
                      resource.category === 'follow-up' && "bg-orange-100 text-orange-600",
                      resource.category === 'research' && "bg-teal-100 text-teal-600",
                      resource.category === 'evaluation' && "bg-pink-100 text-pink-600"
                    )}>
                      <Icon name="FileText" size={16} />
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFavorite(resource.id)}
                    className="text-text-secondary hover:text-error"
                  >
                    <Icon
                      name={favorites.includes(resource.id) ? "Heart" : "Heart"}
                      size={16}
                      className={favorites.includes(resource.id) ? "text-error" : ""}
                    />
                  </button>
                </div>
                
                <h4 className="font-medium text-foreground mb-2">{resource.title}</h4>
                <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                  {resource.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-text-secondary mb-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Download" size={14} />
                    <span>{resource.downloads.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Star" size={14} />
                    <span>{resource.rating}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="File" size={14} />
                    <span>{resource.type} • {resource.size}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {resource.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-muted text-text-secondary text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    onClick={() => handleDownload(resource.id)}
                    disabled={downloads.includes(resource.id)}
                    iconName={downloads.includes(resource.id) ? "Check" : "Download"}
                    iconPosition="left"
                    fullWidth
                  >
                    {downloads.includes(resource.id) ? "Downloaded" : "Download"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceLibrary;