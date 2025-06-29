import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';
import { OnboardingProvider, useOnboarding } from './contexts/OnboardingContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { useDeviceDetection } from './hooks/useDeviceDetection';
import { LandingPage } from './components/Landing/LandingPage';
import { LoginPage } from './components/Auth/LoginPage';
import { OnboardingFlow } from './components/Onboarding/OnboardingFlow';
import { MobileApp } from './components/Mobile/MobileApp';
import { DesktopApp } from './components/Desktop/DesktopApp';
import { motion } from 'framer-motion';

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50/30 to-teal-50/20">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-teal-500 rounded-full flex items-center justify-center text-4xl floating">
          🌙
        </div>
        <h2 className="text-2xl font-bold gradient-text mb-2">Dream Assistant</h2>
        <p className="text-slate-600">Loading your companion...</p>
      </motion.div>
    </div>
  );
}

function AppContent() {
  const { user, isLoading } = useAuth();
  const { isMobile } = useDeviceDetection();
  const { showOnboarding, setShowOnboarding, completeOnboarding } = useOnboarding();

  useEffect(() => {
    // Check if user needs onboarding
    if (user && user.role === 'end_user') {
      const onboardingComplete = localStorage.getItem('onboardingComplete');
      if (!onboardingComplete) {
        setShowOnboarding(true);
      }
    }
  }, [user, setShowOnboarding]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  // Landing page for non-authenticated users
  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  // Show onboarding for new users
  if (showOnboarding && user.role === 'end_user') {
    return (
      <OnboardingFlow
        onComplete={(preferences, assistant, masterPrompt) => {
          completeOnboarding(preferences, assistant, masterPrompt);
        }}
      />
    );
  }

  // Mobile-first experience for end users
  if (isMobile || user.role === 'end_user') {
    return <MobileApp />;
  }

  // Desktop experience for admin roles
  return <DesktopApp />;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <OnboardingProvider>
          <ChatProvider>
            <Router>
              <AppContent />
            </Router>
          </ChatProvider>
        </OnboardingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;