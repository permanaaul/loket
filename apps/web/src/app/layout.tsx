import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ClientProvider from '@/components/ClientProvider';
import SessionProvider from '@/components/SessionProvider'; // Impor SessionProvider
import { metadata } from './metadata'; // Impor metadata

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProvider>
          <SessionProvider>
            <Header />
            <main className="container mx-auto py-8">{children}</main>
            <Footer />
          </SessionProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
