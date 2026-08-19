'use client';

import React from 'react';
import { Briefcase, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';

export const Careers: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const router = useRouter();
  return (
    <div className="min-h-screen text-stone-900 bg-stone-50 px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* PAGE HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-6 pb-2">
          <h1 className="text-4xl sm:text-5xl font-serif tracking-tight text-stone-900 font-normal">
            Careers
          </h1>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-sans text-center font-normal px-2">
            We are building something meaningful at SautiFarm and we are growing. While we are not
            hiring right now, we are always open to hearing from passionate people who care about
            agriculture and technology.
          </p>
        </div>

        {/* NO OPEN POSITIONS CARD */}
        <div 
          id="careers-no-openings-card"
          className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-6 pt-4 pb-12"
        >
          {/* Briefcase Icon Container */}
          <div className="w-14 h-14 rounded-2xl bg-saf-50 border border-saf-200/80 flex items-center justify-center shadow-lg">
            <Briefcase className="w-7 h-7 text-saf-800" />
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 font-normal">
            No Open Positions Right Now
          </h2>

          {/* Body Paragraphs */}
          <div className="space-y-5 text-stone-600 text-sm sm:text-base leading-relaxed max-w-xl">
            <p>
              SautiFarm is still in its early stages, focused on research and field validation. When we are ready to grow the team, we will announce openings here first.
            </p>

            <p>
              If you are passionate about AI in agriculture, agricultural research, or building technology for Kenyan farmers, send us your details at{' '}
              <a 
                href="mailto:careers@sautifarm.co" 
                className="text-saf-800 hover:text-saf-700 font-medium underline underline-offset-2 transition"
              >
                careers@sautifarm.co
              </a>{' '}
              and we will keep you in mind.
            </p>
          </div>

          {/* Back to Home Button */}
          <div className="pt-4">
            <button
              onClick={() => router.push('/')}
              id="btn-careers-back-to-home"
              className="inline-flex items-center space-x-2 text-saf-800 hover:text-saf-700 font-medium text-sm transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
