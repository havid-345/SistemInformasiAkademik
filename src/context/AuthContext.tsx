import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types/auth';
import { INITIAL_USERS } from '../data/mockAuth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, role?: UserRole) => boolean;
  logout: () => void;
  switchAccount: (role: UserRole) => void;
  updateCurrentUser: (updated: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'simaku_current_user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load user from localStorage', e);
    }
    // Default logged in as admin for immediate interactive preview
    return INITIAL_USERS[0];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const login = (username: string, explicitRole?: UserRole): boolean => {
    // Check in INITIAL_USERS by username or NIM or NIDN
    const trimmed = username.trim().toLowerCase();
    let found = INITIAL_USERS.find(
      (u) =>
        u.username.toLowerCase() === trimmed ||
        (u.nimOrNidn && u.nimOrNidn.toLowerCase() === trimmed)
    );

    if (!found && explicitRole) {
      found = INITIAL_USERS.find((u) => u.role === explicitRole);
    }

    if (found) {
      setUser(found);
      return true;
    }

    // Fallback: create dynamic session for custom NIM/NIDN
    const role: UserRole = explicitRole || (username.startsWith('04') ? 'dosen' : 'mahasiswa');
    const newUser: User = {
      id: `u-${Date.now()}`,
      username: username,
      nama: role === 'mahasiswa' ? `Mahasiswa (${username})` : `Dosen (${username})`,
      role: role,
      nimOrNidn: username,
      prodi: 'Teknik Informatika',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      semesterAktif: '2026/2027 Ganjil',
      jatahSks: 24,
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const switchAccount = (role: UserRole) => {
    const target = INITIAL_USERS.find((u) => u.role === role);
    if (target) {
      setUser(target);
    }
  };

  const updateCurrentUser = (updated: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updated } : null));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        switchAccount,
        updateCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
