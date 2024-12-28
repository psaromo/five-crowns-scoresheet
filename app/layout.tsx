import './globals.css';
import { Cinzel_Decorative } from 'next/font/google';
import type { Metadata } from 'next';

const cinzelDecorative = Cinzel_Decorative({
  weight: ['400', '700', '900'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cinzelDecorative',
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
    <html lang="en" className={`${cinzelDecorative.variable}`}>
      <body className="font-cinzel m-10">
        <main className="w-full">{children}</main>
      </body>
    </html>
  );
}
