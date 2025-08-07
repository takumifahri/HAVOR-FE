"use client"
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { MoveUpRight, Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
        });

        // Add scroll event listener
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Initial check
        handleScroll();

        // Clean up
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
                        <a
                            href="#about"
                            className={`${scrolled ? 'text-[#919193]' : 'text-[#919193]/90'} hover:text-[#525254] transition duration-300 text-base lg:text-lg font-medium`}
                        >
                            Experties
                        </a>
                        <a
                            href="#services"
                            className={`${scrolled ? 'text-[#919193]' : 'text-[#919193]/90'} hover:text-[#525254] transition duration-300 text-base lg:text-lg font-medium`}
                        >
                            Projects
                        </a>
                        <a
                            href="#portfolio"
                            className={`${scrolled ? 'text-[#919193]' : 'text-[#919193]/90'} hover:text-[#525254] transition duration-300 text-base lg:text-lg font-medium`}
                        >
                            Article
                        </a>
                        <a
                            href="#contact"
                            className={`${scrolled ? 'text-[#919193]' : 'text-[#919193]/90'} hover:text-[#525254] transition duration-300 text-base lg:text-lg font-medium`}
                        >
                            About Us
                        </a>
                        <a
                            href="#history"
                            className={`${scrolled ? 'text-[#919193]' : 'text-[#919193]/90'} hover:text-[#525254] transition duration-300 text-base lg:text-lg font-medium`}
                        >
                            History
                        </a>
                    </div>

                    {/* Desktop Get Started Button */}
                    <div className={`hidden md:flex rounded-lg bg-[#3768AA] ${scrolled ? 'border-black' : 'border-black/30'} border py-2 px-4 lg:px-5 justify-center items-center gap-2 cursor-pointer hover:bg-white/10 hover:border-white/50  hover:text-black transition duration-300 backdrop-blur-sm`}>
                        <span className="text-sm lg:text-base text-base-100 font-medium">Contact</span>
                        <div className='border border-base-100 rounded-full p-1'>
                            <MoveUpRight className='text-base-100' size={12} strokeWidth={2.25} />
                        </div>
                    </div>


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
                    className="fixed inset-0 bg-black/50z-40 md:hidden"
                    onClick={closeMobileMenu}
                ></div>
            )}

            {/* Mobile Sidebar */}
            <div className={`fixed top-0 right-0 h-full w-80 max-w-[55vw] bg-white/10 backdrop-blur-lg border-l border-white/20 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-end p-6 border-b border-white/20">

                        <X size={24} className=" text-[#525254]   hover:bg-white/10 rounded-lg transition duration-300" onClick={closeMobileMenu} />

                    </div>

                    {/* Sidebar Navigation */}
                    <div className="flex-1 px-6 py-8">
                        <nav className="space-y-6">
                            <a
                                href="/about"
                                className="block text-[#525254]/90 hover:text-[#525254] transition duration-300 text-lg font-medium py-2"
                                onClick={closeMobileMenu}
                            >
                                About
                            </a>
                            <a
                                href="/services"
                                className="block text-[#525254]/90 hover:text-[#525254] transition duration-300 text-lg font-medium py-2"
                                onClick={closeMobileMenu}
                            >
                                Services
                            </a>
                            <a
                                href="/portfolio"
                                className="block text-[#525254]/90 hover:text-[#525254] transition duration-300 text-lg font-medium py-2"
                                onClick={closeMobileMenu}
                            >
                                Portfolio
                            </a>
                            <a
                                href="/contact"
                                className="block text-[#525254]/90 hover:text-[#525254] transition duration-300 text-lg font-medium py-2"
                                onClick={closeMobileMenu}
                            >
                                Contact Us
                            </a>
                            <a
                                href="/history"
                                className="block text-[#525254]/90 hover:text-[#525254] transition duration-300 text-lg font-medium py-2"
                                onClick={closeMobileMenu}
                            >
                                History
                            </a>
                        </nav>
                    </div>

                    {/* Sidebar Footer with Get Started Button */}
                    <div className="p-6 border-t border-white/20">
                        <div
                            className=" flex rounded-full border border-white/30 py-3 px-4 justify-center items-center gap-2 cursor-pointer hover:bg-white/10 hover:border-white/50 transition duration-300 backdrop-blur-sm"
                            onClick={closeMobileMenu}
                        >
                            <span className="text-black font-medium">Get Started</span>
                            <div className='border border-white rounded-full p-1'>
                                <MoveUpRight className='text-white' size={12} strokeWidth={2.25} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}