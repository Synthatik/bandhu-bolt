import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeColors {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
}

interface ThemeContextType {
  currentTheme: ThemeColors;
  updateTheme: (theme: ThemeColors) => void;
  resetTheme: () => void;
  applyTheme: (colors: ThemeColors) => void;
}

const defaultTheme: ThemeColors = {
  name: 'Dream Purple',
  primary: '#a855f7',
  secondary: '#14b8a6',
  accent: '#f59e0b',
  background: '#f8fafc',
  surface: '#ffffff'
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeColors>(defaultTheme);

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('dreamAssistantTheme');
    if (savedTheme) {
      try {
        const theme = JSON.parse(savedTheme);
        setCurrentTheme(theme);
        applyTheme(theme);
      } catch (error) {
        console.error('Failed to load saved theme');
      }
    }
  }, []);

  const applyTheme = (colors: ThemeColors) => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-accent', colors.accent);
    root.style.setProperty('--color-background', colors.background);
    root.style.setProperty('--color-surface', colors.surface);
  };

  const updateTheme = (theme: ThemeColors) => {
    setCurrentTheme(theme);
    applyTheme(theme);
    localStorage.setItem('dreamAssistantTheme', JSON.stringify(theme));
  };

  const resetTheme = () => {
    setCurrentTheme(defaultTheme);
    applyTheme(defaultTheme);
    localStorage.removeItem('dreamAssistantTheme');
  };

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      updateTheme,
      resetTheme,
      applyTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}