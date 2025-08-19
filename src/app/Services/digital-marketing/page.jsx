"use client"

import AOS from 'aos';
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import Link from 'next/link';
import { ArrowLeft, Home, ChevronRight, Search, Users, MousePointer, BarChart3 } from 'lucide-react';
// ...existing code...
import axios from 'axios';
export default function DigitalMarketingPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const getData = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/services/public`);
            // Filter for just the Digital Marketing service (id: 3)
            const marketingService = response.data.find(service => service.name === "Digital Marketing");
            console.log('Marketing Service Data:', marketingService);
            setData(marketingService);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }

    // Add this function before the return statement
    const parseFeatures = (featuresString) => {
        if (!featuresString) return [];

        // Split the string by comma and trim whitespace
        const featuresArray = featuresString.split(',').map(item => item.trim());

        // Map features to objects with icons and descriptions
        const featureMap = {
            'SEO Optimization': {
                icon: Search,
                description: 'We implement comprehensive SEO strategies to enhance your website\'s visibility and search engine rankings, driving organic traffic and improving your digital footprint for sustainable growth.'
            },
            'Social Media Marketing': {
                icon: Users,
                description: 'We develop strategic social media campaigns across multiple platforms to build brand awareness, engage targeted audiences, and drive meaningful interactions that convert to measurable business outcomes.'
            },
            'PPC Campaigns': {
                icon: MousePointer,
                description: 'We design and manage data-driven pay-per-click advertising campaigns that deliver highly targeted traffic, maximize ROI, and accelerate your acquisition goals through precision targeting.'
            },
            'Analytics': {
                icon: BarChart3,
                description: 'We implement advanced analytics frameworks to track, measure, and interpret your marketing performance metrics, providing actionable insights that inform strategic decision-making and optimize campaign effectiveness.'
            },
            'Content Marketing': {
                icon: BarChart3,
                description: 'We develop comprehensive content strategies that position your brand as an industry thought leader, crafting valuable, engaging content that resonates with your target audience and drives conversion throughout the customer journey.'
            },
            'Email Marketing': {
                icon: Users,
                description: 'We create sophisticated email marketing programs that nurture leads, strengthen customer relationships, and drive revenue through personalized messaging, automation, and performance analytics.'
            },
            'Web Development': {
                icon: MousePointer,
                description: 'We build responsive, user-centric websites optimized for performance, security, and conversion, creating digital experiences that align with your brand identity and business objectives.'
            },
            'Mobile App Development': {
                icon: MousePointer,
                description: 'We design and develop innovative, scalable mobile applications for iOS and Android platforms that deliver exceptional user experiences while addressing specific business challenges and market opportunities.'
            }
        };

        return featuresArray.map(feature => ({
            name: feature,
            icon: featureMap[feature]?.icon || BarChart3,
            description: featureMap[feature]?.description || `Professional ${feature.toLowerCase()} services tailored to your business needs.`
        }));
    };
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
            <main className="max-w-full ">
                {/* Breadcrumbs */}

                {loading ? (
                    <div className="flex justify-center items-center h-screen">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#3768AA]"></div>
                    </div>
                ) : data ? (
                    <>
                        <section>
                            {/* Hero Section */}
                            <div
                                className="relative h-[75vh] md:h-[70vh] lg:h-[65vh] xl:h-[85vh] overflow-hidden flex items-center -mt-18"
                                style={{
                                    backgroundImage: `url(${data.image || "/assets/hero/digital-marketing.jpg"})`,
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
                                                {data.name || "Digital Marketing"} Powered by{' '}
                                                <span className="text-[#3768AA]">Valuable Services</span>
                                            </motion.h1>

                                            <motion.p
                                                className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed max-w-2xl"
                                                initial={{ opacity: 0, x: -50 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.8, delay: 0.2 }}
                                            >
                                                {data.short_description}
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
                        <section className='grid grid-cols-1 gap-12 py-16 px-4 sm:px-6 lg:px-8'>
                            {/* Strategy Section */}
                            <section className=" ">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                    {/* Section Header */}
                                    <motion.div
                                        className="text-left mb-7 lg:mb-9"
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8 }}
                                    >
                                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 mb-4">
                                            Drive Business Growth with Expert Digital Marketing Strategy
                                        </h2>
                                    </motion.div>

                                    {/* Strategy Cards */}
                                    <motion.div
                                        className="text-justify "
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8 }}
                                    >
                                        <p className="text-sm sm:text-md md:text-md  lg:text-lg font-regular text-black mb-4">
                                            Are you struggling to keep up with the fast-paced changes in consumer behavior and platform algorithms? This can leave your business vulnerable to competitors and hinder your growth potential.

                                            In today's digital landscape, simply jumping on the latest social media trend or running a few ads isn't enough. Without a cohesive digital marketing strategy, your investments can become fragmented and inefficient, ultimately failing to deliver the desired results. This leads to wasted resources and missed opportunities to reach the right audience. Is your organization reaching its full potential in the digital space?
                                            <br /> <br />
                                            {data.description}
                                        </p>
                                    </motion.div>
                                </div>
                            </section>
                            {/* Feature Section */}
                            <section className=''>
                                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                                    <motion.div
                                        className="text-left mb-7 lg:mb-9"
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8 }}
                                    >
                                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 mb-4">
                                            Our Featuring Comprehensive Digital Marketing Strategy Solutions
                                        </h2>
                                    </motion.div>

                                    {/* Features Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                                        {parseFeatures(data?.features).map((feature, index) => {
                                            const IconComponent = feature.icon;
                                            return (
                                                <motion.div
                                                    key={index}
                                                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#3768AA]/20"
                                                    initial={{ opacity: 0, y: 30 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                                    whileHover={{ y: -5 }}
                                                >
                                                    <div className="flex items-start space-x-4">
                                                        {/* Icon */}
                                                        <div className="flex-shrink-0">
                                                            <div className="w-12 h-12 bg-[#3768AA]/10 rounded-lg flex items-center justify-center">
                                                                <IconComponent className="w-6 h-6 text-[#3768AA]" />
                                                            </div>
                                                        </div>

                                                        {/* Content */}
                                                        <div className="flex-1">
                                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                                {feature.name}
                                                            </h3>
                                                            <p className="text-gray-600 leading-relaxed">
                                                                {feature.description}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Hover Effect Arrow */}
                                                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <ChevronRight className="w-5 h-5 text-[#3768AA] ml-auto" />
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </section>
                        </section>
                        
                    </>
                ) : (
                    <div className="flex flex-col justify-center items-center h-screen">
                        <p className="text-xl text-gray-600 mb-4">Failed to load service data</p>
                        <button
                            onClick={getData}
                            className="px-4 py-2 bg-[#3768AA] text-white rounded-md hover:bg-[#3564A4]"
                        >
                            Try Again
                        </button>
                    </div>
                )}
            </main>
        </>
    );
}