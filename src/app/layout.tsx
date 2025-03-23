import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';

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
    'GovtJobAlerts | Latest Government Job Notifications, Results & Admit Cards',
  description:
    'Stay updated with the latest government job notifications, application deadlines, admit cards, and results. GovtJobAlerts provides real-time updates on Sarkari Naukri, PSU jobs, railway jobs, bank jobs, and more. Apply now & never miss an opportunity!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <title>GovtJobsPortal | Job Board</title>
        <Script
          strategy='afterInteractive'
          src='https://www.googletagmanager.com/gtag/js?id=G-5FXYJZLD3J'
        />
        <Script
          id='google-analytics'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-5FXYJZLD3J');
            `,
          }}
        />
        <Script
          id='hotjar'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
              (function (c, s, q, u, a, r, e) {
                c.hj=c.hj||function(){(c.hj.q=c.hj.q||[]).push(arguments)};
                c._hjSettings = { hjid: a };
                r = s.getElementsByTagName('head')[0];
                e = s.createElement('script');
                e.async = true;
                e.src = q + c._hjSettings.hjid + u;
                r.appendChild(e);
              })(window, document, 'https://static.hj.contentsquare.net/c/csq-', '.js', 5347775);
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
