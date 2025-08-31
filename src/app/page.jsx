'use client';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from "react";
import { motion } from 'framer-motion';
import { MoveUpRight } from 'lucide-react';
import Hero from '@/components/Landing/hero';
import Clients from '@/components/Landing/clients';
import VisiMisi from '@/components/Landing/Visi-Misi';
import CoreServicePillars from '@/components/Landing/service-pillars';
import ProjectsLanding from '@/components/Landing/projects';
import ArticleSection from '@/components/Landing/article';

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
        <section>
          <CoreServicePillars />
        </section>
        {/* Clients Section */}
        <section>
          <Clients />
        </section>
        {/* Projedt yg udah pernah */}
        <section>
          <ProjectsLanding  />
        </section>
        <section>
          <ArticleSection />
        </section>
      </main>
      {/* <Footer /> */}
    </>
  );
}
