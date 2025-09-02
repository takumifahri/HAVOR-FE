"use client"

import AOS from 'aos';
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import Link from 'next/link';
import { ArrowLeft, Home, ChevronRight, Search, Users, MousePointer, BarChart3, Eye, Lightbulb, Zap, Palette, Handshake } from 'lucide-react';
// ...existing code...
import axios from 'axios';
import Image from 'next/image';

export default function UIUXPage() {
    const [data, setData] = useState(null);
    const [getProjects, setGetProjects] = useState([]);
    const [getArticles, setGetArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Offline data fallback
    const offlineData = {
        id: 1,
        name: "UI/UX Design",
        short_description: "We provide end-to-end UI/UX services to create intuitive, engaging, and beautiful digital experiences. Our focus is on user-centered design, ensuring your product not only looks great but also delivers a seamless and delightful journey for your users.",
        description: `User-centered design for web and mobile applications. In today's competitive market, a great product is no longer enough; it must also be a great experience. Our UI/UX services are dedicated to transforming your ideas into user-friendly and visually stunning digital products. We use a user-centered design (UCD) approach, which means we put your users at the heart of every decision. By conducting in-depth research, creating user personas, and mapping user journeys, we gain a deep understanding of your audience's needs, behaviors, and pain points. This insight allows us to design products that are not just functional but genuinely useful and enjoyable to use.

Our User Experience (UX) design process is about solving problems and optimizing the entire user journey. We start with wireframing and prototyping to build a solid foundation, ensuring the product's structure and flow are logical and efficient. We conduct usability testing to validate our designs with real users, identifying and fixing any friction points. This iterative process guarantees that the final product is easy to navigate, intuitive to use, and meets all of your users' expectations, leading to higher engagement and satisfaction.

Once the UX foundation is solid, our User Interface (UI) design team brings the product to life with visually appealing and consistent designs. We focus on creating a beautiful and cohesive look and feel that reflects your brand identity. This includes selecting the right color palettes, typography, and visual elements to craft a unique and memorable interface. Our designs are not only aesthetically pleasing but also optimized for different devices and screen sizes, ensuring a consistent experience across web and mobile platforms.

Ultimately, our goal is to help you build a product that stands out in the market. By combining thoughtful UX with captivating UI, we create digital experiences that not only attract users but also keep them coming back. Our comprehensive services cover everything from initial concept to final design delivery, providing you with a complete solution for your product's success.`,
        features: "User Research,Wireframing,Prototyping,Design Systems",
        image: "/assets/hero/ui-ux.jpg"
    };

    const offlineProjects = [
        {
            id: 1,
            title: "E-Commerce Mobile App Redesign",
            description: "Complete UI/UX redesign for a major e-commerce platform focusing on improving user engagement and conversion rates through intuitive navigation and modern visual design.",
            client_name: "TechMart",
            project_date: "2024-01-15",
            status: "completed"
        },
        {
            id: 2,
            title: "Banking Dashboard Interface",
            description: "Designed a comprehensive dashboard interface for online banking with focus on accessibility, security visualization, and streamlined user workflows.",
            client_name: "SecureBank",
            project_date: "2024-02-20",
            status: "completed"
        },
        {
            id: 3,
            title: "Healthcare Management System",
            description: "User-centered design for healthcare professionals featuring appointment scheduling, patient management, and medical records with HIPAA compliance in mind.",
            client_name: "MediCare Solutions",
            project_date: "2024-03-10",
            status: "in_progress"
        }
    ];

    const offlineArticles = [
        {
            id: 1,
            title: "The Psychology of Color in UI Design",
            short_description: "Explore how color choices impact user behavior and decision-making in digital interfaces, with practical tips for creating effective color schemes.",
            author: "Sarah Johnson",
            created_at: "2024-01-05"
        },
        {
            id: 2,
            title: "Mobile-First Design: Beyond Responsive",
            short_description: "Understanding the principles of mobile-first design and how it differs from simply making your website responsive to smaller screens.",
            author: "Michael Chen",
            created_at: "2024-02-12"
        },
        {
            id: 3,
            title: "User Research Methods That Actually Work",
            short_description: "A comprehensive guide to conducting effective user research, from planning interviews to analyzing usability testing results.",
            author: "Emily Rodriguez",
            created_at: "2024-03-08"
        }
    ];

    const getData = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/services/public`);
            const uiuxService = response.data.find(service => service.name === "UI/UX Design");
            console.log('UI/UX Service Data:', uiuxService);
            setData(uiuxService);

            // Fetch projects immediately after getting service data
            if (uiuxService && uiuxService.id) {
                await getProjectsData(uiuxService.id);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to load service data');
            // Use offline data as fallback
            setData(offlineData);
            setGetProjects(offlineProjects);
            setGetArticles(offlineArticles);
        } finally {
            setLoading(false);
        }
    }

    const getProjectsData = async (serviceId) => {
        try {
            console.log('Fetching projects for service ID:', serviceId);
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/services/public/${serviceId}/projects`);
            console.log('UI/UX Projects Response:', response.data);

            // Handle different response structures
            if (response.data && response.data.message && response.data.message.projects) {
                setGetProjects(response.data.message.projects);
            } else if (response.data && response.data.projects) {
                setGetProjects(response.data.projects);
            } else if (Array.isArray(response.data)) {
                setGetProjects(response.data);
            } else {
                console.log('No projects found in response');
                setGetProjects(offlineProjects);
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
            setGetProjects(offlineProjects);
        }
    };

    const getArticleData = async (serviceId) => {
        try {
            console.log('Fetching articles for service ID:', serviceId);
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/services/public/${serviceId}/articles`);
            console.log('UI/UX Articles Response:', response.data);

            // Handle different response structures
            if (response.data && response.data.articles && Array.isArray(response.data.articles)) {
                setGetArticles(response.data.articles);
            } else if (Array.isArray(response.data)) {
                setGetArticles(response.data);
            } else {
                console.log('No articles found in response');
                setGetArticles(offlineArticles);
            }
        } catch (error) {
            console.error('Error fetching articles:', error);
            setGetArticles(offlineArticles);
        }
    };

    useEffect(() => {
        getData();
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    // Call getArticleData when data is available and has an ID
    useEffect(() => {
        if (data && data.id) {
            getArticleData(data.id);
        }
    }, [data]);

    // Parse features for UI/UX
    const parseFeatures = (featuresString) => {
        if (!featuresString) return [];

        const featuresArray = featuresString.split(',').map(item => item.trim());

        const featureMap = {
            'User Research': {
                icon: Users,
                description: 'We conduct comprehensive user research including interviews, surveys, and usability testing to understand your target audience needs, behaviors, and pain points, ensuring design decisions are data-driven.'
            },
            'Wireframing': {
                icon: BarChart3,
                description: 'We create detailed wireframes that map out the structure and functionality of your digital products, providing a clear blueprint for layout, content hierarchy, and user flow before visual design begins.'
            },
            'Prototyping': {
                icon: MousePointer,
                description: 'We develop interactive prototypes that simulate the final product experience, allowing stakeholders to test functionality and user interactions early in the design process, reducing development risks.'
            },
            'Design Systems': {
                icon: Search,
                description: 'We build comprehensive design systems with reusable components, style guides, and design tokens that ensure consistency across all touchpoints while streamlining the design and development workflow.'
            }
        };

        return featuresArray.map(feature => ({
            name: feature,
            icon: featureMap[feature]?.icon || BarChart3,
            description: featureMap[feature]?.description || `Professional ${feature.toLowerCase()} services tailored to your business needs.`
        }));
    };

    return (
        <>
            <main className="max-w-full">
                {loading ? (
                    <div className="flex justify-center items-center h-screen">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#3768AA]"></div>
                    </div>
                ) : data ? (
                    <>
                        {/* Error notification if using offline data */}
                        {error && (
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-yellow-700">
                                            Unable to connect to server. Displaying offline content.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <section>
                            {/* Hero Section */}
                            <div
                                className="relative h-[75vh] md:h-[70vh] lg:h-[65vh] xl:h-[85vh] overflow-hidden flex items-center -mt-18"
                                style={{
                                    backgroundImage: `url(${data.image || "/assets/hero/ui-ux.jpg"})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            >
                                <div className="absolute inset-0 bg-black/70 z-0"></div>
                                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
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
                                                {data.name}
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
                                                    Start Your Design Journey
                                                </button>
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className='grid grid-cols-1 gap-16 py-16 px-4 sm:px-6 lg:px-8'>
                            {/* About UI/UX Section */}
                            <section className="">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                    <motion.div
                                        className="text-left mb-7 lg:mb-9"
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8 }}
                                    >
                                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 mb-4">
                                            Creating Exceptional User Experiences Through Strategic Design
                                        </h2>
                                    </motion.div>
                                    <motion.div
                                        className="text-justify"
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8 }}
                                    >
                                        <div className="text-sm sm:text-md md:text-md lg:text-lg font-regular text-black">
                                            {data.description.split('\n').map((paragraph, index) => (
                                                paragraph.trim() && (
                                                    <p key={index} className="mb-4">
                                                        {paragraph.trim()}
                                                    </p>
                                                )
                                            ))}
                                        </div>
                                    </motion.div>
                                </div>
                            </section>

                            {/* Features Section */}
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
                                            Our Core UI/UX Design Capabilities
                                        </h2>
                                    </motion.div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {parseFeatures(data?.features).map((feature, index) => {
                                            const IconComponent = feature.icon;
                                            return (
                                                <motion.div
                                                    key={index}
                                                    className="border-b border-gray-100 pb-6 last:border-b-0"
                                                    initial={{ opacity: 0, y: 30 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                                >
                                                    <div className="flex items-start space-x-4">
                                                        <div className="flex-shrink-0">
                                                            <div className="w-12 h-12 bg-[#3768AA]/10 rounded-lg flex items-center justify-center">
                                                                <IconComponent className="w-6 h-6 text-[#3768AA]" />
                                                            </div>
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                                {feature.name}
                                                            </h3>
                                                            <p className="text-gray-600 leading-relaxed">
                                                                {feature.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </section>

                            {/* Our Design Process */}
                            <section className="">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                    <motion.div
                                        className="text-left mb-7 lg:mb-9"
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8 }}
                                    >
                                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 mb-4">
                                            Our Proven Design Process
                                        </h2>
                                        <p className="text-sm sm:text-md md:text-md lg:text-lg text-gray-600">
                                            We follow a structured methodology that ensures every design decision is purposeful and user-centered.
                                        </p>
                                    </motion.div>

                                    {/* Discovery & Research */}
                                    <div className="mb-12">
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8 }}
                                        >
                                            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                                                <div className="w-10 h-10 bg-[#3768AA]/10 rounded-lg flex items-center justify-center mr-3">
                                                    <Eye className="w-5 h-5 text-[#3768AA]" />
                                                </div>
                                                Discovery & Research
                                            </h3>
                                            <p className="text-gray-600 mb-4 ml-13">
                                                We begin by understanding your business objectives, target audience, and competitive landscape through comprehensive research and stakeholder interviews.
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">User Interviews & Surveys</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Conducting in-depth interviews and surveys to understand user needs, pain points, and behavioral patterns.
                                                    </p>
                                                </div>
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Competitive Analysis</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Analyzing competitor products to identify opportunities and design best practices in your industry.
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Ideation & Wireframing */}
                                    <div className="mb-12">
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8 }}
                                        >
                                            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                                                <div className="w-10 h-10 bg-[#3768AA]/10 rounded-lg flex items-center justify-center mr-3">
                                                    <Lightbulb className="w-5 h-5 text-[#3768AA]" />
                                                </div>
                                                Ideation & Wireframing
                                            </h3>
                                            <p className="text-gray-600 mb-4 ml-13">
                                                Translating research insights into structural blueprints and user flow diagrams that define the optimal user journey.
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Information Architecture</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Creating logical content organization and navigation structures that make sense to your users.
                                                    </p>
                                                </div>
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Low-Fidelity Wireframes</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Developing skeletal frameworks that focus on layout, hierarchy, and functionality without visual distractions.
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Prototyping & Testing */}
                                    <div className="mb-12">
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8 }}
                                        >
                                            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                                                <div className="w-10 h-10 bg-[#3768AA]/10 rounded-lg flex items-center justify-center mr-3">
                                                    <Zap className="w-5 h-5 text-[#3768AA]" />
                                                </div>
                                                Prototyping & Testing
                                            </h3>
                                            <p className="text-gray-600 mb-4 ml-13">
                                                Building interactive prototypes to validate design concepts and gather user feedback before final implementation.
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Interactive Prototypes</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Creating clickable prototypes that simulate real user interactions and workflows.
                                                    </p>
                                                </div>
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Usability Testing</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Conducting user testing sessions to identify usability issues and optimization opportunities.
                                                    </p>
                                                </div>
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Iteration & Refinement</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Continuously improving designs based on user feedback and testing results.
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* UI Design & Visuals */}
                                    <div className="mb-12">
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8 }}
                                        >
                                            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                                                <div className="w-10 h-10 bg-[#3768AA]/10 rounded-lg flex items-center justify-center mr-3">
                                                    <Palette className="w-5 h-5 text-[#3768AA]" />
                                                </div>
                                                UI Design & Visual Identity
                                            </h3>
                                            <p className="text-gray-600 mb-4 ml-13">
                                                Crafting beautiful, accessible, and brand-consistent visual designs that engage users and drive conversions.
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Visual Design System</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Creating comprehensive design systems with components, colors, typography, and interaction patterns.
                                                    </p>
                                                </div>
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">High-Fidelity Mockups</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Developing pixel-perfect designs that accurately represent the final product appearance and functionality.
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Hand-off & Support */}
                                    <div className="mb-12">
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8 }}
                                        >
                                            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                                                <div className="w-10 h-10 bg-[#3768AA]/10 rounded-lg flex items-center justify-center mr-3">
                                                    <Handshake className="w-5 h-5 text-[#3768AA]" />
                                                </div>
                                                Hand-off & Ongoing Support
                                            </h3>
                                            <p className="text-gray-600 mb-4 ml-13">
                                                Ensuring seamless transition from design to development with comprehensive documentation and ongoing support.
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Developer Handoff</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Providing detailed specifications, assets, and documentation to ensure accurate implementation.
                                                    </p>
                                                </div>
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Post-Launch Optimization</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Monitoring user behavior and making data-driven improvements to enhance user experience continuously.
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </section>

                            {/* Projects Section */}
                            <section>
                                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                                    <motion.div
                                        className="text-left mb-7 lg:mb-9"
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8 }}
                                    >
                                        <h2 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-medium text-gray-900 mb-4">
                                            Our UI/UX Design Portfolio
                                        </h2>
                                    </motion.div>

                                    {getProjects && getProjects.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {getProjects.map((project, index) => (
                                                <motion.div
                                                    key={project.id}
                                                    className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                                                    initial={{ opacity: 0, y: 30 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                                    whileHover={{ y: -4 }}
                                                >
                                                    <div className="relative h-48 overflow-hidden">
                                                        <Image
                                                            src={"/assets/Clients/Mahkota.jpeg"}
                                                            alt={project.title}
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                            layout="fill"
                                                            objectFit="cover"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                        <div className="absolute top-3 left-0">
                                                            <div className="bg-white/90 backdrop-blur-sm rounded-r-xl px-2 py-1 shadow-md">
                                                                <span className="text-xs font-medium text-gray-800">
                                                                    {project.client_name}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="absolute top-3 right-3">
                                                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${project.status === 'completed'
                                                                ? 'bg-green-100 text-green-700'
                                                                : project.status === 'in_progress'
                                                                    ? 'bg-blue-100 text-blue-700'
                                                                    : 'bg-gray-100 text-gray-700'
                                                                }`}>
                                                                {project.status === 'completed' ? 'Completed' :
                                                                    project.status === 'in_progress' ? 'In Progress' :
                                                                        'Pending'}
                                                            </div>
                                                        </div>
                                                        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                                            <button className="w-full bg-white/90 backdrop-blur-sm text-[#3768AA] px-3 py-2 rounded-md text-sm font-medium hover:bg-white transition-colors duration-200 flex items-center justify-center gap-1">
                                                                View Design
                                                                <ChevronRight className="w-3 h-3" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="p-4">
                                                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                                            <div className="w-1 h-1 bg-[#3768AA] rounded-full"></div>
                                                            {new Date(project.project_date).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric'
                                                            })}
                                                        </div>
                                                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#3768AA] transition-colors duration-200">
                                                            {project.title}
                                                        </h3>
                                                        <p className="text-gray-600 text-xs leading-relaxed line-clamp-2 mb-3">
                                                            {project.description}
                                                        </p>
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-6 h-6 bg-[#3768AA]/10 rounded-full flex items-center justify-center">
                                                                    <Palette className="w-3 h-3 text-[#3768AA]" />
                                                                </div>
                                                                <span className="text-xs text-gray-600 font-medium">UI/UX Design</span>
                                                            </div>
                                                            <div className="text-[#3768AA] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                                <ChevronRight className="w-4 h-4" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="absolute inset-0 rounded-xl border-2 border-[#3768AA]/0 group-hover:border-[#3768AA]/20 transition-colors duration-300 pointer-events-none"></div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    ) : (
                                        <motion.div
                                            className="text-center py-12"
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8 }}
                                        >
                                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Palette className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">No Design Projects Found</h3>
                                            <p className="text-gray-600">UI/UX design projects will be displayed here once available.</p>
                                        </motion.div>
                                    )}
                                </div>
                            </section>

                            {/* Articles Section */}
                            <section>
                                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                                    <motion.div
                                        className="text-left mb-7 lg:mb-9"
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8 }}
                                    >
                                        <h2 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-medium text-gray-900 mb-4">
                                            Design Insights & Articles
                                        </h2>
                                    </motion.div>

                                    {getArticles && getArticles.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {getArticles.map((article, index) => (
                                                <motion.div
                                                    key={article.id}
                                                    className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                                                    initial={{ opacity: 0, y: 30 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                                    whileHover={{ y: -4 }}
                                                >
                                                    <div className="relative h-48 overflow-hidden">
                                                        <Image
                                                            src={"/assets/avatar.jpg"}
                                                            alt={article.title}
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                            layout="fill"
                                                            objectFit="cover"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                        <div className="absolute top-3 left-3">
                                                            <div className="bg-white/90 backdrop-blur-sm rounded-md px-2 py-1 shadow-md">
                                                                <span className="text-xs font-medium text-gray-800">
                                                                    {article.author}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="absolute top-3 right-3">
                                                            <div className="bg-[#3768AA]/90 backdrop-blur-sm rounded-md px-2 py-1 shadow-md">
                                                                <span className="text-xs font-medium text-white">
                                                                    Design Article
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                                            <button className="w-full bg-white/90 backdrop-blur-sm text-[#3768AA] px-3 py-2 rounded-md text-sm font-medium hover:bg-white transition-colors duration-200 flex items-center justify-center gap-1">
                                                                Read Article
                                                                <ChevronRight className="w-3 h-3" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="p-4">
                                                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                                            <div className="w-1 h-1 bg-[#3768AA] rounded-full"></div>
                                                            {new Date(article.created_at).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric'
                                                            })}
                                                        </div>
                                                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#3768AA] transition-colors duration-200">
                                                            {article.title}
                                                        </h3>
                                                        <p className="text-gray-600 text-xs leading-relaxed line-clamp-2 mb-3">
                                                            {article.short_description}
                                                        </p>
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-6 h-6 bg-[#3768AA]/10 rounded-full flex items-center justify-center">
                                                                    <Users className="w-3 h-3 text-[#3768AA]" />
                                                                </div>
                                                                <span className="text-xs text-gray-600 font-medium">By {article.author}</span>
                                                            </div>
                                                            <div className="text-[#3768AA] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                                <ChevronRight className="w-4 h-4" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="absolute inset-0 rounded-xl border-2 border-[#3768AA]/0 group-hover:border-[#3768AA]/20 transition-colors duration-300 pointer-events-none"></div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    ) : (
                                        <motion.div
                                            className="text-center py-12"
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8 }}
                                        >
                                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Users className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">No Design Articles Found</h3>
                                            <p className="text-gray-600">Design insights and articles will be displayed here once available.</p>
                                        </motion.div>
                                    )}
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