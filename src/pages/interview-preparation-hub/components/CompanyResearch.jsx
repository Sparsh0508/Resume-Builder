import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

import Icon from '../../../components/AppIcon';
import { cn } from '../../../utils/cn';

const CompanyResearch = ({ selectedCompany, onCompanySelect }) => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [companyData, setCompanyData] = useState(null);

  const mockCompanies = [
    {
      id: 'google',
      name: 'Google',
      logo: '🔍',
      industry: 'Technology',
      size: '100,000+',
      founded: '1998',
      headquarters: 'Mountain View, CA'
    },
    {
      id: 'microsoft',
      name: 'Microsoft',
      logo: '🪟',
      industry: 'Technology',
      size: '180,000+',
      founded: '1975',
      headquarters: 'Redmond, WA'
    },
    {
      id: 'amazon',
      name: 'Amazon',
      logo: '📦',
      industry: 'E-commerce/Cloud',
      size: '1,500,000+',
      founded: '1994',
      headquarters: 'Seattle, WA'
    },
    {
      id: 'meta',
      name: 'Meta (Facebook)',
      logo: '👥',
      industry: 'Social Media',
      size: '77,000+',
      founded: '2004',
      headquarters: 'Menlo Park, CA'
    },
    {
      id: 'apple',
      name: 'Apple',
      logo: '🍎',
      industry: 'Technology',
      size: '164,000+',
      founded: '1976',
      headquarters: 'Cupertino, CA'
    }
  ];

  useEffect(() => {
    setCompanies(mockCompanies);
  }, []);

  useEffect(() => {
    if (selectedCompany) {
      loadCompanyData(selectedCompany);
    }
  }, [selectedCompany]);

  const loadCompanyData = async (companyId) => {
    setIsLoading(true);
    
    // Mock company data
    const mockData = {
      google: {
        overview: {
          mission: "To organize the world\'s information and make it universally accessible and useful.",
          values: ['Focus on the user', 'Fast is better than slow', 'Democracy on the web', 'Great just isn\'t good enough'],
          recentNews: [
            'Google announces new AI breakthrough in quantum computing',
            'Search algorithm update improves local business results',
            'New privacy features launched across all products'
          ],
          stock: '$2,850.45',
          marketCap: '$1.9T'
        },
        culture: {
          workLife: 'Excellent work-life balance with flexible hours and remote options',
          benefits: ['Comprehensive health insurance', 'Unlimited PTO', 'Free meals', 'Career development budget'],
          diversity: 'Strong commitment to diversity and inclusion initiatives',
          growth: 'Abundant opportunities for career advancement and skill development'
        },
        interview: {
          process: ['Phone screening', 'Technical phone interview', 'On-site interviews (4-5 rounds)', 'Hiring committee review'],
          questions: [
            'How would you design a web crawler?',
            'Tell me about a time you had to work with ambiguous requirements',
            'How do you prioritize features when resources are limited?'
          ],
          tips: [
            'Be prepared for system design questions',
            'Practice coding problems on LeetCode',
            'Research Google\'s products and services',
            'Prepare behavioral examples using STAR method'
          ]
        },
        compensation: {
          softwareEngineer: {
            base: '$130,000 - $180,000',
            bonus: '$15,000 - $25,000',
            equity: '$50,000 - $150,000',
            total: '$195,000 - $355,000'
          },
          productManager: {
            base: '$140,000 - $200,000',
            bonus: '$20,000 - $40,000',
            equity: '$75,000 - $200,000',
            total: '$235,000 - $440,000'
          }
        }
      },
      microsoft: {
        overview: {
          mission: "To empower every person and every organization on the planet to achieve more.",
          values: ['Respect', 'Integrity', 'Accountability', 'Inclusive', 'One Team'],
          recentNews: [
            'Microsoft Azure revenue grows 35% year-over-year',
            'New AI-powered features in Office 365',
            'Sustainability commitments and carbon negative goals'
          ],
          stock: '$378.85',
          marketCap: '$2.8T'
        },
        // ... similar structure for other tabs
      }
    };

    setTimeout(() => {
      setCompanyData(mockData[companyId] || null);
      setIsLoading(false);
    }, 1000);
  };

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'Building' },
    { id: 'culture', name: 'Culture', icon: 'Users' },
    { id: 'interview', name: 'Interview Process', icon: 'MessageSquare' },
    { id: 'compensation', name: 'Compensation', icon: 'DollarSign' }
  ];

  const renderTabContent = () => {
    if (!companyData) return null;

    switch (selectedTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="font-medium text-foreground mb-4">Mission & Values</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Mission</h4>
                    <p className="text-text-secondary text-sm">{companyData.overview.mission}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Core Values</h4>
                    <ul className="space-y-1">
                      {companyData.overview.values.map((value, index) => (
                        <li key={index} className="text-text-secondary text-sm flex items-start space-x-2">
                          <Icon name="CheckCircle" size={14} className="text-success mt-0.5" />
                          <span>{value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="font-medium text-foreground mb-4">Market Performance</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Stock Price</span>
                    <span className="font-medium text-foreground">{companyData.overview.stock}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Market Cap</span>
                    <span className="font-medium text-foreground">{companyData.overview.marketCap}</span>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <Button variant="outline" size="sm" iconName="TrendingUp" iconPosition="left" fullWidth>
                      View Full Financial Data
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-lg p-6">
              <h3 className="font-medium text-foreground mb-4">Recent News</h3>
              <div className="space-y-3">
                {companyData.overview.recentNews.map((news, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 hover:bg-muted/50 rounded-lg">
                    <Icon name="Newspaper" size={16} className="text-primary mt-0.5" />
                    <div>
                      <p className="text-foreground text-sm">{news}</p>
                      <p className="text-text-secondary text-xs mt-1">
                        {new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'culture':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="font-medium text-foreground mb-4">Work-Life Balance</h3>
                <p className="text-text-secondary text-sm mb-4">{companyData.culture.workLife}</p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} className="text-success" />
                    <span className="text-sm text-foreground">Flexible working hours</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Home" size={16} className="text-success" />
                    <span className="text-sm text-foreground">Remote work options</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Calendar" size={16} className="text-success" />
                    <span className="text-sm text-foreground">Unlimited PTO policy</span>
                  </div>
                </div>
              </div>

              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="font-medium text-foreground mb-4">Benefits & Perks</h3>
                <div className="space-y-2">
                  {companyData.culture.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Icon name="Gift" size={16} className="text-primary mt-0.5" />
                      <span className="text-sm text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-lg p-6">
              <h3 className="font-medium text-foreground mb-4">Diversity & Growth</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Diversity & Inclusion</h4>
                  <p className="text-text-secondary text-sm">{companyData.culture.diversity}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Career Growth</h4>
                  <p className="text-text-secondary text-sm">{companyData.culture.growth}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'interview':
        return (
          <div className="space-y-6">
            <div className="bg-surface border border-border rounded-lg p-6">
              <h3 className="font-medium text-foreground mb-4">Interview Process</h3>
              <div className="space-y-4">
                {companyData.interview.process.map((step, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {index + 1}
                    </div>
                    <span className="text-foreground">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="font-medium text-foreground mb-4">Common Questions</h3>
                <div className="space-y-3">
                  {companyData.interview.questions.map((question, index) => (
                    <div key={index} className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-foreground text-sm">{question}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="font-medium text-foreground mb-4">Interview Tips</h3>
                <div className="space-y-2">
                  {companyData.interview.tips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Icon name="Lightbulb" size={16} className="text-warning mt-0.5" />
                      <span className="text-foreground text-sm">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'compensation':
        return (
          <div className="space-y-6">
            <div className="bg-surface border border-border rounded-lg p-6">
              <h3 className="font-medium text-foreground mb-4">Salary Ranges by Role</h3>
              <div className="space-y-6">
                {Object.entries(companyData.compensation).map(([role, data]) => (
                  <div key={role} className="border border-border rounded-lg p-4">
                    <h4 className="font-medium text-foreground mb-3 capitalize">
                      {role.replace(/([A-Z])/g, ' $1').trim()}
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm text-text-secondary">Base Salary</div>
                        <div className="font-medium text-foreground">{data.base}</div>
                      </div>
                      <div>
                        <div className="text-sm text-text-secondary">Bonus</div>
                        <div className="font-medium text-foreground">{data.bonus}</div>
                      </div>
                      <div>
                        <div className="text-sm text-text-secondary">Equity</div>
                        <div className="font-medium text-foreground">{data.equity}</div>
                      </div>
                      <div>
                        <div className="text-sm text-text-secondary">Total Comp</div>
                        <div className="font-medium text-success">{data.total}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Company Selection */}
      <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-1">
          <Input
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon="Search"
            iconPosition="left"
          />
        </div>
        <Button
          variant="outline"
          iconName="Plus"
          iconPosition="left"
        >
          Add Company
        </Button>
      </div>

      {/* Company Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCompanies.map((company) => (
          <div
            key={company.id}
            onClick={() => onCompanySelect(company.id)}
            className={cn(
              "p-4 border rounded-lg cursor-pointer transition-all hover:shadow-sm",
              selectedCompany === company.id
                ? "border-primary bg-primary/5" :"border-border hover:border-border-hover"
            )}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="text-2xl">{company.logo}</div>
              <div>
                <h3 className="font-medium text-foreground">{company.name}</h3>
                <p className="text-sm text-text-secondary">{company.industry}</p>
              </div>
            </div>
            <div className="space-y-1 text-xs text-text-secondary">
              <div>Founded: {company.founded}</div>
              <div>Size: {company.size}</div>
              <div>HQ: {company.headquarters}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Company Details */}
      {selectedCompany && (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="text-3xl">
              {companies.find(c => c.id === selectedCompany)?.logo}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {companies.find(c => c.id === selectedCompany)?.name}
              </h2>
              <p className="text-text-secondary">
                {companies.find(c => c.id === selectedCompany)?.industry}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-border">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={cn(
                    "flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors",
                    selectedTab === tab.id
                      ? "border-primary text-primary" :"border-transparent text-text-secondary hover:text-foreground"
                  )}
                >
                  <Icon name={tab.icon} size={16} />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div>
            {isLoading ? (
              <div className="flex items-center justify-center h-48">
                <div className="text-center">
                  <Icon name="Loader2" size={48} className="animate-spin text-primary mx-auto mb-4" />
                  <p className="text-text-secondary">Loading company data...</p>
                </div>
              </div>
            ) : (
              renderTabContent()
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyResearch;