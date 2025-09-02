"use client"

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Hanya sembunyikan navbar dan footer untuk halaman tertentu berdasarkan path
  const hideNavAndFooter = pathname === '/not-found' || 
                           pathname === '/login' || 
                           pathname === '/register';

  if (!isClient) {
    return (
      <>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </>
    );
  }

  if (hideNavAndFooter) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}