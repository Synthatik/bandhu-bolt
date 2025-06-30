import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Plus, 
  Search, 
  Filter,
  Heart,
  Brain,
  Smile,
  Zap,
  Star,
  MessageCircle,
  Users,
  Settings
} from 'lucide-react';
import { Header } from '../Layout/Header';
import { useAuth } from '../../contexts/AuthContext';

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
    status: 'active',
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
    status: 'active',
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
    status: 'active',
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
    status: 'beta',
    gradient: 'from-indigo-500 to-purple-500'
  }
];

export function AssistantsPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredAssistants = assistants.filter(assistant => {
    const matchesSearch = assistant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         assistant.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         assistant.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = selectedFilter === 'all' || assistant.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const isAdminRole = user?.role === 'admin' || user?.role === 'super_admin' || user?.role === 'trainer';

  return (
    <div className="space-y-6">
      <Header 
        title="AI Assistants" 
        subtitle={isAdminRole ? "Manage and configure AI assistants" : "Choose your perfect AI companion"}
      >
        {isAdminRole && (
          <button className="btn-primary flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Create Assistant</span>
          </button>
        )}
      </Header>
      
      <div className="px-6">
        {/* Filters and Search */}
        <div className="card mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'all', label: 'All Assistants' },
                { key: 'active', label: 'Active' },
                { key: 'beta', label: 'Beta' },
                { key: 'popular', label: 'Most Popular' }
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setSelectedFilter(filter.key)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    selectedFilter === filter.key
                      ? 'bg-wwdc-blue text-white'
                      : 'bg-white/50 text-slate-600 hover:bg-white/70 border border-white/30'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search assistants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-wwdc-blue/20 focus:border-wwdc-blue"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Assistants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssistants.map((assistant, index) => (
            <motion.div
              key={assistant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card hover:shadow-xl transition-all duration-300 group"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-16 h-16 bg-gradient-to-br ${assistant.gradient} rounded-2xl flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform`}>
                    {assistant.avatar}
                  </div>
                  <div>
                    <h3 className="text-title-large font-sf-pro text-slate-800">{assistant.name}</h3>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-amber-400 fill-current" />
                        <span className="text-body-small text-slate-600">{assistant.rating}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-label-small font-medium ${
                        assistant.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {assistant.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                {isAdminRole && (
                  <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                    <Settings className="w-4 h-4" />
                  </button>
                )}
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

              {/* Stats */}
              <div className="flex items-center justify-between mb-6 p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4 text-wwdc-blue" />
                  <span className="text-body-small text-slate-600">{assistant.conversations.toLocaleString()} chats</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-wwdc-green" />
                  <span className="text-body-small text-slate-600">Active now</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                {!isAdminRole ? (
                  <>
                    <button className="flex-1 btn-secondary">
                      Learn More
                    </button>
                    <button className="flex-1 btn-primary">
                      Start Chat
                    </button>
                  </>
                ) : (
                  <>
                    <button className="flex-1 btn-secondary">
                      Configure
                    </button>
                    <button className="flex-1 btn-primary">
                      Test Chat
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredAssistants.length === 0 && (
          <div className="text-center py-12">
            <Sparkles className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-headline-small font-sf-pro text-slate-600 mb-2">No assistants found</h3>
            <p className="text-body-medium text-slate-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Admin Tools */}
        {isAdminRole && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card mt-8"
          >
            <h3 className="text-headline-medium font-sf-pro text-slate-800 mb-6">Assistant Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="btn-secondary flex items-center space-x-2 justify-center">
                <Brain className="w-4 h-4" />
                <span>Training Data</span>
              </button>
              <button className="btn-secondary flex items-center space-x-2 justify-center">
                <Zap className="w-4 h-4" />
                <span>Performance Analytics</span>
              </button>
              <button className="btn-secondary flex items-center space-x-2 justify-center">
                <Heart className="w-4 h-4" />
                <span>User Feedback</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}