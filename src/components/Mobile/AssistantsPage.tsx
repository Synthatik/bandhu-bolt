import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Star, 
  MessageCircle, 
  Users,
  Search,
  Filter
} from 'lucide-react';
import { BottomNavigation } from './BottomNavigation';
import { useChat } from '../../contexts/ChatContext';

const assistants = [
  {
    id: 'chichi',
    name: 'ChiChi',
    avatar: '🌙',
    description: 'A caring and empathetic companion who provides emotional support and understanding.',
    specialties: ['Emotional Support', 'Active Listening', 'Mindfulness'],
    personality: ['Caring', 'Empathetic', 'Patient', 'Nurturing'],
    rating: 4.9,
    conversations: 12543,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 'dr-luna',
    name: 'Dr. Luna',
    avatar: '🧠',
    description: 'A professional therapist-like assistant focused on mental health and personal growth.',
    specialties: ['Therapy', 'CBT', 'Personal Growth', 'Stress Management'],
    personality: ['Professional', 'Insightful', 'Supportive', 'Analytical'],
    rating: 4.8,
    conversations: 8921,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'alex',
    name: 'Alex',
    avatar: '😊',
    description: 'A friendly and casual companion for everyday conversations and life advice.',
    specialties: ['Life Advice', 'Casual Chat', 'Motivation', 'Friendship'],
    personality: ['Friendly', 'Optimistic', 'Encouraging', 'Relatable'],
    rating: 4.7,
    conversations: 6754,
    gradient: 'from-green-500 to-teal-500'
  },
  {
    id: 'river',
    name: 'River',
    avatar: '🌊',
    description: 'A wise and philosophical companion for deep conversations and self-reflection.',
    specialties: ['Philosophy', 'Self-Reflection', 'Wisdom', 'Deep Conversations'],
    personality: ['Wise', 'Thoughtful', 'Philosophical', 'Calm'],
    rating: 4.6,
    conversations: 4321,
    gradient: 'from-indigo-500 to-purple-500'
  }
];

export function AssistantsPage() {
  const navigate = useNavigate();
  const { createNewChat } = useChat();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAssistants = assistants.filter(assistant =>
    assistant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    assistant.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    assistant.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleStartChat = (assistant: typeof assistants[0]) => {
    const newChat = createNewChat(assistant.id, assistant.name, assistant.avatar);
    navigate(`/chat/${newChat.id}`);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-wwdc-gray-6 via-blue-50/30 to-green-50/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-wwdc-blue to-wwdc-indigo text-white safe-area-top">
        <div className="px-6 pt-4 pb-6">
          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={() => navigate('/chats')}
              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-display-small font-sf-pro">AI Assistants</h1>
              <p className="text-blue-100 text-body-medium">Choose your perfect companion</p>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search assistants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/90 rounded-2xl text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-3 focus:ring-white/30 focus:bg-white transition-all"
            />
          </div>
        </div>
      </div>

      {/* Assistants List */}
      <div className="flex-1 overflow-y-auto p-6 pb-24">
        <div className="space-y-6">
          {filteredAssistants.map((assistant, index) => (
            <motion.div
              key={assistant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/70 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all"
            >
              {/* Header */}
              <div className="flex items-center space-x-4 mb-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${assistant.gradient} rounded-2xl flex items-center justify-center text-2xl shadow-md`}>
                  {assistant.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="text-title-large font-sf-pro text-slate-800">{assistant.name}</h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-amber-400 fill-current" />
                      <span className="text-body-small text-slate-600">{assistant.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4 text-wwdc-blue" />
                      <span className="text-body-small text-slate-600">{assistant.conversations.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-body-medium text-slate-600 mb-4 leading-relaxed">
                {assistant.description}
              </p>

              {/* Specialties */}
              <div className="mb-4">
                <h4 className="text-body-medium font-semibold text-slate-700 mb-2">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {assistant.specialties.map((specialty) => (
                    <span key={specialty} className="px-3 py-1 bg-wwdc-blue/10 text-wwdc-blue rounded-full text-label-medium font-medium">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Personality Traits */}
              <div className="mb-6">
                <h4 className="text-body-medium font-semibold text-slate-700 mb-2">Personality</h4>
                <div className="flex flex-wrap gap-2">
                  {assistant.personality.slice(0, 3).map((trait) => (
                    <span key={trait} className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-label-small">
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleStartChat(assistant)}
                className="w-full bg-gradient-to-r from-wwdc-blue to-wwdc-indigo text-white py-4 rounded-2xl font-sf-pro font-semibold flex items-center justify-center space-x-3 shadow-wwdc hover:shadow-wwdc-lg transition-all transform hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Start Conversation</span>
              </button>
            </motion.div>
          ))}
        </div>

        {filteredAssistants.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-br from-wwdc-blue/10 to-wwdc-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-12 h-12 text-wwdc-blue" />
            </div>
            <h3 className="text-headline-medium font-sf-pro text-slate-800 mb-2">No assistants found</h3>
            <p className="text-body-large text-slate-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}