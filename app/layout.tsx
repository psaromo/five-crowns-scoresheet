import './globals.css';
import { Cinzel_Decorative } from 'next/font/google';
import type { Metadata } from 'next';
import Image from 'next/image';

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
      <body className="font-cinzel m-10">
        <div className="flex flex-col items-center justify-center space-y-5 my-10">
          <div className="font-bold text-3xl text-center">Five Crowns Scoresheet</div>
          <Image alt="five-crowns-logo" src={'/five-crowns-logo.jpg'} width={300} height={100} />
        </div>
        <div className="w-full">{children}</div>
      </body>
    </html>
  );
}
