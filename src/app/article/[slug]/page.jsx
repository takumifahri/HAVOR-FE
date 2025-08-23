"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { use } from "react";
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Tag, Share2, Clock, Copy, MessageCircle, Facebook, Twitter, Linkedin } from 'lucide-react';

export default function ArticlePage({ params }) {
    // Unwrap params using React.use() for Next.js 15+
    const { slug } = use(params);
    const [articleData, setArticleData] = useState(null);
    const [relatedArticlesByService, setRelatedArticlesByService] = useState([]);
    const [relatedArticlesByIndustry, setRelatedArticlesByIndustry] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showTooltip, setShowTooltip] = useState('');

    const getCleanImageUrl = (imageUrl) => {
        if (!imageUrl) return "/assets/avatar.jpg";

        // Jika URL sudah mengandung localhost:8000/storage/https://yourdomain.com
        if (imageUrl.includes('storage/https://')) {
            // Extract filename dari URL yang rusak
            const filename = imageUrl.split('/').pop();
            return `http://localhost:8000/storage/articles/${filename}`;
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
        return "/assets/articles/default-article.jpg";
    };

    // Share Functions
    const shareToWhatsApp = () => {
        const url = window.location.href;
        const text = `Check out this article: ${articleData.title}`;
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
        const text = `Check out this article: ${articleData.title}`;
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
                    title: articleData.title,
                    text: articleData.short_description,
                    url: window.location.href,
                });
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            copyToClipboard();
        }
    };

    const getArticleBySlug = async () => {
        try {
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
                    .replace(/[^a-z0-9 -]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-')
                    .trim('-');
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

    // Pisahkan function untuk fetch related articles by service
    const getArticlesByService = async (serviceId) => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/services/public/${serviceId}/articles`);
            console.log('Articles by Service Response:', res.data);

            if (res.data && res.data.articles) {
                // Filter out current article dan ambil maksimal 4
                const filteredArticles = res.data.articles
                    .filter(article => article.id !== articleData?.id)
                    .slice(0, 4);
                setRelatedArticlesByService(filteredArticles);
            } else {
                setRelatedArticlesByService([]);
            }
        } catch (error) {
            console.error("Error fetching articles by service:", error);
            setRelatedArticlesByService([]);
        }
    }

    // Function untuk fetch related articles by industry
    const getArticlesByIndustry = async (industryId) => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/industries/public/${industryId}/articles`);
            console.log('Articles by Industry Response:', res.data);

            if (res.data && res.data.articles && res.data.articles.data) {
                // Filter out current article dan ambil maksimal 4
                const filteredArticles = res.data.articles.data
                    .filter(article => article.id !== articleData?.id)
                    .slice(0, 4);
                setRelatedArticlesByIndustry(filteredArticles);
            } else {
                setRelatedArticlesByIndustry([]);
            }
        } catch (error) {
            console.error("Error fetching articles by industry:", error);
            setRelatedArticlesByIndustry([]);
        }
    }

    // useEffect terpisah untuk fetch related articles
    useEffect(() => {
        if (slug) {
            getArticleBySlug();
        }
    }, [slug]);

    // useEffect untuk fetch related articles setelah articleData ada
    useEffect(() => {
        if (articleData) {
            if (articleData.service?.id) {
                getArticlesByService(articleData.service.id);
            }
            if (articleData.industry?.id) {
                getArticlesByIndustry(articleData.industry.id);
            }
        }
    }, [articleData]);

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
            {/* Header/Breadcrumb */}
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
                    {/* Share Sidebar */}
                    <div className="hidden lg:block w-16 flex-shrink-0">
                        <div className="sticky top-8">
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

                                {/* Tags */}
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
                                        src={'/assets/avatar.jpg'}
                                        alt={articleData.title}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="w-full h-full"
                                        onError={(e) => {
                                            console.log('Image load error:', e);
                                            e.target.src = "/assets/articles/default-article.jpg";
                                        }}
                                    />
                                </motion.div>
                            </div>
                        </div>

                        {/* Mobile Share Buttons */}
                        <div className="lg:hidden mb-6">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-medium text-gray-600 mr-2">Share:</span>
                                <button
                                    className="px-3 py-1 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-200 text-sm flex items-center gap-1"
                                    onClick={copyToClipboard}
                                >
                                    <Copy className="w-3 h-3" />
                                    Copy
                                </button>
                                <button
                                    className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200 text-sm flex items-center gap-1"
                                    onClick={shareToWhatsApp}
                                >
                                    <MessageCircle className="w-3 h-3" />
                                    WhatsApp
                                </button>
                                <button
                                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm flex items-center gap-1"
                                    onClick={shareToFacebook}
                                >
                                    <Facebook className="w-3 h-3" />
                                    Facebook
                                </button>
                                <button
                                    className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200 text-sm flex items-center gap-1"
                                    onClick={nativeShare}
                                >
                                    <Share2 className="w-3 h-3" />
                                    More
                                </button>
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


                        {/* Related Articles by Industry */}
                        {relatedArticlesByIndustry.length > 0 ? (
                            <motion.div
                                className="mt-16"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles To {articleData.industry?.name} Industry</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {relatedArticlesByIndustry.map((article) => (
                                        <Link
                                            key={article.id}
                                            href={`/article/${generateSlugFromTitle(article.title)}`}
                                            className="group cursor-pointer"
                                        >
                                            <div className="aspect-w-16 aspect-h-9 mb-4">
                                                <Image
                                                    src={'/assets/avatar.jpg'}
                                                    alt={article.title}
                                                    className="w-full h-32 object-cover rounded-lg"
                                                    width={300}
                                                    height={128}
                                                />
                                            </div>
                                            <h3 className="font-semibold text-sm text-gray-900 mb-2 line-clamp-2 group-hover:text-[#3768AA] transition-colors">
                                                {article.title}
                                            </h3>
                                            <p className="text-xs text-gray-600 line-clamp-2">
                                                {article.short_description}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                className="mt-16"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles To {articleData.industry?.name} Industry</h2>
                                <div className="bg-gray-50 rounded-lg p-8 text-center">
                                    <div className="text-gray-400 mb-4">
                                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-600 text-lg">
                                        Sorry, there's no more articles that related to <span className="font-semibold">{articleData.industry?.name}</span> industry.
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {/* Related Articles by Service */}
                        {relatedArticlesByService.length > 0 ? (
                            <motion.div
                                className="mt-16"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                            >
                                <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles To {articleData.service?.name}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {relatedArticlesByService.map((article) => (
                                        <Link
                                            key={article.id}
                                            href={`/article/${generateSlugFromTitle(article.title)}`}
                                            className="group cursor-pointer"
                                        >
                                            <div className="aspect-w-16 aspect-h-9 mb-4">
                                                <Image
                                                    src={'/assets/avatar.jpg'}
                                                    alt={article.title}
                                                    className="w-full h-32 object-cover rounded-lg"
                                                    width={300}
                                                    height={128}
                                                />
                                            </div>
                                            <h3 className="font-semibold text-sm text-gray-900 mb-2 line-clamp-2 group-hover:text-[#3768AA] transition-colors">
                                                {article.title}
                                            </h3>
                                            <p className="text-xs text-gray-600 line-clamp-2">
                                                {article.short_description}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                className="mt-16"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                            >
                                <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles To {articleData.service?.name}</h2>
                                <div className="bg-gray-50 rounded-lg p-8 text-center">
                                    <div className="text-gray-400 mb-4">
                                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-600 text-lg">
                                        Sorry, there's no more articles that related to <span className="font-semibold">{articleData.service?.name}</span> service.
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