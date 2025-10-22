import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Sun, Moon } from 'lucide-react';
import DotBackground from '@/components/ui/dot-background';

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function MainLayout({
  children,
  title = 'CS2 Autoexec Generator',
  description = 'Generate custom Counter-Strike 2 autoexec.cfg files with an easy-to-use interface. Configure binds, crosshair, HUD, and more.',
}: MainLayoutProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    setIsMounted(true);
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  }, []);

  // Toggle between light and dark mode
  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <section className="min-h-screen bg-[#1B1B1B] text-foreground antialiased relative overflow-hidden">
      {/* Removed texture/gradient overlays to reflect solid retro palette */}
      <NextSeo
        title={title}
        description={description}
        canonical="https://cs2autoexec.com"
        openGraph={{
          url: 'https://cs2autoexec.com',
          title: title,
          description: description,
          images: [
            {
              url: '/images/og-image.jpg',
              width: 1200,
              height: 630,
              alt: 'CS2 Autoexec Generator',
            },
          ],
          siteName: 'CS2 Autoexec Generator',
        }}
        twitter={{
          handle: '@cs2autoexec',
          site: '@cs2autoexec',
          cardType: 'summary_large_image',
        }}
      />
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1a1a1a" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <DotBackground />

      <div className="flex min-h-screen flex-col font-ui text-foreground">
        {/* Removed header and nav per user request */}
        <main className="flex-1 bg-[#1B1B1B] text-white pb-8 md:pb-12">
          <section className="w-full">
            <div className="relative z-10 font-ui">
               {/* Main Content */}
               {children}
             </div>
          </section>
        </main>
        
        <footer className="border-t border-[#889180] bg-[#1B1B1B] py-6">
          <div className="container px-4">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-center text-sm text-[#A0AA95] md:text-left">
                &copy; {new Date().getFullYear()} CS2 Autoexec Generator. Built with Next.js and TypeScript.
              </p>
              <div className="flex gap-6">
                <a 
                  href="https://github.com/sLix1337x" 
                  className="text-sm font-medium text-[#A0AA95] transition-colors hover:text-white" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a 
                  href="/privacy" 
                  className="text-sm font-medium text-[#A0AA95] transition-colors hover:text-white"
                >
                  Privacy
                </a>
                <a 
                  href="/terms" 
                  className="text-sm font-medium text-[#A0AA95] transition-colors hover:text-white"
                >
                  Terms
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
      
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkMode ? 'dark' : 'light'}
        toastClassName="bg-background/95 border border-border/50 backdrop-blur-sm dark:bg-background/95 dark:border-border/50"
        progressStyle={{
          background: 'hsl(var(--primary))',
        }}
        className="[--toastify-color-light:theme(colors.background)] [--toastify-color-dark:theme(colors.background)] [--toastify-text-color-light:theme(colors.foreground)] [--toastify-text-color-dark:theme(colors.foreground)]"
      />
    </section>
  );
};
