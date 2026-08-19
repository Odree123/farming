import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { LanguageCode } from '@/src/types';

interface LanguageContextType {
  currentLanguage: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children, initialLanguage }: { children: ReactNode; initialLanguage?: LanguageCode }) {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(initialLanguage || 'sw');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sautifarm_lang');
      if (saved) {
        setCurrentLanguage(saved as LanguageCode);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sautifarm_lang', currentLanguage);
    if (typeof window !== 'undefined') {
      document.cookie = `sautifarm_lang=${currentLanguage}; path=/; max-age=31536000`;
    }
  }, [currentLanguage]);

  const setLanguage = (lang: LanguageCode) => {
    setCurrentLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
