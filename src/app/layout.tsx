import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';
import Head from 'next/head';
import {
  ClerkProvider,
} from '@clerk/nextjs';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title:
    'GovtJobsPortal | Latest Government Job Notifications, Results & Admit Cards',
  description:
    'Stay updated with the latest government job notifications, application deadlines, admit cards, and results. GovtJobsPortal provides real-time updates on Sarkari Naukri, PSU jobs, railway jobs, bank jobs, and more. Apply now & never miss an opportunity!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <Head>
          <title>GovtJobsPortal | Job Board</title>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Merriweather:wght@700&display=swap'
          />
        </Head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Analytics />
          <SpeedInsights />
          {/* <header className='flex justify-end items-center p-4 gap-4 h-16'>
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header> */}
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
