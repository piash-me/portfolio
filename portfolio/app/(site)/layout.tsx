import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import DataPulse from '@/components/DataPulse';

export const metadata: Metadata = {
  metadataBase: new URL('https://mohammadpiash.com'),
  title: {
    default: 'Mohammad Piash — Operations to Intelligence',
    template: '%s · Mohammad Piash',
  },
  description:
    'Operations Team Leader building toward Business Intelligence and Automation. Last-mile logistics, SLA management, Power BI, and automation projects.',
  keywords: [
    'operations manager portfolio',
    'business intelligence',
    'last mile delivery operations',
    'power bi analyst',
    'logistics technology',
  ],
  openGraph: {
    title: 'Mohammad Piash — Operations to Intelligence',
    description: 'Operations leader building toward Business Intelligence and Automation.',
    url: 'https://mohammadpiash.com',
    siteName: 'Mohammad Piash',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohammad Piash — Operations to Intelligence',
    description: 'Operations leader building toward Business Intelligence and Automation.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://mohammadpiash.com' },
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
