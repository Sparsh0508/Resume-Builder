import React, { useState, useRef, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';


const VideoPractice = ({ resumeData, onUpdateProgress }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideos, setRecordedVideos] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  const practiceQuestions = [
    "Tell me about yourself and your background.",
    "Why are you interested in this position?",
    "What are your greatest strengths?",
    "Describe a challenge you overcame.",
    "Where do you see yourself in 5 years?",
    "Why should we hire you?",
    "Tell me about a time you worked in a team.",
    "How do you handle stress and pressure?",
    "What are your salary expectations?",
    "Do you have any questions for us?"
  ];

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        
        const newVideo = {
          id: Date.now(),
          url: url,
          question: currentQuestion,
          duration: recordingTime,
          timestamp: new Date().toISOString(),
          analyzed: false
        };
        
        setRecordedVideos(prev => [...prev, newVideo]);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
        
        // Update progress
        onUpdateProgress?.({
          completedSessions: recordedVideos.length + 1
        });
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Unable to access camera and microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      // Stop video stream
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  };

  const selectQuestion = (question) => {
    setCurrentQuestion(question);
    setSelectedQuestion(question);
  };

  const playVideo = (video) => {
    setSelectedVideo(video);
    setIsPlaying(true);
  };

  const analyzeVideo = async (video) => {
    setIsAnalyzing(true);
    
    // Mock analysis - in real implementation, this would call an AI service
    setTimeout(() => {
      const mockAnalysis = {
        overallScore: Math.floor(Math.random() * 30) + 70,
        eyeContact: Math.floor(Math.random() * 20) + 80,
        clarity: Math.floor(Math.random() * 25) + 75,
        confidence: Math.floor(Math.random() * 20) + 80,
        pacing: Math.floor(Math.random() * 15) + 85,
        bodyLanguage: Math.floor(Math.random() * 25) + 75,
        insights: [
          "Maintain better eye contact with the camera",
          "Speak slightly slower for better clarity",
          "Use more hand gestures to emphasize points",
          "Great confidence level throughout the response"
        ],
        keywords: ['leadership', 'teamwork', 'problem-solving', 'communication'],
        duration: video.duration
      };
      
      setAnalysisResults(mockAnalysis);
      setIsAnalyzing(false);
      
      // Mark video as analyzed
      setRecordedVideos(prev => 
        prev.map(v => v.id === video.id ? { ...v, analyzed: true } : v)
      );
    }, 3000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Video Practice Sessions</h2>
          <p className="text-text-secondary mt-1">
            Record yourself answering questions and get AI-powered feedback
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-sm text-text-secondary">
            {recordedVideos.length} sessions completed
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
          >
            Export All
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recording Panel */}
        <div className="space-y-4">
          <div className="bg-surface border border-border rounded-lg p-6">
            <h3 className="font-medium text-foreground mb-4">Practice Recording</h3>
            
            {/* Question Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                Select Question
              </label>
              <Select
                value={selectedQuestion}
                onValueChange={selectQuestion}
                placeholder="Choose a practice question"
              >
                {practiceQuestions.map((question, index) => (
                  <option key={index} value={question}>
                    {question}
                  </option>
                ))}
              </Select>
            </div>

            {/* Selected Question Display */}
            {currentQuestion && (
              <div className="mb-4 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Current Question:</h4>
                <p className="text-foreground">{currentQuestion}</p>
              </div>
            )}

            {/* Video Preview */}
            <div className="mb-4">
              <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                
                {/* Recording Indicator */}
                {isRecording && (
                  <div className="absolute top-4 left-4 flex items-center space-x-2 bg-error text-white px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-sm font-medium">REC {formatTime(recordingTime)}</span>
                  </div>
                )}
                
                {/* Camera Access Message */}
                {!isRecording && !videoRef.current?.srcObject && (
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="text-center">
                      <Icon name="Camera" size={48} className="mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Click Start Recording to begin</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Recording Controls */}
            <div className="flex items-center justify-center space-x-4">
              {!isRecording ? (
                <Button
                  onClick={startRecording}
                  disabled={!currentQuestion}
                  size="lg"
                  iconName="Play"
                  iconPosition="left"
                  className="bg-error hover:bg-error/90 text-white"
                >
                  Start Recording
                </Button>
              ) : (
                <Button
                  onClick={stopRecording}
                  size="lg"
                  iconName="Square"
                  iconPosition="left"
                  variant="outline"
                >
                  Stop Recording
                </Button>
              )}
              
              <Button
                variant="outline"
                size="lg"
                iconName="Settings"
                iconPosition="left"
              >
                Settings
              </Button>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-surface border border-border rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-3">Recording Tips</h4>
            <div className="space-y-2 text-sm text-text-secondary">
              <div className="flex items-start space-x-2">
                <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                <span>Look directly at the camera, not the screen</span>
              </div>
              <div className="flex items-start space-x-2">
                <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                <span>Ensure good lighting on your face</span>
              </div>
              <div className="flex items-start space-x-2">
                <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                <span>Speak clearly and at a moderate pace</span>
              </div>
              <div className="flex items-start space-x-2">
                <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                <span>Use hand gestures naturally</span>
              </div>
            </div>
          </div>
        </div>

        {/* Playback & Analysis Panel */}
        <div className="space-y-4">
          {/* Recorded Videos */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h3 className="font-medium text-foreground mb-4">Your Recordings</h3>
            
            {recordedVideos.length === 0 ? (
              <div className="text-center py-8">
                <Icon name="Video" size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-text-secondary">No recordings yet. Start practicing!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recordedVideos.map((video) => (
                  <div key={video.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground text-sm line-clamp-1">
                        {video.question}
                      </h4>
                      <div className="flex items-center space-x-3 mt-1 text-xs text-text-secondary">
                        <span>{formatTime(video.duration)}</span>
                        <span>{new Date(video.timestamp).toLocaleDateString()}</span>
                        {video.analyzed && (
                          <span className="flex items-center space-x-1 text-success">
                            <Icon name="CheckCircle" size={12} />
                            <span>Analyzed</span>
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => playVideo(video)}
                        iconName="Play"
                        iconPosition="left"
                      >
                        Play
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => analyzeVideo(video)}
                        disabled={isAnalyzing}
                        iconName="BarChart3"
                        iconPosition="left"
                      >
                        {video.analyzed ? 'View Analysis' : 'Analyze'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Analysis Results */}
          {analysisResults && (
            <div className="bg-surface border border-border rounded-lg p-6">
              <h3 className="font-medium text-foreground mb-4">AI Analysis Results</h3>
              
              {isAnalyzing ? (
                <div className="text-center py-8">
                  <Icon name="Loader2" size={48} className="animate-spin text-primary mx-auto mb-4" />
                  <p className="text-text-secondary">Analyzing your performance...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Overall Score */}
                  <div className="text-center">
                    <div className="text-3xl font-bold text-foreground mb-1">
                      {analysisResults.overallScore}%
                    </div>
                    <div className="text-sm text-text-secondary">Overall Performance</div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(analysisResults)
                      .filter(([key]) => ['eyeContact', 'clarity', 'confidence', 'pacing', 'bodyLanguage'].includes(key))
                      .map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-lg font-semibold text-foreground">{value}%</div>
                          <div className="text-xs text-text-secondary capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Insights */}
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Key Insights</h4>
                    <div className="space-y-2">
                      {analysisResults.insights.map((insight, index) => (
                        <div key={index} className="flex items-start space-x-2 text-sm">
                          <Icon name="Lightbulb" size={16} className="text-warning mt-0.5" />
                          <span className="text-text-secondary">{insight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Keywords */}
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Keywords Detected</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysisResults.keywords.map((keyword, index) => (
                        <span key={index} className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPractice;