import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import PrimaryNavigation from '@/components/PrimaryNavigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://fanpath-demo.vercel.app'),
  title: {
    default: 'FanPath | Smart Venue Assistant',
    template: '%s | FanPath',
  },
  description:
    'FanPath helps event attendees find the best gate, avoid congestion, and discover the fastest venue amenities with Gemini-powered guidance.',
  applicationName: 'FanPath',
  keywords: ['smart venue assistant', 'stadium navigation', 'gemini ai', 'google maps', 'accessibility routing'],
  openGraph: {
    title: 'FanPath | Smart Venue Assistant',
    description: 'A context-aware venue assistant for route optimization, live alerts, and attendee support.',
    siteName: 'FanPath',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FanPath | Smart Venue Assistant',
    description: 'Context-aware stadium routing powered by Google Maps and Gemini.',
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <main id="main-content" style={{ paddingBottom: '80px' }}>
          {children}
        </main>
        <PrimaryNavigation />
      </body>
    </html>
  );
}
