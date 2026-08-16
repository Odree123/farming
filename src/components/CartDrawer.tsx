import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  CheckCircle2, 
  ShieldCheck, 
  Phone, 
  Loader2, 
  Sparkles,
  ArrowRight,
  Receipt
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, LanguageCode, FarmerProfile } from '../types';
import { getTranslation } from '../data/translations';
import { KENYA_COUNTIES } from '../data/mockData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateQuantity: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  currentLanguage: LanguageCode;
  farmer: FarmerProfile;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  updateQuantity,
  removeFromCart,
  clearCart,
  currentLanguage,
  farmer,
}) => {
  const t = getTranslation(currentLanguage);

  const [phone, setPhone] = useState(farmer.phone || '0712345678');
  const [selectedCounty, setSelectedCounty] = useState(farmer.county || 'Uasin Gishu (Eldoret)');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showStkPrompt, setShowStkPrompt] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [receipt, setReceipt] = useState<{
    transactionId: string;
    amount: number;
    phone: string;
    timestamp: string;
  } | null>(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.priceKES * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? (selectedCounty.includes('Nairobi') ? 250 : 400) : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsProcessing(true);

    try {
      const response = await fetch('/api/mpesa/stkpush', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          amount: grandTotal,
          items: cart,
        }),
      });

      if (!response.ok) throw new Error('STK push initiation failed');

      // Show the simulated Safaricom PIN modal
      setTimeout(() => {
        setIsProcessing(false);
        setShowStkPrompt(true);
      }, 1000);
    } catch (err) {
      console.warn('STK push error, showing direct simulation:', err);
      setIsProcessing(false);
      setShowStkPrompt(true);
    }
  };

  const confirmPinAndComplete = () => {
    setShowStkPrompt(false);
    const mockReceiptId = `SLK${Math.floor(100000 + Math.random() * 900000)}KES`;
    
    // Trigger confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // ignore
    }

    setReceipt({
      transactionId: mockReceiptId,
      amount: grandTotal,
      phone,
      timestamp: new Date().toLocaleString(),
    });

    clearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 sm:p-5 bg-emerald-900 text-white flex items-center justify-between border-b border-emerald-800">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold">{t.marketplace.cart}</h2>
              <span className="text-xs bg-emerald-800 text-amber-300 px-2 py-0.5 rounded-full font-bold">
                {cart.reduce((sum, item) => sum + item.quantity, 0)} Vitu
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {receipt ? (
              /* Success Receipt View */
              <div className="space-y-4 text-center py-6">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Malipo ya M-Pesa Yamethibitishwa 🇰🇪
                  </span>
                  <h3 className="text-lg font-black text-stone-900 mt-2">
                    Hongera! Agizo Lako Limethibitishwa
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Muuzaji wa Agrovet anatayarisha pembejeo zako kwa usafirishaji.
                  </p>
                </div>

                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 text-left space-y-2 text-xs font-mono">
                  <div className="flex justify-between border-b border-stone-200 pb-2">
                    <span className="text-stone-500 font-sans">M-Pesa Ref ID:</span>
                    <span className="font-bold text-stone-900">{receipt.transactionId}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-200 pb-2">
                    <span className="text-stone-500 font-sans">Kiasi Kilicholipwa:</span>
                    <span className="font-bold text-emerald-800 font-sans">KES {receipt.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-200 pb-2">
                    <span className="text-stone-500 font-sans">Nambari ya Mkulima:</span>
                    <span className="font-bold text-stone-900">{receipt.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500 font-sans">Muda wa Malipo:</span>
                    <span className="text-stone-600 font-sans">{receipt.timestamp}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setReceipt(null);
                    onClose();
                  }}
                  className="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs transition"
                >
                  Rudi Kwenye Soko la Kilimo
                </button>
              </div>
            ) : cart.length === 0 ? (
              /* Empty Cart */
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-stone-400 space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-sm font-bold text-stone-700">Kikapu chako kiko tupu</p>
                  <p className="text-xs text-stone-500 mt-1">
                    Ongeza mbegu, mbolea, au madawa ya mimea kutoka kwenye soko.
                  </p>
                </div>
              </div>
            ) : (
              /* Items List */
              <div className="space-y-3">
                {cart.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="flex items-center space-x-3 p-3 bg-stone-50 rounded-2xl border border-stone-200/80"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-14 rounded-xl object-cover border border-stone-200 shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-stone-900 truncate">
                        {product.name}
                      </h4>
                      <div className="text-[11px] text-emerald-800 font-semibold font-mono">
                        KES {product.priceKES.toLocaleString()}
                        <span className="text-stone-500 font-normal font-sans ml-1">({product.packageSize})</span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2 mt-1.5">
                        <button
                          onClick={() => updateQuantity(product.id, -1)}
                          className="w-6 h-6 rounded-lg bg-white border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-stone-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-stone-900 w-4 text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, 1)}
                          className="w-6 h-6 rounded-lg bg-white border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-stone-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg"
                      title="Ondoa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Checkout Footer */}
          {!receipt && cart.length > 0 && (
            <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 space-y-3">
              {/* Delivery County */}
              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                  Kaunti ya Usafirishaji (Delivery County):
                </label>
                <select
                  value={selectedCounty}
                  onChange={(e) => setSelectedCounty(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl p-2 text-xs font-medium outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  {KENYA_COUNTIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* M-Pesa Phone */}
              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                  Nambari ya M-Pesa (Safaricom):
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0712 345 678"
                    className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-stone-300 rounded-xl outline-none focus:ring-2 focus:ring-emerald-600 font-mono"
                  />
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1 text-xs text-stone-600 pt-1">
                <div className="flex justify-between">
                  <span>Jumla ya Bidhaa:</span>
                  <span className="font-mono font-semibold">KES {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Gharama ya Usafiri ({selectedCounty.split(' ')[0]}):</span>
                  <span className="font-mono font-semibold">KES {deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-stone-900 pt-1 border-t border-stone-200">
                  <span>{t.marketplace.total}:</span>
                  <span className="text-emerald-800 font-mono">KES {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* M-Pesa Button */}
              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full bg-[#00A859] hover:bg-[#008f4c] text-white font-black py-3 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg transition duration-200"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Inatuma M-Pesa STK Push...</span>
                  </>
                ) : (
                  <>
                    <span>LIPA NA M-PESA KES {grandTotal.toLocaleString()}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Simulated Safaricom M-Pesa STK Push Dialog on Phone Screen */}
      {showStkPrompt && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-stone-900 border-2 border-emerald-500 text-white rounded-3xl max-w-xs w-full p-5 space-y-4 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
              <span className="text-xs font-mono text-emerald-400 font-bold">M-PESA ONLINE 🇰🇪</span>
              <span className="text-[10px] text-stone-400">SIM 1</span>
            </div>

            <div className="text-xs space-y-2 text-stone-200 leading-relaxed font-mono">
              <p>
                Do you want to pay <strong>KES {grandTotal.toLocaleString()}</strong> to <strong>SautiFarm Agrovets</strong> (Account: 2026-FARM)?
              </p>
              <p className="text-[11px] text-emerald-300">
                Enter M-PESA PIN to complete payment:
              </p>
            </div>

            <div>
              <input
                type="password"
                maxLength={4}
                autoFocus
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="••••"
                className="w-full text-center text-lg tracking-widest bg-stone-800 border border-emerald-500 rounded-xl py-2 text-white font-mono outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => setShowStkPrompt(false)}
                className="bg-stone-800 hover:bg-stone-700 text-stone-300 py-2 rounded-xl text-xs font-mono font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={confirmPinAndComplete}
                className="bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-xl text-xs font-mono font-bold"
              >
                Send PIN
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
