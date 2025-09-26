import { useState, useEffect, createContext, useContext } from 'react';
import { createClient, User } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-key';

const supabase = createClient(supabaseUrl, supabaseKey);

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata?: any) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    // Return mock auth for demo purposes when Supabase is not configured
    return useMockAuth();
  }
  return context;
};

const useMockAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('mock_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = {
      id: 'mock-user-id',
      email,
      user_metadata: JSON.parse(localStorage.getItem('mock_user_metadata') || '{}'),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      aud: 'authenticated',
      role: 'authenticated'
    } as User;

    setUser(mockUser);
    localStorage.setItem('mock_user', JSON.stringify(mockUser));
    setLoading(false);
  };

  const signUp = async (email: string, password: string, metadata?: any) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = {
      id: 'mock-user-id',
      email,
      user_metadata: metadata || {},
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      aud: 'authenticated',
      role: 'authenticated'
    } as User;

    setUser(mockUser);
    localStorage.setItem('mock_user', JSON.stringify(mockUser));
    localStorage.setItem('mock_user_metadata', JSON.stringify(metadata || {}));
    setLoading(false);
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('mock_user');
    localStorage.removeItem('mock_user_metadata');
  };

  return { user, loading, signIn, signUp, signOut };
};