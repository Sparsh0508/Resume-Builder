import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';
import { cn } from '../../../utils/cn';

const InterviewQuestions = ({ resumeData, selectedCompany, selectedRole, onUpdateProgress }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [savedAnswers, setSavedAnswers] = useState({});
  const [questionType, setQuestionType] = useState('behavioral');
  const [difficulty, setDifficulty] = useState('medium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSTARHelper, setShowSTARHelper] = useState(false);

  // Generate questions based on resume data
  useEffect(() => {
    generateQuestions();
  }, [questionType, difficulty, selectedCompany, selectedRole, resumeData]);

  const generateQuestions = () => {
    setIsGenerating(true);
    
    // Mock AI-generated questions based on resume
    const mockQuestions = {
      behavioral: [
        {
          id: 1,
          question: "Tell me about a time when you led a team of 5 developers. How did you handle conflicts?",
          category: "Leadership",
          resumeConnection: "Based on your experience at Tech Corp",
          starFramework: {
            situation: "Describe the team structure and project context",
            task: "What was your leadership responsibility?",
            action: "What specific actions did you take to lead effectively?",
            result: "What was the outcome of your leadership?"
          },
          difficulty: "medium",
          companySpecific: selectedCompany ? `${selectedCompany} values collaborative leadership` : null
        },
        {
          id: 2,
          question: "Describe a situation where you had to implement CI/CD pipelines under tight deadlines.",
          category: "Technical Leadership",
          resumeConnection: "Based on your CI/CD pipeline experience",
          starFramework: {
            situation: "What was the project and timeline pressure?",
            task: "What CI/CD implementation was required?",
            action: "How did you approach the implementation?",
            result: "What were the measurable improvements?"
          },
          difficulty: "medium"
        }
      ],
      technical: [
        {
          id: 3,
          question: "How would you optimize a React application that\'s experiencing performance issues?",
          category: "React Performance",
          resumeConnection: "Based on your React skills",
          difficulty: "medium",
          codeExample: true
        },
        {
          id: 4,
          question: "Explain the difference between Docker containers and virtual machines.",
          category: "DevOps",
          resumeConnection: "Based on your Docker experience",
          difficulty: "medium"
        }
      ],
      'system-design': [
        {
          id: 5,
          question: "Design a scalable system for a resume builder application with real-time collaboration.",
          category: "System Architecture",
          resumeConnection: "Based on your full-stack experience",
          difficulty: "hard",
          designComponents: ['Database', 'API', 'Real-time sync', 'Authentication']
        }
      ]
    };

    // Simulate API delay
    setTimeout(() => {
      setQuestions(mockQuestions[questionType] || []);
      setCurrentQuestion(0);
      setIsGenerating(false);
      
      // Update progress
      onUpdateProgress?.({
        totalQuestions: mockQuestions[questionType]?.length || 0
      });
    }, 1500);
  };

  const handleAnswerSave = () => {
    if (userAnswer.trim()) {
      setSavedAnswers(prev => ({
        ...prev,
        [questions[currentQuestion]?.id]: {
          answer: userAnswer,
          timestamp: new Date().toISOString(),
          wordCount: userAnswer.trim().split(/\s+/).length
        }
      }));
      
      // Update progress
      const answeredCount = Object.keys(savedAnswers).length + 1;
      onUpdateProgress?.({
        answeredQuestions: answeredCount,
        averageScore: Math.min(85 + Math.random() * 15, 100) // Mock score
      });
      
      setUserAnswer('');
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setUserAnswer('');
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      const savedAnswer = savedAnswers[questions[currentQuestion - 1]?.id];
      setUserAnswer(savedAnswer?.answer || '');
    }
  };

  const currentQ = questions[currentQuestion];
  const isAnswered = savedAnswers[currentQ?.id];

  if (isGenerating) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Icon name="Loader2" size={48} className="animate-spin text-primary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Generating Personalized Questions</h3>
          <p className="text-text-secondary">Analyzing your resume to create relevant interview questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <Select
            value={questionType}
            onValueChange={setQuestionType}
            className="w-40"
          >
            <option value="behavioral">Behavioral</option>
            <option value="technical">Technical</option>
            <option value="system-design">System Design</option>
          </Select>
          
          <Select
            value={difficulty}
            onValueChange={setDifficulty}
            className="w-32"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={generateQuestions}
            iconName="RefreshCw"
            iconPosition="left"
            loading={isGenerating}
          >
            Generate New Questions
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSTARHelper(!showSTARHelper)}
            iconName="HelpCircle"
            iconPosition="left"
          >
            STAR Method
          </Button>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm text-text-secondary">
            {Object.keys(savedAnswers).length} answered
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {currentQ && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Question Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-surface border border-border rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="MessageSquare" size={20} color="white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{currentQ.category}</h3>
                    <p className="text-sm text-text-secondary">{currentQ.resumeConnection}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={cn(
                    "px-2 py-1 text-xs rounded-full",
                    currentQ.difficulty === 'easy' && "bg-success/20 text-success",
                    currentQ.difficulty === 'medium' && "bg-warning/20 text-warning",
                    currentQ.difficulty === 'hard' && "bg-error/20 text-error"
                  )}>
                    {currentQ.difficulty}
                  </span>
                  {isAnswered && (
                    <div className="flex items-center space-x-1 text-success">
                      <Icon name="Check" size={16} />
                      <span className="text-xs">Answered</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-lg font-medium text-foreground mb-3">
                  {currentQ.question}
                </h2>
                {currentQ.companySpecific && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-800 flex items-center space-x-2">
                      <Icon name="Info" size={16} />
                      <span>{currentQ.companySpecific}</span>
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">Your Answer</label>
                  <div className="text-xs text-text-secondary">
                    {userAnswer.trim().split(/\s+/).filter(word => word.length > 0).length} words
                  </div>
                </div>
                
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type your answer here... Use the STAR method for behavioral questions."
                  className="w-full h-48 p-4 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-foreground"
                />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Mic"
                      iconPosition="left"
                    >
                      Voice Input
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Clock"
                      iconPosition="left"
                    >
                      Time Practice
                    </Button>
                  </div>
                  
                  <Button
                    onClick={handleAnswerSave}
                    disabled={!userAnswer.trim()}
                    iconName="Save"
                    iconPosition="left"
                  >
                    Save Answer
                  </Button>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
                iconName="ChevronLeft"
                iconPosition="left"
              >
                Previous
              </Button>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="BookOpen"
                  iconPosition="left"
                >
                  View All Answers
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Share"
                  iconPosition="left"
                >
                  Share Question
                </Button>
              </div>
              
              <Button
                onClick={handleNextQuestion}
                disabled={currentQuestion === questions.length - 1}
                iconName="ChevronRight"
                iconPosition="right"
              >
                Next
              </Button>
            </div>
          </div>

          {/* Helper Panel */}
          <div className="space-y-4">
            {/* STAR Method Helper */}
            {showSTARHelper && currentQ.starFramework && (
              <div className="bg-surface border border-border rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
                  <Icon name="Target" size={18} />
                  <span>STAR Method Guide</span>
                </h4>
                <div className="space-y-3">
                  {Object.entries(currentQ.starFramework).map(([key, value]) => (
                    <div key={key} className="border-l-4 border-primary pl-3">
                      <div className="font-medium text-sm text-foreground capitalize">{key}</div>
                      <div className="text-xs text-text-secondary mt-1">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Skills */}
            <div className="bg-surface border border-border rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-3">Related Skills</h4>
              <div className="flex flex-wrap gap-2">
                {resumeData?.skills?.slice(0, 6).map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-surface border border-border rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-3">Quick Tips</h4>
              <div className="space-y-2 text-sm text-text-secondary">
                <div className="flex items-start space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                  <span>Be specific with examples</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                  <span>Quantify your achievements</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                  <span>Focus on your contribution</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                  <span>Practice out loud</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewQuestions;