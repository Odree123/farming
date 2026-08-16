import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeDashboard } from './components/HomeDashboard';
import { ChatAssistant } from './components/ChatAssistant';
import { DiseaseDetection } from './components/DiseaseDetection';
import { MarketPrices } from './components/MarketPrices';
import { Marketplace } from './components/Marketplace';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { USSDSimulatorModal } from './components/USSDSimulatorModal';
import { LanguageCode, CartItem, ProductItem, FarmerProfile } from './types';
import { getTranslation } from './data/translations';
import { 
  Sprout, 
  MessageSquareText, 
  ScanLine, 
  TrendingUp, 
  ShoppingBag,
  PhoneCall,
  Heart
} from 'lucide-react';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<string>('home');
  
  // Language State (Default: Kiswahili)
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('sautifarm_lang');
    return (saved as LanguageCode) || 'sw';
  });

  // Farmer Profile State
  const [farmer, setFarmer] = useState<FarmerProfile>(() => {
    const saved = localStorage.getItem('sautifarm_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      phone: '0722 123 456',
      name: 'Wanjiku Mwangi',
      county: 'Uasin Gishu (Eldoret)',
      farmSizeAcres: 3.5,
      primaryCrops: ['Maize', 'Beans', 'Tomatoes'],
      preferredLanguage: 'sw',
      isAuthenticated: false,
    };
  });

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('sautifarm_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return [];
  });

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isUSSDOpen, setIsUSSDOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Sync state to storage
  useEffect(() => {
    localStorage.setItem('sautifarm_lang', currentLanguage);
  }, [currentLanguage]);

  useEffect(() => {
    localStorage.setItem('sautifarm_cart', JSON.stringify(cart));
  }, [cart]);

  // Online / Offline listener
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Cart Handlers
  const handleAddToCart = (product: ProductItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const t = getTranslation(currentLanguage);
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-emerald-200">
      {/* Top Main Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentLanguage={currentLanguage}
        setLanguage={setCurrentLanguage}
        cartCount={totalCartCount}
        openCart={() => setIsCartOpen(true)}
        farmer={farmer}
        openAuth={() => setIsAuthOpen(true)}
        openUSSD={() => setIsUSSDOpen(true)}
        isOnline={isOnline}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 md:pb-8">
        {activeTab === 'home' && (
          <HomeDashboard
            setActiveTab={setActiveTab}
            currentLanguage={currentLanguage}
            farmer={farmer}
            openUSSD={() => setIsUSSDOpen(true)}
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
            onAddToCart={handleAddToCart}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'prices' && (
          <MarketPrices currentLanguage={currentLanguage} />
        )}

        {activeTab === 'marketplace' && (
          <Marketplace
            currentLanguage={currentLanguage}
            onAddToCart={handleAddToCart}
            openCart={() => setIsCartOpen(true)}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation Bar (Thumb Friendly) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-emerald-950/95 backdrop-blur-md border-t border-emerald-800 px-2 py-1.5 flex justify-around items-center text-[10px]">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg transition ${
            activeTab === 'home' ? 'text-amber-400 font-bold' : 'text-emerald-200 hover:text-white'
          }`}
        >
          <Sprout className="w-5 h-5 mb-0.5" />
          <span>{t.nav.home}</span>
        </button>

        <button
          onClick={() => setActiveTab('chat')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg transition ${
            activeTab === 'chat' ? 'text-amber-400 font-bold' : 'text-emerald-200 hover:text-white'
          }`}
        >
          <MessageSquareText className="w-5 h-5 mb-0.5" />
          <span>{t.nav.chat}</span>
        </button>

        <button
          onClick={() => setActiveTab('disease')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg transition ${
            activeTab === 'disease' ? 'text-amber-400 font-bold' : 'text-emerald-200 hover:text-white'
          }`}
        >
          <ScanLine className="w-5 h-5 mb-0.5" />
          <span>{t.nav.disease}</span>
        </button>

        <button
          onClick={() => setActiveTab('prices')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg transition ${
            activeTab === 'prices' ? 'text-amber-400 font-bold' : 'text-emerald-200 hover:text-white'
          }`}
        >
          <TrendingUp className="w-5 h-5 mb-0.5" />
          <span>{t.nav.prices}</span>
        </button>

        <button
          onClick={() => setActiveTab('marketplace')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg transition ${
            activeTab === 'marketplace' ? 'text-amber-400 font-bold' : 'text-emerald-200 hover:text-white'
          }`}
        >
          <ShoppingBag className="w-5 h-5 mb-0.5" />
          <span>{t.nav.marketplace}</span>
        </button>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={handleUpdateCartQuantity}
        removeFromCart={handleRemoveFromCart}
        clearCart={handleClearCart}
        currentLanguage={currentLanguage}
        farmer={farmer}
      />

      {/* Farmer Profile / Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        farmer={farmer}
        setFarmer={setFarmer}
        currentLanguage={currentLanguage}
        setLanguage={setCurrentLanguage}
      />

      {/* USSD *384*77# Simulator Modal */}
      <USSDSimulatorModal
        isOpen={isUSSDOpen}
        onClose={() => setIsUSSDOpen(false)}
      />

      {/* Footer */}
      <footer className="hidden md:block bg-stone-900 text-stone-400 border-t border-stone-800 py-8 mt-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Sprout className="w-5 h-5 text-emerald-500" />
            <span className="font-black text-stone-100 text-sm">
              Sauti<span className="text-amber-400">Farm</span> Kenya 🇰🇪
            </span>
            <span className="text-stone-600">|</span>
            <span>Ushauri wa Kilimo Bora kwa Lugha Zote za Kenya</span>
          </div>

          <div className="flex items-center space-x-6">
            <button onClick={() => setIsUSSDOpen(true)} className="hover:text-amber-400 flex items-center space-x-1">
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>USSD Dial: *384*77#</span>
            </button>
            <span>•</span>
            <span>KALRO & KEPHIS Compliant</span>
            <span>•</span>
            <span>Safaricom M-Pesa Integrated</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

