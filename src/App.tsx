import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeDashboard } from './components/HomeDashboard';
import { ChatAssistant } from './components/ChatAssistant';
import { DiseaseDetection } from './components/DiseaseDetection';
import { MarketPrices } from './components/MarketPrices';
import { Marketplace } from './components/Marketplace';
import { ProductModal } from './components/ProductModal';
import { Footer } from './components/Footer';
import { LanguageCode, ProductItem, FarmerProfile } from './types';
import { getTranslation } from './data/translations';
import { Sprout } from 'lucide-react';

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

  useEffect(() => {
    localStorage.setItem('sautifarm_lang', currentLanguage);
  }, [currentLanguage]);

  const t = getTranslation(currentLanguage);

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

        {activeTab === 'chat' && (
          <ChatAssistant
            currentLanguage={currentLanguage}
            farmer={farmer}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'disease' && (
          <DiseaseDetection
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
      </main>

      <Footer currentLanguage={currentLanguage} />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          currentLanguage={currentLanguage}
        />
      )}
    </div>
  );
}
