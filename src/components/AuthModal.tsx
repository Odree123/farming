'use client';

import React, { useState } from 'react';
import { Phone, Key, Check, User, MapPin, Hash, X } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import { useAuth } from '@/app/context/AuthContext';
import { FarmerProfile, LanguageCode } from '@/src/types';
import { getTranslation } from '@/src/data/translations';

type AuthStep = 'phone' | 'profile';

export const AuthModal: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const { setFarmer, closeAuthModal, isAuthenticated } = useAuth();
  const t = getTranslation(currentLanguage);
  const [step, setStep] = useState<AuthStep>('phone');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [county, setCounty] = useState('');
  const [farmSize, setFarmSize] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) return null;

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setStep('profile');
  };

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    const profile: FarmerProfile = {
      phone,
      name: name || 'Mkulima',
      county: county || 'Kenya',
      farmSizeAcres: farmSize ? Number(farmSize) : 2,
      primaryCrops: [],
      livestock: [],
      preferredLanguage: currentLanguage as LanguageCode,
      isAuthenticated: true,
    };
    setFarmer(profile);
    closeAuthModal();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-stone-200 overflow-hidden">
        <div className="bg-gradient-to-r from-saf-900 to-saf-800 text-white px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black">{t.auth.loginTitle}</h2>
              <p className="text-xs text-saf-200/80 mt-0.5">
                 {step === 'phone' && t.auth.enterPhone}
                 {step === 'profile' && 'Complete your profile'}
              </p>
            </div>
            <button
              onClick={closeAuthModal}
              className="p-1.5 text-saf-300 hover:text-white hover:bg-saf-800 rounded-lg transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {step === 'phone' && (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {t.auth.enterPhone}
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.auth.phonePlaceholder}
                    required
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl outline-none focus:ring-2 focus:ring-saf-500 focus:border-saf-600 transition"
                  />
                </div>
              </div>
               <button
                 type="submit"
                 disabled={isSubmitting || !phone.trim()}
                 className="w-full bg-saf-800 hover:bg-saf-700 text-white font-bold py-2.5 rounded-xl text-sm transition flex items-center justify-center gap-2 disabled:opacity-50"
               >
                 Endelea
                 <Key className="w-4 h-4" />
               </button>
             </form>
           )}

          {step === 'profile' && (
            <form onSubmit={handleComplete} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {t.auth.name}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jina Lako Kamili"
                    required
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl outline-none focus:ring-2 focus:ring-saf-500 focus:border-saf-600 transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {t.auth.county}
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    value={county}
                    onChange={(e) => setCounty(e.target.value)}
                    placeholder="Uasin Gishu (Eldoret)"
                    required
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl outline-none focus:ring-2 focus:ring-saf-500 focus:border-saf-600 transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {t.auth.farmSize}
                </label>
                <div className="relative">
                  <Hash className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
                  <input
                    type="number"
                    value={farmSize}
                    onChange={(e) => setFarmSize(e.target.value)}
                    placeholder="3.5"
                    required
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl outline-none focus:ring-2 focus:ring-saf-500 focus:border-saf-600 transition"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-saf-800 hover:bg-saf-700 text-white font-bold py-2.5 rounded-xl text-sm transition flex items-center justify-center gap-2"
              >
                {t.auth.verifyOtp}
                <Check className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
