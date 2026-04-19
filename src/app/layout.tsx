import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FanPath - Smart Venue Assistant',
  description: 'Navigate your event with ease.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main style={{ paddingBottom: '80px' }}>
          {children}
        </main>
        <Navigation />
      </body>
    </html>
  );
}
