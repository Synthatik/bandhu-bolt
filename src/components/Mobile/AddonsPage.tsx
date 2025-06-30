import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Star,
  Download,
  Crown,
  Check,
  Music,
  Heart,
  Brain,
  Palette,
  Camera,
  Gamepad2,
  Book,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BottomNavigation } from './BottomNavigation';
import { useAuth } from '../../contexts/AuthContext';

const addons = [
  {
    id: 'voice-chat',
    name: 'Voice Conversations',
    description: 'Have natural voice conversations with your AI companion using advanced speech synthesis.',
    icon: Music,
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
    price: 'Free',
    rating: 4.6,
    downloads: 15432,
    isPro: false,
    isInstalled: true,
    gradient: 'from-orange-500 to-red-500'
  }
];

export function AddonsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('all');

  const hasProSubscription = user?.subscription?.status === 'active' && 
                            (user?.subscription?.plan === 'pro' || user?.subscription?.plan === 'lifetime');

  const filteredAddons = addons.filter(addon => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'installed') return addon.isInstalled;
    if (selectedTab === 'free') return !addon.isPro;
    if (selectedTab === 'pro') return addon.isPro;
    return true;
  });

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-wwdc-gray-6 via-blue-50/30 to-green-50/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-wwdc-blue to-wwdc-indigo text-white safe-area-top">
        <div className="px-6 pt-4 pb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/chats')}
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-display-small font-sf-pro">Add-ons</h1>
                <p className="text-blue-100 text-body-medium">Enhance your experience</p>
              </div>
            </div>
            
            {!hasProSubscription && (
              <button
                onClick={() => navigate('/subscription')}
                className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition-colors"
              >
                <Crown className="w-4 h-4" />
                <span className="text-body-small font-medium">Upgrade</span>
              </button>
            )}
          </div>
          
          {/* Tabs */}
          <div className="flex bg-white/20 rounded-2xl p-1">
            {[
              { key: 'all', label: 'All' },
              { key: 'installed', label: 'Installed' },
              { key: 'free', label: 'Free' },
              { key: 'pro', label: 'Pro' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedTab(tab.key)}
                className={`flex-1 py-2 px-3 rounded-xl font-sf-pro font-medium transition-all ${
                  selectedTab === tab.key
                    ? 'bg-white text-wwdc-blue'
                    : 'text-white/80'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pro Banner */}
      {!hasProSubscription && selectedTab !== 'free' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-6 mt-6 bg-gradient-to-r from-wwdc-purple to-wwdc-pink text-white rounded-3xl p-6"
        >
          <div className="flex items-center space-x-4">
            <Crown className="w-12 h-12" />
            <div className="flex-1">
              <h3 className="text-title-large font-sf-pro mb-1">Unlock Premium Add-ons</h3>
              <p className="text-body-medium text-purple-100 mb-3">
                Get access to advanced features with Pro
              </p>
              <button
                onClick={() => navigate('/subscription')}
                className="bg-white text-wwdc-purple px-4 py-2 rounded-xl font-sf-pro font-semibold"
              >
                Upgrade Now
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Add-ons List */}
      <div className="flex-1 overflow-y-auto p-6 pb-24">
        <div className="space-y-4">
          {filteredAddons.map((addon, index) => {
            const Icon = addon.icon;
            const canInstall = !addon.isPro || hasProSubscription;
            
            return (
              <motion.div
                key={addon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/70 rounded-3xl p-6 shadow-sm"
              >
                {/* Header */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${addon.gradient} rounded-2xl flex items-center justify-center shadow-md`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-title-large font-sf-pro text-slate-800">{addon.name}</h3>
                      {addon.isPro && <Crown className="w-4 h-4 text-amber-500" />}
                      {addon.isInstalled && <div className="w-3 h-3 bg-wwdc-green rounded-full" />}
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-amber-400 fill-current" />
                        <span className="text-body-small text-slate-600">{addon.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Download className="w-4 h-4 text-slate-400" />
                        <span className="text-body-small text-slate-600">{addon.downloads.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-body-medium text-slate-600 mb-4 leading-relaxed">
                  {addon.description}
                </p>

                {/* Price and Action */}
                <div className="flex items-center justify-between">
                  <span className={`font-sf-pro font-semibold ${
                    addon.price === 'Free' ? 'text-wwdc-green' : 'text-wwdc-purple'
                  }`}>
                    {addon.price}
                  </span>
                  
                  <button
                    disabled={addon.isPro && !hasProSubscription}
                    className={`px-6 py-3 rounded-2xl font-sf-pro font-semibold transition-all ${
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
            <div className="w-24 h-24 bg-gradient-to-br from-wwdc-blue/10 to-wwdc-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-12 h-12 text-wwdc-blue" />
            </div>
            <h3 className="text-headline-medium font-sf-pro text-slate-800 mb-2">No add-ons found</h3>
            <p className="text-body-large text-slate-600">Try switching to a different category</p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}