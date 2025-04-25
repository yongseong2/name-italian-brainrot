import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  preload: true,
});

export const metadata: Metadata = {
  title: '이탈리안 브레인롯 이름 생성기',
  description: '이탈리안 브레인롯 이름 생성기',
  icons: {
    icon: '/logo.webp',
    apple: '/logo.webp',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko' className={notoSansKr.className}>
      <body>{children}</body>
    </html>
  );
}
