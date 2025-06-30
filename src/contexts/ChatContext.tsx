import React, { createContext, useContext, useState } from 'react';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  type?: 'text' | 'image' | 'audio';
}

export interface Chat {
  id: string;
  assistantId: string;
  assistantName: string;
  assistantAvatar: string;
  messages: Message[];
  lastActivity: Date;
  isActive: boolean;
}

interface ChatContextType {
  chats: Chat[];
  activeChat: Chat | null;
  setActiveChat: (chat: Chat | null) => void;
  sendMessage: (content: string) => void;
  createNewChat: (assistantId: string, assistantName: string, assistantAvatar: string) => Chat;
  deleteChat: (chatId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);

  const sendMessage = (content: string) => {
    if (!activeChat) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    // Simulate AI response
    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      content: generateAIResponse(content),
      sender: 'assistant',
      timestamp: new Date(Date.now() + 1000),
      type: 'text'
    };

    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === activeChat.id
          ? {
              ...chat,
              messages: [...chat.messages, userMessage, aiResponse],
              lastActivity: new Date()
            }
          : chat
      )
    );

    setActiveChat(prev =>
      prev ? {
        ...prev,
        messages: [...prev.messages, userMessage, aiResponse],
        lastActivity: new Date()
      } : null
    );
  };

  const createNewChat = (assistantId: string, assistantName: string, assistantAvatar: string): Chat => {
    const newChat: Chat = {
      id: Date.now().toString(),
      assistantId,
      assistantName,
      assistantAvatar,
      messages: [{
        id: '1',
        content: `Hello! I'm ${assistantName}. How are you feeling today?`,
        sender: 'assistant',
        timestamp: new Date(),
        type: 'text'
      }],
      lastActivity: new Date(),
      isActive: true
    };

    setChats(prev => [newChat, ...prev]);
    setActiveChat(newChat);
    return newChat;
  };

  const deleteChat = (chatId: string) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    if (activeChat?.id === chatId) {
      setActiveChat(null);
    }
  };

  return (
    <ChatContext.Provider value={{
      chats,
      activeChat,
      setActiveChat,
      sendMessage,
      createNewChat,
      deleteChat
    }}>
      {children}
    </ChatContext.Provider>
  );
}

function generateAIResponse(userMessage: string): string {
  const responses = [
    "I understand how you're feeling. Would you like to talk more about that?",
    "That sounds really important to you. Can you tell me more?",
    "I'm here to listen and support you. What's on your mind?",
    "Thank you for sharing that with me. How does that make you feel?",
    "I can sense there's a lot going on for you right now. I'm here for you.",
    "That's a really thoughtful perspective. What led you to think about it that way?",
    "I appreciate you opening up to me. Your feelings are completely valid.",
    "It sounds like you're going through something challenging. How can I best support you?"
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}