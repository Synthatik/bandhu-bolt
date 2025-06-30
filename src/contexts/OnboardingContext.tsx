import React, { createContext, useContext, useState } from 'react';

export interface OnboardingPreferences {
  communicationStyle: 'casual' | 'professional' | 'empathetic';
  topics: string[];
  goals: string[];
  availability: 'anytime' | 'business_hours' | 'evenings';
  privacy: 'high' | 'medium' | 'low';
}

export interface AssistantPersonality {
  id: string;
  name: string;
  avatar: string;
  description: string;
  specialties: string[];
  personality: string[];
}

interface OnboardingContextType {
  showOnboarding: boolean;
  setShowOnboarding: (show: boolean) => void;
  completeOnboarding: (
    preferences: OnboardingPreferences,
    assistant: AssistantPersonality,
    masterPrompt: string
  ) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [showOnboarding, setShowOnboarding] = useState(false);

  const completeOnboarding = (
    preferences: OnboardingPreferences,
    assistant: AssistantPersonality,
    masterPrompt: string
  ) => {
    // Save onboarding data
    localStorage.setItem('onboardingComplete', 'true');
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    localStorage.setItem('selectedAssistant', JSON.stringify(assistant));
    localStorage.setItem('masterPrompt', masterPrompt);
    
    setShowOnboarding(false);
  };

  return (
    <OnboardingContext.Provider value={{
      showOnboarding,
      setShowOnboarding,
      completeOnboarding
    }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}