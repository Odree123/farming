import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { FarmerProfile } from '@/src/types';

interface AuthContextType {
  farmer: FarmerProfile | null;
  isAuthenticated: boolean;
  login: (phone: string) => Promise<void>;
  setFarmer: (farmer: FarmerProfile) => void;
  logout: () => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  authModalOpen: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [farmer, setFarmerState] = useState<FarmerProfile | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sautifarm_user_profile');
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as FarmerProfile;
          if (parsed.isAuthenticated) {
            return parsed;
          }
        } catch {}
      }
    }
    return null;
  });

  const [authModalOpen, setAuthModalOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sautifarm_user_profile');
      if (!saved) return true;
      try {
        const parsed = JSON.parse(saved) as FarmerProfile;
        return !parsed.isAuthenticated;
      } catch {}
    }
    return true;
  });

  useEffect(() => {
    if (farmer) {
      localStorage.setItem('sautifarm_user_profile', JSON.stringify(farmer));
    }
  }, [farmer]);

  const isAuthenticated = !!farmer?.isAuthenticated;

  const setFarmer = (profile: FarmerProfile) => {
    setFarmerState(profile);
  };

  const login = async (phone: string) => {
    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp: '2541' }),
      });
      if (!res.ok) throw new Error('verify failed');
      const data = await res.json();
      setFarmerState(data.farmer);
      setAuthModalOpen(false);
    } catch (err) {
      console.error('Login failed:', err);
      throw err;
    }
  };

  const logout = () => {
    setFarmerState(null);
    localStorage.removeItem('sautifarm_user_profile');
  };

  const openAuthModal = () => setAuthModalOpen(true);
  const closeAuthModal = () => setAuthModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        farmer,
        isAuthenticated,
        login,
        setFarmer,
        logout,
        openAuthModal,
        closeAuthModal,
        authModalOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

