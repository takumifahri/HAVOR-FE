"use client"

import AOS from 'aos';
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import Link from 'next/link';
import { ArrowLeft, Home, ChevronRight, Search, Users, MousePointer, BarChart3 } from 'lucide-react';
// ...existing code...
import axios from 'axios';
import Image from 'next/image';
export default function WebDevPage() {
    const [data, setData] = useState(null);
    const [getProjects, setGetProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/services/public`);
            const webDevService = response.data.find(service => service.name === "Web Development");
            console.log('Web Dev Service Data:', webDevService);
            setData(webDevService);

            // Fetch projects immediately after getting service data
            if (webDevService && webDevService.id) {
                await getProjectsData(webDevService.id);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }

    const getProjectsData = async (serviceId) => {
        try {
            console.log('Fetching projects for service ID:', serviceId);
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/services/public/${serviceId}/projects`);
            console.log('Web Development Projects Response:', response.data);

            // Handle different response structures
            if (response.data && response.data.message && response.data.message.projects) {
                setGetProjects(response.data.message.projects);
            } else if (response.data && response.data.projects) {
                setGetProjects(response.data.projects);
            } else if (Array.isArray(response.data)) {
                setGetProjects(response.data);
            } else {
                console.log('No projects found in response');
                setGetProjects([]);
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
            setGetProjects([]);
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
    // Add this function before the return statement
    const parseFeatures = (featuresString) => {
        if (!featuresString) return [];

        // Split the string by comma and trim whitespace
        const featuresArray = featuresString.split(',').map(item => item.trim());

        // Map features to objects with icons and descriptions
        const featureMap = {
            'Responsive Design': {
                icon: MousePointer,
                description: 'We create websites that automatically adapt to any device or screen size, ensuring optimal user experience across desktops, tablets, and mobile devices with fluid layouts and flexible elements.'
            },
            'Progressive Web Apps': {
                icon: BarChart3,
                description: 'We develop modern web applications that offer app-like experiences with offline capabilities, push notifications, and fast loading times, combining the best of web and mobile applications.'
            },
            'API Development': {
                icon: Search,
                description: 'We build robust and scalable APIs that enable seamless integration between your systems and third-party services, powering efficient data exchange and extending your application functionality.'
            },
            'Database Design': {
                icon: Users,
                description: 'We architect optimized database structures that ensure data integrity, scalability, and performance, creating the solid foundation your web applications need for reliable operation and growth.'
            },
            'E-commerce Solutions': {
                icon: BarChart3,
                description: 'We develop comprehensive online shopping platforms with secure payment processing, inventory management, and user-friendly interfaces that drive conversions and enhance customer satisfaction.'
            },
            'CMS Implementation': {
                icon: Users,
                description: 'We integrate and customize content management systems that empower your team to easily update website content without technical knowledge, streamlining your digital content workflow.'
            },
            'UI/UX Design': {
                icon: MousePointer,
                description: 'We craft intuitive user interfaces and engaging user experiences that balance aesthetics with functionality, ensuring your website is both visually appealing and easy to navigate.'
            },
            'Web Application Development': {
                icon: Search,
                description: 'We build sophisticated web applications with complex functionality, interactive features, and seamless performance that solve specific business challenges and meet user needs.'
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
                                    backgroundImage: `url(${data.image || "/assets/hero/web-dev.jpg"})`,
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
                                                    Explore Our Solutions
                                                </button>
                                            </motion.div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className='grid grid-cols-1 gap-16 py-16 px-4 sm:px-6 lg:px-8'>
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
                                            Full-Stack Web Development with Optimization for Modern Business Solutions!
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
                                            We specialize in building robust and scalable web solutions that drive business growth and deliver an exceptional user experience. Our full-stack expertise allows us to seamlessly manage every aspect of a project, from designing a compelling user interface to architecting a secure and efficient back end. Our proficiency in a diverse range of modern and established technologies ensures we can build the perfect solution for your unique needs.
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
                                            Our Featuring Comprehensive Full-Stack Web Development Solutions
                                        </h2>
                                    </motion.div>

                                    {/* Features List */}
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
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </section>
                            {/* Our Comprehensive Service Offerings */}
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
                                            Our Comprehensive Service Offerings
                                        </h2>
                                        <p className="text-sm sm:text-md md:text-md lg:text-lg text-gray-600">
                                            Our experience spans across various sectors, demonstrating our ability to deliver tailored solutions for different business models.
                                        </p>
                                    </motion.div>

                                    {/* Back-End Development */}
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
                                                Back-End Development
                                            </h3>
                                            <p className="text-gray-600 mb-4 ml-13">
                                                The back end is the secure and reliable engine of your application. We have extensive experience with leading frameworks to build powerful server-side logic, secure APIs, and integrated databases.
                                            </p>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                                <div className=" p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">PHP Frameworks</h4>
                                                    <p className="text-sm text-gray-600">
                                                        We have a deep understanding of the PHP ecosystem, with a strong focus on frameworks like CodeIgniter 2 & 3 and Laravel 9. We've successfully used these to build complex e-commerce platforms, learning management systems, and corporate websites.
                                                    </p>
                                                </div>

                                                <div className=" p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">.NET & C#</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Our expertise also extends to Microsoft's technology stack, including ASP.NET and C# .NET MVC 4.6. This allows us to build powerful enterprise-level applications for corporate websites.
                                                    </p>
                                                </div>

                                                <div className=" p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Databases</h4>
                                                    <p className="text-sm text-gray-600">
                                                        We are proficient in managing and optimizing databases using both MySQL and MS SQL Server to handle a variety of data types and volumes.
                                                    </p>
                                                </div>

                                                <div className=" p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">API & Web Services</h4>
                                                    <p className="text-sm text-gray-600">
                                                        We build secure and well-documented JSON APIs to ensure seamless communication between your web applications and mobile apps, or with third-party services.
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Front-End Development */}
                                    <div className="mb-12">
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8 }}
                                        >
                                            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                                                <div className="w-10 h-10 bg-[#3768AA]/10 rounded-lg flex items-center justify-center mr-3">
                                                    <MousePointer className="w-5 h-5 text-[#3768AA]" />
                                                </div>
                                                Front-End Development
                                            </h3>
                                            <p className="text-gray-600 mb-4 ml-13">
                                                We create responsive, intuitive, and visually engaging interfaces that provide a flawless user experience on any device.
                                            </p>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                                <div className=" p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Frameworks & Libraries</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Our team is skilled in using a combination of HTML5, CSS Bootstrap, and AJAX/jQuery to build clean and functional front ends. For more dynamic applications, we integrate frameworks like Laravel Blade.
                                                    </p>
                                                </div>

                                                <div className=" p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Content Management Systems (CMS)</h4>
                                                    <p className="text-sm text-gray-600">
                                                        For clients who need a flexible and user-friendly platform, we offer custom development on popular CMS like WordPress.
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Web Applications */}
                                    <div className="mb-12">
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8 }}
                                        >
                                            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                                                <div className="w-10 h-10 bg-[#3768AA]/10 rounded-lg flex items-center justify-center mr-3">
                                                    <Search className="w-5 h-5 text-[#3768AA]" />
                                                </div>
                                                Beyond Websites: Specializing in Web Applications
                                            </h3>
                                            <p className="text-gray-600 mb-4 ml-13">
                                                We don't just build static sites; we develop dynamic applications that solve real-world business challenges.
                                            </p>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                                                <div className=" p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">E-commerce Platforms</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Creating end-to-end e-commerce solutions with secure payment gateway integrations like DOKU and MidTrans.
                                                    </p>
                                                </div>

                                                <div className=" p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Dashboards & Business Intelligence</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Building sophisticated web dashboard applications that provide clear data visualizations and actionable insights.
                                                    </p>
                                                </div>

                                                <div className=" p-5 rounded-lg shadow-sm border border-gray-100">
                                                    <h4 className="font-medium text-gray-900 mb-2">Learning Management Systems</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Developing platforms that facilitate digital learning, training, and content management for internal and external users.
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </section>
                            <section>
                                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                                    <motion.div
                                        className="text-left mb-7 lg:mb-9"
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8 }}
                                    >
                                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 mb-4">
                                            Our History Projects.
                                        </h2>
                                    </motion.div>

                                    {/* Projects Grid */}
                                    {getProjects && getProjects.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                            {getProjects.map((project, index) => (
                                                <motion.div
                                                    key={project.id}
                                                    className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
                                                    initial={{ opacity: 0, y: 30 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                                    whileHover={{ y: -8 }}
                                                >
                                                    {/* Project Image with Overlay */}
                                                    <div className="relative h-64 overflow-hidden">
                                                        <Image
                                                            src={"/assets/Clients/Mahkota.jpeg"}
                                                            alt={project.title}
                                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                            layout="fill"
                                                            objectFit="cover"
                                                        />

                                                        {/* Dark Overlay */}
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                                        {/* Client Logo/Badge */}
                                                        <div className="absolute top-4 left-4">
                                                            <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                                                                <span className="text-sm font-semibold text-gray-800">
                                                                    {project.client_name}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* Status Badge */}
                                                        <div className="absolute top-4 right-4">
                                                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${project.status === 'completed'
                                                                ? 'bg-green-100 text-green-800 border border-green-200'
                                                                : project.status === 'in_progress'
                                                                    ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                                                    : 'bg-gray-100 text-gray-800 border border-gray-200'
                                                                }`}>
                                                                {project.status === 'completed' ? 'Completed' :
                                                                    project.status === 'in_progress' ? 'In Progress' :
                                                                        'Pending'}
                                                            </div>
                                                        </div>

                                                        {/* Hover Content */}
                                                        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                                                            <button className="w-full bg-white/90 backdrop-blur-sm text-[#3768AA] px-4 py-2 rounded-lg font-medium hover:bg-white transition-colors duration-200 flex items-center justify-center gap-2">
                                                                View Details
                                                                <ChevronRight className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Project Content */}
                                                    <div className="p-6">
                                                        {/* Project Date */}
                                                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                                                            <div className="w-1.5 h-1.5 bg-[#3768AA] rounded-full"></div>
                                                            {new Date(project.project_date).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}
                                                        </div>

                                                        {/* Project Title */}
                                                        <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#3768AA] transition-colors duration-200">
                                                            {project.title}
                                                        </h3>

                                                        {/* Project Description */}
                                                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                                                            {project.description}
                                                        </p>

                                                        {/* Project Tags/Technologies */}
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-8 h-8 bg-[#3768AA]/10 rounded-full flex items-center justify-center">
                                                                    <Search className="w-4 h-4 text-[#3768AA]" />
                                                                </div>
                                                                <span className="text-sm text-gray-600 font-medium">Web Development</span>
                                                            </div>

                                                            <div className="text-[#3768AA] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                                <ChevronRight className="w-5 h-5" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Hover Border Effect */}
                                                    <div className="absolute inset-0 rounded-2xl border-2 border-[#3768AA]/0 group-hover:border-[#3768AA]/20 transition-colors duration-300 pointer-events-none"></div>
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
                                                <Search className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">No Projects Found</h3>
                                            <p className="text-gray-600">Projects for this service will be displayed here once available.</p>
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