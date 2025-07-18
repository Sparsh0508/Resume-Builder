import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navigationItems = [
    {
      name: 'Dashboard',
      path: '/resume-management-dashboard',
      icon: 'LayoutDashboard'
    },
    {
      name: 'Create Resume',
      path: '/multi-step-resume-builder',
      icon: 'FileText'
    },
    {
      name: 'Templates',
      path: '/resume-templates-gallery',
      icon: 'Grid3X3'
    },
    {
      name: 'Analytics',
      path: '/resume-analytics-dashboard',
      icon: 'BarChart3'
    },
    {
      name: 'Interview Prep',
      path: '/interview-preparation-hub',
      icon: 'MessageSquare'
    }
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    // Logout logic would go here
    console.log('Logout clicked');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-1000">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/resume-management-dashboard" className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-md">
              <Icon name="FileText" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">Resume Builder</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                isActivePath(item.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item.icon} size={16} />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* User Menu & Mobile Toggle */}
        <div className="flex items-center space-x-4">
          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={toggleUserMenu}
              className="flex items-center space-x-2 px-3 py-2"
            >
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-sm font-medium text-foreground">John Doe</div>
                <div className="text-xs text-text-secondary">HR Manager</div>
              </div>
              <Icon name="ChevronDown" size={16} className="text-text-secondary" />
            </Button>

            {/* User Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md elevation-2 z-1010">
                <div className="py-1">
                  <div className="px-4 py-2 border-b border-border">
                    <div className="text-sm font-medium text-popover-foreground">John Doe</div>
                    <div className="text-xs text-text-secondary">john.doe@company.com</div>
                  </div>
                  <button className="w-full text-left px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth flex items-center space-x-2">
                    <Icon name="Settings" size={16} />
                    <span>Account Settings</span>
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth flex items-center space-x-2">
                    <Icon name="HelpCircle" size={16} />
                    <span>Help & Support</span>
                  </button>
                  <div className="border-t border-border">
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-error hover:bg-muted transition-smooth flex items-center space-x-2"
                    >
                      <Icon name="LogOut" size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            onClick={toggleMobileMenu}
            className="md:hidden p-2"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface border-t border-border">
          <nav className="px-4 py-2 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-smooth ${
                  isActivePath(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;