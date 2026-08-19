'use client';

import React, { useEffect, useRef } from 'react';
import {
  TrendingUp,
  ShieldCheck,
  FileText,
  PieChart,
  DollarSign,
  Award,
  CheckCircle2,
  BarChart3,
  Lock,
  Building2
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';

export const Investors: React.FC = () => {
  const infoRef = useRef<HTMLDivElement>(null);
  const reportsRef = useRef<HTMLDivElement>(null);
  const governanceRef = useRef<HTMLDivElement>(null);
  const { currentLanguage } = useLanguage();
  const searchParams = useSearchParams();
  const initialSection = searchParams.get('section');

  useEffect(() => {
    if (initialSection) {
      const element = document.getElementById(initialSection);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [initialSection]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen text-stone-900 bg-stone-50 px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Quick Section Anchor Pills */}
        <div className="sticky top-20 z-30 flex items-center justify-center gap-2 overflow-x-auto py-2 px-3 bg-white/90 backdrop-blur-md rounded-2xl border border-stone-200 shadow-sm max-w-xl mx-auto">
          <button
            onClick={() => scrollTo('investor-information')}
            className="px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-saf-800 hover:bg-stone-100 rounded-xl transition whitespace-nowrap"
          >
            Investor Information
          </button>
          <button
            onClick={() => scrollTo('financial-reports')}
            className="px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-saf-800 hover:bg-stone-100 rounded-xl transition whitespace-nowrap"
          >
            Financial Reports
          </button>
          <button
            onClick={() => scrollTo('corporate-governance')}
            className="px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-saf-800 hover:bg-stone-100 rounded-xl transition whitespace-nowrap"
          >
            Corporate Governance
          </button>
        </div>

        {/* 1. INVESTOR INFORMATION (PAGE HEADER & VALUE PROPOSITION) */}
        <section id="investor-information" ref={infoRef} className="scroll-mt-28 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-4 pt-4 pb-2">
            <h1 className="text-4xl sm:text-5xl font-serif tracking-tight text-stone-900 font-normal">
              Investor Information
            </h1>
            <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-sans text-center font-normal px-2">
              SautiFarm is a research initiative by Maseno University, focused on creating sustainable
              agricultural impact across Kenya.
            </p>
          </div>

          {/* Value Proposition */}
          <div className="space-y-6">
            <h2 className="text-2xl font-serif text-stone-900 font-normal">
              Value Proposition
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: 9/10 Farmer Rating */}
              <div 
                id="investor-card-rating"
                className="bg-white border border-stone-200 rounded-2xl p-7 flex flex-col items-center justify-center text-center space-y-3 hover:border-saf-500/40 transition shadow-sm"
              >
                <div className="text-4xl sm:text-5xl font-extrabold text-saf-800 tracking-tight font-mono">
                  9/10
                </div>
                <h3 className="text-base font-bold text-stone-900 tracking-wide">
                  Farmer Rating
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  Average satisfaction score from field validation with 14 farmers.
                </p>
              </div>

              {/* Card 2: KES 5-10 Willingness to Pay */}
              <div 
                id="investor-card-wtp"
                className="bg-white border border-stone-200 rounded-2xl p-7 flex flex-col items-center justify-center text-center space-y-3 hover:border-saf-500/40 transition shadow-sm"
              >
                <div className="text-4xl sm:text-5xl font-extrabold text-saf-800 tracking-tight font-mono">
                  KES 5-10
                </div>
                <h3 className="text-base font-bold text-stone-900 tracking-wide">
                  Willingness to Pay
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  Per consultation when advice saves crops from KES 7,500-100,000+ losses.
                </p>
              </div>

              {/* Card 3: 85% WhatsApp Preference */}
              <div 
                id="investor-card-whatsapp"
                className="bg-white border border-stone-200 rounded-2xl p-7 flex flex-col items-center justify-center text-center space-y-3 hover:border-saf-500/40 transition shadow-sm"
              >
                <div className="text-4xl sm:text-5xl font-extrabold text-saf-800 tracking-tight font-mono">
                  85%
                </div>
                <h3 className="text-base font-bold text-stone-900 tracking-wide">
                  WhatsApp Preference
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  Of validated farmers prefer WhatsApp for receiving farming advice.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. FINANCIAL REPORTS & SUSTAINABILITY MODEL */}
        <section id="financial-reports" ref={reportsRef} className="scroll-mt-28 space-y-6 pt-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-serif text-stone-900 font-normal">
              Financial Reports &amp; Economics
            </h2>
            <p className="text-stone-500 text-sm">
              Sustainable unit economics model designed for scalable micro-monetization and cooperative partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Unit Economics Breakdown */}
            <div 
              id="report-unit-economics"
              className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 space-y-4 hover:border-saf-500/40 transition shadow-lg"
            >
              <h3 className="text-lg font-bold text-white">
                Unit Economics per Consultation
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-stone-800/70">
                  <span className="text-stone-600">Farmer Fee (Direct SMS/USSD)</span>
                  <span className="text-saf-800 font-mono font-bold">KES 5.00 – 10.00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-stone-800/70">
                  <span className="text-stone-600">Estimated AI Compute &amp; SMS Cost</span>
                  <span className="text-stone-500 font-mono">~ KES 1.20</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-stone-800/70">
                  <span className="text-stone-600">Gross Margin per Consultation</span>
                  <span className="text-emerald-300 font-mono font-bold">&gt; 75%</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-stone-600">Crop Value Protected (Average)</span>
                  <span className="text-amber-300 font-mono font-bold">KES 35,000 / acre</span>
                </div>
              </div>
            </div>

            {/* Revenue Streams */}
            <div 
              id="report-revenue-streams"
              className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 space-y-4 hover:border-saf-500/40 transition shadow-lg"
            >
              <h3 className="text-lg font-bold text-white">
                Multi-Tier Revenue Architecture
              </h3>
              <ul className="space-y-2.5 text-sm text-stone-600">
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                  <span><strong className="text-white">B2C Micro-Transactions:</strong> Pay-per-query through Safaricom M-Pesa micro-billing.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                  <span><strong className="text-white">Cooperative Subscriptions:</strong> Annual SaaS licenses for farmer societies &amp; agrovets.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                  <span><strong className="text-white">Marketplace Commissions:</strong> Certified seed and input vendor referral fees.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                  <span><strong className="text-white">API Integration:</strong> OpenAI-compatible endpoints for agribusinesses.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3. CORPORATE GOVERNANCE */}
        <section id="corporate-governance" ref={governanceRef} className="scroll-mt-28 space-y-6 pt-4 pb-10">
          <div className="text-left">
            <h2 className="text-2xl font-serif text-stone-900 font-normal">
              Corporate Governance
            </h2>
          </div>

          <div className="space-y-4">
            {/* Academic Oversight */}
            <div 
              id="gov-academic-oversight"
              className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 space-y-2 hover:border-saf-500/40 transition shadow-lg"
            >
              <h3 className="text-lg font-bold text-white">
                Academic Oversight
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                SautiFarm operates under the research governance framework of Maseno University, ensuring ethical AI deployment and responsible data handling.
              </p>
            </div>

            {/* Data Protection */}
            <div 
              id="gov-data-protection"
              className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 space-y-2 hover:border-saf-500/40 transition shadow-lg"
            >
              <h3 className="text-lg font-bold text-white">
                Data Protection
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                All farmer data is handled in compliance with Kenya&apos;s Data Protection Act 2019. No personal farmer data is shared without explicit consent.
              </p>
            </div>

            {/* Transparency */}
            <div 
              id="gov-transparency"
              className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 space-y-2 hover:border-saf-500/40 transition shadow-lg"
            >
              <h3 className="text-lg font-bold text-white">
                Transparency
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Regular progress reports are shared with stakeholders through Maseno University research channels.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
