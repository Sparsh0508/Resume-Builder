import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import ResumeManagementDashboard from "pages/resume-management-dashboard";
import MultiStepResumeBuilder from "pages/multi-step-resume-builder";
import ResumeTemplatesGallery from "pages/resume-templates-gallery";
import ResumeAnalyticsDashboard from "pages/resume-analytics-dashboard";
import InterviewPreparationHub from "pages/interview-preparation-hub";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<ResumeManagementDashboard />} />
        <Route path="/resume-management-dashboard" element={<ResumeManagementDashboard />} />
        <Route path="/multi-step-resume-builder" element={<MultiStepResumeBuilder />} />
        <Route path="/resume-templates-gallery" element={<ResumeTemplatesGallery />} />
        <Route path="/resume-analytics-dashboard" element={<ResumeAnalyticsDashboard />} />
        <Route path="/interview-preparation-hub" element={<InterviewPreparationHub />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;