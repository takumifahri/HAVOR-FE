"use client";

import { motion } from "framer-motion";
import {
    BarChart3,
    Lightbulb,
    Code,
    MessageCircle,
    Target,
    Users,
    TrendingUp,
    Palette,
    Smartphone,
    Search,
    Share2,
    Megaphone
} from "lucide-react";

export default function CoreServicePillars() {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.2
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

    const pillars = [
        {
            title: "Strategy",
            icon: BarChart3,
            description: "We provide strategic guidance and data-driven insights to help you achieve your digital goals. We ensure every digital investment aligns with your core business objectives, building a solid foundation for sustainable growth.",
            services: [
                {
                    name: "Digital & IT Advisory",
                    icon: Target,
                    description: "We partner with your leadership to define a comprehensive digital strategy, identifying opportunities and planning technology implementation to drive business value."
                },
                {
                    name: "UX & Market Research",
                    icon: Users,
                    description: "We conduct in-depth research into your target audience and the market landscape to ensure the solutions we build are truly relevant and user-centric."
                },
                {
                    name: "Monitoring & Analytics",
                    icon: TrendingUp,
                    description: "We track the performance of your digital solutions in real time, using data to identify areas for optimization and ensure you get maximum ROI."
                }
            ]
        },
        {
            title: "Creative",
            icon: Lightbulb,
            description: "We are expert storytellers, crafting unique brand experiences that resonate with your audience on an emotional level. We transform ideas into engaging content that builds trust and drives action.",
            services: [
                {
                    name: "Brand Development",
                    icon: Palette,
                    description: "We create a memorable brand identity that stands out, from a unique logo to a consistent brand voice."
                },
                {
                    name: "UI/UX Design",
                    icon: Palette,
                    description: "Our designs are not just visually appealing; they are intuitive and functional, providing a seamless and delightful user journey."
                },
                {
                    name: "Content Creation",
                    icon: Lightbulb,
                    description: "We produce compelling and relevant content—from articles and infographics to social media posts—to drive engagement and conversions."
                },
                {
                    name: "Videography",
                    icon: Lightbulb,
                    description: "We create professional and impactful videos, from brand stories to promotional campaigns, that deliver your message dynamically and leave a lasting impression."
                }
            ]
        },
        {
            title: "Technology",
            icon: Code,
            description: "We build high-performance, scalable, and secure digital solutions. Our development team leverages the latest technologies to create products that are robust, future-proof, and engineered for growth.",
            services: [
                {
                    name: "iOS and Android Development",
                    icon: Smartphone,
                    description: "We build top-tier mobile apps that provide a flawless native or cross-platform experience."
                },
                {
                    name: "Web Development",
                    icon: Code,
                    description: "We craft advanced websites and web applications, ensuring superior user experiences and optimal performance."
                },
                {
                    name: "E-commerce Solutions",
                    icon: Code,
                    description: "We design and develop online stores optimized for maximum sales, complete with secure payment integrations and intuitive product management features."
                },
                {
                    name: "SEO",
                    icon: Search,
                    description: "We optimize your digital properties to achieve top rankings on Google and other search engines, driving high-quality organic traffic and boosting your visibility."
                }
            ]
        },
        {
            title: "Communication",
            icon: MessageCircle,
            description: "We plan and execute integrated digital marketing campaigns that deliver measurable results by reaching the right audience at the right time.",
            services: [
                {
                    name: "Social Media Management",
                    icon: Share2,
                    description: "We build a strong brand presence on social platforms, manage your community, and run campaigns that boost brand awareness and engagement."
                },
                {
                    name: "Digital Advertising",
                    icon: Megaphone,
                    description: "We manage targeted ad campaigns across various platforms (like Google Ads and social media) to optimize spending and generate qualified leads."
                },
                {
                    name: "Influencer Marketing",
                    icon: Users,
                    description: "We connect you with credible and relevant influencers to expand your brand's reach and build trust with new audiences."
                }
            ]
        }
    ];

    return (
        <section className="">
            <motion.div
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    variants={itemVariants}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Our Core Service Pillars
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#525254] to-[#3564A4] mx-auto rounded-full"></div>
                </motion.div>

                {/* Pillars Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {pillars.map((pillar, index) => {
                        const PillarIcon = pillar.icon;
                        return (
                            <motion.div
                                key={index}
                                className="rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
                                variants={itemVariants}
                            >
                                {/* Pillar Header */}
                                <div className="flex items-center mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-r from-[#525254] to-[#3564A4] rounded-xl flex items-center justify-center mr-4">
                                        <PillarIcon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">{pillar.title}</h3>
                                </div>

                                {/* Pillar Description */}
                                <p className="text-gray-600 mb-8 font-regular text-md leading-relaxed">
                                    {pillar.description}
                                </p>

                            </motion.div>
                        );
                    })}
                </div>

                {/* CTA Section */}
                <motion.div
                    className="text-center mt-16"
                    variants={itemVariants}
                >
                    <motion.button
                        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#525254] to-[#3564A4] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Start Your Digital Journey
                        <svg
                            className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </motion.button>
                </motion.div>
            </motion.div>
        </section>
    );
}