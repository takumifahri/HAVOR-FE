"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function ArticleSection() {
    const [articles, setArticles] = useState([]);
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
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim('-');
    };

    // Fetch articles data
    const fetchArticles = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/public`);
            if (response.data && Array.isArray(response.data.data)) {
                setArticles(response.data.data.slice(0, 6));
            } else {
                setArticles([]);
            }
        } catch (error) {
            console.error('Error fetching articles:', error);
            setError('Failed to load articles');
            setArticles([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    // Helper functions
    const getCleanImageUrl = (imageUrl) => {
        if (!imageUrl) return "/assets/avatar.jpg";
        if (imageUrl.startsWith('http://127.0.0.1:8000')) {
            return imageUrl;
        }
        if (imageUrl.startsWith('/storage/')) {
            return `http://127.0.0.1:8000${imageUrl}`;
        }
        return "/assets/avatar.jpg";
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
        });
    };

    // Loading component
    const LoadingComponent = () => (
        <section className="py-16 px-4 max-w-7xl mx-auto">
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#3768AA]"></div>
            </div>
        </section>
    );

    // Error component
    const ErrorComponent = () => (
        <section className="py-16 px-4 max-w-7xl mx-auto">
            <div className="text-center">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                    onClick={fetchArticles}
                    className="px-4 py-2 bg-[#3768AA] text-white rounded-md hover:bg-[#3564A4] transition-colors"
                >
                    Try Again
                </button>
            </div>
        </section>
    );

    // Empty state component
    const EmptyStateComponent = () => (
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
            <h3 className="text-2xl font-medium text-gray-900 mb-4">No Content have been updated</h3>
            <p className="text-gray-600 max-w-md mx-auto">
                Please wait and come again soon.
            </p>
        </motion.div>
    );

    // Article card component
    const ArticleCard = ({ article }) => {
        return (
            <motion.div
                key={`article-${article.id}`}
                className="group overflow-hidden rounded-lg border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-white flex flex-col"
                variants={cardVariants}
                whileHover={{
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
            >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                    <motion.div
                        className="relative w-full h-full"
                        whileHover={{ scale: 1.07 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <Image
                            src={getCleanImageUrl(article.image_url)}
                            alt={article.title}
                            fill
                            style={{ objectFit: 'cover' }}
                            className="w-full h-full"
                            onError={(e) => {
                                e.target.src = "/assets/avatar.jpg";
                            }}
                        />
                    </motion.div>
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
                    className="p-6 bg-card flex-1 flex flex-col"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    {/* Meta Info */}
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500 font-medium">
                            {article.author}
                        </span>
                        <span className="text-xs text-[#3564A4] font-medium">
                            {formatDate(article.created_at)}
                        </span>
                    </div>
                
                    {/* Article Title */}
                    <motion.h3
                        className="text-lg font-semibold mb-2 text-card-foreground line-clamp-2"
                        whileHover={{ color: "#3564A4" }}
                        transition={{ duration: 0.3 }}
                    >
                        {article.title}
                    </motion.h3>
                    {/* Short Description */}
                    <motion.p
                        className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        {article.short_description}
                    </motion.p>
                        {/* Industry & Service */}
                    <div className="flex justify-between gap-2 mt-4">
                        {article.industry && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                                {article.industry.name}
                            </span>
                        )}
                        {article.service && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                                {article.service.name}
                            </span>
                        )}
                    </div>
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
    if (error) return <ErrorComponent />;

    return (
        <main className="bg-background">
            <motion.section
                className="py-16 lg:py-24 px-4 max-w-7xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    variants={itemVariants}
                >
                    <h1 className="text-2xl md:text-2xl lg:text-3xl font-semibold text-foreground mb-4 uppercase">
                        Latest Insights & Articles
                    </h1>
                    <motion.div
                        className="w-24 h-1 bg-gradient-to-r from-[#525254] to-[#3564A4] mx-auto rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: 96 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    />
                </motion.div>

                {/* Articles Grid */}
                {articles.length > 0 ? (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {articles.map((article) => (
                            <Link
                                key={`article-link-${article.id}`}
                                href={`/article/${generateSlugFromTitle(article.title)}`}
                            >
                                <ArticleCard article={article} />
                            </Link>
                        ))}
                    </motion.div>
                ) : (
                    <EmptyStateComponent />
                )}

                {/* CTA Section */}
                <motion.div
                    className="text-center mt-16"
                    variants={itemVariants}
                >
                    <Link href="/article">
                        <motion.button
                            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#525254] to-[#3564A4] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            View All Articles
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
            </motion.section>
        </main>
    );
}