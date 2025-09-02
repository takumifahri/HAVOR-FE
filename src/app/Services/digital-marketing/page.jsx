"use client"

import AOS from 'aos';
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import Link from 'next/link';
import { ArrowLeft, Home, ChevronRight, Search, Users, MousePointer, BarChart3, Eye, Lightbulb, Zap, Palette, Handshake, TrendingUp, Target, PenTool, Share2, Mail, Globe } from 'lucide-react';
// ...existing code...
import axios from 'axios';
import Image from 'next/image';

export default function DigitalMarketingPage() {
    const [data, setData] = useState(null);
    const [getProjects, setGetProjects] = useState([]);
    const [getArticles, setGetArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Offline data fallback
    const offlineData = {
        id: 3,
        name: "Digital Marketing",
        short_description: "We offer comprehensive digital marketing services to help your business grow online. From increasing brand visibility to driving qualified leads, our strategies are designed to boost your presence, engage your target audience, and achieve measurable results.",
        description: `In today's competitive online landscape, a powerful digital presence is non-negotiable for business success. Our digital marketing services are tailored to help you navigate this space effectively and connect with your ideal customers. We develop and execute a holistic strategy that covers all key areas of online promotion, ensuring your brand message is consistent and impactful across various channels. Our goal is to not only build brand awareness but also to generate tangible returns on your investment.

We specialize in a range of services designed to meet your specific needs. Our Search Engine Optimization (SEO) strategies improve your website's ranking on Google and other search engines, driving organic traffic and positioning you as a trusted authority in your industry. For immediate results, our Pay-Per-Click (PPC) campaigns provide targeted advertising that gets your brand in front of potential customers at the right moment. We manage everything from keyword research to ad creation, ensuring your ad spend is optimized for maximum conversion.

Beyond search, we help you build meaningful relationships with your audience through social media marketing and content marketing. We create engaging content and manage your social media presence to foster community and loyalty. By sharing valuable content—from blog posts and videos to infographics—we establish your brand as a go-to resource, which in turn drives traffic and boosts conversions. Our data-driven approach means every campaign is continuously monitored and optimized, ensuring we're always working towards your business goals.

Ultimately, our digital marketing services are about delivering measurable growth. We provide clear reports and analytics so you can see the direct impact of our work on your bottom line. Partner with us to create a powerful online presence that not only attracts new customers but also builds lasting relationships, ensuring your business thrives in the digital age.`,
        features: "SEO Optimization,Social Media Marketing,PPC Campaigns,Analytics",
        image: "/assets/hero/digital-marketing.jpg"
    };

    const offlineProjects = [
        {
            id: 1,
            title: "E-commerce SEO Optimization",
            description: "Complete SEO strategy implementation for an e-commerce platform, resulting in 300% increase in organic traffic and 150% boost in online sales within 6 months.",
            client_name: "TechStore Online",
            project_date: "2024-01-20",
            status: "completed"
        },
        {
            id: 2,
            title: "Multi-Platform Social Media Campaign",
            description: "Comprehensive social media marketing campaign across Facebook, Instagram, and LinkedIn, achieving 250% follower growth and 180% engagement increase.",
            client_name: "FashionForward",
            project_date: "2024-02-15",
            status: "completed"
        },
        {
            id: 3,
            title: "PPC Campaign for SaaS Platform",
            description: "Strategic Google Ads and Facebook Ads campaign for B2B SaaS company, generating 400% ROI and reducing cost-per-acquisition by 45%.",
            client_name: "CloudTech Solutions",
            project_date: "2024-03-10",
            status: "in_progress"
        }
    ];

    const offlineArticles = [
        {
            id: 1,
            title: "SEO Trends to Watch in 2024",
            short_description: "Comprehensive guide to the latest SEO trends and algorithm updates, covering Core Web Vitals, AI-powered search, and voice search optimization strategies.",
            author: "Maria Santos",
            created_at: "2024-01-12"
        },
        {
            id: 2,
            title: "Social Media ROI: Measuring Success",
            short_description: "Essential metrics and KPIs for measuring social media marketing success, including engagement rates, conversion tracking, and attribution modeling.",
            author: "Alex Thompson",
            created_at: "2024-02-18"
        },
        {
            id: 3,
            title: "PPC Campaign Optimization Strategies",
            short_description: "Advanced techniques for optimizing pay-per-click campaigns, including bid strategies, ad copy testing, and landing page optimization best practices.",
            author: "Jennifer Lee",
            created_at: "2024-03-14"
        }
    ];

    const getData = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/services/public`);
            const digitalMarketingService = response.data.find(service => service.name === "Digital Marketing");
            console.log('Digital Marketing Service Data:', digitalMarketingService);
            setData(digitalMarketingService);

            // Fetch projects immediately after getting service data
            if (digitalMarketingService && digitalMarketingService.id) {
                await getProjectsData(digitalMarketingService.id);
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
            console.log('Digital Marketing Projects Response:', response.data);

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
            console.log('Digital Marketing Articles Response:', response.data);

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

    // Parse features for Digital Marketing
    const parseFeatures = (featuresString) => {
        if (!featuresString) return [];

        const featuresArray = featuresString.split(',').map(item => item.trim());

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
                icon: Target,
                description: 'We design and manage data-driven pay-per-click advertising campaigns that deliver highly targeted traffic, maximize ROI, and accelerate your acquisition goals through precision targeting.'
            },
            'Analytics': {
                icon: BarChart3,
                description: 'We implement advanced analytics frameworks to track, measure, and interpret your marketing performance metrics, providing actionable insights that inform strategic decision-making and optimize campaign effectiveness.'
            }
        };

        return featuresArray.map(feature => ({
            name: feature,
            icon: featureMap[feature]?.icon || TrendingUp,
            description: featureMap[feature]?.description || `Professional ${feature.toLowerCase()} services tailored to your digital marketing needs.`
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
                                    backgroundImage: `url(${data.image || "/assets/hero/digital-marketing.jpg"})`,
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
                                                className="text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight"
                                                initial={{ opacity: 0, x: -50 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.8 }}
                                            >
                                                {data.name} Powered by{' '}
                                                <span className="text-[#3768AA]">Data-Driven Strategy</span>
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
                                                <button className="bg-transparent border border-white  hover:bg-gradient-to-r from-[#3768AA] to-[#3564A4] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition duration-300 transform hover:scale-105 shadow-lg">
                                                    Boost Your Digital Presence
                                                </button>
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className='grid grid-cols-1 gap-16 py-16 px-4 sm:px-6 lg:px-8'>
                            {/* About Digital Marketing Section */}
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
                                            Drive Business Growth with Expert Digital Marketing Strategy
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
                                            Our Comprehensive Digital Marketing Solutions
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

                            {/* Digital Marketing Process */}
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
                                            Our Strategic Digital Marketing Process
                                        </h2>
                                        <p className="text-sm sm:text-md md:text-md lg:text-lg text-gray-600">
                                            We follow a data-driven methodology to ensure maximum ROI and sustainable growth for your business.
                                        </p>
                                    </motion.div>

                                    {/* Discovery & Analysis */}
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
                                                Discovery & Market Analysis
                                            </h3>
                                            <p className="text-gray-600 mb-4 ml-13">
                                                We begin with comprehensive market research and competitor analysis to understand your industry landscape and identify opportunities.
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Target Audience Research</h4>
                                                    <p className="text-sm text-gray-600">
                                                        In-depth analysis of your target demographics, behaviors, and preferences to create detailed buyer personas.
                                                    </p>
                                                </div>
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Competitive Intelligence</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Comprehensive competitor analysis to identify market gaps and opportunities for differentiation.
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Strategy Development */}
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
                                                Strategy Development & Planning
                                            </h3>
                                            <p className="text-gray-600 mb-4 ml-13">
                                                Creating customized digital marketing strategies that align with your business objectives and target audience insights.
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Channel Strategy</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Selecting optimal digital channels and platforms based on audience behavior and business goals.
                                                    </p>
                                                </div>
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Content Planning</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Developing comprehensive content calendars and messaging frameworks for consistent brand communication.
                                                    </p>
                                                </div>
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Budget Allocation</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Strategic budget distribution across channels to maximize ROI and achieve optimal results.
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Campaign Implementation */}
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
                                                Campaign Implementation & Execution
                                            </h3>
                                            <p className="text-gray-600 mb-4 ml-13">
                                                Executing multi-channel digital marketing campaigns with precision timing and consistent brand messaging.
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">SEO & Content Marketing</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Implementing on-page and off-page SEO strategies alongside high-quality content creation and distribution.
                                                    </p>
                                                </div>
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Paid Advertising</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Launching and managing PPC campaigns across Google Ads, social media platforms, and display networks.
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Monitoring & Optimization */}
                                    <div className="mb-12">
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8 }}
                                        >
                                            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                                                <div className="w-10 h-10 bg-[#3768AA]/10 rounded-lg flex items-center justify-center mr-3">
                                                    <BarChart3 className="w-5 h-5 text-[#3768AA]" />
                                                </div>
                                                Analytics, Monitoring & Optimization
                                            </h3>
                                            <p className="text-gray-600 mb-4 ml-13">
                                                Continuous monitoring and data-driven optimization to improve campaign performance and maximize ROI.
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Performance Tracking</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Real-time monitoring of KPIs and conversion metrics across all digital marketing channels.
                                                    </p>
                                                </div>
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Continuous Optimization</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Regular A/B testing and campaign refinement based on performance data and market insights.
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
                                            Our Digital Marketing Success Stories
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
                                                                View Case Study
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
                                                                    <TrendingUp className="w-3 h-3 text-[#3768AA]" />
                                                                </div>
                                                                <span className="text-xs text-gray-600 font-medium">Digital Marketing</span>
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
                                                <TrendingUp className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">No Digital Marketing Projects Found</h3>
                                            <p className="text-gray-600">Digital marketing case studies will be displayed here once available.</p>
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
                                            Digital Marketing Insights & Trends
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
                                                                    Marketing
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
                                                                    <PenTool className="w-3 h-3 text-[#3768AA]" />
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
                                                <PenTool className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">No Digital Marketing Articles Found</h3>
                                            <p className="text-gray-600">Digital marketing insights and articles will be displayed here once available.</p>
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