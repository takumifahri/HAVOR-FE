"use client"

import { usePathname } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  
  // Hanya sembunyikan navbar dan footer untuk halaman tertentu berdasarkan path
  const hideNavAndFooter = pathname === '/not-found' || 
                           pathname === '/login' || 
                           pathname === '/register';

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