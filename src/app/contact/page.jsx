"use client";
import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import TinyMCE Editor (client-side only)
const Editor = dynamic(() => import('@tinymce/tinymce-react').then(mod => mod.Editor), { ssr: false });

// Toaster dengan animasi slide dari kanan
function Toaster({ message, type, onClose }) {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ x: 400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 400, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3
                    ${type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}
            >
                <span>{message}</span>
                <button onClick={onClose} className="ml-4 text-white font-bold text-lg">&times;</button>
            </motion.div>
        </AnimatePresence>
    );
}

export default function ContactPage() {
    const [form, setForm] = useState({
        subject: '',
        name: '',
        company: '',
        email: '',
        phone: '',
        country: 'Indonesia',
        message: '',
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [toaster, setToaster] = useState({ show: false, message: '', type: 'success' });

    // Handle form change
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Handle TinyMCE change
    const handleEditorChange = (content) => {
        setForm({ ...form, message: content });
    };

    // Dummy submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate success/fail
        setTimeout(() => {
            setLoading(false);
            // Simulate random success/fail
            const isSuccess = Math.random() > 0.3;
            if (isSuccess) {
                setSuccess(true);
                setToaster({
                    show: true,
                    message: "Thank you! Your message has been sent.",
                    type: "success"
                });
                setForm({
                    subject: '',
                    name: '',
                    company: '',
                    email: '',
                    phone: '',
                    country: 'Indonesia',
                    message: '',
                });
            } else {
                setSuccess(false);
                setToaster({
                    show: true,
                    message: "Failed to send message. Please try again.",
                    type: "error"
                });
            }
        }, 1200);
    };

    const handleCloseToaster = () => {
        setToaster({ ...toaster, show: false });
    };

    return (
        <main className="min-h-screen bg-background text-foreground">
            {/* Toaster */}
            <AnimatePresence>
                {toaster.show && (
                    <Toaster
                        message={toaster.message}
                        type={toaster.type}
                        onClose={handleCloseToaster}
                    />
                )}
            </AnimatePresence>


            {/* Hero Section */}
            <section>
                <div
                    className="relative h-[55dvh] md:h-[45dvh] lg:h-[40dvh] xl:h-[65dvh] overflow-hidden flex items-center -mt-18"
                    style={{
                        backgroundImage: `url("/assets/hero/handshake.jpg")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <div className="absolute inset-0 bg-black/70 z-0"></div>
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                            <div className="text-left">
                                <motion.p
                                    className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed max-w-2xl"
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                    <ArrowLeft className="inline-block mr-2" />
                                    <Link href="/" className="text-white hover:underline">
                                        Home
                                    </Link>
                                </motion.p>
                                <motion.h1
                                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight"
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    Let's Talk About Business
                                </motion.h1>
                                <motion.p
                                    className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed max-w-2xl"
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                    Reach out to us for project inquiries, partnerships, or just to say hello.
                                </motion.p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form & Office Info */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-16">
                {/* Contact Form */}
                <div>
                    <form className="bg-white rounded-xl shadow-md p-8 space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-lg font-medium text-gray-700 mb-1">
                                Subject<span className="text-red-500">*</span>
                            </label>
                            <select
                                name="subject"
                                value={form.subject}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3768AA]"
                            >
                                <option value="" disabled>Select subject</option>
                                <option value="Start New Project">Start New Project</option>
                                <option value="Media Inquiries">Media Inquiries</option>
                                <option value="Career Opportunities">Career Opportunities</option>
                                <option value="Something Else">Something Else</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-lg font-medium text-gray-700 mb-1">Name<span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                placeholder="Type your name"
                                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3768AA]"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-medium text-gray-700 mb-1">Company/Institution<span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="company"
                                value={form.company}
                                onChange={handleChange}
                                required
                                placeholder="Type your company"
                                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3768AA]"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-medium text-gray-700 mb-1">Work Email<span className="text-red-500">*</span></label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                placeholder="Type your e-mail"
                                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3768AA]"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-medium text-gray-700 mb-1">Mobile Phone Number<span className="text-red-500">*</span></label>
                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                required
                                placeholder="Type your phone number"
                                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3768AA]"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-medium text-gray-700 mb-1">Country<span className="text-red-500">*</span></label>
                            <select
                                name="country"
                                value={form.country}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3768AA]"
                            >
                                <option value="" disabled>Select country</option>
                                <option value="Indonesia">Indonesia</option>
                                <option value="Singapore">Singapore</option>
                                <option value="Malaysia">Malaysia</option>
                                <option value="Thailand">Thailand</option>
                                <option value="Vietnam">Vietnam</option>
                                <option value="Philippines">Philippines</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-lg font-medium text-gray-700 mb-1">Message<span className="text-red-500">*</span></label>
                            <Editor
                                apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
                                value={form.message}
                                init={{
                                    height: 180,
                                    menubar: false,
                                    plugins: ['link', 'lists'],
                                    toolbar: 'undo redo | bold italic | bullist numlist | link ',
                                }}
                                onEditorChange={handleEditorChange}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#3768AA] hover:bg-[#3564A4] text-white font-semibold py-3 rounded-lg transition duration-300"
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </div>
                <div className="bg-white rounded-xl shadow-md p-8 space-y-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Find Our Creative Hub</h2>
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Head Office</h3>
                        <p className="text-gray-700 mb-1">Jakarta</p>
                        <p className="text-gray-600 text-sm mb-2">Jl. Pekayon 1 No.26, Ps. Minggu, Jakarta Selatan, DKI Jakarta, Indonesia 12540</p>
                        <a href="mailto:contact@havor.com" className="inline-block bg-[#fff] border border-[#3768AA] text-[#3768AA] px-4 py-2 rounded-lg font-medium hover:bg-[#3768AA] hover:text-white transition duration-200">
                            contact@havor.com
                        </a>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Branch Office</h3>
                        <p className="text-gray-700 mb-1">Bandung</p>
                        <p className="text-gray-600 text-sm mb-2">Jl. Sekeloa No.2, Dipatiukur, Bandung, Indonesia 40132</p>
                        <p className="text-gray-700 mb-1">Yogyakarta</p>
                        <p className="text-gray-600 text-sm mb-2">Jl. Watugede No.58, Sleman, Yogyakarta, Indonesia 55581</p>
                        <p className="text-gray-700 mb-1">Malang</p>
                        <p className="text-gray-600 text-sm mb-2">Jl. Tidar Barat No.3, Sukun, Malang, Indonesia 65149</p>
                        <p className="text-gray-700 mb-1">Singapore</p>
                        <p className="text-gray-600 text-sm mb-2">190 Clemenceau Avenue #06-02 Singapore</p>
                    </div>
                </div>
            </section>
        </main>
    );
}