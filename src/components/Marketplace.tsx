import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Star, 
  ShieldCheck, 
  Check, 
  MapPin, 
  Phone, 
  Sparkles,
  Tag,
  AlertCircle
} from 'lucide-react';
import { LanguageCode, ProductItem } from '../types';
import { getTranslation } from '../data/translations';
import { MARKETPLACE_PRODUCTS } from '../data/mockData';

interface MarketplaceProps {
  currentLanguage: LanguageCode;
  onSelectProduct: (product: ProductItem) => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({
  currentLanguage,
  onSelectProduct,
}) => {
  const t = getTranslation(currentLanguage);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Seeds',
    'Fertilizers',
    'Crop Protection',
    'Tools & Irrigation',
  ];

  const filteredProducts = useMemo(() => {
    return MARKETPLACE_PRODUCTS.filter((item) => {
      const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-saf-100 text-saf-800 px-3 py-1 rounded-full text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>KEPHIS, KALRO & PCPB Certified Agrovets</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
            {t.marketplace.title}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">
            {t.marketplace.subtitle}
          </p>
        </div>

        <div className="text-xs text-stone-500">
          {filteredProducts.length} products found
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.marketplace.searchPlaceholder}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-xl outline-none focus:ring-2 focus:ring-saf-600 focus:bg-white transition"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-saf-800 text-white shadow-sm'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {cat === 'All' ? t.marketplace.allCategories : cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => onSelectProduct(product)}
            className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-md hover:border-saf-500/80 transition duration-200 flex flex-col cursor-pointer"
          >
            <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2.5 left-2.5">
                <span className="bg-saf-900/90 backdrop-blur-sm text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-saf-400" />
                  <span>{product.category}</span>
                </span>
              </div>
              <div className="absolute top-2.5 right-2.5">
                <span className="bg-stone-900/80 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded-md">
                  {product.packageSize}
                </span>
              </div>
            </div>

            <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
                  <span className="font-semibold text-saf-800">{product.brand}</span>
                  <span className="flex items-center text-amber-600 font-bold">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
                    {product.rating} ({product.reviewsCount})
                  </span>
                </div>

                <h3 className="text-sm font-bold text-stone-900 line-clamp-2 leading-snug">
                  {product.name}
                </h3>

                <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-100 space-y-1 text-[11px] text-stone-500">
                <div className="flex items-center gap-1 text-saf-900 font-medium">
                  <Check className="w-3 h-3 text-saf-600 shrink-0" />
                  <span className="truncate">{product.certifyingBody}</span>
                </div>
                <div className="flex items-center gap-1 text-stone-600">
                  <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                  <span className="truncate">{product.seller.name} ({product.seller.county})</span>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <div className="text-base font-black text-stone-900 font-mono">
                    KES {product.priceKES.toLocaleString()}
                  </div>
                  {product.originalPriceKES && (
                    <div className="text-[10px] text-stone-400 line-through">
                      KES {product.originalPriceKES.toLocaleString()}
                    </div>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectProduct(product);
                  }}
                  className="px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-sm bg-saf-800 hover:bg-saf-700 text-white"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{t.marketplace.viewDetails}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
