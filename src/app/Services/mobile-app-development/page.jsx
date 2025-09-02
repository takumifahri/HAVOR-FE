"use client"

import AOS from 'aos';
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import Link from 'next/link';
import { ArrowLeft, Home, ChevronRight, Search, Users, MousePointer, BarChart3, Eye, Lightbulb, Zap, Palette, Handshake, Smartphone, Monitor, Bell, Download, Code, Layers, TestTube } from 'lucide-react';
// ...existing code...
import axios from 'axios';
import Image from 'next/image';

export default function MobileAppDevelopmentPage() {
    const [data, setData] = useState(null);
    const [getProjects, setGetProjects] = useState([]);
    const [getArticles, setGetArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Offline data fallback
    const offlineData = {
        id: 2,
        name: "Mobile App Development",
        short_description: "We design and develop custom mobile applications for iOS and Android. Our services cover everything from concept to deployment, creating intuitive, high-performance apps that provide a great user experience and help you achieve your business goals.",
        description: `Cross-platform mobile application development for iOS and Android. In today's fast-paced digital landscape, a powerful and engaging mobile presence is essential for connecting with your audience. Our mobile app development services are designed to turn your ideas into functional, user-friendly, and scalable applications for both iOS and Android platforms. We work closely with you from the initial planning phase to a final product that not only meets your business objectives but also delights your users. Our expertise ensures your app is not just a digital tool, but a valuable asset that drives growth and engagement.

Our development process begins with a deep dive into your vision and your target users' needs. We focus on building a strong foundation with clean code and robust architecture, ensuring the app is fast, secure, and ready for future updates. Whether you need a native app for maximum performance or a cross-platform solution for broader reach, we choose the right technology to fit your needs and budget. Our developers are proficient in the latest frameworks and programming languages, including Swift, Kotlin, React Native, and Flutter, to deliver a high-quality product every time.

We believe that a great app is more than just its features—it's about the entire user experience. Our UI/UX design is integrated into every stage of development to ensure the app is not only powerful but also intuitive and visually appealing. We create engaging interfaces that are easy to navigate and perform flawlessly on various devices and screen sizes. By focusing on user experience, we help you build an app that users will love to use and return to, leading to higher retention rates and positive reviews.

Our commitment doesn't end at launch. We provide ongoing support and maintenance to ensure your app remains up-to-date and performs optimally. This includes bug fixes, new feature implementation, and performance monitoring. Partner with us to build a mobile application that stands out in the crowded app stores, delivers a seamless experience, and becomes a cornerstone of your business strategy.`,
        features: "Native Performance,Cross-platform,App Store Publishing,Push Notifications",
        image: "/assets/hero/mobile-hero.jpg"
    };

    const offlineProjects = [
        {
            id: 1,
            title: "E-Commerce Mobile App",
            description: "Full-featured e-commerce mobile application with payment integration, product catalog, user reviews, and order tracking for both iOS and Android platforms.",
            client_name: "ShopEasy",
            project_date: "2024-01-15",
            status: "completed"
        },
        {
            id: 2,
            title: "Fitness Tracking App",
            description: "Comprehensive fitness tracking application with workout plans, nutrition tracking, progress monitoring, and social features built using React Native.",
            client_name: "FitLife Pro",
            project_date: "2024-02-10",
            status: "completed"
        },
        {
            id: 3,
            title: "Food Delivery Platform",
            description: "Multi-vendor food delivery platform with real-time tracking, payment processing, restaurant management, and customer support chat system.",
            client_name: "QuickBite",
            project_date: "2024-03-08",
            status: "in_progress"
        }
    ];

    const offlineArticles = [
        {
            id: 1,
            title: "Native vs Cross-Platform Mobile Development",
            short_description: "Comprehensive comparison of native and cross-platform mobile development approaches, analyzing performance, cost, and development time considerations.",
            author: "Sarah Chen",
            created_at: "2024-01-15"
        },
        {
            id: 2,
            title: "React Native vs Flutter: Which to Choose?",
            short_description: "In-depth analysis of React Native and Flutter frameworks, comparing their features, performance, and suitability for different project types.",
            author: "Michael Rodriguez",
            created_at: "2024-02-20"
        },
        {
            id: 3,
            title: "Mobile App UX Design Best Practices",
            short_description: "Essential UX design principles for mobile applications, covering user interface patterns, navigation design, and accessibility considerations.",
            author: "Emma Johnson",
            created_at: "2024-03-15"
        }
    ];

    const getData = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/services/public`);
            const mobileAppService = response.data.find(service => service.name === "Mobile App Development");
            console.log('Mobile App Development Service Data:', mobileAppService);
            setData(mobileAppService);

            // Fetch projects immediately after getting service data
            if (mobileAppService && mobileAppService.id) {
                await getProjectsData(mobileAppService.id);
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
            console.log('Mobile App Development Projects Response:', response.data);

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
            console.log('Mobile App Development Articles Response:', response.data);

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

    // Parse features for Mobile App Development
    const parseFeatures = (featuresString) => {
        if (!featuresString) return [];

        const featuresArray = featuresString.split(',').map(item => item.trim());

        const featureMap = {
            'Native Performance': {
                icon: Smartphone,
                description: 'We deliver high-performance native mobile applications optimized for each platform, ensuring smooth animations, fast loading times, and seamless integration with device-specific features and capabilities.'
            },
            'Cross-platform': {
                icon: Layers,
                description: 'Our cross-platform development approach using React Native and Flutter allows you to reach both iOS and Android users with a single codebase, reducing development time and costs while maintaining quality.'
            },
            'App Store Publishing': {
                icon: Download,
                description: 'We handle the complete app store submission process for both Apple App Store and Google Play Store, including app optimization, compliance requirements, and ongoing app store management.'
            },
            'Push Notifications': {
                icon: Bell,
                description: 'Implement engaging push notification systems to keep users informed and drive app engagement with personalized messages, promotional content, and real-time updates tailored to user preferences.'
            }
        };

        return featuresArray.map(feature => ({
            name: feature,
            icon: featureMap[feature]?.icon || Smartphone,
            description: featureMap[feature]?.description || `Professional ${feature.toLowerCase()} services tailored to your mobile application needs.`
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
                                    backgroundImage: `url(${data.image || "/assets/hero/mobile-hero.jpg"})`,
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
                                                    Start Your App Project
                                                </button>
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className='grid grid-cols-1 gap-16 py-16 px-4 sm:px-6 lg:px-8'>
                            {/* About Mobile App Development Section */}
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
                                            Building Mobile Apps That Drive Engagement and Growth
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
                                            Our Mobile Development Capabilities
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

                            {/* Our Mobile Development Process */}
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
                                            Our Mobile App Development Process
                                        </h2>
                                        <p className="text-sm sm:text-md md:text-md lg:text-lg text-gray-600">
                                            We follow a comprehensive development methodology to deliver high-quality mobile applications.
                                        </p>
                                    </motion.div>

                                    {/* Discovery & Planning */}
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
                                                Discovery & Strategic Planning
                                            </h3>
                                            <p className="text-gray-600 mb-4 ml-13">
                                                We start by understanding your vision, target audience, and business objectives to create a comprehensive development strategy.
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Requirements Analysis</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Detailed analysis of your business requirements, target users, and technical specifications to define project scope and objectives.
                                                    </p>
                                                </div>
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Technology Selection</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Choosing the optimal development approach (native vs cross-platform) and technology stack based on your specific needs.
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* UI/UX Design */}
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
                                                UI/UX Design & Prototyping
                                            </h3>
                                            <p className="text-gray-600 mb-4 ml-13">
                                                Creating intuitive and engaging user interfaces that provide exceptional user experiences across all devices and platforms.
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Wireframing & Prototyping</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Creating detailed wireframes and interactive prototypes to visualize app flow and validate user experience concepts.
                                                    </p>
                                                </div>
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Visual Design</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Crafting beautiful and functional interfaces that align with your brand identity and platform design guidelines.
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Development & Implementation */}
                                    <div className="mb-12">
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8 }}
                                        >
                                            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                                                <div className="w-10 h-10 bg-[#3768AA]/10 rounded-lg flex items-center justify-center mr-3">
                                                    <Code className="w-5 h-5 text-[#3768AA]" />
                                                </div>
                                                Development & Implementation
                                            </h3>
                                            <p className="text-gray-600 mb-4 ml-13">
                                                Building robust, scalable, and secure mobile applications using modern development frameworks and best practices.
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Frontend Development</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Building responsive and interactive user interfaces using React Native, Flutter, Swift, or Kotlin.
                                                    </p>
                                                </div>
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Backend Integration</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Integrating APIs, databases, and third-party services to provide comprehensive app functionality.
                                                    </p>
                                                </div>
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Feature Implementation</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Implementing core features like user authentication, push notifications, and payment processing.
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Testing & Quality Assurance */}
                                    <div className="mb-12">
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8 }}
                                        >
                                            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                                                <div className="w-10 h-10 bg-[#3768AA]/10 rounded-lg flex items-center justify-center mr-3">
                                                    <TestTube className="w-5 h-5 text-[#3768AA]" />
                                                </div>
                                                Testing & Quality Assurance
                                            </h3>
                                            <p className="text-gray-600 mb-4 ml-13">
                                                Comprehensive testing across multiple devices and scenarios to ensure optimal performance and user experience.
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Functional Testing</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Thorough testing of all app features and functionalities to ensure they work as intended across different scenarios.
                                                    </p>
                                                </div>
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Performance Testing</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Testing app performance, speed, and resource usage across various devices and network conditions.
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Deployment & Launch */}
                                    <div className="mb-12">
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8 }}
                                        >
                                            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                                                <div className="w-10 h-10 bg-[#3768AA]/10 rounded-lg flex items-center justify-center mr-3">
                                                    <Download className="w-5 h-5 text-[#3768AA]" />
                                                </div>
                                                Deployment & App Store Launch
                                            </h3>
                                            <p className="text-gray-600 mb-4 ml-13">
                                                Managing the complete app store submission process and ensuring successful launch on both iOS and Android platforms.
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">App Store Optimization</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Optimizing app listings with compelling descriptions, screenshots, and keywords for better visibility.
                                                    </p>
                                                </div>
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Post-Launch Support</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Providing ongoing maintenance, updates, and support to ensure optimal app performance and user satisfaction.
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
                                            Our Mobile App Portfolio
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
                                                                View Project
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
                                                                    <Smartphone className="w-3 h-3 text-[#3768AA]" />
                                                                </div>
                                                                <span className="text-xs text-gray-600 font-medium">Mobile App</span>
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
                                                <Smartphone className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">No Mobile App Projects Found</h3>
                                            <p className="text-gray-600">Mobile app projects will be displayed here once available.</p>
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
                                            Mobile Development Insights & Articles
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
                                                                    Mobile Dev
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
                                                                    <Monitor className="w-3 h-3 text-[#3768AA]" />
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
                                                <Monitor className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">No Mobile Development Articles Found</h3>
                                            <p className="text-gray-600">Mobile development insights and articles will be displayed here once available.</p>
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