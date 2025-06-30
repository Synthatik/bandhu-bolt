import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Crown,
  Shield,
  Users,
  User,
  Sparkles
} from 'lucide-react';
import { useAuth, UserRole } from '../../contexts/AuthContext';

const roleOptions = [
  { 
    value: 'end_user' as UserRole, 
    label: 'User', 
    icon: User, 
    color: 'from-blue-500 to-cyan-500',
    description: 'Experience AI companionship'
  },
  { 
    value: 'trainer' as UserRole, 
    label: 'Trainer', 
    icon: Sparkles, 
    color: 'from-green-500 to-teal-500',
    description: 'Train and improve AI models'
  },
  { 
    value: 'moderator' as UserRole, 
    label: 'Moderator', 
    icon: Shield, 
    color: 'from-orange-500 to-red-500',
    description: 'Monitor content and safety'
  },
  { 
    value: 'admin' as UserRole, 
    label: 'Admin', 
    icon: Users, 
    color: 'from-purple-500 to-pink-500',
    description: 'Manage users and platform'
  },
  { 
    value: 'super_admin' as UserRole, 
    label: 'Super Admin', 
    icon: Crown, 
    color: 'from-amber-500 to-orange-500',
    description: 'Full platform control'
  }
];

export function LoginPage() {
  const navigate = useNavigate();
  const { login, quickLogin, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginMode, setLoginMode] = useState<'normal' | 'demo'>('normal');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleQuickLogin = async (role: UserRole) => {
    try {
      await quickLogin(role);
      navigate('/');
    } catch (error) {
      console.error('Quick login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-wwdc-gray-6 via-blue-50/30 to-green-50/20 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-20 h-20 bg-gradient-to-br from-wwdc-blue to-wwdc-green rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-wwdc"
          >
            <Heart className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-display-small font-sf-pro gradient-text">Dream Assistant</h1>
          <p className="text-body-large text-slate-600 mt-2">Your caring AI companion</p>
        </div>

        {/* Login Mode Toggle */}
        <div className="flex bg-white/50 rounded-2xl p-1 mb-6">
          <button
            onClick={() => setLoginMode('normal')}
            className={`flex-1 py-3 px-4 rounded-xl font-sf-pro font-medium transition-all ${
              loginMode === 'normal'
                ? 'bg-white text-wwdc-blue shadow-sm'
                : 'text-slate-600'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setLoginMode('demo')}
            className={`flex-1 py-3 px-4 rounded-xl font-sf-pro font-medium transition-all ${
              loginMode === 'demo'
                ? 'bg-white text-wwdc-blue shadow-sm'
                : 'text-slate-600'
            }`}
          >
            Quick Demo
          </button>
        </div>

        {loginMode === 'normal' ? (
          /* Normal Login Form */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card"
          >
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-title-medium font-sf-pro text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/50 border border-white/30 rounded-2xl focus:outline-none focus:ring-3 focus:ring-wwdc-blue/30 focus:border-wwdc-blue transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-title-medium font-sf-pro text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-white/50 border border-white/30 rounded-2xl focus:outline-none focus:ring-3 focus:ring-wwdc-blue/30 focus:border-wwdc-blue transition-all"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-wwdc-blue to-wwdc-indigo text-white py-4 rounded-2xl font-sf-pro font-semibold flex items-center justify-center space-x-3 shadow-wwdc hover:shadow-wwdc-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button className="text-body-medium text-wwdc-blue hover:text-wwdc-indigo transition-colors">
                Forgot your password?
              </button>
            </div>
          </motion.div>
        ) : (
          /* Demo Role Selection */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <h3 className="text-headline-small font-sf-pro text-slate-800 mb-2">Choose Your Role</h3>
              <p className="text-body-medium text-slate-600">Experience the platform from different perspectives</p>
            </div>

            {roleOptions.map((role, index) => {
              const Icon = role.icon;
              return (
                <motion.button
                  key={role.value}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleQuickLogin(role.value)}
                  disabled={isLoading}
                  className="w-full p-4 bg-white/50 rounded-2xl border border-white/30 hover:bg-white/70 hover:shadow-md transition-all group disabled:opacity-50"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${role.color} rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-sf-pro font-semibold text-slate-800">{role.label}</h4>
                      <p className="text-body-small text-slate-600">{role.description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        )}

        {/* Back to Landing */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-body-medium text-slate-500 hover:text-slate-700 transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}