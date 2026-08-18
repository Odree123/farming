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
  Award,
  PlayCircle,
  Users,
  Calendar
} from 'lucide-react';
import { LanguageCode, FarmerProfile, CountyWeather } from '../types';
import { getTranslation } from '../data/translations';
import { COUNTY_WEATHERS, LIVE_MARKET_PRICES, FARMER_STORIES, CROP_CALENDAR, VIDEO_TUTORIALS, MARKET_STATS } from '../data/mockData';

interface HomeDashboardProps {
  setActiveTab: (tab: string) => void;
  currentLanguage: LanguageCode;
  farmer: FarmerProfile;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  setActiveTab,
  currentLanguage,
  farmer,
}) => {
  const t = getTranslation(currentLanguage);
  const [selectedCounty, setSelectedCounty] = useState<string>('Uasin Gishu (Eldoret)');

  const currentWeather: CountyWeather = COUNTY_WEATHERS.find(w => w.county === selectedCounty) || COUNTY_WEATHERS[0];
  const topPrices = LIVE_MARKET_PRICES.slice(0, 4);

  return (
    <div className="space-y-6 pb-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-saf-900 via-saf-800 to-stone-900 text-white p-6 sm:p-10 shadow-xl border border-saf-700/50">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-72 h-72 bg-saf-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-saf-700/60 border border-saf-500/40 px-3 py-1 rounded-full text-xs text-amber-300 font-semibold mb-5 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Kilimo Smart Engine • Kenya</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.1] mb-4">
            {t.home.heroTitle}
          </h1>

          <p className="text-sm sm:text-base text-saf-100/90 mb-8 leading-relaxed max-w-2xl">
            {t.home.heroSubtitle}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => setActiveTab('chat')}
              className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-3.5 px-5 rounded-xl shadow-lg transition duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageSquareText className="w-5 h-5" />
              <span>{t.home.askAiBtn}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => setActiveTab('disease')}
              className="flex items-center justify-center gap-2 bg-saf-700/90 hover:bg-saf-600 border border-saf-500/40 text-white font-semibold py-3.5 px-5 rounded-xl transition hover:scale-[1.02] active:scale-[0.98]"
            >
              <ScanLine className="w-5 h-5 text-amber-300" />
              <span>{t.home.scanDiseaseBtn}</span>
            </button>
          </div>
        </div>
      </div>

     

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200/80 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CloudRain className="w-5 h-5 text-saf-600" />
              <h2 className="text-sm font-bold text-stone-900">{t.home.weatherTitle}</h2>
            </div>
            <select
              value={selectedCounty}
              onChange={(e) => setSelectedCounty(e.target.value)}
              className="text-xs bg-stone-100 border border-stone-300 rounded-lg px-2.5 py-1.5 text-stone-800 font-medium focus:ring-2 focus:ring-saf-500 outline-none"
            >
              {COUNTY_WEATHERS.map((w) => (
                <option key={w.county} value={w.county}>
                  {w.county}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-gradient-to-br from-saf-50 to-teal-50 rounded-xl p-4 border border-saf-100 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1 text-xs text-saf-800 font-medium mb-1">
                <MapPin className="w-3.5 h-3.5 text-saf-600" />
                <span>{currentWeather.county}</span>
              </div>
              <div className="text-3xl font-black text-stone-900">
                {currentWeather.temperatureC}°C
              </div>
              <div className="text-xs text-stone-600 font-medium mt-0.5">
                {currentWeather.condition}
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-1 text-xs bg-sky-100 text-sky-800 font-semibold px-2 py-0.5 rounded-full mb-1">
                <CloudRain className="w-3 h-3" />
                <span>{currentWeather.rainfallProbability}% Mvua</span>
              </div>
              <div className="text-[11px] text-stone-500">
                Unyevunyevu: {currentWeather.humidity}%
              </div>
            </div>
          </div>

          <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 text-xs text-amber-900">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Ushauri wa Mvua & Shamba: </span>
                <span>{currentWeather.advisory}</span>
              </div>
            </div>
          </div>

          <div>
            <div className="text-[11px] font-bold uppercase text-stone-400 tracking-wider mb-2">
              Utabiri wa Siku 5 (5-Day Outlook)
            </div>
            <div className="grid grid-cols-5 gap-1.5 text-center">
              {currentWeather.forecast.map((f, i) => (
                <div key={i} className="bg-stone-50 rounded-lg p-1.5 border border-stone-100">
                  <div className="text-[10px] font-bold text-stone-500">{f.day}</div>
                  <div className="text-xs font-bold text-stone-800 my-0.5">{f.temp}°</div>
                  <div className="text-[10px] text-sky-600 font-medium">{f.rainProb}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200/80 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-saf-600" />
              <h2 className="text-sm font-bold text-stone-900">{t.home.todayPricesTitle}</h2>
            </div>
            <button
              onClick={() => setActiveTab('prices')}
              className="text-xs text-saf-700 hover:text-saf-800 font-semibold flex items-center gap-1"
            >
              <span>{t.home.viewPricesBtn}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="divide-y divide-stone-100">
            {topPrices.map((price) => (
              <div key={price.id} className="py-3 flex items-center justify-between hover:bg-stone-50/80 px-2 rounded-lg transition">
                <div>
                  <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                    <span>{price.commodity}</span>
                    <span className="text-[10px] text-stone-500 font-normal">({price.unit})</span>
                  </div>
                  <div className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-stone-400" />
                    <span>{price.marketName}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-black text-stone-900 font-mono">
                    KES {price.wholesalePriceKES.toLocaleString()}
                  </div>
                  <div className="flex items-center justify-end gap-1 mt-0.5">
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

          <div className="bg-saf-50 rounded-xl p-3.5 border border-saf-200/80 text-xs">
            <div className="flex items-center gap-2 text-saf-900 font-bold mb-1">
              <Wheat className="w-4 h-4 text-saf-700" />
              <span>{t.home.marketArbitrageTitle}</span>
            </div>
            <p className="text-saf-800 text-[11px] leading-relaxed">
              <strong>Fursa ya Leo:</strong> Gunia la Mahindi Makavu (90kg) linauzwa <strong>KES 3,400</strong> Eldoret lakini linafikia <strong>KES 4,450</strong> Kongowea Mombasa (+KES 1,050 faida kwa gunia).
            </p>
          </div>
        </div>
      </div>

      <div className="bg-stone-100 rounded-2xl p-4 sm:p-5 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-saf-600 text-white flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-stone-900">Ushirikiano wa Kisayansi na Taasisi za Kilimo</div>
            <p className="text-[11px] text-stone-500">
              Miongozo inazingatia viwango vya KALRO, KEPHIS, PCPB, na Wizara ya Kilimo na Mifugo Kenya.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0 font-medium">
          <span className="flex items-center text-saf-700">
            <CheckCircle2 className="w-4 h-4 mr-1 text-saf-600" /> Mbegu Halisi
          </span>
          <span className="flex items-center text-saf-700">
            <CheckCircle2 className="w-4 h-4 mr-1 text-saf-600" /> Lugha za Kienyeji
          </span>
          <span className="flex items-center text-saf-700">
            <CheckCircle2 className="w-4 h-4 mr-1 text-saf-600" /> M-Pesa Salama
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-200/80 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-saf-600" />
            <h2 className="text-sm font-bold text-stone-900">{t.home.storiesTitle}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FARMER_STORIES.map((story) => (
              <div key={story.id} className="bg-stone-50 rounded-xl p-4 border border-stone-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center font-bold text-xs">
                    {story.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900">{story.name}</div>
                    <div className="text-[10px] text-stone-500">{story.location}</div>
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">{story.story}</p>
                <div className="mt-2 text-[10px] font-semibold text-saf-700">{story.result}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-saf-600" />
            <h2 className="text-sm font-bold text-stone-900">{t.home.cropCalendarTitle}</h2>
          </div>
          <div className="space-y-3">
            {CROP_CALENDAR.map((item) => (
              <div key={item.month} className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-saf-50 border border-saf-200 flex flex-col items-center justify-center shrink-0">
                  <div className="text-[10px] font-bold text-saf-700 uppercase">{item.month}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">{item.activity}</div>
                  <div className="text-[11px] text-stone-500">{item.crops}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <PlayCircle className="w-5 h-5 text-saf-600" />
          <h2 className="text-sm font-bold text-stone-900">{t.home.videoTutorialsTitle}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {VIDEO_TUTORIALS.map((video) => (
            <div key={video.id} className="bg-stone-50 rounded-xl p-4 border border-stone-200">
              <div className="aspect-video bg-stone-200 rounded-lg mb-3 flex items-center justify-center">
                <PlayCircle className="w-10 h-10 text-saf-600" />
              </div>
              <div className="text-xs font-bold text-stone-900">{video.title}</div>
              <div className="text-[11px] text-stone-500">{video.duration} • {video.views} views</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
