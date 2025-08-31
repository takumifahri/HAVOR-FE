"use client"

import { useEffect, useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);
    const [hoverTimeout, setHoverTimeout] = useState(null);
    const [getNavigationItems, setNavigationItems] = useState([]);
    // Navigation data structure
    const getNavigationItem = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/services/public`);
            console.log("Navigation items fetched successfully:", res.data);
            if (res.status === 200) {
                // Transform API data into the navigation structure
                const expertiseItems = res.data.map(service => ({
                    name: service.name,
                    href: `/Services/${service.name.toLowerCase().replace(/\s+/g, '-')}`
                }));

                const transformedNavItems = [
                    {
                        name: 'Expertises',
                        sections: [
                            {
                                title: 'Services',
                                items: expertiseItems
                            },
                            {
                                title: 'Products',
                                href: '/products',
                                isClickable: true
                            },
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
                    // {
                    //     name: 'About',
                    //     sections: [
                    //         {
                    //             title: 'Company',
                    //             items: [
                    //                 { name: 'Our Story', href: '/our-story' },
                    //                 { name: 'Mission & Vision', href: '/mission-vision' },
                    //                 { name: 'Our Team', href: '/team' },
                    //                 { name: 'Careers', href: '/careers' }
                    //             ]
                    //         },
                    //         {
                    //             title: 'Values',
                    //             items: [
                    //                 { name: 'Innovation', href: '/innovation' },
                    //                 { name: 'Quality', href: '/quality' },
                    //                 { name: 'Partnership', href: '/partnership' },
                    //                 { name: 'Growth', href: '/growth' }
                    //             ]
                    //         }
                    //     ]
                    // }
                ];

                setNavigationItems(transformedNavItems);
            }
        } catch (error) {
            console.error("Error fetching navigation items:", error);
        }
    }

    // Default navigation items in case API fails
    const navigationItems = [
        {
            name: 'Expertises',
            sections: [
                {
                    title: 'Services',
                    items: [
                        { name: 'Web Development', href: '/Services/web-development' },
                        { name: 'Mobile App Development', href: '/Services/mobile-app-development' },
                        { name: 'Digital Marketing', href: '/Services/digital-marketing' },
                        { name: 'UI/UX Design', href: '/Services/ui-ux-design' },
                        { name: 'Cloud Solutions', href: '/Services/cloud-solutions' },
                    ]
                },
                {
                    title: 'Products',
                    href: '/products',
                    isClickable: true
                },
            ]
        },
        // {
        //     name: 'Works',
        //     sections: [
        //         {
        //             title: 'Technology',
        //             items: [
        //                 { name: 'Software Development', href: '/software-development' },
        //                 { name: 'Cloud Solutions', href: '/cloud-solutions' },
        //                 { name: 'AI & Machine Learning', href: '/ai-ml' },
        //                 { name: 'Cybersecurity', href: '/cybersecurity' }
        //             ]
        //         },
        //         {
        //             title: 'Business',
        //             items: [
        //                 { name: 'Financial Services', href: '/financial-services' },
        //                 { name: 'Healthcare', href: '/healthcare' },
        //                 { name: 'Retail & E-commerce', href: '/retail' },
        //                 { name: 'Manufacturing', href: '/manufacturing' }
        //             ]
        //         }
        //     ]
        // },
        // {
        //     name: 'About',
        //     sections: [
        //         {
        //             title: 'Company',
        //             items: [
        //                 { name: 'Our Story', href: '/our-story' },
        //                 { name: 'Mission & Vision', href: '/mission-vision' },
        //                 { name: 'Our Team', href: '/team' },
        //                 { name: 'Careers', href: '/careers' }
        //             ]
        //         },
        //         {
        //             title: 'Values',
        //             items: [
        //                 { name: 'Innovation', href: '/innovation' },
        //                 { name: 'Quality', href: '/quality' },
        //                 { name: 'Partnership', href: '/partnership' },
        //                 { name: 'Growth', href: '/growth' }
        //             ]
        //         }
        //     ]
        // }
    ];

    // Event handlers
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

    const handleMouseEnter = (dropdownName) => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
        }
        setActiveDropdown(dropdownName);
    };

    const handleMouseLeave = () => {
        const timeout = setTimeout(() => {
            setActiveDropdown(null);
        }, 150);
        setHoverTimeout(timeout);
    };

    const handleDropdownMouseEnter = () => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
        }
    };

    // Effects
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        document.addEventListener('click', handleClickOutside);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('click', handleClickOutside);
        };
    }, [scrolled]);

    // Style helpers
    const getNavStyles = () => ({
        nav: `sticky top-0 ${scrolled || activeDropdown ? 'bg-white text-gray-700' : 'bg-transparent text-white'} backdrop-blur-lg shadow-sm z-50 transition-colors duration-300`,
        link: `${scrolled || activeDropdown ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-gray-300'} text-lg font-medium transition duration-200`,
        button: `${scrolled || activeDropdown ? 'text-gray-700' : 'text-white hover:text-gray-300'} p-2 transition duration-200`,
        mobileButton: `${scrolled || activeDropdown ? 'text-gray-700' : 'text-white'} md:hidden p-2 hover:bg-gray-100 rounded-lg transition duration-300 cursor-pointer`
    });

    const styles = getNavStyles();

    // Render functions
    const renderDesktopNavItem = (item) => (
        <div
            key={item.name}
            className="relative dropdown-container"
            onMouseEnter={() => handleMouseEnter(item.name)}
            onMouseLeave={handleMouseLeave}
        >
            <button
                onClick={() => toggleDropdown(item.name)}
                className={`flex items-center gap-1 ${styles.link}`}
            >
                {item.name}
                <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`}
                />
            </button>
        </div>
    );

    const renderMegaMenuSection = (section) => (
        <div key={section.title} className="w-full">
            <h3 className="text-sm font-semibold text-[#525254] uppercase tracking-wider mb-6">
                {section.title}
                <hr className="border-[#919193] mt-2" />
            </h3>
            <div className={`${section.title === 'Services' ? 'grid grid-cols-2 gap-x-4 gap-y-2' : 'space-y-4'}`}>
                {section.isClickable ? (
                    <Link
                        href={section.href}
                        className="block text-gray-600 hover:text-[#3564A4] transition duration-200 text-sm py-1 font-semibold col-span-2"
                        onClick={() => setActiveDropdown(null)}
                    >
                        View All {section.title}
                    </Link>
                ) : (
                    section.items?.map((subItem) => (
                        <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block text-gray-600 hover:text-[#3564A4] transition duration-200 text-sm py-1"
                            onClick={() => setActiveDropdown(null)}
                        >
                            {subItem.name}
                        </Link>
                    ))
                )}
            </div>
        </div>
    );


    const renderMobileNavItem = (item) => (
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
                            <div className={`pl-4 ${section.title === 'Services' ? 'grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2' : 'space-y-2'}`}>
                                {section.isClickable ? (
                                    <Link
                                        href={section.href}
                                        className="block text-gray-600 hover:text-[#3564A4] text-sm transition duration-200 py-1 font-semibold col-span-full"
                                        onClick={closeMobileMenu}
                                    >
                                        View All {section.title}
                                    </Link>
                                ) : (
                                    section.items?.map((subItem) => (
                                        <Link
                                            key={subItem.name}
                                            href={subItem.href}
                                            className="block text-gray-600 hover:text-[#3564A4] text-sm transition duration-200 py-1"
                                            onClick={closeMobileMenu}
                                        >
                                            {subItem.name}
                                        </Link>
                                    ))
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    useEffect(() => {
        getNavigationItem();
    }, []);
    return (
        <>
            {/* Main Navigation */}
            <nav className={styles.nav}>
                <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 text-xl font-bold">
                        HAVOR S.M
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/about" className={styles.link}>
                            About Us
                        </Link>
                        {navigationItems.map(renderDesktopNavItem)}

                        <Link href="/work" className={styles.link}>
                            Works
                        </Link>
                        <Link href="/article" className={styles.link}>
                            Media & News
                        </Link>
                    </div>

                    {/* Search and Contact */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button className={styles.button} aria-label="Search">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                        <Link
                            href="/contact"
                            className={`border  ${scrolled || activeDropdown ? 'border-black' : 'border-white'}   ${scrolled || activeDropdown ? 'text-black' : 'text-white'}  px-6 py-2 rounded-full font-medium transition duration-200`}
                        >
                            Contact
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className={styles.mobileButton}
                        onClick={toggleMobileMenu}
                        aria-label="Toggle mobile menu"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </nav>

            {/* Mega Menu */}
            {activeDropdown && (
                <div
                    className="mega-menu fixed top-[73px] left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-40"
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                        {/* Responsive Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
                            {navigationItems
                                .find(item => item.name === activeDropdown)
                                ?.sections.map(renderMegaMenuSection)
                            }
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={closeMobileMenu}
                />
            )}

            {/* Mobile Sidebar */}
            <div className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <div className="text-lg font-bold text-gray-900">Menu</div>
                        <button onClick={closeMobileMenu} aria-label="Close menu">
                            <X size={24} className="text-gray-600 hover:text-gray-900 transition duration-300" />
                        </button>
                    </div>

                    {/* Sidebar Navigation */}
                    <div className="flex-1 px-6 py-8 overflow-y-auto">
                        <nav className="space-y-4">
                            <Link
                                href="/about"
                                className="block text-gray-700 hover:text-[#3564A4] font-medium py-3 border-b border-gray-100"
                                onClick={closeMobileMenu}
                            >
                                About
                            </Link>
                            {navigationItems.map(renderMobileNavItem)}
                            <Link
                                href="/work"
                                className="block text-gray-700 hover:text-[#3564A4] font-medium py-3 border-b border-gray-100"
                                onClick={closeMobileMenu}
                            >
                                Works
                            </Link>
                            <Link
                                href="/article"
                                className="block text-gray-700 hover:text-[#3564A4] font-medium py-3 border-b border-gray-100"
                                onClick={closeMobileMenu}
                            >
                                Media & News
                            </Link>
                        </nav>
                    </div>

                    {/* Sidebar Footer */}
                    <div className="p-6 border-t border-gray-200">
                        <Link
                            href="/contact"
                            className={`flex border  border-black text-black py-3 px-4 rounded-full justify-center items-center font-medium transition duration-300`}
                            onClick={closeMobileMenu}
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}