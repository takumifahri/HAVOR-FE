"use client"

import AOS from 'aos';
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import Link from 'next/link';
import {
  ArrowLeft,
  Home,
  ChevronRight,
  Search,
  Users,
  MousePointer,
  BarChart3,
  Target,
  Lightbulb,
  Code,
  Settings,
  User,
  Mail,
  Linkedin,
  Calendar,
  Award,
  Globe,
  TrendingUp
} from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('Business');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);

    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const teamCategories = [
    {
      id: 'Business',
      name: 'Business',
      icon: Target,
      description: 'Strategic leaders driving business growth and client relationships across various industries',
      members: [
        {
          name: 'Rizki Pratama',
          position: 'CEO & Founder',
          image: 'https://unsplash.com/photos/shallow-focus-photo-of-woman-in-gray-jacket-0Zx1bDv5BNY',
          description: 'Serial entrepreneur with 12+ years experience in digital transformation and business strategy. Former consultant at McKinsey & Company.',
          email: 'rizki@havor.com',
          linkedin: 'linkedin.com/in/rizkipratama'
        },
        {
          name: 'Sari Wulandari',
          position: 'Business Development Director',
          image: 'https://unsplash.com/photos/shallow-focus-photo-of-woman-in-gray-jacket-0Zx1bDv5BNY',
          description: 'Expert in strategic partnerships and market expansion with proven track record in Southeast Asian markets.',
          email: 'sari@havor.com',
          linkedin: 'linkedin.com/in/sariwulandari'
        },
        {
          name: 'Ahmad Fauzi',
          position: 'Client Success Manager',
          image: 'https://unsplash.com/photos/shallow-focus-photo-of-woman-in-gray-jacket-0Zx1bDv5BNY',
          description: 'Dedicated to ensuring exceptional client experiences with expertise in relationship management and business analysis.',
          email: 'ahmad@havor.com',
          linkedin: 'linkedin.com/in/ahmadfauzi'
        }
      ]
    },
    {
      id: 'Creative',
      name: 'Creative',
      icon: Lightbulb,
      description: 'Innovative designers and creative strategists crafting compelling brand experiences and visual storytelling',
      members: [
        {
          name: 'Maya Kusuma',
          position: 'Creative Director',
          image: 'https://unsplash.com/photos/shallow-focus-photo-of-woman-in-gray-jacket-0Zx1bDv5BNY',
          description: 'Award-winning designer with expertise in brand identity and digital experiences. Graduate from Art Center College of Design.',
          email: 'maya@havor.com',
          linkedin: 'linkedin.com/in/mayakusuma'
        },
        {
          name: 'Budi Santoso',
          position: 'Senior UI/UX Designer',
          image: 'https://unsplash.com/photos/shallow-focus-photo-of-woman-in-gray-jacket-0Zx1bDv5BNY',
          description: 'User-centric designer focused on creating intuitive digital interfaces with 8+ years experience in fintech and e-commerce.',
          email: 'budi@havor.com',
          linkedin: 'linkedin.com/in/budisantoso'
        },
        {
          name: 'Indira Sari',
          position: 'Content Strategist',
          image: 'https://unsplash.com/photos/shallow-focus-photo-of-woman-in-gray-jacket-0Zx1bDv5BNY',
          description: 'Strategic content creator driving engagement through compelling narratives across digital and traditional media.',
          email: 'indira@havor.com',
          linkedin: 'linkedin.com/in/indirasari'
        },
        {
          name: 'Eko Prasetyo',
          position: 'Motion Graphics Designer',
          image: 'https://unsplash.com/photos/shallow-focus-photo-of-woman-in-gray-jacket-0Zx1bDv5BNY',
          description: 'Specialist in motion graphics and video production with expertise in 3D animation and visual effects.',
          email: 'eko@havor.com',
          linkedin: 'linkedin.com/in/ekoprasetyo'
        }
      ]
    },
    {
      id: 'Development',
      name: 'Development',
      icon: Code,
      description: 'Technical experts building robust, scalable, and secure digital solutions using cutting-edge technologies',
      members: [
        {
          name: 'Arief Wibowo',
          position: 'Lead Developer',
          image: 'https://unsplash.com/photos/shallow-focus-photo-of-woman-in-gray-jacket-0Zx1bDv5BNY',
          description: 'Full-stack engineer with expertise in React, Node.js, and cloud architecture. Former tech lead at Gojek.',
          email: 'arief@havor.com',
          linkedin: 'linkedin.com/in/ariefwibowo'
        },
        {
          name: 'Dewi Lestari',
          position: 'Frontend Developer',
          image: 'https://unsplash.com/photos/shallow-focus-photo-of-woman-in-gray-jacket-0Zx1bDv5BNY',
          description: 'React and Vue.js specialist creating seamless user interfaces with focus on performance optimization.',
          email: 'dewi@havor.com',
          linkedin: 'linkedin.com/in/dewilestari'
        },
        {
          name: 'Fajar Nugroho',
          position: 'Backend Developer',
          image: 'https://unsplash.com/photos/shallow-focus-photo-of-woman-in-gray-jacket-0Zx1bDv5BNY',
          description: 'API architect building secure and scalable server-side solutions using PHP, Python, and Node.js.',
          email: 'fajar@havor.com',
          linkedin: 'linkedin.com/in/fajarnugroho'
        },
        {
          name: 'Rini Susanti',
          position: 'Mobile Developer',
          image: 'https://unsplash.com/photos/shallow-focus-photo-of-woman-in-gray-jacket-0Zx1bDv5BNY',
          description: 'iOS and Android specialist with expertise in React Native and Flutter for cross-platform development.',
          email: 'rini@havor.com',
          linkedin: 'linkedin.com/in/rinisusanti'
        }
      ]
    },
    {
      id: 'Operations',
      name: 'Operations',
      icon: Settings,
      description: 'Operational excellence team ensuring smooth project delivery, quality assurance, and efficient workflows',
      members: [
        {
          name: 'Hendra Wijaya',
          position: 'Operations Director',
          image: 'https://unsplash.com/photos/shallow-focus-photo-of-woman-in-gray-jacket-0Zx1bDv5BNY',
          description: 'Process optimization expert ensuring efficient project workflows with PMP certification and Lean Six Sigma expertise.',
          email: 'hendra@havor.com',
          linkedin: 'linkedin.com/in/hendrawijaya'
        },
        {
          name: 'Putri Maharani',
          position: 'Project Manager',
          image: 'https://unsplash.com/photos/shallow-focus-photo-of-woman-in-gray-jacket-0Zx1bDv5BNY',
          description: 'Agile methodology expert delivering projects on time and within budget with expertise in Scrum and Kanban.',
          email: 'putri@havor.com',
          linkedin: 'linkedin.com/in/putrimaharani'
        },
        {
          name: 'Dani Kurniawan',
          position: 'Quality Assurance Lead',
          image: 'https://unsplash.com/photos/shallow-focus-photo-of-woman-in-gray-jacket-0Zx1bDv5BNY',
          description: 'Quality champion ensuring exceptional standards in every deliverable with expertise in automated testing.',
          email: 'dani@havor.com',
          linkedin: 'linkedin.com/in/danikurniawan'
        }
      ]
    }
  ];

  const companyStats = [
    { number: 150, suffix: '+', label: 'Projects Completed' },
    { number: 85, suffix: '+', label: 'Happy Clients' },
    { number: 7, suffix: '+', label: 'Years Experience' },
    { number: 25, suffix: '+', label: 'Team Members' }
  ];

  const milestones = [
    {
      year: '2010',
      title: 'Foundation',
      description: 'Havor was founded with a mission to bridge the gap between technology and business outcomes.',
      icon: Lightbulb
    },
    {
      year: '2018',
      title: 'First Major Client',
      description: 'Secured our first enterprise client and delivered a comprehensive e-commerce platform.',
      icon: Target
    },
    {
      year: '2019',
      title: 'Team Expansion',
      description: 'Grew our team to 15 specialists across design, development, and strategy.',
      icon: Users
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description: 'Helped 50+ businesses navigate digital transformation during the pandemic.',
      icon: TrendingUp
    },
    {
      year: '2022',
      title: 'Industry Recognition',
      description: 'Received multiple awards for excellence in digital innovation and client satisfaction.',
      icon: Award
    },
    {
      year: '2024',
      title: 'Regional Expansion',
      description: 'Expanded operations across Southeast Asia with offices in Jakarta and Singapore.',
      icon: Globe
    }
  ];

  return (
    <>
      <main className="max-w-full">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#3768AA]"></div>
          </div>
        ) : (
          <>
            {/* Hero Section */}
            <section>
              <div
                className="relative h-[65vh] md:h-[60vh] lg:h-[55vh] xl:h-[65vh] overflow-hidden flex items-center -mt-18"
                style={{
                  backgroundImage: `url("/assets/about-hero.jpg")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/70 z-0"></div>

                {/* Content Container */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-left">
                      <motion.p
                        className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed max-w-2xl"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      >
                        <ArrowLeft className="inline-block mr-2" />
                        <Link href="/" className="text-white hover:underline">
                          Home
                        </Link>
                      </motion.p>
                      <motion.h1
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                      >
                        About HAVOR SMARTA DIGITAL
                      </motion.h1>

                      <motion.p
                        className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed max-w-2xl"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      >
                        Empowering businesses through innovative digital solutions and exceptional user experiences since 2010
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                      >
                        <button className="border border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition duration-300 transform hover:scale-105 shadow-lg">
                          Discover Our Journey
                        </button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className='grid grid-cols-1 gap-16 py-16 px-4 sm:px-6 lg:px-8'>
              {/* About Us Section */}
              <section className="">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <motion.div
                    className="text-center mb-7 lg:mb-9"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 mb-4">
                      Who We Are
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#525254] to-[#3564A4] mx-auto rounded-full mb-8"></div>
                  </motion.div>

                  <motion.div
                    className="text-justify"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <p className="text-sm sm:text-md md:text-md lg:text-lg font-regular text-black mb-6 leading-relaxed">
                      Havor is a leading digital agency based in Indonesia, specializing in creating innovative technology solutions that drive meaningful business transformation. Since our founding in 2010, we have been dedicated to bridging the gap between cutting-edge technology and tangible business outcomes, helping organizations across Southeast Asia thrive in the digital landscape.
                    </p>
                    <p className="text-sm sm:text-md md:text-md lg:text-lg font-regular text-black mb-6 leading-relaxed">
                      Our multidisciplinary team of 25+ experts combines strategic thinking, creative excellence, and technical expertise to deliver comprehensive digital solutions. From web and mobile development to brand identity and digital marketing, we approach every project with a commitment to quality, innovation, and measurable results that matter to our clients' bottom line.
                    </p>
                    <p className="text-sm sm:text-md md:text-md lg:text-lg font-regular text-black leading-relaxed">
                      At Havor, we believe that exceptional digital solutions are born from deep understanding of our clients' unique challenges and aspirations. We don't just build products; we craft experiences that resonate with users, drive engagement, and accelerate business growth in an increasingly competitive digital marketplace.
                    </p>
                  </motion.div>
                </div>
              </section>

              {/* Company Stats */}
              {/* <section className="bg-gradient-to-r from-[#525254] to-[#3564A4] rounded-2xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                  <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-8"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    {companyStats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <motion.div
                          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        >
                          <CountUp end={stat.number} duration={2} />
                          {stat.suffix}
                        </motion.div>
                        <p className="text-white/90 text-sm md:text-base">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </section> */}

              {/* Our History Section */}
              <section className="">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 mb-4">
                      Our Journey
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#525254] to-[#3564A4] mx-auto rounded-full mb-6"></div>
                    <p className="text-sm sm:text-md md:text-md lg:text-lg text-gray-600 max-w-3xl mx-auto">
                      From a small startup to a leading digital agency, here's how we've grown and evolved over the years.
                    </p>
                  </motion.div>

                  {/* Timeline */}
                  <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[#525254] to-[#3564A4]"></div>

                    {milestones.map((milestone, index) => {
                      const IconComponent = milestone.icon;
                      return (
                        <motion.div
                          key={index}
                          className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                            }`}
                          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                          {/* Timeline Dot */}
                          <div className="absolute left-2 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-[#3768AA] rounded-full border-4 border-white shadow-lg z-10"></div>

                          {/* Content Card */}
                          <div className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
                              <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-[#3768AA]/10 rounded-lg flex items-center justify-center mr-4">
                                  <IconComponent className="w-6 h-6 text-[#3768AA]" />
                                </div>
                                <div>
                                  <span className="text-2xl font-bold text-[#3768AA]">{milestone.year}</span>
                                  <h3 className="text-xl font-semibold text-gray-900">{milestone.title}</h3>
                                </div>
                              </div>
                              <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* Our Team Section */}
              <section className="">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 mb-4">
                      Meet Our Team
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#525254] to-[#3564A4] mx-auto rounded-full mb-6"></div>
                    <p className="text-sm sm:text-md md:text-md lg:text-lg text-gray-600 max-w-3xl mx-auto">
                      Our diverse team of experts brings together strategy, creativity, technology, and operational excellence to deliver exceptional results for our clients.
                    </p>
                  </motion.div>

                  {/* Team Section with Side Navigation */}
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Side Navigation */}
                    <motion.div
                      className="lg:w-64 flex-shrink-0"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Departments</h3>
                        <div className="space-y-2">
                          {teamCategories.map((category) => {
                            const IconComponent = category.icon;
                            return (
                              <button
                                key={category.id}
                                onClick={() => setActiveTab(category.id)}
                                className={`w-full flex items-center space-x-3 p-3 rounded-lg font-medium transition-all duration-200 text-left ${activeTab === category.id
                                  ? 'bg-[#3768AA] text-white shadow-md'
                                  : ' text-gray-700 hover:bg-gray-100'
                                  }`}
                              >
                                <IconComponent className="w-5 h-5 flex-shrink-0" />
                                <span className="text-sm">{category.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>

                    {/* Tab Content */}
                    <div className="flex-1">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        {teamCategories.map((category) => {
                          if (category.id !== activeTab) return null;

                          return (
                            <div key={category.id}>
                              {/* Category Description */}
                              <div className="mb-8">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                  {category.name} Team
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                  {category.description}
                                </p>
                              </div>

                              {/* Team Members Grid */}
                              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                {category.members.map((member, index) => (
                                  <motion.div
                                    key={index}
                                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}

                                  >
                                    {/* Member Image */}
                                    <div className="relative h-40 bg-gray-200">
                                      <Image
                                        src={"/assets/avatar.jpg"}
                                        alt={member.name}
                                        fill
                                        className="object-cover transition-transform duration-500 hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-t from-[#3768AA]/20 to-transparent"></div>
                                      <div className="absolute bottom-3 left-3 right-3">
                                        <h4 className="text-white font-semibold text-base mb-1">
                                          {member.name}
                                        </h4>
                                        <p className="text-white/90 text-xs">
                                          {member.position}
                                        </p>
                                      </div>
                                    </div>

                                    {/* Member Info */}
                                    <div className="p-4">
                                      <p className="text-gray-600 text-xs leading-relaxed mb-3 line-clamp-3">
                                        {member.description}
                                      </p>

                                      {/* Contact Info */}
                                      <div className="flex items-center justify-between text-xs text-gray-500">
                                        <div className="flex items-center space-x-1 hover:text-[#3768AA] cursor-pointer">
                                          <Mail className="w-3 h-3" />
                                          <span>Email</span>
                                        </div>
                                        <div className="flex items-center space-x-1 hover:text-[#3768AA] cursor-pointer">
                                          <Linkedin className="w-3 h-3" />
                                          <span>LinkedIn</span>
                                        </div>
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </motion.div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Values Section */}
              <section className=" rounded-2xl py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 mb-4">
                      Our Values
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#525254] to-[#3564A4] mx-auto rounded-full"></div>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                      {
                        icon: Target,
                        title: 'Excellence',
                        description: 'We strive for perfection in every project, ensuring exceptional quality and measurable results for our clients.'
                      },
                      {
                        icon: Users,
                        title: 'Collaboration',
                        description: 'We believe in the power of teamwork and transparent communication with our clients and partners.'
                      },
                      {
                        icon: Lightbulb,
                        title: 'Innovation',
                        description: 'We embrace emerging technologies and creative approaches to solve complex business challenges.'
                      },
                      {
                        icon: BarChart3,
                        title: 'Growth',
                        description: 'We are committed to continuous learning and helping our clients achieve sustainable digital transformation.'
                      }
                    ].map((value, index) => {
                      const IconComponent = value.icon;
                      return (
                        <motion.div
                          key={index}
                          className="text-center"
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                          <div className="w-16 h-16 bg-[#3768AA] rounded-full flex items-center justify-center mx-auto mb-4">
                            <IconComponent className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            {value.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {value.description}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </section>
            </section>
          </>
        )}
      </main>
    </>
  );
}