import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import FilterSidebar from './components/FilterSidebar';
import ResumeDataGrid from './components/ResumeDataGrid';
import ResumePreviewPanel from './components/ResumePreviewPanel';
import DashboardStats from './components/DashboardStats';
import QuickActions from './components/QuickActions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ResumeManagementDashboard = () => {
  const [selectedResume, setSelectedResume] = useState(null);
  const [selectedResumes, setSelectedResumes] = useState([]);
  const [activeFilters, setActiveFilters] = useState({});
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [previewPanelOpen, setPreviewPanelOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      // J/K navigation
      if (event.key === 'j' || event.key === 'k') {
        event.preventDefault();
        // Navigation logic would go here
        console.log(`Navigate ${event.key === 'j' ? 'down' : 'up'}`);
      }
      
      // Space for selection
      if (event.key === ' ' && selectedResume) {
        event.preventDefault();
        handleBulkAction('select', [selectedResume.id]);
      }
      
      // Escape to close preview
      if (event.key === 'Escape') {
        setPreviewPanelOpen(false);
        setSelectedResume(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedResume]);

  const handleResumeSelect = (resume) => {
    setSelectedResume(resume);
    setPreviewPanelOpen(true);
  };

  const handleBulkAction = (action, resumeIds) => {
    switch (action) {
      case 'select':
        setSelectedResumes(prev => [...new Set([...prev, ...resumeIds])]);
        break;
      case 'deselect':
        if (resumeIds.length === 0) {
          setSelectedResumes([]);
        } else {
          setSelectedResumes(prev => prev.filter(id => !resumeIds.includes(id)));
        }
        break;
      case 'approve': console.log('Approving resumes:', resumeIds);
        setSelectedResumes([]);
        break;
      case 'reject': console.log('Rejecting resumes:', resumeIds);
        setSelectedResumes([]);
        break;
      case 'assign': console.log('Assigning recruiter to resumes:', resumeIds);
        break;
      case 'export':
        console.log('Exporting resumes:', resumeIds);
        break;
      case 'template': console.log('Applying template to resumes:', resumeIds);
        break;
      default:
        break;
    }
  };

  const handleFiltersChange = (filters) => {
    if (filters.clear) {
      setActiveFilters({});
    } else {
      setActiveFilters(prev => ({ ...prev, ...filters }));
    }
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const closePreviewPanel = () => {
    setPreviewPanelOpen(false);
    setSelectedResume(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProgressIndicator />
      
      <div className="pt-16">
        {/* Top Section - Stats and Quick Actions */}
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Resume Management Dashboard</h1>
                <p className="text-text-secondary">
                  Manage and track candidate resumes across your recruitment pipeline
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleSidebar}
                  className="lg:hidden"
                >
                  <Icon name="Filter" size={16} />
                </Button>
                
                <div className="flex items-center bg-muted rounded-md p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Icon name="Grid3X3" size={16} />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <Icon name="List" size={16} />
                  </Button>
                </div>
              </div>
            </div>
            
            <DashboardStats />
            <QuickActions />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex h-[calc(100vh-280px)]">
          {/* Filter Sidebar */}
          <div className={`${sidebarCollapsed ? 'w-0' : 'w-80'} transition-all duration-300 overflow-hidden lg:block ${sidebarCollapsed ? 'hidden' : 'block'}`}>
            <FilterSidebar
              onFiltersChange={handleFiltersChange}
              activeFilters={activeFilters}
            />
          </div>

          {/* Data Grid */}
          <div className={`flex-1 ${previewPanelOpen ? 'lg:w-3/5' : 'w-full'}`}>
            <ResumeDataGrid
              onResumeSelect={handleResumeSelect}
              selectedResumes={selectedResumes}
              onBulkAction={handleBulkAction}
            />
          </div>

          {/* Preview Panel */}
          <div className={`${previewPanelOpen ? 'w-80 lg:block' : 'w-0 hidden'} transition-all duration-300 overflow-hidden`}>
            <ResumePreviewPanel
              selectedResume={selectedResume}
              onClose={closePreviewPanel}
            />
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          className="bg-surface shadow-lg"
          title="Keyboard Shortcuts: J/K to navigate, Space to select, Esc to close"
        >
          <Icon name="Keyboard" size={16} />
        </Button>
      </div>

      {/* Mobile Overlay */}
      {!sidebarCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default ResumeManagementDashboard;