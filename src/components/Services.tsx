import React, { useEffect, useRef } from 'react';
import { 
  Sprout, 
  Briefcase, 
  Cpu, 
  FolderGit2, 
  CheckCircle2, 
  ArrowRight,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { LanguageCode } from '../types';

interface ServicesProps {
  currentLanguage: LanguageCode;
  initialSection?: string;
  setActiveTab?: (tab: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ currentLanguage, initialSection, setActiveTab }) => {
  const adviceRef = useRef<HTMLDivElement>(null);
  const consultancyRef = useRef<HTMLDivElement>(null);
  const modelDevRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

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
    <div className="min-h-screen text-slate-100 bg-[#070b12] -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Quick Section Anchor Pills */}
        <div className="sticky top-20 z-30 flex items-center justify-center gap-2 overflow-x-auto py-2 px-3 bg-stone-900/90 backdrop-blur-md rounded-2xl border border-stone-800 shadow-xl max-w-2xl mx-auto">
          <button
            onClick={() => scrollTo('agricultural-advice')}
            className="px-3 py-1.5 text-xs font-medium text-stone-300 hover:text-emerald-400 hover:bg-stone-800/80 rounded-xl transition whitespace-nowrap"
          >
            Agricultural Advice
          </button>
          <button
            onClick={() => scrollTo('agricultural-consultancy')}
            className="px-3 py-1.5 text-xs font-medium text-stone-300 hover:text-emerald-400 hover:bg-stone-800/80 rounded-xl transition whitespace-nowrap"
          >
            Agricultural Consultancy
          </button>
          <button
            onClick={() => scrollTo('model-development')}
            className="px-3 py-1.5 text-xs font-medium text-stone-300 hover:text-emerald-400 hover:bg-stone-800/80 rounded-xl transition whitespace-nowrap"
          >
            Model Development
          </button>
          <button
            onClick={() => scrollTo('projects')}
            className="px-3 py-1.5 text-xs font-medium text-stone-300 hover:text-emerald-400 hover:bg-stone-800/80 rounded-xl transition whitespace-nowrap"
          >
            Projects
          </button>
        </div>

        {/* PAGE HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4 pb-2">
          <h1 className="text-4xl sm:text-5xl font-serif tracking-tight text-white font-normal">
            Agricultural Intelligence Solutions
          </h1>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-sans text-center font-normal px-2">
            From field-level advisory to enterprise API integration, SautiFarm delivers comprehensive
            agricultural intelligence across multiple channels.
          </p>
        </div>

        {/* 1. AGRICULTURAL ADVICE */}
        <section id="agricultural-advice" ref={adviceRef} className="scroll-mt-28">
          <div 
            id="service-card-advice"
            className="bg-[#0b1320] border border-stone-800/90 rounded-2xl p-7 sm:p-9 space-y-6 hover:border-emerald-500/40 transition shadow-xl"
          >
            <div className="space-y-3">
              <h2 className="text-2xl font-serif text-white font-normal">
                Agricultural Advice
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                AI-powered crop disease identification, treatment recommendations, planting schedules, and fertilizer guidance delivered via WhatsApp, voice calls, and SMS in Kiswahili, Kikuyu, Dholuo, Luhya, and English.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 pt-2 text-sm text-stone-200">
              <div className="flex items-center space-x-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                <span>Crop disease identification via photo upload</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                <span>Vernacular voice advisory</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                <span>Planting calendar reminders</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                <span>Fertilizer and input recommendations</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                <span>Weather-based alerts</span>
              </div>
            </div>

            {setActiveTab && (
              <div className="pt-4 border-t border-stone-800/60 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-stone-400">Experience our AI Agricultural Advisor directly on SautiFarm</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('home')}
                    className="px-3.5 py-1.5 text-xs font-semibold bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg transition"
                  >
                    Open AI Chat
                  </button>
                  <button
                    onClick={() => setActiveTab('disease')}
                    className="px-3.5 py-1.5 text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-emerald-300 rounded-lg transition"
                  >
                    Diagnose Crop Disease
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 2. AGRICULTURAL CONSULTANCY */}
        <section id="agricultural-consultancy" ref={consultancyRef} className="scroll-mt-28">
          <div 
            id="service-card-consultancy"
            className="bg-[#0b1320] border border-stone-800/90 rounded-2xl p-7 sm:p-9 space-y-6 hover:border-emerald-500/40 transition shadow-xl"
          >
            <div className="space-y-3">
              <h2 className="text-2xl font-serif text-white font-normal">
                Agricultural Consultancy
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                Enterprise-grade advisory services for cooperatives, agrovets, and agricultural organizations. Custom prompt templates, bulk advisory capabilities, and dedicated support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 pt-2 text-sm text-stone-200">
              <div className="flex items-center space-x-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                <span>Custom AI prompt templates per cooperative</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                <span>Bulk advisory for large farmer groups</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                <span>Dedicated account management</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                <span>Integration with existing farm management systems</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                <span>County-level market intelligence</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. MODEL DEVELOPMENT */}
        <section id="model-development" ref={modelDevRef} className="scroll-mt-28">
          <div 
            id="service-card-model-dev"
            className="bg-[#0b1320] border border-stone-800/90 rounded-2xl p-7 sm:p-9 space-y-6 hover:border-emerald-500/40 transition shadow-xl"
          >
            <div className="space-y-3">
              <h2 className="text-2xl font-serif text-white font-normal">
                Model Development
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                Building and fine-tuning agricultural AI models for specific crops, regions, and use cases. From disease detection to yield prediction, we develop models trained on Kenyan agricultural data.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 pt-2 text-sm text-stone-200">
              <div className="flex items-center space-x-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                <span>Custom crop disease detection models</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                <span>Vernacular language model training</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                <span>Market price prediction models</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                <span>Yield optimization algorithms</span>
              </div>
              <div className="flex items-center space-x-2.5 sm:col-span-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                <span>Research collaboration with Maseno University</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. PROJECTS */}
        <section id="projects" ref={projectsRef} className="scroll-mt-28 pb-10">
          <div 
            id="service-card-projects"
            className="bg-[#0b1320] border border-stone-800/90 rounded-2xl p-7 sm:p-9 space-y-6 hover:border-emerald-500/40 transition shadow-xl"
          >
            <div className="space-y-3">
              <h2 className="text-2xl font-serif text-white font-normal">
                Projects
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                Ongoing research and deployment projects across Kenya, from field validation studies to cooperative integration pilots.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 pt-2 text-sm text-stone-200">
              <div className="flex items-center space-x-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                <span>Multi-county field validation</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                <span>Cooperative API integration pilots</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                <span>Feature phone (USSD) accessibility</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                <span>Market price data collection</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                <span>Farmer feedback loops</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
