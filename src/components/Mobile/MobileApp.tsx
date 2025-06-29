import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ChatListPage } from './ChatListPage';
import { ChatPage } from './ChatPage';
import { AssistantsPage } from './AssistantsPage';
import { AddonsPage } from './AddonsPage';
import { SettingsPage } from './SettingsPage';
import { SubscriptionPage } from './SubscriptionPage';
import { ProfilePage } from './ProfilePage';
import { useAuth } from '../../contexts/AuthContext';

export function MobileApp() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-wwdc-gray-6 via-blue-50/30 to-green-50/20">
      <Routes>
        <Route path="/" element={<Navigate to="/chats" replace />} />
        <Route path="/dashboard" element={<Navigate to="/chats" replace />} />
        <Route path="/chats" element={<ChatListPage />} />
        <Route path="/chat/:chatId?" element={<ChatPage />} />
        <Route path="/assistants" element={<AssistantsPage />} />
        <Route path="/addons" element={<AddonsPage />} />
        <Route path="/subscription" element={<SubscriptionPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  );
}