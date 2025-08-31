"use client"

import AOS from 'aos';
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Search, Calendar, User, Tag, Briefcase, ChevronRight, Filter, CheckCheck, Timer, Clock, Pause } from 'lucide-react';
import axios from 'axios';
import Image from 'next/image';

export default function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedService, setSelectedService] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    
    const generateSlugFromTitle = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '') // Remove special characters
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
            .trim('-'); // Remove leading/trailing hyphens
    };

    const getProjects = async (page = 1) => {
        try {
            setLoading(true);
            console.log('Fetching projects for page:', page);
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/public?page=${page}`);
            console.log('Projects Response:', response.data);

            if (response.data && Array.isArray(response.data)) {
                // If it's an array (no pagination)
                setProjects(response.data);
                setPagination(null);
            } else if (response.data && response.data.data) {
                // If it has pagination
                setProjects(response.data.data);
                setPagination({
                    current_page: response.data.current_page,
                    last_page: response.data.last_page,
                    total: response.data.total,
                    per_page: response.data.per_page,
                    links: response.data.links
                });
                setCurrentPage(response.data.current_page);
            } else {
                console.log('No projects found in response');
                setProjects([]);
                setPagination(null);
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
            setProjects([]);
            setPagination(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProjects();
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    const handlePageChange = (page) => {
        if (page !== currentPage && page >= 1 && page <= pagination?.last_page) {
            getProjects(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getStatusConfig = (status) => {
        const statusConfigs = {
            completed: {
                color: 'bg-green-100 text-green-800',
                text: 'Completed',
                icon: CheckCheck,
                iconColor: 'text-green-500'
            },
            in_progress: {
                color: 'bg-blue-100 text-blue-800',
                text: 'In Progress',
                icon: Timer,
                iconColor: 'text-blue-500'
            },
            planning: {
                color: 'bg-yellow-100 text-yellow-800',
                text: 'Planning',
                icon: Clock,
                iconColor: 'text-yellow-500'
            },
            on_hold: {
                color: 'bg-gray-100 text-gray-800',
                text: 'On Hold',
                icon: Pause,
                iconColor: 'text-gray-500'
            }
        };
        return statusConfigs[status] || statusConfigs.completed;
    };

    const getCleanImageUrl = (imageUrl) => {
        if (!imageUrl) return "/assets/avatar.jpg";
        
        if (imageUrl.startsWith('http://localhost:8000')) {
            return imageUrl;
        }
        
        if (imageUrl.startsWith('/storage/')) {
            return `http://localhost:8000${imageUrl}`;
        }
        
        return "/assets/avatar.jpg";
    };

    // Get unique services and statuses for filtering
    const uniqueServices = [...new Set(projects.flatMap(project => 
        project.services ? project.services.map(service => service.name) : []
    ).filter(Boolean))];

    const uniqueStatuses = [...new Set(projects.map(project => project.status).filter(Boolean))];

    // Filter projects based on selected filters
    const filteredProjects = projects.filter(project => {
        const serviceMatch = selectedService === 'all' || 
            (project.services && project.services.some(service => service.name === selectedService));
        const statusMatch = selectedStatus === 'all' || project.status === selectedStatus;
        return serviceMatch && statusMatch;
    });

    return (
        <>
            <main className="max-w-full">
                {loading ? (
                    <div className="flex justify-center items-center h-screen">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#3768AA]"></div>
                    </div>
                ) : (
                    <>
                        {/* Hero Section */}
                        <section>
                            <div
                                className="relative h-[60vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] overflow-hidden flex items-center -mt-18"
                                style={{
                                    backgroundImage: `url("/assets/hero/hero-projects.jpg")`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            >
                                {/* Dark Overlay */}
                                <div className="absolute inset-0 bg-black/70 z-0"></div>

                                {/* Content Container */}
                                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                                    <div className="text-left">
                                        <motion.p
                                            className="text-sm sm:text-base md:text-lg text-gray-200 mb-4"
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8, delay: 0.2 }}
                                        >
                                            <ArrowLeft className="inline-block mr-2" />
                                            <Link href="/" className="text-white hover:underline">
                                                Home
                                            </Link>
                                        </motion.p>

                                        <motion.h1
                                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight"
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8 }}
                                        >
                                            Our Projects
                                        </motion.h1>

                                        <motion.p
                                            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed max-w-3xl"
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8, delay: 0.2 }}
                                        >
                                            Explore our portfolio of successful digital solutions, from web development to mobile applications, delivered for leading enterprises across various industries.
                                        </motion.p>

                                        <motion.div
                                            className="flex items-center gap-6 text-sm text-gray-300"
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8, delay: 0.4 }}
                                        >
                                            <div className="flex items-center gap-2">
                                                <Briefcase className="w-4 h-4" />
                                                <span>{projects?.length || 0} Projects</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Tag className="w-4 h-4" />
                                                <span>Multiple Industries</span>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="py-16 px-4 sm:px-6 lg:px-8">
                            <div className="max-w-7xl mx-auto">
                                {/* Filters */}
                                <motion.div
                                    className="mb-8"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
                                        <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-900 flex items-center gap-2">
                                            <Filter className="w-6 h-6 text-[#3768AA]" />
                                            Filter Projects
                                        </h2>
                                        <div className="text-sm text-gray-600">
                                            Showing {filteredProjects.length} of {projects.length} projects
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {/* Service Filter */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
                                            <select
                                                value={selectedService}
                                                onChange={(e) => setSelectedService(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3768AA] focus:border-transparent"
                                            >
                                                <option value="all">All Services</option>
                                                {uniqueServices.map(service => (
                                                    <option key={service} value={service}>{service}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Status Filter */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                            <select
                                                value={selectedStatus}
                                                onChange={(e) => setSelectedStatus(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3768AA] focus:border-transparent"
                                            >
                                                <option value="all">All Status</option>
                                                {uniqueStatuses.map(status => (
                                                    <option key={status} value={status}>
                                                        {getStatusConfig(status).text}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Reset Filters Button */}
                                        <div className="flex items-end">
                                            <button
                                                onClick={() => {
                                                    setSelectedService('all');
                                                    setSelectedStatus('all');
                                                }}
                                                className="px-4 py-2 text-sm text-[#3768AA] border border-[#3768AA] rounded-md hover:bg-[#3768AA] hover:text-white transition-colors duration-200"
                                            >
                                                Reset Filters
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Projects Grid */}
                                {filteredProjects && filteredProjects.length > 0 ? (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                            {filteredProjects.map((project, index) => {
                                                const statusConfig = getStatusConfig(project.status);
                                                const StatusIcon = statusConfig.icon;
                                                
                                                return (
                                                    <Link href={`/project/${generateSlugFromTitle(project.title)}`} key={project.id}>
                                                        <motion.article
                                                            className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer"
                                                            initial={{ opacity: 0, y: 30 }}
                                                            whileInView={{ opacity: 1, y: 0 }}
                                                            viewport={{ once: true }}
                                                            transition={{ duration: 0.6, delay: index * 0.1 }}
                                                            whileHover={{ y: -8 }}
                                                        >
                                                            {/* Project Image */}
                                                            <div className="relative h-48 overflow-hidden">
                                                                <Image
                                                                    src={"/assets/avatar.jpg"}
                                                                    alt={project.title}
                                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                                    fill
                                                                    style={{ objectFit: 'cover' }}
                                                                />

                                                                {/* Overlay */}
                                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                                                {/* Client Logo */}
                                                                <div className="absolute top-3 left-0 w-[4rem]  ">
                                                                    <div className="bg-white/90 backdrop-blur-sm rounded-r-lg flex items-center justify-center p-2 shadow-xs">
                                                                        <img
                                                                            src={"/assets/Clients/alfamart.png"}
                                                                            alt={`${project.client_name} logo`}
                                                                            className="w-6 h-6 object-contain"
                                                                            onError={(e) => {
                                                                                e.target.src = "/assets/Clients/alfamart.png";
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                {/* Status Badge */}
                                                                <div className="absolute top-3 right-3">
                                                                    <div className={`${statusConfig.color} backdrop-blur-sm rounded-md px-2 py-1 shadow-md flex items-center gap-1`}>
                                                                        <StatusIcon className="w-3 h-3" />
                                                                        <span className="text-xs font-medium">
                                                                            {statusConfig.text}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Project Content */}
                                                            <div className="p-6">
                                                                {/* Project Meta */}
                                                                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                                                                    <div className="flex items-center gap-1">
                                                                        <Calendar className="w-3 h-3" />
                                                                        <span>{formatDate(project.project_date)}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-1">
                                                                        <User className="w-3 h-3" />
                                                                        <span>{project.client_name}</span>
                                                                    </div>
                                                                </div>

                                                                {/* Project Title */}
                                                                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#3768AA] transition-colors duration-200">
                                                                    {project.title}
                                                                </h3>

                                                                {/* Project Description */}
                                                                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                                                                    {project.description}
                                                                </p>

                                                                {/* Services Tags */}
                                                                {project.services && project.services.length > 0 && (
                                                                    <div className="flex flex-wrap gap-1 mb-4">
                                                                        {project.services.slice(0, 2).map((service) => (
                                                                            <span
                                                                                key={`service-${project.id}-${service.id}`}
                                                                                className="px-2 py-1 bg-[#3768AA]/10 text-[#3768AA] text-xs rounded-md font-medium"
                                                                            >
                                                                                {service.name}
                                                                            </span>
                                                                        ))}
                                                                        {project.services.length > 2 && (
                                                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                                                                                +{project.services.length - 2} more
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                )}

                                                                {/* Project Footer */}
                                                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                                    <div className="flex items-center gap-2">
                                                                        <div className="w-8 h-8 bg-[#3768AA]/10 rounded-full flex items-center justify-center">
                                                                            <Briefcase className="w-4 h-4 text-[#3768AA]" />
                                                                        </div>
                                                                        <span className="text-xs text-gray-600 font-medium">Project</span>
                                                                    </div>

                                                                    <div className="text-[#3768AA] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                                        <ChevronRight className="w-5 h-5" />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Hover Border Effect */}
                                                            <div className="absolute inset-0 rounded-xl border-2 border-[#3768AA]/0 group-hover:border-[#3768AA]/20 transition-colors duration-300 pointer-events-none"></div>
                                                        </motion.article>
                                                    </Link>
                                                );
                                            })}
                                        </div>

                                        {/* Pagination */}
                                        {pagination && pagination.last_page > 1 && (
                                            <motion.div
                                                className="flex justify-center items-center mt-12"
                                                initial={{ opacity: 0, y: 30 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.8 }}
                                            >
                                                <div className="flex items-center gap-2">
                                                    {/* Previous Button */}
                                                    <button
                                                        onClick={() => handlePageChange(currentPage - 1)}
                                                        disabled={currentPage === 1}
                                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${currentPage === 1
                                                            ? 'text-gray-400 cursor-not-allowed'
                                                            : 'text-[#3768AA] hover:bg-[#3768AA]/10'
                                                            }`}
                                                    >
                                                        Previous
                                                    </button>

                                                    {/* Page Numbers */}
                                                    {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map(page => (
                                                        <button
                                                            key={page}
                                                            onClick={() => handlePageChange(page)}
                                                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${page === currentPage
                                                                ? 'bg-[#3768AA] text-white'
                                                                : 'text-gray-700 hover:bg-gray-100'
                                                                }`}
                                                        >
                                                            {page}
                                                        </button>
                                                    ))}

                                                    {/* Next Button */}
                                                    <button
                                                        onClick={() => handlePageChange(currentPage + 1)}
                                                        disabled={currentPage === pagination.last_page}
                                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${currentPage === pagination.last_page
                                                            ? 'text-gray-400 cursor-not-allowed'
                                                            : 'text-[#3768AA] hover:bg-[#3768AA]/10'
                                                            }`}
                                                    >
                                                        Next
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </>
                                ) : (
                                    <motion.div
                                        className="text-center py-16"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8 }}
                                    >
                                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Briefcase className="w-10 h-10 text-gray-400" />
                                        </div>
                                        <h3 className="text-2xl font-medium text-gray-900 mb-4">No Projects Found</h3>
                                        <p className="text-gray-600 max-w-md mx-auto">
                                            {selectedService !== 'all' || selectedStatus !== 'all'
                                                ? 'No projects match your current filters. Try adjusting your filter criteria.'
                                                : 'Projects will be displayed here once available. Check back soon for new content!'
                                            }
                                        </p>
                                        {(selectedService !== 'all' || selectedStatus !== 'all') && (
                                            <button
                                                onClick={() => {
                                                    setSelectedService('all');
                                                    setSelectedStatus('all');
                                                }}
                                                className="mt-4 px-6 py-2 bg-[#3768AA] text-white rounded-md hover:bg-[#3564A4] transition-colors duration-200"
                                            >
                                                Clear Filters
                                            </button>
                                        )}
                                    </motion.div>
                                )}
                            </div>
                        </section>
                    </>
                )}
            </main>
        </>
    );
}