import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  Paperclip, 
  Smile, 
  MoreVertical,
  Phone,
  Video,
  Info
} from 'lucide-react';
import { Header } from '../components/Layout/Header';
import { useChat } from '../contexts/ChatContext';

export function ChatPage() {
  const { activeChat, sendMessage } = useChat();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  if (!activeChat) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-wwdc-blue/10 to-wwdc-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-12 h-12 text-wwdc-blue" />
          </div>
          <h3 className="text-headline-medium font-sf-pro text-slate-800 mb-2">No Chat Selected</h3>
          <p className="text-body-large text-slate-600">Choose a conversation to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-wwdc-blue to-wwdc-indigo text-white p-4 rounded-b-3xl shadow-wwdc">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl">
              {activeChat.assistantAvatar}
            </div>
            <div>
              <h2 className="text-title-large font-sf-pro">{activeChat.assistantName}</h2>
              <p className="text-body-medium text-blue-100">Online • Responds instantly</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
              <Video className="w-5 h-5" />
            </button>
            <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
              <Info className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {activeChat.messages.map((msg, index) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
              msg.sender === 'user'
                ? 'bg-gradient-to-r from-wwdc-blue to-wwdc-indigo text-white rounded-br-sm'
                : 'bg-white/70 text-slate-800 rounded-bl-sm'
            }`}>
              <p className="text-body-medium">{msg.content}</p>
              <p className={`text-label-small mt-1 ${
                msg.sender === 'user' ? 'text-blue-100' : 'text-slate-500'
              }`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-6 border-t border-slate-200">
        <form onSubmit={handleSend} className="flex items-center space-x-4">
          <button
            type="button"
            className="p-3 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-2xl focus:outline-none focus:ring-3 focus:ring-wwdc-blue/30 focus:border-wwdc-blue transition-all pr-12"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <Smile className="w-5 h-5" />
            </button>
          </div>
          
          <button
            type="submit"
            disabled={!message.trim()}
            className="p-3 bg-gradient-to-r from-wwdc-blue to-wwdc-indigo text-white rounded-2xl hover:shadow-wwdc transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}