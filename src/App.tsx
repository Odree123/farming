import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeDashboard } from './components/HomeDashboard';
import { AboutUs } from './components/AboutUs';
import { Services } from './components/Services';
import { Careers } from './components/Careers';
import { ContactUs } from './components/Contact';
import { ChatAssistant } from './components/ChatAssistant';
import { MarketPrices } from './components/MarketPrices';
import { Marketplace } from './components/Marketplace';
import { ProductModal } from './components/ProductModal';
import { DevPortal } from './components/DevPortal';
import { InformationHub } from './components/InformationHub';
import { Investors } from './components/Investors';
import { Footer } from './components/Footer';
import { LanguageCode, ProductItem, FarmerProfile } from './types';
import { getTranslation } from './data/translations';
import { Sprout, MessageSquareText } from 'lucide-react';
import { DiseaseDetection } from './components/DiseaseDetection';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('sautifarm_lang');
    return (saved as LanguageCode) || 'sw';
  });

  const [farmer, setFarmer] = useState<FarmerProfile>(() => {
    const saved = localStorage.getItem('sautifarm_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      phone: '0722 123 456',
      name: 'Wanjiku Mwangi',
      county: 'Uasin Gishu (Eldoret)',
      farmSizeAcres: 3.5,
      primaryCrops: ['Maize', 'Beans', 'Tomatoes'],
      livestock: ['Dairy Cow', 'Poultry'],
      preferredLanguage: 'sw',
      isAuthenticated: true,
    };
  });

  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('sautifarm_lang', currentLanguage);
  }, [currentLanguage]);

  const t = getTranslation(currentLanguage);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setChatOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    if (chatOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [chatOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-saf-200">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentLanguage={currentLanguage}
        setLanguage={setCurrentLanguage}
        farmer={farmer}
      />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">
        {activeTab === 'home' && (
          <HomeDashboard
            setActiveTab={setActiveTab}
            currentLanguage={currentLanguage}
            farmer={farmer}
          />
        )}

        {activeTab === 'about' && (
          <AboutUs
            currentLanguage={currentLanguage}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'services' && (
          <Services
            currentLanguage={currentLanguage}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'careers' && (
          <Careers
            currentLanguage={currentLanguage}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'contact' && (
          <ContactUs
            currentLanguage={currentLanguage}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'prices' && (
          <MarketPrices currentLanguage={currentLanguage} />
        )}

        {activeTab === 'marketplace' && (
          <Marketplace
            currentLanguage={currentLanguage}
            onSelectProduct={setSelectedProduct}
          />
        )}

        {activeTab === 'investors' && (
          <Investors currentLanguage={currentLanguage} setActiveTab={setActiveTab} />
        )}
        {activeTab === 'devportal' && (
          <DevPortal currentLanguage={currentLanguage} setActiveTab={setActiveTab} />
        )}
        {activeTab === 'informationhub' && (
          <InformationHub currentLanguage={currentLanguage} setActiveTab={setActiveTab} />
        )}
        {activeTab === 'disease' && (
          <DiseaseDetection currentLanguage={currentLanguage} setActiveTab={setActiveTab} />
        )}
      </main>

      <Footer currentLanguage={currentLanguage} setActiveTab={setActiveTab} />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          currentLanguage={currentLanguage}
        />
      )}

      {chatOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setChatOpen(false)} />
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl">
            <ChatAssistant
              currentLanguage={currentLanguage}
              farmer={farmer}
              setActiveTab={setActiveTab}
              isOpen={chatOpen}
              onClose={() => setChatOpen(false)}
            />
          </div>
        </div>
      )}

      <button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl bg-saf-800 text-white hover:bg-saf-700 flex items-center justify-center transition-transform hover:scale-105"
        aria-label="Open Chat Assistant"
      >
        <MessageSquareText className="w-7 h-7" />
      </button>
    </div>
  );
};
