import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  MessageCircle, 
  Sparkles, 
  Plus, 
  User, 
  Settings,
  LogOut,
  Monitor,
  Crown,
  Shield,
  Users
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { id: 'chats', label: 'Chats', icon: MessageCircle, path: '/chats' },
  { id: 'assistants', label: 'Assistants', icon: Sparkles, path: '/assistants' },
  { id: 'addons', label: 'Add-ons', icon: Plus, path: '/addons' },
  { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' }
];

const roleOptions = [
  { value: 'super_admin', label: 'Super Admin', icon: Crown, color: 'text-amber-600' },
  { value: 'admin', label: 'Admin', icon: Shield, color: 'text-purple-600' },
  { value: 'moderator', label: 'Moderator', icon: Shield, color: 'text-blue-600' },
  { value: 'trainer', label: 'Trainer', icon: Users, color: 'text-green-600' },
  { value: 'end_user', label: 'User', icon: User, color: 'text-slate-600' }
];

export function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, quickLogin } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleRoleSwitch = async (newRole: string) => {
    await quickLogin(newRole as any);
    setShowUserMenu(false);
    if (newRole !== 'end_user') {
      navigate('/dashboard');
    } else {
      navigate('/chats');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const switchToDesktop = () => {
    navigate('/dashboard');
  };

  return (
    <>
      {/* User Menu Overlay */}
      <AnimatePresence>
        {showUserMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end"
            onClick={() => setShowUserMenu(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="w-full bg-white rounded-t-3xl p-6 safe-area-bottom"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto mb-6" />
              
              <div className="space-y-4">
                {/* User Info */}
                <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-teal-400 rounded-full flex items-center justify-center text-white font-bold">
                    {user?.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{user?.name}</h3>
                    <p className="text-sm text-slate-500 capitalize">{user?.role.replace('_', ' ')}</p>
                  </div>
                </div>

                {/* Role Switcher */}
                <div>
                  <h4 className="font-medium text-slate-700 mb-3">Switch Role</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {roleOptions.map((role) => {
                      const RoleIcon = role.icon;
                      return (
                        <button
                          key={role.value}
                          onClick={() => handleRoleSwitch(role.value)}
                          className={`flex items-center space-x-2 p-3 rounded-xl transition-all ${
                            user?.role === role.value
                              ? 'bg-purple-100 text-purple-700 border-2 border-purple-300'
                              : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          <RoleIcon className={`w-4 h-4 ${role.color}`} />
                          <span className="text-sm font-medium">{role.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  {user?.role !== 'end_user' && (
                    <button
                      onClick={switchToDesktop}
                      className="w-full flex items-center space-x-3 p-4 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors"
                    >
                      <Monitor className="w-5 h-5" />
                      <span className="font-medium">Switch to Desktop</span>
                    </button>
                  )}
                  
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 p-4 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Sign Out</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-slate-200 px-2 py-2 safe-area-bottom">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || 
              (item.path === '/chats' && location.pathname.startsWith('/chat'));
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'profile') {
                    setShowUserMenu(true);
                  } else {
                    navigate(item.path);
                  }
                }}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all ${
                  isActive 
                    ? 'text-purple-600' 
                    : 'text-slate-500 hover:text-purple-600'
                }`}
              >
                <div className={`p-1 rounded-lg ${isActive ? 'bg-purple-100' : ''}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}