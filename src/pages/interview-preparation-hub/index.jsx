import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';

import Select from '../../components/ui/Select';
import Icon from '../../components/AppIcon';
import NavigationSidebar from './components/NavigationSidebar';
import InterviewQuestions from './components/InterviewQuestions';
import VideoPractice from './components/VideoPractice';
import CompanyResearch from './components/CompanyResearch';
import PerformanceTracking from './components/PerformanceTracking';
import MockInterviewScheduler from './components/MockInterviewScheduler';
import ResourceLibrary from './components/ResourceLibrary';

const InterviewPreparationHub = () => {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState('questions');
  const [userResumeData, setUserResumeData] = useState({});
  const [practiceProgress, setPracticeProgress] = useState({
    completedSessions: 0,
    totalQuestions: 0,
    answeredQuestions: 0,
    averageScore: 0
  });
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock user resume data - in real app, this would come from the resume builder
  useEffect(() => {
    // Simulate fetching user's resume data
    const mockResumeData = {
      personalInfo: {
        name: 'John Doe',
        title: 'Software Engineer',
        email: 'john.doe@email.com'
      },
      experience: [
        {
          company: 'Tech Corp',
          position: 'Senior Developer',
          duration: '2021-2023',
          responsibilities: ['Led team of 5 developers', 'Implemented CI/CD pipelines']
        }
      ],
      skills: ['React', 'Node.js', 'Python', 'AWS', 'Docker'],
      education: [
        {
          degree: 'Bachelor of Computer Science',
          institution: 'University of Technology',
          year: '2020'
        }
      ]
    };
    setUserResumeData(mockResumeData);
  }, []);

  const handleModuleChange = (module) => {
    setActiveModule(module);
    setIsMobileMenuOpen(false);
  };

  const handleCompanyChange = (company) => {
    setSelectedCompany(company);
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  const updateProgress = (progressData) => {
    setPracticeProgress(prev => ({
      ...prev,
      ...progressData
    }));
  };

  const renderMainContent = () => {
    switch (activeModule) {
      case 'questions':
        return (
          <InterviewQuestions
            resumeData={userResumeData}
            selectedCompany={selectedCompany}
            selectedRole={selectedRole}
            onUpdateProgress={updateProgress}
          />
        );
      case 'video-practice':
        return (
          <VideoPractice
            resumeData={userResumeData}
            onUpdateProgress={updateProgress}
          />
        );
      case 'company-research':
        return (
          <CompanyResearch
            selectedCompany={selectedCompany}
            onCompanySelect={handleCompanyChange}
          />
        );
      case 'performance':
        return (
          <PerformanceTracking
            progress={practiceProgress}
            resumeData={userResumeData}
          />
        );
      case 'mock-scheduler':
        return (
          <MockInterviewScheduler
            resumeData={userResumeData}
            selectedCompany={selectedCompany}
            selectedRole={selectedRole}
          />
        );
      case 'resources':
        return (
          <ResourceLibrary
            resumeData={userResumeData}
            selectedRole={selectedRole}
          />
        );
      default:
        return <InterviewQuestions resumeData={userResumeData} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16 flex">
        {/* Mobile Menu Toggle */}
        <div className="lg:hidden fixed top-20 left-4 z-50">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            iconName={isMobileMenuOpen ? "X" : "Menu"}
            iconPosition="left"
          >
            {isMobileMenuOpen ? "Close" : "Menu"}
          </Button>
        </div>

        {/* Navigation Sidebar - 30% width */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-40 w-80 lg:w-[30%] max-w-sm
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          bg-surface border-r border-border pt-16 lg:pt-0
        `}>
          <NavigationSidebar
            activeModule={activeModule}
            onModuleChange={handleModuleChange}
            progress={practiceProgress}
            resumeData={userResumeData}
          />
        </div>

        {/* Main Content Area - 70% width */}
        <div className="flex-1 lg:w-[70%] overflow-hidden">
          {/* Context Bar */}
          <div className="bg-surface border-b border-border p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-semibold text-foreground">
                  Interview Preparation Hub
                </h1>
                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                  <Icon name="User" size={16} />
                  <span>{userResumeData?.personalInfo?.name || 'User'}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Select
                  value={selectedCompany}
                  onValueChange={handleCompanyChange}
                  placeholder="Select Company"
                  className="w-48"
                >
                  <option value="">All Companies</option>
                  <option value="google">Google</option>
                  <option value="microsoft">Microsoft</option>
                  <option value="amazon">Amazon</option>
                  <option value="meta">Meta</option>
                  <option value="apple">Apple</option>
                </Select>
                
                <Select
                  value={selectedRole}
                  onValueChange={handleRoleChange}
                  placeholder="Select Role"
                  className="w-48"
                >
                  <option value="">All Roles</option>
                  <option value="software-engineer">Software Engineer</option>
                  <option value="frontend-developer">Frontend Developer</option>
                  <option value="backend-developer">Backend Developer</option>
                  <option value="full-stack-developer">Full Stack Developer</option>
                  <option value="product-manager">Product Manager</option>
                  <option value="data-scientist">Data Scientist</option>
                </Select>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6 overflow-y-auto" style={{ height: 'calc(100vh - 160px)' }}>
            {renderMainContent()}
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30 pt-16"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default InterviewPreparationHub;