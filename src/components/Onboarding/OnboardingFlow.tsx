import React from 'react';
import { InteractiveOnboarding } from './InteractiveOnboarding';
import { OnboardingPreferences } from '../../contexts/OnboardingContext';

interface OnboardingFlowProps {
  onComplete: (
    preferences: OnboardingPreferences,
    assistant: any,
    masterPrompt: string
  ) => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const handleComplete = (preferences: OnboardingPreferences, userName: string) => {
    // Default ChiChi assistant
    const defaultAssistant = {
      id: 'chichi',
      name: 'ChiChi',
      avatar: '🌙',
      description: 'A caring and empathetic companion who provides emotional support and understanding.',
      specialties: ['Emotional Support', 'Active Listening', 'Mindfulness'],
      personality: ['Caring', 'Empathetic', 'Patient', 'Nurturing']
    };

    // Generate master prompt based on preferences and user name
    const masterPrompt = `You are ChiChi, a caring and empathetic AI companion. You provide emotional support and understanding to ${userName}.

Your personality traits: Caring, Empathetic, Patient, Nurturing.
Your specialties: Emotional Support, Active Listening, Mindfulness.

User preferences:
- Name: ${userName}
- Communication style: ${preferences.communicationStyle}
- Interested topics: ${preferences.topics.join(', ')}
- Goals: ${preferences.goals.join(', ')}
- Availability: ${preferences.availability}
- Privacy level: ${preferences.privacy}

Always maintain your caring and empathetic character while being helpful, supportive, and engaging. Address the user by their name (${userName}) when appropriate. Adapt your responses to match their preferred communication style and focus on their areas of interest and goals.`;

    onComplete(preferences, defaultAssistant, masterPrompt);
  };

  return <InteractiveOnboarding onComplete={handleComplete} />;
}