import React from 'react';
import { Sprout, Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { LanguageCode } from '../types';
import { getTranslation } from '../data/translations';

interface FooterProps {
  currentLanguage: LanguageCode;
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLanguage, setActiveTab }) => {
  const t = getTranslation(currentLanguage);

  const quickLinks = [
    { label: t.nav.home, tab: 'home' },
    { label: t.nav.about, tab: 'about' },
    { label: t.nav.services, tab: 'services' },
    { label: t.nav.careers, tab: 'careers' },
    { label: t.nav.contact, tab: 'contact' },
    { label: t.chat.title, tab: 'chat' },
    { label: t.disease.title, tab: 'disease' },
    { label: t.prices.title, tab: 'prices' },
    { label: t.marketplace.title, tab: 'marketplace' },
  ];

  return (
    <footer className="bg-stone-900 text-stone-400 border-t border-stone-800 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-xs">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sprout className="w-5 h-5 text-saf-400" />
              <span className="font-black text-stone-100 text-sm">
                Sauti<span className="text-amber-400">Farm</span>
              </span>
            </div>
            <p className="text-[11px] text-stone-500 leading-relaxed">
              AI-powered agricultural assistant for Kenyan farmers. Get crop advice, market prices, and disease diagnosis in your local language.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-stone-500">
              <ShieldCheck className="w-3.5 h-3.5 text-saf-500" />
              <span>KALRO & KEPHIS Compliant</span>
            </div>
          </div>

          <div>
            <h4 className="text-stone-200 font-bold mb-3">{t.footer.quickLinks}</h4>
            <ul className="space-y-2 text-stone-500">
              {quickLinks.map(({ label, tab }) => (
                <li key={tab}>
                  <button onClick={() => setActiveTab(tab)} className="hover:text-amber-400 transition">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-stone-200 font-bold mb-3">{t.footer.resources}</h4>
            <ul className="space-y-2 text-stone-500">
              <li><button onClick={() => setActiveTab('home')} className="hover:text-amber-400 transition">{t.home.storiesTitle}</button></li>
              <li><button onClick={() => setActiveTab('home')} className="hover:text-amber-400 transition">{t.home.cropCalendarTitle}</button></li>
              <li><button onClick={() => setActiveTab('home')} className="hover:text-amber-400 transition">{t.home.videoTutorialsTitle}</button></li>
              <li><button onClick={() => setActiveTab('informationhub')} className="hover:text-amber-400 transition">{t.nav.informationHub}</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-stone-200 font-bold mb-3">{t.footer.contact}</h4>
            <ul className="space-y-2 text-stone-500">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-saf-500" />
                
                <span>+254 711 234 567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-saf-500" />
                <span>info@sautifarm.co.ke</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-saf-500" />
                <span>Nairobi, Kenya</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-stone-800 text-center text-[11px] text-stone-600">
          SautiFarm Kenya. Ushauri wa Kilimo Bora kwa Lugha Zote za Kenya.
        </div>
      </div>
    </footer>
  );
};
