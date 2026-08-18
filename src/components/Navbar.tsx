import React, { useState } from 'react';
import { 
  Sprout, 
  MessageSquareText, 
  ScanLine, 
  TrendingUp, 
  ShoppingBag, 
  Globe, 
  Menu, 
  X,
  ChevronDown,
  User
} from 'lucide-react';
import { LanguageCode, FarmerProfile } from '../types';
import { SUPPORTED_LANGUAGES, getTranslation } from '../data/translations';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentLanguage: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  farmer: FarmerProfile;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentLanguage,
  setLanguage,
  farmer,
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
    <header className="sticky top-0 z-40 bg-saf-900 text-white shadow-lg border-b border-saf-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => setActiveTab('home')}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 p-[2px] shadow-md">
              <div className="w-full h-full bg-saf-900 rounded-[10px] flex items-center justify-center">
                <Sprout className="w-5 h-5 text-saf-300" />
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-white">
                  Sauti<span className="text-amber-400">Farm</span>
                </span>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                  Kenya
                </span>
              </div>
              <p className="text-[11px] text-saf-300/90 -mt-0.5">
                Bwana Shamba AI & Market Hub
              </p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-saf-800 text-amber-300 shadow-inner'
                      : 'text-saf-100 hover:bg-saf-800/60 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-saf-300'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] bg-saf-700 text-amber-300 px-1.5 py-0.2 rounded font-mono font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="hidden sm:flex items-center gap-1.5 bg-saf-800/80 hover:bg-saf-800 border border-saf-700 px-2.5 py-1.5 rounded-lg text-xs font-medium text-saf-100 transition"
              >
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-semibold">{currentLangObj.flagEmoji} {currentLangObj.nativeName}</span>
                <ChevronDown className="w-3 h-3 text-saf-400" />
              </button>

              {langMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setLangMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-stone-900 border border-saf-700/80 rounded-xl shadow-xl z-50 py-1.5 overflow-hidden">
                    <div className="px-3 py-1.5 text-[11px] font-bold text-saf-400 uppercase tracking-wider border-b border-stone-800">
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
                          className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-saf-950/80 transition ${
                            currentLanguage === lang.code ? 'bg-saf-900/60 text-amber-300 font-semibold' : 'text-stone-200'
                          }`}
                        >
                          <span className="flex items-center gap-2">
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

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-saf-200 hover:bg-saf-800 transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-saf-950 border-t border-saf-800 px-4 pt-2 pb-4 space-y-1">
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
                  isActive ? 'bg-saf-800 text-amber-300' : 'text-saf-100 hover:bg-saf-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-saf-400" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-xs bg-saf-700 text-amber-300 px-2 py-0.5 rounded font-mono">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-saf-800/80 mt-2">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center font-bold text-xs">
                {farmer.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-white truncate">{farmer.name}</div>
                <div className="text-[11px] text-saf-300 truncate">{farmer.county}</div>
              </div>
            </div>
            <div className="px-3 py-2 text-[11px] text-stone-400 space-y-1">
              <div>Ekari: {farmer.farmSizeAcres}</div>
              <div>Mazao: {farmer.primaryCrops.join(', ')}</div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
