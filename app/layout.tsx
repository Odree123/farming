import './globals.css';
import { Metadata, Viewport } from 'next';
import { Providers } from '@/app/providers';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'SautiFarm - Kenyan Agricultural AI Assistant',
  description: 'Multi-channel agricultural AI assistant for Kenyan smallholder and commercial farmers in Swahili, Kikuyu, Luo, Luhya, Kalenjin, Kamba & Somali.',
  openGraph: {
    title: 'SautiFarm - Multi-Channel Agricultural AI for Kenyan Farmers',
    description: 'Instant crop disease diagnosis, voice Bwana Shamba advisory, live Kenya market prices, and KEPHIS certified inputs shop.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#16a34a',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const initialLanguage = (cookieStore.get('sautifarm_lang')?.value || 'sw') as 'sw' | 'en' | 'ki' | 'luo' | 'luh' | 'kal' | 'kam' | 'som';

  return (
    <html lang={initialLanguage} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-saf-200">
        <Providers initialLanguage={initialLanguage}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
