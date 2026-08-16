import React, { useState } from 'react';
import { 
  Sprout, 
  MessageSquareText, 
  ScanLine, 
  TrendingUp, 
  ShoppingBag, 
  PhoneCall, 
  Globe, 
  User, 
  ShoppingCart, 
  Wifi, 
  WifiOff, 
  Menu, 
  X,
  ChevronDown
} from 'lucide-react';
import { LanguageCode, FarmerProfile } from '../types';
import { SUPPORTED_LANGUAGES, getTranslation } from '../data/translations';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentLanguage: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  cartCount: number;
  openCart: () => void;
  farmer: FarmerProfile;
  openAuth: () => void;
  openUSSD: () => void;
  isOnline: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentLanguage,
  setLanguage,
  cartCount,
  openCart,
  farmer,
  openAuth,
  openUSSD,
  isOnline,
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = getTranslation(currentLanguage);

  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  const navItems = [
    { id: 'home', label: t.nav.home, icon: Sprout },
    { id: 'chat', label: t.nav.chat, icon: MessageSquareText, badge: 'AI' },
    { id: 'disease', label: t.nav.disease, icon: ScanLine, badge: 'Vision' },
    { id: 'prices', label: t.nav.prices, icon: TrendingUp },
    { id: 'marketplace', label: t.nav.marketplace, icon: ShoppingBag },
  ];

  return (
    <header className="sticky top-0 z-40 bg-emerald-900 text-white shadow-md border-b border-emerald-800">
      {/* Top micro bar for Connectivity & USSD prompt */}
      <div className="bg-emerald-950 px-4 py-1 text-xs flex justify-between items-center text-emerald-200 border-b border-emerald-900/50">
        <div className="flex items-center space-x-2">
          {isOnline ? (
            <span className="flex items-center text-emerald-400">
              <Wifi className="w-3 h-3 mr-1" />
              <span className="hidden sm:inline">Online (Live Kalro & Market Data)</span>
              <span className="sm:hidden">Online</span>
            </span>
          ) : (
            <span className="flex items-center text-amber-300">
              <WifiOff className="w-3 h-3 mr-1" />
              <span>Offline Mode (Cached Data)</span>
            </span>
          )}
          <span className="text-emerald-700">|</span>
          <span className="text-emerald-300 hidden md:inline">
            Kenyan Agricultural AI • KALRO & KEPHIS Compliant
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={openUSSD}
            className="flex items-center bg-emerald-800 hover:bg-emerald-700 text-emerald-100 px-2 py-0.5 rounded text-xs font-mono font-medium transition"
            title="Interactive Feature Phone Simulator"
          >
            <PhoneCall className="w-3 h-3 mr-1 text-amber-400" />
            <span className="hidden sm:inline">USSD:</span> *384*77#
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-amber-400 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-emerald-900 rounded-[10px] flex items-center justify-center">
                <Sprout className="w-6 h-6 text-emerald-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-black tracking-tight text-white font-sans">
                  Sauti<span className="text-amber-400">Farm</span>
                </span>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded font-semibold uppercase tracking-wider">
                  Kenya 🇰🇪
                </span>
              </div>
              <p className="text-[11px] text-emerald-300/80 -mt-0.5 hidden sm:block">
                Bwana Shamba AI & Market Hub
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-800 text-amber-300 shadow-inner'
                      : 'text-emerald-100 hover:bg-emerald-800/60 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-emerald-300'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] bg-emerald-700 text-amber-300 px-1.5 py-0.2 rounded font-mono font-semibold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action buttons (Language Switcher, Cart, Auth) */}
          <div className="flex items-center space-x-2">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                id="language-dropdown-btn"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center space-x-1.5 bg-emerald-800/80 hover:bg-emerald-800 border border-emerald-700 px-2.5 py-1.5 rounded-lg text-xs font-medium text-emerald-100 transition"
              >
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-semibold">{currentLangObj.flagEmoji} {currentLangObj.nativeName}</span>
                <ChevronDown className="w-3 h-3 text-emerald-400" />
              </button>

              {langMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setLangMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-stone-900 border border-emerald-700/80 rounded-xl shadow-xl z-50 py-1.5 overflow-hidden">
                    <div className="px-3 py-1.5 text-[11px] font-semibold text-emerald-400 uppercase tracking-wider border-b border-stone-800">
                      Chagua Lugha / Select Language
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {SUPPORTED_LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setLangMenuOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-950/80 transition ${
                            currentLanguage === lang.code ? 'bg-emerald-900/60 text-amber-300 font-semibold' : 'text-stone-200'
                          }`}
                        >
                          <span className="flex items-center space-x-2">
                            <span className="text-base">{lang.flagEmoji}</span>
                            <span>{lang.nativeName} ({lang.name})</span>
                          </span>
                          {currentLanguage === lang.code && (
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Cart Button */}
            <button
              id="open-cart-btn"
              onClick={openCart}
              className="relative p-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-emerald-100 transition"
              title="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5 text-emerald-200" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-stone-950 font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Farmer Profile Button */}
            <button
              id="farmer-profile-btn"
              onClick={openAuth}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-semibold px-3 py-1.5 rounded-lg text-xs transition shadow-sm"
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {farmer.isAuthenticated ? farmer.name.split(' ')[0] : 'Ingia / Sign In'}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-emerald-200 hover:bg-emerald-800 transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-emerald-950 border-t border-emerald-800 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive ? 'bg-emerald-800 text-amber-300' : 'text-emerald-100 hover:bg-emerald-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5 text-emerald-400" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-xs bg-emerald-700 text-amber-300 px-2 py-0.5 rounded font-mono">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-emerald-800/80 mt-2">
            <button
              onClick={() => {
                openUSSD();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center space-x-2 bg-emerald-800/70 text-amber-300 py-2 rounded-lg text-xs font-mono font-semibold"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>Simulate USSD Dial: *384*77#</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
