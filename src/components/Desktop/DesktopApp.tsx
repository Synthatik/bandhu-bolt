import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from '../Layout/Sidebar';
import { DashboardPage } from '../../pages/DashboardPage';
import { ChatPage } from '../../pages/ChatPage';
import { UsersPage } from '../../pages/UsersPage';
import { AssistantsPage } from '../Assistants/AssistantsPage';
import { AddonsPage } from '../Addons/AddonsPage';
import { SettingsPage } from '../Settings/SettingsPage';
import { ModerationPage } from '../Moderation/ModerationPage';
import { ThemeCustomizer } from '../Settings/ThemeCustomizer';
import { useAuth } from '../../contexts/AuthContext';

export function DesktopApp() {
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-teal-50/20">
      <Sidebar />
      <main className="flex-1 ml-64 overflow-hidden">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/assistants" element={<AssistantsPage />} />
          <Route path="/addons" element={<AddonsPage />} />
          <Route path="/moderation" element={<ModerationPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          {user?.role === 'super_admin' && (
            <Route path="/theme-customizer" element={<ThemeCustomizer />} />
          )}
        </Routes>
      </main>
    </div>
  );
}