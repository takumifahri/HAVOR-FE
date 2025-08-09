"use client"

import { motion, useAnimation } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import Image from "next/image"

export default function Clients() {
    const scrollRef = useRef(null)
    const contentRef = useRef(null)
    const contentRef2 = useRef(null)
    const controls = useAnimation()
    const controls2 = useAnimation()
    const [contentWidth, setContentWidth] = useState(0)
    const [contentWidth2, setContentWidth2] = useState(0)

    const clients = [
        "Aqua-logo.png",
        "bigstore-logo.webp",
        "changi-airport-logo.png",
        "INTILAND-logo.png",
        "indocement.webp",
        // "Semen-tiga-roda.jpg",
        "shop-n-drive-logo.jpg",
        "Bubu-logo.webp",
        "Alfamidi.png",
        "bisnis.gif",
        "REDY-logo.png",
        "ckb.jpg",
        "metra.png",
        "cometa.png",
        "HHR.jpg",
        "garuda.png",
        "tma.png",
        "KingSecurity.jpg",
        "Mahkota.jpeg",
        "brain.jpeg",
        "sinarmas.png",
        "sango.png",
        "alfamart.png",
        "PCS.jpg",
        "trigraha.png",
        "FBI.png",
    ];

    // Split clients into two halves
    const midPoint = Math.ceil(clients.length / 2)
    const firstHalf = clients.slice(0, midPoint)
    const secondHalf = clients.slice(midPoint)

    // Triple each half for seamless loop
    const duplicatedFirstHalf = [...firstHalf, ...firstHalf, ...firstHalf]
    const duplicatedSecondHalf = [...secondHalf, ...secondHalf, ...secondHalf]

    useEffect(() => {
        const measureContentWidth = () => {
            if (contentRef.current) {
                const singleSetWidth = contentRef.current.scrollWidth / 3
                setContentWidth(singleSetWidth)
            }
            if (contentRef2.current) {
                const singleSetWidth2 = contentRef2.current.scrollWidth / 3
                setContentWidth2(singleSetWidth2)
            }
        }

        // Measure initially and after a small delay to ensure DOM is ready
        const timer = setTimeout(measureContentWidth, 100)
        measureContentWidth()

        // Re-measure on window resize
        window.addEventListener("resize", measureContentWidth)
        return () => {
            window.removeEventListener("resize", measureContentWidth)
            clearTimeout(timer)
        }
    }, [])

    useEffect(() => {
        if (contentWidth > 0 && contentWidth2 > 0) {
            // Speed: 40px per second for smoother animation
            const animationDuration1 = contentWidth / 40
            const animationDuration2 = contentWidth2 / 40

            // First row animation - left to right (normal)
            const startFirstRow = () => {
                controls.set({ x: 0 })
                controls.start({
                    x: -contentWidth,
                    transition: {
                        duration: animationDuration1,
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "loop",
                    },
                })
            }

            // Second row animation - right to left (reverse)
            const startSecondRow = () => {
                controls2.set({ x: -contentWidth2 })
                controls2.start({
                    x: 0,
                    transition: {
                        duration: animationDuration2,
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "loop",
                    },
                })
            }

            startFirstRow()
            startSecondRow()
        }
    }, [contentWidth, contentWidth2, controls, controls2])

    const handleMouseEnter = () => {
        controls.stop()
        controls2.stop()
    }

    const handleMouseLeave = () => {
        if (contentWidth > 0 && contentWidth2 > 0) {
            const animationDuration1 = contentWidth / 40
            const animationDuration2 = contentWidth2 / 40

            // Resume first row from current position
            controls.start({
                x: -contentWidth,
                transition: {
                    duration: animationDuration1,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop",
                },
            })

            // Resume second row from current position
            controls2.start({
                x: 0,
                transition: {
                    duration: animationDuration2,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop",
                },
            })
        }
    }

    // Variants untuk animasi fade in
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                staggerChildren: 0.1
            }
        }
    }

    const titleVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    }

    const scrollerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 1.5,
                delay: 0.3,
                ease: "easeOut"
            }
        }
    }

    return (
        <motion.div
            id="clients"
            className="max-w-full mx-auto px-4 py-16 lg:py-24 overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            {/* Header */}
            <motion.div 
                className="text-center mb-16"
                variants={titleVariants}
            >
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                    OUR CLIENTS
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-[#525254] to-[#3564A4] mx-auto rounded-full"></div>
            </motion.div>

            {/* Container for seamless scrolling */}
            <motion.div
                className="relative overflow-hidden space-y-8"
                variants={scrollerVariants}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* First Container - First Half of Clients (Left to Right) */}
                <motion.div
                    ref={contentRef}
                    className="flex space-x-8 items-center"
                    animate={controls}
                    style={{ width: 'max-content' }}
                    initial={{ x: 0 }}
                >
                    {duplicatedFirstHalf.map((query, index) => (
                        <motion.div
                            key={`first-${index}`}
                            className="flex-shrink-0 w-32 h-20 flex items-center justify-center mx-4"
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.3 }
                            }}
                        >
                            <Image
                                src={`/assets/Clients/${query}`}
                                alt={query}
                                width={128}
                                height={80}
                                className="object-contain max-w-full max-h-full opacity-70 hover:opacity-100 transition-opacity duration-300"
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Second Container - Second Half of Clients (Right to Left) */}
                <motion.div
                    ref={contentRef2}
                    className="flex space-x-8 items-center"
                    animate={controls2}
                    style={{ width: 'max-content' }}
                    initial={{ x: 0 }}
                >
                    {duplicatedSecondHalf.map((query, index) => (
                        <motion.div
                            key={`second-${index}`}
                            className="flex-shrink-0 w-32 h-20 flex items-center justify-center mx-4"
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.3 }
                            }}
                        >
                            <Image
                                src={`/assets/Clients/${query}`}
                                alt={query}
                                width={128}
                                height={80}
                                className="object-contain max-w-full max-h-full opacity-70 hover:opacity-100 transition-opacity duration-300"
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
    )
}