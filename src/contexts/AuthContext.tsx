import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'end_user' | 'admin' | 'super_admin' | 'moderator' | 'trainer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  subscription?: {
    status: 'active' | 'inactive' | 'trial';
    plan: 'free' | 'pro' | 'lifetime';
    expiresAt?: string;
  };
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    fontSize: 'small' | 'medium' | 'large';
    appearance: {
      bubbleStyle: 'rounded' | 'square' | 'minimal';
      accentColor: string;
    };
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  quickLogin: (role: UserRole) => Promise<void>;
  hasRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers: Record<UserRole, User> = {
  end_user: {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'end_user',
    subscription: {
      status: 'active',
      plan: 'pro',
      expiresAt: '2024-12-31'
    },
    preferences: {
      theme: 'light',
      fontSize: 'medium',
      appearance: {
        bubbleStyle: 'rounded',
        accentColor: '#a855f7'
      }
    }
  },
  admin: {
    id: '2',
    name: 'Michael Chen',
    email: 'michael@dreamassistant.com',
    role: 'admin',
    subscription: {
      status: 'active',
      plan: 'lifetime'
    },
    preferences: {
      theme: 'light',
      fontSize: 'medium',
      appearance: {
        bubbleStyle: 'rounded',
        accentColor: '#007AFF'
      }
    }
  },
  super_admin: {
    id: '3',
    name: 'Alex Rodriguez',
    email: 'alex@dreamassistant.com',
    role: 'super_admin',
    subscription: {
      status: 'active',
      plan: 'lifetime'
    },
    preferences: {
      theme: 'light',
      fontSize: 'medium',
      appearance: {
        bubbleStyle: 'rounded',
        accentColor: '#007AFF'
      }
    }
  },
  moderator: {
    id: '4',
    name: 'Emma Wilson',
    email: 'emma@dreamassistant.com',
    role: 'moderator',
    subscription: {
      status: 'active',
      plan: 'lifetime'
    },
    preferences: {
      theme: 'light',
      fontSize: 'medium',
      appearance: {
        bubbleStyle: 'rounded',
        accentColor: '#34C759'
      }
    }
  },
  trainer: {
    id: '5',
    name: 'David Kim',
    email: 'david@dreamassistant.com',
    role: 'trainer',
    subscription: {
      status: 'active',
      plan: 'lifetime'
    },
    preferences: {
      theme: 'light',
      fontSize: 'medium',
      appearance: {
        bubbleStyle: 'rounded',
        accentColor: '#AF52DE'
      }
    }
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user from localStorage or API
    const savedUser = localStorage.getItem('dreamAssistantUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, login as end_user by default
    const userData = mockUsers.end_user;
    setUser(userData);
    localStorage.setItem('dreamAssistantUser', JSON.stringify(userData));
    setIsLoading(false);
  };

  const quickLogin = async (role: UserRole) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const userData = mockUsers[role];
    setUser(userData);
    localStorage.setItem('dreamAssistantUser', JSON.stringify(userData));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dreamAssistantUser');
    localStorage.removeItem('onboardingComplete');
  };

  const hasRole = (role: UserRole) => {
    if (!user) return false;
    
    const roleHierarchy: Record<UserRole, number> = {
      end_user: 1,
      trainer: 2,
      moderator: 3,
      admin: 4,
      super_admin: 5
    };
    
    return roleHierarchy[user.role] >= roleHierarchy[role];
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      logout,
      quickLogin,
      hasRole
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}