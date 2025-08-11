"use client"

import { useEffect, useState } from 'react';
import { MoveUpRight, Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);
    const [hoverTimeout, setHoverTimeout] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        const handleClickOutside = (event) => {
            const target = event.target;
            if (!target.closest('.dropdown-container') && !target.closest('.mega-menu')) {
                setActiveDropdown(null);
            }
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('click', handleClickOutside);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('click', handleClickOutside);
        };
    }, [scrolled]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setActiveMobileDropdown(null);
    };

    const toggleDropdown = (dropdownName) => {
        setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
    };

    const toggleMobileDropdown = (dropdownName) => {
        setActiveMobileDropdown(activeMobileDropdown === dropdownName ? null : dropdownName);
    };

    // Handle hover enter with delay
    const handleMouseEnter = (dropdownName) => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
        }
        setActiveDropdown(dropdownName);
    };

    // Handle hover leave with delay
    const handleMouseLeave = () => {
        const timeout = setTimeout(() => {
            setActiveDropdown(null);
        }, 150); // 150ms delay before closing
        setHoverTimeout(timeout);
    };

    // Cancel hover timeout when entering dropdown area
    const handleDropdownMouseEnter = () => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
        }
    };

    const navigationItems = [
        {
            name: 'Expertises',
            sections: [
                {
                    title: 'Enterprise IT Solutions',
                    items: [
                        { name: 'Digital Transformation Strategy', href: '/digital-transformation' },
                        { name: 'Customer Experience Strategy', href: '/customer-experience' },
                        { name: 'IT Strategy and Governance', href: '/it-strategy' },
                        { name: 'Strategic Data Analytics', href: '/data-analytics' }
                    ]
                },
                {
                    title: 'Website Development',
                    items: [
                        { name: 'Mobile Application Development', href: '/mobile-development' },
                        { name: 'Web Application Development', href: '/web-development' },
                        { name: 'Digital Commerce Solutions', href: '/digital-commerce' },
                        { name: 'Search Engine Optimization', href: '/seo' }
                    ]
                },
                {
                    title: 'Mobile Apps Development',
                    items: [
                        { name: 'Brand Equity Management', href: '/brand-management' },
                        { name: 'Digital Experience Design', href: '/digital-design' },
                        { name: 'Strategic Content Marketing', href: '/content-marketing' },
                        { name: 'Visual Storytelling', href: '/visual-storytelling' }
                    ]
                },
                {
                    title: 'Social Media Maintenance',
                    items: [
                        { name: 'Integrated Marketing Campaigns', href: '/marketing-campaigns' },
                        { name: 'Digital Advertising', href: '/digital-advertising' },
                        { name: 'Social Media Management', href: '/social-media' },
                        { name: 'Influencer Marketing', href: '/influencer-marketing' }
                    ]
                }
            ]
        },
        {
            name: 'Works',
            sections: [
                {
                    title: 'Technology',
                    items: [
                        { name: 'Software Development', href: '/software-development' },
                        { name: 'Cloud Solutions', href: '/cloud-solutions' },
                        { name: 'AI & Machine Learning', href: '/ai-ml' },
                        { name: 'Cybersecurity', href: '/cybersecurity' }
                    ]
                },
                {
                    title: 'Business',
                    items: [
                        { name: 'Financial Services', href: '/financial-services' },
                        { name: 'Healthcare', href: '/healthcare' },
                        { name: 'Retail & E-commerce', href: '/retail' },
                        { name: 'Manufacturing', href: '/manufacturing' }
                    ]
                }
            ]
        },
        {
            name: 'About',
            sections: [
                {
                    title: 'Company',
                    items: [
                        { name: 'Our Story', href: '/our-story' },
                        { name: 'Mission & Vision', href: '/mission-vision' },
                        { name: 'Our Team', href: '/team' },
                        { name: 'Careers', href: '/careers' }
                    ]
                },
                {
                    title: 'Values',
                    items: [
                        { name: 'Innovation', href: '/innovation' },
                        { name: 'Quality', href: '/quality' },
                        { name: 'Partnership', href: '/partnership' },
                        { name: 'Growth', href: '/growth' }
                    ]
                }
            ]
        }
    ];

    return (
        <>
            <nav
                className={`sticky top-0 ${scrolled || activeDropdown ? 'bg-white text-gray-700' : 'bg-transparent text-white'} backdrop-blur-lg shadow-sm z-50 transition-colors duration-300`}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <div className="flex items-center space-x-2 text-xl font-bold">
                        HAVOR S.M
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navigationItems.map((item) => (
                            <div 
                                key={item.name} 
                                className="relative dropdown-container"
                                onMouseEnter={() => handleMouseEnter(item.name)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <button
                                    onClick={() => toggleDropdown(item.name)}
                                    className={`flex items-center gap-1 ${scrolled || activeDropdown ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-gray-300'} text-lg font-medium transition duration-200`}
                                >
                                    {item.name}
                                    <ChevronDown
                                        className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`}
                                    />
                                </button>
                            </div>
                        ))}

                        <Link
                            href="/insights"
                            className={`${scrolled || activeDropdown ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-gray-300'} font-medium transition duration-200`}
                        >
                            Blog
                        </Link>
                    </div>

                    {/* Search and Contact */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button className={`${scrolled || activeDropdown ? 'text-gray-700' : 'text-white hover:text-gray-300'} p-2 transition duration-200`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                        <Link
                            href="/contact"
                            className={`bg-[#3768AA] hover:bg-[#3564A4] text-lg ${scrolled || activeDropdown ? 'text-white hover:text-gray-300': 'text-white'} px-6 py-2 rounded-lg font-medium transition duration-200`}
                        >
                            Contact
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div
                        className={`${scrolled || activeDropdown ? 'text-gray-700' : 'text-white'} md:hidden p-2 hover:bg-gray-100 rounded-lg transition duration-300 cursor-pointer`}
                        onClick={toggleMobileMenu}
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </div>
                </div>
            </nav>

            {/* Full Width Mega Menu */}
            {activeDropdown && (
                <div 
                    className="mega-menu fixed top-[73px] left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-40"
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className={`grid gap-12 ${activeDropdown === 'Expertises' ? 'grid-cols-4' : 'grid-cols-2'}`}>
                            {navigationItems.find(item => item.name === activeDropdown)?.sections.map((section) => (
                                <div key={section.title}>
                                    <h3 className="text-sm font-semibold text-[#525254] uppercase tracking-wider mb-6">
                                        {section.title}
                                        <hr className="border-[#919193] mt-2" />
                                    </h3>
                                    <div className="space-y-4">
                                        {section.items.map((subItem) => (
                                            <Link
                                                key={subItem.name}
                                                href={subItem.href}
                                                className="block text-gray-600 hover:text-[#3564A4] transition duration-200 text-sm py-1"
                                                onClick={() => setActiveDropdown(null)}
                                            >
                                                {subItem.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={closeMobileMenu}
                ></div>
            )}

            {/* Mobile Sidebar */}
            <div className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <div className="text-lg font-bold text-gray-900">Menu</div>
                        <X size={24} className="text-gray-600 hover:text-gray-900 transition duration-300 cursor-pointer" onClick={closeMobileMenu} />
                    </div>

                    {/* Sidebar Navigation */}
                    <div className="flex-1 px-6 py-8 overflow-y-auto">
                        <nav className="space-y-4">
                            {navigationItems.map((item) => (
                                <div key={item.name} className="border-b border-gray-100 pb-4">
                                    <button
                                        onClick={() => toggleMobileDropdown(item.name)}
                                        className="flex items-center justify-between w-full text-left text-lg font-semibold text-gray-900 py-2"
                                    >
                                        {item.name}
                                        <ChevronDown
                                            className={`w-5 h-5 transition-transform duration-200 ${activeMobileDropdown === item.name ? 'rotate-180' : ''}`}
                                        />
                                    </button>

                                    {activeMobileDropdown === item.name && (
                                        <div className="mt-4 space-y-4">
                                            {item.sections.map((section) => (
                                                <div key={section.title}>
                                                    <h4 className="text-xs font-semibold text-[#525254] uppercase tracking-wider mb-3">
                                                        {section.title}
                                                        <hr className="border-[#919193] mt-1" />
                                                    </h4>
                                                    <div className="space-y-2 pl-4">
                                                        {section.items.map((subItem) => (
                                                            <Link
                                                                key={subItem.name}
                                                                href={subItem.href}
                                                                className="block text-gray-600 hover:text-[#3564A4] text-sm transition duration-200 py-1"
                                                                onClick={closeMobileMenu}
                                                            >
                                                                {subItem.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                            <Link href="/work" className="block text-gray-700 hover:text-[#3564A4] font-medium py-3 border-b border-gray-100" onClick={closeMobileMenu}>
                                Work
                            </Link>
                            <Link href="/insights" className="block text-gray-700 hover:text-[#3564A4] font-medium py-3" onClick={closeMobileMenu}>
                                Insights
                            </Link>
                        </nav>
                    </div>

                    {/* Sidebar Footer */}
                    <div className="p-6 border-t border-gray-200">
                        <Link
                            href="/contact"
                            className="flex bg-[#3768AA] hover:bg-[#3564A4] text-white py-3 px-4 rounded-lg justify-center items-center font-medium transition duration-300"
                            onClick={closeMobileMenu}
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}