'use client';

import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  MapPin,
  Bell,
  Calculator,
  Wheat,
  ArrowRight,
  ArrowUpDown,
  Check,
  AlertCircle,
  Truck
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useLanguage } from '@/app/context/LanguageContext';
import { getTranslation } from '@/src/data/translations';
import { LIVE_MARKET_PRICES } from '@/src/data/mockData';

export const MarketPrices: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const t = getTranslation(currentLanguage);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedMarket, setSelectedMarket] = useState<string>('All');
  const [alertPhone, setAlertPhone] = useState('');
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);

  const [originMarket, setOriginMarket] = useState('Eldoret Central Depot');
  const [destMarket, setDestMarket] = useState('Kongowea Wholesale Market');
  const [commodityForArbitrage, setCommodityForArbitrage] = useState('Dry Maize (Mahindi Makavu)');
  const [bagsCount, setBagsCount] = useState<number>(50);

  const categories = ['All', 'Cereals & Grains', 'Vegetables', 'Legumes', 'Roots & Tubers', 'Livestock & Poultry'];
  const markets = [
    'All',
    'Wakulima Market (Marikiti)',
    'Kongowea Wholesale Market',
    'Eldoret Central Depot',
    'Nakuru Top Market',
    'Kibuye Market',
    'Machakos Open Air Market',
    'City Market Nairobi',
  ];

  const trendData = [
    { day: 'Mon', MaizeEldoret: 3600, MaizeNairobi: 4100, MaizeMombasa: 4300, TomatoNairobi: 5200 },
    { day: 'Tue', MaizeEldoret: 3550, MaizeNairobi: 4150, MaizeMombasa: 4350, TomatoNairobi: 5400 },
    { day: 'Wed', MaizeEldoret: 3500, MaizeNairobi: 4180, MaizeMombasa: 4400, TomatoNairobi: 5600 },
    { day: 'Thu', MaizeEldoret: 3450, MaizeNairobi: 4200, MaizeMombasa: 4420, TomatoNairobi: 5700 },
    { day: 'Fri', MaizeEldoret: 3400, MaizeNairobi: 4200, MaizeMombasa: 4450, TomatoNairobi: 5800 },
  ];

  const filteredPrices = useMemo(() => {
    return LIVE_MARKET_PRICES.filter((item) => {
      const matchSearch = item.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.county.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchMarket = selectedMarket === 'All' || item.marketName.includes(selectedMarket);
      return matchSearch && matchCategory && matchMarket;
    });
  }, [searchTerm, selectedCategory, selectedMarket]);

  const originPriceObj = LIVE_MARKET_PRICES.find(p => p.commodity.includes(commodityForArbitrage) && p.marketName.includes(originMarket)) || LIVE_MARKET_PRICES[0];
  const destPriceObj = LIVE_MARKET_PRICES.find(p => p.commodity.includes(commodityForArbitrage) && p.marketName.includes(destMarket)) || LIVE_MARKET_PRICES[2];

  const buyTotal = originPriceObj.wholesalePriceKES * bagsCount;
  const sellTotal = destPriceObj.wholesalePriceKES * bagsCount;
  const estimatedTransport = bagsCount * 450;
  const netProfit = sellTotal - buyTotal - estimatedTransport;

  const handleSetAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (alertPhone) {
      setAlertSuccess(true);
      setTimeout(() => {
        setAlertSuccess(false);
        setShowAlertModal(false);
      }, 2500);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-xs font-semibold mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Kenya Agricultural Market Information System (KAMIS)</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
            {t.prices.title}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">
            {t.prices.subtitle}
          </p>
        </div>

        <button
          onClick={() => setShowAlertModal(true)}
          className="inline-flex items-center gap-2 bg-saf-800 hover:bg-saf-700 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow transition"
        >
          <Bell className="w-4 h-4 text-amber-300" />
          <span>{t.prices.priceAlert}</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-stone-900">Mwenendo wa Bei za Wiki Hii (5-Day Trend - KES)</h2>
            <p className="text-xs text-stone-500">Kulinganisha bei ya Mahindi (Eldoret vs Nairobi vs Mombasa) & Nyanya</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center text-saf-700 font-medium">
              <span className="w-2.5 h-2.5 bg-saf-600 rounded-full mr-1"></span> Mombasa
            </span>
            <span className="flex items-center text-sky-700 font-medium">
              <span className="w-2.5 h-2.5 bg-sky-600 rounded-full mr-1"></span> Nairobi
            </span>
            <span className="flex items-center text-amber-700 font-medium">
              <span className="w-2.5 h-2.5 bg-amber-600 rounded-full mr-1"></span> Eldoret
            </span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorMombasa" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorNairobi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#78716c' }} />
              <YAxis tick={{ fontSize: 11, fill: '#78716c' }} domain={['dataMin - 200', 'dataMax + 200']} />
              <Tooltip
                formatter={(value: any) => [`KES ${Number(value).toLocaleString()}`, '']}
                contentStyle={{ backgroundColor: '#1c1917', color: '#fff', borderRadius: '8px', fontSize: '12px', border: 'none' }}
              />
              <Area type="monotone" dataKey="MaizeMombasa" stroke="#16a34a" strokeWidth={2} fillOpacity={1} fill="url(#colorMombasa)" />
              <Area type="monotone" dataKey="MaizeNairobi" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorNairobi)" />
              <Area type="monotone" dataKey="MaizeEldoret" stroke="#ca8a04" strokeWidth={2} fillOpacity={0} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tafuta zao (mf. Mahindi, Nyanya, Viazi)..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-xl outline-none focus:ring-2 focus:ring-saf-600 focus:bg-white transition"
            />
          </div>

          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-2 px-3 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-xl outline-none focus:ring-2 focus:ring-saf-600"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c === 'All' ? t.prices.allCrops : c}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedMarket}
              onChange={(e) => setSelectedMarket(e.target.value)}
              className="w-full py-2 px-3 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-xl outline-none focus:ring-2 focus:ring-saf-600"
            >
              {markets.map((m) => (
                <option key={m} value={m}>{m === 'All' ? t.prices.allMarkets : m}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-100/80 text-stone-600 uppercase text-[10px] tracking-wider border-b border-stone-200">
                <tr>
                  <th className="py-3 px-3 sm:px-4 font-semibold">Zao / Commodity</th>
                  <th className="py-3 px-3 sm:px-4 font-semibold">Kipimo / Unit</th>
                  <th className="py-3 px-3 sm:px-4 font-semibold">Soko / Market</th>
                  <th className="py-3 px-3 sm:px-4 text-right font-semibold">Bei ya Jumla (Wholesale)</th>
                  <th className="py-3 px-3 sm:px-4 text-right font-semibold">Rejareja (Retail)</th>
                  <th className="py-3 px-3 sm:px-4 text-center font-semibold">Mabadiliko (24h)</th>
                  <th className="py-3 px-3 sm:px-4 font-semibold">Hali ya Ugavi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredPrices.map((p) => (
                  <tr key={p.id} className="hover:bg-stone-50 transition">
                    <td className="py-3 px-3 sm:px-4 font-bold text-stone-900">
                      <div>{p.commodity}</div>
                      <div className="text-[10px] text-stone-500 font-normal">{p.category}</div>
                    </td>
                    <td className="py-3 px-3 sm:px-4 text-stone-600 font-medium">{p.unit}</td>
                    <td className="py-3 px-3 sm:px-4 text-stone-700">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
                        <span>{p.marketName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 sm:px-4 text-right font-black text-stone-900 font-mono">
                      KES {p.wholesalePriceKES.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 sm:px-4 text-right text-stone-600 font-mono">
                      KES {p.retailPriceKES.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 sm:px-4 text-center">
                      {p.changePercentage > 0 ? (
                        <span className="inline-flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          <TrendingUp className="w-3 h-3 mr-0.5" /> +{p.changePercentage}%
                        </span>
                      ) : p.changePercentage < 0 ? (
                        <span className="inline-flex items-center text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
                          <TrendingDown className="w-3 h-3 mr-0.5" /> {p.changePercentage}%
                        </span>
                      ) : (
                        <span className="text-xs text-stone-400">0.0%</span>
                      )}
                    </td>
                    <td className="py-3 px-3 sm:px-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        p.supplyStatus === 'Scarce'
                          ? 'bg-rose-100 text-rose-800'
                          : p.supplyStatus === 'Abundant'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-sky-100 text-sky-800'
                      }`}>
                        {p.supplyStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-stone-900 to-saf-950 text-white rounded-2xl p-6 border border-saf-800/80 shadow-lg space-y-4">
        <div className="flex items-center gap-2 text-amber-400">
          <Calculator className="w-5 h-5" />
          <h2 className="text-sm font-bold uppercase tracking-wider">
            Kikokotoo cha Faida ya Usafirishaji (Arbitrage Profit Calculator)
          </h2>
        </div>

        <p className="text-xs text-stone-300 max-w-2xl leading-relaxed">
          Linganisha faida ya kuuza mazao katika soko lingine lenye bei kubwa (ukiondoa gharama ya lori/matatu ya usafirishaji).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-stone-900 text-xs">
          <div>
            <label className="block text-stone-300 font-semibold mb-1">Soko la Asili (Origin):</label>
            <select
              value={originMarket}
              onChange={(e) => setOriginMarket(e.target.value)}
              className="w-full bg-white rounded-xl p-2.5 font-medium outline-none"
            >
              <option value="Eldoret Central Depot">Eldoret Central Depot</option>
              <option value="Nakuru Top Market">Nakuru Top Market</option>
              <option value="Machakos Open Air Market">Machakos Market</option>
            </select>
          </div>

          <div>
            <label className="block text-stone-300 font-semibold mb-1">Soko la Uuzaji (Destination):</label>
            <select
              value={destMarket}
              onChange={(e) => setDestMarket(e.target.value)}
              className="w-full bg-white rounded-xl p-2.5 font-medium outline-none"
            >
              <option value="Kongowea Wholesale Market">Kongowea (Mombasa)</option>
              <option value="Wakulima Market (Marikiti)">Wakulima (Nairobi)</option>
              <option value="Kibuye Market">Kibuye (Kisumu)</option>
            </select>
          </div>

          <div>
            <label className="block text-stone-300 font-semibold mb-1">Idadi ya Magunia (Bags):</label>
            <input
              type="number"
              min="1"
              value={bagsCount}
              onChange={(e) => setBagsCount(Number(e.target.value))}
              className="w-full bg-white rounded-xl p-2.5 font-medium outline-none"
            />
          </div>

          <div className="bg-saf-800/60 border border-saf-600 rounded-xl p-2.5 flex flex-col justify-center text-white">
            <span className="text-[10px] text-saf-200 uppercase font-semibold">Faida Halisi (Net Profit):</span>
            <span className="text-lg font-black text-amber-300 font-mono">
              KES {netProfit.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="text-[11px] text-stone-400 flex items-center gap-2 pt-1">
          <Truck className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            Gharama ya Usafiri: KES {estimatedTransport.toLocaleString()} (KES 450/gunia) • Bei ya Asili: KES {originPriceObj.wholesalePriceKES}/gunia • Bei ya Soko Lengwa: KES {destPriceObj.wholesalePriceKES}/gunia
          </span>
        </div>
      </div>

      {showAlertModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-saf-900">
                <Bell className="w-5 h-5 text-saf-700" />
                <h3 className="font-black text-sm sm:text-base">Weka Ilani ya Bei (SMS Alert)</h3>
              </div>
              <button
                onClick={() => setShowAlertModal(false)}
                className="text-stone-400 hover:text-stone-600"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-stone-600">
              Pata ujumbe mfupi wa SMS kila asubuhi saa 12:00 asubuhi kuhusu bei mpya za masoko ya Wakulima na Kongowea.
            </p>

            <form onSubmit={handleSetAlert} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Nambari ya Simu (Safaricom/Airtel):</label>
                <input
                  type="tel"
                  required
                  value={alertPhone}
                  onChange={(e) => setAlertPhone(e.target.value)}
                  placeholder="0712 345 678"
                  className="w-full p-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl outline-none focus:ring-2 focus:ring-saf-600"
                />
              </div>

              {alertSuccess && (
                <div className="p-3 bg-saf-50 border border-saf-200 text-saf-800 text-xs rounded-xl flex items-center gap-2">
                  <Check className="w-4 h-4 text-saf-600 shrink-0" />
                  <span>Umefanikiwa kujiunga na huduma ya SMS Price Alert!</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-saf-800 hover:bg-saf-700 text-white font-bold py-2.5 rounded-xl text-xs transition"
              >
                Jiunge na Huduma ya SMS
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
