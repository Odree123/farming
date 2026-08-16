import React, { useState } from 'react';
import { Phone, X, RefreshCw, Send, PhoneCall } from 'lucide-react';

interface USSDSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const USSDSimulatorModal: React.FC<USSDSimulatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [screenText, setScreenText] = useState(
    `SautiFarm Kenya (*384*77#)\nKaribu Huduma ya Kilimo:\n1. Bei za Leo Masokoni\n2. Hali ya Hewa na Mvua\n3. Magonjwa na Tiba ya Mimea\n4. Nunua Mbegu / Mbolea\n5. Badili Lugha (Language)\n0. Toka`
  );
  const [userInput, setUserInput] = useState('');
  const [step, setStep] = useState<'main' | 'prices' | 'weather' | 'disease' | 'shop'>('main');

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const input = userInput.trim();
    setUserInput('');

    if (input === '0' || input.toLowerCase() === 'exit') {
      onClose();
      return;
    }

    if (step === 'main') {
      if (input === '1') {
        setStep('prices');
        setScreenText(
          `BEI ZA LEO (Wholesale):\n1. Mahindi (Eldoret) - KES 3,400\n2. Mahindi (Kongowea) - KES 4,450\n3. Nyanya (Wakulima) - KES 5,800\n4. Viazi (Nakuru) - KES 2,800\n00. Nyuma`
        );
      } else if (input === '2') {
        setStep('weather');
        setScreenText(
          `HALI YA HEWA (Uasin Gishu / Eldoret):\nLeo: 23°C, Mawingu & Mvua 65%\nUshauri: Panda sasa mbolea ya DAP kabla ya mvua kubwa ya Alhamisi.\n00. Nyuma`
        );
      } else if (input === '3') {
        setStep('disease');
        setScreenText(
          `TIBA YA MAGONJWA:\n1. Funza wa Mahindi (Belt 480SC)\n2. Ukungu wa Nyanya (Ridomil Gold)\n3. Ukungu wa Viazi (Score 250EC)\n00. Nyuma`
        );
      } else if (input === '4') {
        setStep('shop');
        setScreenText(
          `AGIZA PEMBEJEO (Lipa na M-Pesa):\n1. DAP Fertilizer 50kg (KES 4,500)\n2. Pioneer Hybrid 30G19 2kg (KES 650)\n3. Ridomil Gold 250g (KES 1,200)\nWeka nambari ya bidhaa:`
        );
      } else {
        setScreenText(
          `Chaguo sio sahihi.\n1. Bei za Leo\n2. Hali ya Hewa\n3. Magonjwa ya Mimea\n4. Pembejeo\n0. Toka`
        );
      }
    } else {
      if (input === '00') {
        setStep('main');
        setScreenText(
          `SautiFarm Kenya (*384*77#)\nKaribu Huduma ya Kilimo:\n1. Bei za Leo Masokoni\n2. Hali ya Hewa na Mvua\n3. Magonjwa na Tiba ya Mimea\n4. Nunua Mbegu / Mbolea\n5. Badili Lugha\n0. Toka`
        );
      } else if (step === 'shop') {
        setScreenText(
          `Agizo limepokelewa! M-Pesa STK Push itatumwa kwa simu yako baada ya sekunde chache kukamilisha malipo. Asante!`
        );
      } else {
        setStep('main');
        setScreenText(
          `SautiFarm Kenya (*384*77#)\nKaribu Huduma ya Kilimo:\n1. Bei za Leo Masokoni\n2. Hali ya Hewa na Mvua\n3. Magonjwa na Tiba ya Mimea\n4. Nunua Mbegu / Mbolea\n0. Toka`
        );
      }
    }
  };

  const resetUSSD = () => {
    setStep('main');
    setScreenText(
      `SautiFarm Kenya (*384*77#)\nKaribu Huduma ya Kilimo:\n1. Bei za Leo Masokoni\n2. Hali ya Hewa na Mvua\n3. Magonjwa na Tiba ya Mimea\n4. Nunua Mbegu / Mbolea\n5. Badili Lugha\n0. Toka`
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Retro Feature Phone Case */}
      <div className="bg-stone-900 border-4 border-stone-700 rounded-[38px] p-6 max-w-xs w-full shadow-2xl space-y-4 text-white relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-stone-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center pt-1">
          <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">
            Simulizi ya USSD (2G / Feature Phone)
          </span>
          <div className="text-xs font-mono text-stone-400 mt-0.5">Diali: *384*77#</div>
        </div>

        {/* Feature Phone LCD Screen */}
        <div className="bg-[#8bb381] text-stone-950 p-4 rounded-xl font-mono text-xs shadow-inner min-h-[190px] flex flex-col justify-between border-2 border-[#769b6c]">
          <div className="whitespace-pre-wrap leading-relaxed font-semibold">
            {screenText}
          </div>
        </div>

        {/* USSD Input Form */}
        <form onSubmit={handleSend} className="space-y-3">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              autoFocus
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Weka chaguo (mf. 1)..."
              className="flex-1 bg-stone-800 border border-stone-600 rounded-xl px-3 py-2 text-xs font-mono text-white outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center justify-between text-[10px] text-stone-400 pt-1">
            <button
              type="button"
              onClick={resetUSSD}
              className="hover:text-amber-300 flex items-center space-x-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Anza Upya</span>
            </button>
            <span>Huduma ya bure kwa wakulima wote</span>
          </div>
        </form>
      </div>
    </div>
  );
};
