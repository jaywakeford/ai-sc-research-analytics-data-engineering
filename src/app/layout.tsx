import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Research & Supply Chain Analytics Portfolio',
  description: 'Showcasing research papers and supply chain analytics projects',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.className} dark`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900">
        <nav className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold gradient-text">
                  Portfolio
                </Link>
                <div className="hidden md:block ml-10">
                  <div className="flex items-center space-x-4">
                    <Link href="/research" 
                          className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Research Papers
                    </Link>
                    <Link href="/supply-chain" 
                          className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Supply Chain & Analytics
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
} 