import './globals.css';
import { Cinzel_Decorative } from 'next/font/google';
import type { Metadata } from 'next';
import Link from 'next/link';
import Logo from '@/components/Logo';

const cinzelDecorative = Cinzel_Decorative({
  weight: ['400', '700', '900'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cinzelDecorative',
});

export const metadata: Metadata = {
  title: 'Five Crowns Scoresheet',
  description: 'Five Crowns Score Calculator',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cinzelDecorative.variable}`}>
      <body className="font-cinzel">
        <div className="flex flex-col min-h-screen m-10">
          <div className="flex flex-col justify-center items-center space-y-8">
            <div className="font-bold text-5xl text-center">Five Crowns Scoresheet</div>
            <Link href="/">
              <Logo />
            </Link>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
