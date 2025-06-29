import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Database, 
  Key, 
  Shield, 
  Zap, 
  Globe, 
  Mail, 
  Bell, 
  Users,
  Settings,
  Save,
  AlertTriangle,
  CheckCircle,
  Copy,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';

export function AdvancedSettings() {
  const [apiKeys, setApiKeys] = useState({
    openai: { key: 'sk-...', enabled: true, usage: 75 },
    anthropic: { key: '', enabled: false, usage: 0 },
    google: { key: '', enabled: false, usage: 0 }
  });
  
  const [showKeys, setShowKeys] = useState({
    openai: false,
    anthropic: false,
    google: false
  });

  const [systemSettings, setSystemSettings] = useState({
    maxConcurrentChats: 1000,
    messageRetention: 90,
    autoModeration: true,
    rateLimiting: true,
    analyticsEnabled: true,
    maintenanceMode: false
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    smtpUser: 'noreply@dreamassistant.com',
    smtpPassword: '',
    fromEmail: 'Dream Assistant <noreply@dreamassistant.com>',
    replyToEmail: 'support@dreamassistant.com'
  });

  const handleApiKeyUpdate = (provider: string, key: string) => {
    setApiKeys(prev => ({
      ...prev,
      [provider]: { ...prev[provider as keyof typeof prev], key }
    }));
  };

  const toggleApiKey = (provider: string) => {
    setApiKeys(prev => ({
      ...prev,
      [provider]: { 
        ...prev[provider as keyof typeof prev], 
        enabled: !prev[provider as keyof typeof prev].enabled 
      }
    }));
  };

  const generateApiKey = () => {
    return 'da_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  return (
    <div className="space-y-6">
      {/* API Configuration */}
      <div className="card">
        <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center">
          <Key className="w-5 h-5 mr-2 text-purple-500" />
          AI Provider API Keys
        </h3>
        
        <div className="space-y-6">
          {Object.entries(apiKeys).map(([provider, config]) => (
            <div key={provider} className="p-4 bg-white/50 rounded-xl border border-white/30">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${config.enabled ? 'bg-green-500' : 'bg-red-500'}`} />
                  <h4 className="font-medium text-slate-800 capitalize">{provider}</h4>
                  <span className="text-sm text-slate-500">
                    Usage: {config.usage}%
                  </span>
                </div>
                <button
                  onClick={() => toggleApiKey(provider)}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    config.enabled 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {config.enabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex-1 relative">
                  <input
                    type={showKeys[provider as keyof typeof showKeys] ? 'text' : 'password'}
                    value={config.key}
                    onChange={(e) => handleApiKeyUpdate(provider, e.target.value)}
                    placeholder={`Enter ${provider} API key`}
                    className="w-full px-4 py-2 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 pr-10"
                  />
                  <button
                    onClick={() => setShowKeys(prev => ({
                      ...prev,
                      [provider]: !prev[provider as keyof typeof prev]
                    }))}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showKeys[provider as keyof typeof showKeys] ? 
                      <EyeOff className="w-4 h-4" /> : 
                      <Eye className="w-4 h-4" />
                    }
                  </button>
                </div>
                <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                  <Copy className="w-4 h-4" />
                </button>
                <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
              
              <div className="mt-3">
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all ${
                      config.usage > 80 ? 'bg-red-500' : 
                      config.usage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${config.usage}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Monthly usage: {config.usage}% of quota
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Configuration */}
      <div className="card">
        <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center">
          <Settings className="w-5 h-5 mr-2 text-purple-500" />
          System Configuration
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Max Concurrent Chats
            </label>
            <input
              type="number"
              value={systemSettings.maxConcurrentChats}
              onChange={(e) => setSystemSettings(prev => ({
                ...prev,
                maxConcurrentChats: parseInt(e.target.value)
              }))}
              className="w-full px-4 py-2 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Message Retention (days)
            </label>
            <input
              type="number"
              value={systemSettings.messageRetention}
              onChange={(e) => setSystemSettings(prev => ({
                ...prev,
                messageRetention: parseInt(e.target.value)
              }))}
              className="w-full px-4 py-2 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300"
            />
          </div>
        </div>
        
        <div className="space-y-4 mt-6">
          {[
            { key: 'autoModeration', label: 'Auto Moderation', description: 'Automatically flag inappropriate content' },
            { key: 'rateLimiting', label: 'Rate Limiting', description: 'Limit API requests per user' },
            { key: 'analyticsEnabled', label: 'Analytics', description: 'Collect usage analytics' },
            { key: 'maintenanceMode', label: 'Maintenance Mode', description: 'Put system in maintenance mode' }
          ].map((setting) => (
            <div key={setting.key} className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
              <div>
                <h4 className="font-medium text-slate-700">{setting.label}</h4>
                <p className="text-sm text-slate-500">{setting.description}</p>
              </div>
              <button
                onClick={() => setSystemSettings(prev => ({
                  ...prev,
                  [setting.key]: !prev[setting.key as keyof typeof prev]
                }))}
                className={`w-12 h-6 rounded-full transition-all ${
                  systemSettings[setting.key as keyof typeof systemSettings] 
                    ? 'bg-purple-500' 
                    : 'bg-slate-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-all ${
                  systemSettings[setting.key as keyof typeof systemSettings] 
                    ? 'translate-x-6' 
                    : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Email Configuration */}
      <div className="card">
        <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center">
          <Mail className="w-5 h-5 mr-2 text-purple-500" />
          Email Configuration
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">SMTP Host</label>
            <input
              type="text"
              value={emailSettings.smtpHost}
              onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpHost: e.target.value }))}
              className="w-full px-4 py-2 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">SMTP Port</label>
            <input
              type="number"
              value={emailSettings.smtpPort}
              onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPort: parseInt(e.target.value) }))}
              className="w-full px-4 py-2 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">SMTP Username</label>
            <input
              type="text"
              value={emailSettings.smtpUser}
              onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpUser: e.target.value }))}
              className="w-full px-4 py-2 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">SMTP Password</label>
            <input
              type="password"
              value={emailSettings.smtpPassword}
              onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPassword: e.target.value }))}
              className="w-full px-4 py-2 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">From Email</label>
            <input
              type="email"
              value={emailSettings.fromEmail}
              onChange={(e) => setEmailSettings(prev => ({ ...prev, fromEmail: e.target.value }))}
              className="w-full px-4 py-2 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Reply-To Email</label>
            <input
              type="email"
              value={emailSettings.replyToEmail}
              onChange={(e) => setEmailSettings(prev => ({ ...prev, replyToEmail: e.target.value }))}
              className="w-full px-4 py-2 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300"
            />
          </div>
        </div>
        
        <div className="mt-6 flex space-x-3">
          <button className="btn-secondary">Test Connection</button>
          <button className="btn-secondary">Send Test Email</button>
        </div>
      </div>

      {/* Security Settings */}
      <div className="card">
        <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-purple-500" />
          Security & Compliance
        </h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <h4 className="font-medium text-green-800">SSL Certificate</h4>
                <p className="text-sm text-green-600">Valid until March 2025</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <div>
                <h4 className="font-medium text-yellow-800">Security Audit</h4>
                <p className="text-sm text-yellow-600">Last audit: 30 days ago</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white/50 rounded-lg">
              <h4 className="font-medium text-slate-700 mb-2">Password Policy</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Minimum 8 characters</li>
                <li>• Require special characters</li>
                <li>• Require numbers</li>
                <li>• Password expiry: 90 days</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white/50 rounded-lg">
              <h4 className="font-medium text-slate-700 mb-2">Session Management</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Session timeout: 24 hours</li>
                <li>• Max concurrent sessions: 3</li>
                <li>• Remember me: 30 days</li>
                <li>• Force logout on password change</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Save Changes */}
      <div className="flex justify-end space-x-3">
        <button className="btn-secondary">Reset to Defaults</button>
        <button className="btn-primary flex items-center space-x-2">
          <Save className="w-4 h-4" />
          <span>Save All Changes</span>
        </button>
      </div>
    </div>
  );
}