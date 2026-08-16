import React, { useState } from 'react';
import { 
  MessageSquareText, 
  ScanLine, 
  TrendingUp, 
  ShoppingBag, 
  PhoneCall, 
  CloudRain, 
  Sun, 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  Sparkles, 
  TrendingDown, 
  Wheat, 
  Clock,
  HelpCircle,
  Award
} from 'lucide-react';
import { LanguageCode, FarmerProfile, CountyWeather } from '../types';
import { getTranslation } from '../data/translations';
import { COUNTY_WEATHERS, LIVE_MARKET_PRICES } from '../data/mockData';

interface HomeDashboardProps {
  setActiveTab: (tab: string) => void;
  currentLanguage: LanguageCode;
  farmer: FarmerProfile;
  openUSSD: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  setActiveTab,
  currentLanguage,
  farmer,
  openUSSD,
}) => {
  const t = getTranslation(currentLanguage);
  const [selectedCounty, setSelectedCounty] = useState<string>('Uasin Gishu (Eldoret)');

  const currentWeather: CountyWeather = COUNTY_WEATHERS.find(w => w.county === selectedCounty) || COUNTY_WEATHERS[0];
  const topPrices = LIVE_MARKET_PRICES.slice(0, 4);

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-stone-900 text-white p-6 sm:p-10 shadow-xl border border-emerald-700/50">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-emerald-700/60 border border-emerald-500/40 px-3 py-1 rounded-full text-xs text-amber-300 font-medium mb-4 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Kilimo Smart Engine • Kenya</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight mb-3">
            {t.home.heroTitle}
          </h1>

          <p className="text-sm sm:text-base text-emerald-100/90 mb-6 leading-relaxed">
            {t.home.heroSubtitle}
          </p>

          {/* Core Action CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              id="cta-ask-ai"
              onClick={() => setActiveTab('chat')}
              className="flex items-center justify-center space-x-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-3.5 px-5 rounded-xl shadow-lg transition duration-200 hover:scale-[1.02]"
            >
              <MessageSquareText className="w-5 h-5 text-stone-900" />
              <span>{t.home.askAiBtn}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              id="cta-scan-disease"
              onClick={() => setActiveTab('disease')}
              className="flex items-center justify-center space-x-2 bg-emerald-700/90 hover:bg-emerald-600 border border-emerald-500/40 text-white font-semibold py-3.5 px-5 rounded-xl transition hover:scale-[1.02]"
            >
              <ScanLine className="w-5 h-5 text-amber-300" />
              <span>{t.home.scanDiseaseBtn}</span>
            </button>
          </div>

          {/* Quick USSD bar for feature phones */}
          <div className="mt-6 pt-4 border-t border-emerald-700/50 flex flex-wrap items-center justify-between gap-3 text-xs text-emerald-200">
            <div className="flex items-center space-x-2">
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>{t.home.quickDialUssd}</span>
            </div>
            <button
              onClick={openUSSD}
              className="bg-emerald-950/80 hover:bg-emerald-950 border border-amber-400/40 text-amber-300 px-3 py-1 rounded-lg font-mono font-bold transition"
            >
              Jaribu USSD Simulator 📱
            </button>
          </div>
        </div>
      </div>

      {/* Grid of 4 Feature Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          onClick={() => setActiveTab('chat')}
          className="group cursor-pointer bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/80 hover:border-emerald-500 shadow-sm hover:shadow-md transition duration-200"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3 group-hover:scale-110 transition">
            <MessageSquareText className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-stone-900 mb-1">{t.nav.chat}</h3>
          <p className="text-xs text-stone-500 line-clamp-2">
            Ongea na Bwana Shamba kwa sauti au maandishi ya Kiswahili & lugha 6+ za kienyeji.
          </p>
        </div>

        <div
          onClick={() => setActiveTab('disease')}
          className="group cursor-pointer bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/80 hover:border-emerald-500 shadow-sm hover:shadow-md transition duration-200"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3 group-hover:scale-110 transition">
            <ScanLine className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-stone-900 mb-1">{t.nav.disease}</h3>
          <p className="text-xs text-stone-500 line-clamp-2">
            Piga picha ya jani lililoathirika. AI inakagua ugonjwa na kupendekeza dawa sahihi.
          </p>
        </div>

        <div
          onClick={() => setActiveTab('prices')}
          className="group cursor-pointer bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/80 hover:border-emerald-500 shadow-sm hover:shadow-md transition duration-200"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mb-3 group-hover:scale-110 transition">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-stone-900 mb-1">{t.nav.prices}</h3>
          <p className="text-xs text-stone-500 line-clamp-2">
            Bei za leo masoko ya Wakulima, Kongowea, Eldoret na Kisumu kwa mazao yote.
          </p>
        </div>

        <div
          onClick={() => setActiveTab('marketplace')}
          className="group cursor-pointer bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/80 hover:border-emerald-500 shadow-sm hover:shadow-md transition duration-200"
        >
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center mb-3 group-hover:scale-110 transition">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-stone-900 mb-1">{t.nav.marketplace}</h3>
          <p className="text-xs text-stone-500 line-clamp-2">
            Mbegu zilizoidhinishwa na KEPHIS, mbolea, na madawa kwa bei nafuu na M-Pesa.
          </p>
        </div>
      </div>

      {/* Two Column Layout: Weather Advisory + Live Prices Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weather & Agronomy Advisory (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200/80 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CloudRain className="w-5 h-5 text-emerald-600" />
              <h2 className="text-sm font-bold text-stone-900">{t.home.weatherTitle}</h2>
            </div>
            <select
              value={selectedCounty}
              onChange={(e) => setSelectedCounty(e.target.value)}
              className="text-xs bg-stone-100 border border-stone-300 rounded-lg px-2.5 py-1 text-stone-800 font-medium focus:ring-1 focus:ring-emerald-500 outline-none"
            >
              {COUNTY_WEATHERS.map((w) => (
                <option key={w.county} value={w.county}>
                  {w.county}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100 flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-1 text-xs text-emerald-800 font-medium mb-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>{currentWeather.county}</span>
              </div>
              <div className="text-3xl font-extrabold text-stone-900">
                {currentWeather.temperatureC}°C
              </div>
              <div className="text-xs text-stone-600 font-medium mt-0.5">
                {currentWeather.condition}
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center space-x-1 text-xs bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded-full mb-1">
                <CloudRain className="w-3 h-3" />
                <span>{currentWeather.rainfallProbability}% Mvua</span>
              </div>
              <div className="text-[11px] text-stone-500">
                Unyevunyevu: {currentWeather.humidity}%
              </div>
            </div>
          </div>

          {/* Agricultural Advisory Note */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 text-xs text-amber-900">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Ushauri wa Mvua & Shamba: </span>
                <span>{currentWeather.advisory}</span>
              </div>
            </div>
          </div>

          {/* 5-Day Micro Forecast */}
          <div>
            <div className="text-[11px] font-semibold uppercase text-stone-400 tracking-wider mb-2">
              Utabiri wa Siku 5 (5-Day Outlook)
            </div>
            <div className="grid grid-cols-5 gap-1.5 text-center">
              {currentWeather.forecast.map((f, i) => (
                <div key={i} className="bg-stone-50 rounded-lg p-1.5 border border-stone-100">
                  <div className="text-[10px] font-semibold text-stone-500">{f.day}</div>
                  <div className="text-xs font-bold text-stone-800 my-0.5">{f.temp}°</div>
                  <div className="text-[10px] text-blue-600 font-medium">{f.rainProb}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Market Prices Snapshot (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200/80 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <h2 className="text-sm font-bold text-stone-900">{t.home.todayPricesTitle}</h2>
            </div>
            <button
              onClick={() => setActiveTab('prices')}
              className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center space-x-1"
            >
              <span>{t.home.viewPricesBtn}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Quick Price List */}
          <div className="divide-y divide-stone-100">
            {topPrices.map((price) => (
              <div key={price.id} className="py-3 flex items-center justify-between hover:bg-stone-50/80 px-2 rounded-lg transition">
                <div>
                  <div className="text-xs font-bold text-stone-900 flex items-center space-x-1.5">
                    <span>{price.commodity}</span>
                    <span className="text-[10px] text-stone-500 font-normal">({price.unit})</span>
                  </div>
                  <div className="text-[11px] text-stone-500 flex items-center space-x-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-stone-400" />
                    <span>{price.marketName}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-extrabold text-stone-900 font-mono">
                    KES {price.wholesalePriceKES.toLocaleString()}
                  </div>
                  <div className="flex items-center justify-end space-x-1 mt-0.5">
                    {price.changePercentage > 0 ? (
                      <span className="text-[10px] font-semibold text-emerald-600 flex items-center">
                        <TrendingUp className="w-3 h-3 mr-0.5" />
                        +{price.changePercentage}%
                      </span>
                    ) : price.changePercentage < 0 ? (
                      <span className="text-[10px] font-semibold text-rose-600 flex items-center">
                        <TrendingDown className="w-3 h-3 mr-0.5" />
                        {price.changePercentage}%
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-stone-500">0.0%</span>
                    )}
                    <span className="text-[10px] text-stone-400">• Rejareja: KES {price.retailPriceKES.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Arbitrage Opportunity Highlight */}
          <div className="bg-emerald-50 rounded-xl p-3.5 border border-emerald-200/80 text-xs">
            <div className="flex items-center space-x-2 text-emerald-900 font-bold mb-1">
              <Wheat className="w-4 h-4 text-emerald-700" />
              <span>{t.home.marketArbitrageTitle}</span>
            </div>
            <p className="text-emerald-800 text-[11px] leading-relaxed">
              💡 <strong>Fursa ya Leo:</strong> Gunia la Mahindi Makavu (90kg) linauzwa <strong>KES 3,400</strong> Eldoret lakini linafikia <strong>KES 4,450</strong> Kongowea Mombasa (+KES 1,050 faida kwa gunia).
            </p>
          </div>
        </div>
      </div>

      {/* Trust & Compliance Banner */}
      <div className="bg-stone-100 rounded-2xl p-4 sm:p-5 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-stone-900">Ushirikiano wa Kisayansi na Taasisi za Kilimo</div>
            <p className="text-[11px] text-stone-500">
              Miongozo inazingatia viwango vya KALRO, KEPHIS, PCPB, na Wizara ya Kilimo na Mifugo Kenya.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4 shrink-0 font-medium">
          <span className="flex items-center text-emerald-700">
            <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-600" /> Mbegu Halisi
          </span>
          <span className="flex items-center text-emerald-700">
            <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-600" /> Lugha za Kienyeji
          </span>
          <span className="flex items-center text-emerald-700">
            <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-600" /> M-Pesa Salama
          </span>
        </div>
      </div>
    </div>
  );
};
