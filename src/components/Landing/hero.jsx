"use client";
import AOS from 'aos';
import { useEffect } from "react";
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

export default function Hero() {
    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    return (
        <>
            {/* Hero Section */}
            <div
                className="relative min-h-[65dvh] overflow-hidden -mt-18"
                style={{
                    backgroundImage: `url(/assets/wpp.svg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                {/* Content Container */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                    {/* Desktop Layout */}
                    <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
                        {/* Left Content */}
                        <div className="text-left">
                            <h1 className="text-xl lg:text-2xl xl:text-6xl font-bold text-white mb-6">
                                Unlock Your Business Potential with Digital Transformation
                            </h1>
                            <p className="text-xl text-white mb-8 max-w-2xl">
                                Havor Digital Tech is a leading Indonesian digital agency, driving proven results in technology and marketing for enterprise clients.
                            </p>
                            <button className="bg-[#3768AA] hover:bg-[#3564A4] text-white px-8 py-3 rounded-lg font-medium transition duration-200">
                                Explore Our Solutions
                            </button>
                        </div>

                        {/* Right Content - Laptop Image */}
                        <div
                            className="flex justify-end"
                            data-aos="fade-left" // AOS animation from right to left
                        >
                            <motion.div
                                className="relative w-full max-w-lg"
                                animate={{
                                    y: [0, -10, 0], // Floating effect
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                }}
                            >
                                <img
                                    src="/assets/laptop.svg"
                                    alt="Digital Technology Laptop"
                                    className="w-full h-auto object-contain"
                                />
                            </motion.div>
                        </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="lg:hidden flex flex-col min-h-[80dvh] pt-8">
                        {/* Mobile Laptop Image */}
                        <div
                            className="flex justify-center mt-14 mb-2"
                            data-aos="fade-left" // AOS animation from right to left
                        >
                            <motion.div
                                className="relative w-full max-w-sm"
                                animate={{
                                    y: [0, -10, 0], // Floating effect
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                }}
                            >
                                <img
                                    src="/assets/laptop.svg"
                                    alt="Digital Technology Laptop"
                                    className="w-full h-auto object-contain"
                                />
                            </motion.div>
                        </div>
                        {/* Mobile Content */}
                        <div className="text-center flex-1 flex flex-col justify-center px-2">
                            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
                                Unlock Your Business Potential with Digital Transformation
                            </h1>
                            <p className="text-lg text-white mb-8 max-w-md mx-auto leading-relaxed">
                                Havor Digital Tech is a leading Indonesian digital agency, driving proven results in technology and marketing for enterprise clients.
                            </p>
                            <button className="bg-[#3768AA] hover:bg-[#3564A4] text-white px-6 py-3 rounded-lg font-medium transition duration-200 mx-auto">
                                Explore Our Solutions
                            </button>
                        </div>
                    </div>

                    {/* Stats Section - Different layouts for desktop and mobile */}
                    {/* Desktop Stats */}
                    <div className="hidden lg:grid lg:grid-cols-4 gap-4 xl:gap-8 -mt-3 xl:-mt-5">
                        <div className="text-center space-y-1">
                            <div className="text-xl xl:text-2xl 2xl:text-4xl font-bold text-white">
                                <CountUp end={2010} duration={2} />
                            </div>
                            <div className="text-white text-sm xl:text-base">Stand since</div>
                        </div>
                        <div className="text-center space-y-1">
                            <div className="text-xl xl:text-2xl 2xl:text-4xl font-bold text-white">
                                <CountUp end={900} duration={2} suffix="+" />
                            </div>
                            <div className="text-white text-sm xl:text-base">Digital Projects</div>
                        </div>
                        <div className="text-center space-y-1">
                            <div className="text-xl xl:text-2xl 2xl:text-4xl font-bold text-white">
                                <CountUp end={150} duration={2} suffix="+" />
                            </div>
                            <div className="text-white text-sm xl:text-base">Satisfied Clients</div>
                        </div>
                        <div className="text-center space-y-1">
                            <div className="text-xl xl:text-2xl 2xl:text-4xl font-bold text-white">
                                <CountUp end={200} duration={2} suffix="+" />
                            </div>
                            <div className="text-white text-sm xl:text-base">Digital Experts</div>
                        </div>
                    </div>

                    {/* Mobile and Tablet Stats */}
                    <div className="lg:hidden grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-3 mb-5 px-2 sm:px-4">
                        <div className="text-center space-y-1">
                            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                                <CountUp end={16} duration={2} suffix="+" />
                            </div>
                            <div className="text-white text-xs sm:text-sm md:text-base">Years of Excellence</div>
                        </div>
                        <div className="text-center space-y-1">
                            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                                <CountUp end={900} duration={2} suffix="+" />
                            </div>
                            <div className="text-white text-xs sm:text-sm md:text-base">Digital Projects</div>
                        </div>
                        <div className="text-center space-y-1">
                            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                                <CountUp end={150} duration={2} suffix="+" />
                            </div>
                            <div className="text-white text-xs sm:text-sm md:text-base">Satisfied Clients</div>
                        </div>
                        <div className="text-center space-y-1">
                            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                                <CountUp end={200} duration={2} suffix="+" />
                            </div>
                            <div className="text-white text-xs sm:text-sm md:text-base">Digital Experts</div>
                        </div>
                    </div>
                </div>

                {/* Background Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/20 z-0"></div>
            </div>
        </>
    );
}