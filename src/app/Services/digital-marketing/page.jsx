"use client"

import AOS from 'aos';
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import Link from 'next/link';
import { ArrowLeft, Home, ChevronRight } from 'lucide-react';
import axios from 'axios';
export default function DigitalMarketingPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const getData = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}'/api/services/public`);
            // Filter for just the Digital Marketing service (id: 3)
            const marketingService = response.data.find(service => service.name === "Digital Marketing");
            setData(marketingService);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    return (
        <>
            <main className="max-w-full">
                {/* Breadcrumbs */}


                <section>
                    {/* Hero Section */}
                    <div
                        className="relative h-[75vh] md:h-[70vh] lg:h-[65vh] xl:h-[85vh] overflow-hidden flex items-center -mt-18"
                        style={{
                            backgroundImage: `url(/assets/hero/digital-marketing.jpg)`,
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
                                        <Link href="/expertises" className="text-white hover:underline">
                                            Expertises
                                        </Link>
                                    </motion.p>
                                    <motion.h1
                                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight"
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.8 }}
                                    >
                                        Digital Marketing Powered by{' '}
                                        <span className="text-[#3768AA]">Valuable Services</span>
                                    </motion.h1>

                                    <motion.p
                                        className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed max-w-2xl"
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                    >
                                        Innovation is the key to staying ahead in the digital era by focusing on our clients' needs: strategy, creative, technology, and communication. We combine innovative solutions with beneficial services to assist our clients succeed in digital transformation.
                                    </motion.p>

                                    <motion.div
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.8, delay: 0.4 }}
                                    >
                                        <button className="bg-[#3768AA] hover:bg-[#3564A4] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition duration-300 transform hover:scale-105 shadow-lg">
                                            Explore Our Solutions
                                        </button>
                                    </motion.div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                {/* Strategy Section */}
                <section className="py-12 sm:py-16 lg:py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Section Header */}
                        <motion.div
                            className="text-center mb-12 sm:mb-16"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                                Strategy
                            </h2>
                            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-[#525254] to-[#3564A4] mx-auto rounded-full"></div>
                        </motion.div>

                        {/* Strategy Cards */}
                        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                            {/* Digital Transformation Strategy */}
                            <motion.div
                                className="bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="flex items-start space-x-4 mb-4 sm:mb-6">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 sm:w-12 h-10 sm:h-12 bg-[#3768AA] rounded-lg flex items-center justify-center">
                                            <svg className="w-5 sm:w-6 h-5 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                                            Digital Transformation Strategy
                                        </h3>
                                        <div className="flex items-center text-[#3768AA]">
                                            <span className="text-xs sm:text-sm font-medium">Learn More</span>
                                            <svg className="w-3 sm:w-4 h-3 sm:h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                    Drive growth & efficiency by aligning technology with core business objectives for lasting competitive edge.
                                </p>
                            </motion.div>

                            {/* Customer Experience Strategy */}
                            <motion.div
                                className="bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300"
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="flex items-start space-x-4 mb-4 sm:mb-6">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 sm:w-12 h-10 sm:h-12 bg-[#3768AA] rounded-lg flex items-center justify-center">
                                            <svg className="w-5 sm:w-6 h-5 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                                            Customer Experience Strategy
                                        </h3>
                                        <div className="flex items-center text-[#3768AA]">
                                            <span className="text-xs sm:text-sm font-medium">Learn More</span>
                                            <svg className="w-3 sm:w-4 h-3 sm:h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                    Cultivate loyalty & advocacy through personalized journeys that boost revenue & brand value.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}