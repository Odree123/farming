'use client';

import React from 'react';
import { X, Phone, MessageCircle, MapPin, Star, ShieldCheck, ExternalLink } from 'lucide-react';
import { ProductItem } from '@/src/types';
import { useLanguage } from '@/app/context/LanguageContext';
import { getTranslation } from '@/src/data/translations';

interface ProductModalProps {
  product: ProductItem;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
}) => {
  const { currentLanguage } = useLanguage();
  const t = getTranslation(currentLanguage);

  const waLink = `https://wa.me/${product.seller.phone.replace(/\s/g, '')}?text=${encodeURIComponent(`Hi ${product.seller.name}, I'm interested in ${product.name} from SautiFarm.`)}`;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden">
        <div className="relative aspect-[16/9] bg-stone-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-stone-900/50 hover:bg-stone-900/70 text-white backdrop-blur-sm transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute top-4 left-4">
            <span className="bg-saf-900/90 backdrop-blur-sm text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-saf-400" />
              <span>{product.category}</span>
            </span>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
              <span className="font-semibold text-saf-800">{product.brand}</span>
              <span className="flex items-center text-amber-600 font-bold">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
                {product.rating} ({product.reviewsCount})
              </span>
            </div>
            <h2 className="text-lg font-black text-stone-900 leading-snug">
              {product.name}
            </h2>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex items-baseline gap-2">
            <div className="text-xl font-black text-stone-900 font-mono">
              KES {product.priceKES.toLocaleString()}
            </div>
            {product.originalPriceKES && (
              <div className="text-xs text-stone-400 line-through">
                KES {product.originalPriceKES.toLocaleString()}
              </div>
            )}
            <div className="text-[10px] text-stone-500">
              {product.packageSize}
            </div>
          </div>

          <div className="bg-stone-50 rounded-xl p-3 border border-stone-200 space-y-1.5 text-xs">
            <div className="flex items-start gap-2 text-stone-700">
              <ShieldCheck className="w-3.5 h-3.5 text-saf-600 shrink-0 mt-0.5" />
              <span>{product.certifyingBody}</span>
            </div>
            <div className="flex items-center gap-2 text-stone-600">
              <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span>{product.seller.name} — {product.seller.location}, {product.seller.county}</span>
            </div>
            <div className="flex items-center gap-2 text-stone-600">
              <Phone className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span>{product.seller.phone}</span>
            </div>
            <div className="text-[11px] text-stone-500">
              <span className="font-semibold">Suitable crops:</span> {product.suitableCrops.join(', ')}
            </div>
            <div className="text-[11px] text-stone-500">
              <span className="font-semibold">Application rate:</span> {product.applicationRate}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 rounded-xl text-sm transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.marketplace.whatsappSeller}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href={`tel:${product.seller.phone.replace(/\s/g, '')}`}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-saf-800 hover:bg-saf-700 text-white font-bold py-3 rounded-xl text-sm transition"
            >
              <Phone className="w-4 h-4" />
              <span>{t.marketplace.callSeller}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
