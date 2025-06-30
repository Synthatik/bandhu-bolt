import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  User, 
  Bell, 
  Palette, 
  Shield, 
  Download, 
  Crown,
  ChevronRight,
  Moon,
  Sun,
  Volume2,
  Globe,
  Mail,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BottomNavigation } from './BottomNavigation';
import { useAuth } from '../../contexts/AuthContext';

export function SettingsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const settingsGroups = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Profile', description: 'Manage your personal information', action: () => {} },
        { icon: Crown, label: 'Subscription', description: user?.subscription?.plan || 'Free plan', action: () => navigate('/subscription') },
        { icon: Shield, label: 'Privacy & Security', description: 'Control your data and security', action: () => {} }
      ]
    },
    {
      title: 'Preferences',
      items: [
        { icon: Bell, label: 'Notifications', description: 'Manage notification settings', action: () => {} },
        { icon: Palette, label: 'Appearance', description: 'Customize your experience', action: () => {} },
        { icon: Volume2, label: 'Sound & Voice', description: 'Audio preferences', action: () => {} },
        { icon: Globe, label: 'Language', description: 'English (US)', action: () => {} }
      ]
    },
    {
      title: 'Data',
      items: [
        { icon: Download, label: 'Export Data', description: 'Download your information', action: () => {} },
        { icon: Lock, label: 'Data Privacy', description: 'How we use your data', action: () => {} }
      ]
    }
  ];

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
              <h1 className="text-display-small font-sf-pro">Settings</h1>
              <p className="text-blue-100 text-body-medium">Customize your experience</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 rounded-3xl p-6 shadow-sm mb-6"
        >
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-wwdc-blue to-wwdc-green rounded-full flex items-center justify-center text-white text-xl font-bold">
              {user?.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h3 className="text-title-large font-sf-pro text-slate-800">{user?.name}</h3>
              <p className="text-body-medium text-slate-600">{user?.email}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Crown className="w-4 h-4 text-amber-500" />
                <span className="text-body-small text-slate-500 capitalize">{user?.subscription?.plan || 'Free'} Plan</span>
              </div>
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Settings Groups */}
        <div className="space-y-6 pb-24">
          {settingsGroups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIndex * 0.1 }}
              className="bg-white/70 rounded-3xl shadow-sm overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-slate-200/50">
                <h4 className="text-title-medium font-sf-pro text-slate-800">{group.title}</h4>
              </div>
              
              <div className="divide-y divide-slate-200/50">
                {group.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      onClick={item.action}
                      className="w-full flex items-center space-x-4 p-6 hover:bg-slate-50/50 transition-colors"
                    >
                      <div className="w-10 h-10 bg-wwdc-blue/10 rounded-xl flex items-center justify-center">
                        <Icon className="w-5 h-5 text-wwdc-blue" />
                      </div>
                      <div className="flex-1 text-left">
                        <h5 className="text-body-large font-semibold text-slate-800">{item.label}</h5>
                        <p className="text-body-medium text-slate-600">{item.description}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ))}

          {/* Quick Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/70 rounded-3xl p-6 shadow-sm"
          >
            <h4 className="text-title-medium font-sf-pro text-slate-800 mb-4">Quick Settings</h4>
            
            <div className="space-y-4">
              {/* Theme Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Moon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h5 className="text-body-large font-semibold text-slate-800">Dark Mode</h5>
                    <p className="text-body-small text-slate-600">Switch to dark theme</p>
                  </div>
                </div>
                <button className="w-12 h-6 bg-slate-300 rounded-full">
                  <div className="w-5 h-5 bg-white rounded-full translate-x-0.5" />
                </button>
              </div>

              {/* Notifications Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Bell className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h5 className="text-body-large font-semibold text-slate-800">Push Notifications</h5>
                    <p className="text-body-small text-slate-600">Receive important updates</p>
                  </div>
                </div>
                <button className="w-12 h-6 bg-wwdc-blue rounded-full">
                  <div className="w-5 h-5 bg-white rounded-full translate-x-6" />
                </button>
              </div>

              {/* Sound Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Volume2 className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h5 className="text-body-large font-semibold text-slate-800">Sound Effects</h5>
                    <p className="text-body-small text-slate-600">Play notification sounds</p>
                  </div>
                </div>
                <button className="w-12 h-6 bg-wwdc-blue rounded-full">
                  <div className="w-5 h-5 bg-white rounded-full translate-x-6" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* App Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/70 rounded-3xl p-6 shadow-sm"
          >
            <h4 className="text-title-medium font-sf-pro text-slate-800 mb-4">About</h4>
            
            <div className="space-y-3 text-body-medium text-slate-600">
              <div className="flex justify-between">
                <span>Version</span>
                <span className="font-semibold">2.1.0</span>
              </div>
              <div className="flex justify-between">
                <span>Build</span>
                <span className="font-semibold">2024.12.01</span>
              </div>
              <div className="flex justify-between">
                <span>Platform</span>
                <span className="font-semibold">Web</span>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-200/50">
              <div className="flex space-x-4 text-body-small text-wwdc-blue">
                <button>Privacy Policy</button>
                <button>Terms of Service</button>
                <button>Support</button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}