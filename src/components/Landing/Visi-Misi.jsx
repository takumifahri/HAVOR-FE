"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function VisiMisi() {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <section className="bg-gradient-to-br from-gray-50 to-white py-16 lg:py-24">
            <motion.div 
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                {/* Header */}
                <motion.div 
                    className="text-center mb-16"
                    variants={itemVariants}
                >
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                        HAVOR SMARTA DIGITAL
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#525254] to-[#3564A4] mx-auto rounded-full"></div>
                </motion.div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Image Section */}
                    <motion.div 
                        className="relative"
                        variants={itemVariants}
                    >
                        <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
                            <Image
                                src="/assets/about-us.jpg"
                                alt="Visi Misi HAVOR SMARTA DIGITAL"
                                width={600}
                                height={400}
                                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#525254]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        
                        {/* Decorative elements */}
                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#3564A4]/10 rounded-full blur-xl"></div>
                        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#919193]/10 rounded-full blur-xl"></div>
                    </motion.div>

                    {/* Content Section */}
                    <motion.div 
                        className="space-y-6 text-justify"
                        variants={itemVariants}
                    >
                        <div className="space-y-3">
                            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-tight text-left">
                                Your Partner in  <br />
                                <span className="bg-gradient-to-r from-[#525254] to-[#3564A4] bg-clip-text text-transparent"> Digital Transformation</span>
                            </h3>
                        </div>

                        <div className="space-y-3 text-gray-600 leading-relaxed">
                            <p className="text-lg">
                                We're a team of <span className="font-semibold text-gray-800">IT experts</span> dedicated to helping businesses grow with smart digital solutions.
                            </p>
                            
                            <p>
                                Since our start in <span className="font-semibold text-[#3564A4]">2010</span>, we've been building web-based information systems for small and medium-sized businesses. In <span className="font-semibold text-[#3564A4]">2019</span>, we officially became a startup company to meet the growing demand for our expertise in the e-business market.
                            </p>
                            
                            <p>
                                Today, we're your partner in digital transformation, creating <span className="font-semibold text-gray-800">tailored solutions</span> that help you reach your goals.
                            </p>
                        </div>

                        {/* CTA Button */}
                        <motion.button 
                            className="w-full md:w-auto text-center md:text-left inline-flex  items-center px-8 py-3 border bg-transparent hover:text-white hover:border-white hover:bg-gradient-to-r from-[#525254] to-[#3564A4]  border-black text-black font-medium rounded-full  transition-all duration-300 group"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Link href="/about" className="flex items-center">
                                Learn More About Us
                            </Link>
                            <svg
                                className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </motion.button>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}