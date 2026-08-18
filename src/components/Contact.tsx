import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Building2, 
  Sparkles,
  MessageSquareCode,
  Users,
  Megaphone
} from 'lucide-react';
import { LanguageCode } from '../types';

interface ContactUsProps {
  currentLanguage: LanguageCode;
  setActiveTab?: (tab: string) => void;
}

export const ContactUs: React.FC<ContactUsProps> = ({ currentLanguage, setActiveTab }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 6000);
    }, 800);
  };

  return (
    <div className="min-h-screen text-slate-100 bg-[#070b12] -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-5xl mx-auto space-y-14">
        
        {/* PAGE HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4 pb-2">
          <h1 className="text-4xl sm:text-5xl font-serif tracking-tight text-white font-normal">
            Get in Touch
          </h1>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-sans text-center font-normal px-2">
            Whether you are a farmer, developer, cooperative, or research partner, we would love to hear from you.
          </p>
        </div>

        {/* OUR OFFICES */}
        <section id="our-offices" className="space-y-6">
          <div className="text-left">
            <h2 className="text-2xl sm:text-3xl font-serif text-white font-normal">
              Our Offices
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Headquarters */}
            <div 
              id="office-card-hq"
              className="bg-[#0b1320] border border-stone-800/90 rounded-2xl p-7 space-y-4 hover:border-emerald-500/40 transition shadow-xl"
            >
              <div>
                <span className="bg-[#082218] border border-emerald-800 text-emerald-400 text-xs font-semibold px-2.5 py-0.5 rounded-md inline-block">
                  Headquarters
                </span>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white tracking-wide">
                  Maseno University
                </h3>
                <p className="text-stone-300 text-sm leading-relaxed">
                  P.O. Box 333-40105, Maseno, Kisumu County, Kenya
                </p>
              </div>

              <div className="pt-2 space-y-1 text-sm text-stone-300">
                <p className="flex items-center space-x-2">
                  <span className="text-stone-400">Tel:</span>
                  <a href="tel:+254713565060" className="text-stone-200 hover:text-emerald-400 font-mono transition">
                    +254 713 565060
                  </a>
                </p>
                <p className="flex items-center space-x-2">
                  <span className="text-stone-400">Email:</span>
                  <a href="mailto:info@sautifarm.co" className="text-stone-200 hover:text-emerald-400 transition">
                    info@sautifarm.co
                  </a>
                </p>
              </div>
            </div>

            {/* Field Office */}
            <div 
              id="office-card-field"
              className="bg-[#0b1320] border border-stone-800/90 rounded-2xl p-7 space-y-4 hover:border-emerald-500/40 transition shadow-xl"
            >
              <div>
                <span className="bg-[#082218] border border-emerald-800 text-emerald-400 text-xs font-semibold px-2.5 py-0.5 rounded-md inline-block">
                  Field Office
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white tracking-wide">
                  Field Operations
                </h3>
                <p className="text-stone-300 text-sm leading-relaxed">
                  Maseno, Kisumu County, Kenya
                </p>
              </div>

              <div className="pt-2 space-y-1 text-sm text-stone-300">
                <p className="flex items-center space-x-2">
                  <span className="text-stone-400">Tel:</span>
                  <a href="tel:+254713565060" className="text-stone-200 hover:text-emerald-400 font-mono transition">
                    +254 713 565060
                  </a>
                </p>
                <p className="flex items-center space-x-2">
                  <span className="text-stone-400">Email:</span>
                  <a href="mailto:info@sautifarm.co" className="text-stone-200 hover:text-emerald-400 transition">
                    info@sautifarm.co
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SEND A MESSAGE & QUICK CONTACT (2 COLUMNS) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2 pb-12">
          
          {/* LEFT: SEND A MESSAGE FORM */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-serif text-white font-normal">
              Send a Message
            </h2>

            {submitted && (
              <div className="p-4 bg-emerald-950/80 border border-emerald-700/80 rounded-xl flex items-center space-x-3 text-emerald-200 text-sm animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Asante! Your message has been received. Our team will get back to you shortly.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* NAME */}
              <div className="space-y-1.5">
                <label htmlFor="contact-name" className="block text-xs font-bold text-stone-300 uppercase tracking-wider">
                  NAME
                </label>
                <input
                  type="text"
                  id="contact-name"
                  required
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#0b1320] border border-stone-800/90 rounded-xl px-4 py-3 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-emerald-500 transition"
                />
              </div>

              {/* EMAIL */}
              <div className="space-y-1.5">
                <label htmlFor="contact-email" className="block text-xs font-bold text-stone-300 uppercase tracking-wider">
                  EMAIL
                </label>
                <input
                  type="email"
                  id="contact-email"
                  required
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#0b1320] border border-stone-800/90 rounded-xl px-4 py-3 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-emerald-500 transition"
                />
              </div>

              {/* SUBJECT */}
              <div className="space-y-1.5">
                <label htmlFor="contact-subject" className="block text-xs font-bold text-stone-300 uppercase tracking-wider">
                  SUBJECT
                </label>
                <input
                  type="text"
                  id="contact-subject"
                  placeholder="How can we help?"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-[#0b1320] border border-stone-800/90 rounded-xl px-4 py-3 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-emerald-500 transition"
                />
              </div>

              {/* MESSAGE */}
              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="block text-xs font-bold text-stone-300 uppercase tracking-wider">
                  MESSAGE
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#0b1320] border border-stone-800/90 rounded-xl px-4 py-3 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-emerald-500 transition resize-y"
                />
              </div>

              {/* SUBMIT BUTTON */}
              <div>
                <button
                  type="submit"
                  id="btn-send-contact-message"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-[#10b981] hover:bg-[#059669] text-stone-900 font-bold rounded-lg text-sm transition shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT: QUICK CONTACT */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-serif text-white font-normal">
              Quick Contact
            </h2>

            <div className="space-y-3.5">
              {/* General Inquiries */}
              <div 
                id="quick-contact-general"
                className="bg-[#0b1320] border border-stone-800/90 rounded-2xl p-5 space-y-1.5 hover:border-emerald-500/40 transition shadow-lg"
              >
                <h3 className="text-base font-bold text-white">
                  General Inquiries
                </h3>
                <a 
                  href="mailto:info@sautifarm.co" 
                  className="text-stone-300 hover:text-emerald-400 text-sm transition block"
                >
                  info@sautifarm.co
                </a>
              </div>

              {/* Developer Support */}
              <div 
                id="quick-contact-dev"
                className="bg-[#0b1320] border border-stone-800/90 rounded-2xl p-5 space-y-1.5 hover:border-emerald-500/40 transition shadow-lg"
              >
                <h3 className="text-base font-bold text-white">
                  Developer Support
                </h3>
                <a 
                  href="mailto:developers@sautifarm.co" 
                  className="text-stone-300 hover:text-emerald-400 text-sm transition block"
                >
                  developers@sautifarm.co
                </a>
              </div>

              {/* Partnerships */}
              <div 
                id="quick-contact-partnerships"
                className="bg-[#0b1320] border border-stone-800/90 rounded-2xl p-5 space-y-1.5 hover:border-emerald-500/40 transition shadow-lg"
              >
                <h3 className="text-base font-bold text-white">
                  Partnerships
                </h3>
                <a 
                  href="mailto:partnerships@sautifarm.co" 
                  className="text-stone-300 hover:text-emerald-400 text-sm transition block"
                >
                  partnerships@sautifarm.co
                </a>
              </div>

              {/* Media & Press */}
              <div 
                id="quick-contact-press"
                className="bg-[#0b1320] border border-stone-800/90 rounded-2xl p-5 space-y-1.5 hover:border-emerald-500/40 transition shadow-lg"
              >
                <h3 className="text-base font-bold text-white">
                  Media &amp; Press
                </h3>
                <a 
                  href="mailto:press@sautifarm.co" 
                  className="text-stone-300 hover:text-emerald-400 text-sm transition block"
                >
                  press@sautifarm.co
                </a>
              </div>
            </div>
          </div>

        </section>

      </div>
    </div>
  );
};
