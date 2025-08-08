"use client"
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { MoveUpRight, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
        });

        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <nav
                className={`sticky top-0 ${scrolled ? 'bg-white/25' : 'bg-white/5'} backdrop-blur-lg border-b border-white/20 shadow-lg z-50 transition-colors duration-300`}
                data-aos="fade-down"
                data-aos-duration="1000"
            >
                <div className="flex items-center justify-between py-4 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <span className="text-[#919193] font-bold text-lg sm:text-xl"> HAVOR SMARTA
                            DIGITAL</span>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                        {/* Expertise Dropdown */}
                        <div className="dropdown dropdown-hover">
                            <div tabIndex={0} role="button" className={`text-base lg:text-lg font-medium ${scrolled ? 'text-[#919193]' : 'text-[#919193]/90'} hover:text-[#525254] transition duration-300`}>
                                Expertises
                            </div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white/90 backdrop-blur-md rounded-box w-52 mt-4">
                                <li><Link href="/web-development">Web Development</Link></li>
                                <li><Link href="/mobile-app">Mobile App</Link></li>
                                <li><Link href="/ui-ux-design">UI/UX Design</Link></li>
                                <li><Link href="/digital-marketing">Digital Marketing</Link></li>
                            </ul>
                        </div>

                        {/* Projects Dropdown */}
                        <div className="dropdown dropdown-hover">
                            <div tabIndex={0} role="button" className={`text-base lg:text-lg font-medium ${scrolled ? 'text-[#919193]' : 'text-[#919193]/90'} hover:text-[#525254] transition duration-300`}>
                                Projects
                            </div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white/90 backdrop-blur-md rounded-box w-52 mt-4">
                                <li><Link href="/project-portfolio">Portfolio</Link></li>
                                <li><Link href="/case-studies">Case Studies</Link></li>
                                <li><Link href="/client-work">Client Work</Link></li>
                                <li><Link href="/testimonials">Testimonials</Link></li>
                            </ul>
                        </div>
                        
                        {/* Articles Dropdown */}
                        <div className="dropdown dropdown-hover">
                            <div tabIndex={0} role="button" className={`text-base lg:text-lg font-medium ${scrolled ? 'text-[#919193]' : 'text-[#919193]/90'} hover:text-[#525254] transition duration-300`}>
                                Articles
                            </div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white/90 backdrop-blur-md rounded-box w-52 mt-4">
                                <li><Link href="/tech-blog">Tech Blog</Link></li>
                                <li><Link href="/tutorials">Tutorials</Link></li>
                                <li><Link href="/industry-news">Industry News</Link></li>
                                <li><Link href="/insights">Insights</Link></li>
                            </ul>
                        </div>

                        {/* About Us Dropdown */}
                        <div className="dropdown dropdown-hover">
                            <div tabIndex={0} role="button" className={`text-base lg:text-lg font-medium ${scrolled ? 'text-[#919193]' : 'text-[#919193]/90'} hover:text-[#525254] transition duration-300`}>
                                About Us
                            </div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white/90 backdrop-blur-md rounded-box w-52 mt-4">
                                <li><Link href="/our-story">Our Story</Link></li>
                                <li><Link href="/team">Our Team</Link></li>
                                <li><Link href="/mission-vision">Mission & Vision</Link></li>
                                <li><Link href="/careers">Careers</Link></li>
                            </ul>
                        </div>
                        
                        {/* History Dropdown */}
                        <div className="dropdown dropdown-hover">
                            <div tabIndex={0} role="button" className={`text-base lg:text-lg font-medium ${scrolled ? 'text-[#919193]' : 'text-[#919193]/90'} hover:text-[#525254] transition duration-300`}>
                                History
                            </div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white/90 backdrop-blur-md rounded-box w-52 mt-4">
                                <li><Link href="/company-timeline">Company Timeline</Link></li>
                                <li><Link href="/milestones">Milestones</Link></li>
                                <li><Link href="/achievements">Achievements</Link></li>
                                <li><Link href="/legacy">Our Legacy</Link></li>
                            </ul>
                        </div>

                    </div>

                    {/* Desktop Contact Button */}
                    <Link
                        href="/contact"
                        className={`hidden md:flex rounded-lg bg-[#3768AA] border-black/30 border py-2 px-4 lg:px-5 justify-center items-center gap-2 cursor-pointer hover:bg-white/10 hover:border-white/50 hover:text-black transition duration-300 backdrop-blur-sm`}
                    >
                        <span className="text-sm lg:text-base text-base-100 font-medium">Contact</span>
                        <div className='border border-base-100 rounded-full p-1'>
                            <MoveUpRight className='text-base-100' size={12} strokeWidth={2.25} />
                        </div>
                    </Link>

                    {/* Mobile Menu Button */}
                    <div
                        className="md:hidden text-black p-2 hover:bg-white/10 rounded-lg transition duration-300"
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

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={closeMobileMenu}
                ></div>
            )}

            {/* Mobile Sidebar */}
            <div className={`fixed top-0 right-0 h-full w-80 max-w-[55vw] bg-white/10 backdrop-blur-lg border-l border-white/20 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-end p-6 border-b border-white/20">
                        <X size={24} className=" text-[#525254] hover:bg-white/10 rounded-lg transition duration-300" onClick={closeMobileMenu} />
                    </div>

                    {/* Sidebar Navigation - Menggunakan daisyUI collapse untuk mobile */}
                    <div className="flex-1 px-6 py-8">
                        <nav className="space-y-6">
                            {/* Expertises Collapse */}
                            <div tabIndex={0} className="collapse collapse-arrow">
                                <div className="collapse-title text-lg font-medium text-[#525254]/90 hover:text-[#525254] transition duration-300">
                                    Expertises
                                </div>
                                <div className="collapse-content space-y-2 pl-4">
                                    <Link href="/web-development" className="block text-[#525254]/90 hover:text-[#525254]" onClick={closeMobileMenu}>Web Development</Link>
                                    <Link href="/mobile-app" className="block text-[#525254]/90 hover:text-[#525254]" onClick={closeMobileMenu}>Mobile App</Link>
                                    <Link href="/ui-ux-design" className="block text-[#525254]/90 hover:text-[#525254]" onClick={closeMobileMenu}>UI/UX Design</Link>
                                    <Link href="/digital-marketing" className="block text-[#525254]/90 hover:text-[#525254]" onClick={closeMobileMenu}>Digital Marketing</Link>
                                </div>
                            </div>
                            
                            {/* Projects Collapse */}
                            <div tabIndex={0} className="collapse collapse-arrow">
                                <div className="collapse-title text-lg font-medium text-[#525254]/90 hover:text-[#525254] transition duration-300">
                                    Projects
                                </div>
                                <div className="collapse-content space-y-2 pl-4">
                                    <Link href="/project-portfolio" className="block text-[#525254]/90 hover:text-[#525254]" onClick={closeMobileMenu}>Portfolio</Link>
                                    <Link href="/case-studies" className="block text-[#525254]/90 hover:text-[#525254]" onClick={closeMobileMenu}>Case Studies</Link>
                                    <Link href="/client-work" className="block text-[#525254]/90 hover:text-[#525254]" onClick={closeMobileMenu}>Client Work</Link>
                                    <Link href="/testimonials" className="block text-[#525254]/90 hover:text-[#525254]" onClick={closeMobileMenu}>Testimonials</Link>
                                </div>
                            </div>
                            
                            {/* Articles Collapse */}
                            <div tabIndex={0} className="collapse collapse-arrow">
                                <div className="collapse-title text-lg font-medium text-[#525254]/90 hover:text-[#525254] transition duration-300">
                                    Articles
                                </div>
                                <div className="collapse-content space-y-2 pl-4">
                                    <Link href="/tech-blog" className="block text-[#525254]/90 hover:text-[#525254]" onClick={closeMobileMenu}>Tech Blog</Link>
                                    <Link href="/tutorials" className="block text-[#525254]/90 hover:text-[#525254]" onClick={closeMobileMenu}>Tutorials</Link>
                                    <Link href="/industry-news" className="block text-[#525254]/90 hover:text-[#525254]" onClick={closeMobileMenu}>Industry News</Link>
                                    <Link href="/insights" className="block text-[#525254]/90 hover:text-[#525254]" onClick={closeMobileMenu}>Insights</Link>
                                </div>
                            </div>
                            
                            {/* About Us Collapse */}
                            <div tabIndex={0} className="collapse collapse-arrow">
                                <div className="collapse-title text-lg font-medium text-[#525254]/90 hover:text-[#525254] transition duration-300">
                                    About Us
                                </div>
                                <div className="collapse-content space-y-2 pl-4">
                                    <Link href="/our-story" className="block text-[#525254]/90 hover:text-[#525254]" onClick={closeMobileMenu}>Our Story</Link>
                                    <Link href="/team" className="block text-[#525254]/90 hover:text-[#525254]" onClick={closeMobileMenu}>Our Team</Link>
                                    <Link href="/mission-vision" className="block text-[#525254]/90 hover:text-[#525254]" onClick={closeMobileMenu}>Mission & Vision</Link>
                                    <Link href="/careers" className="block text-[#525254]/90 hover:text-[#525254]" onClick={closeMobileMenu}>Careers</Link>
                                </div>
                            </div>
                            
                            {/* History Collapse */}
                            <div tabIndex={0} className="collapse collapse-arrow">
                                <div className="collapse-title text-lg font-medium text-[#525254]/90 hover:text-[#525254] transition duration-300">
                                    History
                                </div>
                                <div className="collapse-content space-y-2 pl-4">
                                    <Link href="/company-timeline" className="block text-[#525254]/90 hover:text-[#525254]" onClick={closeMobileMenu}>Company Timeline</Link>
                                    <Link href="/milestones" className="block text-[#525254]/90 hover:text-[#525254]" onClick={closeMobileMenu}>Milestones</Link>
                                    <Link href="/achievements" className="block text-[#525254]/90 hover:text-[#525254]" onClick={closeMobileMenu}>Achievements</Link>
                                    <Link href="/legacy" className="block text-[#525254]/90 hover:text-[#525254]" onClick={closeMobileMenu}>Our Legacy</Link>
                                </div>
                            </div>
                        </nav>
                    </div>

                    {/* Sidebar Footer with Get Started Button */}
                    <div className="p-6 border-t border-white/20">
                        <Link
                            href="/contact"
                            className=" flex rounded-full border border-white/30 py-3 px-4 justify-center items-center gap-2 cursor-pointer hover:bg-white/10 hover:border-white/50 transition duration-300 backdrop-blur-sm"
                            onClick={closeMobileMenu}
                        >
                            <span className="text-black font-medium">Get Started</span>
                            <div className='border border-white rounded-full p-1'>
                                <MoveUpRight className='text-white' size={12} strokeWidth={2.25} />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}