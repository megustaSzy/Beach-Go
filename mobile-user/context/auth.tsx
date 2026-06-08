import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export interface User {
  id: number;
  name: string;
  email: string;
  notelp: string;
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (name: string, email: string, password: string, notelp: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  updateUser: (updatedUser: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const cache: Record<string, string> = {};
const safeStorage = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      return cache[key] || null;
    }
  },
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // ignore
    }
    cache[key] = value;
  },
  removeItem: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      // ignore
    }
    delete cache[key];
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      try {
        const storedUser = await safeStorage.getItem('@BeachGo:user');
        const storedToken = await safeStorage.getItem('@BeachGo:token');

        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        }
      } catch (e) {
        console.warn('Failed to load auth data from storage:', e);
      } finally {
        setIsLoading(false);
      }
    }

    loadStorageData();
  }, []);

  const login = async (emailInput: string, _passwordInput: string) => {
    // Direct mock login without any validation or network calls.
    const email = (emailInput || "").trim().toLowerCase();
    const mockUser: User = {
      id: 0,
      name: "Pengguna Demo",
      email,
      notelp: "",
      role: "USER",
    };
    const dummyToken = `jwt-mock-token-${Date.now()}`;
    // Store mock credentials locally.
    await safeStorage.setItem("@BeachGo:user", JSON.stringify(mockUser));
    await safeStorage.setItem("@BeachGo:token", dummyToken);
    setUser(mockUser);
    setToken(dummyToken);
    return { success: true, message: "Login berhasil (Mock Mode)!" };
  };

  const register = async (name: string, emailInput: string, passwordInput: string, notelp: string) => {
    // Purely offline mock registration
    return { success: true, message: 'Registrasi berhasil (Offline/Mock Mode)!' };
  };

  const logout = async () => {
    try {
      await safeStorage.removeItem('@BeachGo:user');
      await safeStorage.removeItem('@BeachGo:token');
      setUser(null);
      setToken(null);
      router.replace('/login');
    } catch (e) {
      console.warn('Logout error:', e);
    }
  };

  const updateUser = async (updatedUser: Partial<User>) => {
    if (!user) return;
    const newUserData = { ...user, ...updatedUser };
    setUser(newUserData);
    await safeStorage.setItem('@BeachGo:user', JSON.stringify(newUserData));
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout, updateUser }}>
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
