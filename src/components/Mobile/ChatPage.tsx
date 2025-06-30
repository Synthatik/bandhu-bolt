import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Send, 
  Paperclip, 
  Smile, 
  MoreVertical,
  Phone,
  Video,
  Info
} from 'lucide-react';
import { useChat } from '../../contexts/ChatContext';

export function ChatPage() {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const { chats, activeChat, setActiveChat, sendMessage } = useChat();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatId && chats.length > 0) {
      const chat = chats.find(c => c.id === chatId);
      if (chat) {
        setActiveChat(chat);
      }
    }
  }, [chatId, chats, setActiveChat]);

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
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-wwdc-gray-6 via-blue-50/30 to-green-50/20">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-wwdc-blue/10 to-wwdc-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-12 h-12 text-wwdc-blue" />
          </div>
          <h3 className="text-headline-medium font-sf-pro text-slate-800 mb-2">Chat Not Found</h3>
          <p className="text-body-large text-slate-600 mb-6">The conversation you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/chats')}
            className="btn-primary"
          >
            Back to Chats
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-wwdc-gray-6 via-blue-50/30 to-green-50/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-wwdc-blue to-wwdc-indigo text-white safe-area-top">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/chats')}
              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-lg">
                {activeChat.assistantAvatar}
              </div>
              <div>
                <h2 className="text-title-large font-sf-pro">{activeChat.assistantName}</h2>
                <p className="text-body-small text-blue-100">Online • Responds instantly</p>
              </div>
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
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeChat.messages.map((msg, index) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs px-4 py-3 rounded-2xl ${
              msg.sender === 'user'
                ? 'bg-gradient-to-r from-wwdc-blue to-wwdc-indigo text-white rounded-br-sm'
                : 'bg-white/70 text-slate-800 rounded-bl-sm shadow-sm'
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
      <div className="p-4 bg-white/50 backdrop-blur-md border-t border-white/20 safe-area-bottom">
        <form onSubmit={handleSend} className="flex items-center space-x-3">
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
              className="w-full px-4 py-3 bg-white/70 border border-white/30 rounded-2xl focus:outline-none focus:ring-3 focus:ring-wwdc-blue/30 focus:border-wwdc-blue transition-all pr-12"
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