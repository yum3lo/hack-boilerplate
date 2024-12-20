'use client';

import Footer from './footer';
import { Header } from './header';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

function PrivateLayout({ children, title, description }: LayoutProps) {
  return (
    <>
      <title>{`${title} | App`}</title>

      <div className="relative flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="container py-6 md:py-12">{children}</div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default PrivateLayout;
