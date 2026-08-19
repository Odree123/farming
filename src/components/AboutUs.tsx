import React, { useEffect, useRef } from 'react';
import { 
  Building2, 
  Target, 
  Award, 
  Handshake, 
  HeartHandshake, 
  Sparkles, 
  GraduationCap, 
  Cpu, 
  Leaf, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Calendar,
  Users,
  Compass,
  Lightbulb
} from 'lucide-react';
import { LanguageCode } from '../types';

interface AboutUsProps {
  currentLanguage: LanguageCode;
  initialSection?: string;
  setActiveTab?: (tab: string) => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ currentLanguage, initialSection, setActiveTab }) => {
  const whoWeAreRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const leadershipRef = useRef<HTMLDivElement>(null);
  const strategyRef = useRef<HTMLDivElement>(null);
  const csrRef = useRef<HTMLDivElement>(null);
  const awardsRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialSection) {
      const element = document.getElementById(initialSection);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [initialSection]);

  return (
    <div className="min-h-screen text-stone-900 bg-stone-50 px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* 1. WHO WE ARE */}
        <section id="who-we-are" ref={whoWeAreRef} className="pt-6 scroll-mt-28">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-5xl font-serif tracking-tight text-stone-900 font-normal">
              Who We Are
            </h1>
            <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-sans text-center font-normal px-2">
              SautiFarm is building Africa&apos;s intelligent agriculture future through AI-powered voice technology
              that equips every farmer, everywhere. We build local language AI models, conduct field
              research with farmers, and develop agricultural intelligence tools that bring crop disease
              diagnosis, market information, and farming advisory to smallholder farmers in local languages
              they understand.
            </p>
          </div>
        </section>

        {/* 2. OUR JOURNEY */}
        <section id="our-journey" ref={journeyRef} className="pt-6 scroll-mt-28 space-y-8">
          <div className="text-left">
            <h2 className="text-3xl font-serif text-stone-900 font-normal">
              Our Journey
            </h2>
          </div>

          <div className="space-y-4">
            {/* 2025 - Research & Discovery */}
            <div 
              id="journey-item-1"
              className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-start gap-5 hover:border-saf-500/40 transition shadow-lg"
            >
              <div className="bg-saf-50 border border-saf-200 text-saf-800 font-mono text-sm font-semibold px-4 py-1.5 rounded-lg flex items-center justify-center shrink-0">
                2025
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="text-lg font-bold text-stone-900 tracking-wide">
                  Research &amp; Discovery
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Field research conducted with farmers in Nakuru, Bungoma, Butere, and Kieni Nyeri. Identified core pain points: crop diseases, wrong pesticides, poor planting timing, and delayed access to expert advice.
                </p>
              </div>
            </div>

            {/* 2025 - Platform Development */}
            <div 
              id="journey-item-2"
              className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-start gap-5 hover:border-saf-500/40 transition shadow-lg"
            >
              <div className="bg-saf-50 border border-saf-200 text-saf-800 font-mono text-sm font-semibold px-4 py-1.5 rounded-lg flex items-center justify-center shrink-0">
                2025
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="text-lg font-bold text-stone-900 tracking-wide">
                  Platform Development
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Built the SautiFarm AI engine with support for Swahili, Kikuyu, Dholuo, and Luhya. Integrated WhatsApp vision for crop disease detection and voice-based advisory.
                </p>
              </div>
            </div>

            {/* 2026 - Field Validation */}
            <div 
              id="journey-item-3"
              className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-start gap-5 hover:border-saf-500/40 transition shadow-lg"
            >
              <div className="bg-saf-50 border border-saf-200 text-saf-800 font-mono text-sm font-semibold px-4 py-1.5 rounded-lg flex items-center justify-center shrink-0">
                2026
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="text-lg font-bold text-stone-900 tracking-wide">
                  Field Validation
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Completed hands-on validation with 14 farmers across 4 counties. Achieved 9/10 average rating. Farmers confirmed willingness to pay KES 5-10 per consultation when advice saves crops.
                </p>
              </div>
            </div>

            {/* 2026 - Current Phase */}
            <div 
              id="journey-item-4"
              className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-start gap-5 hover:border-saf-500/40 transition shadow-lg"
            >
              <div className="bg-saf-50 border border-saf-200 text-saf-800 font-mono text-sm font-semibold px-4 py-1.5 rounded-lg flex items-center justify-center shrink-0">
                2026
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="text-lg font-bold text-stone-900 tracking-wide">
                  Current Phase
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Expanding the developer platform, marketplace, and cooperative integration. Preparing for wider rollout across Kenya&apos;s agricultural regions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. LEADERSHIP */}
        <section id="leadership" ref={leadershipRef} className="pt-6 scroll-mt-28 space-y-8">
          <div className="text-left">
            <h2 className="text-3xl font-serif text-stone-900 font-normal">
              Leadership
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Maseno University */}
            <div 
              id="leadership-card-1"
              className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 space-y-5 hover:border-saf-500/40 transition shadow-lg"
            >
              <div className="w-12 h-12 rounded-full bg-saf-50 border border-saf-200 flex items-center justify-center text-saf-800 font-bold text-sm">
                MU
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">
                  Maseno University
                </h3>
                <p className="text-xs font-semibold text-saf-800 uppercase tracking-wider">
                  RESEARCH PARTNER
                </p>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed">
                Providing academic oversight, research infrastructure, and field coordination through the School of Computing and Information Technology.
              </p>
            </div>

            {/* Card 2: Maseno University Research Team */}
            <div 
              id="leadership-card-2"
              className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 space-y-5 hover:border-saf-500/40 transition shadow-lg"
            >
              <div className="w-12 h-12 rounded-full bg-saf-50 border border-saf-200 flex items-center justify-center text-saf-800 font-bold text-sm">
                MU
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">
                  Maseno University Research Team
                </h3>
                <p className="text-xs font-semibold text-saf-800 uppercase tracking-wider">
                  IMPLEMENTATION LEAD
                </p>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed">
                Driving field validation, farmer onboarding, and community engagement across target counties.
              </p>
            </div>

            {/* Card 3: SautiFarm Engineering */}
            <div 
              id="leadership-card-3"
              className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 space-y-5 hover:border-saf-500/40 transition shadow-lg"
            >
              <div className="w-12 h-12 rounded-full bg-saf-50 border border-saf-200 flex items-center justify-center text-saf-800 font-bold text-sm">
                SE
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">
                  SautiFarm Engineering
                </h3>
                <p className="text-xs font-semibold text-saf-800 uppercase tracking-wider">
                  TECHNOLOGY
                </p>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed">
                Building the AI engine, developer platform, and multi-channel delivery infrastructure for agricultural advisory at scale.
              </p>
            </div>
          </div>
        </section>

        {/* 4. CORPORATE STRATEGY */}
        <section id="corporate-strategy" ref={strategyRef} className="pt-6 scroll-mt-28 space-y-8">
          <div className="text-left">
            <h2 className="text-3xl font-serif text-stone-900 font-normal">
              Corporate Strategy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vision */}
            <div 
              id="strategy-vision"
              className="bg-white border border-stone-200 rounded-2xl p-7 sm:p-8 space-y-3 hover:border-saf-500/40 transition shadow-lg"
            >
              <h3 className="text-xl font-bold text-white">
                Vision
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                To become East Africa&apos;s most trusted agricultural intelligence platform, connecting every smallholder farmer to expert advisory through their preferred channel and language.
              </p>
            </div>

            {/* Mission */}
            <div 
              id="strategy-mission"
              className="bg-white border border-stone-200 rounded-2xl p-7 sm:p-8 space-y-3 hover:border-saf-500/40 transition shadow-lg"
            >
              <h3 className="text-xl font-bold text-white">
                Mission
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Deliver actionable, localized farming advice powered by AI and validated by real farmer feedback, making agricultural expertise accessible regardless of phone type, literacy level, or location.
              </p>
            </div>
          </div>
        </section>

        {/* 5. CORPORATE SOCIAL RESPONSIBILITY */}
        <section id="csr" ref={csrRef} className="pt-6 scroll-mt-28 space-y-8">
          <div className="text-left">
            <h2 className="text-3xl font-serif text-stone-900 font-normal">
              Corporate Social Responsibility
            </h2>
          </div>

          <div className="space-y-4">
            {/* Farmer Empowerment */}
            <div 
              id="csr-farmer-empowerment"
              className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 space-y-2 hover:border-saf-500/40 transition shadow-lg"
            >
              <h3 className="text-lg font-bold text-white">
                Farmer Empowerment
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Every advisory interaction is designed to build farmer knowledge, not dependency. Farmers learn to identify diseases, understand market timing, and make informed decisions.
              </p>
            </div>

            {/* University Partnership */}
            <div 
              id="csr-university-partnership"
              className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 space-y-2 hover:border-saf-500/40 transition shadow-lg"
            >
              <h3 className="text-lg font-bold text-white">
                University Partnership
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                SautiFarm provides practical research opportunities for Maseno University students, bridging academic research with real-world agricultural challenges.
              </p>
            </div>

            {/* Sustainable Agriculture */}
            <div 
              id="csr-sustainable-agri"
              className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 space-y-2 hover:border-saf-500/40 transition shadow-lg"
            >
              <h3 className="text-lg font-bold text-white">
                Sustainable Agriculture
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                By reducing wrong pesticide use and optimizing planting timing, SautiFarm helps minimize environmental impact while improving crop yields.
              </p>
            </div>
          </div>
        </section>

        {/* 6. AWARDS & CERTIFICATIONS */}
        <section id="awards" ref={awardsRef} className="pt-6 scroll-mt-28 space-y-8">
          <div className="text-left">
            <h2 className="text-3xl font-serif text-stone-900 font-normal">
              Awards &amp; Certifications
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Field Validation Certified */}
            <div 
              id="award-field-validation"
              className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 space-y-2 hover:border-saf-500/40 transition shadow-lg"
            >
              <h3 className="text-base font-bold text-white">
                Field Validation Certified
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                14 farmers across 4 counties validated SautiFarm with 9/10 average rating.
              </p>
            </div>

            {/* Maseno University Research Partner */}
            <div 
              id="award-maseno-partner"
              className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 space-y-2 hover:border-saf-500/40 transition shadow-lg"
            >
              <h3 className="text-base font-bold text-white">
                Maseno University Research Partner
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Official academic partnership for agricultural AI research.
              </p>
            </div>

            {/* Field Research Recognition */}
            <div 
              id="award-research-recognition"
              className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 space-y-2 hover:border-saf-500/40 transition shadow-lg"
            >
              <h3 className="text-base font-bold text-white">
                Field Research Recognition
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Recognized for community impact through agricultural AI research.
              </p>
            </div>

            {/* OpenAI-Compatible API */}
            <div 
              id="award-openai-api"
              className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 space-y-2 hover:border-saf-500/40 transition shadow-lg"
            >
              <h3 className="text-base font-bold text-white">
                OpenAI-Compatible API
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Developer platform with standard API interface for third-party integration.
              </p>
            </div>
          </div>
        </section>

        {/* 7. OUR PARTNERS & SUPPORTERS */}
        <section id="partners" ref={partnersRef} className="pt-6 scroll-mt-28 space-y-8 pb-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 font-normal">
              Our Partners &amp; Supporters
            </h2>
            <p className="text-stone-600 text-sm sm:text-base">
              SautiFarm is supported by leading Kenyan agricultural institutions and research organizations.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-4">
            <div 
              id="partner-maseno"
              className="bg-white border border-stone-200 rounded-xl p-4 text-center flex items-center justify-center text-sm font-medium font-sans text-stone-700 hover:border-saf-500/50 hover:text-saf-700 transition"
            >
              Maseno University
            </div>
            <div 
              id="partner-kalro"
              className="bg-white border border-stone-200 rounded-xl p-4 text-center flex items-center justify-center text-sm font-medium font-sans text-stone-700 hover:border-saf-500/50 hover:text-saf-700 transition"
            >
              KALRO
            </div>
            <div 
              id="partner-ministry"
              className="bg-white border border-stone-200 rounded-xl p-4 text-center flex items-center justify-center text-sm font-medium font-sans text-stone-700 hover:border-saf-500/50 hover:text-saf-700 transition"
            >
              Ministry of Agriculture
            </div>
            <div 
              id="partner-board"
              className="bg-white border border-stone-200 rounded-xl p-4 text-center flex items-center justify-center text-sm font-medium font-sans text-stone-700 hover:border-saf-500/50 hover:text-saf-700 transition"
            >
              Kenya Agricultural Board
            </div>
            <div 
              id="partner-counties"
              className="bg-white border border-stone-200 rounded-xl p-4 text-center flex items-center justify-center text-sm font-medium font-sans text-stone-700 hover:border-saf-500/50 hover:text-saf-700 transition"
            >
              County Governments
            </div>
            <div 
              id="partner-farmers-fed"
              className="bg-white border border-stone-200 rounded-xl p-4 text-center flex items-center justify-center text-sm font-medium font-sans text-stone-700 hover:border-saf-500/50 hover:text-saf-700 transition sm:col-span-2 md:col-span-1"
            >
              Kenya National Farmers Federation
            </div>
            <div 
              id="partner-aatf"
              className="bg-white border border-stone-200 rounded-xl p-4 text-center flex items-center justify-center text-sm font-medium font-sans text-stone-700 hover:border-saf-500/50 hover:text-saf-700 transition col-span-2 sm:col-span-1 md:col-span-2"
            >
              African Agricultural Technology Foundation
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
