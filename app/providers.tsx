'use client';

import { LanguageCode } from '@/src/types';
import { LanguageProvider, useLanguage } from '@/app/context/LanguageContext';
import { AuthProvider, useAuth } from '@/app/context/AuthContext';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, ReactNode } from 'react';
import { Navbar } from '@/src/components/Navbar';
import { Footer } from '@/src/components/Footer';
import { AuthModal } from '@/src/components/AuthModal';
import { MessageSquareText } from 'lucide-react';
import Link from 'next/link';

function ScrollRestoration() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, searchParams]);

  return null;
}

function LayoutContent({ children }: { children: ReactNode }) {
  const { currentLanguage } = useLanguage();
  const { isAuthenticated, authModalOpen } = useAuth();

  useEffect(() => {
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">
        {children}
      </main>
      <Footer />
      {authModalOpen && !isAuthenticated && <AuthModal />}
      <Link href="/chat" aria-label="Open Chat Assistant">
        <button
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl bg-saf-800 text-white hover:bg-saf-700 flex items-center justify-center transition-transform hover:scale-105"
        >
          <MessageSquareText className="w-7 h-7" />
        </button>
      </Link>
    </>
  );
}

export function Providers({ children, initialLanguage }: { children: ReactNode; initialLanguage?: LanguageCode }) {
  return (
    <LanguageProvider initialLanguage={initialLanguage}>
      <AuthProvider>
        <ScrollRestoration />
        <LayoutContent>{children}</LayoutContent>
      </AuthProvider>
    </LanguageProvider>
  );
}
