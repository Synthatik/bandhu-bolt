import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Bell, 
  Palette, 
  Shield, 
  Key, 
  Download, 
  Trash2, 
  Moon, 
  Sun, 
  Volume2, 
  Globe,
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save,
  AlertTriangle,
  Settings,
  Database,
  Zap
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Header } from '../Layout/Header';
import { AdvancedSettings } from './AdvancedSettings';
import { ThemeSelector } from './ThemeSelector';
import { APISettings } from './APISettings';

export function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User, roles: ['end_user', 'admin', 'super_admin', 'moderator', 'trainer'] },
    { id: 'appearance', label: 'Appearance', icon: Palette, roles: ['end_user', 'admin', 'super_admin', 'moderator', 'trainer'] },
    { id: 'notifications', label: 'Notifications', icon: Bell, roles: ['end_user', 'admin', 'super_admin', 'moderator', 'trainer'] },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield, roles: ['end_user', 'admin', 'super_admin', 'moderator', 'trainer'] },
    { id: 'api', label: 'API Settings', icon: Key, roles: ['admin', 'super_admin'] },
    { id: 'data', label: 'Data & Export', icon: Download, roles: ['end_user', 'admin', 'super_admin'] },
    { id: 'advanced', label: 'Advanced', icon: Settings, roles: ['admin', 'super_admin'] },
    { id: 'system', label: 'System', icon: Database, roles: ['super_admin'] }
  ];

  const filteredTabs = tabs.filter(tab => 
    tab.roles.includes(user?.role || 'end_user')
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-teal-400 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user?.name.charAt(0)}
              </div>
              <div>
                <button className="btn-secondary text-sm">Change Avatar</button>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">JPG, PNG up to 2MB</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue={user?.name}
                  className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Timezone</label>
                <select className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 dark:text-white">
                  <option>UTC-8 (Pacific Time)</option>
                  <option>UTC-5 (Eastern Time)</option>
                  <option>UTC+0 (GMT)</option>
                  <option>UTC+5:30 (India)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Bio</label>
              <textarea
                placeholder="Tell us a bit about yourself..."
                className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 min-h-24 resize-none dark:text-white"
                rows={3}
              />
            </div>

            <div className="flex justify-end">
              <button className="btn-primary flex items-center space-x-2">
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        );

      case 'appearance':
        return <ThemeSelector />;

      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              {[
                {
                  title: 'Daily Check-ins',
                  description: 'Gentle reminders to chat with your companion',
                  enabled: true
                },
                {
                  title: 'Motivational Messages',
                  description: 'Uplifting quotes and encouragement',
                  enabled: true
                },
                {
                  title: 'Mood Tracking Reminders',
                  description: 'Prompts to log your daily mood',
                  enabled: false
                },
                {
                  title: 'Weekly Insights',
                  description: 'Summary of your conversations and progress',
                  enabled: true
                },
                {
                  title: 'New Features',
                  description: 'Updates about new assistants and features',
                  enabled: true
                },
                {
                  title: 'Marketing & Promotions',
                  description: 'Special offers and product updates',
                  enabled: false
                }
              ].map((notification, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/50 dark:bg-slate-700/50 rounded-xl">
                  <div>
                    <h4 className="font-medium text-slate-700 dark:text-slate-300">{notification.title}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{notification.description}</p>
                  </div>
                  <button
                    className={`w-12 h-6 rounded-full transition-all ${
                      notification.enabled ? 'bg-purple-500' : 'bg-slate-300 dark:bg-slate-600'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-all ${
                      notification.enabled ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              ))}
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-700">
              <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Notification Schedule</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">Start Time</label>
                  <input
                    type="time"
                    defaultValue="09:00"
                    className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-blue-200 dark:border-blue-600 rounded-lg text-sm dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">End Time</label>
                  <input
                    type="time"
                    defaultValue="21:00"
                    className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-blue-200 dark:border-blue-600 rounded-lg text-sm dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/50 dark:bg-slate-700/50 rounded-xl">
                <div>
                  <h4 className="font-medium text-slate-700 dark:text-slate-300">Two-Factor Authentication</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Add an extra layer of security</p>
                </div>
                <button className="btn-secondary text-sm">Enable 2FA</button>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/50 dark:bg-slate-700/50 rounded-xl">
                <div>
                  <h4 className="font-medium text-slate-700 dark:text-slate-300">Login Notifications</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Get notified of new logins</p>
                </div>
                <button className="w-12 h-6 bg-purple-500 rounded-full">
                  <div className="w-5 h-5 bg-white rounded-full translate-x-6" />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/50 dark:bg-slate-700/50 rounded-xl">
                <div>
                  <h4 className="font-medium text-slate-700 dark:text-slate-300">Data Analytics</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Help improve our service with usage data</p>
                </div>
                <button className="w-12 h-6 bg-purple-500 rounded-full">
                  <div className="w-5 h-5 bg-white rounded-full translate-x-6" />
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-4">Change Password</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 pr-12 dark:text-white"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 dark:text-white"
                  />
                </div>
                <button className="btn-primary">Update Password</button>
              </div>
            </div>
          </div>
        );

      case 'api':
        return <APISettings />;

      case 'data':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 bg-white/50 dark:bg-slate-700/50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-slate-700 dark:text-slate-300">Export Chat History</h4>
                  <button className="btn-secondary text-sm flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Download all your conversations as JSON or PDF</p>
              </div>

              <div className="p-4 bg-white/50 dark:bg-slate-700/50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-slate-700 dark:text-slate-300">Export User Data</h4>
                  <button className="btn-secondary text-sm flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Download all your account data and settings</p>
              </div>

              <div className="p-4 bg-white/50 dark:bg-slate-700/50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-slate-700 dark:text-slate-300">Clear Chat History</h4>
                  <button className="btn-secondary text-sm text-amber-600 border-amber-200 hover:bg-amber-50 dark:border-amber-700 dark:hover:bg-amber-900/30">
                    Clear All
                  </button>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Permanently delete all your conversations</p>
              </div>
            </div>

            <div className="p-6 bg-red-50 dark:bg-red-900/30 rounded-xl border border-red-200 dark:border-red-700">
              <h4 className="font-medium text-red-800 dark:text-red-300 mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Danger Zone
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-red-700 dark:text-red-300">Delete Account</h5>
                    <p className="text-sm text-red-600 dark:text-red-400">Permanently delete your account and all data</p>
                  </div>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'advanced':
        return <AdvancedSettings />;

      case 'system':
        return (
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-6 flex items-center">
                <Database className="w-5 h-5 mr-2 text-purple-500" />
                System Health
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-700">
                  <h4 className="font-medium text-green-800 dark:text-green-300">Database</h4>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">99.9%</p>
                  <p className="text-sm text-green-600 dark:text-green-400">Uptime</p>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700">
                  <h4 className="font-medium text-blue-800 dark:text-blue-300">API Response</h4>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">145ms</p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">Average</p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg border border-purple-200 dark:border-purple-700">
                  <h4 className="font-medium text-purple-800 dark:text-purple-300">Active Users</h4>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">12,543</p>
                  <p className="text-sm text-purple-600 dark:text-purple-400">Online now</p>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-6 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-purple-500" />
                System Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="btn-secondary flex items-center space-x-2 justify-center">
                  <Database className="w-4 h-4" />
                  <span>Backup Database</span>
                </button>
                <button className="btn-secondary flex items-center space-x-2 justify-center">
                  <Download className="w-4 h-4" />
                  <span>Export Logs</span>
                </button>
                <button className="btn-secondary flex items-center space-x-2 justify-center">
                  <Key className="w-4 h-4" />
                  <span>Rotate API Keys</span>
                </button>
                <button className="btn-secondary flex items-center space-x-2 justify-center">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Maintenance Mode</span>
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Header title="Settings" subtitle="Manage your account and preferences" />
      
      <div className="px-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64">
            <div className="card p-4">
              <nav className="space-y-2">
                {filteredTabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-purple-500/20 to-teal-500/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-700/50 hover:text-purple-600 dark:hover:text-purple-400'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              {renderTabContent()}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md w-full"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Delete Account</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                This action cannot be undone. All your data, conversations, and settings will be permanently deleted.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button className="flex-1 bg-red-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-red-700 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}