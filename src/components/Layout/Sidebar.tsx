import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  MessageCircle, 
  Settings, 
  Users, 
  BarChart3, 
  Shield, 
  Palette, 
  Plus,
  Heart,
  Crown,
  Sparkles,
  LogOut,
  User,
  ChevronDown,
  Monitor,
  Smartphone
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useDeviceDetection } from '../../hooks/useDeviceDetection';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  {
    label: 'Dashboard',
    icon: BarChart3,
    path: '/dashboard',
    roles: ['admin', 'super_admin', 'moderator', 'trainer', 'end_user']
  },
  {
    label: 'Chat',
    icon: MessageCircle,
    path: '/chat',
    roles: ['end_user', 'admin', 'super_admin']
  },
  {
    label: 'Users',
    icon: Users,
    path: '/users',
    roles: ['admin', 'super_admin']
  },
  {
    label: 'Assistants',
    icon: Sparkles,
    path: '/assistants',
    roles: ['admin', 'super_admin', 'trainer']
  },
  {
    label: 'Moderation',
    icon: Shield,
    path: '/moderation',
    roles: ['moderator', 'admin', 'super_admin']
  },
  {
    label: 'Add-ons',
    icon: Plus,
    path: '/addons',
    roles: ['end_user', 'admin', 'super_admin']
  },
  {
    label: 'Theme Customizer',
    icon: Palette,
    path: '/theme-customizer',
    roles: ['super_admin']
  },
  {
    label: 'Settings',
    icon: Settings,
    path: '/settings',
    roles: ['end_user', 'admin', 'super_admin', 'moderator', 'trainer']
  }
];

const roleOptions = [
  { value: 'super_admin', label: 'Super Admin', icon: Crown, color: 'text-amber-600' },
  { value: 'admin', label: 'Admin', icon: Shield, color: 'text-purple-600' },
  { value: 'moderator', label: 'Moderator', icon: Shield, color: 'text-blue-600' },
  { value: 'trainer', label: 'Trainer', icon: Users, color: 'text-green-600' },
  { value: 'end_user', label: 'User', icon: User, color: 'text-slate-600' }
];

export function Sidebar() {
  const { user, hasRole, logout, quickLogin } = useAuth();
  const { isMobile } = useDeviceDetection();
  const location = useLocation();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showRoleSwitch, setShowRoleSwitch] = useState(false);

  if (!user) return null;

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.some(role => hasRole(role as any))
  );

  const handleRoleSwitch = async (newRole: string) => {
    await quickLogin(newRole as any);
    setShowRoleSwitch(false);
    setShowUserMenu(false);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const switchToMobileApp = () => {
    navigate('/chats');
  };

  return (
    <motion.div 
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed left-0 top-0 h-full w-64 glass border-r border-white/20 z-40 flex flex-col"
    >
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-teal-500 rounded-xl flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold gradient-text">Dream Assistant</h1>
            <p className="text-sm text-slate-500">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-purple-500/20 to-teal-500/20 text-purple-700 border border-purple-200'
                  : 'text-slate-600 hover:bg-white/50 hover:text-purple-600'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-purple-600' : 'text-slate-500 group-hover:text-purple-500'}`} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}

        {/* Switch to Mobile App */}
        {user.role === 'end_user' && (
          <button
            onClick={switchToMobileApp}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-white/50 hover:text-purple-600 transition-all duration-200"
          >
            <Smartphone className="w-5 h-5" />
            <span className="font-medium">Mobile App</span>
          </button>
        )}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-white/10">
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-full flex items-center space-x-3 p-3 rounded-xl bg-white/30 hover:bg-white/50 transition-all"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-teal-400 rounded-full flex items-center justify-center text-white font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-medium text-slate-700 truncate">
                {user.name}
              </p>
              <div className="flex items-center space-x-1">
                <Crown className="w-3 h-3 text-amber-500" />
                <p className="text-xs text-slate-500 capitalize">
                  {user.role.replace('_', ' ')}
                </p>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
          </button>

          {/* User Menu Dropdown */}
          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl shadow-lg border border-white/20 overflow-hidden"
              >
                <div className="p-2">
                  {/* Profile */}
                  <button
                    onClick={() => {
                      navigate('/settings');
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <User className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-700">Profile Settings</span>
                  </button>

                  {/* Role Switcher */}
                  <div className="relative">
                    <button
                      onClick={() => setShowRoleSwitch(!showRoleSwitch)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <Monitor className="w-4 h-4 text-slate-500" />
                        <span className="text-sm text-slate-700">Switch Role</span>
                      </div>
                      <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${showRoleSwitch ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Role Options */}
                    <AnimatePresence>
                      {showRoleSwitch && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="ml-4 mt-1 space-y-1"
                        >
                          {roleOptions.map((role) => {
                            const RoleIcon = role.icon;
                            return (
                              <button
                                key={role.value}
                                onClick={() => handleRoleSwitch(role.value)}
                                className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left transition-colors ${
                                  user.role === role.value
                                    ? 'bg-purple-50 text-purple-700'
                                    : 'hover:bg-slate-50 text-slate-600'
                                }`}
                              >
                                <RoleIcon className={`w-3 h-3 ${role.color}`} />
                                <span className="text-xs">{role.label}</span>
                                {user.role === role.value && (
                                  <div className="w-2 h-2 bg-purple-500 rounded-full ml-auto" />
                                )}
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Divider */}
                  <div className="my-2 border-t border-slate-200" />

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Sign Out</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}