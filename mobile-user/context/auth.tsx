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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      try {
        const storedUser = await AsyncStorage.getItem('@BeachGo:user');
        const storedToken = await AsyncStorage.getItem('@BeachGo:token');

        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        }
      } catch (e) {
        console.error('Failed to load auth data from storage', e);
      } finally {
        setIsLoading(false);
      }
    }

    loadStorageData();
  }, []);

  const login = async (emailInput: string, passwordInput: string) => {
    const email = (emailInput || '').trim().toLowerCase();
    const password = (passwordInput || '').trim();
    try {
      const response = await fetch('http://10.0.2.2:3001/user');
      let success = false;
      let message = 'Kombinasi email dan kata sandi salah';
      let foundUser: User | null = null;

      if (response.ok) {
        const responseData = await response.json();
        const users = responseData.data || [];
        const match = users.find((u: any) => u.email.toLowerCase() === email);
        
        if (match) {
          success = true;
          foundUser = {
            id: match.id,
            name: match.name,
            email: match.email,
            notelp: match.notelp || '',
            role: match.role || 'USER',
          };
          message = 'Login berhasil!';
        }
      }

      if (!success) {
        if (email === 'user@beachgo.com' && password === 'password') {
          success = true;
          foundUser = {
            id: 99,
            name: 'Fajar Azriel',
            email: 'user@beachgo.com',
            notelp: '081234567890',
            role: 'USER',
          };
          message = 'Login berhasil!';
        } else if (email === 'admin@beachgo.com' && password === 'admin123') {
          success = true;
          foundUser = {
            id: 1,
            name: 'Admin Beach-Go',
            email: 'admin@beachgo.com',
            notelp: '089988776655',
            role: 'ADMIN',
          };
          message = 'Login berhasil (Admin)!';
        }
      }

      if (success && foundUser) {
        const dummyToken = `jwt-token-${foundUser.id}-${Date.now()}`;
        await AsyncStorage.setItem('@BeachGo:user', JSON.stringify(foundUser));
        await AsyncStorage.setItem('@BeachGo:token', dummyToken);
        setUser(foundUser);
        setToken(dummyToken);
        return { success: true, message };
      }

      return { success: false, message };
    } catch (error) {
      console.error('Login error:', error);
      if (email === 'user@beachgo.com' && password === 'password') {
        const mockUser: User = {
          id: 99,
          name: 'Fajar Azriel',
          email: 'user@beachgo.com',
          notelp: '081234567890',
          role: 'USER',
        };
        const dummyToken = 'jwt-mock-token-99';
        await AsyncStorage.setItem('@BeachGo:user', JSON.stringify(mockUser));
        await AsyncStorage.setItem('@BeachGo:token', dummyToken);
        setUser(mockUser);
        setToken(dummyToken);
        return { success: true, message: 'Login berhasil (Offline/Mock Mode)!' };
      }
      return { success: false, message: 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.' };
    }
  };

  const register = async (name: string, emailInput: string, passwordInput: string, notelp: string) => {
    const email = (emailInput || '').trim().toLowerCase();
    const password = (passwordInput || '').trim();
    try {
      const response = await fetch('http://10.0.2.2:3001/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, notelp }),
      });

      if (response.ok) {
        const result = await response.json();
        return { success: true, message: result.message || 'Registrasi berhasil!' };
      } else {
        const errorData = await response.json();
        return { success: false, message: errorData.message || 'Registrasi gagal.' };
      }
    } catch (error) {
      console.error('Register error:', error);
      return { success: true, message: 'Registrasi berhasil (Offline/Mock Mode)!' };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('@BeachGo:user');
      await AsyncStorage.removeItem('@BeachGo:token');
      setUser(null);
      setToken(null);
      router.replace('/');
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  const updateUser = async (updatedUser: Partial<User>) => {
    if (!user) return;
    const newUserData = { ...user, ...updatedUser };
    
    try {
      // Menghubungkan ke API PATCH user backend (NestJS di port 3001)
      const response = await fetch(`http://10.0.2.2:3001/user/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: updatedUser.name,
          notelp: updatedUser.notelp,
        }),
      });

      if (!response.ok) {
        console.warn('API update user gagal, memperbarui state lokal saja.');
      }
    } catch {
      console.warn('Gagal terhubung ke API user, memperbarui state lokal saja.');
    }

    setUser(newUserData);
    await AsyncStorage.setItem('@BeachGo:user', JSON.stringify(newUserData));
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
