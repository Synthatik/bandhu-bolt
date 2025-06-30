import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Star,
  Download,
  Zap,
  Heart,
  Brain,
  Palette,
  Music,
  Camera,
  Gamepad2,
  Book,
  Crown,
  Check
} from 'lucide-react';
import { Header } from '../Layout/Header';
import { useAuth } from '../../contexts/AuthContext';

const addons = [
  {
    id: 'voice-chat',
    name: 'Voice Conversations',
    description: 'Have natural voice conversations with your AI companion using advanced speech synthesis.',
    icon: Music,
    category: 'Communication',
    price: 'Pro Feature',
    rating: 4.9,
    downloads: 12543,
    isPro: true,
    isInstalled: false,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'mood-tracking',
    name: 'Mood Tracking',
    description: 'Track your emotional well-being with intelligent mood analysis and insights.',
    icon: Heart,
    category: 'Wellness',
    price: 'Free',
    rating: 4.8,
    downloads: 8921,
    isPro: false,
    isInstalled: true,
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    id: 'dream-journal',
    name: 'Dream Journal',
    description: 'Record and analyze your dreams with AI-powered interpretation and patterns.',
    icon: Brain,
    category: 'Wellness',
    price: 'Pro Feature',
    rating: 4.7,
    downloads: 6754,
    isPro: true,
    isInstalled: false,
    gradient: 'from-purple-500 to-indigo-500'
  },
  {
    id: 'custom-themes',
    name: 'Custom Themes',
    description: 'Personalize your chat experience with beautiful themes and color schemes.',
    icon: Palette,
    category: 'Customization',
    price: 'Free',
    rating: 4.6,
    downloads: 15432,
    isPro: false,
    isInstalled: true,
    gradient: 'from-orange-500 to-red-500'
  },
  {
    id: 'photo-sharing',
    name: 'Photo Sharing',
    description: 'Share photos with your AI companion and get thoughtful responses about your memories.',
    icon: Camera,
    category: 'Communication',
    price: 'Pro Feature',
    rating: 4.5,
    downloads: 4321,
    isPro: true,
    isInstalled: false,
    gradient: 'from-green-500 to-teal-500'
  },
  {
    id: 'mindfulness-games',
    name: 'Mindfulness Games',
    description: 'Interactive games and exercises to help you practice mindfulness and relaxation.',
    icon: Gamepad2,
    category: 'Wellness',
    price: 'Pro Feature',
    rating: 4.4,
    downloads: 3210,
    isPro: true,
    isInstalled: false,
    gradient: 'from-amber-500 to-orange-500'
  },
  {
    id: 'reading-companion',
    name: 'Reading Companion',
    description: 'Discuss books, get recommendations, and share your reading journey with your AI.',
    icon: Book,
    category: 'Entertainment',
    price: 'Free',
    rating: 4.3,
    downloads: 2109,
    isPro: false,
    isInstalled: false,
    gradient: 'from-violet-500 to-purple-500'
  },
  {
    id: 'advanced-ai',
    name: 'Advanced AI Model',
    description: 'Access to the latest and most sophisticated AI models for deeper conversations.',
    icon: Zap,
    category: 'AI Enhancement',
    price: 'Pro Feature',
    rating: 4.9,
    downloads: 9876,
    isPro: true,
    isInstalled: false,
    gradient: 'from-cyan-500 to-blue-500'
  }
];

const categories = ['All', 'Communication', 'Wellness', 'Customization', 'Entertainment', 'AI Enhancement'];

export function AddonsPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredAddons = addons.filter(addon => {
    const matchesSearch = addon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         addon.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || addon.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const hasProSubscription = user?.subscription?.status === 'active' && 
                            (user?.subscription?.plan === 'pro' || user?.subscription?.plan === 'lifetime');

  return (
    <div className="space-y-6">
      <Header 
        title="Add-ons & Extensions" 
        subtitle="Enhance your AI companion experience with powerful add-ons"
      >
        {!hasProSubscription && (
          <button className="btn-primary flex items-center space-x-2">
            <Crown className="w-4 h-4" />
            <span>Upgrade to Pro</span>
          </button>
        )}
      </Header>
      
      <div className="px-6">
        {/* Pro Banner */}
        {!hasProSubscription && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-wwdc-purple to-wwdc-pink text-white rounded-3xl p-6 mb-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-headline-medium font-sf-pro mb-2">Unlock Premium Add-ons</h3>
                <p className="text-body-large text-purple-100 mb-4">
                  Get access to advanced features like voice chat, dream journaling, and more with Pro.
                </p>
                <div className="flex items-center space-x-6 text-body-medium text-purple-100">
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4" />
                    <span>All Premium Add-ons</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4" />
                    <span>Unlimited Usage</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4" />
                    <span>Priority Support</span>
                  </div>
                </div>
              </div>
              <button className="bg-white text-wwdc-purple px-6 py-3 rounded-2xl font-sf-pro font-semibold hover:shadow-lg transition-all">
                Upgrade Now
              </button>
            </div>
          </motion.div>
        )}

        {/* Filters and Search */}
        <div className="card mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-wwdc-blue text-white'
                      : 'bg-white/50 text-slate-600 hover:bg-white/70 border border-white/30'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search add-ons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-wwdc-blue/20 focus:border-wwdc-blue"
              />
            </div>
          </div>
        </div>

        {/* Add-ons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAddons.map((addon, index) => {
            const Icon = addon.icon;
            const canInstall = !addon.isPro || hasProSubscription;
            
            return (
              <motion.div
                key={addon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card hover:shadow-xl transition-all duration-300 group"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${addon.gradient} rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {addon.isPro && (
                      <Crown className="w-4 h-4 text-amber-500" />
                    )}
                    {addon.isInstalled && (
                      <div className="w-3 h-3 bg-wwdc-green rounded-full" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="mb-4">
                  <h3 className="text-title-large font-sf-pro text-slate-800 mb-2">{addon.name}</h3>
                  <p className="text-body-medium text-slate-600 leading-relaxed mb-3">
                    {addon.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-body-small text-slate-500">
                    <span className="px-2 py-1 bg-slate-100 rounded-lg">{addon.category}</span>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-amber-400 fill-current" />
                        <span>{addon.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Download className="w-3 h-3" />
                        <span>{addon.downloads.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <div>
                    <span className={`font-semibold ${
                      addon.price === 'Free' ? 'text-wwdc-green' : 'text-wwdc-purple'
                    }`}>
                      {addon.price}
                    </span>
                  </div>
                  
                  <button
                    disabled={addon.isPro && !hasProSubscription}
                    className={`px-4 py-2 rounded-xl font-medium transition-all ${
                      addon.isInstalled
                        ? 'bg-green-100 text-green-700 cursor-default'
                        : canInstall
                        ? 'bg-wwdc-blue text-white hover:bg-blue-600'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {addon.isInstalled ? 'Installed' : 
                     canInstall ? 'Install' : 'Pro Required'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredAddons.length === 0 && (
          <div className="text-center py-12">
            <Plus className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-headline-small font-sf-pro text-slate-600 mb-2">No add-ons found</h3>
            <p className="text-body-medium text-slate-500">Try adjusting your search or category filter.</p>
          </div>
        )}

        {/* Installed Add-ons */}
        {addons.some(addon => addon.isInstalled) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card mt-8"
          >
            <h3 className="text-headline-medium font-sf-pro text-slate-800 mb-6">Installed Add-ons</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {addons.filter(addon => addon.isInstalled).map((addon) => {
                const Icon = addon.icon;
                return (
                  <div key={addon.id} className="flex items-center space-x-3 p-3 bg-white/50 rounded-xl">
                    <div className={`w-10 h-10 bg-gradient-to-br ${addon.gradient} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800">{addon.name}</h4>
                      <p className="text-body-small text-slate-500">{addon.category}</p>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600 transition-colors">
                      <Plus className="w-4 h-4 rotate-45" />
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}