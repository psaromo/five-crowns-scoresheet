import './globals.css';
import { Playfair_Display } from 'next/font/google';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

const playfair_display = Playfair_Display({
  weight: ['400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfairDisplay',
});

export const metadata: Metadata = {
  title: 'Five Crowns Scoresheet Calculator',
  description:
    'Eliminate the hassle of manual scorekeeping with the Five Crowns Scoresheet Calculator! Effortlessly track scores for up to 21 players (three deck sets) and enjoy seamless gameplay that lets you focus on the fun.',
  keywords: [
    'Five Crowns',
    'Five Crowns Scoresheet',
    'Five Crowns Scoresheet Calculator',
    'Five Crowns Score Calculator',
    'Five Crowns card game',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={playfair_display.variable}>
      <body className="font-playfairDisplay m-10">
        <main className="w-full">{children}</main>
      </body>
    </html>
  );
}
