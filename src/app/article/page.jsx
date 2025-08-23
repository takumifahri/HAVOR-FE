"use client"

import AOS from 'aos';
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Search, Calendar, User, Tag, BookOpen, ChevronRight, Filter } from 'lucide-react';
import axios from 'axios';
import Image from 'next/image';

export default function ArticlePage() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedService, setSelectedService] = useState('all');
    const [selectedIndustry, setSelectedIndustry] = useState('all');
    const generateSlugFromTitle = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '') // Remove special characters
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
            .trim('-'); // Remove leading/trailing hyphens
    };
    const getArticles = async (page = 1) => {
        try {
            setLoading(true);
            console.log('Fetching articles for page:', page);
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/public?page=${page}`);
            console.log('Articles Response:', response.data);

            if (response.data && response.data.data) {
                setArticles(response.data.data);
                setPagination({
                    current_page: response.data.current_page,
                    last_page: response.data.last_page,
                    total: response.data.total,
                    per_page: response.data.per_page,
                    links: response.data.links
                });
                setCurrentPage(response.data.current_page);
            } else {
                console.log('No articles found in response');
                setArticles([]);
                setPagination(null);
            }
        } catch (error) {
            console.error('Error fetching articles:', error);
            setArticles([]);
            setPagination(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getArticles();
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    const handlePageChange = (page) => {
        if (page !== currentPage && page >= 1 && page <= pagination?.last_page) {
            getArticles(page);
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

    // Get unique services and industries for filtering
    const uniqueServices = [...new Set(articles.map(article => article.service?.name).filter(Boolean))];
    const uniqueIndustries = [...new Set(articles.map(article => article.industry?.name).filter(Boolean))];

    // Filter articles based on selected filters
    const filteredArticles = articles.filter(article => {
        const serviceMatch = selectedService === 'all' || article.service?.name === selectedService;
        const industryMatch = selectedIndustry === 'all' || article.industry?.name === selectedIndustry;
        return serviceMatch && industryMatch;
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
                                    backgroundImage: `url("/assets/hero/about-hero.jpg")`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            >
                                {/* Dark Overlay */}
                                <div className="absolute inset-0 bg-black/70 z-0"></div>

                                {/* Content Container */}
                                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                                    <div className="text-center">
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
                                            Articles & Insights
                                        </motion.h1>

                                        <motion.p
                                            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto"
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8, delay: 0.2 }}
                                        >
                                            Discover the latest trends, insights, and innovations in technology, digital transformation, and industry best practices from our expert team.
                                        </motion.p>

                                        <motion.div
                                            className="flex items-center justify-center gap-6 text-sm text-gray-300"
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8, delay: 0.4 }}
                                        >
                                            <div className="flex items-center gap-2">
                                                <BookOpen className="w-4 h-4" />
                                                <span>{pagination?.total || 0} Articles</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Tag className="w-4 h-4" />
                                                <span>Multiple Topics</span>
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
                                            Filter Articles
                                        </h2>
                                        <div className="text-sm text-gray-600">
                                            Showing {filteredArticles.length} of {articles.length} articles
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

                                        {/* Industry Filter */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                                            <select
                                                value={selectedIndustry}
                                                onChange={(e) => setSelectedIndustry(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3768AA] focus:border-transparent"
                                            >
                                                <option value="all">All Industries</option>
                                                {uniqueIndustries.map(industry => (
                                                    <option key={industry} value={industry}>{industry}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Reset Filters Button */}
                                        <div className="flex items-end">
                                            <button
                                                onClick={() => {
                                                    setSelectedService('all');
                                                    setSelectedIndustry('all');
                                                }}
                                                className="px-4 py-2 text-sm text-[#3768AA] border border-[#3768AA] rounded-md hover:bg-[#3768AA] hover:text-white transition-colors duration-200"
                                            >
                                                Reset Filters
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Articles Grid */}
                                {filteredArticles && filteredArticles.length > 0 ? (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                            {filteredArticles.map((article, index) => (
                                                <motion.article
                                                    key={article.id}
                                                    className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                                                    initial={{ opacity: 0, y: 30 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                                    whileHover={{ y: -8 }}
                                                >
                                                    {/* Article Image */}
                                                    <div className="relative h-48 overflow-hidden">
                                                        <Image
                                                            src={ "/assets/avatar.jpg"}
                                                            alt={article.title}
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                            layout="fill"
                                                            objectFit="cover"
                                                        />

                                                        {/* Overlay */}
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                                        {/* Service Badge */}
                                                        {article.service && (
                                                            <div className="absolute top-3 left-3">
                                                                <div className="bg-[#3768AA]/90 backdrop-blur-sm rounded-md px-2 py-1 shadow-md">
                                                                    <span className="text-xs font-medium text-white">
                                                                        {article.service.name}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Industry Badge */}
                                                        {article.industry && (
                                                            <div className="absolute top-3 right-3">
                                                                <div className="bg-white/90 backdrop-blur-sm rounded-md px-2 py-1 shadow-md">
                                                                    <span className="text-xs font-medium text-gray-800">
                                                                        {article.industry.name}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Read More Button - UBAH BAGIAN INI */}
                                                        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                                            <Link href={`/article/${generateSlugFromTitle(article.title)}`}>
                                                                <button className="w-full bg-white/90 backdrop-blur-sm text-[#3768AA] px-3 py-2 rounded-md text-sm font-medium hover:bg-white transition-colors duration-200 flex items-center justify-center gap-1">
                                                                    Read Full Article
                                                                    <ChevronRight className="w-3 h-3" />
                                                                </button>
                                                            </Link>
                                                        </div>
                                                    </div>

                                                    {/* Article Content */}
                                                    <div className="p-6">
                                                        {/* Article Meta */}
                                                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                                                            <div className="flex items-center gap-1">
                                                                <Calendar className="w-3 h-3" />
                                                                <span>{formatDate(article.created_at)}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <User className="w-3 h-3" />
                                                                <span>{article.author}</span>
                                                            </div>
                                                        </div>

                                                        {/* Article Title - JUGA BISA DIJADIKAN LINK */}
                                                        <Link href={`/article/${generateSlugFromTitle(article.title)}`}>
                                                            <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#3768AA] transition-colors duration-200 cursor-pointer">
                                                                {article.title}
                                                            </h3>
                                                        </Link>

                                                        {/* Article Description */}
                                                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                                                            {article.short_description}
                                                        </p>

                                                        {/* Article Footer */}
                                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-8 h-8 bg-[#3768AA]/10 rounded-full flex items-center justify-center">
                                                                    <BookOpen className="w-4 h-4 text-[#3768AA]" />
                                                                </div>
                                                                <span className="text-xs text-gray-600 font-medium">Article</span>
                                                            </div>

                                                            <Link href={`/article/${generateSlugFromTitle(article.title)}`}>
                                                                <div className="text-[#3768AA] opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                                                                    <ChevronRight className="w-5 h-5" />
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>

                                                    {/* Hover Border Effect */}
                                                    <div className="absolute inset-0 rounded-xl border-2 border-[#3768AA]/0 group-hover:border-[#3768AA]/20 transition-colors duration-300 pointer-events-none"></div>
                                                </motion.article>
                                            ))}
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
                                            <BookOpen className="w-10 h-10 text-gray-400" />
                                        </div>
                                        <h3 className="text-2xl font-medium text-gray-900 mb-4">No Articles Found</h3>
                                        <p className="text-gray-600 max-w-md mx-auto">
                                            {selectedService !== 'all' || selectedIndustry !== 'all'
                                                ? 'No articles match your current filters. Try adjusting your filter criteria.'
                                                : 'Articles will be displayed here once available. Check back soon for new content!'
                                            }
                                        </p>
                                        {(selectedService !== 'all' || selectedIndustry !== 'all') && (
                                            <button
                                                onClick={() => {
                                                    setSelectedService('all');
                                                    setSelectedIndustry('all');
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