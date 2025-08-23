"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { use } from "react";
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Tag, Share2, Clock, Copy, MessageCircle } from 'lucide-react';

export default function ArticlePage({ params }) {
    // Unwrap params using React.use() for Next.js 15+
    const { slug } = use(params);
    const [articleData, setArticleData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getArticleBySlug = async () => {
        try {
            setLoading(true);
            
            // Step 1: Fetch semua articles untuk mencari yang sesuai dengan slug
            const allArticlesRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/public`);
            console.log('All Articles Response:', allArticlesRes.data);
            
            let allArticles = [];
            if (allArticlesRes.data && allArticlesRes.data.data) {
                allArticles = allArticlesRes.data.data;
            }
            
            // Step 2: Generate slug untuk setiap article dan cari yang match
            const generateSlugFromTitle = (title) => {
                return title
                    .toLowerCase()
                    .replace(/[^a-z0-9 -]/g, '') // Remove special characters
                    .replace(/\s+/g, '-') // Replace spaces with hyphens
                    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
                    .trim('-'); // Remove leading/trailing hyphens
            };
            
            const matchedArticle = allArticles.find(article => 
                generateSlugFromTitle(article.title) === slug
            );
            
            if (!matchedArticle) {
                throw new Error('Article not found');
            }
            
            // Step 3: Fetch article detail menggunakan ID
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/public/${matchedArticle.id}`);
            console.log('Article Data:', res.data);
            setArticleData(res.data);
            
        } catch (error) {
            console.error("Error fetching article:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (slug) {
            getArticleBySlug();
        }
    }, [slug]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#3768AA]"></div>
            </div>
        );
    }

    if (error || !articleData) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
                <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or has been moved.</p>
                <Link href="/article" className="px-6 py-3 bg-[#3768AA] text-white rounded-md hover:bg-[#3564A4] transition-colors duration-200">
                    Back to Articles
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-white">
            {/* Header/Breadcrumb - SEPERTI REFERENSI */}
            <div className="bg-white py-4">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link href="/article" className="inline-flex items-center text-sm text-gray-600 hover:text-[#3768AA] transition-colors duration-200">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Articles
                    </Link>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-12">
                    {/* Share Sidebar - SEPERTI REFERENSI */}
                    <div className="hidden lg:block w-16 flex-shrink-0">
                        <div className="sticky top-8">
                            <div className="text-center mb-4">
                                <span className="text-sm font-medium text-gray-600">Share</span>
                            </div>
                            <div className="space-y-2 flex flex-col items-center">
                                <button className="w-10 h-10 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center">
                                    <Copy className="w-4 h-4" />
                                </button>
                                <button className="w-10 h-10 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center">
                                    <MessageCircle className="w-4 h-4" />
                                </button>
                                <button className="w-10 h-10 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center">
                                    <Share2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content - LAYOUT SEPERTI REFERENSI */}
                    <div className="flex-1 max-w-4xl">
                        {/* Hero Section dengan Title dan Image */}
                        <div className="flex gap-8 mb-8">
                            {/* Left Content - Title & Meta */}
                            <div className="flex-1">
                                {/* Date */}
                                <div className="text-sm text-gray-500 mb-2">
                                    {formatDate(articleData.created_at)}
                                </div>

                                {/* Author & Editor Info */}
                                <div className="text-sm text-gray-600 mb-6">
                                    <span>Penulis {articleData.author}</span>
                                    <br />
                                    <span>Editor {articleData.author} (Copywriter)</span>
                                </div>

                                {/* Title */}
                                <motion.h1 
                                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    {articleData.title}
                                </motion.h1>

                                {/* Tags - SEPERTI REFERENSI */}
                                <motion.div 
                                    className="grid grid-cols-1 gap-4 mb-8"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    <div>
                                        <span className="text-sm font-medium text-gray-600 mr-2">Industry</span>
                                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm font-medium">
                                            {articleData.industry?.name || 'Materials'}
                                        </span>
                                    </div>
                                    {articleData.service && (
                                        <div>
                                            <span className="text-sm font-medium text-gray-600 mr-2">Expertises</span>
                                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm font-medium">
                                                {articleData.service.name}
                                            </span>
                                        </div>
                                    )}
                                </motion.div>
                            </div>

                            {/* Right Content - Hero Image */}
                            <div className="w-80 h-80 flex-shrink-0">
                                <motion.div
                                    className="relative w-full h-full rounded-lg overflow-hidden"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                >
                                    <Image
                                        src={ "/assets/avatar.jpg"}
                                        alt={articleData.title}
                                        layout="fill"
                                        objectFit="cover"
                                        className="w-full h-full"
                                    />
                                </motion.div>
                            </div>
                        </div>

                        {/* Article Content */}
                        <motion.div 
                            className="prose prose-lg max-w-none"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <div 
                                className="text-gray-700 leading-relaxed space-y-6"
                                style={{
                                    fontSize: '1.1rem',
                                    lineHeight: '1.8'
                                }}
                                dangerouslySetInnerHTML={{ 
                                    __html: articleData.content
                                        .replace(/\r\n\r\n/g, '</p><p class="mb-6">')
                                        .replace(/\r\n/g, '<br>')
                                        .replace(/^/, '<p class="mb-6">')
                                        .replace(/$/, '</p>')
                                }}
                            />
                        </motion.div>

                        {/* Related Articles Section */}
                        <motion.div 
                            className="mt-16"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {/* Related Article Cards */}
                                {[1,2,3,4].map((item) => (
                                    <div key={item} className="group cursor-pointer">
                                        <div className="aspect-w-16 aspect-h-9 mb-4">
                                            <div className="w-full h-32 bg-gray-200 rounded-lg"></div>
                                        </div>
                                        <h3 className="font-semibold text-sm text-gray-900 mb-2 line-clamp-2 group-hover:text-[#3768AA] transition-colors">
                                            Related Article Title {item}
                                        </h3>
                                        <p className="text-xs text-gray-600 line-clamp-2">
                                            Short description of the related article content...
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </main>
    );
}