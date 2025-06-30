import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  Heart, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { OnboardingPreferences } from '../../contexts/OnboardingContext';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'chichi';
  timestamp: Date;
  options?: string[];
}

interface InteractiveOnboardingProps {
  onComplete: (preferences: OnboardingPreferences, name: string) => void;
}

export function InteractiveOnboarding({ onComplete }: InteractiveOnboardingProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm ChiChi, your AI companion. I'm so excited to meet you! 🌙✨",
      sender: 'chichi',
      timestamp: new Date()
    },
    {
      id: '2',
      content: "I'd love to get to know you better so I can be the best companion for you. Shall we start?",
      sender: 'chichi',
      timestamp: new Date(),
      options: ['Yes, let\'s start!', 'Tell me more about yourself first']
    }
  ]);
  
  const [currentInput, setCurrentInput] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState<Partial<OnboardingPreferences>>({});
  const [userName, setUserName] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const onboardingFlow = [
    {
      question: "What would you like me to call you?",
      type: 'text',
      key: 'name'
    },
    {
      question: "How would you like me to communicate with you?",
      type: 'options',
      key: 'communicationStyle',
      options: [
        { value: 'casual', label: 'Casual & Friendly - Like chatting with a close friend' },
        { value: 'empathetic', label: 'Empathetic & Caring - Warm and understanding' },
        { value: 'professional', label: 'Professional & Structured - Clear and organized' }
      ]
    },
    {
      question: "What topics interest you most? (You can mention multiple)",
      type: 'text',
      key: 'topics'
    },
    {
      question: "What are you hoping to achieve with our conversations?",
      type: 'options',
      key: 'goals',
      options: [
        { value: 'emotional_support', label: 'Emotional support and understanding' },
        { value: 'personal_growth', label: 'Personal development and growth' },
        { value: 'stress_relief', label: 'Stress relief and relaxation' },
        { value: 'daily_motivation', label: 'Daily motivation and encouragement' },
        { value: 'creative_inspiration', label: 'Creative inspiration and ideas' }
      ]
    }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (content: string, sender: 'user' | 'chichi', options?: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date(),
      options
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleUserResponse = (response: string) => {
    addMessage(response, 'user');
    
    if (currentStep < onboardingFlow.length) {
      const step = onboardingFlow[currentStep];
      
      if (step.key === 'name') {
        setUserName(response);
        setTimeout(() => {
          addMessage(`Nice to meet you, ${response}! That's a lovely name. 😊`, 'chichi');
          setTimeout(() => proceedToNextStep(), 1000);
        }, 500);
      } else if (step.key === 'topics') {
        const topics = response.split(',').map(t => t.trim()).filter(t => t.length > 0);
        setPreferences(prev => ({ ...prev, topics }));
        setTimeout(() => {
          addMessage(`Those sound like fascinating topics! I'd love to explore ${topics.slice(0, 2).join(' and ')} with you.`, 'chichi');
          setTimeout(() => proceedToNextStep(), 1000);
        }, 500);
      } else {
        // Handle option selection
        const selectedOption = step.options?.find(opt => opt.value === response || opt.label === response);
        if (selectedOption) {
          if (step.key === 'communicationStyle') {
            setPreferences(prev => ({ ...prev, communicationStyle: selectedOption.value as any }));
          } else if (step.key === 'goals') {
            setPreferences(prev => ({ ...prev, goals: [selectedOption.value] }));
          }
        }
        setTimeout(() => proceedToNextStep(), 500);
      }
    }
  };

  const proceedToNextStep = () => {
    const nextStep = currentStep + 1;
    
    if (nextStep < onboardingFlow.length) {
      setCurrentStep(nextStep);
      const step = onboardingFlow[nextStep];
      
      setTimeout(() => {
        addMessage(step.question, 'chichi', step.type === 'options' ? step.options?.map(opt => opt.label) : undefined);
      }, 500);
    } else {
      // Complete onboarding
      setTimeout(() => {
        addMessage(`Perfect! I feel like I'm getting to know you already, ${userName}. I'm excited to be your companion on this journey! 💜`, 'chichi');
        setTimeout(() => {
          const finalPreferences: OnboardingPreferences = {
            communicationStyle: preferences.communicationStyle || 'empathetic',
            topics: preferences.topics || [],
            goals: preferences.goals || [],
            availability: 'anytime',
            privacy: 'high'
          };
          onComplete(finalPreferences, userName);
        }, 2000);
      }, 500);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim()) {
      handleUserResponse(currentInput.trim());
      setCurrentInput('');
    }
  };

  const handleOptionClick = (option: string) => {
    const step = onboardingFlow[currentStep];
    if (step?.type === 'options') {
      const selectedOption = step.options?.find(opt => opt.label === option);
      handleUserResponse(selectedOption?.value || option);
    } else {
      handleUserResponse(option);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-teal-50/20 dark:from-slate-900 dark:via-purple-900/30 dark:to-teal-900/20 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl h-[600px] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-teal-500 text-white p-6 rounded-t-3xl">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl floating">
              🌙
            </div>
            <div>
              <h2 className="text-xl font-bold">Getting to know you</h2>
              <p className="text-purple-100">Chat with ChiChi to personalize your experience</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs px-4 py-3 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-purple-500 to-teal-500 text-white rounded-br-sm'
                  : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-sm shadow-sm'
              }`}>
                <p className="text-sm">{message.content}</p>
                {message.options && (
                  <div className="mt-3 space-y-2">
                    {message.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleOptionClick(option)}
                        className="w-full text-left p-2 bg-purple-100 dark:bg-slate-600 text-purple-800 dark:text-purple-200 rounded-lg hover:bg-purple-200 dark:hover:bg-slate-500 transition-colors text-xs"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-b-3xl border-t border-white/20">
          <form onSubmit={handleSend} className="flex items-center space-x-3">
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder="Type your response..."
              className="flex-1 px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-300 dark:text-white"
            />
            <button
              type="submit"
              disabled={!currentInput.trim()}
              className="p-3 bg-gradient-to-r from-purple-500 to-teal-500 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}