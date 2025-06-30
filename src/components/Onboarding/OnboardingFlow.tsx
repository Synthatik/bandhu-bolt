import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowLeft, 
  Heart, 
  MessageCircle, 
  Shield, 
  Sparkles,
  Check,
  Brain,
  Zap,
  Globe
} from 'lucide-react';
import { OnboardingPreferences, AssistantPersonality } from '../../contexts/OnboardingContext';

interface OnboardingFlowProps {
  onComplete: (
    preferences: OnboardingPreferences,
    assistant: AssistantPersonality,
    masterPrompt: string
  ) => void;
}

const assistants: AssistantPersonality[] = [
  {
    id: 'chichi',
    name: 'ChiChi',
    avatar: '🌙',
    description: 'A caring and empathetic companion who provides emotional support and understanding.',
    specialties: ['Emotional Support', 'Active Listening', 'Mindfulness'],
    personality: ['Caring', 'Empathetic', 'Patient', 'Nurturing']
  },
  {
    id: 'dr-luna',
    name: 'Dr. Luna',
    avatar: '🧠',
    description: 'A professional therapist-like assistant focused on mental health and personal growth.',
    specialties: ['Therapy', 'CBT', 'Personal Growth', 'Stress Management'],
    personality: ['Professional', 'Insightful', 'Supportive', 'Analytical']
  },
  {
    id: 'alex',
    name: 'Alex',
    avatar: '😊',
    description: 'A friendly and casual companion for everyday conversations and life advice.',
    specialties: ['Life Advice', 'Casual Chat', 'Motivation', 'Friendship'],
    personality: ['Friendly', 'Optimistic', 'Encouraging', 'Relatable']
  },
  {
    id: 'river',
    name: 'River',
    avatar: '🌊',
    description: 'A wise and philosophical companion for deep conversations and self-reflection.',
    specialties: ['Philosophy', 'Self-Reflection', 'Wisdom', 'Deep Conversations'],
    personality: ['Wise', 'Thoughtful', 'Philosophical', 'Calm']
  }
];

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState<Partial<OnboardingPreferences>>({});
  const [selectedAssistant, setSelectedAssistant] = useState<AssistantPersonality | null>(null);

  const steps = [
    'Welcome',
    'Communication Style',
    'Topics of Interest',
    'Goals',
    'Choose Assistant',
    'Customize Experience'
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      const finalPreferences: OnboardingPreferences = {
        communicationStyle: preferences.communicationStyle || 'empathetic',
        topics: preferences.topics || [],
        goals: preferences.goals || [],
        availability: preferences.availability || 'anytime',
        privacy: preferences.privacy || 'high'
      };

      const masterPrompt = generateMasterPrompt(finalPreferences, selectedAssistant!);
      onComplete(finalPreferences, selectedAssistant!, masterPrompt);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateMasterPrompt = (prefs: OnboardingPreferences, assistant: AssistantPersonality): string => {
    return `You are ${assistant.name}, ${assistant.description}. 
    
Your personality traits: ${assistant.personality.join(', ')}.
Your specialties: ${assistant.specialties.join(', ')}.

User preferences:
- Communication style: ${prefs.communicationStyle}
- Interested topics: ${prefs.topics.join(', ')}
- Goals: ${prefs.goals.join(', ')}
- Availability: ${prefs.availability}
- Privacy level: ${prefs.privacy}

Always maintain your character while being helpful, supportive, and engaging. Adapt your responses to match the user's preferred communication style and focus on their areas of interest and goals.`;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-24 h-24 bg-gradient-to-br from-wwdc-blue to-wwdc-green rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Heart className="w-12 h-12 text-white" />
            </motion.div>
            <h2 className="text-display-small font-sf-pro gradient-text mb-4">Welcome to Dream Assistant</h2>
            <p className="text-body-large text-slate-600 mb-8 max-w-md mx-auto">
              Let's personalize your AI companion experience. This will only take a few minutes.
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
              <div className="flex items-center space-x-2 text-body-medium text-slate-600">
                <Shield className="w-5 h-5 text-wwdc-green" />
                <span>Private & Secure</span>
              </div>
              <div className="flex items-center space-x-2 text-body-medium text-slate-600">
                <Sparkles className="w-5 h-5 text-wwdc-purple" />
                <span>Personalized</span>
              </div>
              <div className="flex items-center space-x-2 text-body-medium text-slate-600">
                <Brain className="w-5 h-5 text-wwdc-blue" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center space-x-2 text-body-medium text-slate-600">
                <Globe className="w-5 h-5 text-wwdc-teal" />
                <span>Always Available</span>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div>
            <h2 className="text-headline-large font-sf-pro text-slate-800 mb-4">Communication Style</h2>
            <p className="text-body-large text-slate-600 mb-8">How would you like your AI companion to communicate with you?</p>
            
            <div className="space-y-4">
              {[
                { value: 'casual', label: 'Casual & Friendly', description: 'Relaxed, informal conversations like with a friend' },
                { value: 'professional', label: 'Professional & Structured', description: 'Clear, organized, and goal-oriented discussions' },
                { value: 'empathetic', label: 'Empathetic & Caring', description: 'Warm, understanding, and emotionally supportive' }
              ].map((style) => (
                <button
                  key={style.value}
                  onClick={() => setPreferences(prev => ({ ...prev, communicationStyle: style.value as any }))}
                  className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                    preferences.communicationStyle === style.value
                      ? 'border-wwdc-blue bg-blue-50'
                      : 'border-white/30 bg-white/50 hover:border-wwdc-blue/50'
                  }`}
                >
                  <h3 className="font-sf-pro font-semibold text-slate-800 mb-1">{style.label}</h3>
                  <p className="text-body-medium text-slate-600">{style.description}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h2 className="text-headline-large font-sf-pro text-slate-800 mb-4">Topics of Interest</h2>
            <p className="text-body-large text-slate-600 mb-8">What would you like to talk about? (Select all that apply)</p>
            
            <div className="grid grid-cols-2 gap-3">
              {[
                'Mental Health', 'Relationships', 'Career', 'Personal Growth',
                'Stress Management', 'Mindfulness', 'Life Goals', 'Creativity',
                'Health & Wellness', 'Learning', 'Hobbies', 'Daily Life'
              ].map((topic) => (
                <button
                  key={topic}
                  onClick={() => {
                    const currentTopics = preferences.topics || [];
                    const newTopics = currentTopics.includes(topic)
                      ? currentTopics.filter(t => t !== topic)
                      : [...currentTopics, topic];
                    setPreferences(prev => ({ ...prev, topics: newTopics }));
                  }}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    preferences.topics?.includes(topic)
                      ? 'border-wwdc-blue bg-blue-50 text-wwdc-blue'
                      : 'border-white/30 bg-white/50 hover:border-wwdc-blue/50'
                  }`}
                >
                  <span className="font-sf-pro font-medium">{topic}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h2 className="text-headline-large font-sf-pro text-slate-800 mb-4">Your Goals</h2>
            <p className="text-body-large text-slate-600 mb-8">What do you hope to achieve with your AI companion?</p>
            
            <div className="space-y-3">
              {[
                'Emotional Support', 'Personal Development', 'Stress Relief',
                'Better Communication', 'Mindfulness Practice', 'Goal Achievement',
                'Creative Inspiration', 'Daily Motivation', 'Problem Solving'
              ].map((goal) => (
                <button
                  key={goal}
                  onClick={() => {
                    const currentGoals = preferences.goals || [];
                    const newGoals = currentGoals.includes(goal)
                      ? currentGoals.filter(g => g !== goal)
                      : [...currentGoals, goal];
                    setPreferences(prev => ({ ...prev, goals: newGoals }));
                  }}
                  className={`w-full p-3 rounded-xl border-2 transition-all text-left ${
                    preferences.goals?.includes(goal)
                      ? 'border-wwdc-blue bg-blue-50 text-wwdc-blue'
                      : 'border-white/30 bg-white/50 hover:border-wwdc-blue/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-sf-pro font-medium">{goal}</span>
                    {preferences.goals?.includes(goal) && (
                      <Check className="w-5 h-5 text-wwdc-blue" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <h2 className="text-headline-large font-sf-pro text-slate-800 mb-4">Choose Your Companion</h2>
            <p className="text-body-large text-slate-600 mb-8">Select the AI assistant that best matches your needs</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assistants.map((assistant) => (
                <button
                  key={assistant.id}
                  onClick={() => setSelectedAssistant(assistant)}
                  className={`p-6 rounded-2xl border-2 transition-all text-left ${
                    selectedAssistant?.id === assistant.id
                      ? 'border-wwdc-blue bg-blue-50'
                      : 'border-white/30 bg-white/50 hover:border-wwdc-blue/50'
                  }`}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-wwdc-blue to-wwdc-green rounded-2xl flex items-center justify-center text-2xl">
                      {assistant.avatar}
                    </div>
                    <div>
                      <h3 className="font-sf-pro font-bold text-slate-800">{assistant.name}</h3>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {assistant.personality.slice(0, 2).map((trait) => (
                          <span key={trait} className="text-label-small bg-wwdc-blue/10 text-wwdc-blue px-2 py-1 rounded-full">
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-body-medium text-slate-600 mb-3">{assistant.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {assistant.specialties.map((specialty) => (
                      <span key={specialty} className="text-label-small bg-slate-100 text-slate-600 px-2 py-1 rounded-lg">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div>
            <h2 className="text-headline-large font-sf-pro text-slate-800 mb-4">Final Touches</h2>
            <p className="text-body-large text-slate-600 mb-8">Let's customize your experience</p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-title-medium font-sf-pro text-slate-700 mb-3">When are you usually available?</label>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { value: 'anytime', label: 'Anytime', description: 'I\'m flexible with timing' },
                    { value: 'business_hours', label: 'Business Hours', description: '9 AM - 5 PM weekdays' },
                    { value: 'evenings', label: 'Evenings', description: 'After work and weekends' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setPreferences(prev => ({ ...prev, availability: option.value as any }))}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        preferences.availability === option.value
                          ? 'border-wwdc-blue bg-blue-50'
                          : 'border-white/30 bg-white/50 hover:border-wwdc-blue/50'
                      }`}
                    >
                      <h3 className="font-sf-pro font-semibold text-slate-800">{option.label}</h3>
                      <p className="text-body-medium text-slate-600">{option.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-title-medium font-sf-pro text-slate-700 mb-3">Privacy Level</label>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { value: 'high', label: 'High Privacy', description: 'Minimal data collection, maximum security' },
                    { value: 'medium', label: 'Balanced', description: 'Some data for personalization' },
                    { value: 'low', label: 'Enhanced Features', description: 'More data for better experience' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setPreferences(prev => ({ ...prev, privacy: option.value as any }))}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        preferences.privacy === option.value
                          ? 'border-wwdc-blue bg-blue-50'
                          : 'border-white/30 bg-white/50 hover:border-wwdc-blue/50'
                      }`}
                    >
                      <h3 className="font-sf-pro font-semibold text-slate-800">{option.label}</h3>
                      <p className="text-body-medium text-slate-600">{option.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return true;
      case 1: return !!preferences.communicationStyle;
      case 2: return (preferences.topics?.length || 0) > 0;
      case 3: return (preferences.goals?.length || 0) > 0;
      case 4: return !!selectedAssistant;
      case 5: return !!preferences.availability && !!preferences.privacy;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-wwdc-gray-6 via-blue-50/30 to-green-50/20 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-body-medium text-slate-600">Step {currentStep + 1} of {steps.length}</span>
            <span className="text-body-medium text-slate-600">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-wwdc-blue to-wwdc-green h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="card mb-8"
        >
          {renderStep()}
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center space-x-2 px-6 py-3 bg-white/50 border border-white/30 rounded-xl font-sf-pro font-medium text-slate-600 hover:bg-white/70 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-wwdc-blue to-wwdc-indigo text-white rounded-xl font-sf-pro font-semibold shadow-wwdc hover:shadow-wwdc-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"
          >
            <span>{currentStep === steps.length - 1 ? 'Complete Setup' : 'Continue'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}