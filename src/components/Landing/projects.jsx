"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { CheckCheck, Timer } from "lucide-react";

export default function ProjectsSection() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 30 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    // Generate slug from title
    const generateSlugFromTitle = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '') // Remove special characters
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
            .trim('-'); // Remove leading/trailing hyphens
    };

    // Fetch projects data
    const fetchProjects = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/public`);

            if (response.data && Array.isArray(response.data)) {
                // Limit to 6 projects for landing page
                setProjects(response.data.slice(0, 6));
            } else {
                setProjects([]);
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
            setError('Failed to load projects');
            setProjects([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    // Helper functions
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

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
        });
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            completed: { color: 'bg-green-100 text-green-800', text: 'Completed' },
            in_progress: { color: 'bg-blue-100 text-blue-800', text: 'In Progress' },
            planning: { color: 'bg-yellow-100 text-yellow-800', text: 'Planning' },
            on_hold: { color: 'bg-gray-100 text-gray-800', text: 'On Hold' }
        };

        return statusConfig[status] || statusConfig.completed;
    };

    // Loading component
    const LoadingComponent = () => (
        <section className="py-16 px-4 max-w-7xl mx-auto">
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#3768AA]"></div>
            </div>
        </section>
    );

    const checkStatusProject = (project) => {
        if (project.status === "completed") {
            return <CheckCheck className=" text-green-500" alt="Complete" />;
        } else if (project.status === "in_progress") {
            return <Timer className=" text-amber-500" alt="In Progress" />;
        }
    };

    // Project card component
    const ProjectCard = ({ project, index }) => {
        const statusBadge = getStatusBadge(project.status);

        return (
            <motion.div
                key={`project-${project.id}`}
                className="group overflow-hidden rounded-lg border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-white"
                variants={cardVariants}
                whileHover={{
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
            >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                    <motion.div
                        className="relative w-full h-full"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <Image
                            src={"/assets/avatar.jpg"}
                            alt={project.title}
                            fill
                            style={{ objectFit: 'cover' }}
                            className="w-full h-full"
                            onError={(e) => {
                                e.target.src = "/assets/avatar.jpg";
                            }}
                        />
                    </motion.div>

                    {/* Client Logo Badge */}
                    <div className="absolute top-4 left-0 bg-white rounded-r-lg p-2 shadow-sm w-[4rem] flex items-center justify-center" style={{ zIndex: 10 }}>
                        <img
                            src={'/assets/Clients/alfamart.png'}
                            alt={`${project.client_name} logo`}
                            className="w-8 h-8 object-contain"
                            onError={(e) => {
                                e.target.src = "/assets/Clients/alfamart.png";
                            }}
                        />
                    </div>

                    <div className="absolute top-4 right-2 bg-white rounded-full p-2 shadow-sm flex items-center justify-center" style={{ zIndex: 10 }}>
                        {checkStatusProject(project)}
                    </div>

                    {/* Gradient Overlay */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-5"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                {/* Content */}
                <motion.div
                    className="p-6 bg-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    {/* Client & Service Info */}
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-gray-500 font-medium">
                            {project.client_name}
                        </span>
                        <span className="text-xs text-[#3564A4] font-medium">
                            {formatDate(project.project_date)}
                        </span>
                    </div>

                    {/* Project Title */}
                    <motion.h3
                        className="text-lg font-semibold mb-3 text-card-foreground line-clamp-2"
                        whileHover={{ color: "#3564A4" }}
                        transition={{ duration: 0.3 }}
                    >
                        {project.title}
                    </motion.h3>

                    {/* Project Description */}
                    <motion.p
                        className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        {project.description}
                    </motion.p>

                    {/* Services Tags */}
                    {project.services && project.services.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {project.services.slice(0, 2).map((service) => (
                                <span
                                    key={`service-${project.id}-${service.id}`}
                                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                                >
                                    {service.name}
                                </span>
                            ))}
                            {project.services.length > 2 && (
                                <span
                                    key={`more-services-${project.id}`}
                                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                                >
                                    +{project.services.length - 2} more
                                </span>
                            )}
                        </div>
                    )}
                </motion.div>

                {/* Hover Border Effect */}
                <motion.div
                    className="absolute inset-0 rounded-lg border-2 border-transparent"
                    whileHover={{
                        borderColor: "#3564A4",
                        transition: { duration: 0.3 }
                    }}
                />
            </motion.div>
        );
    };

    // Conditional rendering
    if (loading) return <LoadingComponent />;

    return (
        <main className="bg-background">
            <motion.section
                className=" py-16 lg:py-24  px-4 max-w-7xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {/* Header - Selalu tampil */}
                <motion.div
                    className="text-center mb-16"
                    variants={itemVariants}
                >
                    <h1 className="text-2xl md:text-2xl lg:text-3xl font-semibold text-foreground mb-4 uppercase">
                        Driving Tangible Results for Leading Enterprises
                    </h1>
                    <motion.div
                        className="w-24 h-1 bg-gradient-to-r from-[#525254] to-[#3564A4] mx-auto rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: 96 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    />
                </motion.div>

                {/* Conditional Content */}
                {error ? (
                    <motion.div
                        className="text-center py-16"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-medium text-gray-900 mb-4">No Projects Found</h3>
                        <p className="text-gray-600 max-w-md mx-auto">
                            Projects will be displayed here once available. Check back soon for new content!
                        </p>
                    </motion.div>
                ) : projects.length > 0 ? (
                    <>
                        {/* Projects Grid */}
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {projects.map((project, index) => (
                                <Link
                                    key={`project-link-${project.id}`}
                                    href={`/work/projects/${generateSlugFromTitle(project.title)}`}
                                >
                                    <ProjectCard
                                        key={`project-card-${project.id}`}
                                        project={project}
                                        index={index}
                                    />
                                </Link>
                            ))}
                        </motion.div>

                        {/* CTA Section */}
                        <motion.div
                            className="text-center mt-16"
                            variants={itemVariants}
                        >
                            <Link href="/work/projects">
                                <motion.button
                                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#525254] to-[#3564A4] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    View All Projects
                                    <motion.svg
                                        className="ml-2 w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        whileHover={{ x: 5 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </motion.svg>
                                </motion.button>
                            </Link>
                        </motion.div>
                    </>
                ) : (
                    <motion.div
                        className="text-center py-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-medium text-gray-900 mb-4">No Projects Found</h3>
                        <p className="text-gray-600 max-w-md mx-auto">
                            Projects will be displayed here once available. Check back soon for new content!
                        </p>
                    </motion.div>
                )}
            </motion.section>
        </main>
    );
}