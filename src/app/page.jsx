'use client';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from "react";
import { motion } from 'framer-motion';
import { MoveUpRight } from 'lucide-react';
import Hero from '@/components/Landing/hero';
import Clients from '@/components/Landing/clients';
import VisiMisi from '@/components/Landing/Visi-Misi';

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
        {/* Strategic */}
        <section>
          <VisiMisi />
        </section>
        {/* Clients Section */}
        <section>
          <Clients />
        </section>
      </main>
      {/* <Footer /> */}
    </>
  );
}
