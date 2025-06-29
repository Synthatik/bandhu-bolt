import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Plus, 
  Search, 
  MoreVertical,
  Settings,
  Sparkles,
  Crown,
  User,
  Bell
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { BottomNavigation } from './BottomNavigation';

const mockChats = [
  {
    id: '1',
    assistantName: 'ChiChi',
    assistantAvatar: '🌙',
    lastMessage: 'I understand how you\'re feeling. Would you like to talk about what happened today?',
    timestamp: '2 min ago',
    unread: 2,
    isOnline: true,
    mood: 'caring',
    gradient: 'from-wwdc-purple to-wwdc-indigo'
  },
  {
    id: '2',
    assistantName: 'Dr. Luna',
    assistantAvatar: '🧠',
    lastMessage: 'That\'s a great insight! How did that realization make you feel?',
    timestamp: '1 hour ago',
    unread: 0,
    isOnline: true,
    mood: 'professional',
    gradient: 'from-wwdc-blue to-wwdc-teal'
  },
  {
    id: '3',
    assistantName: 'Alex',
    assistantAvatar: '😊',
    lastMessage: 'Haha, that sounds like quite an adventure! Tell me more about it.',
    timestamp: 'Yesterday',
    unread: 0,
    isOnline: false,
    mood: 'friendly',
    gradient: 'from-wwdc-green to-wwdc-teal'
  }
];

export function ChatListPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const filteredChats = mockChats.filter(chat =>
    chat.assistantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startNewChat = () => {
    navigate('/assistants');
  };

  const openChat = (chatId: string) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-wwdc-gray-6 via-blue-50/30 to-green-50/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-wwdc-blue to-wwdc-indigo text-white safe-area-top">
        <div className="px-6 pt-4 pb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-display-small font-sf-pro">Dream Assistant</h1>
              <p className="text-blue-100 text-body-medium">Your AI companions</p>
            </div>
            <div className="flex items-center space-x-3">
              {user?.subscription?.status === 'active' && (
                <div className="flex items-center space-x-1 bg-white/20 rounded-full px-3 py-1">
                  <Crown className="w-4 h-4" />
                  <span className="text-label-medium">Pro</span>
                </div>
              )}
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 bg-white/20 rounded-full relative"
              >
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-wwdc-red rounded-full" />
              </button>
              <button 
                onClick={() => navigate('/settings')}
                className="p-2 bg-white/20 rounded-full"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/90 rounded-2xl text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-3 focus:ring-white/30 focus:bg-white transition-all"
            />
          </div>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full px-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-32 h-32 bg-gradient-to-br from-wwdc-blue/10 to-wwdc-green/10 rounded-full flex items-center justify-center mb-8"
            >
              <MessageCircle className="w-16 h-16 text-wwdc-blue" />
            </motion.div>
            <h3 className="text-headline-medium font-sf-pro text-slate-800 mb-3">No conversations yet</h3>
            <p className="text-body-large text-slate-500 mb-8 max-w-sm">Start chatting with your AI companion to begin your journey of meaningful conversations</p>
            <button
              onClick={startNewChat}
              className="bg-gradient-to-r from-wwdc-blue to-wwdc-indigo text-white px-8 py-4 rounded-2xl font-sf-pro font-semibold flex items-center space-x-3 shadow-wwdc hover:shadow-wwdc-lg transition-all transform hover:scale-105"
            >
              <Plus className="w-6 h-6" />
              <span>Start First Chat</span>
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredChats.map((chat, index) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => openChat(chat.id)}
                className="flex items-center space-x-4 p-6 hover:bg-white/50 active:bg-white/70 transition-all cursor-pointer"
              >
                <div className="relative">
                  <div className={`w-16 h-16 bg-gradient-to-br ${chat.gradient} rounded-2xl flex items-center justify-center text-2xl shadow-md`}>
                    {chat.assistantAvatar}
                  </div>
                  {chat.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-wwdc-green border-3 border-white rounded-full status-online" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-sf-pro font-semibold text-slate-800 truncate text-title-large">{chat.assistantName}</h3>
                    <span className="text-label-medium text-slate-500">{chat.timestamp}</span>
                  </div>
                  <p className="text-body-medium text-slate-600 truncate leading-relaxed">{chat.lastMessage}</p>
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  {chat.unread > 0 && (
                    <div className="w-6 h-6 bg-wwdc-red rounded-full flex items-center justify-center">
                      <span className="text-label-small text-white font-semibold">{chat.unread}</span>
                    </div>
                  )}
                  <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={startNewChat}
        className="fixed bottom-24 right-6 w-16 h-16 bg-gradient-to-r from-wwdc-blue to-wwdc-indigo rounded-full flex items-center justify-center shadow-wwdc-lg hover:shadow-xl transition-all z-10"
      >
        <Plus className="w-8 h-8 text-white" />
      </motion.button>

      <BottomNavigation />
    </div>
  );
}