"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { use } from "react";
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
    ArrowLeft,
    Calendar,
    User,
    Tag,
    Share2,
    Clock,
    Copy,
    MessageCircle,
    Facebook,
    Twitter,
    Linkedin,
    CheckCheck,
    Timer,
    Pause,
    Briefcase,
    ExternalLink,
    MapPin,
    Camera,
    ZoomIn,
    X,
    ChevronRight
} from 'lucide-react';

export default function ProjectPage({ params }) {
    // Unwrap params using React.use() for Next.js 15+
    const { slug } = use(params);
    const [projectData, setProjectData] = useState(null);
    const [relatedProjectsByService, setRelatedProjectsByService] = useState([]);
    const [relatedProjectsByClient, setRelatedProjectsByClient] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showTooltip, setShowTooltip] = useState('');
    const [lightboxImage, setLightboxImage] = useState(null);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const getCleanImageUrl = (imageUrl) => {
        if (!imageUrl) return "/assets/avatar.jpg";

        // Jika URL sudah mengandung localhost:8000/storage/https://yourdomain.com
        if (imageUrl.includes('storage/https://')) {
            // Extract filename dari URL yang rusak
            const filename = imageUrl.split('/').pop();
            return `http://localhost:8000/storage/projects/images/${filename}`;
        }

        // Jika URL sudah benar
        if (imageUrl.startsWith('http://localhost:8000')) {
            return imageUrl;
        }

        // Jika hanya path relatif
        if (imageUrl.startsWith('/storage/')) {
            return `http://localhost:8000${imageUrl}`;
        }

        // Default fallback
        return "/assets/projects/default-project.jpg";
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

    // Dummy documentation data - 5 images
    const getDummyDocumentation = () => {
        return [
            "/assets/Clients/alfamart.png",
            "/assets/Clients/FBI.png",
            "/assets/Clients/tma.png",
            "/assets/Clients/trigraha.png",
            "/assets/Clients/sinarmas.png"
        ];
    };

    // Lightbox functions
    const openLightbox = (imageUrl, index) => {
        setLightboxImage(imageUrl);
        setLightboxIndex(index);
    };

    const closeLightbox = () => {
        setLightboxImage(null);
        setLightboxIndex(0);
    };

    const nextImage = () => {
        const documentationImages = getDummyDocumentation();
        const nextIndex = (lightboxIndex + 1) % documentationImages.length;
        setLightboxIndex(nextIndex);
        setLightboxImage(documentationImages[nextIndex]);
    };

    const prevImage = () => {
        const documentationImages = getDummyDocumentation();
        const prevIndex = lightboxIndex === 0 ? documentationImages.length - 1 : lightboxIndex - 1;
        setLightboxIndex(prevIndex);
        setLightboxImage(documentationImages[prevIndex]);
    };

    // Handle keyboard events for lightbox
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (lightboxImage) {
                if (e.key === 'Escape') {
                    closeLightbox();
                } else if (e.key === 'ArrowRight') {
                    nextImage();
                } else if (e.key === 'ArrowLeft') {
                    prevImage();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxImage, lightboxIndex, projectData]);

    // Share Functions
    const shareToWhatsApp = () => {
        const url = window.location.href;
        const text = `Check out this project: ${projectData.title}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        window.open(whatsappUrl, '_blank');
    };

    const shareToFacebook = () => {
        const url = window.location.href;
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(facebookUrl, '_blank', 'width=600,height=400');
    };

    const shareToTwitter = () => {
        const url = window.location.href;
        const text = `Check out this project: ${projectData.title}`;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        window.open(twitterUrl, '_blank', 'width=600,height=400');
    };

    const shareToLinkedIn = () => {
        const url = window.location.href;
        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        window.open(linkedinUrl, '_blank', 'width=600,height=400');
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setShowTooltip('copy');
            setTimeout(() => setShowTooltip(''), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    const nativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: projectData.title,
                    text: projectData.description,
                    url: window.location.href,
                });
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            copyToClipboard();
        }
    };

    const getProjectBySlug = async () => {
        try {
            setLoading(true);
            // Step 1: Fetch semua projects untuk mencari yang sesuai dengan slug
            const allProjectsRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/public`);
            console.log('All Projects Response:', allProjectsRes.data);

            let allProjects = [];
            if (allProjectsRes.data && Array.isArray(allProjectsRes.data)) {
                allProjects = allProjectsRes.data;
            }

            // Step 2: Generate slug untuk setiap project dan cari yang match
            const generateSlugFromTitle = (title) => {
                return title
                    .toLowerCase()
                    .replace(/[^a-z0-9 -]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-')
                    .trim('-');
            };

            const matchedProject = allProjects.find(project =>
                generateSlugFromTitle(project.title) === slug
            );

            if (!matchedProject) {
                throw new Error('Project not found');
            }

            // Step 3: Set project data (data sudah lengkap dari API public)
            setProjectData(matchedProject);

        } catch (error) {
            console.error("Error fetching project:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    // Function untuk fetch related projects by service
    const getProjectsByService = async (services) => {
        try {
            const allProjectsRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/public`);

            if (allProjectsRes.data && Array.isArray(allProjectsRes.data)) {
                // Filter projects yang memiliki service yang sama
                const filteredProjects = allProjectsRes.data
                    .filter(project => {
                        // Filter out current project
                        if (project.id === projectData?.id) return false;

                        // Check if project has any matching services
                        return project.services && project.services.some(service =>
                            services.some(currentService => currentService.id === service.id)
                        );
                    })
                    .slice(0, 4);

                setRelatedProjectsByService(filteredProjects);
            } else {
                setRelatedProjectsByService([]);
            }
        } catch (error) {
            console.error("Error fetching projects by service:", error);
            setRelatedProjectsByService([]);
        }
    }

    // Function untuk fetch related projects by client
    const getProjectsByClient = async (clientId) => {
        try {
            const allProjectsRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/public`);

            if (allProjectsRes.data && Array.isArray(allProjectsRes.data)) {
                // Filter projects yang memiliki client yang sama
                const filteredProjects = allProjectsRes.data
                    .filter(project => {
                        // Filter out current project
                        if (project.id === projectData?.id) return false;

                        // Check if project has same client
                        return project.client_id === clientId;
                    })
                    .slice(0, 4);

                setRelatedProjectsByClient(filteredProjects);
            } else {
                setRelatedProjectsByClient([]);
            }
        } catch (error) {
            console.error("Error fetching projects by client:", error);
            setRelatedProjectsByClient([]);
        }
    }

    // useEffect terpisah untuk fetch related projects
    useEffect(() => {
        if (slug) {
            getProjectBySlug();
        }
    }, [slug]);

    // useEffect untuk fetch related projects setelah projectData ada
    useEffect(() => {
        if (projectData) {
            if (projectData.services && projectData.services.length > 0) {
                getProjectsByService(projectData.services);
            }
            if (projectData.client_id) {
                getProjectsByClient(projectData.client_id);
            }
        }
    }, [projectData]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const generateSlugFromTitle = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim('-');
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#3768AA]"></div>
            </div>
        );
    }

    if (error || !projectData) {
        return (
            <div className="flex flex-col justify-center items-center h-screen px-4">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-center">Project Not Found</h1>
                <p className="text-gray-600 mb-6 text-center text-sm sm:text-base">The project you're looking for doesn't exist or has been moved.</p>
                <Link href="/work/projects" className="px-4 sm:px-6 py-2 sm:py-3 bg-[#3768AA] text-white rounded-md hover:bg-[#3564A4] transition-colors duration-200 text-sm sm:text-base">
                    Back to Projects
                </Link>
            </div>
        );
    }

    const statusConfig = getStatusConfig(projectData.status);
    const StatusIcon = statusConfig.icon;

    return (
        <main className="min-h-screen bg-white">
            {/* Lightbox Modal */}
            {lightboxImage && (
                <motion.div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closeLightbox}
                >
                    <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
                        {/* Close Button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Navigation Buttons */}
                        {getDummyDocumentation().length > 1 && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        prevImage();
                                    }}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
                                >
                                    <ArrowLeft className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        nextImage();
                                    }}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </>
                        )}

                        {/* Image Counter */}
                        {getDummyDocumentation().length > 1 && (
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                                {lightboxIndex + 1} / {getDummyDocumentation().length}
                            </div>
                        )}

                        {/* Image */}
                        <motion.div
                            className="relative max-w-full max-h-full"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={lightboxImage}
                                alt={`${projectData.title} documentation ${lightboxIndex + 1}`}
                                width={1200}
                                height={800}
                                className="max-w-full max-h-full object-contain"
                                onError={(e) => {
                                    e.target.src = "/assets/avatar.jpg";
                                }}
                            />
                        </motion.div>
                    </div>
                </motion.div>
            )}

            {/* Header/Breadcrumb - Mobile Responsive */}
            <div className="bg-white py-3 sm:py-4 border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link href="/work/projects" className="inline-flex items-center text-sm text-gray-600 hover:text-[#3768AA] transition-colors duration-200">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Projects
                    </Link>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
                    {/* Share Sidebar - Desktop Only */}
                    <div className="hidden lg:block w-16 flex-shrink-0">
                        <div className="sticky top-24">
                            <div className="text-center mb-4">
                                <span className="text-sm font-medium text-gray-600">Share</span>
                            </div>
                            <div className="space-y-2 flex flex-col items-center">
                                <button
                                    className="w-10 h-10 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center relative group"
                                    onClick={copyToClipboard}
                                    title="Copy Link"
                                >
                                    <Copy className="w-4 h-4" />
                                    {showTooltip === 'copy' && (
                                        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                                            URL copied!
                                        </span>
                                    )}
                                </button>

                                <button
                                    className="w-10 h-10 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200 flex items-center justify-center"
                                    onClick={shareToWhatsApp}
                                    title="Share to WhatsApp"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                </button>

                                <button
                                    className="w-10 h-10 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                                    onClick={shareToFacebook}
                                    title="Share to Facebook"
                                >
                                    <Facebook className="w-4 h-4" />
                                </button>

                                <button
                                    className="w-10 h-10 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors duration-200 flex items-center justify-center"
                                    onClick={shareToTwitter}
                                    title="Share to Twitter"
                                >
                                    <Twitter className="w-4 h-4" />
                                </button>

                                <button
                                    className="w-10 h-10 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors duration-200 flex items-center justify-center"
                                    onClick={shareToLinkedIn}
                                    title="Share to LinkedIn"
                                >
                                    <Linkedin className="w-4 h-4" />
                                </button>

                                <button
                                    className="w-10 h-10 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center"
                                    onClick={nativeShare}
                                    title="More Share Options"
                                >
                                    <Share2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 max-w-4xl">
                        {/* Hero Section - Mobile Responsive */}
                        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-6 lg:mb-8">
                            {/* Hero Image - Show first on mobile */}
                            <div className="w-full lg:w-80 h-48 sm:h-64 lg:h-80 flex-shrink-0 order-1 lg:order-2">
                                <motion.div
                                    className="relative w-full h-full rounded-lg overflow-hidden"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                >
                                    <Image
                                        src={"/assets/avatar.jpg"}
                                        alt={projectData.title}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="w-full h-full"
                                        onError={(e) => {
                                            console.log('Image load error:', e);
                                            e.target.src = "/assets/avatar.jpg";
                                        }}
                                    />
                                </motion.div>
                            </div>

                            {/* Title & Meta - Show second on mobile */}
                            <div className="flex-1 order-2 lg:order-1">
                                {/* Project Date */}
                                <div className="text-xs sm:text-sm text-gray-500 mb-2">
                                    {formatDate(projectData.project_date)}
                                </div>

                                {/* Client & Status Info */}
                                <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-600 mb-4 lg:mb-6">
                                    <div className="flex items-center gap-1">
                                        <User className="w-3 h-3" />
                                        <span>Client: {projectData.client_name}</span>
                                    </div>
                                    <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${statusConfig.color}`}>
                                        <StatusIcon className="w-3 h-3" />
                                        <span className="font-medium">{statusConfig.text}</span>
                                    </div>
                                </div>

                                {/* Title - Responsive sizing */}
                                <motion.h1
                                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 lg:mb-6 leading-tight"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    {projectData.title}
                                </motion.h1>

                                {/* Client Logo */}
                                {projectData.client && (
                                    <div className="flex items-center gap-3 mb-4 lg:mb-6">
                                        <Image
                                            src={"/assets/Clients/alfamart.png"}
                                            alt={`${projectData.client_name} logo`}
                                            width={40}
                                            height={40}
                                            className="object-contain"
                                            onError={(e) => {
                                                e.target.src = "/assets/avatar.jpg";
                                            }}
                                        />
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{projectData.client.title}</div>
                                            <div className="text-xs text-gray-500">Client</div>
                                        </div>
                                    </div>
                                )}

                                {/* Services Tags - Mobile optimized */}
                                {projectData.services && projectData.services.length > 0 && (
                                    <motion.div
                                        className="space-y-2 sm:space-y-3 mb-6 lg:mb-8"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                    >
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-xs sm:text-sm font-medium text-gray-600">Services</span>
                                            {projectData.services.map((service) => (
                                                <span
                                                    key={service.id}
                                                    className="px-2 sm:px-3 py-1 bg-[#3768AA]/10 text-[#3768AA] rounded-md text-xs sm:text-sm font-medium"
                                                >
                                                    {service.name}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>

                        {/* Mobile Share Buttons */}
                        <div className="lg:hidden mb-6">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-medium text-gray-600 mr-2">Share:</span>
                                <button
                                    className="px-2 sm:px-3 py-1 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-200 text-xs sm:text-sm flex items-center gap-1"
                                    onClick={copyToClipboard}
                                >
                                    <Copy className="w-3 h-3" />
                                    <span className="hidden xs:inline">Copy</span>
                                </button>
                                <button
                                    className="px-2 sm:px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200 text-xs sm:text-sm flex items-center gap-1"
                                    onClick={shareToWhatsApp}
                                >
                                    <MessageCircle className="w-3 h-3" />
                                    <span className="hidden xs:inline">WhatsApp</span>
                                </button>
                                <button
                                    className="px-2 sm:px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-xs sm:text-sm flex items-center gap-1"
                                    onClick={shareToFacebook}
                                >
                                    <Facebook className="w-3 h-3" />
                                    <span className="hidden xs:inline">Facebook</span>
                                </button>
                                <button
                                    className="px-2 sm:px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200 text-xs sm:text-sm flex items-center gap-1"
                                    onClick={nativeShare}
                                >
                                    <Share2 className="w-3 h-3" />
                                    <span className="hidden xs:inline">More</span>
                                </button>
                            </div>
                        </div>

                        {/* Project Content - Mobile optimized */}
                        <motion.div
                            className="prose prose-sm sm:prose lg:prose-lg max-w-none"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <div
                                className="text-gray-700 leading-relaxed space-y-4 sm:space-y-6"
                                style={{
                                    fontSize: '0.9rem',
                                    lineHeight: '1.7'
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: projectData.content
                                        .replace(/\r\n\r\n/g, '</p><p class="mb-4 sm:mb-6">')
                                        .replace(/\r\n/g, '<br>')
                                        .replace(/^/, '<p class="mb-4 sm:mb-6">')
                                        .replace(/$/, '</p>')
                                }}
                            />
                        </motion.div>

                        {/* Project Documentation Section - 3 column grid layout */}
                        <motion.div
                            className="mt-12 sm:mt-16"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <div className="flex items-center gap-2 mb-6 sm:mb-8">
                                <Camera className="w-6 h-6 text-[#3768AA]" />
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                                    Project Documentation
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                {/* First Image */}
                                <motion.div
                                    className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                    onClick={() => openLightbox(getDummyDocumentation()[0], 0)}
                                >
                                    <Image
                                        src={getDummyDocumentation()[0]}
                                        alt={`${projectData.title} documentation 1`}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                                        onError={(e) => {
                                            e.target.src = "/assets/avatar.jpg";
                                        }}
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                                        <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>

                                    {/* Image Number */}
                                    <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-md">
                                        1
                                    </div>
                                </motion.div>

                                {/* Second Image */}
                                <motion.div
                                    className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                    onClick={() => openLightbox(getDummyDocumentation()[1], 1)}
                                >
                                    <Image
                                        src={getDummyDocumentation()[1]}
                                        alt={`${projectData.title} documentation 2`}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                                        onError={(e) => {
                                            e.target.src = "/assets/avatar.jpg";
                                        }}
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                                        <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>

                                    {/* Image Number */}
                                    <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-md">
                                        2
                                    </div>
                                </motion.div>

                                {/* Third Image with Multiple Photos Overlay */}
                                <motion.div
                                    className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                    onClick={() => openLightbox(getDummyDocumentation()[2], 2)}
                                >
                                    <Image
                                        src={getDummyDocumentation()[2]}
                                        alt={`${projectData.title} documentation 3`}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                                        onError={(e) => {
                                            e.target.src = "/assets/avatar.jpg";
                                        }}
                                    />

                                    {/* Dark Overlay with Text */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                                        <div className="text-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="text-2xl sm:text-3xl font-bold mb-1">
                                                +{getDummyDocumentation().length - 2}
                                            </div>
                                            <div className="text-sm sm:text-base">
                                                Photos
                                            </div>
                                        </div>
                                    </div>

                                    {/* Always visible overlay for remaining photos count */}
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                        <div className="text-center text-white">
                                            <div className="text-xl sm:text-2xl font-bold mb-1">
                                                +{getDummyDocumentation().length - 2}
                                            </div>
                                            <div className="text-xs sm:text-sm">
                                                Photos
                                            </div>
                                        </div>
                                    </div>

                                    {/* Image Number */}
                                    <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-md">
                                        3
                                    </div>
                                </motion.div>
                            </div>

                            {/* Documentation Info */}
                            <div className="mt-4 text-center">
                                <p className="text-sm text-gray-600">
                                    Click on any image to view in full size • {getDummyDocumentation().length} images total
                                </p>
                            </div>
                        </motion.div>


                        {/* Related Projects by Service - Mobile optimized */}
                        {relatedProjectsByService.length > 0 ? (
                            <motion.div
                                className="mt-12 sm:mt-16"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">
                                    Related Projects by Services
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                                    {relatedProjectsByService.map((project) => (
                                        <Link
                                            key={project.id}
                                            href={`/work/projects/${generateSlugFromTitle(project.title)}`}
                                            className="group cursor-pointer"
                                        >
                                            <div className="aspect-w-16 aspect-h-9 mb-3 sm:mb-4">
                                                <Image
                                                    src={"/assets/avatar.jpg"}
                                                    alt={project.title}
                                                    className="w-full h-32 object-cover rounded-lg"
                                                    width={300}
                                                    height={128}
                                                />
                                            </div>
                                            <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-2 line-clamp-2 group-hover:text-[#3768AA] transition-colors">
                                                {project.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                                                {project.description}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                className="mt-12 sm:mt-16"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">
                                    Related Projects by Services
                                </h2>
                                <div className="bg-gray-50 rounded-lg p-6 sm:p-8 text-center">
                                    <div className="text-gray-400 mb-4">
                                        <Briefcase className="w-12 sm:w-16 h-12 sm:h-16 mx-auto" />
                                    </div>
                                    <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
                                        Sorry, there's no more projects with similar services.
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {/* Related Projects by Client - Mobile optimized */}
                        {relatedProjectsByClient.length > 0 ? (
                            <motion.div
                                className="mt-12 sm:mt-16"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                            >
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">
                                    More Projects from {projectData.client_name}
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                                    {relatedProjectsByClient.map((project) => (
                                        <Link
                                            key={project.id}
                                            href={`/work/projects/${generateSlugFromTitle(project.title)}`}
                                            className="group cursor-pointer"
                                        >
                                            <div className="aspect-w-16 aspect-h-9 mb-3 sm:mb-4">
                                                <Image
                                                    src={getCleanImageUrl(project.image_url)}
                                                    alt={project.title}
                                                    className="w-full h-32 object-cover rounded-lg"
                                                    width={300}
                                                    height={128}
                                                />
                                            </div>
                                            <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-2 line-clamp-2 group-hover:text-[#3768AA] transition-colors">
                                                {project.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                                                {project.description}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                className="mt-12 sm:mt-16"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                            >
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">
                                    More Projects from {projectData.client_name}
                                </h2>
                                <div className="bg-gray-50 rounded-lg p-6 sm:p-8 text-center">
                                    <div className="text-gray-400 mb-4">
                                        <Briefcase className="w-12 sm:w-16 h-12 sm:h-16 mx-auto" />
                                    </div>
                                    <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
                                        This is the only project from <span className="font-semibold">{projectData.client_name}</span> in our portfolio.
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}