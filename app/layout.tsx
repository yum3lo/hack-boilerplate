import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Toaster } from '@/components/ui/sonner';
import { ReduxProvider } from '@/lib/store/provider';
import { cn } from '@/lib/utils';
import Snow from "@/components/ui/Snow"
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hack boilerplate',
  description: 'This is a description',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className)}>
        
        <ReduxProvider>{children} <Snow /></ReduxProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
