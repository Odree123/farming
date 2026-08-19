'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Newspaper,
  HelpCircle,
  Leaf,
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronUp,
  Clock,
  Tag,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';

export const InformationHub: React.FC = () => {
  const newsRef = useRef<HTMLDivElement>(null);
  const sustainabilityRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
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
      <div className="max-w-5xl mx-auto space-y-14">
        
        {/* Quick Section Anchor Pills */}
        <div className="sticky top-20 z-30 flex items-center justify-center gap-2 overflow-x-auto py-2 px-3 bg-white/90 backdrop-blur-md rounded-2xl border border-stone-200 shadow-sm max-w-2xl mx-auto">
          <button
            onClick={() => scrollTo('news-and-updates')}
            className="px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-saf-800 hover:bg-stone-100 rounded-xl transition whitespace-nowrap"
          >
            News &amp; Updates
          </button>
          <button
            onClick={() => scrollTo('press-releases')}
            className="px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-saf-800 hover:bg-stone-100 rounded-xl transition whitespace-nowrap"
          >
            Press Releases
          </button>
          <button
            onClick={() => scrollTo('sustainability')}
            className="px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-saf-800 hover:bg-stone-100 rounded-xl transition whitespace-nowrap"
          >
            Sustainability
          </button>
          <button
            onClick={() => scrollTo('faqs')}
            className="px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-saf-800 hover:bg-stone-100 rounded-xl transition whitespace-nowrap"
          >
            FAQs
          </button>
          <button
            onClick={() => scrollTo('calendar-of-events')}
            className="px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-saf-800 hover:bg-stone-100 rounded-xl transition whitespace-nowrap"
          >
            Events
          </button>
        </div>

        {/* PAGE HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4 pb-2">
          <h1 className="text-4xl sm:text-5xl font-serif tracking-tight text-stone-900 font-normal">
            News and Resources
          </h1>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-sans text-center font-normal px-2">
            Stay updated with the latest from SautiFarm, including research milestones, press releases,
            and sustainability initiatives.
          </p>
        </div>

        {/* 1. LATEST NEWS & UPDATES (PRESS RELEASES) */}
        <section id="news-and-updates" ref={newsRef} className="scroll-mt-28 space-y-6">
          <div id="press-releases" className="scroll-mt-28 text-left">
            <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 font-normal">
              Latest News &amp; Updates
            </h2>
          </div>

          <div className="space-y-4">
            {/* News Item 1 */}
            <div 
              id="news-item-1"
              className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 space-y-3 hover:border-saf-500/40 transition shadow-sm"
            >
              <div className="flex items-center space-x-3">
                <span className="bg-saf-50 border border-saf-200 text-saf-800 text-xs font-semibold px-2.5 py-0.5 rounded-md">
                  Validation
                </span>
                <span className="text-stone-500 text-xs font-mono">
                  Jul 2026
                </span>
              </div>
              <h3 className="text-lg font-bold text-stone-900 tracking-wide">
                Field Validation Complete: 14 Farmers, 4 Counties
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Completed hands-on validation with farmers across Nakuru, Bungoma, Butere, and Kieni Nyeri. 9/10 average rating. 100% would recommend SautiFarm.
              </p>
            </div>

            {/* News Item 2 */}
            <div 
              id="news-item-2"
              className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 space-y-3 hover:border-saf-500/40 transition shadow-sm"
            >
              <div className="flex items-center space-x-3">
                <span className="bg-saf-50 border border-saf-200 text-saf-800 text-xs font-semibold px-2.5 py-0.5 rounded-md">
                  Research
                </span>
                <span className="text-stone-500 text-xs font-mono">
                  Jul 2026
                </span>
              </div>
              <h3 className="text-lg font-bold text-stone-900 tracking-wide">
                Farmers Report KES 7,500-100,000+ Annual Losses
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Validation revealed farmers lose KES 7,500 to over 100,000 annually from crop diseases, wrong pesticides, and poor planting timing.
              </p>
            </div>

            {/* News Item 3 */}
            <div 
              id="news-item-3"
              className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 space-y-3 hover:border-saf-500/40 transition shadow-sm"
            >
              <div className="flex items-center space-x-3">
                <span className="bg-saf-50 border border-saf-200 text-saf-800 text-xs font-semibold px-2.5 py-0.5 rounded-md">
                  Research
                </span>
                <span className="text-stone-500 text-xs font-mono">
                  Nov 2025
                </span>
              </div>
              <h3 className="text-lg font-bold text-stone-900 tracking-wide">
                Initial Field Research Conducted
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                First round of farmer interviews in Nakuru, Butere, Bungoma, and Kieni Nyeri confirmed strong demand for vernacular agricultural advisory.
              </p>
            </div>
          </div>
        </section>

        {/* 2. SUSTAINABILITY */}
        <section id="sustainability" ref={sustainabilityRef} className="scroll-mt-28 space-y-6 pt-4">
          <div className="text-left">
            <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 font-normal">
              Sustainability
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Environmental Impact */}
            <div 
              id="sustainability-environmental"
              className="bg-white border border-stone-200 rounded-2xl p-7 sm:p-8 space-y-3 hover:border-saf-500/40 transition shadow-lg"
            >
              <h3 className="text-lg font-bold text-white">
                Environmental Impact
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                By reducing wrong pesticide use and optimizing planting timing, SautiFarm helps minimize chemical runoff and environmental degradation.
              </p>
            </div>

            {/* Economic Sustainability */}
            <div 
              id="sustainability-economic"
              className="bg-white border border-stone-200 rounded-2xl p-7 sm:p-8 space-y-3 hover:border-saf-500/40 transition shadow-lg"
            >
              <h3 className="text-lg font-bold text-white">
                Economic Sustainability
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Farmers confirmed willingness to pay KES 5-10 per consultation, creating a sustainable revenue model that serves smallholders.
              </p>
            </div>
          </div>
        </section>

        {/* 3. FREQUENTLY ASKED QUESTIONS */}
        <section id="faqs" ref={faqRef} className="scroll-mt-28 space-y-6 pt-4">
          <div className="text-left">
            <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 font-normal">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {/* FAQ 1 */}
            <div 
              id="faq-item-1"
              className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 space-y-2 hover:border-saf-500/40 transition shadow-lg"
            >
              <h3 className="text-base font-bold text-white">
                What is SautiFarm?
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                SautiFarm is an AI-powered agricultural advisory platform that provides crop disease diagnosis, market prices, and farming guidance through WhatsApp, voice calls, and SMS in local Kenyan languages.
              </p>
            </div>

            {/* FAQ 2 */}
            <div 
              id="faq-item-2"
              className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 space-y-2 hover:border-saf-500/40 transition shadow-lg"
            >
              <h3 className="text-base font-bold text-white">
                How much does it cost?
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Farmers pay KES 5-10 per consultation. This was validated as fair by 14 farmers across 4 counties during field research.
              </p>
            </div>

            {/* FAQ 3 */}
            <div 
              id="faq-item-3"
              className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 space-y-2 hover:border-saf-500/40 transition shadow-lg"
            >
              <h3 className="text-base font-bold text-white">
                Which languages are supported?
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                SautiFarm supports English, Kiswahili, Kikuyu, Dholuo, and Luhya. These are the languages farmers specifically requested during field validation.
              </p>
            </div>

            {/* FAQ 4 */}
            <div 
              id="faq-item-4"
              className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 space-y-2 hover:border-saf-500/40 transition shadow-lg"
            >
              <h3 className="text-base font-bold text-white">
                Do I need a smartphone?
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                WhatsApp features require a smartphone, but SautiFarm also supports voice calls and SMS for feature phone users.
              </p>
            </div>

            {/* FAQ 5 */}
            <div 
              id="faq-item-5"
              className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 space-y-2 hover:border-saf-500/40 transition shadow-lg"
            >
              <h3 className="text-base font-bold text-white">
                How accurate is the disease detection?
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                SautiFarm uses multimodal AI to analyze plant photos. During validation, farmers rated the advisory as extremely helpful (9/10 average).
              </p>
            </div>
          </div>
        </section>

        {/* 4. CALENDAR OF EVENTS */}
        <section id="calendar-of-events" ref={eventsRef} className="scroll-mt-28 space-y-6 pt-4 pb-12">
          <div className="text-left">
            <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 font-normal">
              Calendar of Events
            </h2>
          </div>

          <div 
            id="events-announcement-box"
            className="bg-white border border-stone-200 rounded-2xl p-10 text-center flex items-center justify-center shadow-lg"
          >
            <p className="text-stone-600 text-sm sm:text-base">
              Upcoming events and field visits will be announced here.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
};
