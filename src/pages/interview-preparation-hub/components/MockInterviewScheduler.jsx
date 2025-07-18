import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';
import { cn } from '../../../utils/cn';

const MockInterviewScheduler = ({ resumeData, selectedCompany, selectedRole }) => {
  const [selectedTab, setSelectedTab] = useState('schedule');
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [interviewType, setInterviewType] = useState('behavioral');
  const [duration, setDuration] = useState('45');
  const [partnerPreference, setPartnerPreference] = useState('anyone');
  const [isScheduling, setIsScheduling] = useState(false);

  useEffect(() => {
    loadUpcomingInterviews();
    generateAvailableSlots();
  }, []);

  const loadUpcomingInterviews = () => {
    const mockInterviews = [
      {
        id: 1,
        type: 'Behavioral',
        date: '2025-07-20',
        time: '2:00 PM',
        duration: 45,
        partner: 'Sarah Johnson',
        partnerRole: 'Senior Developer',
        company: 'Google',
        status: 'confirmed'
      },
      {
        id: 2,
        type: 'Technical',
        date: '2025-07-22',
        time: '10:00 AM',
        duration: 60,
        partner: 'Mike Chen',
        partnerRole: 'Engineering Manager',
        company: 'Microsoft',
        status: 'pending'
      },
      {
        id: 3,
        type: 'System Design',
        date: '2025-07-25',
        time: '3:30 PM',
        duration: 75,
        partner: 'Alex Rodriguez',
        partnerRole: 'Principal Engineer',
        company: 'Amazon',
        status: 'confirmed'
      }
    ];
    setUpcomingInterviews(mockInterviews);
  };

  const generateAvailableSlots = () => {
    const slots = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const timeSlots = [
        '9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
      ];
      
      timeSlots.forEach(time => {
        if (Math.random() > 0.3) { // 70% chance of being available
          slots.push({
            date: date.toISOString().split('T')[0],
            time: time,
            available: true
          });
        }
      });
    }
    
    setAvailableSlots(slots);
  };

  const handleScheduleInterview = async () => {
    if (!selectedDate || !selectedTime || !interviewType) {
      alert('Please fill in all required fields');
      return;
    }

    setIsScheduling(true);
    
    // Mock scheduling process
    setTimeout(() => {
      const newInterview = {
        id: Date.now(),
        type: interviewType,
        date: selectedDate,
        time: selectedTime,
        duration: parseInt(duration),
        partner: 'TBD',
        partnerRole: 'TBD',
        company: selectedCompany || 'General',
        status: 'finding_partner'
      };
      
      setUpcomingInterviews(prev => [...prev, newInterview]);
      setSelectedDate('');
      setSelectedTime('');
      setIsScheduling(false);
      
      alert('Interview scheduled successfully! We\'ll find a suitable partner for you.');
    }, 2000);
  };

  const cancelInterview = (id) => {
    if (confirm('Are you sure you want to cancel this interview?')) {
      setUpcomingInterviews(prev => prev.filter(interview => interview.id !== id));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'finding_partner': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return 'Confirmed';
      case 'pending': return 'Pending';
      case 'finding_partner': return 'Finding Partner';
      default: return 'Unknown';
    }
  };

  const tabs = [
    { id: 'schedule', name: 'Schedule New', icon: 'Calendar' },
    { id: 'upcoming', name: 'Upcoming', icon: 'Clock' },
    { id: 'history', name: 'History', icon: 'History' }
  ];

  const renderScheduleTab = () => (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="font-medium text-foreground mb-4">Schedule Mock Interview</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Interview Type
              </label>
              <Select
                value={interviewType}
                onValueChange={setInterviewType}
              >
                <option value="behavioral">Behavioral</option>
                <option value="technical">Technical</option>
                <option value="system-design">System Design</option>
                <option value="case-study">Case Study</option>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Duration (minutes)
              </label>
              <Select
                value={duration}
                onValueChange={setDuration}
              >
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">60 minutes</option>
                <option value="75">75 minutes</option>
                <option value="90">90 minutes</option>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Partner Preference
              </label>
              <Select
                value={partnerPreference}
                onValueChange={setPartnerPreference}
              >
                <option value="anyone">Anyone Available</option>
                <option value="senior">Senior Level (5+ years)</option>
                <option value="manager">Manager Level</option>
                <option value="same-company">Same Company Experience</option>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Preferred Date
              </label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Preferred Time
              </label>
              <Select
                value={selectedTime}
                onValueChange={setSelectedTime}
                disabled={!selectedDate}
              >
                <option value="">Select Time</option>
                {availableSlots
                  .filter(slot => slot.date === selectedDate)
                  .map((slot, index) => (
                    <option key={index} value={slot.time}>
                      {slot.time}
                    </option>
                  ))}
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                className="w-full p-3 border border-border rounded-lg resize-none bg-background text-foreground"
                rows="3"
                placeholder="Any specific topics you'd like to focus on..."
              />
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-text-secondary">
            {selectedDate && selectedTime && (
              <span>
                Selected: {new Date(selectedDate + 'T00:00:00').toLocaleDateString()} at {selectedTime}
              </span>
            )}
          </div>
          <Button
            onClick={handleScheduleInterview}
            loading={isScheduling}
            iconName="Calendar"
            iconPosition="left"
            disabled={!selectedDate || !selectedTime}
          >
            Schedule Interview
          </Button>
        </div>
      </div>
      
      {/* Quick Tips */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="font-medium text-foreground mb-4">Scheduling Tips</h3>
        <div className="space-y-2 text-sm text-text-secondary">
          <div className="flex items-start space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
            <span>Schedule interviews 24 hours in advance for better partner matching</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
            <span>Behavioral interviews typically take 30-45 minutes</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
            <span>System design interviews usually require 60-90 minutes</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
            <span>You can reschedule up to 2 hours before the interview</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUpcomingTab = () => (
    <div className="space-y-4">
      {upcomingInterviews.length === 0 ? (
        <div className="text-center py-12">
          <Icon name="Calendar" size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-text-secondary">No upcoming interviews scheduled</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setSelectedTab('schedule')}
            iconName="Plus"
            iconPosition="left"
          >
            Schedule Your First Interview
          </Button>
        </div>
      ) : (
        upcomingInterviews.map((interview) => (
          <div key={interview.id} className="bg-surface border border-border rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Users" size={24} color="white" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{interview.type} Interview</h3>
                  <div className="space-y-1 mt-1">
                    <div className="flex items-center space-x-2 text-sm text-text-secondary">
                      <Icon name="Calendar" size={14} />
                      <span>
                        {new Date(interview.date + 'T00:00:00').toLocaleDateString()} at {interview.time}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-text-secondary">
                      <Icon name="Clock" size={14} />
                      <span>{interview.duration} minutes</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-text-secondary">
                      <Icon name="Building" size={14} />
                      <span>{interview.company} preparation</span>
                    </div>
                    {interview.partner !== 'TBD' && (
                      <div className="flex items-center space-x-2 text-sm text-text-secondary">
                        <Icon name="User" size={14} />
                        <span>{interview.partner} ({interview.partnerRole})</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={cn(
                  "px-2 py-1 text-xs rounded-full",
                  getStatusColor(interview.status) === 'success' && "bg-success/20 text-success",
                  getStatusColor(interview.status) === 'warning' && "bg-warning/20 text-warning",
                  getStatusColor(interview.status) === 'secondary' && "bg-secondary/20 text-secondary"
                )}>
                  {getStatusText(interview.status)}
                </span>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Edit"
                    iconPosition="left"
                  >
                    Reschedule
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => cancelInterview(interview.id)}
                    iconName="X"
                    iconPosition="left"
                    className="text-error hover:text-error"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const renderHistoryTab = () => (
    <div className="space-y-4">
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="font-medium text-foreground mb-4">Interview History</h3>
        <div className="space-y-4">
          {[
            {
              date: '2025-07-15',
              type: 'Behavioral',
              partner: 'Emma Wilson',
              score: 85,
              feedback: 'Great storytelling, work on being more concise'
            },
            {
              date: '2025-07-12',
              type: 'Technical',
              partner: 'David Kim',
              score: 78,
              feedback: 'Strong problem-solving, optimize code efficiency'
            },
            {
              date: '2025-07-08',
              type: 'System Design',
              partner: 'Lisa Chen',
              score: 72,
              feedback: 'Good architecture, consider scalability earlier'
            }
          ].map((session, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <h4 className="font-medium text-foreground">{session.type} Interview</h4>
                <div className="flex items-center space-x-4 mt-1 text-sm text-text-secondary">
                  <span>{new Date(session.date + 'T00:00:00').toLocaleDateString()}</span>
                  <span>with {session.partner}</span>
                </div>
                <p className="text-sm text-text-secondary mt-1">{session.feedback}</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-foreground">{session.score}%</div>
                <div className="text-sm text-text-secondary">Score</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Mock Interview Scheduler</h2>
          <p className="text-text-secondary mt-1">
            Practice with peers and get real-time feedback
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            iconName="Users"
            iconPosition="left"
          >
            Find Practice Partners
          </Button>
          <Button
            variant="outline"
            iconName="Calendar"
            iconPosition="left"
          >
            Sync Calendar
          </Button>
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
        {selectedTab === 'schedule' && renderScheduleTab()}
        {selectedTab === 'upcoming' && renderUpcomingTab()}
        {selectedTab === 'history' && renderHistoryTab()}
      </div>
    </div>
  );
};

export default MockInterviewScheduler;