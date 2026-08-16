import React, { useState } from 'react';
import { 
  X, 
  Phone, 
  ShieldCheck, 
  User, 
  MapPin, 
  Wheat, 
  Check, 
  Loader2,
  Sparkles
} from 'lucide-react';
import { FarmerProfile, LanguageCode } from '../types';
import { getTranslation, SUPPORTED_LANGUAGES } from '../data/translations';
import { KENYA_COUNTIES } from '../data/mockData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  farmer: FarmerProfile;
  setFarmer: (profile: FarmerProfile) => void;
  currentLanguage: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  farmer,
  setFarmer,
  currentLanguage,
  setLanguage,
}) => {
  const t = getTranslation(currentLanguage);

  const [step, setStep] = useState<'phone' | 'otp' | 'profile'>(
    farmer.isAuthenticated ? 'profile' : 'phone'
  );
  const [phoneNumber, setPhoneNumber] = useState(farmer.phone || '0722123456');
  const [otpCode, setOtpCode] = useState('');
  const [name, setName] = useState(farmer.name || 'Wanjiku Mwangi');
  const [county, setCounty] = useState(farmer.county || 'Uasin Gishu (Eldoret)');
  const [farmSize, setFarmSize] = useState(farmer.farmSizeAcres || 3.5);
  const [primaryCrops, setPrimaryCrops] = useState(farmer.primaryCrops.join(', ') || 'Maize, Beans, Tomatoes');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phoneNumber }),
      });
    } catch (e) {
      // fallback
    }

    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      setStep('otp');
    }, 600);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phoneNumber, code: otpCode }),
      });
    } catch (e) {
      // fallback
    }

    setTimeout(() => {
      setLoading(false);
      setStep('profile');
    }, 600);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: FarmerProfile = {
      phone: phoneNumber,
      name,
      county,
      farmSizeAcres: Number(farmSize),
      primaryCrops: primaryCrops.split(',').map((c) => c.trim()),
      livestock: ['Dairy Cow', 'Poultry'],
      preferredLanguage: currentLanguage,
      isAuthenticated: true,
    };
    setFarmer(updated);
    localStorage.setItem('sautifarm_user_profile', JSON.stringify(updated));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-stone-200 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center font-black text-sm">
            🌾
          </div>
          <div>
            <h3 className="text-base font-extrabold text-stone-900">
              {step === 'profile' ? 'Wasifu wa Mkulima / Farmer Profile' : t.auth.loginTitle}
            </h3>
            <p className="text-xs text-stone-500">
              SautiFarm Kenya • Huduma Salama ya Kilimo
            </p>
          </div>
        </div>

        {step === 'phone' && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <p className="text-xs text-stone-600 leading-relaxed">
              Weka nambari yako ya simu ya Safaricom au Airtel ili upate ushauri uliolengwa shambani mwako na arifa za bei.
            </p>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {t.auth.enterPhone}
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="0712 345 678"
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl outline-none focus:ring-2 focus:ring-emerald-600 font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 transition shadow-md"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>{t.auth.sendOtp}</span>}
            </button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-800 flex items-center justify-between">
              <span>Msimbo wa majaribio wa OTP: <strong>4829</strong></span>
              <button
                type="button"
                onClick={() => setOtpCode('4829')}
                className="text-emerald-900 font-bold underline"
              >
                Jaza Haraka
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {t.auth.enterOtp}
              </label>
              <input
                type="text"
                maxLength={6}
                required
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="4829"
                className="w-full text-center text-xl tracking-widest bg-stone-50 border border-stone-300 rounded-xl py-2 font-mono outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 transition shadow-md"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>{t.auth.verifyOtp}</span>}
            </button>
          </form>
        )}

        {step === 'profile' && (
          <form onSubmit={handleSaveProfile} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-0.5">Jina Kamili (Full Name):</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 text-xs bg-stone-50 border border-stone-300 rounded-xl outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-0.5">Kaunti (County):</label>
                <select
                  value={county}
                  onChange={(e) => setCounty(e.target.value)}
                  className="w-full p-2 text-xs bg-stone-50 border border-stone-300 rounded-xl outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  {KENYA_COUNTIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-0.5">Ukubwa wa Shamba (Acres):</label>
                <input
                  type="number"
                  step="0.5"
                  min="0.5"
                  value={farmSize}
                  onChange={(e) => setFarmSize(Number(e.target.value))}
                  className="w-full p-2 text-xs bg-stone-50 border border-stone-300 rounded-xl outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-0.5">Mazao Makuu (Primary Crops):</label>
              <input
                type="text"
                value={primaryCrops}
                onChange={(e) => setPrimaryCrops(e.target.value)}
                placeholder="Mahindi, Nyanya, Viazi..."
                className="w-full p-2 text-xs bg-stone-50 border border-stone-300 rounded-xl outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-0.5">Lugha Unayopendelea (Language):</label>
              <select
                value={currentLanguage}
                onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                className="w-full p-2 text-xs bg-stone-50 border border-stone-300 rounded-xl outline-none focus:ring-2 focus:ring-emerald-600"
              >
                {SUPPORTED_LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.flagEmoji} {l.nativeName} ({l.name})
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition shadow-md mt-2"
            >
              Hifadhi Wasifu (Save Profile)
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
