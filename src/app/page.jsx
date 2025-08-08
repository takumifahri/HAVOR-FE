'use client';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from "react";
import { motion } from 'framer-motion';
import { MoveUpRight } from 'lucide-react';
import Hero from '@/components/Landing/hero';

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <>
      {/* <Navbar /> */}
      <main className="bg-background text-foreground">
        {/* Hero Section */}
        <section>
          <Hero />
        </section>

      </main>
      {/* <Footer /> */}
    </>
  );
}
