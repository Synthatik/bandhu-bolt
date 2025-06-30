import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Key, 
  Eye, 
  EyeOff, 
  Trash2, 
  Save,
  AlertCircle,
  CheckCircle,
  Copy,
  RefreshCw
} from 'lucide-react';

interface APIProvider {
  id: string;
  name: string;
  type: 'openai' | 'anthropic' | 'google' | 'custom';
  apiKey: string;
  baseUrl?: string;
  enabled: boolean;
  usage: number;
  maxTokens?: number;
}

export function APISettings() {
  const [providers, setProviders] = useState<APIProvider[]>([
    {
      id: '1',
      name: 'OpenAI',
      type: 'openai',
      apiKey: 'sk-...',
      enabled: true,
      usage: 75
    },
    {
      id: '2',
      name: 'Anthropic',
      type: 'anthropic',
      apiKey: '',
      enabled: false,
      usage: 0
    }
  ]);

  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [newProvider, setNewProvider] = useState({
    name: '',
    type: 'custom' as const,
    apiKey: '',
    baseUrl: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const toggleKeyVisibility = (id: string) => {
    setShowKeys(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const updateProvider = (id: string, updates: Partial<APIProvider>) => {
    setProviders(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProvider = (id: string) => {
    setProviders(prev => prev.filter(p => p.id !== id));
  };

  const addProvider = () => {
    if (newProvider.name && newProvider.apiKey) {
      const provider: APIProvider = {
        id: Date.now().toString(),
        ...newProvider,
        enabled: false,
        usage: 0
      };
      setProviders(prev => [...prev, provider]);
      setNewProvider({ name: '', type: 'custom', apiKey: '', baseUrl: '' });
      setShowAddForm(false);
    }
  };

  const testConnection = async (provider: APIProvider) => {
    // Simulate API test
    console.log('Testing connection for:', provider.name);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center">
          <Key className="w-5 h-5 mr-2 text-purple-500" />
          AI Provider API Keys
        </h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Provider</span>
        </button>
      </div>

      {/* Add Provider Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="card border-2 border-purple-200 dark:border-purple-700"
        >
          <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-4">Add New API Provider</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Provider Name
              </label>
              <input
                type="text"
                value={newProvider.name}
                onChange={(e) => setNewProvider(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Custom AI Provider"
                className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Type
              </label>
              <select
                value={newProvider.type}
                onChange={(e) => setNewProvider(prev => ({ ...prev, type: e.target.value as any }))}
                className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 dark:text-white"
              >
                <option value="custom">Custom</option>
                <option value="openai">OpenAI Compatible</option>
                <option value="anthropic">Anthropic Compatible</option>
                <option value="google">Google Compatible</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                API Key
              </label>
              <input
                type="password"
                value={newProvider.apiKey}
                onChange={(e) => setNewProvider(prev => ({ ...prev, apiKey: e.target.value }))}
                placeholder="Enter API key"
                className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Base URL (Optional)
              </label>
              <input
                type="url"
                value={newProvider.baseUrl}
                onChange={(e) => setNewProvider(prev => ({ ...prev, baseUrl: e.target.value }))}
                placeholder="https://api.example.com/v1"
                className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 dark:text-white"
              />
            </div>
          </div>
          <div className="flex space-x-3 mt-4">
            <button onClick={addProvider} className="btn-primary">
              Add Provider
            </button>
            <button 
              onClick={() => setShowAddForm(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Existing Providers */}
      <div className="space-y-4">
        {providers.map((provider) => (
          <div key={provider.id} className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${provider.enabled ? 'bg-green-500' : 'bg-red-500'}`} />
                <h4 className="font-medium text-slate-800 dark:text-slate-200">{provider.name}</h4>
                <span className="text-sm text-slate-500 dark:text-slate-400 capitalize">
                  {provider.type}
                </span>
                {provider.usage > 0 && (
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    Usage: {provider.usage}%
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateProvider(provider.id, { enabled: !provider.enabled })}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    provider.enabled 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}
                >
                  {provider.enabled ? 'Enabled' : 'Disabled'}
                </button>
                <button
                  onClick={() => deleteProvider(provider.id)}
                  className="p-1 text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="flex-1 relative">
                  <input
                    type={showKeys[provider.id] ? 'text' : 'password'}
                    value={provider.apiKey}
                    onChange={(e) => updateProvider(provider.id, { apiKey: e.target.value })}
                    placeholder="Enter API key"
                    className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 pr-10 dark:text-white"
                  />
                  <button
                    onClick={() => toggleKeyVisibility(provider.id)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    {showKeys[provider.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <button 
                  onClick={() => navigator.clipboard.writeText(provider.apiKey)}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => testConnection(provider)}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
              
              {provider.baseUrl && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Base URL
                  </label>
                  <input
                    type="url"
                    value={provider.baseUrl}
                    onChange={(e) => updateProvider(provider.id, { baseUrl: e.target.value })}
                    className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 dark:text-white"
                  />
                </div>
              )}
              
              {provider.usage > 0 && (
                <div>
                  <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-1">
                    <span>Monthly Usage</span>
                    <span>{provider.usage}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        provider.usage > 80 ? 'bg-red-500' : 
                        provider.usage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${provider.usage}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button className="btn-primary flex items-center space-x-2">
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  );
}