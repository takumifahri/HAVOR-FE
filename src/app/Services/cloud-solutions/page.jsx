"use client"

import AOS from 'aos';
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import Link from 'next/link';
import { ArrowLeft, Home, ChevronRight, Search, Users, MousePointer, BarChart3, Eye, Lightbulb, Zap, Palette, Handshake, Cloud, Server, Settings, Shield, Database, Activity } from 'lucide-react';
// ...existing code...
import axios from 'axios';
import Image from 'next/image';

export default function CloudSolutionsPage() {
    const [data, setData] = useState(null);
    const [getProjects, setGetProjects] = useState([]);
    const [getArticles, setGetArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Offline data fallback
    const offlineData = {
        id: 5,
        name: "Cloud Solutions",
        short_description: "Our comprehensive Cloud Solutions services help businesses transition to and manage their cloud infrastructure seamlessly. We provide end-to-end support, from initial setup on leading platforms like AWS and Azure to smooth data migration, ensuring your operations are optimized, scalable, and secure.",
        description: `Cloud infrastructure setup and migration services, In today's fast-paced digital world, a reliable and flexible infrastructure is crucial for success. Our Cloud Solutions services are designed to help companies of all sizes, from startups to large enterprises, harness the full power of cloud computing. We don't just move your data; we build a solid foundation for future growth. Our team of experts analyzes your specific needs to design and implement the most efficient solutions, ensuring every aspect of your cloud infrastructure is optimized for performance and cost-effectiveness.

We offer fully managed migration services, guaranteeing a smooth transition from your on-premise or physical infrastructure to the cloud. Our specialists will guide you through every stage of the process—from planning and assessment to execution and post-migration verification. We minimize downtime and risk, so your business operations remain uninterrupted. With our migration services, you can be confident that your data and applications are in a secure, reliable, and scalable environment.

Beyond migration, we excel at managing DevOps. We help your development and operations teams work together more efficiently through automation, continuous integration, and continuous deployment (CI/CD). Our DevOps approach accelerates product release cycles, reduces errors, and improves team collaboration. With an automated infrastructure and streamlined processes, you can focus on innovation and new feature development without being burdened by technical issues.

Finally, we provide 24/7 monitoring to ensure your system's performance is optimal and issues are detected before they become critical. We use advanced monitoring tools to track the performance, security, and availability of your applications and infrastructure in real-time. With regular reports and proactive alerts, you will always have deep insight into your system's health. Our Cloud Solutions services are your trusted partner for building, managing, and securing a resilient and scalable cloud infrastructure.`,
        features: "AWS/Azure Setup,Migration Services,DevOps,Monitoring",
        image: "/assets/hero/cloud-computing.jpg"
    };

    const offlineProjects = [
        {
            id: 1,
            title: "Enterprise AWS Migration",
            description: "Complete migration of enterprise infrastructure from on-premises to AWS cloud, including database migration, application modernization, and implementation of auto-scaling capabilities.",
            client_name: "GlobalTech Inc",
            project_date: "2024-01-20",
            status: "completed"
        },
        {
            id: 2,
            title: "Multi-Cloud DevOps Implementation",
            description: "Implemented comprehensive DevOps pipeline with CI/CD automation across AWS and Azure environments, reducing deployment time by 75% and improving system reliability.",
            client_name: "InnovateFlow",
            project_date: "2024-02-15",
            status: "completed"
        },
        {
            id: 3,
            title: "Healthcare Cloud Infrastructure",
            description: "HIPAA-compliant cloud infrastructure setup on Azure with advanced monitoring, backup solutions, and disaster recovery planning for healthcare management system.",
            client_name: "HealthCare Systems",
            project_date: "2024-03-05",
            status: "in_progress"
        }
    ];

    const offlineArticles = [
        {
            id: 1,
            title: "AWS vs Azure: Choosing the Right Cloud Platform",
            short_description: "A comprehensive comparison of AWS and Azure cloud platforms, analyzing costs, services, and use cases to help you make the right choice for your business.",
            author: "David Kim",
            created_at: "2024-01-10"
        },
        {
            id: 2,
            title: "DevOps Best Practices for Cloud Migration",
            short_description: "Essential DevOps strategies and tools for successful cloud migration, including automation techniques and continuous deployment practices.",
            author: "Lisa Zhang",
            created_at: "2024-02-18"
        },
        {
            id: 3,
            title: "Cloud Security: Protecting Your Digital Assets",
            short_description: "Comprehensive guide to cloud security best practices, including encryption, access control, and compliance considerations for modern businesses.",
            author: "Robert Thompson",
            created_at: "2024-03-12"
        }
    ];

    const getData = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/services/public`);
            const cloudSolutionsService = response.data.find(service => service.name === "Cloud Solutions");
            console.log('Cloud Solutions Service Data:', cloudSolutionsService);
            setData(cloudSolutionsService);

            // Fetch projects immediately after getting service data
            if (cloudSolutionsService && cloudSolutionsService.id) {
                await getProjectsData(cloudSolutionsService.id);
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
            console.log('Cloud Solutions Projects Response:', response.data);

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
            console.log('Cloud Solutions Articles Response:', response.data);

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

    // Parse features for Cloud Solutions
    const parseFeatures = (featuresString) => {
        if (!featuresString) return [];

        const featuresArray = featuresString.split(',').map(item => item.trim());

        const featureMap = {
            'AWS/Azure Setup': {
                icon: Cloud,
                description: 'We provide comprehensive setup and configuration of cloud platforms including AWS and Azure, optimizing your infrastructure for performance, security, and cost-effectiveness with best practices implementation.'
            },
            'Migration Services': {
                icon: Server,
                description: 'Our expert migration services ensure seamless transition from on-premises to cloud infrastructure with minimal downtime, comprehensive data transfer, and thorough testing to guarantee business continuity.'
            },
            'DevOps': {
                icon: Settings,
                description: 'We implement robust DevOps practices including CI/CD pipelines, infrastructure as code, automated testing, and deployment strategies to accelerate development cycles and improve reliability.'
            },
            'Monitoring': {
                icon: Activity,
                description: 'Our 24/7 monitoring solutions provide real-time insights into your cloud infrastructure performance, security threats, and resource utilization with proactive alerting and detailed reporting.'
            }
        };

        return featuresArray.map(feature => ({
            name: feature,
            icon: featureMap[feature]?.icon || Cloud,
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
                                    backgroundImage: `url(${data.image || "/assets/hero/cloud-computing.jpg"})`,
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
                                                    Start Your Cloud Journey
                                                </button>
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className='grid grid-cols-1 gap-16 py-16 px-4 sm:px-6 lg:px-8'>
                            {/* About Cloud Solutions Section */}
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
                                            Empowering Your Business with Scalable Cloud Infrastructure
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
                                            Our Core Cloud Solutions Capabilities
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

                            {/* Our Cloud Implementation Process */}
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
                                            Our Proven Cloud Implementation Process
                                        </h2>
                                        <p className="text-sm sm:text-md md:text-md lg:text-lg text-gray-600">
                                            We follow a systematic approach to ensure successful cloud adoption and optimal performance.
                                        </p>
                                    </motion.div>

                                    {/* Assessment & Planning */}
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
                                                Assessment & Strategic Planning
                                            </h3>
                                            <p className="text-gray-600 mb-4 ml-13">
                                                We begin with comprehensive infrastructure assessment and strategic planning to understand your current environment and define optimal cloud architecture.
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Infrastructure Audit</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Detailed analysis of existing systems, applications, and data to identify migration readiness and optimization opportunities.
                                                    </p>
                                                </div>
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Cloud Strategy Design</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Developing customized cloud strategy aligned with business goals, including platform selection and architecture design.
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Migration & Setup */}
                                    <div className="mb-12">
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8 }}
                                        >
                                            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                                                <div className="w-10 h-10 bg-[#3768AA]/10 rounded-lg flex items-center justify-center mr-3">
                                                    <Server className="w-5 h-5 text-[#3768AA]" />
                                                </div>
                                                Migration & Infrastructure Setup
                                            </h3>
                                            <p className="text-gray-600 mb-4 ml-13">
                                                Executing seamless migration with minimal downtime while setting up optimized cloud infrastructure for maximum performance.
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Data Migration</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Secure and efficient transfer of applications, databases, and files with comprehensive backup and rollback strategies.
                                                    </p>
                                                </div>
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Cloud Infrastructure Setup</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Configuring AWS/Azure environments with networking, security, auto-scaling, and load balancing for optimal performance.
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* DevOps Implementation */}
                                    <div className="mb-12">
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8 }}
                                        >
                                            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                                                <div className="w-10 h-10 bg-[#3768AA]/10 rounded-lg flex items-center justify-center mr-3">
                                                    <Settings className="w-5 h-5 text-[#3768AA]" />
                                                </div>
                                                DevOps & Automation Implementation
                                            </h3>
                                            <p className="text-gray-600 mb-4 ml-13">
                                                Implementing robust DevOps practices and automation to streamline development workflows and improve deployment efficiency.
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">CI/CD Pipelines</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Setting up automated build, test, and deployment pipelines for faster and more reliable software delivery.
                                                    </p>
                                                </div>
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Infrastructure as Code</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Implementing IaC practices using tools like Terraform and CloudFormation for consistent infrastructure management.
                                                    </p>
                                                </div>
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Container Orchestration</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Deploying containerized applications with Kubernetes or Docker for improved scalability and resource efficiency.
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Security & Compliance */}
                                    <div className="mb-12">
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8 }}
                                        >
                                            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                                                <div className="w-10 h-10 bg-[#3768AA]/10 rounded-lg flex items-center justify-center mr-3">
                                                    <Shield className="w-5 h-5 text-[#3768AA]" />
                                                </div>
                                                Security & Compliance Setup
                                            </h3>
                                            <p className="text-gray-600 mb-4 ml-13">
                                                Implementing comprehensive security measures and compliance frameworks to protect your cloud infrastructure and data.
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Security Configuration</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Implementing security best practices including encryption, access controls, and network security configurations.
                                                    </p>
                                                </div>
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Compliance Management</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Ensuring compliance with industry standards like GDPR, HIPAA, and SOC 2 through proper configurations and auditing.
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
                                                    <Activity className="w-5 h-5 text-[#3768AA]" />
                                                </div>
                                                Monitoring & Ongoing Optimization
                                            </h3>
                                            <p className="text-gray-600 mb-4 ml-13">
                                                Providing continuous monitoring and optimization to ensure peak performance and cost-efficiency of your cloud infrastructure.
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">24/7 Monitoring</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Real-time monitoring of performance, availability, and security with proactive alerting and incident response.
                                                    </p>
                                                </div>
                                                <div className="p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Cost Optimization</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Continuous analysis and optimization of cloud resources to minimize costs while maintaining performance standards.
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
                                            Our Cloud Solutions Portfolio
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
                                                                    <Cloud className="w-3 h-3 text-[#3768AA]" />
                                                                </div>
                                                                <span className="text-xs text-gray-600 font-medium">Cloud Solutions</span>
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
                                                <Cloud className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">No Cloud Projects Found</h3>
                                            <p className="text-gray-600">Cloud solutions projects will be displayed here once available.</p>
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
                                            Cloud Technology Insights & Articles
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
                                                                    Cloud Article
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
                                                                    <Database className="w-3 h-3 text-[#3768AA]" />
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
                                                <Database className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">No Cloud Articles Found</h3>
                                            <p className="text-gray-600">Cloud technology insights and articles will be displayed here once available.</p>
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