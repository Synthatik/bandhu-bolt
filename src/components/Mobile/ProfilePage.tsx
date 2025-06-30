import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Camera, 
  Edit3, 
  Save,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Crown,
  Heart,
  MessageCircle,
  Clock,
  Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export function ProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Exploring the world of AI companionship and personal growth. Always learning and growing! 🌱'
  });

  const stats = [
    { label: 'Conversations', value: '127', icon: MessageCircle },
    { label: 'Days Active', value: '45', icon: Calendar },
    { label: 'Mood Score', value: '8.2', icon: Heart },
    { label: 'Avg. Session', value: '12m', icon: Clock }
  ];

  const handleSave = () => {
    // Save profile changes
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-wwdc-gray-6 via-blue-50/30 to-green-50/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-wwdc-blue to-wwdc-indigo text-white safe-area-top">
        <div className="px-6 pt-4 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/settings')}
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-display-small font-sf-pro">Profile</h1>
                <p className="text-blue-100 text-body-medium">Your personal information</p>
              </div>
            </div>
            
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition-colors"
            >
              {isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
              <span className="text-body-small font-medium">{isEditing ? 'Save' : 'Edit'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 rounded-3xl p-6 shadow-sm mb-6"
        >
          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-wwdc-blue to-wwdc-green rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {user?.name.charAt(0)}
              </div>
              {isEditing && (
                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-wwdc-blue text-white rounded-full flex items-center justify-center shadow-md">
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <div className="text-center mt-4">
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="text-title-large font-sf-pro text-slate-800 bg-transparent border-b border-slate-300 focus:border-wwdc-blue outline-none text-center"
                />
              ) : (
                <h2 className="text-title-large font-sf-pro text-slate-800">{formData.name}</h2>
              )}
              
              <div className="flex items-center justify-center space-x-2 mt-2">
                <Crown className="w-4 h-4 text-amber-500" />
                <span className="text-body-medium text-slate-600 capitalize">
                  {user?.subscription?.plan || 'Free'} Member
                </span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-6">
            <h3 className="text-body-large font-semibold text-slate-800 mb-2">About</h3>
            {isEditing ? (
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:border-wwdc-blue outline-none resize-none"
                rows={3}
              />
            ) : (
              <p className="text-body-medium text-slate-600 leading-relaxed">{formData.bio}</p>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-wwdc-blue" />
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="flex-1 p-2 bg-slate-50 rounded-lg border border-slate-200 focus:border-wwdc-blue outline-none"
                />
              ) : (
                <span className="text-body-medium text-slate-700">{formData.email}</span>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-wwdc-green" />
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="flex-1 p-2 bg-slate-50 rounded-lg border border-slate-200 focus:border-wwdc-blue outline-none"
                />
              ) : (
                <span className="text-body-medium text-slate-700">{formData.phone}</span>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-wwdc-red" />
              {isEditing ? (
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="flex-1 p-2 bg-slate-50 rounded-lg border border-slate-200 focus:border-wwdc-blue outline-none"
                />
              ) : (
                <span className="text-body-medium text-slate-700">{formData.location}</span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/70 rounded-3xl p-6 shadow-sm mb-6"
        >
          <h3 className="text-title-large font-sf-pro text-slate-800 mb-4">Your Journey</h3>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center p-4 bg-slate-50/50 rounded-2xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-wwdc-blue to-wwdc-green rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-display-small font-sf-pro text-slate-800">{stat.value}</div>
                  <div className="text-body-small text-slate-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/70 rounded-3xl p-6 shadow-sm mb-6"
        >
          <h3 className="text-title-large font-sf-pro text-slate-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'Started conversation with ChiChi', time: '2 hours ago', icon: MessageCircle },
              { action: 'Completed mood check-in', time: '1 day ago', icon: Heart },
              { action: 'Achieved 7-day streak', time: '3 days ago', icon: Star },
              { action: 'Updated profile information', time: '1 week ago', icon: Edit3 }
            ].map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-center space-x-3 p-3 bg-slate-50/50 rounded-xl">
                  <div className="w-10 h-10 bg-wwdc-blue/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-wwdc-blue" />
                  </div>
                  <div className="flex-1">
                    <p className="text-body-medium text-slate-800">{activity.action}</p>
                    <p className="text-body-small text-slate-500">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/70 rounded-3xl p-6 shadow-sm"
        >
          <h3 className="text-title-large font-sf-pro text-slate-800 mb-4">Achievements</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { emoji: '🎯', name: 'First Chat', unlocked: true },
              { emoji: '🔥', name: '7 Day Streak', unlocked: true },
              { emoji: '💎', name: 'Pro Member', unlocked: false },
              { emoji: '🌟', name: 'Mood Master', unlocked: true },
              { emoji: '🚀', name: 'Explorer', unlocked: false },
              { emoji: '💝', name: 'Caring Friend', unlocked: true }
            ].map((achievement, index) => (
              <div
                key={index}
                className={`text-center p-3 rounded-xl ${
                  achievement.unlocked ? 'bg-gradient-to-br from-wwdc-blue/10 to-wwdc-green/10' : 'bg-slate-100'
                }`}
              >
                <div className={`text-2xl mb-1 ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                  {achievement.emoji}
                </div>
                <div className={`text-label-small font-medium ${
                  achievement.unlocked ? 'text-slate-800' : 'text-slate-500'
                }`}>
                  {achievement.name}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}