import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import DataPulse from '@/components/DataPulse';

export const metadata: Metadata = {
  metadataBase: new URL('https://thepiash.com'),
  title: {
    default: 'Mohammad Piash — Data Analyst in Operations',
    template: '%s · Mohammad Piash',
  },
  description:
    'Data Analyst working inside e-commerce operations. Last-mile logistics, SQL, Power BI, and process improvement at Al-Dawaa Medical Services Co.',
  keywords: [
    'data analyst portfolio',
    'operations data analyst',
    'business intelligence',
    'last mile delivery operations',
    'power bi analyst',
    'logistics technology',
  ],
  openGraph: {
    title: 'Mohammad Piash — Data Analyst in Operations',
    description: 'Data Analyst working inside e-commerce operations — SQL, Power BI, and process improvement.',
    url: 'https://thepiash.com',
    siteName: 'Mohammad Piash',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohammad Piash — Data Analyst in Operations',
    description: 'Data Analyst working inside e-commerce operations — SQL, Power BI, and process improvement.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://thepiash.com' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-obsidian text-neutral-200 font-body">
        <div className="grain" />
        <DataPulse side="left" />
        <DataPulse side="right" />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
