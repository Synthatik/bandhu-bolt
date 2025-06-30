import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'light' | 'dark' | 'auto';
export type ThemeColor = 'blue' | 'purple' | 'pink' | 'green' | 'orange' | 'teal';

interface ThemeColors {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
}

interface ThemeContextType {
  mode: ThemeMode;
  color: ThemeColor;
  currentTheme: ThemeColors;
  setMode: (mode: ThemeMode) => void;
  setColor: (color: ThemeColor) => void;
  updateTheme: (theme: ThemeColors) => void;
  resetTheme: () => void;
  applyTheme: (colors: ThemeColors) => void;
}

const themeColors: Record<ThemeColor, { light: ThemeColors; dark: ThemeColors }> = {
  blue: {
    light: {
      name: 'Blue Light',
      primary: '#007AFF',
      secondary: '#34C759',
      accent: '#FF9500',
      background: '#f8fafc',
      surface: '#ffffff',
      text: '#1a202c',
      textSecondary: '#64748b'
    },
    dark: {
      name: 'Blue Dark',
      primary: '#0A84FF',
      secondary: '#30D158',
      accent: '#FF9F0A',
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f1f5f9',
      textSecondary: '#94a3b8'
    }
  },
  purple: {
    light: {
      name: 'Purple Light',
      primary: '#a855f7',
      secondary: '#14b8a6',
      accent: '#f59e0b',
      background: '#faf5ff',
      surface: '#ffffff',
      text: '#1a202c',
      textSecondary: '#64748b'
    },
    dark: {
      name: 'Purple Dark',
      primary: '#c084fc',
      secondary: '#2dd4bf',
      accent: '#fbbf24',
      background: '#1e1b4b',
      surface: '#312e81',
      text: '#f1f5f9',
      textSecondary: '#94a3b8'
    }
  },
  pink: {
    light: {
      name: 'Pink Touch',
      primary: '#ec4899',
      secondary: '#06b6d4',
      accent: '#f59e0b',
      background: '#fdf2f8',
      surface: '#ffffff',
      text: '#1a202c',
      textSecondary: '#64748b'
    },
    dark: {
      name: 'Pink Touch Dark',
      primary: '#f472b6',
      secondary: '#22d3ee',
      accent: '#fbbf24',
      background: '#831843',
      surface: '#be185d',
      text: '#f1f5f9',
      textSecondary: '#94a3b8'
    }
  },
  green: {
    light: {
      name: 'Green Light',
      primary: '#10b981',
      secondary: '#3b82f6',
      accent: '#f59e0b',
      background: '#f0fdf4',
      surface: '#ffffff',
      text: '#1a202c',
      textSecondary: '#64748b'
    },
    dark: {
      name: 'Green Dark',
      primary: '#34d399',
      secondary: '#60a5fa',
      accent: '#fbbf24',
      background: '#064e3b',
      surface: '#065f46',
      text: '#f1f5f9',
      textSecondary: '#94a3b8'
    }
  },
  orange: {
    light: {
      name: 'Orange Light',
      primary: '#f97316',
      secondary: '#8b5cf6',
      accent: '#06b6d4',
      background: '#fff7ed',
      surface: '#ffffff',
      text: '#1a202c',
      textSecondary: '#64748b'
    },
    dark: {
      name: 'Orange Dark',
      primary: '#fb923c',
      secondary: '#a78bfa',
      accent: '#22d3ee',
      background: '#9a3412',
      surface: '#c2410c',
      text: '#f1f5f9',
      textSecondary: '#94a3b8'
    }
  },
  teal: {
    light: {
      name: 'Teal Light',
      primary: '#14b8a6',
      secondary: '#8b5cf6',
      accent: '#f59e0b',
      background: '#f0fdfa',
      surface: '#ffffff',
      text: '#1a202c',
      textSecondary: '#64748b'
    },
    dark: {
      name: 'Teal Dark',
      primary: '#2dd4bf',
      secondary: '#a78bfa',
      accent: '#fbbf24',
      background: '#134e4a',
      surface: '#0f766e',
      text: '#f1f5f9',
      textSecondary: '#94a3b8'
    }
  }
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light');
  const [color, setColor] = useState<ThemeColor>('blue');
  const [currentTheme, setCurrentTheme] = useState<ThemeColors>(themeColors.blue.light);

  useEffect(() => {
    // Load saved preferences
    const savedMode = localStorage.getItem('dreamAssistantThemeMode') as ThemeMode;
    const savedColor = localStorage.getItem('dreamAssistantThemeColor') as ThemeColor;
    
    if (savedMode) setMode(savedMode);
    if (savedColor) setColor(savedColor);
  }, []);

  useEffect(() => {
    // Determine actual mode
    let actualMode = mode;
    if (mode === 'auto') {
      actualMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // Update theme
    const newTheme = themeColors[color][actualMode];
    setCurrentTheme(newTheme);
    applyTheme(newTheme);

    // Save preferences
    localStorage.setItem('dreamAssistantThemeMode', mode);
    localStorage.setItem('dreamAssistantThemeColor', color);
  }, [mode, color]);

  const applyTheme = (theme: ThemeColors) => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-secondary', theme.secondary);
    root.style.setProperty('--color-accent', theme.accent);
    root.style.setProperty('--color-background', theme.background);
    root.style.setProperty('--color-surface', theme.surface);
    root.style.setProperty('--color-text', theme.text);
    root.style.setProperty('--color-text-secondary', theme.textSecondary);
    
    // Update body class for dark mode
    if (theme.name.includes('Dark')) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  const updateTheme = (theme: ThemeColors) => {
    setCurrentTheme(theme);
    applyTheme(theme);
  };

  const resetTheme = () => {
    setMode('light');
    setColor('blue');
  };

  return (
    <ThemeContext.Provider value={{
      mode,
      color,
      currentTheme,
      setMode,
      setColor,
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